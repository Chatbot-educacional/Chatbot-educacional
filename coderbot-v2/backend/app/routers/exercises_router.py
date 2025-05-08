import os
import json
from fastapi import APIRouter, HTTPException, status, Depends
from app.config import settings
from app.rag.ingest import ingest_kata_pb
from pocketbase import PocketBase

router = APIRouter(prefix="/admin/katas", tags=["Katas"])

async def get_pb():
    # Conecta e autentica com um usuário da collection "users"
    pb = PocketBase(settings.pocketbase_url)
    pb.collection("users").auth_with_password(
        settings.pocketbase_user_email,
        settings.pocketbase_user_password
    )
    return pb

@router.post("/import-all", status_code=status.HTTP_201_CREATED)
async def import_all_katas(pb=Depends(get_pb)):
    """
    Lê todos os JSONs em project/katas e injeta no PocketBase usando
    sua função ingest_kata_pb.
    """
    KATAS_DIR = "../project/katas"

    if not os.path.isdir(KATAS_DIR):
        raise HTTPException(status_code=404, detail="Diretório de katas não existe.")
    
    imported = []
    for fname in os.listdir(KATAS_DIR):
        if not fname.endswith(".json"):
            continue

        path = os.path.join(KATAS_DIR, fname)
        with open(path, encoding="utf-8") as f:
            kata = json.load(f)

        # injeta no PB
        rec = await ingest_kata_pb(kata)
        imported.append({"title": kata["title"], "id": rec.id})
    
    return {"imported": imported}
