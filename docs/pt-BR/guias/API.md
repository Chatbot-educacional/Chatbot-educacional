# Guia de API

## Sumário
- [Autenticação](#autenticação)
- [Endpoints Principais](#endpoints-principais)
- [Exemplos de Uso](#exemplos-de-uso)
- [Testando a API](#testando-a-api)

---

## Autenticação

A API utiliza autenticação via token JWT. Para obter um token, faça login:

```bash
curl -X POST http://localhost:8000/api/login \
  -d '{"email": "usuario@exemplo.com", "password": "senha"}'
```

A resposta conterá um campo `access_token`.

Inclua o token no header das requisições:
```http
Authorization: Bearer <access_token>
```

## Endpoints Principais

### Exercícios
- `GET /api/exercises` — Lista exercícios disponíveis
- `GET /api/exercises/{id}` — Detalhes de um exercício
- `POST /api/exercises` — Cria novo exercício (professor/admin)

### Submissão de Código
- `POST /api/submit` — Submete código para avaliação
  - Body: `{ "exercise_id": "abc123", "code": "print(42)" }`

### Progresso
- `GET /api/progress` — Progresso do usuário autenticado

### Usuários
- `POST /api/register` — Cadastro de novo usuário
- `POST /api/login` — Login

## Exemplos de Uso

### Listar Exercícios
```bash
curl -H 'Authorization: Bearer <token>' http://localhost:8000/api/exercises
```

### Submeter Código
```bash
curl -X POST http://localhost:8000/api/submit \
  -H 'Authorization: Bearer <token>' \
  -d '{"exercise_id": "abc123", "code": "print(42)"}'
```

## Testando a API
- Use o Swagger UI em `http://localhost:8000/docs` para explorar e testar endpoints.
- Ferramentas recomendadas: [Insomnia](https://insomnia.rest/), [Postman](https://www.postman.com/).

## Observações
- Consulte o código-fonte para detalhes de validação e regras de negócio.
- Endpoints podem exigir diferentes níveis de permissão (aluno, professor, admin). 