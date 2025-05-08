from fastapi import FastAPI
import httpx

app = FastAPI()

JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true"
HEADERS = {
    "X-RapidAPI-Key": "23889bedf2mshe6d6bc07b281c9dp13187cjsn24fb22c0fcdf",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    "Content-Type": "application/json"
}


@app.post("/executar")
async def executar_codigo(body: dict):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            JUDGE0_URL,
            headers=HEADERS,
            json={
                "language_id": body.get("language_id", 71),  # 71 = Python 3
                "source_code": body["code"]
            }
        )
        return response.json()
