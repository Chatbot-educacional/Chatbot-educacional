# Casos de Uso

## Sumário
- [Fluxo do Aluno](#fluxo-do-aluno)
- [Fluxo do Professor](#fluxo-do-professor)
- [Fluxo do Administrador](#fluxo-do-administrador)

---

## Fluxo do Aluno

1. **Cadastro e Login**
   - O aluno acessa a tela de cadastro e cria uma conta.
   - Faz login usando email e senha.

2. **Resolução de Exercícios**
   - Seleciona uma trilha de aprendizado ou exercício.
   - Lê o enunciado, escreve o código e submete.
   - Recebe feedback automático da IA (modo Socrático, exemplos resolvidos, etc).

3. **Acompanhamento de Progresso**
   - Visualiza seu progresso na tela de dashboard.
   - Recebe sugestões de revisão e novos desafios.

4. **Gamificação**
   - Ganha pontos e badges ao completar tarefas.
   - Consulta ranking e conquistas.

## Fluxo do Professor

1. **Criação de Exercícios**
   - Acessa o painel do PocketBase ou interface web.
   - Cria novos exercícios, define testes, dicas e soluções.

2. **Acompanhamento de Turmas**
   - Visualiza progresso dos alunos.
   - Intervém em tempo real via terminal compartilhado (SSHX, futuro).

3. **Feedback Personalizado**
   - Analisa respostas dos alunos e envia feedback manual ou automatizado.

## Fluxo do Administrador

1. **Gerenciamento de Usuários**
   - Aprova, bloqueia ou remove contas.
   - Define papéis (aluno, professor, admin).

2. **Configuração de Gamificação**
   - Cria e edita ações, badges e regras de pontuação no PocketBase.

3. **Backup e Segurança**
   - Realiza backup do banco de dados.
   - Audita logs e acessos.

---

## Exemplos Práticos

### Exemplo: Submissão de Exercício (Aluno)
```bash
curl -X POST http://localhost:8000/api/submit \
  -H 'Authorization: Bearer <token>' \
  -d '{"exercise_id": "abc123", "code": "print(42)"}'
```

### Exemplo: Criação de Exercício (Professor)
```json
{
  "title": "Soma de Dois Números",
  "description": "Implemente uma função que recebe dois números e retorna a soma.",
  "difficulty": "beginner",
  "language": "python",
  "test_cases": [{"input": "1 2", "output": "3"}],
  "solution": "def soma(a, b): return a + b"
}
```

### Exemplo: Backup (Admin)
```bash
./pocketbase export --dir ./pb_backup
``` 