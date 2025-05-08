# Chatbot-educacional (CoderBot v2)

<p align="center">
  <img src="docs/assets/coderbot_colorfull.png" alt="CoderBot Logo" width="200"/>
</p>

<p align="center">
  <a href="docs/pt-BR/README.md">Português</a> |
  <a href="docs/en/README.md">English</a>
</p>

<p align="center">
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  </a>
  <a href="https://reactjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  </a>
  <a href="https://www.python.org/" target="_blank">
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  </a>
  <a href="https://fastapi.tiangolo.com/" target="_blank">
    <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>
  </a>
  <a href="https://tauri.studio/" target="_blank">
    <img src="https://img.shields.io/badge/Tauri-FFC131?style=for-the-badge&logo=Tauri&logoColor=white" alt="Tauri"/>
  </a>
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License"/>
  </a>
  <a href="http://makeapullrequest.com" target="_blank">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome"/>
  </a>
  <a href="https://github.com/Chatbot-educacional/Chatbot-educacional/graphs/contributors" target="_blank">
    <img src="https://img.shields.io/github/contributors/Chatbot-educacional/Chatbot-educacional" alt="Contributors"/>
  </a>
  <a href="https://github.com/Chatbot-educacional/Chatbot-educacional/commits/main" target="_blank">
    <img src="https://img.shields.io/github/last-commit/Chatbot-educacional/Chatbot-educacional" alt="Last Commit"/>
  </a>
</p>

<p align="center">
  Um chatbot educacional moderno para o ensino de programação.<br/>
  A modern educational chatbot for teaching programming.
</p>

<p align="center">
  <b>🌐 Escolha seu idioma | Choose your language</b><br/>
  <a href="docs/pt-BR/README.md">📖 Documentação em Português</a><br/>
  <a href="docs/en/README.md">📖 English Documentation</a>
</p>

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Começando](#-começando)
- [Contribuindo](#-contribuindo)
- [Comunidade](#-comunidade)
- [Roadmap](#-roadmap)
- [Licença](#-licença)

## 🎯 Sobre o Projeto

O CoderBot v2 é uma plataforma educacional open source projetada para auxiliar estudantes e professores no processo de aprendizagem de programação. Através de uma interface intuitiva e um sistema de tutoria inteligente, oferecemos:

- 🤖 Tutoria personalizada em programação
- 📚 Exercícios práticos e desafios
- 🔍 Feedback em tempo real
- 👥 Aprendizado colaborativo
- 🌐 Suporte a múltiplas linguagens de programação

## 🚀 Tecnologias

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- Monaco Editor
- Tauri (Desktop App)
- Supabase

### Backend
- FastAPI
- Python 3.8+
- OpenAI/DeepSeek API Integration
- PocketBase (Database)
- Continue (AI Integration)

## 📁 Estrutura do Projeto

```
coderbot-v2/
├── frontend/          # Interface do usuário em React
├── backend/           # API em FastAPI
├── continueTutor/     # Módulo de tutoria contínua
├── temp-tauri/        # Configurações Tauri
├── docs/             # Documentação do projeto
└── .github/          # Templates e workflows do GitHub
```

## 🛠️ Começando

### Pré-requisitos
- Node.js 18+ e pnpm/npm
- Python 3.8+
- Rust (para build Tauri)

### Frontend

1. Navegue até o diretório frontend:
```bash
cd coderbot-v2/frontend
```

2. Instale as dependências:
```bash
pnpm install
# ou
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
# ou
npm run dev
```

### Backend

1. Navegue até o diretório backend:
```bash
cd coderbot-v2/backend
```

2. Crie e ative um ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
# ou
.\venv\Scripts\activate   # Windows
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Configure as variáveis de ambiente:
- Crie um arquivo `.env` baseado no `.env.example`
- Adicione suas chaves de API necessárias

5. Inicie o servidor:
```bash
uvicorn app.main:app --reload
```

## 🔧 Scripts Disponíveis

### Frontend
- `pnpm dev`: Inicia o servidor de desenvolvimento
- `pnpm build`: Compila o projeto para produção
- `pnpm preview`: Visualiza a build de produção localmente
- `pnpm lint`: Executa o linter

## 👥 Contribuindo

Adoraríamos contar com sua contribuição! Por favor, leia nossos guias:

- [Guia de Contribuição](CONTRIBUTING.md)
- [Código de Conduta](CODE_OF_CONDUCT.md)

### Como Contribuir

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🌟 Comunidade

- [Discord](https://discord.gg/seu-servidor)
- [Discussões no GitHub](https://github.com/Chatbot-educacional/Chatbot-educacional/discussions)
- [Canal no YouTube](https://youtube.com/@seu-canal)

### Reportando Bugs

Encontrou um bug? Por favor, abra uma [issue](https://github.com/Chatbot-educacional/Chatbot-educacional/issues) com:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs. atual
- Screenshots (se aplicável)
- Informações do seu ambiente

## 🗺️ Roadmap

- [ ] Suporte a mais linguagens de programação
- [ ] Sistema de gamificação
- [ ] Integração com IDEs populares

- [ ] Suporte a múltiplos idiomas
- [ ] Sistema de conquistas
- [ ] Integração com GitHub Classroom

## 📊 Status do Projeto

- [Issues em Aberto](https://github.com/Chatbot-educacional/Chatbot-educacional/issues)
- [Pull Requests](https://github.com/Chatbot-educacional/Chatbot-educacional/pulls)
- [Milestones](https://github.com/Chatbot-educacional/Chatbot-educacional/milestones)

## 🙏 Agradecimentos

Agradecemos a todos os [contribuidores](https://github.com/Chatbot-educacional/Chatbot-educacional/graphs/contributors) que ajudam a tornar este projeto melhor a cada dia.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com ❤️ pela comunidade, para a comunidade.<br/>
  Made with ❤️ by the community, for the community.
</p>
