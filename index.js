const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const fs = require('fs');
const path = require('path');

// Parse M3U playlist
function parseM3U(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const channels = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line.startsWith('#EXTINF')) {
      const groupMatch = line.match(/group="([^"]*)"/);
      const group = groupMatch ? groupMatch[1] : 'Outros';
      const logoMatch = line.match(/logo="([^"]*)"/);
      const logo = logoMatch ? logoMatch[1] : '';
      const name = line.includes(',') ? line.split(',').pop().trim() : 'Unknown';
      i++;
      while (i < lines.length && (!lines[i].trim() || lines[i].trim().startsWith('#'))) {
        i++;
      }
      if (i < lines.length) {
        const url = lines[i].trim();
        let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
        let id = 'leovilgio:' + slug;
        if (channels.some(c => c.id === id)) {
          id = id + '-' + require('crypto').createHash('md5').update(url).digest('hex').slice(0, 6);
        }
        channels.push({ id, name, group, logo, url });
      }
    }
    i++;
  }
  return channels;
}

const playlistPath = path.join(__dirname, 'playlist.m3u');
const channels = fs.existsSync(playlistPath) ? parseM3U(playlistPath) : require('./channels.json');
console.log('Loaded', channels.length, 'channels');

const genres = [...new Set(channels.map(c => c.group))].sort();

const builder = new addonBuilder({
  id: 'com.leovilgio.tv',
  version: '1.0.1',
  name: 'Leovilgio TV',
  description: 'Canais de TV de Leovilgio - Nacional, Internacional, Animes, Animação, Desporto e mais. Total: ' + channels.length + ' canais.',
  logo: 'https://www.stremio.com/website/stremio-logo-small.png',
  resources: ['catalog', 'meta', 'stream'],
  types: ['tv'],
  idPrefixes: ['leovilgio:'],
  catalogs: [
    {
      type: 'tv',
      id: 'leovilgio',
      name: 'Leovilgio TV',
      extra: [
        { name: 'genre', isRequired: false, options: genres },
        { name: 'search', isRequired: false },
        { name: 'skip', isRequired: false }
      ]
    }
  ]
});

function toMeta(c) {
  return {
    id: c.id,
    type: 'tv',
    name: c.name,
    poster: c.logo || undefined,
    posterShape: 'square',
    genres: [c.group],
    description: `Canal ${c.name} • ${c.group}`,
    behaviorHints: { isLive: true }
  };
}

builder.defineCatalogHandler(function (args) {
  if (args.type !== 'tv' || args.id !== 'leovilgio') {
    return Promise.resolve({ metas: [] });
  }
  let list = channels;
  if (args.extra && args.extra.genre) {
    list = list.filter(c => c.group === args.extra.genre);
  }
  if (args.extra && args.extra.search) {
    const q = args.extra.search.toLowerCase();
    list = list.filter(c => c.name.toLowerCase().includes(q) || c.group.toLowerCase().includes(q));
  }
  const skip = parseInt(args.extra && args.extra.skip) || 0;
  const page = list.slice(skip, skip + 100);
  return Promise.resolve({
    metas: page.map(toMeta),
    cacheMaxAge: 3600
  });
});

builder.defineMetaHandler(function (args) {
  const channel = channels.find(c => c.id === args.id);
  if (!channel) return Promise.resolve({ meta: {} });
  return Promise.resolve({
    meta: toMeta(channel),
    cacheMaxAge: 3600
  });
});

builder.defineStreamHandler(function (args) {
  const channel = channels.find(c => c.id === args.id);
  if (!channel) return Promise.resolve({ streams: [] });
  return Promise.resolve({
    streams: [
      {
        name: channel.name,
        title: 'Ao Vivo • ' + channel.group,
        url: channel.url,
        behaviorHints: { bingeGroup: 'leovilgio-live' }
      }
    ]
  });
});

const PORT = process.env.PORT || 7000;
serveHTTP(builder.getInterface(), { port: PORT });
console.log(`Leovilgio TV addon running on http://localhost:${PORT}/manifest.json`);
