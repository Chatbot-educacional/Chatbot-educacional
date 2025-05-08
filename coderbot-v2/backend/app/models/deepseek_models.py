from pydantic import BaseModel
from typing import List, Optional

class ChatMessageInput(BaseModel):
    role: str  # "user", "system", "assistant"
    content: str
    knowledge_level: Optional[str] = "beginner"  # "beginner", "intermediate", "advanced"
    subject_focus: Optional[str] = "examples"  # Ex: "concepts", "examples", "applications"
    context: Optional[str] = "teaching"  # "teaching", "informal", "explanation-focused"

class ChatCompletionRequest(BaseModel):
    model: str = "deepseek-chat"  # Ou o modelo específico que você quer usar
    messages: List[ChatMessageInput]
    max_tokens: Optional[int] = 350
    temperature: Optional[float] = 0.7
    difficulty_level: Optional[str] = "medium"  # Ex: "easy", "medium", "hard"
    subject_area: Optional[str] = "programing"  # Ex: "math", "programming", "history"
    style_preference: Optional[str] = "concise"  # "concise", "detailed", "analogies"
    learning_progress: Optional[dict] = {"questions_answered": 0, "correct_answers": 0}  # Acompanhamento de progresso do estudante
    baseKnowledge: Optional[str] = "basic"  # "basic", "intermediate", "advanced"

class ChatCompletionResponse(BaseModel):
    id: str
    object: str
    created: int
    model: str
    choices: List[dict]  # Cada 'choice' pode ter uma estrutura detalhada, com diferentes formas de resposta
    usage: dict
    feedback: Optional[dict]  # Para coletar feedback do aluno, pode incluir métricas de sucesso



 # Adicionando baseKnowledge diretamente ao corpo da requisição
    def build_payload(self):
        """
        Adiciona baseKnowledge diretamente ao payload para ser enviado.
        """
        payload = self.dict(exclude_none=True)
        
        # Inclui a base de conhecimento no payload
        if self.baseKnowledge:
            payload['baseKnowledge'] = self.baseKnowledge
        
        return payload