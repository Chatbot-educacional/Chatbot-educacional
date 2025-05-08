# Guia de Desenvolvimento

Este guia fornece informações detalhadas sobre o desenvolvimento do CoderBot v2.

## 🔧 Ambiente de Desenvolvimento

### Editores Recomendados
- [Visual Studio Code](https://code.visualstudio.com/)
- [PyCharm](https://www.jetbrains.com/pycharm/)

### Extensões Recomendadas (VS Code)
- ESLint
- Prettier
- Python
- Tailwind CSS IntelliSense
- Tauri
- GitLens

## 📁 Estrutura do Projeto

```
coderbot-v2/
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes React reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── hooks/        # Hooks personalizados
│   │   ├── services/     # Serviços e APIs
│   │   ├── styles/       # Estilos globais
│   │   └── utils/        # Utilitários e helpers
│   ├── public/           # Arquivos estáticos
│   └── tests/            # Testes do frontend
├── backend/
│   ├── app/
│   │   ├── api/          # Endpoints da API
│   │   ├── core/         # Configurações principais
│   │   ├── models/       # Modelos de dados
│   │   ├── services/     # Lógica de negócios
│   │   └── utils/        # Utilitários
│   └── tests/            # Testes do backend
├── continueTutor/        # Módulo de IA
│   ├── src/             # Código fonte
│   ├── models/          # Modelos de IA
│   └── tests/           # Testes do módulo
└── docs/                # Documentação
```

## 🚀 Fluxo de Desenvolvimento

### 1. Preparação
1. Crie uma nova branch para sua feature:
```bash
git checkout -b feature/nome-da-feature
```

2. Mantenha sua branch atualizada:
```bash
git pull origin main
git rebase main
```

### 2. Desenvolvimento Frontend

#### Componentes
- Use TypeScript para todos os componentes
- Siga o padrão de componentes funcionais
- Documente com JSDoc
- Implemente testes unitários

Exemplo de componente:
```tsx
interface ButtonProps {
  /** Texto do botão */
  label: string;
  /** Função chamada ao clicar */
  onClick: () => void;
  /** Estado de desabilitado */
  disabled?: boolean;
}

/** Botão padrão da aplicação */
export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-primary text-white rounded"
    >
      {label}
    </button>
  );
};
```

#### Estilos
- Use Tailwind CSS para estilização
- Mantenha classes organizadas
- Crie componentes para padrões repetitivos

### 3. Desenvolvimento Backend

#### APIs
- Use tipos explícitos
- Documente com docstrings
- Implemente validação de dados
- Adicione logs apropriados

#### PocketBase
- Use o painel administrativo para gerenciar dados
- Configure coleções e regras de acesso
- Implemente autenticação e autorização
- Use a API REST do PocketBase

Exemplo de integração com PocketBase:
```typescript
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8090');

// Autenticação
await pb.admins.authWithPassword('email@exemplo.com', 'senha');

// Criar registro
const record = await pb.collection('users').create({
  name: 'John Doe',
  email: 'john@exemplo.com'
});

// Consultar registros
const records = await pb.collection('users').getList(1, 20, {
  filter: 'created >= "2023-01-01"'
});
```

#### Continue
- Implemente modelos de IA personalizados
- Configure pipelines de processamento
- Gerencie o contexto da conversa
- Otimize respostas

Exemplo de uso do Continue:
```typescript
import { ContinueClient } from '@continue/client';

const client = new ContinueClient({
  apiKey: process.env.CONTINUE_API_KEY,
  model: 'gpt-4'
});

const response = await client.chat({
  messages: [
    { role: 'system', content: 'Você é um tutor de programação' },
    { role: 'user', content: 'Explique o que é uma função em JavaScript' }
  ]
});
```

### 4. Testes

#### Frontend
```bash
# Executa testes
pnpm test

# Modo watch
pnpm test:watch

# Cobertura
pnpm test:coverage
```

#### Backend
```bash
# Executa testes
pytest

# Com cobertura
pytest --cov=app
```

### 5. Commits

Siga o padrão de commits convencionais:

```
feat: adiciona novo componente de botão
^--^  ^-----------------------------^
|     |
|     +-> Descrição no presente
|
+-------> Tipo: feat, fix, docs, style, refactor, test, chore
```

### 6. Pull Requests

1. Atualize a documentação
2. Verifique a cobertura de testes
3. Resolva conflitos se necessário
4. Solicite review
5. Responda aos comentários

## 📚 Recursos Úteis

- [Documentação do React](https://react.dev/)
- [Documentação do FastAPI](https://fastapi.tiangolo.com/)
- [Guia do Tailwind CSS](https://tailwindcss.com/)
- [Documentação do Tauri](https://tauri.app/)

## 🐛 Depuração

### Frontend
- Use React DevTools
- Configure Source Maps
- Use `console.log` com moderação

### Backend
- Use `debugger` do Python
- Configure logs apropriados
- Use Swagger UI para testar APIs

## 🔍 Code Review

### Checklist
- [ ] Código segue os padrões
- [ ] Testes foram adicionados
- [ ] Documentação foi atualizada
- [ ] Não há código comentado
- [ ] Variáveis têm nomes significativos
- [ ] Funções são pequenas e focadas

## 📦 Deploy

Consulte o [Guia de Implantação](IMPLANTACAO.md) para informações sobre deploy.

## ❓ Suporte

- Use o [Discord](https://discord.gg/seu-servidor) para dúvidas
- Abra issues para bugs
- Consulte a documentação 