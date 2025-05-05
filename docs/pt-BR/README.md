# Chatbot-educacional (CoderBot v2)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Tauri](https://img.shields.io/badge/Tauri-FFC131?style=for-the-badge&logo=Tauri&logoColor=white)](https://tauri.studio/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Contributors](https://img.shields.io/github/contributors/Chatbot-educacional/Chatbot-educacional)](https://github.com/Chatbot-educacional/Chatbot-educacional/graphs/contributors)
[![Last Commit](https://img.shields.io/github/last-commit/Chatbot-educacional/Chatbot-educacional)](https://github.com/Chatbot-educacional/Chatbot-educacional/commits/main)

<p align="center">
  <img src="../assets/logo.png" alt="CoderBot Logo" width="200"/>
</p>

[English](../en/README.md) | [Português](./README.md)

Um chatbot educacional moderno para o ensino de programação, construído com tecnologias de ponta e focado na comunidade open source.

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

- 🤖 Tutoria personalizada em programação com IA
- 📚 Exercícios práticos e katas de programação
- 🔍 Feedback em tempo real do código
- 👥 Aprendizado colaborativo
- 🌐 Suporte a múltiplas linguagens de programação
- 💻 Interface desktop com Tauri
- 🔐 Autenticação e armazenamento com PocketBase

## 💡 Propostas em Discussão

Estamos discutindo com a comunidade a implementação das seguintes funcionalidades:

- 🖥️ Colaboração em tempo real via SSHX
  - Terminal compartilhado para professores e alunos
  - Monitoramento de atividades em tempo real
  - Ajuda remota e intervenção quando necessário

Participe da discussão em nossa [página de discussões](https://github.com/Chatbot-educacional/Chatbot-educacional/discussions) e ajude a definir o futuro do projeto!

## 🚀 Tecnologias

### Frontend
- React 18 + TypeScript
- Vite para build e desenvolvimento
- Tailwind CSS para estilização
- Shadcn/ui para componentes
- Monaco Editor para edição de código
- Tauri para aplicação desktop
- PocketBase para autenticação e banco de dados
  - Gerenciamento de usuários
  - Assinaturas em tempo real
  - Armazenamento de arquivos
  - Coleções personalizadas

### Backend
- FastAPI para API REST
- Python 3.8+
- Integração com modelos de IA (OpenAI/DeepSeek)
- Sistema de tutoria contínua

## 📁 Estrutura do Projeto

```
coderbot-v2/
├── frontend/          # Interface do usuário em React
│   ├── src/          # Código fonte React
│   ├── src-tauri/    # Configurações Tauri
│   └── pocketbase/   # Configurações PocketBase
│       ├── collections/  # Schemas das coleções PocketBase
│       └── migrations/   # Migrações do banco de dados
├── backend/          # API em FastAPI
│   ├── app/         # Código fonte Python
│   └── requirements.txt
├── continueTutor/    # Módulo de tutoria contínua
├── temp-tauri/       # Configurações temporárias Tauri
└── docs/            # Documentação do projeto
    ├── pt-BR/      # Documentação em Português
    └── en/         # Documentação em Inglês
```

## 🛠️ Começando

Para instruções detalhadas de instalação e configuração, consulte nosso [Guia de Instalação](./guias/INSTALACAO.md).

### Pré-requisitos
- Node.js 18+ e pnpm
- Python 3.8+
- Rust (para build Tauri)
- PocketBase (para autenticação e banco de dados)

### Configuração do PocketBase
1. Baixe o PocketBase para sua plataforma em [pocketbase.io](https://pocketbase.io/docs/)
2. Extraia o arquivo baixado
3. Execute o PocketBase:
   ```bash
   # Windows
   .\pocketbase.exe serve

   # Linux/macOS
   ./pocketbase serve
   ```
4. Acesse a interface administrativa em `http://127.0.0.1:8090/_/`
5. Crie sua primeira conta de administrador
6. Crie as seguintes coleções:
   - `users` - Para autenticação de usuários
   - `exercises` - Para exercícios de programação
   - `progress` - Para acompanhamento do progresso
   - `feedback` - Para armazenar feedback da IA

Para mais detalhes sobre a configuração do PocketBase, consulte nosso [Guia do PocketBase](./guias/POCKETBASE.md).

### Configuração do Ambiente
1. Clone o repositório
2. Configure as variáveis de ambiente (veja `.env.example`)
3. Instale as dependências do frontend e backend
4. Configure o PocketBase
5. Inicie os serviços

Para mais informações sobre desenvolvimento, consulte nosso [Guia de Desenvolvimento](./guias/DESENVOLVIMENTO.md).

## 👥 Contribuindo

Adoraríamos contar com sua contribuição! Por favor, leia nossos guias:

- [Guia de Contribuição](./CONTRIBUTING.md)
- [Código de Conduta](./CODE_OF_CONDUCT.md)

### Como Contribuir
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🌟 Comunidade

- [Discord](https://discord.gg/seu-servidor)
- [Discussões no GitHub](https://github.com/Chatbot-educacional/Chatbot-educacional/discussions)
- [Canal no YouTube](https://youtube.com/@seu-canal)

## 🗺️ Roadmap

- [ ] Suporte a mais linguagens de programação
- [ ] Sistema de gamificação
- [ ] Integração com IDEs populares
- [ ] Modo offline
- [ ] Suporte a múltiplos idiomas
- [ ] Sistema de conquistas
- [ ] Integração com GitHub Classroom
- [ ] Melhorias na interface do usuário
- [ ] Sistema de progressão de aprendizado
- [ ] Análise de código mais avançada

### Propostas em Discussão
- Integração com SSHX para colaboração em tempo real
  - Terminal compartilhado
  - Monitoramento de atividades
  - Sistema de intervenção do professor

## 📊 Status do Projeto

- [Issues em Aberto](https://github.com/Chatbot-educacional/Chatbot-educacional/issues)
- [Pull Requests](https://github.com/Chatbot-educacional/Chatbot-educacional/pulls)
- [Milestones](https://github.com/Chatbot-educacional/Chatbot-educacional/milestones)

## 🙏 Agradecimentos

Agradecemos a todos os [contribuidores](https://github.com/Chatbot-educacional/Chatbot-educacional/graphs/contributors) que ajudam a tornar este projeto melhor a cada dia.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](../../LICENSE) para mais detalhes.

---

<p align="center">
  Feito com ❤️ pela comunidade, para a comunidade.
</p> 