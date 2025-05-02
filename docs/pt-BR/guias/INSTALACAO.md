# Guia de Instalação

Este guia irá ajudá-lo a configurar o CoderBot v2 em seu ambiente local.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [pnpm](https://pnpm.io/) ou [npm](https://www.npmjs.com/)
- [Python](https://www.python.org/) (versão 3.8 ou superior)
- [Rust](https://www.rust-lang.org/) (necessário para o Tauri)

## Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/Chatbot-educacional/Chatbot-educacional.git
cd Chatbot-educacional/coderbot-v2
```

### 2. Configuração do Frontend

1. Navegue até o diretório frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
pnpm install
# ou
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Preencha as variáveis necessárias

4. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
# ou
npm run dev
```

### 3. Configuração do Backend

1. Navegue até o diretório backend:
```bash
cd ../backend
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
- Copie o arquivo `.env.example` para `.env`
- Adicione suas chaves de API necessárias

5. Inicie o servidor:
```bash
uvicorn app.main:app --reload
```

### 4. Configuração do PocketBase

1. Baixe o PocketBase para seu sistema operacional:
```bash
# Linux
wget https://github.com/pocketbase/pocketbase/releases/download/v0.17.3/pocketbase_0.17.3_linux_amd64.zip
unzip pocketbase_0.17.3_linux_amd64.zip

# Windows
# Baixe do GitHub: https://github.com/pocketbase/pocketbase/releases
```

2. Inicie o PocketBase:
```bash
./pocketbase serve
```

3. Acesse o painel administrativo em: http://localhost:8090

### 5. Configuração do Continue

1. Navegue até o diretório continueTutor:
```bash
cd ../continueTutor
```

2. Instale as dependências:
```bash
pnpm install
# ou
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Adicione suas chaves de API necessárias

4. Inicie o servidor Continue:
```bash
pnpm dev
# ou
npm run dev
```

### 6. Configuração do Tauri (Opcional)

Se você deseja desenvolver ou construir a versão desktop do aplicativo:

1. Instale as dependências do Tauri seguindo o [guia oficial](https://tauri.app/v1/guides/getting-started/prerequisites)

2. Execute o aplicativo Tauri:
```bash
cd frontend
pnpm tauri dev
# ou
npm run tauri dev
```

## Verificando a Instalação

Após a instalação, você deve ter acesso a:

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Problemas Comuns

### `node-gyp` erro no Windows
- Instale as ferramentas de build do Windows:
```bash
npm install --global windows-build-tools
```

### Erro de CORS
- Verifique se as origens permitidas estão configuradas corretamente no arquivo `.env` do backend

### Erro de Porta em Uso
- Verifique se as portas 5173 e 8000 estão disponíveis
- Altere as portas nos arquivos de configuração se necessário

## Próximos Passos

- Leia o [Guia de Desenvolvimento](DESENVOLVIMENTO.md)
- Explore a [documentação da API](http://localhost:8000/docs)
- Junte-se ao nosso [Discord](https://discord.gg/seu-servidor)

## Suporte

Se você encontrar algum problema durante a instalação:

1. Verifique as [Issues](https://github.com/Chatbot-educacional/Chatbot-educacional/issues) existentes
2. Pergunte no nosso [Discord](https://discord.gg/seu-servidor)
3. Abra uma nova issue com detalhes do problema 