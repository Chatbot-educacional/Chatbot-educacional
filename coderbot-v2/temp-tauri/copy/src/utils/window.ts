/**
 * Utilitários para manipulação de janelas no Tauri
 */
import { invoke } from "@tauri-apps/api/core";

interface WindowOptions {
  url?: string;
  title?: string;
  width?: number;
  height?: number;
}

/**
 * Abre uma nova janela usando a API Tauri
 * @param options Opções da janela
 * @returns Promise que resolve quando a janela for aberta
 */
export async function openWindow(options: WindowOptions = {}): Promise<void> {
  const { url, title = "Nova Janela", width = 800, height = 600 } = options;
  
  try {
    // Por enquanto, a API do backend aceita apenas URL e título
    await invoke("open_new_window", { url, title });
    console.log("Janela aberta com sucesso:", options);
  } catch (error) {
    console.error("Erro ao abrir janela:", error);
    throw error;
  }
}

/**
 * Abre uma URL externa em uma nova janela
 * @param url URL a ser aberta
 * @param title Título da janela
 * @returns Promise que resolve quando a janela for aberta
 */
export async function openExternalUrl(url: string, title?: string): Promise<void> {
  if (!url.startsWith("http")) {
    url = `https://${url}`;
  }
  
  return openWindow({ url, title: title || url });
}

// Função adicional para abrir uma nova janela do aplicativo
export async function openAppWindow(title: string): Promise<void> {
  return openWindow({ title });
} 