from fastapi import HTTPException, status
from httpx import AsyncClient, HTTPStatusError
from ..config import settings
from ..models.deepseek_models import ChatCompletionRequest
import logging
import asyncpg

# Define system prompts constants
BASE_SYSTEM_PROMPT = """You are an AI assistant helping users learn programming concepts."""

SEQUENTIAL_INSTRUCTION = """Please explain concepts in a sequential, step-by-step manner."""

ANALOGY_INSTRUCTION = """Use analogies and examples to make complex concepts easier to understand."""

NO_ANALOGY_INSTRUCTION = """Focus on direct, technical explanations without analogies."""

# Configuração básica de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Cliente HTTPX para chamadas à API DeepSeek
async_client = AsyncClient(
    base_url=settings.deep_seek_api_url,
    headers={"Authorization": f"Bearer {settings.deep_seek_api_key}"},
    timeout=30.0,
)
    
# Conexão ao banco de dados para recuperação de documentos
async def fetch_relevant_documents(query: str) -> str:
    """
    Recupera documentos relevantes de um banco de dados ou repositório de conhecimento.
    """
    conn = await asyncpg.connect(dsn=settings.database_url)
    try:
        # Realiza uma consulta no banco de dados (exemplo: busca por tópicos relacionados)
        result = await conn.fetch("SELECT content FROM knowledge_base WHERE topic ILIKE $1 LIMIT 3", f"%{query}%")
        # Concatena os documentos encontrados para usá-los no contexto
        documents = "\n".join([row['content'] for row in result])
        return documents
    finally:
        await conn.close()

# Construção do conteúdo do sistema com documentos recuperados
async def build_system_content_with_retrieval(query: str, use_analogies: bool, use_sequential: bool) -> str:
    """
    Constrói o conteúdo do prompt com base nas preferências do usuário e documentos recuperados.
    """
    # # Recupera os documentos relacionados ao query
    # documents = await fetch_relevant_documents(query)
    
    system_content = BASE_SYSTEM_PROMPT + "\n\n"  # + documents
    if use_sequential:
        system_content += SEQUENTIAL_INSTRUCTION
    system_content += ANALOGY_INSTRUCTION if use_analogies else NO_ANALOGY_INSTRUCTION
    return system_content

async def get_chat_completion_with_retrieval(
    request: ChatCompletionRequest,
    query: str,  # Adicionando a consulta como parâmetro
    use_analogies: bool,
) -> dict:
    """
    Envia requisição POST para /chat/completions da API DeepSeek via HTTPX, com recuperação de documentos.
    """
    # Constrói o conteúdo com documentos recuperados
    system_content = await build_system_content_with_retrieval(query, use_analogies, use_sequential=False)

    # Prepara payload JSON
    payload = request.model_dump(exclude_none=True)
    payload['messages'].insert(0, {"role": "system", "content": system_content})

    try:
        logger.info(f"POST /chat/completions com modelo {payload.get('model')}")
        resp = await async_client.post(
            "/chat/completions",
            json=payload
        )
        resp.raise_for_status()
        logger.info("Resposta recebida da DeepSeek.")
        return resp.json()

    except HTTPStatusError as e:
        status_code = e.response.status_code
        text = e.response.text
        logger.error(f"Erro HTTP {status_code} na API DeepSeek: {text}")
        if status_code == 401:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Chave de API inválida ou não autorizada."
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"Erro {status_code} da API DeepSeek: {text}"
            )

    except Exception as e:
        logger.error(f"Erro inesperado ao chamar DeepSeek: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno ao processar requisição DeepSeek."
        )
    finally:
        await async_client.aclose()
