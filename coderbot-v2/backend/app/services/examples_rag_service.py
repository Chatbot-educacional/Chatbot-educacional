"""
ExamplesRAGService - Serviço para gerenciar exemplos educacionais contextuais

Este serviço é responsável por:
1. Validar queries educacionais (anti-gibberish)
2. Buscar exemplos relevantes via RAG (quando Qdrant estiver configurado)
3. Salvar exemplos gerados pelo AGNO
4. Atualizar scores baseado em feedback dos alunos
"""

import re
import math
from typing import Dict, Any, List, Optional, Literal
from datetime import datetime, timedelta
import logging

from pocketbase import PocketBase

try:
    from pocketbase.client import ClientResponseError
except ImportError:
    # Fallback para versões diferentes do PocketBase
    ClientResponseError = Exception

logger = logging.getLogger(__name__)


class ExamplesRAGService:
    """Serviço para gerenciar exemplos educacionais com RAG."""
    
    def __init__(self, pb_client: PocketBase):
        """
        Inicializa o serviço.
        
        Args:
            pb_client: Cliente do PocketBase
        """
        self.pb = pb_client
        
        # Keywords de programação (multilíngue)
        self.programming_keywords = [
            # Português
            "código", "programar", "função", "variável", "loop", "array", 
            "objeto", "classe", "método", "algoritmo", "bug", "erro", 
            "debug", "compilar", "executar", "syntax", "sintaxe",
            "lista", "dicionário", "string", "integer", "float", "boolean",
            "if", "else", "for", "while", "return", "import", "def",
            "const", "let", "var", "async", "await", "promise", "callback",
            
            # Linguagens
            "javascript", "python", "java", "c++", "typescript", "react", 
            "node", "angular", "vue", "django", "flask", "spring",
            "html", "css", "sql", "mongodb", "postgresql",
            
            # Conceitos
            "recursão", "iteração", "estrutura de dados", "api", "rest",
            "json", "xml", "http", "request", "response", "endpoint",
            "frontend", "backend", "fullstack", "database", "query",
            "test", "unit test", "integration", "deploy", "git",
            
            # Inglês (caso aluno pergunte em inglês)
            "code", "program", "function", "variable", "object", "class",
            "method", "algorithm", "loop", "array", "list", "dictionary"
        ]
        
        # Anti-padrões (queries claramente off-topic)
        self.off_topic_patterns = [
            r"\b(clima|tempo|weather|temperatura|chuva|sol)\b",
            r"\b(receita|comida|food|cozinha|prato)\b",
            r"\b(futebol|esporte|sport|jogo de futebol|campeonato)\b",
            r"\b(filme|série|movie|netflix|cinema)\b",
            r"\b(música|canção|song|banda|artista musical)\b",
            r"\b(fofoca|celebridade|famoso|celebrity)\b",
            r"\b(política|eleição|partido político)\b",
            r"\b(religião|igreja|templo|fé)\b",
        ]
    
    def validate_educational_query(
        self, 
        user_query: str,
        mission_context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Valida se a query é relacionada a programação/educação.
        
        Implementa validação em 3 camadas:
        1. Keywords técnicas
        2. Anti-padrões (off-topic)
        3. Alinhamento com missão (se houver)
        
        Args:
            user_query: Pergunta do aluno
            mission_context: Contexto da missão ativa (opcional)
        
        Returns:
            {
                "is_valid": bool,
                "reason": str,
                "confidence": float (0.0-1.0),
                "suggested_redirect": Optional[str]
            }
        """
        if not user_query or len(user_query.strip()) < 3:
            return {
                "is_valid": False,
                "reason": "Query muito curta",
                "confidence": 0.0,
                "suggested_redirect": "Faça uma pergunta mais detalhada sobre programação! 💻"
            }
        
        query_lower = user_query.lower()
        
        # CAMADA 1: Verificar keywords técnicas
        keyword_matches = sum(1 for kw in self.programming_keywords if kw.lower() in query_lower)
        has_keyword = keyword_matches > 0
        keyword_confidence = min(1.0, keyword_matches * 0.2)
        
        # CAMADA 2: Anti-padrões (off-topic)
        for pattern in self.off_topic_patterns:
            if re.search(pattern, query_lower, re.IGNORECASE):
                logger.info(f"Query rejeitada (off-topic): {user_query[:50]}")
                return {
                    "is_valid": False,
                    "reason": "Query não relacionada a programação",
                    "confidence": 0.0,
                    "suggested_redirect": "Sou um assistente de programação! 🤖 Pergunte sobre código, algoritmos, linguagens de programação, etc."
                }
        
        # CAMADA 3: Alinhamento com missão (se houver)
        mission_aligned = True
        mission_confidence = 0.5  # Neutro por padrão
        
        if mission_context and mission_context.get('topics'):
            mission_topics = mission_context.get('topics', [])
            topic_matches = sum(
                1 for topic in mission_topics 
                if topic.lower() in query_lower
            )
            mission_aligned = topic_matches > 0 or has_keyword  # Flexível
            mission_confidence = min(1.0, topic_matches * 0.3 + 0.4)
        
        # DECISÃO FINAL
        if not has_keyword and not mission_aligned:
            return {
                "is_valid": False,
                "reason": "Query muito vaga ou sem contexto educacional",
                "confidence": keyword_confidence,
                "suggested_redirect": "Seja mais específico sobre o conceito de programação que deseja aprender. Exemplo: 'Como usar loops em Python?'"
            }
        
        # Calcular confiança final (média ponderada)
        final_confidence = (keyword_confidence * 0.6) + (mission_confidence * 0.4)
        
        logger.info(
            f"Query validada: {user_query[:50]} | "
            f"Keywords: {keyword_matches} | "
            f"Confidence: {final_confidence:.2f}"
        )
        
        return {
            "is_valid": True,
            "reason": "Query válida e educacional",
            "confidence": final_confidence,
            "keyword_matches": keyword_matches,
            "mission_aligned": mission_aligned
        }
    
    async def save_generated_example(
        self,
        example_data: Dict[str, Any],
        user_query: str,
        chat_session_id: str,
        mission_context: Optional[Dict[str, Any]] = None,
        agno_response_id: Optional[str] = None,
        segment_index: Optional[int] = None
    ) -> Optional[str]:
        """
        Salva exemplo gerado pelo AGNO no PocketBase.
        
        Args:
            example_data: {
                "type": "correct" | "incorrect",
                "title": str,
                "code": str,
                "language": str,
                "explanation": str,
                "steps": List[Dict] (opcional) - estrutura hierárquica de passos
            }
            user_query: Query original do aluno
            chat_session_id: ID da sessão de chat
            mission_context: Missão ativa (se houver)
            agno_response_id: ID da resposta AGNO no chat
            segment_index: Índice do segmento na resposta
        
        Returns:
            str: ID do exemplo salvo
        """
        try:
            # Extrair tópicos da query (análise simples)
            topics = self._extract_topics_from_query(user_query, mission_context)
            
            # Preparar dados para salvar
            record_data = {
                # Contexto de criação
                "user_query": user_query,
                "chat_session_id": chat_session_id,
                "mission_id": mission_context.get('id') if mission_context else None,
                "class_id": mission_context.get('class') if mission_context else None,
                
                # Conteúdo do exemplo
                "type": example_data.get("type", "correct"),
                "title": example_data.get("title", "Exemplo")[:255],
                "code": example_data.get("code", ""),
                "language": example_data.get("language", "python"),
                "explanation": example_data.get("explanation", ""),
                
                # NOVO: Estrutura de passos hierárquicos
                "steps": example_data.get("steps"),  # JSON com estrutura de steps e substeps
                
                # Metadados educacionais
                "methodology": "worked_examples",  # Padrão
                "difficulty": mission_context.get('difficulty') if mission_context else None,
                "topics": topics,
                
                # Relação com resposta AGNO
                "agno_response_id": agno_response_id,
                "segment_index": segment_index,
                
                # Feedback inicial
                "upvotes": 0,
                "downvotes": 0,
                "quality_score": 0.5,  # Score inicial neutro
                "usage_count": 1,  # Gerado = usado 1x
            }
            
            # Salvar no PocketBase
            record = await self.pb.collection('contextual_examples').create(record_data)
            
            logger.info(f"Exemplo salvo: {record.id} | Tipo: {record_data['type']} | Query: {user_query[:50]}")
            
            return record.id
            
        except ClientResponseError as e:
            logger.error(f"Erro ao salvar exemplo: {e}")
            # Não falhar a requisição se não conseguir salvar exemplo
            return None
        except Exception as e:
            logger.error(f"Erro inesperado ao salvar exemplo: {e}")
            return None
    
    def _extract_topics_from_query(
        self, 
        user_query: str, 
        mission_context: Optional[Dict[str, Any]] = None
    ) -> List[str]:
        """
        Extrai tópicos relevantes da query.
        
        Estratégia:
        1. Priorizar tópicos da missão se houver
        2. Identificar linguagens mencionadas
        3. Identificar conceitos técnicos
        """
        topics = []
        query_lower = user_query.lower()
        
        # Tópicos da missão (prioridade)
        if mission_context and mission_context.get('topics'):
            topics.extend(mission_context['topics'])
        
        # Linguagens de programação
        languages = [
            "python", "javascript", "java", "c++", "typescript", 
            "ruby", "go", "rust", "php", "swift", "kotlin"
        ]
        for lang in languages:
            if lang in query_lower:
                topics.append(lang)
        
        # Conceitos técnicos comuns
        concepts = [
            "function", "função", "loop", "array", "object", "objeto",
            "class", "classe", "async", "promise", "callback", "recursion",
            "recursão", "api", "rest", "database", "query"
        ]
        for concept in concepts:
            if concept in query_lower:
                topics.append(concept)
        
        # Remover duplicatas e limitar a 5 tópicos
        return list(set(topics))[:5]
    
    async def update_feedback_score(
        self, 
        example_id: str,
        vote: Literal["up", "down"],
        user_id: str,
        feedback_type: str = "helpful",
        comment: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Atualiza score baseado em feedback do aluno.
        
        Fluxo:
        1. Verificar se usuário já votou (evitar duplicatas)
        2. Salvar feedback em example_feedback
        3. Recalcular quality_score usando Wilson Score
        4. Atualizar no PocketBase
        
        Args:
            example_id: ID do exemplo
            vote: "up" ou "down"
            user_id: ID do aluno
            feedback_type: Tipo de feedback
            comment: Comentário opcional
        
        Returns:
            Dict com informações do feedback atualizado
        """
        try:
            # 1. Verificar se já votou
            existing_feedbacks = await self.pb.collection('example_feedback').get_list(
                1, 1,
                {
                    'filter': f'example_id = "{example_id}" && user_id = "{user_id}"'
                }
            )
            
            if existing_feedbacks.total_items > 0:
                logger.info(f"Usuário {user_id} já votou no exemplo {example_id}")
                return {
                    "status": "already_voted",
                    "message": "Você já votou neste exemplo"
                }
            
            # 2. Salvar feedback
            feedback_data = {
                "example_id": example_id,
                "user_id": user_id,
                "vote": vote,
                "feedback_type": feedback_type,
                "comment": comment
            }
            await self.pb.collection('example_feedback').create(feedback_data)
            
            # 3. Buscar exemplo atual
            example = await self.pb.collection('contextual_examples').get_one(example_id)
            
            # 4. Atualizar contadores
            upvotes = example.upvotes + (1 if vote == "up" else 0)
            downvotes = example.downvotes + (1 if vote == "down" else 0)
            
            # 5. Recalcular quality_score
            days_since_creation = (datetime.now() - datetime.fromisoformat(example.created)).days
            new_score = self._calculate_quality_score(
                upvotes=upvotes,
                downvotes=downvotes,
                usage_count=example.usage_count,
                days_since_creation=days_since_creation
            )
            
            # 6. Atualizar no PocketBase
            await self.pb.collection('contextual_examples').update(example_id, {
                "upvotes": upvotes,
                "downvotes": downvotes,
                "quality_score": new_score
            })
            
            logger.info(
                f"Feedback registrado: exemplo={example_id} | "
                f"vote={vote} | score={new_score:.3f} | "
                f"upvotes={upvotes} | downvotes={downvotes}"
            )
            
            return {
                "status": "success",
                "example_id": example_id,
                "upvotes": upvotes,
                "downvotes": downvotes,
                "quality_score": new_score
            }
            
        except ClientResponseError as e:
            logger.error(f"Erro ao atualizar feedback: {e}")
            raise
        except Exception as e:
            logger.error(f"Erro inesperado ao atualizar feedback: {e}")
            raise
    
    def _calculate_quality_score(
        self,
        upvotes: int, 
        downvotes: int, 
        usage_count: int,
        days_since_creation: int
    ) -> float:
        """
        Calcula quality_score usando Wilson Score Interval.
        
        Algoritmo similar ao Reddit/StackOverflow com ajustes educacionais:
        - Wilson Score (95% confidence) para confiabilidade estatística
        - Freshness penalty (exemplos antigos perdem relevância)
        - Usage boost (exemplos muito usados ganham pontos)
        
        Returns:
            float entre 0.0 e 1.0
        """
        total_votes = upvotes + downvotes
        
        # Sem votos: score base neutro
        if total_votes == 0:
            return 0.5
        
        # Wilson Score (95% confidence)
        z = 1.96  # Z-score para 95% de confiança
        p = upvotes / total_votes
        
        try:
            wilson = (
                p + z*z/(2*total_votes) - 
                z * math.sqrt((p*(1-p) + z*z/(4*total_votes))/total_votes)
            ) / (1 + z*z/total_votes)
        except (ZeroDivisionError, ValueError):
            wilson = 0.5
        
        # Penalidade por antiguidade (decay após 30 dias, estabiliza em 70%)
        # Exemplos recentes são mais relevantes
        freshness_factor = max(0.7, 1.0 - (days_since_creation / 120))
        
        # Boost por uso repetido (máximo +0.15)
        # Exemplos comprovadamente úteis ganham pontos
        usage_boost = min(0.15, usage_count * 0.02)
        
        # Score final (limitado entre 0 e 1)
        final_score = min(1.0, max(0.0, wilson * freshness_factor + usage_boost))
        
        return round(final_score, 3)
    
    async def get_example_with_feedback(self, example_id: str) -> Dict[str, Any]:
        """
        Retorna exemplo com estatísticas de feedback.
        
        Args:
            example_id: ID do exemplo
        
        Returns:
            Dict com dados do exemplo + estatísticas
        """
        try:
            example = await self.pb.collection('contextual_examples').get_one(example_id)
            
            # Buscar feedbacks
            feedbacks = await self.pb.collection('example_feedback').get_list(
                1, 100,  # Limite razoável
                {'filter': f'example_id = "{example_id}"'}
            )
            
            return {
                "id": example.id,
                "title": example.title,
                "code": example.code,
                "language": example.language,
                "explanation": example.explanation,
                "type": example.type,
                "upvotes": example.upvotes,
                "downvotes": example.downvotes,
                "quality_score": example.quality_score,
                "usage_count": example.usage_count,
                "topics": example.topics,
                "difficulty": example.difficulty,
                "created": example.created,
                "feedbacks": [
                    {
                        "user_id": f.user_id,
                        "vote": f.vote,
                        "feedback_type": f.feedback_type,
                        "comment": f.comment,
                        "created": f.created
                    }
                    for f in feedbacks.items
                ]
            }
            
        except ClientResponseError as e:
            logger.error(f"Erro ao buscar exemplo: {e}")
            raise
    
    async def search_relevant_examples(
        self,
        user_query: str,
        mission_context: Optional[Dict[str, Any]] = None,
        top_k: int = 3,
        min_quality_score: float = 0.6
    ) -> List[Dict[str, Any]]:
        """
        Busca exemplos relevantes (preparado para RAG futuro).
        
        Por enquanto, faz busca simples por tópicos.
        Quando Qdrant for integrado, usará busca semântica.
        
        Args:
            user_query: Query do aluno
            mission_context: Contexto da missão
            methodology: Metodologia educacional
            top_k: Número de exemplos a retornar
            min_quality_score: Score mínimo de qualidade
        
        Returns:
            Lista de exemplos relevantes
        """
        try:
            # Extrair tópicos da query
            topics = self._extract_topics_from_query(user_query, mission_context)
            
            if not topics:
                logger.info("Nenhum tópico identificado para busca")
                return []
            
            # Buscar exemplos por tópicos (fallback até Qdrant ser integrado)
            # Criar filtro: qualquer tópico match
            topic_filters = ' || '.join([f'topics ~ "{topic}"' for topic in topics])
            filter_query = f'({topic_filters}) && quality_score >= {min_quality_score}'
            
            examples = await self.pb.collection('contextual_examples').get_list(
                1, top_k,
                {
                    'filter': filter_query,
                    'sort': '-quality_score,-created'
                }
            )
            
            logger.info(f"Exemplos encontrados: {examples.total_items} | Tópicos: {topics}")
            
            return [
                {
                    "id": ex.id,
                    "title": ex.title,
                    "code": ex.code[:200] + "..." if len(ex.code) > 200 else ex.code,  # Resumo
                    "explanation": ex.explanation[:300] + "..." if len(ex.explanation) > 300 else ex.explanation,
                    "type": ex.type,
                    "language": ex.language,
                    "quality_score": ex.quality_score,
                    "upvotes": ex.upvotes,
                    "topics": ex.topics
                }
                for ex in examples.items
            ]
            
        except ClientResponseError as e:
            logger.error(f"Erro ao buscar exemplos: {e}")
            return []
        except Exception as e:
            logger.error(f"Erro inesperado ao buscar exemplos: {e}")
            return []


# Singleton para dependency injection
_examples_rag_service_instance = None

def get_examples_rag_service(pb_client: PocketBase) -> ExamplesRAGService:
    """Factory function para criar/reusar instância do serviço."""
    global _examples_rag_service_instance
    
    if _examples_rag_service_instance is None:
        _examples_rag_service_instance = ExamplesRAGService(pb_client)
    
    return _examples_rag_service_instance
