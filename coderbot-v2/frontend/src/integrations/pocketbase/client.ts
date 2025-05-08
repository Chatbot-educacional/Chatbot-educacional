// src/integrations/pocketbase/client.ts

import PocketBase, { RecordModel as PBRecord} from 'pocketbase';

// URL do seu servidor PocketBase, de preferência em variável de ambiente
const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';

export const pb = new PocketBase(POCKETBASE_URL);

// --- Tipos de dados ---

/**
 * Modelo de usuário conforme definido na collection "users" do PocketBase.
 * Estende o Record padrão do SDK, que já inclui id, created, updated, etc.
 */
export interface UserRecord extends PBRecord {
  email: string;
  name: string;          // Nome completo
  emailVisibility: boolean;
  role: string;
  bio?: string;
  avatar?: string;
  
  // acrescente outros campos customizados se houver
}

/**
 * Resposta de autenticação via PocketBase.
 * authWithPassword retorna token + record.
 */
export interface AuthResponse {
  token: string;
  record: UserRecord;
}

/**
 * Retorna o usuário logado, ou undefined se não houver sessão.
 * Usa cast via unknown para satisfazer o TS quando os tipos não coincidem exatamente.
 */
export const getCurrentUser = (): UserRecord | undefined => {
  const model = pb.authStore.model;
  if (!model) return undefined;
  
  // Cast do modelo do PocketBase para nosso tipo UserRecord
  const user = model as unknown as UserRecord;
  
  return user;
};


export interface ChatMessageRecord extends PBRecord {
  user: string;
  content: string;
  isAi: boolean;
  sessionId: string;
  timestamp: string;
}


export interface DrawingRecord extends PBRecord {
  title: string;
  data: string; // o JSON serializado do Excalidraw
  user: string; // ID do usuário
}

/**
 * Modelo de gamificação para armazenar pontos, conquistas, níveis, badges, etc.
 * Recomenda-se criar uma collection "gamification" no PocketBase ou adicionar campos ao usuário.
 */
export interface GamificationRecord extends PBRecord {
  user: string; // ID do usuário relacionado
  points: number;
  level: number;
  badges: string[]; // Lista de badges/conquistas
  // Adicione outros campos conforme necessário (ex: missões, streaks, etc)
}

// Exemplo de como buscar dados de gamificação de um usuário
// (supondo que exista a collection "gamification" no PocketBase)
export const getUserGamification = async (userId: string): Promise<GamificationRecord | null> => {
  try {
    const record = await pb.collection('gamification').getFirstListItem(`user = "${userId}"`);
    return record as GamificationRecord;
  } catch (error) {
    // Se não encontrar, retorna null
    return null;
  }
};

/**
 * Modelo de ação de gamificação (ex: enviar mensagem, resolver exercício, etc.)
 * Recomenda-se criar uma collection "actions" ou "gamification_actions" no PocketBase.
 */
export interface ActionRecord extends PBRecord {
  name: string; // Nome da ação (ex: "send_message", "solve_exercise")
  description?: string;
  points: number; // Pontos/XP atribuídos
  multiplier?: number; // Multiplicador de XP (opcional)
  badge?: string; // Badge concedido (opcional)
  context?: string; // Contexto especial (opcional)
}

// Buscar todas as ações de gamificação
export const getAllActions = async (): Promise<ActionRecord[]> => {
  const records = await pb.collection('actions').getFullList();
  return records as ActionRecord[];
};

// Registrar uma ação realizada pelo usuário (pode ser via backend ou diretamente, conforme arquitetura)
export const registerUserAction = async (userId: string, actionName: string, context?: string) => {
  // Exemplo: criar um registro em uma collection "user_actions" (recomendado para histórico)
  return pb.collection('user_actions').create({
    user: userId,
    action: actionName,
    context: context || null,
    timestamp: new Date().toISOString(),
  });
};

// --- GitHub OAuth com PocketBase ---
export function startGithubOAuth() {
  pb.collection('users').authWithOAuth2({ provider: 'github' });
}
