"""
Router para o sistema AGNO (Adaptive Generation of Worked Examples).

Este router expõe endpoints para:
1. Interagir com o sistema AGNO usando diferentes metodologias educacionais
2. Listar metodologias disponíveis
3. Processar consultas com templates XML para worked examples
4. Gerenciar configurações e preferências de metodologias

Seguindo padrão da indústria: router simplificado que delega lógica de negócio para services.
"""

from fastapi import APIRouter, Depends, Query, HTTPException, status
import logging
import time
from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field

from app.config import settings
from app.services.agno_methodology_service import (
    AgnoMethodologyService,
    MethodologyType,
    get_methodology_config,
)
from app.services.examples_rag_service import ExamplesRAGService, get_examples_rag_service
from app.services.pocketbase_service import get_pocketbase_client

router = APIRouter(
    prefix="/agno",
    tags=["agno"],
    responses={404: {"description": "Not found"}},
)

logger = logging.getLogger(__name__)

# --- Modelos Pydantic para validação e documentação ---

class UserContext(BaseModel):
    """Contexto do usuário para personalização das respostas."""
    user_id: str
    current_topic: Optional[str] = None
    difficulty_level: Optional[str] = None
    learning_progress: Optional[Dict[str, Any]] = None
    previous_interactions: Optional[List[str]] = None

class AgnoRequest(BaseModel):
    """Modelo para requisições ao sistema AGNO."""
    methodology: str = Field(
        description="Metodologia educacional a ser utilizada",
        example="worked_examples"
    )
    user_query: str = Field(
        description="Pergunta ou problema do usuário",
        example="Como resolver uma equação do segundo grau?"
    )
    context: Optional[str] = Field(
        default=None,
        description="Contexto adicional para a pergunta",
        example="Estamos estudando funções quadráticas na disciplina de matemática"
    )
    user_context: Optional[UserContext] = Field(
        default=None,
        description="Contexto do usuário para personalização"
    )
    mission_context: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Contexto da missão ativa (para validação e enriquecimento)"
    )
    chat_session_id: Optional[str] = Field(
        default=None,
        description="ID da sessão de chat (para rastreabilidade de exemplos)"
    )
    # Preferências de saída
    include_final_code: Optional[bool] = Field(
        default=True,
        description="Se verdadeiro, instrui o agente a incluir um bloco final com o código completo."
    )
    # Mantido para compatibilidade, mas ignorado
    include_diagram: Optional[bool] = Field(
        default=False,
        description="(Deprecado) Diagrama não é mais gerado pela API."
    )
    diagram_type: Optional[str] = Field(
        default=None,
        description="(Ignorado) Tipo de diagrama preferido"
    )
    max_final_code_lines: Optional[int] = Field(
        default=150,
        description="Limite de linhas para o código final (para usabilidade)."
    )

# Definido antes para evitar problemas de forward-ref em respostas
class ResponseSegment(BaseModel):
    """Um segmento estruturado da resposta para navegação passo a passo no frontend."""
    id: str = Field(description="Identificador estável do segmento")
    title: str = Field(description="Título curto do segmento")
    type: str = Field(description="Tipo do segmento (intro, steps, correct_example, incorrect_example, reflection, final_code)")
    content: str = Field(description="Conteúdo em Markdown do segmento. Para final_code, apenas um bloco de código")
    language: Optional[str] = Field(default=None, description="Linguagem do bloco de código quando type=final_code")
    # NOVO: suporte a feedback de exemplos
    example_id: Optional[str] = Field(default=None, description="ID do exemplo salvo no PocketBase (se aplicável)")
    can_vote: Optional[bool] = Field(default=False, description="Se este segmento aceita feedback de upvote/downvote")

class AgnoResponse(BaseModel):
    """Modelo de resposta do sistema AGNO."""
    response: str = Field(description="Resposta gerada pelo sistema AGNO")
    methodology: str = Field(description="Metodologia utilizada")
    is_xml_formatted: bool = Field(
        description="Indica se a resposta está formatada em XML"
    )
    metadata: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Metadados adicionais da resposta"
    )
    extras: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Dados extras como código final extraído da resposta"
    )
    # Novo: segmentos estruturados para navegação passo a passo no frontend
    segments: Optional[List[ResponseSegment]] = Field(
        default=None,
        description="Lista de segmentos estruturados (intro, steps, exemplos, reflexão, final_code)"
    )

class MethodologyInfo(BaseModel):
    """Informações sobre uma metodologia educacional."""
    id: str
    name: str
    description: str
    recommended_for: List[str]
    is_xml_formatted: bool = Field(
        description="Indica se a metodologia retorna respostas em XML"
    )

class MethodologiesResponse(BaseModel):
    """Lista de metodologias disponíveis."""
    methodologies: List[str]
    methodology_info: List[MethodologyInfo]

class HealthResponse(BaseModel):
    """Resposta de health check."""
    status: str = "healthy"
    service: str = "agno"
    timestamp: float

# (classe ResponseSegment movida acima de AgnoResponse para evitar forward-ref)

# --- Dependências ---

def get_agno_service(
    provider: Optional[str] = Query(default="claude", description="Provedor de IA (claude, openai ou ollama)"),
    model_id: Optional[str] = Query(default=None, description="ID do modelo específico")
) -> AgnoMethodologyService:
    """Cria e retorna uma instância do serviço AGNO."""
    # Mapear modelos padrão por provedor
    default_models = {
        "claude": "claude-sonnet-4-20250514",
        "openai": "gpt-4o",
        "ollama": settings.ollama_default_model or "llama3.1",
    }
    provider_key = (provider or "claude").lower()
    provider = provider_key
    
    # Se model_id não foi especificado, usar o padrão do provedor
    if not model_id:
        model_id = default_models.get(provider, "claude-sonnet-4-20250514")
    
    return AgnoMethodologyService(model_id=model_id, provider=provider)

# --- Endpoints ---

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Endpoint de health check do serviço AGNO."""
    return HealthResponse(timestamp=time.time())

@router.get("/methodologies", response_model=MethodologiesResponse)
async def get_methodologies(
    agno_service: AgnoMethodologyService = Depends(get_agno_service)
):
    """
    Retorna a lista de metodologias educacionais disponíveis.
    
    Returns:
        MethodologiesResponse: Lista de metodologias com informações detalhadas
    """
    try:
        methodologies = [methodology.value for methodology in MethodologyType]

        methodology_info = []
        for methodology in MethodologyType:
            config = get_methodology_config(methodology)
            info = MethodologyInfo(
                id=methodology.value,
                name=config["display_name"],
                description=config["summary"],
                recommended_for=config["use_cases"],
                is_xml_formatted=config["xml_formatted"],
            )
            methodology_info.append(info)

        return MethodologiesResponse(
            methodologies=methodologies,
            methodology_info=methodology_info
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao buscar metodologias: {str(e)}"
        )

@router.post("/ask", response_model=AgnoResponse)
async def ask_question(
    request: AgnoRequest,
    agno_service: AgnoMethodologyService = Depends(get_agno_service)
):
    """
    Processa uma pergunta usando o sistema AGNO.

    Seguindo padrão da indústria: router simples que delega processamento para o service.
    
    Args:
        request: Requisição contendo a pergunta e metodologia
        agno_service: Instância do serviço AGNO
        
    Returns:
        AgnoResponse: Resposta processada pelo sistema AGNO
    """
    try:
        # Obter instância do ExamplesRAGService
        pb_client = get_pocketbase_client()
        examples_rag = get_examples_rag_service(pb_client)
        
        # VALIDAÇÃO ANTI-GIBBERISH
        validation = examples_rag.validate_educational_query(
            user_query=request.user_query,
            mission_context=request.mission_context
        )
        
        if not validation["is_valid"]:
            logger.info(f"Query rejeitada: {request.user_query[:50]} | Razão: {validation['reason']}")
            return AgnoResponse(
                response=f"⚠️ {validation['reason']}\n\n{validation.get('suggested_redirect', 'Pergunte sobre programação!')}",
                methodology=request.methodology,
                is_xml_formatted=False,
                metadata={
                    "validation_failed": True,
                    "validation_reason": validation["reason"],
                    "confidence": validation.get("confidence", 0.0)
                },
                segments=[]
            )
        
        # Log de validação bem-sucedida
        logger.info(
            f"Query validada com sucesso: {request.user_query[:50]} | "
            f"Confidence: {validation.get('confidence', 0.0):.2f}"
        )
        
        # Converte contexto do usuário para formato esperado pelo service
        user_context = None
        if request.user_context:
            user_context = {
                'user_id': request.user_context.user_id,
                'current_topic': request.user_context.current_topic,
                'difficulty_level': request.user_context.difficulty_level,
                'learning_progress': request.user_context.learning_progress,
                'previous_interactions': request.user_context.previous_interactions
            }

        # Delega todo o processamento para o service
        result = agno_service.process_ask_request(
            methodology=request.methodology,
            user_query=request.user_query,
            context=request.context,
            user_context=user_context,
            include_final_code=request.include_final_code,
            max_final_code_lines=request.max_final_code_lines or 150
        )
        
        # SALVAR EXEMPLOS GERADOS
        # Processar segmentos e salvar exemplos correct/incorrect
        segments = result.get("segments", [])
        chat_session_id = request.chat_session_id or f"session_{int(time.time())}"
        
        for i, segment in enumerate(segments):
            segment_type = segment.get("type", "")
            
            # Identificar segmentos que são exemplos
            if segment_type in ["correct_example", "incorrect_example"]:
                try:
                    # Extrair dados do exemplo do conteúdo do segmento
                    example_data = {
                        "type": "correct" if segment_type == "correct_example" else "incorrect",
                        "title": segment.get("title", "Exemplo"),
                        "code": segment.get("content", ""),  # O conteúdo já é o código
                        "language": segment.get("language", "python"),
                        "explanation": segment.get("title", "")  # Título como explicação inicial
                    }
                    
                    # Salvar no PocketBase
                    example_id = await examples_rag.save_generated_example(
                        example_data=example_data,
                        user_query=request.user_query,
                        chat_session_id=chat_session_id,
                        mission_context=request.mission_context,
                        segment_index=i
                    )
                    
                    # Adicionar ID do exemplo ao segmento
                    if example_id:
                        segment["example_id"] = example_id
                        segment["can_vote"] = True
                        logger.info(f"Exemplo salvo: {example_id} | Tipo: {example_data['type']}")
                    
                except Exception as e:
                    logger.error(f"Erro ao salvar exemplo do segmento {i}: {e}")
                    # Não falhar a requisição se não conseguir salvar

        # Converte resultado do service para formato de resposta esperado
        return AgnoResponse(
            response=result["response"],
            methodology=result["methodology"],
            is_xml_formatted=result["is_xml_formatted"],
            metadata={
                **result.get("metadata", {}),
                "validation_confidence": validation.get("confidence", 0.0),
                "keyword_matches": validation.get("keyword_matches", 0),
                "mission_aligned": validation.get("mission_aligned", False)
            },
            extras=result["extras"],
            segments=segments
        )
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Erro de validação: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Erro interno no processamento da pergunta: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno do servidor"
        )

@router.post("/worked-example", response_model=AgnoResponse)
async def get_worked_example(
    request: AgnoRequest,
    agno_service: AgnoMethodologyService = Depends(get_agno_service)
):
    """
    Endpoint de conveniência para obter um worked example.
    
    Args:
        request: Requisição AGNO com pergunta e contexto
        agno_service: Instância do serviço AGNO
        
    Returns:
        AgnoResponse: Resposta em formato XML com worked example
    """
    # Força a metodologia para worked examples
    request.methodology = MethodologyType.WORKED_EXAMPLES.value
    
    return await ask_question(request, agno_service)


# --- Novos Endpoints: Exemplos RAG e Feedback ---

class ExampleFeedbackRequest(BaseModel):
    """Modelo para submissão de feedback de exemplo."""
    vote: str = Field(description="Tipo de voto: 'up' ou 'down'", pattern="^(up|down)$")
    feedback_type: str = Field(
        default="helpful",
        description="Tipo de feedback: helpful, not_helpful, incorrect, needs_improvement"
    )
    comment: Optional[str] = Field(default=None, description="Comentário opcional", max_length=1000)


@router.post("/examples/{example_id}/feedback")
async def submit_example_feedback(
    example_id: str,
    feedback: ExampleFeedbackRequest
):
    """
    Registra feedback de um aluno sobre um exemplo.
    
    Args:
        example_id: ID do exemplo no PocketBase
        feedback: Dados do feedback (vote, tipo, comentário)
    
    Returns:
        Dict com informações do feedback atualizado
    """
    try:
        pb_client = get_pocketbase_client()
        examples_rag = get_examples_rag_service(pb_client)
        
        # Obter user_id do usuário autenticado
        # TODO: Implementar autenticação adequada
        user_id = pb_client.auth_store.model.id if pb_client.auth_store.is_valid else "anonymous"
        
        result = await examples_rag.update_feedback_score(
            example_id=example_id,
            vote=feedback.vote,
            user_id=user_id,
            feedback_type=feedback.feedback_type,
            comment=feedback.comment
        )
        
        return {
            "status": "success",
            "data": result
        }
        
    except Exception as e:
        logger.error(f"Erro ao processar feedback: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao processar feedback: {str(e)}"
        )


@router.get("/examples/{example_id}")
async def get_example_details(example_id: str):
    """
    Retorna detalhes de um exemplo com estatísticas de feedback.
    
    Args:
        example_id: ID do exemplo
    
    Returns:
        Dict com dados do exemplo + feedbacks
    """
    try:
        pb_client = get_pocketbase_client()
        examples_rag = get_examples_rag_service(pb_client)
        
        example_data = await examples_rag.get_example_with_feedback(example_id)
        
        return {
            "status": "success",
            "data": example_data
        }
        
    except Exception as e:
        logger.error(f"Erro ao buscar exemplo: {e}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Exemplo não encontrado: {str(e)}"
        )


@router.get("/examples")
async def search_examples(
    query: str = Query(description="Query de busca"),
    mission_id: Optional[str] = Query(default=None, description="ID da missão"),
    top_k: int = Query(default=3, description="Número de resultados"),
    min_quality_score: float = Query(default=0.6, description="Score mínimo de qualidade")
):
    """
    Busca exemplos relevantes (preparado para RAG futuro).
    
    Args:
        query: Query de busca
        mission_id: ID da missão (opcional)
        top_k: Número de resultados
        min_quality_score: Score mínimo
    
    Returns:
        Lista de exemplos relevantes
    """
    try:
        pb_client = get_pocketbase_client()
        examples_rag = get_examples_rag_service(pb_client)
        
        # Buscar missão se ID fornecido
        mission_context = None
        if mission_id:
            try:
                mission = await pb_client.collection('class_missions').get_one(mission_id)
                mission_context = {
                    "id": mission.id,
                    "title": mission.title,
                    "topics": mission.topics if hasattr(mission, 'topics') else [],
                    "difficulty": mission.difficulty if hasattr(mission, 'difficulty') else None
                }
            except Exception as e:
                logger.warning(f"Missão não encontrada: {mission_id} | {e}")
        
        examples = await examples_rag.search_relevant_examples(
            user_query=query,
            mission_context=mission_context,
            top_k=top_k,
            min_quality_score=min_quality_score
        )
        
        return {
            "status": "success",
            "data": {
                "examples": examples,
                "query": query,
                "count": len(examples)
            }
        }
        
    except Exception as e:
        logger.error(f"Erro ao buscar exemplos: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao buscar exemplos: {str(e)}"
        )

