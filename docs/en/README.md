# Educational Chatbot (CoderBot v2)
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

[English](./README.md) | [Português](../pt-BR/README.md)

A modern educational chatbot for programming education, built with cutting-edge technologies and focused on the open source community. Our goal is to maximize learning through AI, offering a personalized experience that adapts to each student's needs and interests, combining various innovative educational tools.

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Technologies](#-technologies)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Contributing](#-contributing)
- [Community](#-community)
- [Roadmap](#-roadmap)
- [License](#-license)

## 🎯 About the Project

CoderBot v2 is an open source educational platform designed to assist students and teachers in the programming learning process. Through an intuitive interface and an intelligent tutoring system, we offer:

- 🤖 AI-Powered Personalized Programming Tutoring
  - Adaptation to student's learning style
  - Interest-based personalized learning paths
  - Adaptive and progressive feedback
- 📚 Practical exercises and programming katas
- 🔍 Real-time code feedback
- 👥 Collaborative learning
- 🌐 Support for multiple programming languages
- 💻 Desktop interface with Tauri
- 🔐 Authentication and storage with PocketBase
- 🎯 Personalized learning objectives
- 📊 Individual progress metrics
- 🎮 Adaptive gamification

## 💡 Proposals Under Discussion

We are discussing with the community the implementation of the following features:

- 🖥️ Real-time collaboration via SSHX
  - Shared terminal for teachers and students
  - Real-time activity monitoring
  - Remote assistance and intervention when needed

Join the discussion on our [discussions page](https://github.com/Chatbot-educacional/Chatbot-educacional/discussions) and help shape the future of the project!

## 🚀 Technologies

### Frontend
- React 18 + TypeScript
- Vite for build and development
- Tailwind CSS for styling
- Shadcn/ui for components
- Monaco Editor for code editing
- Tauri for desktop application
- PocketBase for authentication and database
  - User management
  - Real-time subscriptions
  - File storage
  - Custom collections

### Backend
- FastAPI for REST API
- Python 3.8+
- AI model integration (OpenAI/DeepSeek)
- Continuous tutoring system

## 📁 Project Structure

```
coderbot-v2/
├── frontend/          # React user interface
│   ├── src/          # React source code
│   ├── src-tauri/    # Tauri configurations
│   └── pocketbase/   # PocketBase configurations
│       ├── collections/  # PocketBase collection schemas
│       └── migrations/   # Database migrations
├── backend/          # FastAPI backend
│   ├── app/         # Python source code
│   └── requirements.txt
├── continueTutor/    # Continuous tutoring module
├── temp-tauri/       # Temporary Tauri configurations
└── docs/            # Project documentation
    ├── pt-BR/      # Portuguese documentation
    └── en/         # English documentation
```

## 🛠️ Getting Started

For detailed installation and configuration instructions, please refer to our [Installation Guide](./guides/INSTALLATION.md).

### Prerequisites
- Node.js 18+ and pnpm
- Python 3.8+
- Rust (for Tauri build)
- PocketBase (for authentication and database)

### PocketBase Setup
1. Download PocketBase for your platform from [pocketbase.io](https://pocketbase.io/docs/)
2. Extract the downloaded file
3. Run PocketBase:
   ```bash
   # Windows
   .\pocketbase.exe serve

   # Linux/macOS
   ./pocketbase serve
   ```
4. Access the admin UI at `http://127.0.0.1:8090/_/`
5. Create your first admin account
6. Create the following collections:
   - `users` - For user authentication
   - `exercises` - For programming exercises
   - `progress` - For tracking user progress
   - `feedback` - For storing AI feedback

For more details about PocketBase configuration, check our [PocketBase Guide](./guides/POCKETBASE.md).

### Environment Setup
1. Clone the repository
2. Configure environment variables (see `.env.example`)
3. Install frontend and backend dependencies
4. Configure PocketBase
5. Start the services

For more information about development, please refer to our [Development Guide](./guides/DEVELOPMENT.md).

## 👥 Contributing

We'd love to have your contribution! Please read our guides:

- [Contribution Guide](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)

### How to Contribute
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🌟 Community

### Discord
Join our community on Discord! Our server is organized as follows:

#### 📢 Announcement Channels
- `#announcements` - Important project announcements
- `#updates` - Version and feature updates

#### 💻 Development
- `#development` - General development discussions
- `#frontend` - React, Tauri, and interface discussions
- `#backend` - FastAPI and Python discussions
- `#ai` - AI integration discussions
- `#bugs` - Bug reporting and discussion

#### 👥 Community
- `#introductions` - Introduce yourself to the community
- `#general` - General conversations
- `#help` - Get help with the project
- `#proposals` - Discuss new ideas and features

#### 🎓 Education
- `#tutorials` - Share and discuss tutorials
- `#questions` - Ask programming questions
- `#resources` - Share educational resources

#### 🎮 Leisure
- `#off-topic` - Casual conversations
- `#events` - Community events

[Join our Discord](https://discord.gg/seu-servidor)

### Other Channels
- [GitHub Discussions](https://github.com/Chatbot-educacional/Chatbot-educacional/discussions)
- [YouTube Channel](https://youtube.com/@seu-canal)

## 🗺️ Roadmap

- [ ] Support for more programming languages
- [ ] Gamification system
- [ ] Integration with popular IDEs
- [ ] Offline mode
- [ ] Multi-language support
- [ ] Achievement system
- [ ] GitHub Classroom integration
- [ ] UI improvements
- [ ] Learning progression system
- [ ] Advanced code analysis

### Proposals Under Discussion
- SSHX integration for real-time collaboration
  - Shared terminal
  - Activity monitoring
  - Teacher intervention system

## 📊 Project Status

- [Open Issues](https://github.com/Chatbot-educacional/Chatbot-educacional/issues)
- [Pull Requests](https://github.com/Chatbot-educacional/Chatbot-educacional/pulls)
- [Milestones](https://github.com/Chatbot-educacional/Chatbot-educacional/milestones)

## 🙏 Acknowledgments

We thank all [contributors](https://github.com/Chatbot-educacional/Chatbot-educacional/graphs/contributors) who help make this project better every day.

## 📝 License

This project is under the MIT license. See the [LICENSE](../../LICENSE) file for more details.

---

<p align="center">
  Made with ❤️ by the community, for the community.
</p> 