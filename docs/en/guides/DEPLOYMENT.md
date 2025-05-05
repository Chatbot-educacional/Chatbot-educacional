# Deployment Guide

This guide covers best practices for deploying CoderBot v2 in production environments, including backend (FastAPI), frontend (React/Tauri), PocketBase, and a security checklist.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Backend Deployment (FastAPI)](#backend-deployment-fastapi)
- [Frontend Deployment (React)](#frontend-deployment-react)
- [Desktop Deployment (Tauri)](#desktop-deployment-tauri)
- [PocketBase: Backup and Restore](#pocketbase-backup-and-restore)
- [Environment Variables](#environment-variables)
- [Security Checklist](#security-checklist)
- [Useful Resources](#useful-resources)

---

## Overview

CoderBot v2 can be deployed on cloud servers, VPS, frontend hosting services (Vercel, Netlify), or as a desktop app (Tauri). PocketBase can run locally or in the cloud.

## Prerequisites
- Docker (recommended for backend)
- Node.js 18+ and pnpm
- Python 3.8+
- Rust (for Tauri build)
- PocketBase
- Domain and SSL (production)

## Backend Deployment (FastAPI)

### Docker (Recommended)
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

- Configure environment variables in the `.env` file.
- Use a reverse proxy (Nginx, Caddy) for HTTPS.

## Frontend Deployment (React)

### Production Build
```bash
cd frontend
pnpm install
pnpm build
```

- The build will be in `frontend/dist`. Host it on Vercel, Netlify, or your own server (Nginx, Apache).
- Set production environment variables in `.env`.

## Desktop Deployment (Tauri)

### Build
```bash
cd frontend
pnpm tauri build
```
- The executable will be in `src-tauri/target/release`.
- Distribute for Windows, macOS, and Linux.

## PocketBase: Backup and Restore

### Backup
```bash
./pocketbase export --dir ./pb_backup
```
### Restore
```bash
./pocketbase import --dir ./pb_backup
```
- Schedule regular backups.
- Store backups in a safe location.

## Environment Variables
- Keep `.env` files out of version control.
- Use `.env.production` for production.
- Document all required variables (API keys, URLs, etc).

## Security Checklist
- [ ] Use HTTPS in production
- [ ] Regularly update dependencies
- [ ] Restrict ports and IPs in the firewall
- [ ] Set up access rules in PocketBase
- [ ] Regularly back up the database
- [ ] Do not expose sensitive variables in logs
- [ ] Use strong admin authentication
- [ ] Test public endpoints to avoid leaks

## Useful Resources
- [FastAPI Deploy Docs](https://fastapi.tiangolo.com/deployment/)
- [Tauri Build Docs](https://tauri.app/v1/guides/distribution/)
- [PocketBase Docs](https://pocketbase.io/docs/)
- [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/) 