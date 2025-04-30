from pydantic import Field
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Configurações do DeepSeek
    deep_seek_api_key: str = Field(..., env="DEEP_SEEK_API_KEY")
    deep_seek_api_url: str = Field("https://api.deepseek.com/v1", env="DEEP_SEEK_API_URL")

    # Configurações do Supabase
    supabase_url: str = Field(..., env="SUPABASE_URL")
    supabase_key: str = Field(..., env="SUPABASE_KEY")

    # Configuração do PocketBase
    pocketbase_url: str = Field(..., env="POCKETBASE_URL")
    pocketbase_user_email: str = Field(..., env="POCKETBASE_USER_EMAIL")
    pocketbase_user_password: str = Field(..., env="POCKETBASE_USER_PASSWORD")
    
    open_ai_api_key: str = Field(..., env="OPEN_AI_API_KEY")
    open_ai_api_url: str = Field("https://api.openai.com/v1", env="OPENAI_API_URL")

    # Outros
    rapidapi_key: str = Field(..., env="RAPIDAPI_KEY")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        from_attributes = True

settings = Settings()
