"""
Tipos TypeScript para o serviço AGNO

Define interfaces e tipos utilizados em todo o sistema AGNO
para garantir consistência e type safety.
"""

from typing import Optional, Dict, Any, List, Union
from enum import Enum
from dataclasses import dataclass
from datetime import datetime


@dataclass
class StepSubstep:
    """Sub-etapa de um passo educacional."""
    number: int
    title: str
    description: str


@dataclass
class Step:
    """Passo educacional com suporte a sub-etapas hierárquicas."""
    number: int
    title: str
    description: str
    substeps: Optional[List[StepSubstep]] = None


class MethodologyType(Enum):
    """Tipos de metodologias educacionais suportadas."""
    SEQUENTIAL_THINKING = "sequential_thinking"
    ANALOGY = "analogy"
    SOCRATIC = "socratic"
    SCAFFOLDING = "scaffolding"
    WORKED_EXAMPLES = "worked_examples"
    DEFAULT = "default"


class ProviderType(Enum):
    """Provedores de IA suportados."""
    CLAUDE = "claude"
    OPENAI = "openai"
    OLLAMA = "ollama"


@dataclass
class MethodologyConfig:
    """Configuração de uma metodologia educacional."""
    description: str
    display_name: str
    summary: str
    use_cases: List[str]
    xml_formatted: bool
    template_path: Optional[str] = None


@dataclass
class UserContext:
    """Contexto do usuário para personalização das respostas."""
    user_id: str
    current_topic: Optional[str] = None
    difficulty_level: Optional[str] = None
    learning_progress: Optional[Dict[str, Any]] = None
    previous_interactions: Optional[List[str]] = None


@dataclass
class AgnoRequest:
    """Modelo para requisições ao sistema AGNO."""
    methodology: str
    user_query: str
    context: Optional[str] = None
    user_context: Optional[UserContext] = None
    include_final_code: bool = True
    include_diagram: bool = False
    diagram_type: Optional[str] = None
    max_final_code_lines: int = 150


@dataclass
class ResponseSegment:
    """Um segmento estruturado da resposta."""
    id: str
    title: str
    type: str
    content: str
    language: Optional[str] = None
    steps: Optional[List[Step]] = None  # NOVO: suporte a passos hierárquicos
    example_id: Optional[str] = None
    can_vote: Optional[bool] = False


@dataclass
class AgnoResponse:
    """Modelo de resposta do sistema AGNO."""
    response: str
    methodology: str
    is_xml_formatted: bool
    metadata: Optional[Dict[str, Any]] = None
    extras: Optional[Dict[str, Any]] = None
    segments: Optional[List[ResponseSegment]] = None


@dataclass
class ProcessingMetadata:
    """Metadados de processamento da requisição."""
    processing_time: float
    methodology_used: str
    context_provided: bool
    user_context_provided: bool
    response_format: str
    final_code_lines: Optional[int] = None
    final_code_truncated: Optional[bool] = None
    suggested_next_steps: Optional[List[str]] = None


@dataclass
class LearningSession:
    """Sessão de aprendizagem para persistência."""
    id: str
    user_id: str
    content_id: str
    session_type: str
    start_time: datetime
    end_time: datetime
    duration_minutes: int
    interactions: List[Dict[str, Any]]
    performance_score: Optional[float] = None
    engagement_score: Optional[float] = None
    difficulty_rating: Optional[str] = None
    completed: bool = True


# Tipos para configurações de modelo
ModelConfig = Dict[str, Any]
ProviderConfig = Dict[str, Any]

# Tipos para templates
TemplateContext = Dict[str, Any]
TemplateResult = Dict[str, Any]

# Tipos para validação
ValidationResult = Dict[str, Union[bool, str, List[str]]]

# Tipos específicos para Worked Examples baseado nos artigos científicos
@dataclass
class WorkedExampleReflexivo:
    """Seção reflexiva baseada nos artigos científicos."""
    content: str
    learning_objective: str
    cognitive_load_reduction: str


@dataclass
class WorkedExampleStep:
    """Uma etapa do passo a passo."""
    step_number: int
    title: str
    description: str
    code_snippet: Optional[str] = None
    explanation: Optional[str] = None


@dataclass
class WorkedExampleCorrect:
    """Exemplo correto baseado nos estudos."""
    title: str
    description: str
    code: str
    language: str
    explanation: str
    why_correct: str


@dataclass
class WorkedExampleIncorrect:
    """Exemplo incorreto baseado nos estudos."""
    title: str
    description: str
    code: str
    language: str
    error_location: str
    error_explanation: str
    correct_solution: str


@dataclass
class QuizOption:
    """Opção de resposta do quiz."""
    id: str
    text: str
    is_correct: bool
    explanation: str


@dataclass
class WorkedExampleQuiz:
    """Quiz baseado nos estudos científicos."""
    question: str
    options: List[QuizOption]
    explanation: str
    learning_outcome: str


@dataclass
class WorkedExampleSegments:
    """Estrutura completa dos segmentos do worked example."""
    reflexivo: WorkedExampleReflexivo
    etapas: List[WorkedExampleStep]
    exemplo_correto: WorkedExampleCorrect
    exemplo_incorreto: WorkedExampleIncorrect
    quiz: WorkedExampleQuiz
