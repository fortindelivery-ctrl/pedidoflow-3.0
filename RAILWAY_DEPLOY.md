# Deploy no Railway

## 1) Criar o projeto
1. No Railway, clique em `New Project`.
2. Selecione `Deploy from GitHub repo`.
3. Escolha este repositório.

O Railway vai usar:
- `npm install` no build
- `npm run start` no runtime (definido em `railway.json`)

## 2) Variáveis de ambiente
Configure no serviço:

- `PORT` = `3001` (ou deixe sem valor; Railway injeta automaticamente)
- `WWEB_DATA_PATH` = `/data`
- `WPP_AUTO_CLEAR_SESSION` = `1`
- `WPP_AUTO_RESTART_ON_FAIL` = `1`
- `GEMINI_API_KEY` (se usar Gemini)
- `OPENAI_API_KEY` (se usar OpenAI)
- `AUDIO_REPLY_MODE` = `off` | `incoming_audio` | `all`

Opcional:
- `WWEB_VERSION`
- `PUPPETEER_EXECUTABLE_PATH`
- `SKIP_PUPPETEER_BROWSER_DOWNLOAD` = `1` (somente se já houver Chrome no ambiente)

## 3) Volume persistente (obrigatório para sessão WhatsApp)
1. No serviço, abra `Volumes`.
2. Crie um volume e monte em `/data`.

Sem volume, a sessão do WhatsApp pode ser perdida em restart/redeploy.

## 4) Subir e validar
Depois do deploy:
- Healthcheck: `GET /`
- QR para autenticar: `GET /qr`
- Imagem QR: `GET /qr.png`

Quando autenticado, a raiz (`/`) deve retornar status `conectado`.
