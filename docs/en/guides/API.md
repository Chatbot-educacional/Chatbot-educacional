# API Guide

## Table of Contents
- [Authentication](#authentication)
- [Main Endpoints](#main-endpoints)
- [Usage Examples](#usage-examples)
- [Testing the API](#testing-the-api)

---

## Authentication

The API uses JWT token authentication. To obtain a token, log in:

```bash
curl -X POST http://localhost:8000/api/login \
  -d '{"email": "user@example.com", "password": "password"}'
```

The response will contain an `access_token` field.

Include the token in the request header:
```http
Authorization: Bearer <access_token>
```

## Main Endpoints

### Exercises
- `GET /api/exercises` — List available exercises
- `GET /api/exercises/{id}` — Exercise details
- `POST /api/exercises` — Create new exercise (teacher/admin)

### Code Submission
- `POST /api/submit` — Submit code for evaluation
  - Body: `{ "exercise_id": "abc123", "code": "print(42)" }`

### Progress
- `GET /api/progress` — Progress of the authenticated user

### Users
- `POST /api/register` — Register a new user
- `POST /api/login` — Login

## Usage Examples

### List Exercises
```bash
curl -H 'Authorization: Bearer <token>' http://localhost:8000/api/exercises
```

### Submit Code
```bash
curl -X POST http://localhost:8000/api/submit \
  -H 'Authorization: Bearer <token>' \
  -d '{"exercise_id": "abc123", "code": "print(42)"}'
```

## Testing the API
- Use Swagger UI at `http://localhost:8000/docs` to explore and test endpoints.
- Recommended tools: [Insomnia](https://insomnia.rest/), [Postman](https://www.postman.com/).

## Notes
- Check the source code for validation and business rules details.
- Endpoints may require different permission levels (student, teacher, admin). 