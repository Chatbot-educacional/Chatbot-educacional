import { toast } from "@/components/ui/sonner";
import api from "@/lib/axios";

// Tipos para as metodologias educacionais
export enum MethodologyType {
  SEQUENTIAL_THINKING = "sequential_thinking",
  ANALOGY = "analogy",
  SOCRATIC = "socratic",
  SCAFFOLDING = "scaffolding", 
  WORKED_EXAMPLES = "worked_examples",
  DEFAULT = "default"
}

// Interface para o contexto do usuário
export interface UserContext {
  userId: string;
  currentTopic?: string;
  difficultyLevel?: string;
  learningProgress?: any;
  previousInteractions?: string[];
  preferredLanguage?: string | null; // Linguagem de programação preferida
}

// Interface para a requisição ao AGNO
export type ProviderKey = 'claude' | 'openai' | 'ollama';

export interface ProviderModelConfig {
  id: string;
  name: string;
  default?: boolean;
}

export interface ProviderConfig {
  name: string;
  models: ProviderModelConfig[];
  color: string;
  icon: string;
}

export interface AgnoRequest {
  methodology: MethodologyType;
  userQuery: string;
  context?: string;
  userContext?: UserContext;
  provider?: ProviderKey;
  modelId?: string;
  includeFinalCode?: boolean;
  includeDiagram?: boolean;
  diagramType?: 'mermaid' | 'excalidraw';
  maxFinalCodeLines?: number;
}

// Interface para a resposta do AGNO
export interface StructuredQuizOption {
  id: string;
  text: string;
  correct: boolean;
  reason?: string | null;
}

export interface StructuredQuiz {
  id: string;
  question: string;
  options: StructuredQuizOption[];
  explanation?: string | null;
}

export interface StructuredExampleBlock {
  title: string;
  markdown: string;
}

export interface StructuredFinalCode {
  language: string;
  code: string;
  truncated?: boolean;
  line_count?: number;
}

export interface StructuredResponse {
  version?: string;
  methodology: string;
  user_question: string;
  intro?: string | null;
  reflection?: string | null;
  steps_markdown?: string | null;
  steps_list: string[];
  correct_example?: StructuredExampleBlock | null;
  incorrect_example?: StructuredExampleBlock | null;
  quizzes: StructuredQuiz[];
  final_code?: StructuredFinalCode | null;
  checklist_questions?: string[];
}

export interface AgnoResponse {
  response: string;
  methodology: MethodologyType;
  isXmlFormatted: boolean;
  metadata?: {
    processingTime?: number;
    confidence?: number;
    suggestedNextSteps?: string[];
  };
  extras?: {
    final_code?: {
      language: string;
      code: string;
      truncated?: boolean;
      line_count?: number;
    };
    diagram?: {
      type: 'mermaid' | 'excalidraw' | string;
      content: string;
    };
  };
  // Novo: segmentos estruturados para exibição passo a passo no frontend
  segments?: ResponseSegment[];
  structuredResponse?: StructuredResponse;
}

// Interface para respostas XML estruturadas (worked examples)
export interface WorkedExampleResponse {
  problem_analysis: string;
  step_by_step_example: string;
  explanation: string;
  patterns: string;
  similar_example?: string;
  next_steps: string;
}

// Interface para o novo template estruturado
export interface StructuredWorkedExampleResponse {
  generalData: {
    courseInfo: {
      disciplineTitle: string;
      topic: string;
      subtopics: string[];
      prerequisites: string[];
    };
    sourceInfo: {
      originType: string;
      originReference: string;
    };
  };
  exampleContext: {
    problemDescription: string;
    expectedOutcome: string;
    supplementaryMaterial?: {
      type: string;
      url: string;
      description: string;
    }[];
  };
  workedExamples: {
    correctExample: {
      reflection: {
        difficulty: string;
        content: string;
      };
      correctSteps: {
        number: string;
        description: string;
      }[];
      tests: {
        id: string;
        input: string;
        expectedOutput: string;
      }[];
    };
    erroneousExample?: {
      reflection: {
        difficulty: string;
        content: string;
      };
      erroneousSteps: {
        number: string;
        description: string;
      }[];
      errorIdentification: {
        prompt: string;
        errorLine: string;
        errorExplanation: string;
        proposedFix: string;
      };
      tests: {
        id: string;
        input: string;
        expectedOutput: string;
      }[];
    };
  };
  pedagogicalMeta: {
    methodology: string;
    learningTheory: string;
    agent: string;
  };
}

// Segmentos estruturados retornados pelo backend para navegação por etapas
export interface ResponseSegment {
  id: string;
  title: string;
  type: 'intro' | 'steps' | 'correct_example' | 'incorrect_example' | 'reflection' | 'final_code' | string;
  content: string;
  language?: string;
  // Campos adicionais para exemplos interativos
  code?: string;
  explanation?: string;
  error_explanation?: string;
  correction?: string;
}

// Configurações dos provedores
export const PROVIDER_CONFIG: Record<ProviderKey, ProviderConfig> = {
  claude: {
    name: "Claude (Anthropic)",
    models: [
      { id: "claude-sonnet-4-20250514", name: "Claude 4 Sonnet", default: true },
      { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet" },
      { id: "claude-3-opus-20240229", name: "Claude 3 Opus" },
      { id: "claude-3-haiku-20240307", name: "Claude 3 Haiku" }
    ],
    color: "orange",
    icon: "🤖"
  },
  openai: {
    name: "OpenAI (ChatGPT)",
    models: [
      { id: "gpt-4o", name: "GPT-4o", default: true },
      { id: "gpt-4", name: "GPT-4" },
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
      { id: "gpt-4o-mini", name: "GPT-4o mini" },
      { id: "o3-mini", name: "o3-mini" }
    ],
    color: "green",
    icon: "🧠"
  },
  ollama: {
    name: "Ollama (Local)",
    models: [
      { id: "qwen2.5-coder:1.5b", name: "Qwen 2.5 Coder 1.5B", default: true },
      { id: "llama3.1", name: "Llama 3.1" },
      { id: "llama3", name: "Llama 3" },
      { id: "mistral", name: "Mistral" }
    ],
    color: "teal",
    icon: "🦙"
  }
};

export interface ProviderModelOption {
  id: string;
  name: string;
  provider: ProviderKey;
  default?: boolean;
}

const PROVIDER_ENTRIES = Object.entries(PROVIDER_CONFIG) as [ProviderKey, ProviderConfig][];

export const AI_MODEL_OPTIONS: ProviderModelOption[] = PROVIDER_ENTRIES.flatMap(([provider, config]) =>
  config.models.map((model) => ({
    id: model.id,
    name: model.name,
    provider,
    default: model.default,
  }))
);

export const getDefaultModelForProvider = (provider: ProviderKey): string => {
  const providerConfig = PROVIDER_CONFIG[provider];
  const preferred = providerConfig.models.find((model) => model.default);
  return preferred?.id || providerConfig.models[0]?.id || '';
};

// Configurações das metodologias
export const METHODOLOGY_CONFIG = {
  [MethodologyType.SEQUENTIAL_THINKING]: {
    name: "Pensamento Sequencial",
    description: "Explica o raciocínio passo a passo de forma sequencial",
    icon: "📝",
    color: "blue"
  },
  [MethodologyType.ANALOGY]: {
    name: "Analogias",
    description: "Usa analogias do cotidiano para facilitar o entendimento",
    icon: "🔗",
    color: "green"
  },
  [MethodologyType.SOCRATIC]: {
    name: "Método Socrático",
    description: "Estimula o pensamento crítico através de perguntas",
    icon: "❓",
    color: "purple"
  },
  [MethodologyType.SCAFFOLDING]: {
    name: "Scaffolding",
    description: "Oferece dicas graduais removendo o suporte progressivamente",
    icon: "🏗️",
    color: "orange"
  },
  [MethodologyType.WORKED_EXAMPLES]: {
    name: "Exemplos Resolvidos",
    description: "Ensina através de exemplos detalhadamente resolvidos",
    icon: "📚",
    color: "indigo"
  },
  [MethodologyType.DEFAULT]: {
    name: "Padrão",
    description: "Resposta educacional padrão, clara e objetiva",
    icon: "💬",
    color: "gray"
  }
};

// ====== MÉTRICAS (PostHog) - Helper seguro ======
const phCapture = (event: string, properties?: Record<string, any>) => {
  try {
    (window as any)?.posthog?.capture?.(event, properties || {});
  } catch (_) {
    // silenciosamente ignora se PostHog não estiver disponível
  }
};

class AgnoService {

  /**
   * Faz uma requisição ao serviço AGNO
   */
  async askQuestion(request: AgnoRequest): Promise<AgnoResponse> {
    // ===== métricas: início da requisição =====
    const startedAt = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    const provider = request.provider || 'claude';
    const modelId = request.modelId || undefined;
    const userContext = request.userContext;

    phCapture('agno_request_started', {
      methodology: request.methodology,
      provider,
      model_id: modelId,
      has_context: Boolean(request.context),
      has_user_context: Boolean(userContext),
      user_id_present: Boolean(userContext?.userId),
      previous_interactions_count: Array.isArray(userContext?.previousInteractions) ? userContext!.previousInteractions!.length : 0,
      query_length: (request.userQuery || '').length,
    });

    try {
      // Construir URL com query parameters para provedor
      let url = '/agno/ask';
      const params = new URLSearchParams();
      
      // Sempre enviar um provider, com claude como padrão
      const providerResolved = request.provider || 'claude';
      params.append('provider', providerResolved);
      
      if (request.modelId) {
        params.append('model_id', request.modelId);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      // Converter userContext de camelCase para snake_case
      const userContextConverted = request.userContext ? {
        user_id: request.userContext.userId,
        current_topic: request.userContext.currentTopic || null,
        difficulty_level: request.userContext.difficultyLevel || null,
        learning_progress: request.userContext.learningProgress || null,
        previous_interactions: request.userContext.previousInteractions || null,
        preferred_language: request.userContext.preferredLanguage || null
      } : null;

      const requestBody = {
        methodology: request.methodology,
        user_query: request.userQuery,
        context: request.context,
        user_context: userContextConverted,
        include_final_code: request.includeFinalCode ?? true,
        include_diagram: false,
        diagram_type: null,
        max_final_code_lines: request.maxFinalCodeLines ?? 150
      };

      console.log("AGNO Request URL:", url);
      console.log("AGNO Request Provider:", providerResolved);
      console.log("AGNO Request Body:", requestBody);

      const response = await api.post(url, requestBody);

      const durationMs = Math.round(((typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now()) - startedAt);
      phCapture('agno_request_completed', {
        methodology: request.methodology,
        provider: providerResolved,
        model_id: request.modelId || null,
        duration_ms: durationMs,
        is_xml_formatted: Boolean(response.data?.is_xml_formatted || request.methodology === MethodologyType.WORKED_EXAMPLES),
        has_metadata: Boolean(response.data?.metadata),
        response_size: typeof response.data?.response === 'string' ? response.data.response.length : null,
        success: true,
      });

      const structuredResponseRaw = response.data.structured_response as Partial<StructuredResponse> | undefined;
      const structuredResponse: StructuredResponse | undefined = structuredResponseRaw
        ? {
            version: structuredResponseRaw.version ?? "2.0",
            methodology: structuredResponseRaw.methodology ?? request.methodology,
            user_question: structuredResponseRaw.user_question ?? request.userQuery,
            intro: structuredResponseRaw.intro ?? null,
            reflection: structuredResponseRaw.reflection ?? null,
            steps_markdown: structuredResponseRaw.steps_markdown ?? null,
            steps_list: structuredResponseRaw.steps_list ?? [],
            correct_example: structuredResponseRaw.correct_example ?? null,
            incorrect_example: structuredResponseRaw.incorrect_example ?? null,
            quizzes: structuredResponseRaw.quizzes ?? [],
            final_code: structuredResponseRaw.final_code ?? null,
            checklist_questions: structuredResponseRaw.checklist_questions ?? [],
          }
        : undefined;

      return {
        response: response.data.response,
        methodology: request.methodology,
        isXmlFormatted: response.data.is_xml_formatted || request.methodology === MethodologyType.WORKED_EXAMPLES,
        metadata: response.data.metadata,
        extras: response.data.extras,
        segments: response.data.segments as ResponseSegment[] | undefined,
        structuredResponse,
      };
    } catch (error: any) {
      const durationMs = Math.round(((typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now()) - startedAt);
      phCapture('agno_request_error', {
        methodology: request.methodology,
        provider: request.provider || 'claude',
        model_id: request.modelId || null,
        duration_ms: durationMs,
        error_name: error?.name || 'Error',
        error_message: error?.message || String(error),
        success: false,
      });

      console.error("Erro ao fazer requisição ao AGNO:", error);
      toast.error("Erro ao processar sua pergunta. Tente novamente.");
      throw error;
    }
  }

  /**
   * Busca as metodologias disponíveis
   */
  async getAvailableMethodologies(): Promise<MethodologyType[]> {
    try {
      phCapture('agno_get_methodologies_started');
      const response = await api.get('/agno/methodologies');
      const list = response.data.methodologies || Object.values(MethodologyType);
      phCapture('agno_get_methodologies_completed', {
        count: Array.isArray(list) ? list.length : 0,
        success: true,
      });
      return list;
    } catch (error) {
      phCapture('agno_get_methodologies_error', { success: false });
      console.error("Erro ao buscar metodologias:", error);
      return Object.values(MethodologyType);
    }
  }

  /**
   * Processa uma resposta de worked example em XML (template simples)
   */
  parseWorkedExampleResponse(xmlResponse: string): WorkedExampleResponse | null {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
      
      if (xmlDoc.querySelector("parsererror")) {
        console.error("Erro ao parsear XML:", xmlResponse);
        return null;
      }

      const workedExample = xmlDoc.querySelector("worked_example");
      if (!workedExample) {
        console.error("Tag worked_example não encontrada no XML");
        return null;
      }

      return {
        problem_analysis: this.getTextContent(workedExample, "problem_analysis"),
        step_by_step_example: this.getTextContent(workedExample, "step_by_step_example"), 
        explanation: this.getTextContent(workedExample, "explanation"),
        patterns: this.getTextContent(workedExample, "patterns"),
        similar_example: this.getTextContent(workedExample, "similar_example"),
        next_steps: this.getTextContent(workedExample, "next_steps")
      };
    } catch (error) {
      console.error("Erro ao processar resposta XML:", error);
      return null;
    }
  }

  /**
   * Processa uma resposta de worked example em XML (template estruturado)
   */
  parseStructuredWorkedExampleResponse(xmlResponse: string): StructuredWorkedExampleResponse | null {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
      
      if (xmlDoc.querySelector("parsererror")) {
        console.error("Erro ao parsear XML estruturado:", xmlResponse);
        return null;
      }

      const template = xmlDoc.querySelector("WorkedExampleTemplate");
      if (!template) {
        console.error("Tag WorkedExampleTemplate não encontrada no XML");
        return null;
      }

      // Parse GeneralData
      const generalData = template.querySelector("GeneralData");
      const courseInfo = generalData?.querySelector("CourseInfo");
      const sourceInfo = generalData?.querySelector("SourceInfo");

      // Parse ExampleContext
      const exampleContext = template.querySelector("ExampleContext");
      const supplementaryMaterial = Array.from(exampleContext?.querySelectorAll("Resource") || [])
        .map(resource => ({
          type: resource.getAttribute("type") || "",
          url: resource.getAttribute("url") || "",
          description: resource.textContent?.trim() || ""
        }));

      // Parse WorkedExamples
      const workedExamples = template.querySelector("WorkedExamples");
      const correctExample = workedExamples?.querySelector("CorrectExample");
      const erroneousExample = workedExamples?.querySelector("ErroneousExample");

      // Parse PedagogicalMeta
      const pedagogicalMeta = template.querySelector("PedagogicalMeta");

      return {
        generalData: {
          courseInfo: {
            disciplineTitle: this.getTextContent(courseInfo, "DisciplineTitle"),
            topic: this.getTextContent(courseInfo, "Topic"),
            subtopics: Array.from(courseInfo?.querySelectorAll("Subtopic") || [])
              .map(subtopic => subtopic.textContent?.trim() || ""),
            prerequisites: Array.from(courseInfo?.querySelectorAll("Prerequisite") || [])
              .map(prerequisite => prerequisite.textContent?.trim() || "")
          },
          sourceInfo: {
            originType: this.getTextContent(sourceInfo, "OriginType"),
            originReference: this.getTextContent(sourceInfo, "OriginReference")
          }
        },
        exampleContext: {
          problemDescription: this.getTextContent(exampleContext, "ProblemDescription"),
          expectedOutcome: this.getTextContent(exampleContext, "ExpectedOutcome"),
          supplementaryMaterial: supplementaryMaterial.length > 0 ? supplementaryMaterial : undefined
        },
        workedExamples: {
          correctExample: {
            reflection: {
              difficulty: correctExample?.querySelector("Reflection")?.getAttribute("difficulty") || "",
              content: correctExample?.querySelector("Reflection")?.textContent?.trim() || ""
            },
            correctSteps: Array.from(correctExample?.querySelectorAll("Step") || [])
              .map(step => ({
                number: step.getAttribute("number") || "",
                description: this.getTextContent(step, "Description")
              })),
            tests: Array.from(correctExample?.querySelectorAll("TestCase") || [])
              .map(testCase => ({
                id: testCase.getAttribute("id") || "",
                input: this.getTextContent(testCase, "Input"),
                expectedOutput: this.getTextContent(testCase, "ExpectedOutput")
              }))
          },
          erroneousExample: erroneousExample ? {
            reflection: {
              difficulty: erroneousExample.querySelector("Reflection")?.getAttribute("difficulty") || "",
              content: erroneousExample.querySelector("Reflection")?.textContent?.trim() || ""
            },
            erroneousSteps: Array.from(erroneousExample.querySelectorAll("Step") || [])
              .map(step => ({
                number: step.getAttribute("number") || "",
                description: this.getTextContent(step, "Description")
              })),
            errorIdentification: {
              prompt: erroneousExample.querySelector("ErrorIdentification")?.getAttribute("prompt") || "",
              errorLine: this.getTextContent(erroneousExample.querySelector("ErrorIdentification"), "ErrorLine"),
              errorExplanation: this.getTextContent(erroneousExample.querySelector("ErrorIdentification"), "ErrorExplanation"),
              proposedFix: this.getTextContent(erroneousExample.querySelector("ErrorIdentification"), "ProposedFix")
            },
            tests: Array.from(erroneousExample.querySelectorAll("TestCase") || [])
              .map(testCase => ({
                id: testCase.getAttribute("id") || "",
                input: this.getTextContent(testCase, "Input"),
                expectedOutput: this.getTextContent(testCase, "ExpectedOutput")
              }))
          } : undefined
        },
        pedagogicalMeta: {
          methodology: this.getTextContent(pedagogicalMeta, "Methodology"),
          learningTheory: this.getTextContent(pedagogicalMeta, "LearningTheory"),
          agent: this.getTextContent(pedagogicalMeta, "Agent")
        }
      };
    } catch (error) {
      console.error("Erro ao processar resposta XML estruturada:", error);
      return null;
    }
  }

  /**
   * Extrai o conteúdo de texto de uma tag XML
   */
  private getTextContent(parent: Element, tagName: string): string {
    const element = parent.querySelector(tagName);
    return element?.textContent?.trim() || "";
  }

  /**
   * Método de conveniência para worked examples
   */
  async getWorkedExample(
    userQuery: string, 
    context?: string, 
    userContext?: UserContext
  ): Promise<WorkedExampleResponse | null> {
    const response = await this.askQuestion({
      methodology: MethodologyType.WORKED_EXAMPLES,
      userQuery,
      context,
      userContext
    });

    if (response.isXmlFormatted) {
      return this.parseWorkedExampleResponse(response.response);
    }

    return null;
  }

  /**
   * Método de conveniência para worked examples estruturados
   */
  async getStructuredWorkedExample(
    userQuery: string, 
    context?: string, 
    userContext?: UserContext
  ): Promise<StructuredWorkedExampleResponse | null> {
    const response = await this.askQuestion({
      methodology: MethodologyType.WORKED_EXAMPLES,
      userQuery,
      context,
      userContext
    });

    if (response.isXmlFormatted) {
      return this.parseStructuredWorkedExampleResponse(response.response);
    }

    return null;
  }

  /**
   * Método inteligente que tenta parsear qualquer formato de worked example
   */
  async getWorkedExampleAny(
    userQuery: string, 
    context?: string, 
    userContext?: UserContext
  ): Promise<{ structured?: StructuredWorkedExampleResponse; simple?: WorkedExampleResponse } | null> {
    const response = await this.askQuestion({
      methodology: MethodologyType.WORKED_EXAMPLES,
      userQuery,
      context,
      userContext
    });

    if (response.isXmlFormatted) {
      // Tenta primeiro o template estruturado
      const structured = this.parseStructuredWorkedExampleResponse(response.response);
      if (structured) {
        return { structured };
      }

      // Se falhar, tenta o template simples
      const simple = this.parseWorkedExampleResponse(response.response);
      if (simple) {
        return { simple };
      }
    }

    return null;
  }

  /**
   * Método de conveniência para outras metodologias
   */
  async getMethodologyResponse(
    methodology: MethodologyType,
    userQuery: string,
    context?: string,
    userContext?: UserContext,
    provider?: ProviderKey,
    modelId?: string
  ): Promise<string> {
    const response = await this.askQuestion({
      methodology,
      userQuery,
      context,
      userContext,
      provider,
      modelId
    });

    return response.response;
  }

  /**
   * Método de conveniência para usar Claude
   */
  async askQuestionWithClaude(
    methodology: MethodologyType,
    userQuery: string,
    context?: string,
    userContext?: UserContext,
    modelId: string = getDefaultModelForProvider('claude') || 'claude-sonnet-4-20250514'
  ): Promise<AgnoResponse> {
    return this.askQuestion({
      methodology,
      userQuery,
      context,
      userContext,
      provider: 'claude',
      modelId
    });
  }

  /**
   * Método de conveniência para usar OpenAI
   */
  async askQuestionWithOpenAI(
    methodology: MethodologyType,
    userQuery: string,
    context?: string,
    userContext?: UserContext,
    modelId: string = getDefaultModelForProvider('openai') || 'gpt-3.5-turbo'
  ): Promise<AgnoResponse> {
    return this.askQuestion({
      methodology,
      userQuery,
      context,
      userContext,
      provider: 'openai',
      modelId
    });
  }

  /**
   * Método de conveniência para usar modelos locais via Ollama
   */
  async askQuestionWithOllama(
    methodology: MethodologyType,
    userQuery: string,
    context?: string,
    userContext?: UserContext,
    modelId: string = getDefaultModelForProvider('ollama') || 'llama3.1'
  ): Promise<AgnoResponse> {
    return this.askQuestion({
      methodology,
      userQuery,
      context,
      userContext,
      provider: 'ollama',
      modelId
    });
  }

  /**
   * Testa a conectividade com a API AGNO
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await api.get('/health');
      console.log("AGNO Health Check:", response.data);
      return response.data.status === 'healthy';
    } catch (error) {
      console.error("Erro ao testar conexão com AGNO:", error);
      return false;
    }
  }

  /**
   * Valida se uma metodologia é válida
   */
  isValidMethodology(methodology: string): methodology is MethodologyType {
    return Object.values(MethodologyType).includes(methodology as MethodologyType);
  }

  /**
   * Obtém a configuração de uma metodologia
   */
  getMethodologyConfig(methodology: MethodologyType) {
    return METHODOLOGY_CONFIG[methodology] || METHODOLOGY_CONFIG[MethodologyType.DEFAULT];
  }
}

// Instância singleton do serviço
export const agnoService = new AgnoService();
export default agnoService;
