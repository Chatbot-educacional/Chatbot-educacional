import httpx
from pocketbase import PocketBase
from app.config import settings

async def ingest_kata_pb(kata: dict):
    """
    Ingesta um kata no PocketBase, incluindo o embedding via OpenAI.
    Espera um dict com:
      - title: str
      - content: str
      - difficulty: str
      - tests: Optional[list]
    """
    # 1) Gera embedding via OpenAI
    async with httpx.AsyncClient(
        base_url="https://api.openai.com/v1",
        headers={"Authorization": f"Bearer {settings.open_ai_api_key}"},
        timeout=30.0
    ) as client:
        resp = await client.post(
            "/embeddings",
            json={
                "model": "text-embedding-ada-002",
                "input": kata["content"]
            }
        )
        resp.raise_for_status()
        data = resp.json()
        vector = data["data"][0]["embedding"]

    # 2) Autentica com usuário comum no PocketBase
    pb = PocketBase(settings.pocketbase_url)
    pb.collection("users").auth_with_password(
        settings.pocketbase_user_email,
        settings.pocketbase_user_password
    )

    # 3) Monta payload
    payload = {
        "title": kata["title"],
        "content": kata["content"],
        "difficulty": kata["difficulty"],
        "embedding": vector,
        "correct_code": kata.get("correct_code", ""),
        "test_code": kata.get("test_code", ""),
        }

    
    
    if "tests" in kata:
        payload["tests"] = kata["tests"]

    # 4) Cria registro na coleção `kata_docs`
    record = pb.collection("kata_docs").create(payload)
    return record
