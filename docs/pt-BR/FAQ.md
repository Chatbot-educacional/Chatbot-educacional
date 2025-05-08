# FAQ (Perguntas Frequentes)

## Instalação

**1. O que fazer se a instalação do PocketBase falhar?**
- Verifique se você baixou a versão correta para seu sistema operacional.
- Certifique-se de que a porta 8090 está livre.
- Consulte o guia de instalação e o canal de suporte no Discord.

**2. Como resolver erro de CORS no backend?**
- Verifique as variáveis de ambiente do backend.
- Adicione as origens permitidas corretamente no arquivo `.env`.

**3. Como corrigir erro de porta em uso?**
- Altere as portas nos arquivos de configuração ou libere as portas ocupadas.

## Uso

**4. Como criar um novo exercício?**
- Acesse o painel do PocketBase, vá até a coleção `exercises` e clique em "Criar".
- Preencha os campos obrigatórios: título, descrição, dificuldade, linguagem, casos de teste e solução.

**5. Como acompanhar o progresso dos alunos?**
- Use a coleção `progress` no PocketBase ou as telas de acompanhamento do frontend (se disponível).

## Pedagogia

**6. O que é o modo Socrático?**
- É um modo em que a IA conduz o aluno por perguntas, sem dar respostas diretas, estimulando o raciocínio.

**7. Como funcionam os exemplos resolvidos?**
- O bot apresenta exemplos similares ao problema do aluno, mas nunca idênticos, para estimular a compreensão por analogia.

## Integração

**8. Como integrar com IDEs externas?**
- No momento, a integração com IDEs está no roadmap. Sugestões e contribuições são bem-vindas!

**9. Como usar o sistema de gamificação?**
- Certifique-se de que as coleções `actions`, `user_actions` e `gamification` estão criadas no PocketBase.
- Consulte o guia de gamificação para exemplos de configuração.

## Problemas Comuns

**10. Não consigo autenticar no PocketBase. O que fazer?**
- Verifique usuário e senha.
- Confira as regras de segurança da coleção `users`.
- Limpe o cache do navegador.

**11. O frontend não conecta com o backend.**
- Verifique URLs e variáveis de ambiente.
- Certifique-se de que ambos os serviços estão rodando.

## Suporte
- Consulte os guias de instalação e desenvolvimento.
- Verifique as issues abertas no GitHub.
- Participe do Discord para dúvidas rápidas. 