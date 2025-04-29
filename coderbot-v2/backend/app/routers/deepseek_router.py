# app/routers/deepseek_router.py
from fastapi import APIRouter, HTTPException, Depends, status, Query

from ..services import deepseek_service
from ..models.deepseek_models import ChatCompletionRequest, ChatCompletionResponse

router = APIRouter(
    prefix="/deepseek", # Prefixo para todas as rotas neste arquivo
    tags=["DeepSeek"],   # Agrupa as rotas na documentação Swagger/OpenAPI
)

@router.post("/chat/completions",
             # response_model=ChatCompletionResponse, # Descomente se quiser validar a resposta
             summary="Obter Chat Completion da DeepSeek",
             description="Envia uma conversa para a API DeepSeek e retorna a resposta do modelo.")
async def create_chat_completion(
    request: ChatCompletionRequest, 
    use_analogies: bool = Query(False, description="Habilita o uso de analogias na resposta"),
   
):
    """
    Endpoint para interagir com o chat completion da DeepSeek.
    
    - **request**: Os parâmetros da requisição, incluindo mensagens e configurações.
    - **use_analogies**: Se True, a resposta incluirá analogias para facilitar o entendimento.
    - **db**: Sessão do banco de dados injetada automaticamente pelo FastAPI.
    """
    print(f"Request data: {request}")  # Para depuração, remova em produção
    user_message = next((m.content for m in request.messages if m.role == "user"), "")
    response_data = await deepseek_service.get_chat_completion_with_retrieval(
    request=request,
    query=user_message,
    use_analogies=use_analogies
    )

    print(f"Response data: {response_data}")  # Para depuração, remova em produção
    if response_data and "error" in response_data:
         # Se o serviço retornou um erro conhecido
         raise HTTPException(
             status_code=status.HTTP_502_BAD_GATEWAY, # Ou outro código apropriado
             detail=response_data["error"]
         )
    elif not response_data:
         # Se o serviço retornou None ou algo inesperado
         raise HTTPException(
             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
             detail="Ocorreu um erro interno ao processar a requisição com a DeepSeek."
         )

    # Se você estiver usando response_model, o FastAPI validará automaticamente.
    # Caso contrário, retornamos o dicionário diretamente.
    return response_data
