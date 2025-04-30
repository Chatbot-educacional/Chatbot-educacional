# app/services/openai_service.py

import logging
from fastapi import HTTPException, status
from openai import AsyncOpenAI, OpenAIError
from ..config import settings
from ..models.deepseek_models import ChatCompletionRequest

# Constantes de sistema
BASE_SYSTEM_PROMPT = """You are an AI assistant helping users learn programming concepts."""
SEQUENTIAL_INSTRUCTION = """Please explain concepts in a sequential, step-by-step manner."""
ANALOGY_INSTRUCTION = """Use analogies and examples to make complex concepts easier to understand."""
NO_ANALOGY_INSTRUCTION = """Focus on direct, technical explanations without analogies."""

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Cliente OpenAI
openai_client = AsyncOpenAI(api_key=settings.open_ai_api_key)


# Recupera exemplos relevantes via PocketBase (substituto ao PGVector)
from pocketbase import PocketBase

async def fetch_relevant_katas(query: str, top_k: int = 3) -> str:
    pb = PocketBase(settings.pocketbase_url)
    pb.collection("users").auth_with_password(
        settings.pocketbase_user_email,
        settings.pocketbase_user_password
    )

    records = pb.collection("kata_docs").get_list(1, 100)
    sorted_records = sorted(
        records.items,
        key=lambda rec: -int(query.lower() in rec.title.lower() or query.lower() in rec.content.lower())
    )

    top_katas = sorted_records[:top_k]
    return "\n\n".join(f"**{rec.title}**:\n{rec.content}" for rec in top_katas)


# Monta o system prompt com contexto + exercícios
async def build_system_content_with_retrieval(query: str, use_analogies: bool, use_sequential: bool) -> str:
    katas = await fetch_relevant_katas(query)

    parts = [
        BASE_SYSTEM_PROMPT,
        "\n\n---\n**Exercícios sugeridos (katas):**\n" + katas
    ]

    if use_sequential:
        parts.append(SEQUENTIAL_INSTRUCTION)
    parts.append(ANALOGY_INSTRUCTION if use_analogies else NO_ANALOGY_INSTRUCTION)

    return "\n\n".join(parts)


# Chamada final à OpenAI com system prompt enriquecido
async def get_chat_completion_with_retrieval(
    request: ChatCompletionRequest,
    query: str,
    use_analogies: bool,
) -> dict:
    try:
        system_content = await build_system_content_with_retrieval(query, use_analogies, use_sequential=False)

        # Campos permitidos pela OpenAI API
        allowed_fields = {
            "model", "messages", "temperature", "max_tokens", "top_p",
            "frequency_penalty", "presence_penalty", "stop", "n", "stream",
            "logit_bias", "user"
        }

        payload = {
            k: v for k, v in request.model_dump(exclude_none=True).items() if k in allowed_fields
        }
        payload["messages"].insert(0, {"role": "system", "content": system_content})

        logger.info(f"POST /chat/completions com modelo {payload.get('model')}")
        resp = await openai_client.chat.completions.create(**payload)
        logger.info("Resposta recebida da OpenAI.")
        return resp.model_dump()

    except OpenAIError as e:
        logger.error(f"Erro na API OpenAI: {e}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Erro na API OpenAI: {str(e)}"
        )

    except Exception as e:
        logger.error(f"Erro inesperado ao chamar OpenAI: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno ao processar requisição OpenAI."
        )
