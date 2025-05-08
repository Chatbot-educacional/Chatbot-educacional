# Guia do PocketBase

## Visão Geral

O PocketBase é usado no CoderBot v2 para autenticação, banco de dados e recursos em tempo real. Este guia abrange a configuração, instalação e schema do banco de dados.

## Instalação

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

## Schema do Banco de Dados

### Coleções

#### 1. Usuários
```json
{
  "name": "users",
  "type": "auth",
  "schema": [
    {
      "name": "username",
      "type": "text",
      "required": true,
      "unique": true
    },
    {
      "name": "email",
      "type": "email",
      "required": true,
      "unique": true
    },
    {
      "name": "role",
      "type": "select",
      "options": ["student", "teacher", "admin"],
      "required": true
    },
    {
      "name": "learning_style",
      "type": "select",
      "options": ["visual", "auditory", "reading", "kinesthetic"],
      "required": false
    },
    {
      "name": "preferred_languages",
      "type": "select",
      "options": ["python", "javascript", "java", "c++"],
      "multiple": true,
      "required": false
    }
  ]
}
```

#### 2. Exercícios
```json
{
  "name": "exercises",
  "type": "base",
  "schema": [
    {
      "name": "title",
      "type": "text",
      "required": true
    },
    {
      "name": "description",
      "type": "text",
      "required": true
    },
    {
      "name": "difficulty",
      "type": "select",
      "options": ["beginner", "intermediate", "advanced"],
      "required": true
    },
    {
      "name": "language",
      "type": "select",
      "options": ["python", "javascript", "java", "c++"],
      "required": true
    },
    {
      "name": "test_cases",
      "type": "json",
      "required": true
    },
    {
      "name": "solution",
      "type": "text",
      "required": true
    },
    {
      "name": "hints",
      "type": "json",
      "required": false
    }
  ]
}
```

#### 3. Progresso
```json
{
  "name": "progress",
  "type": "base",
  "schema": [
    {
      "name": "user",
      "type": "relation",
      "required": true,
      "options": {
        "collectionId": "users",
        "cascadeDelete": true
      }
    },
    {
      "name": "exercise",
      "type": "relation",
      "required": true,
      "options": {
        "collectionId": "exercises",
        "cascadeDelete": true
      }
    },
    {
      "name": "status",
      "type": "select",
      "options": ["not_started", "in_progress", "completed"],
      "required": true
    },
    {
      "name": "attempts",
      "type": "number",
      "required": true,
      "min": 0
    },
    {
      "name": "last_attempt",
      "type": "date",
      "required": false
    },
    {
      "name": "score",
      "type": "number",
      "required": false,
      "min": 0,
      "max": 100
    }
  ]
}
```

#### 4. Feedback
```json
{
  "name": "feedback",
  "type": "base",
  "schema": [
    {
      "name": "user",
      "type": "relation",
      "required": true,
      "options": {
        "collectionId": "users",
        "cascadeDelete": true
      }
    },
    {
      "name": "exercise",
      "type": "relation",
      "required": true,
      "options": {
        "collectionId": "exercises",
        "cascadeDelete": true
      }
    },
    {
      "name": "code",
      "type": "text",
      "required": true
    },
    {
      "name": "ai_feedback",
      "type": "text",
      "required": true
    },
    {
      "name": "suggestions",
      "type": "json",
      "required": false
    },
    {
      "name": "created",
      "type": "date",
      "required": true
    }
  ]
}
```

#### 5. Trilhas de Aprendizado
```json
{
  "name": "learning_paths",
  "type": "base",
  "schema": [
    {
      "name": "title",
      "type": "text",
      "required": true
    },
    {
      "name": "description",
      "type": "text",
      "required": true
    },
    {
      "name": "difficulty",
      "type": "select",
      "options": ["beginner", "intermediate", "advanced"],
      "required": true
    },
    {
      "name": "exercises",
      "type": "relation",
      "multiple": true,
      "required": true,
      "options": {
        "collectionId": "exercises",
        "cascadeDelete": false
      }
    },
    {
      "name": "prerequisites",
      "type": "relation",
      "multiple": true,
      "required": false,
      "options": {
        "collectionId": "learning_paths",
        "cascadeDelete": false
      }
    }
  ]
}
```

## Recursos em Tempo Real

O PocketBase fornece assinaturas em tempo real que usamos para:

1. Feedback de código em tempo real
2. Atualizações de progresso
3. Recursos colaborativos
4. Monitoramento do professor

Exemplo de assinatura:
```typescript
// Inscrever-se para atualizações de progresso do usuário
pb.collection('progress').subscribe('*', function(e) {
  console.log(e.record);
});
```

## Regras de Segurança

### Coleção de Usuários
```javascript
// Permitir que usuários leiam apenas seus próprios dados
if (auth.id != record.id) {
  return false;
}
```

### Coleção de Exercícios
```javascript
// Permitir acesso de leitura para todos os usuários autenticados
if (auth) {
  return true;
}
```

### Coleção de Progresso
```javascript
// Usuários podem ler apenas seu próprio progresso
if (auth.id != record.user) {
  return false;
}
```

## Backup e Migração

1. Backups regulares:
   ```bash
   # Exportar dados
   pocketbase export --dir ./pb_backup
   
   # Importar dados
   pocketbase import --dir ./pb_backup
   ```

2. Migrações do banco de dados são armazenadas em `frontend/pocketbase/migrations/`

## Melhores Práticas

1. Sempre use relações para integridade dos dados
2. Implemente regras de segurança adequadas
3. Use assinaturas em tempo real para recursos ao vivo
4. Faça backups regulares
5. Controle de versão das mudanças no schema

## Solução de Problemas

Problemas comuns e soluções:

1. **Problemas de Conexão**
   - Verifique se o PocketBase está rodando
   - Verifique a porta (padrão: 8090)
   - Verifique as configurações do firewall

2. **Problemas de Autenticação**
   - Verifique as credenciais do usuário
   - Verifique as regras de segurança
   - Limpe o cache do navegador

3. **Problemas em Tempo Real**
   - Verifique a conexão WebSocket
   - Verifique as regras de assinatura
   - Monitore os logs do servidor

## Recursos Adicionais

- [Documentação do PocketBase](https://pocketbase.io/docs/)
- [Referência da API](https://pocketbase.io/docs/api-records/)
- [Regras de Segurança](https://pocketbase.io/docs/security-rules/)
- [Assinaturas em Tempo Real](https://pocketbase.io/docs/subscriptions/) 