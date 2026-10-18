# Leovilgio TV - Stremio Addon

Addon Stremio com a playlist de canais TV fornecida.

**Nome:** Leovilgio TV  
**Canais:** 119  
**Categorias:** Nacional, Internacional, Animes, Animação, Filmes & Séries, Notícias, Desporto, Músicas, Novelas, Gaming

## Como instalar / usar

### Opção 1: Rodar localmente (mais fácil para testar)

1. Instale Node.js (v14+)
2. Entre na pasta:
   ```bash
   cd leovilgio-tv
   npm install
   npm start
   ```
3. No Stremio, adicione o addon com a URL:
   ```
   http://127.0.0.1:7000/manifest.json
   ```
   (Se estiver em outro dispositivo na mesma rede, use o IP do computador)

### Opção 2: Deploy gratuito (recomendado para usar em qualquer lugar)

#### Render.com (fácil e gratuito)

1. Crie conta em https://render.com
2. New → Web Service
3. Conecte este repositório GitHub
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Depois de publicar, use a URL: `https://SEU-APP.onrender.com/manifest.json`

#### Railway.app

1. https://railway.app → New Project → Deploy from GitHub
2. Selecione este repositório
3. Railway detecta Node.js automaticamente
4. Use a URL gerada + `/manifest.json`

#### Outras opções
- Vercel / Netlify (precisa adaptar para serverless)
- Qualquer VPS ou servidor Node.js

## Estrutura

- `index.js` - Addon principal
- `channels.json` - Lista de canais parseada do M3U
- `package.json`

## Atualizar a playlist

Substitua o `channels.json` ou edite o M3U original e re-rode o parser.

Criado com ❤️ para Leovilgio TV
