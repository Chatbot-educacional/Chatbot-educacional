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
- [Justificativa Científica e Técnica](#-justificativa-científica-e-técnica)

## 🎯 Sobre o Projeto

O CoderBot v2 é uma plataforma educacional open source projetada para auxiliar estudantes e professores no processo de aprendizagem de programação. Através de uma interface intuitiva e um sistema de tutoria inteligente, oferecemos:

- 🤖 Tutoria personalizada em programação com IA
- 📚 Exercícios práticos e katas de programação
- 🔍 Feedback em tempo real do código
- 👥 Aprendizado colaborativo
- 🌐 Suporte a múltiplas linguagens de programação
- 💻 Interface desktop com Tauri
- 🔐 Autenticação e armazenamento com PocketBase

## 🧠 Metodologias Pedagógicas Embutidas

O grande diferencial do CoderBot v2 não está apenas no uso de IA, mas em como a IA é projetada para ensinar. O sistema utiliza técnicas pedagógicas consagradas, embutidas diretamente na engenharia de prompt, para transformar a experiência de aprendizado:

- **Questionamento Socrático:** A IA nunca entrega a resposta pronta. Ela conduz o aluno por meio de perguntas, incentivando o raciocínio e a descoberta ativa.
- **Worked Examples (Exemplos Resolvidos):** O bot apresenta exemplos similares, mas não idênticos, ao problema do aluno, estimulando a compreensão por analogia.
- **Feedback de Erro:** Em vez de apenas corrigir, a IA aponta onde está o erro e sugere hipóteses, promovendo a reflexão sobre o processo.
- **Analogias e Desafios:** Utiliza analogias simples e desafios progressivos para facilitar a compreensão de conceitos complexos.
- **Espaçamento e Revisão Ativa:** O sistema pode relembrar conteúdos e propor revisões para reforçar o aprendizado ao longo do tempo.

Cada modo pedagógico é "pluggável": o usuário pode escolher como quer ser guiado (ex: modo Socrático, modo com analogias, modo com dicas programadas, etc).

> O objetivo do CoderBot v2 é ensinar a pensar, não apenas entregar respostas. A IA atua como um instrutor pedagógico, guiando o aluno a desenvolver autonomia e confiança na resolução de problemas.

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

## 📈 Justificativa Científica, Estatísticas e Alternativas Open Source

### Panorama Atual: IA e Chatbots na Educação

- **Crescimento do Mercado**: O mercado global de IA na educação deve atingir US$ 80 bilhões até 2032, com taxa de crescimento anual de 43,3%. O e-learning, impulsionado por IA, deve alcançar US$ 239,3 bilhões até 2027. ([Rask AI, 2024](https://pt.rask.ai/research/ai-in-education), [BureauWorks, 2025](https://www.bureauworks.com/fr/blog/ai-estatisticas-500-fatos-impulsionando-a-inovacao-global))
- **Adoção de Chatbots**: Até 2025, chatbots com IA devem gerenciar 95% das interações digitais, economizando bilhões de horas em suporte e tutoria. ([BureauWorks, 2025](https://www.bureauworks.com/fr/blog/ai-estatisticas-500-fatos-impulsionando-a-inovacao-global))
- **Engajamento e Personalização**: Conteúdos educativos gerados por IA são tão cativantes quanto os criados por humanos, e a IA aumenta a produtividade em média 66% em ambientes educacionais. ([Rask AI, 2024](https://pt.rask.ai/research/ai-in-education))

### Justificativas para Alternativas Open Source

#### 1. **Transparência e Confiabilidade**
- O código aberto permite auditoria independente, aumentando a confiança e a segurança.
- Facilita a identificação e correção de vulnerabilidades.
- Promove a confiança da comunidade educacional e institucional.

#### 2. **Colaboração e Inovação**
- Permite que educadores, desenvolvedores e pesquisadores contribuam com melhorias e adaptações.
- Acelera o desenvolvimento e a adoção de novas metodologias e tecnologias.
- Exemplo: O uso de PocketBase, React e FastAPI permite customização, integração e evolução contínua.

#### 3. **Sustentabilidade e Acessibilidade**
- Reduz dependência de soluções proprietárias e custos de licenciamento.
- Facilita a manutenção e evolução pela comunidade.
- Permite adaptações para necessidades especiais, ampliando o acesso à educação de qualidade.

#### 4. **Benefícios Práticos e Sociais**
- **Personalização do Ensino**: IA adapta o conteúdo ao ritmo e estilo de cada aluno, aumentando retenção e engajamento.
- **Apoio ao Professor**: Chatbots automatizam dúvidas frequentes, liberando tempo para atividades estratégicas e fornecendo relatórios detalhados.
- **Colaboração e Aprendizado Ativo**: Ferramentas colaborativas e feedback em tempo real estimulam o aprendizado ativo e o trabalho em equipe.

#### 5. **Base Científica e Relatórios**
- O Banco Mundial destaca que a IA na educação promove inovação, personalização e eficiência, reduzindo desigualdades e apoiando professores com feedback em tempo real. ([Relatório Banco Mundial, 2024](https://documents1.worldbank.org/curated/en/099735306272422279/pdf/IDU1c4bdb3b81e51f1481118de31d54c57446821.pdf))

---

> **Referências:**
> - [Rask AI: Estatísticas de IA na Educação 2024](https://pt.rask.ai/research/ai-in-education)
> - [BureauWorks: Estatísticas de IA 2025](https://www.bureauworks.com/fr/blog/ai-estatisticas-500-fatos-impulsionando-a-inovacao-global)
> - [Banco Mundial: A Revolução da IA na Educação (2024)](https://documents1.worldbank.org/curated/en/099735306272422279/pdf/IDU1c4bdb3b81e51f1481118de31d54c57446821.pdf)

---

## 📦 Configuração do PocketBase para Gamificação

### 1. Collection: `actions`  
**Descrição:** Define cada ação de gamificação possível e quantos pontos ela concede.

| Campo        | Tipo     | Obrigatório | Descrição                                      |
|--------------|----------|-------------|------------------------------------------------|
| name         | string   | sim         | Nome único da ação (ex: `whiteboard_save_board`) |
| description  | string   | não         | Descrição legível da ação                      |
| points       | number   | sim         | Pontos/XP atribuídos por essa ação             |
| multiplier   | number   | não         | Multiplicador de XP (opcional)                 |
| badge        | string   | não         | Badge concedido (opcional)                     |
| context      | string   | não         | Contexto especial (opcional)                   |

**Exemplos de registros:**
- `whiteboard_save_board` — 10 pontos
- `whiteboard_create_board` — 50 pontos
- `whiteboard_open_board` — 20 pontos
- `whiteboard_upload_file` — 30 pontos
- `whiteboard_daily_bonus` — 200 pontos
- `whiteboard_10_boards` — 500 pontos
- `access_excalidraw` — 100 pontos

---

### 2. Collection: `user_actions`  
**Descrição:** Histórico de ações realizadas por cada usuário.

| Campo     | Tipo     | Obrigatório | Descrição                        |
|-----------|----------|-------------|----------------------------------|
| user      | relation | sim         | Relaciona com a collection `users` |
| action    | string   | sim         | Nome da ação (deve bater com `actions.name`) |
| context   | string   | não         | Contexto especial (opcional)     |
| timestamp | date     | sim         | Data/hora da ação                |

---

### 3. Collection: `gamification`  
**Descrição:** Estado atual de gamificação do usuário (XP, nível, badges, etc).

| Campo     | Tipo     | Obrigatório | Descrição                        |
|-----------|----------|-------------|----------------------------------|
| user      | relation | sim         | Relaciona com a collection `users` |
| points    | number   | sim         | Pontos/XP acumulados             |
| level     | number   | sim         | Nível atual                      |
| badges    | list     | não         | Lista de badges/conquistas       |

---

### 4. (Opcional) Collection: `badges`  
**Descrição:** Lista de todos os badges possíveis, caso queira badges customizados.

| Campo     | Tipo     | Obrigatório | Descrição                        |
|-----------|----------|-------------|----------------------------------|
| name      | string   | sim         | Nome do badge                    |
| icon      | file     | não         | Ícone do badge                   |
| description | string | não         | Descrição do badge               |

---

## 📋 Observações

- Certifique-se de que os nomes das ações em `actions` batem com os usados no frontend (`registerUserAction`).
- O campo `user` nas collections deve ser do tipo **relation** para a collection `users`.
- O campo `timestamp` em `user_actions` pode ser do tipo **date** ou **text** (ISO string).

<p align="center">
  Feito com ❤️ pela comunidade, para a comunidade.
</p> 