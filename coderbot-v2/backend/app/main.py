from fastapi import FastAPI
from .routers import deepseek_router, judge_router  # Importa os roteadores
from app.config import settings  # Importa para garantir que a config seja lida na inicialização
from supabase import create_client, Client
from fastapi.middleware.cors import CORSMiddleware


if settings.supabase_url == "your_supabase_url":
    raise ValueError("A URL do Supabase não está configurada corretamente. Verifique o arquivo .env.")
if settings.supabase_key == "your_supabase_key":
    raise ValueError("A chave do Supabase não está configurada corretamente. Verifique o arquivo .env.")

supabase: Client = create_client(settings.supabase_url, settings.supabase_key)


app = FastAPI(
    title="Meu Serviço com DeepSeek API",
    description="Backend para gerenciar o serviço X e integrar com DeepSeek.",
    version="1.0.0",
)


# Habilitar CORS para qualquer origem (você pode restringir isso conforme necessário)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ou uma lista de origens específicas (ex: ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)


# Mensagem de inicialização (opcional)
@app.on_event("startup")
async def startup_event():
    print("Iniciando a aplicação...")
    print(f"Usando DeepSeek Base URL: {settings.deep_seek_api_url}")
    if not settings.deep_seek_api_key or settings.deep_seek_api_key == "your_deep_seek_api_key":
        # Verifica se a chave da API está configurada corretamente
        print("ALERTA: Chave da API DeepSeek não configurada!")
    else:
        print("Chave da API DeepSeek carregada.")
        




# Incluir os roteadores na aplicação
app.include_router(deepseek_router.router)
# app.include_router(chat_router.router)  # Adicione outros roteadores aqui
# app.include_router(user_router.router)  # Adicione outros roteadores aqui 
# app.include_router(exercises_router.router)  # Adicione outros roteadores aqui
# app.include_router(other_router.router)  # Adicione outros roteadores aqui

# app.include_router(claude_router.router)
app.include_router(judge_router.router)  # Adicione outros roteadores aqui

# Rota raiz simples para teste
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Bem-vindo ao backend do serviço!"}
