from pydantic import Field
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Configurações do DeepSeek
    deep_seek_api_key: str = Field(..., env="DEEP_SEEK_API_KEY")
    deep_seek_api_url: str = Field("https://api.deepseek.com/v1", env="DEEP_SEEK_API_URL")
    
    # Configurações do Supabase
    supabase_url: str = Field(..., env="SUPABASE_URL")
    supabase_key: str = Field(..., env="SUPABASE_KEY")
    
    rapidapi_key : str = Field(..., env="RAPIDAPI_KEY")
    

    class Config:
        env_file = ".env"  # Certifique-se de que seu arquivo .env tenha as variáveis corretas
        env_file_encoding = "utf-8"
        from_attributes = True

# Criando a instância de settings
settings = Settings()

# Teste de impressão para verificar as configurações
print(settings.supabase_url)
print(settings.supabase_key)
print(settings.rapidapi_key)
