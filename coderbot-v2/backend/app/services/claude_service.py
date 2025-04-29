from fastapi import HTTPException, status
from httpx import AsyncClient, HTTPStatusError
from ..config import settings
from ..models.chat_models import ChatCompletionRequest
import logging

# Configuração básica de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Cliente HTTPX para chamadas à API Claude
async_client = AsyncClient(
    base_url=settings.claude_api_url,
    headers={"Authorization": f"Bearer {settings.claude_api_key}"},
    timeout=30.0,
)

# Prompt-base com instruções gerais para o assistente
BASE_SYSTEM_PROMPT = (
    "Você é um assistente educacional altamente especializado em programação e tecnologia. "
    "Seu papel é ensinar de forma clara e didática, usando exemplos simples e comparações com o mundo real."
)

# Instruções adicionais
ANALOGY_INSTRUCTION = "\n\nInstrução: Inclua analogias criativas para facilitar o entendimento."
NO_ANALOGY_INSTRUCTION = "\n\nInstrução: Não utilize analogias; seja direto e objetivo."
SEQUENTIAL_INSTRUCTION = "\n\nTécnicas de Sequential Thinking: Pense passo a passo e explique cada etapa."

def build_system_content(use_analogies: bool, use_sequential: bool) -> str:
    """
    Constrói o conteúdo do prompt do sistema com base nas preferências de analogias e sequenciamento.
    """
    system_content = BASE_SYSTEM_PROMPT
    if use_sequential:
        system_content += SEQUENTIAL_INSTRUCTION
    system_content += ANALOGY_INSTRUCTION if use_analogies else NO_ANALOGY_INSTRUCTION
    return system_content

async def get_chat_completion(
    request: ChatCompletionRequest,
    use_analogies: bool,
) -> dict:
    """
    Envia requisição POST para /chat/completions da API Claude via HTTPX.
    Gera prompt condicionando analogias e pensamento sequencial.
    Retorna JSON da resposta ou lança HTTPException com código apropriado.
    """
    system_content = build_system_content(use_analogies, use_sequential=False)

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
        logger.info("Resposta recebida da Claude.")
        
        return resp.json()

    except HTTPStatusError as e:
        status_code = e.response.status_code
        text = e.response.text
        logger.error(f"Erro HTTP {status_code} na API Claude: {text}")
        if status_code == 401:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Chave de API inválida ou não autorizada."
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"Erro {status_code} da API Claude: {text}"
            )

    except Exception as e:
        logger.error(f"Erro inesperado ao chamar Claude: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno ao processar requisição Claude."
        )
    finally:
        await async_client.aclose()
