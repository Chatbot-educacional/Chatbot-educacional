from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
import httpx

from app.config import settings  # .env com RAPIDAPI_KEY

JUDGE0_URL = (
    "https://judge0-ce.p.rapidapi.com/submissions"
    "?base64_encoded=true&wait=true"
)


HEADERS = {
    "X-RapidAPI-Key": settings.rapidapi_key,
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    "Content-Type": "application/json",
}

router = APIRouter(prefix="/judge", tags=["Execução de Código"])

LANGUAGE_TO_ID = {"javascript": 63, "python": 71, "html": 200, "css": 200}


class ExecRequest(BaseModel):
    language: str  # "javascript", "python", ...
    code: str

import base64

JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true"

@router.post("/executar")
async def executar(req: ExecRequest):
    lang_id = LANGUAGE_TO_ID.get(req.language)
    if lang_id is None:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            f"Idioma não suportado: {req.language}"
        )

    payload = {
        "language_id": lang_id,
        # agora realmente em Base64
        "source_code": base64.b64encode(req.code.encode()).decode(),
        "stdin": ""           # opcional
    }

    async with httpx.AsyncClient() as client:
        r = await client.post(JUDGE0_URL,
                              headers=HEADERS,
                              json=payload,
                              timeout=30)

    if r.is_error:
        raise HTTPException(
            status.HTTP_502_BAD_GATEWAY,
            detail=f"Judge0 {r.status_code}: {r.text}"
        )

    result = r.json()

    # decodifica saídas para facilitar no front
    for field in ("stdout", "stderr", "compile_output"):
        if result.get(field):
            result[field] = base64.b64decode(result[field]).decode()

    return result
