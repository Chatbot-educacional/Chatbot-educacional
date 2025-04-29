from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.chat_models import Chat, ChatMessage
from sqlalchemy.orm import selectinload, Session
from uuid import UUID

class ChatService:
    def __init__(self, db_session: Session):
        self.session = db_session

    async def create_chat(self, user_id: UUID):
        """Cria um novo chat para um usuário"""
        chat = Chat(user_id=user_id)
        self.session.add(chat)
        self.session.commit()
        self.session.refresh(chat)
        return chat

    async def get_chats_by_user(self, user_id: str) -> list:
        """Retorna todos os chats de um usuário"""
        result = await self.session.execute(select(Chat).filter(Chat.user_id == user_id).options(selectinload(Chat.messages)))
        chats = result.scalars().all()
        return chats

    async def save_chat_message(self, chat_id: str, role: str, content: str) -> ChatMessage:
        """Salva uma mensagem no chat"""
        chat_message = ChatMessage(chat_id=chat_id, role=role, content=content)
        self.session.add(chat_message)
        await self.session.commit()
        await self.session.refresh(chat_message)
        return chat_message
