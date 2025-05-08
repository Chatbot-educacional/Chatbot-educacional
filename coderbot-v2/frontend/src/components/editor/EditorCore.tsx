import React, { memo } from 'react';
import { useCodeEditor, CODE_SERVER_URL } from '@/context/CodeEditorContext';

/**
 * EditorCore - Componente responsável por manter a instância do editor de código sempre em memória.
 * 
 * Este componente é usado para evitar recarregamentos do iframe do VS Code quando o usuário navega
 * entre abas, mantendo o editor em segundo plano mesmo quando não visível.
 * 
 * Suas configurações e estado são preservados durante toda a sessão do usuário.
 */
export const EditorCore = memo(() => {
  const { editorIframeRef, isEditorVisible } = useCodeEditor();

  return (
    <div 
      className="absolute w-full h-full" 
      style={{ 
        display: isEditorVisible ? 'block' : 'none',
        zIndex: isEditorVisible ? 10 : -1,
        pointerEvents: isEditorVisible ? 'auto' : 'none',
      }}
    >
      <iframe
        ref={editorIframeRef}
        src={CODE_SERVER_URL}
        title="VS Code code-server"
        className="w-full h-full border-0"
        style={{ opacity: isEditorVisible ? 1 : 0 }}
      />
    </div>
  );
});

EditorCore.displayName = 'EditorCore'; 