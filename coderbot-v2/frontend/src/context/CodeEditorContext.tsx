import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface CodeEditorContextProps {
  isEditorInitialized: boolean;
  isEditorVisible: boolean;
  editorIframeRef: React.RefObject<HTMLIFrameElement>;
  setEditorVisible: (visible: boolean) => void;
}

const CodeEditorContext = createContext<CodeEditorContextProps | null>(null);

interface CodeEditorProviderProps {
  children: ReactNode;
}

export const CODE_SERVER_URL = "http://localhost:8787";

export const CodeEditorProvider: React.FC<CodeEditorProviderProps> = ({ children }) => {
  const [isEditorInitialized, setEditorInitialized] = useState(false);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const editorIframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = editorIframeRef.current;
    if (!iframe) return;

    // Handler para interceptar window.open e links target=_blank
    function handleMessage(event: MessageEvent) {
      // Só aceite mensagens do VS Code Web
      if (!event.data || typeof event.data !== "object") return;
      // VS Code Web pode enviar mensagens de navegação
      if (event.data.type === "vscode:openExternal" && event.data.url) {
        // Use dynamic import to avoid issues when Tauri isn't available (e.g., in tests)
        import('@tauri-apps/api/core').then(({ invoke }) => {
          invoke("plugin:opener|open", { path: event.data.url });
        }).catch(err => {
          console.error("Failed to load Tauri API:", err);
        });
      }
    }

    window.addEventListener("message", handleMessage);

    // Injetar script no iframe para interceptar window.open e links target=_blank
    function injectScript() {
      if (!iframe.contentWindow) return;
      iframe.contentWindow.postMessage(
        { type: "inject-external-link-handler" },
        "*"
      );
      setEditorInitialized(true);
    }
    
    iframe.addEventListener("load", injectScript);

    return () => {
      window.removeEventListener("message", handleMessage);
      iframe.removeEventListener("load", injectScript);
    };
  }, []);

  return (
    <CodeEditorContext.Provider
      value={{
        isEditorInitialized,
        isEditorVisible,
        editorIframeRef,
        setEditorVisible,
      }}
    >
      {children}
    </CodeEditorContext.Provider>
  );
};

export const useCodeEditor = (): CodeEditorContextProps => {
  const context = useContext(CodeEditorContext);
  if (!context) {
    throw new Error('useCodeEditor must be used within a CodeEditorProvider');
  }
  return context;
}; 