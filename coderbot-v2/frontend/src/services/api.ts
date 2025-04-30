
import { toast } from "@/components/ui/sonner";

export type Message = {
  id: string;
  content: string;
  isAi: boolean;
  timestamp: Date;
};

export type ApiResponse = {
  content: string;
  analogies?: string;
};

// Constante para URL base da API
const BASE_URL = "http://localhost:8000/deepseek/chat/completions";

// Interface para representar a mensagem de chat no formato da API DeepSeek
interface ChatMessageInput {
  role: string;
  content: string;
  knowledge_level?: string;
  subject_focus?: string;
  context?: string;
}

export const fetchChatResponse = async (
  message: string,
  useAnalogies: boolean = false,
  useSequential: boolean = false,
  knowledge: string = ""
): Promise<ApiResponse> => {
  try {
    // Preparar mensagem no formato esperado pela API
    const messages: ChatMessageInput[] = [
      { 
        role: "user", 
        content: message,
        knowledge_level: knowledge || "beginner",
        context: "teaching"
      }
    ];

    // Parâmetros de URL para controle de analogias
    const url = `${BASE_URL}?use_analogies=${useAnalogies}`;
    
    // Enviar requisição para a API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 350,
        temperature: 0.7,
        difficulty_level: "medium",
        subject_area: "programming",
        style_preference: useAnalogies ? "analogies" : "concise",
        learning_progress: { questions_answered: 0, correct_answers: 0 },
        baseKnowledge: knowledge || "basic"
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro na resposta: ${response.status} - ${errorText}`);
      throw new Error(`Erro: ${response.statusText}`);
    }
    
    // Processar resposta da API
    const data = await response.json();
    
    // Extrair conteúdo da resposta conforme formato da DeepSeek API
    let content = "";
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      content = data.choices[0].message.content;
    } else if (data.content) {
      content = data.content;
    }
    
    return { 
      content: content || "Não foi possível obter uma resposta clara."
    };
  } catch (error) {
    console.error("Erro ao buscar resposta do chat:", error);
    toast.error("Não foi possível obter resposta. Tente novamente.");
    return { 
      content: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente."
    };
  }
};
