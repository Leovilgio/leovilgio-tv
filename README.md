# Leovilgio TV - Stremio Addon

Addon Stremio com 119 canais de TV (Nacional, Internacional, Animes, Animação, Filmes & Séries, Notícias, Desporto, Músicas, Novelas, Gaming).

## Instalação rápida

### 1. Deploy no Render.com (recomendado - gratuito)

1. Acesse https://dashboard.render.com e faça login (ou crie conta)
2. Clique em **New +** → **Web Service**
3. Conecte o repositório: **Leovilgio/leovilgio-tv**
4. Configurações:
   - **Name**: leovilgio-tv (ou qualquer nome)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Clique em **Create Web Service**
6. Aguarde o deploy (1-2 minutos)
7. Copie a URL do serviço (ex: `https://leovilgio-tv.onrender.com`)
8. No Stremio, adicione o addon com:
   ```
   https://SEU-APP.onrender.com/manifest.json
   ```

### 2. Rodar localmente

```bash
git clone https://github.com/Leovilgio/leovilgio-tv.git
cd leovilgio-tv
npm install
npm start
```

No Stremio adicione: `http://127.0.0.1:7000/manifest.json`

### 3. Railway.app

1. https://railway.app → New Project → Deploy from GitHub
2. Selecione o repositório leovilgio-tv
3. Use a URL gerada + `/manifest.json`

## Categorias

- Nacional
- Internacional
- Animes
- Animação
- Filmes & Séries
- Notícias
- Desporto
- Músicas
- Novelas
- Gaming

## Atualizar a playlist

Substitua o arquivo `playlist.m3u` e faça commit + push. O addon recarrega automaticamente no próximo restart.

---
Criado para Leovilgio TV
