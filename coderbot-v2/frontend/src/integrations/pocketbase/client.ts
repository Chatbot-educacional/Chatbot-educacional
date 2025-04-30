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
  fullName: string;
  emailVisibility: boolean;
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
  return model as unknown as UserRecord;
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
