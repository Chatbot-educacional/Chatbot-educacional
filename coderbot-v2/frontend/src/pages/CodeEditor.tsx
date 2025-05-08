import { FC, useEffect } from "react";
import { useCodeEditor } from "@/context/CodeEditorContext";

/**
 * CodeEditor - Componente de interface para o editor de código
 * 
 * Este componente é uma interface leve para o editor de código VS Code em um iframe.
 * O conteúdo real do editor é gerenciado pelo componente EditorCore, que mantém o iframe
 * sempre carregado em segundo plano para evitar recarregamentos desnecessários.
 * 
 * Quando este componente é montado, o editor já existente é tornado visível, e quando
 * é desmontado, o editor permanece em memória, mas oculto.
 * 
 * Benefícios:
 * - Mantém o estado e as configurações do editor entre navegações
 * - Evita recarregamentos lentos quando o usuário retorna ao editor
 * - Preserva arquivos e alterações não salvas
 */
const CodeEditor: FC = () => {
  const { isEditorInitialized } = useCodeEditor();

  return (
    <div className="w-full h-full">
      {!isEditorInitialized && (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Carregando o editor de código...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
