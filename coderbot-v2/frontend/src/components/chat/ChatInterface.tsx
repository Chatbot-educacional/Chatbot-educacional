import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnalogySettings } from "@/components/chat/AnalogySettings";
import { ChatMessage } from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { InitialWelcomeMessages } from "@/components/chat/InitialWelcomeMessages";
import { Message, fetchChatResponse } from "@/services/api";
import { toast } from "@/components/ui/sonner";
import { Loader2, MessageSquarePlus, Settings, Brain, Sparkles, Heart, Zap, Star, Trophy, Target, Flame, Gift, ThumbsUp, Smile, PartyPopper, CheckCircle2 } from "lucide-react";
import confetti from 'canvas-confetti';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerTrigger 
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { chatService } from "@/services/chat-service";
import { SessionSidebar } from "@/components/chat/SessionSidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { soundEffects } from "@/utils/sounds";
import {
  agnoService,
  MethodologyType,
  METHODOLOGY_CONFIG,
  AI_MODEL_OPTIONS,
  PROVIDER_CONFIG,
  getDefaultModelForProvider
} from "@/services/agnoService";
import type { ProviderKey, ProviderConfig, ProviderModelOption, ResponseSegment } from "@/services/agnoService";

// Importar componentes para worked examples estruturados
import { WorkedExamplesSlides } from "@/components/chat/WorkedExamplesSlides";
import { QuizInteraction } from "@/components/chat/QuizInteraction";
import posthog from "posthog-js";
import type { QuizAnswerEvent } from "@/components/chat/ChatMessage";
// import { ProfileHeader } from "@/components/profile/ProfileHeader";

// Importar novos componentes do wireframe
import CodeEditor from "@/components/chat/CodeEditor";
import ExamplesPanel from "@/components/chat/ExamplesPanel";
import { useExamples, type CodeExample } from "@/context/ExamplesContext";
import { getCurrentUser, pb } from "@/integrations/pocketbase/client";
import { useMissionTracker } from "@/hooks/useMissionTracker";

// Importar sistema de missões
import { useMissions, type Mission } from "@/hooks/useMissions";
import { MissionSelectorExpanded } from "@/components/chat/MissionSelector";

// Small hash for stable ids (same as ChatMessage pattern)
const simpleHash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return `${h}`;
};

const PROVIDER_CONFIG_ENTRIES = Object.entries(PROVIDER_CONFIG) as [ProviderKey, ProviderConfig][];

const MODEL_ALIAS_MAP: Record<string, string> = {
  "claude-3-sonnet": "claude-3-5-sonnet-20241022",
  "claude-4-sonnet": "claude-sonnet-4-20250514",
  "claude-3-haiku": "claude-3-haiku-20240307",
};

const normalizeModelId = (modelId: string): string => MODEL_ALIAS_MAP[modelId] ?? modelId;

const findModelOption = (modelId: string): ProviderModelOption | undefined => {
  const normalized = normalizeModelId(modelId);
  return AI_MODEL_OPTIONS.find((option) => option.id === normalized);
};

const resolveProviderFromModel = (modelId: string): ProviderKey => findModelOption(modelId)?.provider ?? 'claude';

const EXAMPLES_CACHE_LIMIT = 18;

const ModelSelectItems = () => (
  <>
    {PROVIDER_CONFIG_ENTRIES.map(([provider, config]) => (
      <div key={provider} className="py-2">
        <div className="px-3 py-1 text-xs font-semibold text-muted-foreground flex items-center gap-2">
          <span>{config.icon}</span>
          <span>{config.name}</span>
        </div>
        {config.models.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            <div className="flex flex-col text-left">
              <span>{model.name}</span>
              {model.default && (
                <span className="text-[10px] text-muted-foreground">Modelo padrão</span>
              )}
            </div>
          </SelectItem>
        ))}
      </div>
    ))}
  </>
);

// --- Componentes de Design Emocional ---

// Componente do mascote CodeBot (inspirado no Duo)
const CodeBotMascot = ({ emotion = 'neutral', size = 'medium', isIdle = false }: { emotion?: 'happy' | 'thinking' | 'celebrating' | 'encouraging' | 'neutral'; size?: 'small' | 'medium' | 'large'; isIdle?: boolean }) => {
  const [idleAnimation, setIdleAnimation] = useState(0);
  
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  // Animações de idle (quando parado)
  useEffect(() => {
    if (isIdle) {
      const interval = setInterval(() => {
        setIdleAnimation(prev => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isIdle]);

  const getEmotionAnimation = () => {
    if (isIdle) {
      const idleAnimations = ['animate-bounce', 'animate-pulse', 'animate-wiggle', ''];
      return idleAnimations[idleAnimation];
    }
    
    switch (emotion) {
      case 'happy': return 'animate-bounce';
      case 'thinking': return 'animate-pulse';
      case 'celebrating': return 'animate-spin';
      case 'encouraging': return 'animate-wiggle';
      default: return '';
    }
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${getEmotionAnimation()} transition-all duration-500`}>
      <img
        src="/coderbot_colorfull.png"
        alt="CodeBot"
        className="w-full h-full rounded-full shadow-lg object-contain hover:scale-110 transition-transform cursor-pointer"
      />
      {emotion === 'celebrating' && (
        <div className="absolute -top-1 -right-1">
          <Star className="w-4 h-4 text-yellow-400 animate-spin" />
        </div>
      )}
      {emotion === 'encouraging' && (
        <div className="absolute -top-1 -right-1">
          <Heart className="w-3 h-3 text-red-400 animate-pulse" />
        </div>
      )}
      {isIdle && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente de confetti (inspirado no Duolingo) - Agora com canvas-confetti profissional
const ConfettiExplosion = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    // Múltiplas explosões de confetti para efeito mais impressionante
    const confettiAnimations = [
      // Primeiro burst - do centro
      () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      },
      // Segunda explosão - lateral esquerda
      () => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.5 }
        });
      },
      // Terceira explosão - lateral direita
      () => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.5 }
        });
      },
      // Quarta explosão - chuva de estrelas
      () => {
        confetti({
          particleCount: 30,
          spread: 360,
          ticks: 200,
          origin: { y: 0.3 },
          colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6']
        });
      }
    ];

    // Executar cada animação com intervalos
    confettiAnimations.forEach((animation, index) => {
      setTimeout(animation, index * 200);
    });

    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Central celebration message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full shadow-2xl animate-bounce text-xl font-bold">
          <div className="flex items-center gap-2">
            <PartyPopper className="w-6 h-6" />
            Incrível! 🎉
            <Sparkles className="w-6 h-6 animate-spin" />
          </div>
        </div>
      </div>
    </div>
  );
};

;


// Componente de reações emotivas do CodeBot
const CodeBotReaction = ({ type }: { type: 'encouragement' | 'celebration' | 'thinking' | 'supportive' }) => {
  const reactions = {
    encouragement: {
      message: "Ótima pergunta! Continue assim! 💪",
      emotion: 'encouraging' as const,
      icon: ThumbsUp,
      gradient: "from-blue-400 to-purple-400"
    },
    celebration: {
      message: "Incrível! Você está indo muito bem! 🎉",
      emotion: 'celebrating' as const,
      icon: PartyPopper,
      gradient: "from-yellow-400 to-orange-400"
    },
    thinking: {
      message: "Interessante... deixe-me pensar na melhor resposta 🤔",
      emotion: 'thinking' as const,
      icon: Brain,
      gradient: "from-purple-400 to-pink-400"
    },
    supportive: {
      message: "Não se preocupe, estamos aprendendo juntos! 🤗",
      emotion: 'encouraging' as const,
      icon: Heart,
      gradient: "from-pink-400 to-red-400"
    }
  };

  const reaction = reactions[type];
  const IconComponent = reaction.icon;

  return (
    <div className="flex items-start gap-3 mb-4 animate-slide-in-left">
      <CodeBotMascot emotion={reaction.emotion} size="medium" />
      <div className={`bg-gradient-to-r ${reaction.gradient} text-white px-4 py-2 rounded-2xl rounded-bl-none shadow-lg max-w-xs`}>
        <div className="flex items-center gap-2">
          <IconComponent className="w-4 h-4" />
          <span className="text-sm font-medium">{reaction.message}</span>
        </div>
      </div>
    </div>
  );
};

// Componente de indicadores visuais do sistema
const SystemStatusIndicators = ({
  systemStatus,
  connectionStatus,
  sessionId,
  whiteboardContext,
  messagesCount,
  aiModel,
  agnoMethodology,
  analogiesEnabled,
  showSystemDetails,
  setShowSystemDetails
}: {
  systemStatus: 'initializing' | 'ready' | 'working' | 'error';
  connectionStatus: 'connecting' | 'connected' | 'disconnected';
  sessionId: string;
  whiteboardContext?: any;
  messagesCount: number;
  aiModel: string;
  agnoMethodology: any;
  analogiesEnabled: boolean;
  showSystemDetails: boolean;
  setShowSystemDetails: (show: boolean) => void;
}) => {
  const getStatusColor = (status: typeof systemStatus) => {
    switch (status) {
      case 'initializing': return 'text-yellow-500';
      case 'ready': return 'text-green-500';
      case 'working': return 'text-blue-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getConnectionColor = (status: typeof connectionStatus) => {
    switch (status) {
      case 'connecting': return 'bg-yellow-500';
      case 'connected': return 'bg-green-500';
      case 'disconnected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: typeof systemStatus) => {
    switch (status) {
      case 'initializing': return 'Inicializando...';
      case 'ready': return 'Pronto para conversar';
      case 'working': return 'Processando resposta';
      case 'error': return 'Erro no sistema';
      default: return 'Status desconhecido';
    }
  };

  // return (
  //   <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-b border-blue-100/50 dark:from-blue-950/20 dark:to-purple-950/20 dark:border-blue-900/30">
  //     <div className="flex items-center gap-3">
  //       {/* Status do Sistema */}
  //       <div className="flex items-center gap-2">
  //         <div className={`w-2 h-2 rounded-full ${getConnectionColor(connectionStatus)} animate-pulse`}></div>
  //         <span className={`text-xs font-medium ${getStatusColor(systemStatus)}`}>
  //           {getStatusText(systemStatus)}
  //         </span>
  //       </div>

  //       {/* Indicador de Contexto do Whiteboard */}
  //       {whiteboardContext && (
  //         <div className="flex items-center gap-1 px-3 py-1 bg-purple-100/60 dark:bg-purple-900/30 rounded-full border border-purple-200/50">
  //           <Brain className="w-3 h-3 text-purple-600 animate-pulse" />
  //           <span className="text-xs text-purple-700 dark:text-purple-300 font-medium">
  //             {whiteboardContext?.whiteboard?.elementCount || 0} elementos • IA integrada
  //           </span>
  //         </div>
  //       )}

  //       {/* Contador de Mensagens */}
  //       <div className="flex items-center gap-1 px-2 py-1 bg-gray-100/60 dark:bg-gray-800/50 rounded-full">
  //         <MessageSquarePlus className="w-3 h-3 text-gray-600 dark:text-gray-400" />
  //         <span className="text-xs text-gray-700 dark:text-gray-300">
  //           {messagesCount} mensagens
  //         </span>
  //       </div>
  //     </div>

  //     {/* Status da Sessão e Detalhes */}
  //     <div className="flex items-center gap-2">
  //       {/* Botão de informações do sistema */}
  //       <button
  //         onClick={() => setShowSystemDetails(!showSystemDetails)}
  //         className="flex items-center gap-1 px-2 py-1 bg-blue-100/60 dark:bg-blue-900/30 rounded-full hover:bg-blue-200/60 dark:hover:bg-blue-800/30 transition-colors"
  //         title="Mostrar detalhes do sistema"
  //       >
  //         <Settings className="w-3 h-3 text-blue-600 dark:text-blue-400" />
  //         <span className="text-xs text-blue-700 dark:text-blue-300">
  //           Sistema
  //         </span>
  //       </button>

  //       {sessionId && (
  //         <div className="flex items-center gap-1 px-2 py-1 bg-green-100/60 dark:bg-green-900/30 rounded-full">
  //           <Zap className="w-3 h-3 text-green-600" />
  //           <span className="text-xs text-green-700 dark:text-green-300">
  //             Sessão ativa
  //           </span>
  //         </div>
  //       )}
  //     </div>

  //     {/* Detalhes do Sistema (expandível) */}
  //     {showSystemDetails && (
  //       <div className="absolute top-full left-0 right-0 mt-1 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
  //         <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">📊 Status do Sistema</h4>
  //         <div className="grid grid-cols-2 gap-2 text-xs">
  //           <div><span className="font-medium">Modelo:</span> {aiModel}</div>
  //           <div><span className="font-medium">Metodologia:</span> {agnoMethodology}</div>
  //           <div><span className="font-medium">Analogias:</span> {analogiesEnabled ? 'Ativo' : 'Inativo'}</div>
  //           <div><span className="font-medium">Mensagens:</span> {messagesCount}</div>
  //           {whiteboardContext && (
  //             <>
  //               <div className="col-span-2"><span className="font-medium">🎨 Contexto Whiteboard:</span></div>
  //               <div><span className="font-medium">Elementos:</span> {whiteboardContext?.whiteboard?.elementCount || 0}</div>
  //               <div><span className="font-medium">Complexidade:</span> {whiteboardContext?.whiteboard?.complexity || 'N/A'}</div>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

// Componente de estado idle - versão ultra sutil e discreta
const IdleState = ({
  onSuggestedQuestion,
  idleLevel = 'mild'
}: {
  onSuggestedQuestion: (question: string) => void;
  idleLevel?: 'none' | 'mild' | 'moderate' | 'high';
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Diferentes níveis de engajamento - versão minimalista
  const getEngagementData = () => {
    switch (idleLevel) {
      case 'mild':
        return {
          emotion: 'neutral' as const,
          message: "Alguma dúvida?",
          suggestions: [],
          showParticles: false,
          delay: 5000 // Mais tempo antes de aparecer
        };
      case 'moderate':
        return {
          emotion: 'thinking' as const,
          message: "Posso ajudar?",
          suggestions: [
            "Como funciona um loop?",
            "O que são variáveis?"
          ],
          showParticles: false, // Removido partículas
          delay: 4000
        };
      case 'high':
        return {
          emotion: 'neutral' as const, // Menos emoção
          message: "Como posso ajudar?",
          suggestions: [
            "Que tal um exemplo prático?",
            "Posso explicar algo novo?"
          ],
          showParticles: false, // Removido partículas
          delay: 3000
        };
      default:
        return null;
    }
  };

  const engagementData = getEngagementData();
  
  if (!engagementData) return null;

  useEffect(() => {
    const suggestionTimer = setTimeout(() => {
      setShowSuggestions(true);
    }, engagementData.delay);
    
    return () => clearTimeout(suggestionTimer);
  }, [idleLevel, engagementData.delay]);

  return (
    <div className="flex flex-col items-center justify-center py-4 space-y-3 relative opacity-80">
      {/* CodeBot sem animações chamativos */}
      <div className="flex flex-col items-center space-y-2">
        <div className="transition-opacity duration-1000">
          <CodeBotMascot emotion={engagementData.emotion} size="small" isIdle={false} />
        </div>
        
        {/* Mensagem ultra discreta */}
        {/* <div className="bg-gray-50/80 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs opacity-70">
          <span>{engagementData.message}</span>
        </div> */}
      </div>

      
    </div>
  );
};

// --- Define Settings Components Outside ---

interface SettingsProps {
  analogiesEnabled: boolean;
  setAnalogiesEnabled: (enabled: boolean) => void;
  knowledgeBase: string;
  setKnowledgeBase: (base: string) => void;
  aiModel: string;
  setAiModel: (model: string) => void;
  methodology: string;
  setMethodology: (methodology: string) => void;
}

// DesktopSettingsView: REMOVE methodology dropdown (keep only analogy and model)
const DesktopSettingsView: React.FC<SettingsProps> = (props) => (
  <div className="mb-3">
    <AnalogySettings {...props} />
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">Modelo de IA</h3>
      <Select value={props.aiModel} onValueChange={(value) => props.setAiModel(normalizeModelId(value))}>
        <SelectTrigger className="w-full h-10 text-sm justify-between overflow-hidden whitespace-nowrap" title={findModelOption(props.aiModel)?.name ?? props.aiModel}>
          <SelectValue className="truncate" placeholder="Selecione o modelo" />
        </SelectTrigger>
        <SelectContent>
          <ModelSelectItems />
        </SelectContent>
      </Select>
    </div>
    {/* Methodology dropdown removed from settings */}
  </div>
);


// Analytics helper (privacy-safe)
const trackEvent = (name: string, props?: Record<string, any>) => {
  try {
    posthog?.capture?.(name, props);
  } catch (_e) {
    // no-op
  }
};

// --- Main Chat Interface Component ---

interface ChatInterfaceProps {
  whiteboardContext?: Record<string, any> | null;
  methodology?: string;
  userId?: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Olá! 👋 Eu sou o CodeBot, seu assistente educacional! Estou aqui para tornar seu aprendizado mais divertido e personalizado. Que tal começarmos nossa jornada de conhecimento juntos? 🚀✨",
    isAi: true,
    timestamp: new Date(),
  },

  //MENSAGEM EXPLICANDO COMO PODER SER USADO O CHAT
  {
    id: "2",
    content: "Você pode me fazer perguntas sobre programação, pedir explicações de conceitos, solicitar exemplos práticos ou até mesmo pedir analogias para facilitar o entendimento. Estou aqui para ajudar! 😊",
    isAi: true,
    timestamp: new Date(),
  },
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ whiteboardContext, methodology = "default", userId }) => {
  // Estados principais memoizados para reduzir re-renders
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analogiesEnabled, setAnalogiesEnabled] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const defaultModelId = useMemo(
    () => normalizeModelId(getDefaultModelForProvider('claude') || AI_MODEL_OPTIONS[0]?.id || 'claude-sonnet-4-20250514'),
    []
  );
  const [aiModel, setAiModel] = useState<string>(defaultModelId);
  const handleModelChange = useCallback((value: string) => {
    setAiModel(normalizeModelId(value));
  }, []);
  const [methodologyState, setMethodology] = useState<string>("default");
  const [agnoMethodology, setAgnoMethodology] = useState<MethodologyType>(MethodologyType.WORKED_EXAMPLES);

  // Estados UI otimizados
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [showAnalogyDropdown, setShowAnalogyDropdown] = useState(false);

  // Estados constantes (não precisam ser state)
  const diagramsEnabled = false;
  const diagramType = "mermaid" as const;
  const maxFinalCodeLines = 150;
  
  // Worked Examples estruturados do backend (exibição passo-a-passo)
  type WorkedExampleData = {
    worked_example_segments: any;
    frontend_segments: Array<{
      id: string;
      title: string;
      type: string;
      content: string;
      language?: string;
    }>;
    validation: any;
    educational_guidance: string;
    methodology: string;
    topic: string;
    difficulty: string;
    scientific_basis: string[];
  };

  const [workedExampleData, setWorkedExampleData] = useState<WorkedExampleData | null>(null);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [showWorkedExamples, setShowWorkedExamples] = useState(false);
  const [segmentedResponses, setSegmentedResponses] = useState<Record<string, { segments: ResponseSegment[]; currentIndex: number }>>({});
  const [activeSegmentMessageId, setActiveSegmentMessageId] = useState<string | null>(null);

  // Estados para o novo layout de 2 colunas
  const [showExamplesPanel, setShowExamplesPanel] = useState(true);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const { examples: storedExamples, setExamples } = useExamples();

  const connectionSteps = useMemo(() => ([
    {
      key: 'model',
      label: 'Modelo de IA pronto',
      description: 'Motor principal carregado com instruções educacionais.',
      state: 'done' as const,
    },
    {
      key: 'session',
      label: 'Sessão criada',
      description: 'Perfil sincronizado e contexto preservado.',
      state: 'done' as const,
    },
    {
      key: 'backend',
      label: 'Serviços conectados',
      description: 'Backend e exemplos contextuais disponíveis.',
      state: 'done' as const,
    },
    {
      key: 'finalizing',
      label: 'Finalizando ambiente',
      description: 'Organizando ferramentas de estudo e preferências.',
      state: 'active' as const,
    },
  ]), []);

  // Estados para o sistema de missões
  const {
    missions,
    isLoading: isLoadingMissions,
    selectedMission,
    selectMission,
    clearSelectedMission,
  } = useMissions({ autoFetch: true });
  
  // Log de debug para missões
  console.log('[ChatInterface] 🎯 Missões carregadas:', {
    count: missions.length,
    isLoading: isLoadingMissions,
    missions: missions.map(m => ({ id: m.id, title: m.title, type: m.type }))
  });
  
  // Estado para controlar se o usuário já selecionou uma missão
  const [hasMissionSelected, setHasMissionSelected] = useState(false);

  // Formata um segmento com um cabeçalho markdown amigável para o usuário
  const getSegmentBadge = useCallback((type: string): string => {
    switch (type) {
      case 'intro': return '✨ Introdução';
      case 'steps': return '📝 Passo a passo';
      case 'correct_example': return '✅ Exemplo Correto';
      case 'incorrect_example': return '⚠️ Exemplo Incorreto';
      case 'reflection': return '💭 Reflexão';
      case 'final_code': return '💻 Código final';
      default: return '📌 Etapa';
    }
  }, []);

  const formatSegmentContent = useCallback((seg: ResponseSegment): string => {
    const label = seg.title?.trim().length ? seg.title : getSegmentBadge(seg.type);
    // Usa heading para aparecer como título no markdown renderizado
    return `### ${label}\n\n${seg.content || ''}`.trim();
  }, [getSegmentBadge]);

  const ALLOWED_SEGMENT_TYPES = useMemo(
    () => new Set(['reflection', 'steps', 'correct_example', 'incorrect_example', 'quiz']),
    []
  );

  const enforceSegmentLimits = useCallback(
    (segments: ResponseSegment[], firstSegment?: ResponseSegment) => {
      let reflectionCount = firstSegment?.type?.toLowerCase() === 'reflection' ? 1 : 0;
      let stepsCount = firstSegment?.type?.toLowerCase() === 'steps' ? 1 : 0;
      let exampleCount = ['correct_example', 'incorrect_example'].includes(
        (firstSegment?.type || '').toLowerCase()
      )
        ? 1
        : 0;

      return segments.filter((seg) => {
        const type = (seg.type || '').toLowerCase();

        if (type === 'reflection') {
          if (reflectionCount >= 1) {
            return false;
          }
          reflectionCount += 1;
          return true;
        }

        if (type === 'steps') {
          if (stepsCount >= 2) {
            return false;
          }
          stepsCount += 1;
          return true;
        }

        if (type === 'correct_example' || type === 'incorrect_example') {
          if (exampleCount >= 3) {
            return false;
          }
          exampleCount += 1;
          return true;
        }

        return ALLOWED_SEGMENT_TYPES.has(type);
      });
    },
    [ALLOWED_SEGMENT_TYPES]
  );

  const normalizeDifficulty = useCallback((value: unknown): CodeExample["difficulty"] | undefined => {
    if (typeof value !== 'string') {
      return undefined;
    }
    const normalized = value.toLowerCase();
    return normalized === 'beginner' || normalized === 'intermediate' || normalized === 'advanced'
      ? normalized
      : undefined;
  }, []);

  const flattenExamplePairs = useCallback((pairs: unknown): CodeExample[] => {
    if (!Array.isArray(pairs)) {
      return [];
    }

    const items: CodeExample[] = [];

    pairs.forEach((pair, index) => {
      if (!pair || typeof pair !== 'object') {
        return;
      }

      const pairObj = pair as Record<string, any>;
      const pairId = typeof pairObj.pair_id === 'string' && pairObj.pair_id.trim().length > 0
        ? pairObj.pair_id.trim()
        : `pair_${index + 1}`;
      const pairContext = typeof pairObj.context === 'string' ? pairObj.context.trim() : '';

      const pushExample = (example: any, type: 'correct' | 'incorrect') => {
        if (!example || typeof example !== 'object') {
          return;
        }

        const code = typeof example.code === 'string' ? example.code.trim() : '';
        if (!code) {
          return;
        }

        const baseId = example.example_id || example.id || `${pairId}_${type}_${index}`;
        const language = typeof example.language === 'string' && example.language.trim().length > 0
          ? example.language.trim()
          : 'javascript';

        const explanationParts: string[] = [];
        if (type === 'correct') {
          if (typeof example.explanation === 'string' && example.explanation.trim().length > 0) {
            explanationParts.push(example.explanation.trim());
          } else if (typeof example.why_correct === 'string' && example.why_correct.trim().length > 0) {
            explanationParts.push(example.why_correct.trim());
          } else {
            explanationParts.push('Este exemplo demonstra a maneira correta de resolver o problema proposto.');
          }
        } else {
          if (typeof example.error_explanation === 'string' && example.error_explanation.trim().length > 0) {
            explanationParts.push(example.error_explanation.trim());
          }
          if (typeof example.correction === 'string' && example.correction.trim().length > 0) {
            explanationParts.push(`Correção sugerida: ${example.correction.trim()}`);
          }
          if (!explanationParts.length && typeof example.explanation === 'string' && example.explanation.trim().length > 0) {
            explanationParts.push(example.explanation.trim());
          }
          if (!explanationParts.length) {
            explanationParts.push('Analise o erro neste trecho de código e ajuste para obter o comportamento correto.');
          }
        }

        const tagsFromExample = Array.isArray(example.tags)
          ? example.tags.filter((tag: unknown): tag is string => typeof tag === 'string' && tag.trim().length > 0)
          : [];
        const combinedTags = [...tagsFromExample];
        if (pairContext) {
          combinedTags.push(pairContext);
        }

        items.push({
          id: String(baseId),
          title:
            typeof example.title === 'string' && example.title.trim().length > 0
              ? example.title.trim()
              : type === 'correct'
                ? 'Exemplo Correto'
                : 'Exemplo Incorreto',
          code,
          language,
          type,
          explanation: explanationParts.join('\n\n'),
          tags: combinedTags.length ? Array.from(new Set(combinedTags)) : undefined,
          difficulty: normalizeDifficulty(example.difficulty),
        });
      };

      pushExample(pairObj.correct, 'correct');
      pushExample(pairObj.incorrect, 'incorrect');
    });

    return items;
  }, [normalizeDifficulty]);

  const syncExamplesWithPairs = useCallback(
    (pairs: unknown) => {
      const flattened = flattenExamplePairs(pairs);
      if (!flattened.length) {
        return;
      }

      const existingIds = new Set(flattened.map((example) => example.id));
      const merged = [
        ...flattened,
        ...storedExamples.filter((example) => !existingIds.has(example.id)),
      ];

      const limited = merged.slice(0, EXAMPLES_CACHE_LIMIT);

      const hasChanged =
        limited.length !== storedExamples.length ||
        limited.some((example, index) => {
          const previous = storedExamples[index];
          if (!previous) return true;
          return (
            previous.id !== example.id ||
            previous.code !== example.code ||
            previous.explanation !== example.explanation
          );
        });

      if (!hasChanged) {
        return;
      }

      posthog?.capture?.('edu_examples_synced_from_agno', {
        newExamplesCount: flattened.length,
        cacheSize: limited.length,
      });

      setExamples(limited);
    },
    [flattenExamplePairs, setExamples, storedExamples]
  );

  // Rótulo do botão de avanço, contextual ao próximo segmento
  const getNextStepButtonLabel = useCallback((): string => {
    if (!activeSegmentMessageId) {
      return 'Avançar etapa';
    }

    const entry = segmentedResponses[activeSegmentMessageId];
    if (!entry) {
      return 'Avançar etapa';
    }

    const nextIndex = entry.currentIndex + 1;
    if (nextIndex >= entry.segments.length) {
      return 'Etapas concluídas';
    }

    const nextType = (entry.segments[nextIndex]?.type || '').toLowerCase();
    switch (nextType) {
      case 'reflection':
        return 'Ver reflexão';
      case 'steps':
        return 'Ver passo a passo';
      case 'correct_example':
        return 'Ver exemplo correto';
      case 'incorrect_example':
        return 'Ver exemplo com erro';
      case 'quiz':
        return 'Responder quiz';
      case 'final_code':
        return 'Ver código final';
      default:
        return 'Avançar etapa';
    }
  }, [activeSegmentMessageId, segmentedResponses]);

  const toggleExamplesPanel = useCallback(() => {
    setShowExamplesPanel(!showExamplesPanel);
  }, [showExamplesPanel]);

  // Handler para seleção de missão
  const handleMissionSelect = useCallback((mission: Mission) => {
    selectMission(mission);
    setHasMissionSelected(true);
    
    // Tocar som de sucesso
    // soundEffects.playSuccess();
    
    // Adicionar mensagem inicial do bot sobre a missão
    const missionWelcomeMessage: Message = {
      id: `mission-welcome-${Date.now()}`,
      content: `🎯 Ótimo! Vamos trabalhar na missão **"${mission.title}"**.\n\n${mission.description}\n\nEstou aqui para te ajudar com qualquer dúvida sobre este tema. Como posso começar a ajudar você?`,
      isAi: true,
      timestamp: new Date(),
    };
    
    setMessages([missionWelcomeMessage]);
    setHasUserSentMessage(false);
    setExamples([]);
    setSegmentedResponses({});
    setActiveSegmentMessageId(null);
    setShowWelcomeMessages(false);
    setWelcomeComplete(true);
    
    toast.success(`Missão "${mission.title}" iniciada!`, {
      icon: '🎯',
      duration: 3000,
    });
    
    // Tracking analytics
    trackEvent('mission_selected', {
      missionId: mission.id,
      missionTitle: mission.title,
      missionType: mission.type,
      difficulty: mission.difficulty,
    });
  }, [selectMission, setExamples, trackEvent]);

  // Session metrics (start/end)
  const sessionStartRef = useRef<number | null>(null);
  useEffect(() => {
    sessionStartRef.current = Date.now();
    posthog?.capture?.('edu_session_start', { route: 'dashboard/chat' });
    return () => {
      if (sessionStartRef.current) {
        const durationMs = Date.now() - sessionStartRef.current;
        posthog?.capture?.('edu_session_end', { route: 'dashboard/chat', durationMs });
      }
    };
  }, []);

  // Quiz correctness context
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);
  const [quizWrongCount, setQuizWrongCount] = useState(0);
  const [lastQuizAnswer, setLastQuizAnswer] = useState<QuizAnswerEvent | null>(null);
  const quizAttemptsRef = useRef<Map<string, number>>(new Map());

  const handleQuizAnswer = (evt: QuizAnswerEvent) => {
    setLastQuizAnswer(evt);
    const qid = simpleHash(evt.question || '');
    // increment attempts
    const prev = quizAttemptsRef.current.get(qid) || 0;
    quizAttemptsRef.current.set(qid, prev + 1);
    if (evt.correct) {
      // attempts to mastery
      const attempts = quizAttemptsRef.current.get(qid) || 1;
      posthog?.capture?.('edu_quiz_attempts_to_mastery', { questionId: qid, attempts });
      quizAttemptsRef.current.delete(qid);
      setQuizCorrectCount((c) => c + 1);
    } else {
      setQuizWrongCount((c) => c + 1);
    }
    // aggregate accuracy
    const corr = (evt.correct ? quizCorrectCount + 1 : quizCorrectCount);
    const wrong = (evt.correct ? quizWrongCount : quizWrongCount + 1);
    const total = corr + wrong;
    const accuracy = total > 0 ? corr / total : 0;
    posthog?.capture?.('edu_quiz_accuracy', { correctCount: corr, wrongCount: wrong, accuracy });
  };
  
  // Track settings changes (skip initial)
  const prevAiModel = useRef(aiModel);
  const prevAgno = useRef(agnoMethodology);
  const prevDiagrams = useRef(diagramsEnabled);
  const prevAnalogies = useRef(analogiesEnabled);
  useEffect(() => {
    if (prevAiModel.current !== aiModel) {
      trackEvent('edu_chat_settings_change', { setting: 'aiModel', value: aiModel });
      prevAiModel.current = aiModel;
    }
  }, [aiModel]);
  useEffect(() => {
    if (prevAgno.current !== agnoMethodology) {
      trackEvent('edu_chat_settings_change', { setting: 'methodology', value: agnoMethodology });
      prevAgno.current = agnoMethodology;
    }
  }, [agnoMethodology]);
  useEffect(() => {
    if (prevDiagrams.current !== diagramsEnabled) {
      trackEvent('edu_chat_settings_change', { setting: 'diagramsEnabled', value: diagramsEnabled });
      prevDiagrams.current = diagramsEnabled;
    }
  }, [diagramsEnabled]);
  useEffect(() => {
    if (prevAnalogies.current !== analogiesEnabled) {
      trackEvent('edu_chat_settings_change', { setting: 'analogiesEnabled', value: analogiesEnabled });
      prevAnalogies.current = analogiesEnabled;
    }
  }, [analogiesEnabled]);
  // Estados para controle das mensagens de boas-vindas
  const [showWelcomeMessages, setShowWelcomeMessages] = useState(true);
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  // Estado para indicar se o sistema está inicializando
  const [systemInitializing, setSystemInitializing] = useState(true);
  const [systemStatus, setSystemStatus] = useState<'initializing' | 'ready' | 'working' | 'error'>('initializing');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  
  // Estados emocionais e de experiência do usuário
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [userEngagement, setUserEngagement] = useState<'low' | 'medium' | 'high'>('medium');
  const [loadingMessages] = useState([
    "Pensando na melhor explicação pra você... 💡",
    "Organizando os passos de forma clara... 🧩",
    "Ajustando detalhes pra ficar redondinho... 🔎",
    "Deixando tudo simples e direto... ✨",
    "Quase lá! Finalizando sua resposta... 🚀"
  ]);

  // Atualizar status do sistema baseado nos estados atuais
  useEffect(() => {
    if (systemInitializing) {
      setSystemStatus('initializing');
      setConnectionStatus('connecting');
    } else if (isLoading) {
      setSystemStatus('working');
      setConnectionStatus('connected');
    } else {
      setSystemStatus('ready');
      setConnectionStatus('connected');
    }
  }, [systemInitializing, isLoading]);

  // Simular inicialização completa após um tempo
  useEffect(() => {
    const timer = setTimeout(() => {
      setSystemInitializing(false);
    }, 2000); // 2 segundos para simular carregamento

    return () => clearTimeout(timer);
  }, []);



  // Estados de celebração e conquistas
  const [celebrationCount, setCelebrationCount] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState("");
  const [emotionalState, setEmotionalState] = useState<'neutral' | 'encouraging' | 'celebrating' | 'supportive'>('neutral');

  // Novos estados emocionais inspirados no Duolingo
  const [streakCount, setStreakCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [showCodeBotReaction, setShowCodeBotReaction] = useState<string | null>(null);
  const [sessionMessagesCount, setSessionMessagesCount] = useState(0);
  const [lastInteractionTime, setLastInteractionTime] = useState<Date | null>(null);

  // Estado para mostrar informações detalhadas do sistema
  const [showSystemDetails, setShowSystemDetails] = useState(false);
  
  // Idle management
  const [isUserIdle, setIsUserIdle] = useState(false);
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);
  const [idleShowSuggestions, setIdleShowSuggestions] = useState(false);
  const [idleLevel, setIdleLevel] = useState<'none' | 'mild' | 'moderate' | 'high'>("none");
  const idleStartRef = useRef<number | null>(null);

  // Track idle changes (ignore 'none')
  useEffect(() => {
    if (idleLevel && idleLevel !== 'none') {
      posthog?.capture?.('edu_chat_idle_level', { level: idleLevel });
    }
  }, [idleLevel]);

  // Funções de celebração profissionais usando canvas-confetti + sons
  const triggerBasicCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 }
    });
    soundEffects.playSuccess();
  };

  const triggerMajorCelebration = () => {
    // Explosão dupla
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 0);
    
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 300);
    
    soundEffects.playAchievement();
  };

  const triggerEpicCelebration = () => {
    setShowConfetti(true);
    
    // Múltiplas explosões épicas
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.1, 0.3) }
      });
      confetti({
        particleCount: 5,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.1, 0.3) }
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
    soundEffects.playEpicCelebration();
  };

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    const timer = setTimeout(() => {
    scrollToBottom();
    }, 100); // Pequeno delay para garantir que o DOM seja atualizado
    
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  // Garantir que o scroll container seja focalizável
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      // Definir propriedades para garantir que o scroll funcione
      container.style.scrollBehavior = 'smooth';
      container.style.overflowY = 'auto';
      container.style.overscrollBehavior = 'contain';
      
      // Garantir que o container possa receber eventos
      container.addEventListener('wheel', (e) => {
        e.stopPropagation();
      });
      
      // Focar no container para permitir scroll com teclado
      container.focus();
    }
  }, []);

  // Detectar scroll manual do usuário
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let userScrolling = false;

    const handleScroll = () => {
      userScrolling = true;
      
      // Detectar se o usuário está fazendo scroll manual
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      
      // Se o usuário fez scroll para cima, alterar o comportamento do scroll
      if (!isAtBottom) {
        scrollContainer.style.scrollBehavior = 'auto';
      } else {
        scrollContainer.style.scrollBehavior = 'smooth';
      }
      
      // Reset da flag após um período
      setTimeout(() => {
        userScrolling = false;
      }, 150);
    };

    const handleWheel = (e: WheelEvent) => {
      // Garantir que o evento de scroll seja processado normalmente
      e.stopPropagation();
      userScrolling = true;
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    scrollContainer.addEventListener('wheel', handleWheel);
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Função para gerenciar idle state
  const resetIdleTimer = () => {
    // Limpa timer anterior
    if (idleTimer) {
      clearTimeout(idleTimer);
    }
    
    // Reset estados idle
    if (isUserIdle) {
      setIsUserIdle(false);
      setIdleLevel('none');
      setIdleShowSuggestions(false);
    }
    
    // Inicia novo timer
    const newTimer = setTimeout(() => {
      handleUserIdle();
    }, 15000); // 15 segundos de inatividade
    
    setIdleTimer(newTimer);
  };

  const handleUserIdle = () => {
    setIsUserIdle(true);
    setIdleLevel('mild');
    idleStartRef.current = Date.now();
    
    // Escalar o nível de idle ao longo do tempo
    setTimeout(() => {
      setIdleLevel('moderate');
      setIdleShowSuggestions(true);
    }, 10000); // +10s = mild -> moderate
    
    setTimeout(() => {
      setIdleLevel('high');
    }, 25000); // +25s = moderate -> high
  };

  // Detectar interação do usuário
  const handleUserInteraction = () => {
    // if was idle, emit idle_to_active
    if (isUserIdle && idleStartRef.current) {
      const idleMs = Date.now() - idleStartRef.current;
      posthog?.capture?.('edu_idle_to_active', { idleMs });
      idleStartRef.current = null;
    }
    resetIdleTimer();
    setLastInteractionTime(new Date());
  };

  const [sessionId, setSessionId] = useState<string>("");

  // Chat context state
  const [chatContext, setChatContext] = useState<{
    classId?: string;
    subject?: string;
  }>({});

  // Mission Tracker - Rastreamento automático de progresso das missões
  // Usar o classId da missão selecionada se disponível, caso contrário usar o chatContext
  const missionClassId = selectedMission?.class || chatContext.classId;
  const { trackChatMessage, refreshMissions } = useMissionTracker(missionClassId);

  // Atualizar missões quando selecionar uma nova missão
  useEffect(() => {
    if (selectedMission) {
      refreshMissions();
    }
  }, [selectedMission, refreshMissions]);

  // Save chat context to session
  const saveChatContext = useCallback(async (classId?: string, subject?: string) => {
    if (!sessionId) return;

    try {
      await pb.collection('chat_sessions').update(sessionId, {
        class: classId || null,
        subject: subject || null,
        last_interaction: new Date().toISOString(),
      });

      setChatContext({ classId, subject });
    } catch (error) {
      console.error('Erro ao salvar contexto do chat:', error);
    }
  }, [sessionId]);

  // Load chat context from session
  const loadChatContext = useCallback(async (currentSessionId: string) => {
    if (!currentSessionId) return;

    try {
      const session = await pb.collection('chat_sessions').getOne(currentSessionId);
      if (session) {
        setChatContext({
          classId: session.class || undefined,
          subject: session.subject || undefined,
        });
      }
    } catch (error) {
      console.error('Erro ao carregar contexto do chat:', error);
    }
  }, []);

  // Track chat interactions
  const trackChatInteraction = useCallback(async (
    interactionType: 'message_sent' | 'message_received' | 'session_started' | 'session_ended' | 'error_occurred' | 'feedback_provided',
    targetId?: string,
    metadata?: Record<string, any>
  ) => {
    const user = getCurrentUser();
    if (!user || !sessionId) return;

    try {
      await pb.collection('chat_interactions').create({
        user: user.id,
        session: sessionId,
        class: chatContext.classId || null,
        interaction_type: interactionType,
        target_id: targetId || '',
        metadata: {
          ...metadata,
          subject: chatContext.subject,
          classId: chatContext.classId,
        },
      });
    } catch (error) {
      console.error('Erro ao rastrear interação do chat:', error);
    }
  }, [sessionId, chatContext]);

  useEffect(() => {
    const initializeSession = async () => {
      const lastSessionId = sessionStorage.getItem("coderbot_last_chat_session");
      
      if (lastSessionId) {
        // Try to load the last session
        try {
          await handleSessionChange(lastSessionId);
        } catch (error) {
          console.error("Error loading last session:", error);
          // If loading fails, create a new session
          await createNewSession();
        }
      } else {
        // No session found, create a new one
        await createNewSession();
      }
    };

    const createNewSession = async () => {
      try {
        const newSessionId = await chatService.createSession();
        setSessionId(newSessionId);
        setHasUserSentMessage(false);
        setExamples([]);
        sessionStorage.setItem("coderbot_last_chat_session", newSessionId);

        // Track session started
        trackChatInteraction('session_started', newSessionId);

        trackEvent('edu_chat_session_created', { sessionId: newSessionId });

        console.log("New session created:", newSessionId); // Debug log
      } catch (error) {
        console.error("Error creating new chat session:", error);
        toast.error("Error creating chat session");
      }
    };

    initializeSession();
    // eslint-disable-next-line
  }, []);

  // When sessionId changes, update sessionStorage
  useEffect(() => {
    if (sessionId) {
      sessionStorage.setItem("coderbot_last_chat_session", sessionId);
    }
  }, [sessionId]);

  // Update handleSessionChange to also update sessionStorage
  const handleSessionChange = async (newSessionId: string) => {
    try {
      setIsLoading(true);
      const sessionMessages = await chatService.loadSessionMessages(newSessionId);
      setExamples([]);
      if (sessionMessages && sessionMessages.length > 0) {
        const segmentedState: Record<string, { segments: ResponseSegment[]; currentIndex: number }> = {};
        let latestSegmentedId: string | null = null;

        const normalizedMessages = sessionMessages.map((message) => {
          if (message.isAi && Array.isArray(message.segments) && message.segments.length > 0) {
            const segmentsArray = message.segments as ResponseSegment[];
            segmentedState[message.id] = {
              segments: segmentsArray,
              currentIndex: 0,
            };
            latestSegmentedId = message.id;
            return {
              ...message,
              segments: segmentsArray.slice(0, 1),
            };
          }
          return message;
        });

        setSegmentedResponses(segmentedState);
        setActiveSegmentMessageId(latestSegmentedId);
        setMessages(normalizedMessages);
        setShowWelcomeMessages(false);
        setWelcomeComplete(true);
        setHasUserSentMessage(normalizedMessages.some((message) => !message.isAi));
      } else {
        setMessages([]);
        setSegmentedResponses({});
        setActiveSegmentMessageId(null);
        setShowWelcomeMessages(true);
        setWelcomeComplete(false);
        setHasUserSentMessage(false);
      }
      setSessionId(newSessionId);
      sessionStorage.setItem("coderbot_last_chat_session", newSessionId);
      scrollToBottom();

      // Load chat context for existing session
      await loadChatContext(newSessionId);

      trackEvent('edu_chat_session_loaded', { sessionId: newSessionId, numMessages: sessionMessages?.length ?? 0 });
    } catch (error) {
      console.error("Error changing session:", error);
      toast.error("Erro ao carregar mensagens da sessão");
    } finally {
      setIsLoading(false);
    }
  };

  // Update handleNewSession to clear sessionStorage and create a new session
  const handleNewSession = async () => {
    setSessionId("");
    setMessages([]);
    setShowWelcomeMessages(true);
    setWelcomeComplete(false);
    setHasUserSentMessage(false);
    setExamples([]);
    setSegmentedResponses({});
    setActiveSegmentMessageId(null);
    try {
      const newSessionId = await chatService.createSession();
      setSessionId(newSessionId);
      sessionStorage.setItem("coderbot_last_chat_session", newSessionId);
      trackEvent('edu_chat_session_created', { sessionId: newSessionId, source: 'manual' });
    } catch (error) {
      console.error("Error creating new chat session:", error);
      toast.error("Erro ao criar nova sessão de chat");
    }
  };

  // Funções para lidar com as mensagens de boas-vindas
  const handleWelcomeComplete = async () => {
    setShowWelcomeMessages(false);
    setWelcomeComplete(true);
    setMessages(INITIAL_MESSAGES);
    setHasUserSentMessage(false);
    setExamples([]);
    setSegmentedResponses({});
    setActiveSegmentMessageId(null);
    
    // Save initial messages to database now that welcome is complete
    if (sessionId) {
      try {
        for (const message of INITIAL_MESSAGES) {
          await chatService.saveMessage({
            content: message.content,
            isAi: message.isAi,
            sessionId,
          });
        }
      } catch (error) {
        console.error("Error saving initial messages:", error);
      }
    }
    
    scrollToBottom();
  };

  const handleWelcomeSkip = async () => {
    setShowWelcomeMessages(false);
    setWelcomeComplete(true);
    setMessages(INITIAL_MESSAGES);
    setHasUserSentMessage(false);
    setExamples([]);
    setSegmentedResponses({});
    setActiveSegmentMessageId(null);
    
    // Save initial messages to database
    if (sessionId) {
      try {
        for (const message of INITIAL_MESSAGES) {
          await chatService.saveMessage({
            content: message.content,
            isAi: message.isAi,
            sessionId,
          });
        }
      } catch (error) {
        console.error("Error saving initial messages:", error);
      }
    }
    
    scrollToBottom();
  };

  const handleSendMessage = async (input: string) => {
  
    
    if (!input.trim()) {
      console.log("Input is empty, returning");
      return;
    }
    
    if (!sessionId) {
      console.log("No sessionId, returning");
      return;
    }
    
    // Se ainda está mostrando boas-vindas, completar primeiro
    if (showWelcomeMessages) {
      await handleWelcomeComplete();
      // Aguardar um pouco para a transição
      setTimeout(() => {
        processMessage(input);
      }, 500);
      return;
    }
    
    processMessage(input);
  };

  const processMessage = async (input: string) => {
    console.log("Processing message:", input); // Debug log
    
    // Reset idle quando usuário envia mensagem
    handleUserInteraction();
    
    // Sistema emocional inspirado no Duolingo
    const now = new Date();
    
    // Track sent event & latency start
    const startTs = Date.now();
    const normalizedModelId = normalizeModelId(aiModel);
    let chosenProvider: ProviderKey = resolveProviderFromModel(normalizedModelId);
    let chosenModel: string = normalizedModelId;
    posthog?.capture?.('edu_chat_message_sent', {
      length: input.length,
      sessionId,
      model: normalizedModelId,
      methodology: agnoMethodology,
      diagramsEnabled,
      analogiesEnabled,
    });
    
    // Detectar primeiro uso e celebrar
    if (isFirstInteraction) {
      setIsFirstInteraction(false);
      setEmotionalState('encouraging');
      setShowCodeBotReaction('encouragement');
      
      // // Desbloquear badge de primeiro chat
      // if (!unlockedBadges.includes('first_chat')) {
      //   setUnlockedBadges(prev => [...prev, 'first_chat']);
      //   setAchievementMessage("🎉 Primeira pergunta desbloqueada!");
      //   setShowAchievement(true);
      // }
      
      setTimeout(() => setShowCodeBotReaction(null), 3000);
    }

    // Incrementar contadores
    setCelebrationCount(prev => prev + 1);
    setSessionMessagesCount(prev => prev + 1);
    setLastInteractionTime(now);

    // Sistema de streak (perguntas consecutivas)
    if (lastInteractionTime) {
      const timeDiff = now.getTime() - lastInteractionTime.getTime();
      const minutesDiff = timeDiff / (1000 * 60);
      
      // Se passou menos de 30 minutos, manter streak
      if (minutesDiff < 30) {
        setStreakCount(prev => prev + 1);
      } else {
        setStreakCount(1); // Reset streak
      }
    } else {
      setStreakCount(1);
    }

    // Celebrações baseadas no número de mensagens (como Duolingo) - Agora com confetti profissional
    if (celebrationCount > 0) {
      if (celebrationCount === 3) {
        triggerBasicCelebration();
        setShowCodeBotReaction('celebration');
        setAchievementMessage("🚀 Você está pegando o ritmo!");
        setShowAchievement(true);
        setTimeout(() => setShowCodeBotReaction(null), 3000);
      } else if (celebrationCount === 10) {
        triggerMajorCelebration();
        setAchievementMessage("🎯 10 perguntas! Você é um verdadeiro explorador!");
        setShowAchievement(true);
        if (!unlockedBadges.includes('curious_learner')) {
          setUnlockedBadges(prev => [...prev, 'curious_learner']);
        }
      } else if (celebrationCount === 25) {
        triggerEpicCelebration();
        setAchievementMessage("🌟 25 perguntas! Você é um mestre da curiosidade!");
        setShowAchievement(true);
        setEmotionalState('celebrating');
        if (!unlockedBadges.includes('problem_solver')) {
          setUnlockedBadges(prev => [...prev, 'problem_solver']);
        }
      } else if (celebrationCount % 20 === 0 && celebrationCount > 25) {
        triggerMajorCelebration();
        setAchievementMessage(`🔥 ${celebrationCount} perguntas! Dedicação impressionante!`);
        setShowAchievement(true);
        setEmotionalState('celebrating');
      }
    }

    // Sistema de streak com celebrations aprimoradas
    if (streakCount === 5 && !unlockedBadges.includes('streak_5')) {
      setUnlockedBadges(prev => [...prev, 'streak_5']);
      triggerMajorCelebration();
      setAchievementMessage("🔥 Sequência de 5! Você está em chamas!");
      setShowAchievement(true);
    } else if (streakCount === 10) {
      triggerEpicCelebration();
      setAchievementMessage("⚡ Sequência de 10! Você é imparável!");
      setShowAchievement(true);
    } else if (streakCount > 10 && streakCount % 5 === 0) {
      triggerBasicCelebration();
      soundEffects.playStreak();
      setAchievementMessage(`🌟 Sequência de ${streakCount}! Que constância!`);
      setShowAchievement(true);
    }
    
    const userMessage = {
      id: Date.now().toString(), // Temporary ID for UI
      content: input,
      isAi: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setHasUserSentMessage(true);
    setIsLoading(true);

    // Temp AI message id needs outer scope to be accessible in catch/finally
    const tempId = (Date.now() + 1).toString();

    try {
      // Save user message
      const userMsgId = await chatService.saveMessage({
        content: input,
        isAi: false,
        sessionId,
      });

      // Track message sent
      trackChatInteraction('message_sent', userMsgId, {
        messageLength: input.length,
        hasContext: !!(chatContext.classId && chatContext.subject),
      });

      // Rastrear progresso da missão de chat_interaction
      await trackChatMessage(input);

      // Update the user message with the real ID from PocketBase
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, id: userMsgId } 
            : msg
        )
      );

      // Create a temporary AI message
      setMessages((prev) => [...prev, {
        id: tempId,
        content: "",
        isAi: true,
        timestamp: new Date(),
      }]);

      // Define user profile information for the AI
      const userProfile = {
        difficulty_level: "medium",
        subject_area: "programming",
        style_preference: analogiesEnabled ? "analogies" : "concise",
        learning_progress: { questions_answered: messages.length / 2, correct_answers: 0 },
        baseKnowledge: knowledgeBase || "basic"
      };

      // Sempre usar AGNO (que está funcionando perfeitamente)
      let response;
      let lastResponseLength = 0;
      
      try {
        const userIdStr = typeof userId === 'string' ? userId : (userId ? JSON.stringify(userId) : "anonymous");
        
        // Adicionar contexto da missão selecionada
        const missionContext = selectedMission ? {
          missionId: selectedMission.id,
          missionTitle: selectedMission.title,
          missionDescription: selectedMission.description,
          missionType: selectedMission.type,
          difficulty: selectedMission.difficulty,
          topics: selectedMission.topics,
          learningObjectives: selectedMission.learningObjectives,
          preferredLanguage: selectedMission.preferred_language || null,
        } : null;
        
        const userContext = {
          userId: userIdStr,
          currentTopic: chatContext.subject || selectedMission?.title || "",
          classId: chatContext.classId || null,
          difficultyLevel: selectedMission?.difficulty || userProfile.difficulty_level || "medium",
          learningProgress: userProfile.learning_progress || {},
          preferredLanguage: selectedMission?.preferred_language || null, // Linguagem preferida
          mission: missionContext, // Adicionar contexto da missão
          quizStats: {
            correctCount: quizCorrectCount,
            wrongCount: quizWrongCount,
            accuracy: (quizCorrectCount + quizWrongCount) > 0 ? quizCorrectCount / (quizCorrectCount + quizWrongCount) : 0,
            lastAnswer: lastQuizAnswer ? { correct: lastQuizAnswer.correct, question: lastQuizAnswer.question } : null,
          },
          previousInteractions: messages
            .filter(msg => !msg.isAi)
            .map(msg => msg.content)
            .slice(-5) // Últimas 5 interações
        };

        // If last was wrong, mark remediation shown
        if (lastQuizAnswer && lastQuizAnswer.correct === false) {
          const qid = simpleHash(lastQuizAnswer.question || '');
          posthog?.capture?.('edu_remediation_shown', { questionId: qid });
        }

        // Build context prompt influence when last answer was wrong
        const extraContext = lastQuizAnswer && lastQuizAnswer.correct === false
          ? `\nO aluno errou a questão anterior. Explique claramente o porquê do erro e como chegar na resposta correta. Pergunta: ${lastQuizAnswer.question}.`
          : '';
        
        // Adicionar contexto da missão ao prompt
        const missionContextPrompt = selectedMission
          ? `\n\nContexto da Missão Ativa:\n- Título: ${selectedMission.title}\n- Descrição: ${selectedMission.description}\n- Tipo: ${selectedMission.type}\n- Dificuldade: ${selectedMission.difficulty || 'não especificado'}\n${selectedMission.learningObjectives ? `- Objetivos de Aprendizado: ${selectedMission.learningObjectives.join(', ')}` : ''}${selectedMission.preferred_language ? `\n\n⚠️ IMPORTANTE: Todos os exemplos de código devem ser EXCLUSIVAMENTE em ${selectedMission.preferred_language.toUpperCase()}. NÃO use outras linguagens de programação nos exemplos.` : ''}\n\nPor favor, mantenha suas respostas focadas neste tema e nos objetivos de aprendizado da missão.`
          : '';

        const modelOption = findModelOption(normalizedModelId);
        const provider = modelOption?.provider ?? chosenProvider;
        const modelId = modelOption?.id ?? normalizedModelId;

        // Save chosen mapping for analytics
        chosenProvider = provider;
        chosenModel = modelId;

        // Usar sistema AGNO com segmentos estruturados
        const agnoResponse = await agnoService.askQuestion({
          methodology: agnoMethodology,
          userQuery: input,
          context: (whiteboardContext ? JSON.stringify(whiteboardContext) : `Contexto: ${knowledgeBase || 'Aprendizado geral de programação'}`) + extraContext + missionContextPrompt,
          userContext,
          provider,
          modelId,
          includeFinalCode: true,
          includeDiagram: false,
          diagramType,
          maxFinalCodeLines
        });

        const examplePairs = (agnoResponse?.extras as { example_pairs?: unknown } | null)?.example_pairs;
        syncExamplesWithPairs(examplePairs);
        
        // Verifica se o backend retornou segmentos estruturados
        const segments = ((agnoResponse as any)?.segments || []) as ResponseSegment[];
        const hasSegments = Array.isArray(segments) && segments.length > 0;
        
        if (hasSegments) {
          const normalizeType = (seg: ResponseSegment) => (seg.type || '').toLowerCase();

          const allowedSegments = segments.filter((seg) => ALLOWED_SEGMENT_TYPES.has(normalizeType(seg)));

          if (allowedSegments.length === 0) {
            const fallbackContent = agnoResponse.response?.trim();
            const contentToPersist = fallbackContent && fallbackContent.length > 0
              ? fallbackContent
              : 'Não foi possível estruturar a resposta no momento. Tente novamente em instantes.';

            lastResponseLength = contentToPersist.length;

            const aiMsgId = await chatService.saveMessage({
              content: contentToPersist,
              isAi: true,
              sessionId,
            });

            setActiveSegmentMessageId(null);

            setMessages(prev =>
              prev.map(msg =>
                msg.id === tempId
                  ? { ...msg, id: aiMsgId, content: contentToPersist, timestamp: new Date() }
                  : msg
              )
            );
          } else {
            const [firstSeg, ...restSegs] = allowedSegments;
            const limitedRest = enforceSegmentLimits(restSegs, firstSeg);
            const normalizedSegments = [firstSeg, ...limitedRest];
            const firstSegmentContent = formatSegmentContent(firstSeg);

            lastResponseLength = (firstSeg?.content || '').length;

            const aiMsgId = await chatService.saveMessage({
              content: firstSegmentContent,
              isAi: true,
              sessionId,
              segments: normalizedSegments,
            });

            setSegmentedResponses(prev => ({
              ...prev,
              [aiMsgId]: {
                segments: normalizedSegments,
                currentIndex: 0,
              },
            }));
            setActiveSegmentMessageId(aiMsgId);

            setMessages(prev =>
              prev.map(msg =>
                msg.id === tempId
                  ? { ...msg, id: aiMsgId, content: firstSegmentContent, timestamp: new Date(), segments: [firstSeg] }
                  : msg
              )
            );

            trackEvent('edu_chat_segments_received', {
              sessionId,
              totalSegments: normalizedSegments.length,
              provider: chosenProvider,
              model: chosenModel,
            });
          }
        } else {
          // Fallback: comportamento anterior (mensagem completa)
          response = {
            content: agnoResponse.response,
            analogies: ""
          };
          lastResponseLength = (response.content || '').length;
          
          // Save AI response (completa)
          const aiMsgId = await chatService.saveMessage({
            content: response.content,
            isAi: true,
            sessionId,
          });

          // Track message received
          trackChatInteraction('message_received', aiMsgId, {
            responseLength: response.content.length,
            hasWorkedExample: !!workedExampleData,
          });

          // Update the AI message with content and real ID
          setMessages(prev => 
            prev.map(msg => 
              msg.id === tempId 
                ? {
                    ...msg,
                    id: aiMsgId,
                    content: response.content,
                    timestamp: new Date()
                  } 
                : msg
            )
          );
        }
        
        console.log(`✅ AGNO resposta recebida usando ${provider}/${modelId}: ${lastResponseLength} caracteres`);
        
      } catch (error) {
        // Analytics: failure in AGNO path (no sensitive data)
        trackEvent('edu_chat_response_failed', {
          kind: 'agno',
          sessionId,
          model: chosenModel,
          provider: chosenProvider,
          methodology: agnoMethodology,
          latencyMs: Date.now() - startTs,
        });
        console.error("Erro crítico no sistema AGNO:", error);
        toast.error("Erro no sistema educacional. Verifique a conexão.");
        
        // Em caso de erro crítico, mostrar mensagem de erro amigável
        response = {
          content: `Desculpe, houve um problema temporário no sistema educacional. 
          
Você perguntou: "${input}"

Por favor, tente novamente em alguns instantes. Se o problema persistir, recarregue a página.

Obrigado pela paciência! 🤖✨`,
          analogies: ""
        };
        lastResponseLength = (response.content || '').length;
      }
      
      // Analytics: response received (genérico)
      trackEvent('edu_chat_response_received', {
        sessionId,
        responseLength: lastResponseLength,
        latencyMs: Date.now() - startTs,
        model: chosenModel,
        provider: chosenProvider,
        methodology: agnoMethodology,
      });
    } catch (error) {
      console.error("Error processing message:", error);
      toast.error("Error processing message. Please try again.");
      
      // Analytics: generic failure
      trackEvent('edu_chat_response_failed', {
        kind: 'generic',
        sessionId,
        model: chosenModel,
        provider: chosenProvider,
        methodology: agnoMethodology,
        latencyMs: Date.now() - startTs,
      });
      
      // Remove only the temporary AI message that was added for loading
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
    } finally {
      setIsLoading(false);
    }
  };

  // Navegação manual entre segmentos estruturados da resposta
  const handleNextSegment = useCallback(() => {
    if (!activeSegmentMessageId) {
      return;
    }

    const entry = segmentedResponses[activeSegmentMessageId];
    if (!entry || entry.currentIndex >= entry.segments.length - 1) {
      return;
    }

    const newIndex = entry.currentIndex + 1;
    const nextSegment = entry.segments[newIndex];
    if (!nextSegment) {
      return;
    }

    setSegmentedResponses(prev => ({
      ...prev,
      [activeSegmentMessageId]: {
        ...prev[activeSegmentMessageId],
        currentIndex: newIndex,
      },
    }));

    setMessages(prev =>
      prev.map(msg =>
        msg.id === activeSegmentMessageId
          ? {
              ...msg,
              content: formatSegmentContent(nextSegment),
              segments: entry.segments.slice(0, newIndex + 1),
            }
          : msg
      )
    );

    if (nextSegment.type === 'quiz') {
      soundEffects.playAchievement();
    }

    trackEvent('edu_chat_segment_navigated', {
      direction: 'forward',
      segmentType: nextSegment.type,
      index: newIndex + 1,
      total: entry.segments.length,
      messageId: activeSegmentMessageId,
    });

    setTimeout(() => scrollToBottom(), 150);
  }, [activeSegmentMessageId, segmentedResponses, formatSegmentContent, scrollToBottom, trackEvent]);

  // Controle de navegação dos worked examples
  const handleNextWorkedExampleSegment = useCallback(() => {
    if (!workedExampleData || !workedExampleData.frontend_segments) return;

    if (currentSegmentIndex < workedExampleData.frontend_segments.length - 1) {
      setCurrentSegmentIndex(prev => prev + 1);

      // Se chegou no quiz, tocar som de conquista
      if (workedExampleData.frontend_segments[currentSegmentIndex + 1]?.type === 'quiz') {
        soundEffects.playAchievement();
      }
    }
  }, [workedExampleData, currentSegmentIndex]);

  const handlePrevWorkedExampleSegment = useCallback(() => {
    if (currentSegmentIndex > 0) {
      setCurrentSegmentIndex(prev => prev - 1);
    }
  }, [currentSegmentIndex]);

  const handleWorkedExampleComplete = useCallback(() => {
    setShowWorkedExamples(false);
    setWorkedExampleData(null);
    setCurrentSegmentIndex(0);

    // Celebrar conclusão
    triggerMajorCelebration();
    setAchievementMessage("🎉 Worked Example concluído! Você aprendeu muito!");
    setShowAchievement(true);
    setEmotionalState('celebrating');

    trackEvent('edu_worked_example_completed', {
      sessionId,
      segmentsCount: workedExampleData?.frontend_segments?.length || 0,
      methodology: workedExampleData?.methodology,
    });
  }, [workedExampleData, sessionId]);

  const handlePrevSegment = useCallback(() => {
    if (!activeSegmentMessageId) {
      return;
    }

    const entry = segmentedResponses[activeSegmentMessageId];
    if (!entry || entry.currentIndex === 0) {
      return;
    }

    const newIndex = entry.currentIndex - 1;
    const prevSegment = entry.segments[newIndex];
    if (!prevSegment) {
      return;
    }

    setSegmentedResponses(prev => ({
      ...prev,
      [activeSegmentMessageId]: {
        ...prev[activeSegmentMessageId],
        currentIndex: newIndex,
      },
    }));

    setMessages(prev =>
      prev.map(msg =>
        msg.id === activeSegmentMessageId
          ? {
              ...msg,
              content: formatSegmentContent(prevSegment),
              segments: entry.segments.slice(0, newIndex + 1),
            }
          : msg
      )
    );

    trackEvent('edu_chat_segment_navigated', {
      direction: 'backward',
      segmentType: prevSegment.type,
      index: newIndex + 1,
      total: entry.segments.length,
      messageId: activeSegmentMessageId,
    });

    setTimeout(() => scrollToBottom(), 150);
  }, [activeSegmentMessageId, segmentedResponses, formatSegmentContent, scrollToBottom, trackEvent]);

  const activeSegmentEntry = activeSegmentMessageId ? segmentedResponses[activeSegmentMessageId] : undefined;
  const totalSegmentCount = activeSegmentEntry?.segments.length ?? 0;
  const currentSegmentData = activeSegmentEntry ? activeSegmentEntry.segments[activeSegmentEntry.currentIndex] : undefined;
  const hasPrevSegmentAvailable = Boolean(activeSegmentEntry && activeSegmentEntry.currentIndex > 0);
  const hasNextSegmentAvailable = Boolean(activeSegmentEntry && activeSegmentEntry.currentIndex < totalSegmentCount - 1);
  const shouldShowSegmentNavigator = Boolean(activeSegmentEntry && totalSegmentCount > 1);

  // Return condicional APÓS todos os hooks serem declarados
  if (systemInitializing) {
    return (
      <div className="relative flex h-full w-full">
        <div className="flex-1 flex flex-col">
          <div className="px-4 py-3 border-b shrink-0 sticky top-0 z-40 edu-card backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
              <div className="edu-spacing-2">
                <h1 className="edu-heading-h2">CodeBot</h1>
                <p className="edu-text-muted">Inicializando sistema...</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center edu-px-4">
            <div className="w-full max-w-xl edu-spacing-8">
              <div className="flex flex-col items-center text-center gap-5">
                <div className="relative flex h-24 w-24 items-center justify-center">
                  <span className="absolute inset-0 rounded-full border border-dashed border-[hsl(var(--education-primary))]/40 animate-[spin_4s_linear_infinite]" />
                  <span className="absolute inset-3 rounded-full bg-[hsl(var(--education-primary))]/10 blur-md" />
                  <Loader2 className="relative z-10 h-10 w-10 text-[hsl(var(--education-primary))] animate-spin" strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                  <h2 className="edu-heading-h2">Conectando ao CoderBot</h2>
                  <p className="edu-text-body text-muted-foreground">
                    Estamos preparando o ambiente de estudo personalizado, sincronizando modelos, exemplos e ferramentas.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border/60 bg-background/70 px-6 py-6 shadow-lg backdrop-blur">
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex items-start gap-4">
                    <div className="relative flex h-12 w-12 items-center justify-center">
                      <span className="absolute inset-0 rounded-2xl bg-[hsl(var(--education-primary))]/15 blur-sm" />
                      <span className="absolute inset-0 rounded-2xl border border-dashed border-[hsl(var(--education-primary))]/40 animate-[spin_6s_linear_infinite]" />
                      <Sparkles className="relative z-10 h-6 w-6 text-[hsl(var(--education-primary))]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">Sincronizando com o CoderBot</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Validando sua sessão, carregando preferências e preparando materiais de apoio para começar o estudo.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                    {connectionSteps.map((step) => (
                      <div
                        key={step.key}
                        className={cn(
                          "edu-card rounded-2xl px-4 py-3 text-left transition-all duration-300 border border-border/60",
                          step.state === 'active'
                            ? "border-[hsl(var(--education-primary))]/60 bg-[hsl(var(--education-primary))]/5 shadow-lg"
                            : "bg-background/70"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-xl border",
                              step.state === 'active'
                                ? "border-dashed border-[hsl(var(--education-primary))]/60 bg-[hsl(var(--education-primary))]/10"
                                : "border-transparent bg-[hsl(var(--education-success))]/10"
                            )}
                          >
                            {step.state === 'active' ? (
                              <Loader2 className="h-4 w-4 text-[hsl(var(--education-primary))] animate-spin" strokeWidth={2.5} />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 text-[hsl(var(--education-success))]" strokeWidth={2.5} />
                            )}
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-foreground">{step.label}</p>
                            <p className="text-xs text-muted-foreground leading-snug">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      {showSidebar && (
        <div className={cn(
          "flex-shrink-0 h-full",
          isMobile ? "absolute left-0 top-0 z-50 w-80 edu-shadow-lg" : "w-80"
        )}>
          <SessionSidebar
            currentSessionId={sessionId}
            onSessionChange={handleSessionChange}
            onNewSession={handleNewSession}
          />
        </div>
      )}

      {/* Conteúdo principal - Layout de 2 colunas: Chat + Exemplos */}
      <div className="flex-1 flex min-w-0 h-full overflow-hidden">
        {/* Layout de 2 colunas: Chat | Exemplos */}
        <div className="flex flex-1 min-h-0">
          {/* Coluna 1: Chat/Mensagens */}
          <div className={cn(
            "flex flex-col min-w-0",
            isMobile || !showExamplesPanel ? "flex-1" : "flex-1 border-r lg:w-2/3"
          )}>
        {/* Header sempre visível */}
      <div className="px-4 py-3 border-b shrink-0 sticky top-0 z-40 edu-card backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 mr-2"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <MessageSquarePlus className="h-4 w-4" />
              </Button>
            )}
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                emotionalState === 'celebrating' ? "bg-gradient-to-br from-yellow-400 to-orange-400 animate-bounce" :
                emotionalState === 'encouraging' ? "bg-gradient-to-br from-green-400 to-blue-400 animate-pulse" :
                emotionalState === 'supportive' ? "bg-gradient-to-br from-purple-400 to-pink-400" :
                "bg-gradient-to-br from-[hsl(var(--education-primary))] to-[hsl(var(--education-secondary))]"
              )}>
                <Brain className={cn(
                  "w-6 h-6 text-white transition-transform duration-300",
                  isLoading ? "animate-bounce" : ""
                )} />
              </div>
              <div className="edu-spacing-2">
                <h1 className="edu-heading-h2">
                  {emotionalState === 'celebrating' ? "Parabéns! 🎉" :
                   emotionalState === 'encouraging' ? "Você está indo bem! ✨" :
                   "Assistente de Aprendizado"}
                </h1>
                <p className="edu-text-body">
                  {isLoading ? "Pensando em como ajudar você... 🤔" :
                   celebrationCount > 10 ? "Que aprendiz dedicado! Continue assim! 🌟" :
                   celebrationCount > 5 ? "Ótimas perguntas! Vamos continuar! 💪" :
                   "Sistema educacional adaptativo ativo ✨"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0 relative">
            <Select value={aiModel} onValueChange={handleModelChange}>
              <SelectTrigger
                className="min-w-[180px] max-w-[240px] h-8 text-xs justify-between overflow-hidden whitespace-nowrap"
                title={findModelOption(aiModel)?.name ?? aiModel}
              >
                <SelectValue className="truncate" placeholder="Modelo" />
              </SelectTrigger>
              <SelectContent>
                <ModelSelectItems />
              </SelectContent>
            </Select>

            {/* Seletor de metodologia educacional AGNO */}
            <Select value={agnoMethodology} onValueChange={(value) => setAgnoMethodology(value as MethodologyType)}>
              <SelectTrigger className="min-w-[160px] max-w-[220px] h-8 text-xs justify-between overflow-hidden whitespace-nowrap" title={METHODOLOGY_CONFIG[agnoMethodology]?.name ?? agnoMethodology}>
                <SelectValue className="truncate" placeholder="Metodologia" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(MethodologyType).map((methodology) => {
                  const config = METHODOLOGY_CONFIG[methodology];
                  return (
                    <SelectItem key={methodology} value={methodology}>
                      <div className="flex items-center gap-2">
                        <span>{config.icon}</span>
                        <span>{config.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {/* Dropdown de analogias */}
            <div className="relative">


              {/* Dropdown/colapsável */}
              {showAnalogyDropdown && (
                <div className="absolute right-0 mt-2 w-72 edu-card shadow-lg z-20 p-4 animate-scale-in">
                  <label htmlFor="knowledge-base" className="block edu-text-heading text-sm mb-2">O que você já sabe ou quer usar como analogia?</label>
                  <textarea
                    id="knowledge-base"
                    value={knowledgeBase}
                    onChange={e => setKnowledgeBase(e.target.value)}
                    rows={3}
                    placeholder="Ex: Já sei variáveis, quero analogias com futebol..."
                    className="w-full edu-card border-2 border-[hsl(var(--border))] text-[hsl(var(--education-text-primary))] px-3 py-2 text-sm edu-focus resize-none"
                    style={{ minHeight: 36, maxHeight: 100 }}
                    autoFocus
                  />
                  <Button
                    variant="edu-ghost"
                    size="edu-sm"
                    className="text-xs mt-3 p-0 h-auto font-medium justify-start"
                    onClick={() => {
                      setAnalogiesEnabled(false);    // Turn OFF analogies feature
                      setShowAnalogyDropdown(false); // And hide the dropdown
                      // setKnowledgeBase(""); // Optionally clear the knowledge base
                    }}
                  >
                    Desativar Analogias
                  </Button>
                </div>
              )}
            </div>
            {/* Diagram UI removed */}
         
          
          </div>
        </div>
      </div>
      {/* Área de mensagens com scroll */}
      <div
        ref={scrollContainerRef}
        className="flex-1 edu-scroll px-4 bg-gradient-to-b from-[hsl(var(--education-primary-light))/20] to-transparent dark:from-[hsl(var(--education-primary-light))/5]"
        style={{
          height: 0,
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch'
        }}
        tabIndex={0}
      >
        {/* Indicadores visuais do sistema */}
        {/* <SystemStatusIndicators
          systemStatus={systemStatus}
          connectionStatus={connectionStatus}
          sessionId={sessionId}
          whiteboardContext={whiteboardContext}
          messagesCount={messages.length}
          aiModel={aiModel}
          agnoMethodology={agnoMethodology}
          analogiesEnabled={analogiesEnabled}
          showSystemDetails={showSystemDetails}
          setShowSystemDetails={setShowSystemDetails}
        /> */}

        <div className="flex flex-col edu-spacing-6 max-w-3xl mx-auto edu-py-6">
          {/* Header com progresso e streak - inspirado no Duolingo */}
         

          {/* Reação do CodeBot */}
          {showCodeBotReaction && (
            <CodeBotReaction type={showCodeBotReaction as any} />
          )}

          {/* Sistema Funcionando - Indicador quando não há mensagens ainda */}
          {!showWelcomeMessages && messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-blue-500 mb-4">
                  <Sparkles className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  🎉 Sistema Funcionando!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                  O CodeBot está pronto para te ajudar com programação. Digite sua pergunta abaixo!
                </p>
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Sistema ativo e conectado
                </div>
              </div>
            </div>
          )}

          {/* Initial Welcome Messages with Animations */}
          {showWelcomeMessages && (
            <div className="space-y-4">
              <InitialWelcomeMessages
                onComplete={handleWelcomeComplete}
                onSkip={handleWelcomeSkip}
              />
            </div>
          )}

          {/* Regular Chat Messages (wrap com id p/ scroll) */}
          {!showWelcomeMessages && messages.map((message) => (
            <div key={message.id} id={`msg-${message.id}`}>
              <ChatMessage
                content={message.content}
                isAi={message.isAi}
                timestamp={message.timestamp}
                onQuizAnswer={handleQuizAnswer}
                segments={message.segments}
              />
            </div>
          ))}
          
          {/* Worked Examples Slides - Aparecer quando ativado */}
          {showWorkedExamples && workedExampleData && (
            <WorkedExamplesSlides
              workedExampleData={workedExampleData}
              currentSegmentIndex={currentSegmentIndex}
              onNext={handleNextWorkedExampleSegment}
              onPrev={handlePrevWorkedExampleSegment}
              onComplete={handleWorkedExampleComplete}
              onQuizAnswer={handleQuizAnswer}
            />
          )}

          {/* IdleState - Aparecer quando usuário estiver idle (mas não em nível 'none') */}
          {isUserIdle && !isLoading && idleLevel !== 'none' && !showWelcomeMessages && !showWorkedExamples && (
            <IdleState
              onSuggestedQuestion={handleSendMessage}
              idleLevel={idleLevel}
            />
          )}
          
         
          <div ref={messagesEndRef} />
        </div>
      </div>

          {/* Input fixo no rodapé da coluna de chat */}
          <div className={cn(
            "border-t p-4 edu-card backdrop-blur shrink-0 bg-background/70 supports-[backdrop-filter]:bg-background/60",
            isMobile ? "pb-6" : ""
          )}>
            {/* Barra de avanço de etapas (worked examples ou segmentos tradicionais) */}
            {(showWorkedExamples || shouldShowSegmentNavigator) && !isLoading && !showWelcomeMessages && (
              <div className="mb-4 edu-card flex items-center justify-between px-4 py-3">
                {showWorkedExamples && workedExampleData ? (
                  // Barra específica para worked examples
                  <>
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium">
                        📚 Worked Example: {workedExampleData.topic}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {currentSegmentIndex + 1} de {workedExampleData.frontend_segments.length}
                      </div>
                      <div className="flex items-center gap-1">
                        {workedExampleData.scientific_basis.map((basis, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {basis.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={handlePrevWorkedExampleSegment} disabled={currentSegmentIndex === 0}>
                        Voltar
                      </Button>
                      {currentSegmentIndex < workedExampleData.frontend_segments.length - 1 ? (
                        <Button size="sm" variant="default" onClick={handleNextWorkedExampleSegment}>
                          Próxima etapa
                        </Button>
                      ) : (
                        <Button size="sm" variant="default" onClick={handleWorkedExampleComplete} className="bg-green-600 hover:bg-green-700">
                          Concluir exemplo
                        </Button>
                      )}
                    </div>
                  </>
                ) : activeSegmentEntry ? (
                  <>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-sm font-medium">
                          Etapa {activeSegmentEntry.currentIndex + 1} de {totalSegmentCount}
                        </div>
                        {currentSegmentData && (
                          <div className="text-xs text-muted-foreground">
                            {getSegmentBadge(currentSegmentData.type)}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          {hasNextSegmentAvailable ? `Próxima: ${getNextStepButtonLabel()}` : 'Você revisou todas as etapas desta resposta.'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={handlePrevSegment} disabled={!hasPrevSegmentAvailable}>
                        Voltar
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={handleNextSegment}
                        disabled={!hasNextSegmentAvailable}
                      >
                        {hasNextSegmentAvailable ? getNextStepButtonLabel() : 'Etapas concluídas'}
                      </Button>
                    </div>
                  </>
                ) : null}
              </div>
            )}

            {/* Seletor de Missões ou Input de Chat */}
            <div className="edu-card edu-p-3">
              {!hasMissionSelected && missions.length > 0 ? (
                // Modo seleção de missão - bloqueia o input até selecionar
                <div className="space-y-4">
                  <MissionSelectorExpanded
                    missions={missions}
                    selectedMission={selectedMission}
                    onSelectMission={handleMissionSelect}
                    isLoading={isLoadingMissions}
                  />
                </div>
              ) : (
                // Modo chat normal - input desbloqueado
                <div className="space-y-3">
                  {/* Badge da missão ativa */}
                  {selectedMission && (
                    <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                          <Target className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-purple-900 dark:text-purple-100">
                            {selectedMission.title}
                          </div>
                          <div className="text-xs text-purple-600 dark:text-purple-400">
                            Missão ativa
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          clearSelectedMission();
                          setHasMissionSelected(false);
                          setMessages([]);
                          setHasUserSentMessage(false);
                          setExamples([]);
                          toast.info('Missão desmarcada. Selecione uma nova missão para continuar.');
                        }}
                        className="h-7 px-2 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-200/50"
                      >
                        Trocar Missão
                      </Button>
                    </div>
                  )}
                  
                  <ChatInput
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    analogiesEnabled={analogiesEnabled}
                    hasMissionSelected={hasMissionSelected}
                    selectedMission={selectedMission}
                    missions={missions}
                    onMissionSelect={handleMissionSelect}
                    isLoadingMissions={isLoadingMissions}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Coluna 2: Painel de Exemplos */}
        {showExamplesPanel && !isMobile && (
          <div className="w-full lg:w-1/3 xl:w-96 flex flex-col min-w-0 max-w-sm">
            {/* Header dos Exemplos */}
            <div className="px-4 py-2 border-b bg-muted/30 flex items-center justify-between">
              <h3 className="font-medium text-sm">📚 Exemplos de Código</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExamplesPanel}
                className="h-6 px-2"
              >
                ✕
              </Button>
            </div>
            
            {/* Painel de Exemplos */}
            <div className="flex-1 min-h-0">
              <ExamplesPanel theme="dark" hasUserInteracted={hasUserSentMessage} />
            </div>
          </div>
        )}
      </div>

      {/* Botão para mostrar/ocultar painel de exemplos em mobile ou quando oculto */}
      {(isMobile || !showExamplesPanel) && (
        <div className="border-t p-2 bg-muted/30 flex gap-2 justify-center">
          {!showExamplesPanel && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleExamplesPanel}
              className="h-8"
            >
              📚 Mostrar Exemplos
            </Button>
          )}
        </div>
      )}
    </div>

      {/* Confetti celebration - inspirado no Duolingo */}
      {/* {showConfetti && (
        <ConfettiExplosion onComplete={() => setShowConfetti(false)} />
      )} */}
      
      {/* Feedback de conquista */}
      {/* {showAchievement && (
        <AchievementFeedback 
          message={achievementMessage}
          onClose={() => setShowAchievement(false)} 
        />
      )} */}
    </div>
  );
};

// Export chat context functions for use in other components
export const useChatContext = () => {
  // Esta função será usada para acessar métodos do componente ChatInterface
  // Os hooks foram removidos para evitar problemas de múltiplas versões do React
  const saveContext = (classId?: string, subject?: string) => {
    // Esta função será implementada quando o componente for usado
    console.warn('useChatContext: Esta função precisa ser implementada no contexto do componente');
  };

  return { saveContext };
};
