# Guia de Implantação (Deploy)

Este guia cobre as melhores práticas para implantar o CoderBot v2 em ambientes de produção, incluindo backend (FastAPI), frontend (React/Tauri), PocketBase e checklist de segurança.

## Sumário
- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Deploy do Backend (FastAPI)](#deploy-do-backend-fastapi)
- [Deploy do Frontend (React)](#deploy-do-frontend-react)
- [Deploy Desktop (Tauri)](#deploy-desktop-tauri)
- [PocketBase: Backup e Restauração](#pocketbase-backup-e-restauração)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Checklist de Segurança](#checklist-de-segurança)
- [Recursos Úteis](#recursos-úteis)

---

## Visão Geral

A implantação do CoderBot v2 pode ser feita em servidores cloud, VPS, serviços de hospedagem frontend (Vercel, Netlify) ou como aplicativo desktop (Tauri). O banco de dados PocketBase pode rodar localmente ou em cloud.

## Pré-requisitos
- Docker (recomendado para backend)
- Node.js 18+ e pnpm
- Python 3.8+
- Rust (para build Tauri)
- PocketBase
- Domínio e SSL (produção)

## Deploy do Backend (FastAPI)

### Docker (Recomendado)
```bash
git clone https://github.com/Chatbot-educacional/Chatbot-educacional.git
cd Chatbot-educacional/coderbot-v2/backend
docker build -t coderbot-backend .
docker run -d -p 8000:8000 --env-file .env coderbot-backend
```

### Manual
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

- Configure variáveis de ambiente no arquivo `.env`.
- Use um proxy reverso (Nginx, Caddy) para HTTPS.

## Deploy do Frontend (React)

### Build de Produção
```bash
cd frontend
pnpm install
pnpm build
```

- O build estará em `frontend/dist`. Hospede em Vercel, Netlify, ou servidor próprio (Nginx, Apache).
- Configure variáveis de ambiente de produção em `.env`.

## Deploy Desktop (Tauri)

### Build
```bash
cd frontend
pnpm tauri build
```
- O executável estará em `src-tauri/target/release`.
- Distribua para Windows, macOS e Linux.

## PocketBase: Backup e Restauração

### Backup
```bash
./pocketbase export --dir ./pb_backup
```
### Restauração
```bash
./pocketbase import --dir ./pb_backup
```
- Agende backups regulares.
- Armazene backups em local seguro.

## Variáveis de Ambiente
- Mantenha arquivos `.env` fora do versionamento.
- Use `.env.production` para produção.
- Documente todas as variáveis necessárias (API keys, URLs, etc).

## Checklist de Segurança
- [ ] Use HTTPS em produção
- [ ] Atualize dependências regularmente
- [ ] Restrinja portas e IPs no firewall
- [ ] Configure regras de acesso no PocketBase
- [ ] Faça backup regular do banco de dados
- [ ] Não exponha variáveis sensíveis em logs
- [ ] Use autenticação forte para admin
- [ ] Teste endpoints públicos para evitar vazamentos

## Recursos Úteis
- [FastAPI Deploy Docs](https://fastapi.tiangolo.com/deployment/)
- [Tauri Build Docs](https://tauri.app/v1/guides/distribution/)
- [PocketBase Docs](https://pocketbase.io/docs/)
- [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/) 