"""openai_service.py – versão configurável por JSON
-------------------------------------------------
Este módulo carrega prompts/metodologias e mapeamento de modelos a partir de
arquivos JSON, permitindo trocar de provedor (OpenAI, DeepSeek, etc.) e alterar
instruções pedagógicas sem mexer no código.
"""
from __future__ import annotations

import json
import logging
from functools import lru_cache
from pathlib import Path
from typing import Any, Dict, Optional

from fastapi import HTTPException, status
from openai import AsyncOpenAI, OpenAIError
from anthropic import AsyncAnthropic, AnthropicError

from ..config import settings
from ..models.deepseek_models import ChatCompletionRequest

# ---------------------------------------------------------------------------
# 📁 Caminhos de configuração (podem ser movidos para env vars se precisar)
# ---------------------------------------------------------------------------
CONFIG_DIR = Path(__file__).with_suffix("").parent / "configs"
PROMPT_CFG_PATH = CONFIG_DIR / "prompt_config.json"
MODEL_CFG_PATH = CONFIG_DIR / "model_config.json"

# ---------------------------------------------------------------------------
# 🗂️  Utilidades de carregamento JSON com cache em memória
# ---------------------------------------------------------------------------
@lru_cache(maxsize=2)
def _load_json(path: Path) -> Dict[str, Any]:
    if not path.exists():
        raise FileNotFoundError(f"Arquivo de configuração não encontrado: {path}")
    with path.open("r", encoding="utf-8") as fp:
        return json.load(fp)


def get_prompt_cfg() -> Dict[str, str]:  # noqa: D401 – estilo curto
    """Carrega instruções de prompt (base, sequential, analogies…)"""
    return _load_json(PROMPT_CFG_PATH)


def get_model_cfg() -> Dict[str, Dict[str, str]]:
    """Retorna dicionário {alias: {provider, model_name}}"""
    return _load_json(MODEL_CFG_PATH)


# ---------------------------------------------------------------------------
# 🧰  Logging
# ---------------------------------------------------------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# 🤖  Clientes de IA (adicionamos conforme necessidade)
# ---------------------------------------------------------------------------
openai_client = AsyncOpenAI(api_key=settings.open_ai_api_key)
claude_client = AsyncAnthropic(api_key=settings.claude_api_key)

CLIENTS = {
    "openai": openai_client,
    "claude": claude_client,
    # "deepseek": deepseek_client,  # Ex.: adicionar quando necessário
}

# ---------------------------------------------------------------------------
# 🧩  CONSTRUÇÃO DO SYSTEM PROMPT
# ---------------------------------------------------------------------------
async def build_system_prompt(*, use_analogies: bool, use_sequential: bool, user_domain: Optional[str]) -> str:
    cfg = get_prompt_cfg()

    parts: list[str] = [cfg["base_system_prompt"]]

    if use_sequential:
        parts.append(cfg["sequential_instruction"])

    # analogias on/off
    if use_analogies:
        parts.append(cfg["analogy_instruction"])
    else:
        parts.append(cfg["no_analogy_instruction"])

    # domínio?
    if use_analogies and user_domain:
        domain_tpl = cfg["domain_analogy_template"]
        parts.append(domain_tpl.format(domain=user_domain.strip()))

    return "\n\n".join(parts)


# ---------------------------------------------------------------------------
# 🚀  CHAMADA FINAL
# ---------------------------------------------------------------------------
async def get_chat_completion_with_retrieval(
    request: ChatCompletionRequest,
    *,
    query: str,  # ainda não usado (futuro retrieval)
    use_analogies: bool,
) -> Dict[str, Any]:
    """Gera resposta fazendo lookup de prompts + modelo via JSON."""

    try:
        # ──────────────────────────────────────────────────────────
        # 1) Qual modelo/provedor usar?
        #    • request.model pode ser alias definido em model_config.json
        #    • Se não estiver no mapeamento, assume que já é um id OpenAI
        # ──────────────────────────────────────────────────────────
        model_cfg = get_model_cfg()
        model_alias = request.model
        provider = "openai"
        real_model = model_alias  # fallback

        if model_alias in model_cfg:
            provider = model_cfg[model_alias]["provider"]
            real_model = model_cfg[model_alias]["model_name"]

        if provider not in CLIENTS:
            raise ValueError(f"Provider '{provider}' não configurado em CLIENTS")

        client = CLIENTS[provider]

        # ──────────────────────────────────────────────────────────
        # 2) Monta system prompt
        # ──────────────────────────────────────────────────────────
        user_domain: Optional[str] = getattr(request, "baseKnowledge", None)

        system_prompt = await build_system_prompt(
            use_analogies=use_analogies,
            use_sequential=False,
            user_domain=user_domain,
        )

        # ──────────────────────────────────────────────────────────
        # 3) Gera payload compatível com OpenAI‑style
        #    (outros provedores podem requerer adaptação futura)
        # ──────────────────────────────────────────────────────────
        allowed = {
            "messages",
            "temperature",
            "max_tokens",
            "top_p",
            "frequency_penalty",
            "presence_penalty",
            "stop",
            "n",
            "stream",
            "logit_bias",
            "user",
        }
        payload: Dict[str, Any] = {
            k: v for k, v in request.model_dump(exclude_none=True).items() if k in allowed
        }
        payload["model"] = real_model
        payload.setdefault("messages", [])
        payload["messages"].insert(0, {"role": "system", "content": system_prompt})

        if use_analogies and user_domain:
            payload["messages"].insert(
                1,
                {
                    "role": "user",
                    "content": (
                        f"Sou {user_domain}. Quero analogias do meu domínio sempre que possível."
                    ),
                },
            )

        # ──────────────────────────────────────────────────────────
        # 4) Chama o provedor
        # ──────────────────────────────────────────────────────────
        logger.info("POST /chat/completions | provider=%s | model=%s", provider, real_model)
        
        if provider == "claude":
            try:
                # Extrair mensagens para Claude (sem a mensagem do sistema)
                claude_messages = payload.get("messages", [])[1:]  # Pula a primeira mensagem (system)
                
                # Claude não suporta stream com o AsyncAnthropic
                stream = payload.pop("stream", False) 
                if stream:
                    logger.warning("Stream não suportado com Claude API assíncrona, desabilitando.")
                    
                # Ajustes específicos para o Claude
                max_tokens = payload.get("max_tokens", 1024)
                temperature = payload.get("temperature", 0.7)
                
                # Chamada à API do Claude
                resp = await client.messages.create(
                    model=real_model,
                    messages=claude_messages,
                    max_tokens=max_tokens,
                    temperature=temperature,
                    system=system_prompt,  # Claude aceita system como parâmetro separado
                )
                
                # Converter a resposta do Claude para o formato da OpenAI
                response_content = resp.content[0].text
                openai_format_resp = {
                    "id": resp.id,
                    "object": "chat.completion",
                    "created": int(resp.stop_reason or 0),
                    "model": real_model,
                    "choices": [
                        {
                            "index": 0,
                            "message": {
                                "role": "assistant",
                                "content": response_content,
                            },
                            "finish_reason": resp.stop_reason,
                        }
                    ],
                    "usage": {
                        "prompt_tokens": 0,  # Claude não fornece isso diretamente
                        "completion_tokens": 0,
                        "total_tokens": 0,
                    },
                }
                
                logger.info("Resposta recebida (Claude).")
                return openai_format_resp
                
            except AnthropicError as exc:
                logger.error("Erro na API Claude: %s", exc)
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail=f"Erro na API Claude: {str(exc)}",
                ) from exc
        else:
            # Chamada padrão para OpenAI e outros provedores compatíveis
            resp = await client.chat.completions.create(**payload)
            logger.info("Resposta recebida (%s).", provider)
            return resp.model_dump()

    except OpenAIError as exc:
        logger.error("Erro na API OpenAI: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Erro na API OpenAI: {str(exc)}",
        ) from exc

    except Exception as exc:  # pylint: disable=broad-except
        logger.error("Falha inesperada: %s", exc, exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno ao processar requisição de IA.",
        ) from exc
