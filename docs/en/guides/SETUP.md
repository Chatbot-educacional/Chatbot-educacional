# Setup Guide

This guide will help you set up CoderBot v2 in your local environment.

## Prerequisites

Before starting, make sure you have installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)
- [Python](https://www.python.org/) (version 3.8 or higher)
- [Rust](https://www.rust-lang.org/) (required for Tauri)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Chatbot-educacional/Chatbot-educacional.git
cd Chatbot-educacional/coderbot-v2
```

### 2. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Fill in the required variables

4. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

### 3. Backend Setup

1. Navigate to the backend directory:
```bash
cd ../backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
# or
.\venv\Scripts\activate   # Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
- Copy `.env.example` to `.env`
- Add your required API keys

5. Start the server:
```bash
uvicorn app.main:app --reload
```

### 4. PocketBase Setup

1. Download PocketBase for your operating system:
```bash
# Linux
wget https://github.com/pocketbase/pocketbase/releases/download/v0.17.3/pocketbase_0.17.3_linux_amd64.zip
unzip pocketbase_0.17.3_linux_amd64.zip

# Windows
# Download from GitHub: https://github.com/pocketbase/pocketbase/releases
```

2. Start PocketBase:
```bash
./pocketbase serve
```

3. Access the admin panel at: http://localhost:8090

### 5. Continue Setup

1. Navigate to the continueTutor directory:
```bash
cd ../continueTutor
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Add your required API keys

4. Start the Continue server:
```bash
pnpm dev
# or
npm run dev
```

### 6. Tauri Setup (Optional)

If you want to develop or build the desktop version of the application:

1. Install Tauri dependencies by following the [official guide](https://tauri.app/v1/guides/getting-started/prerequisites)

2. Run the Tauri app:
```bash
cd frontend
pnpm tauri dev
# or
npm run tauri dev
```

## Verifying the Installation

After installation, you should have access to:

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Common Issues

### `node-gyp` error on Windows
- Install Windows build tools:
```bash
npm install --global windows-build-tools
```

### CORS Error
- Check if allowed origins are properly configured in the backend's `.env` file

### Port in Use Error
- Check if ports 5173 and 8000 are available
- Change ports in configuration files if needed

## Next Steps

- Read the [Development Guide](DEVELOPMENT.md)
- Explore the [API documentation](http://localhost:8000/docs)
- Join our [Discord](https://discord.gg/your-server)

## Support

If you encounter any issues during installation:

1. Check existing [Issues](https://github.com/Chatbot-educacional/Chatbot-educacional/issues)
2. Ask in our [Discord](https://discord.gg/your-server)
3. Open a new issue with problem details 