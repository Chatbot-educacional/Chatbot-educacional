import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface CodeExampleStep {
  number: number;
  title: string;
  description: string;
  substeps?: Array<{
    number: number;
    title: string;
    description: string;
  }>;
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  language: string;
  type: 'correct' | 'incorrect';
  explanation: string;
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  steps?: CodeExampleStep[];
  hints?: Array<{
    line: number;
    message: string;
    type: 'info' | 'warning' | 'error';
  }>;
  lastExecuted?: {
    timestamp: Date;
    status: 'success' | 'error';
    output?: string;
    executionTime?: number;
  };
  // Analytics metadata
  viewCount?: number;
  copyCount?: number;
  focusModeCount?: number;
  lastViewed?: Date;
}

interface ExamplesContextType {
  examples: CodeExample[];
  setExamples: (examples: CodeExample[]) => void;
  addExample: (example: CodeExample) => void;
  updateExample: (id: string, updates: Partial<CodeExample>) => void;
  removeExample: (id: string) => void;
  markAsExecuted: (id: string, status: 'success' | 'error', output?: string, executionTime?: number) => void;
  getExample: (id: string) => CodeExample | undefined;
  selectedExample: CodeExample | null;
  setSelectedExample: (example: CodeExample | null) => void;
  // Filtros e busca
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLanguage: string | 'all';
  setSelectedLanguage: (language: string | 'all') => void;
  selectedType: 'all' | 'correct' | 'incorrect';
  setSelectedType: (type: 'all' | 'correct' | 'incorrect') => void;
  // Analytics tracking
  trackExampleView: (exampleId: string) => void;
  trackExampleCopy: (exampleId: string, context: 'inline_card' | 'modal_focus') => void;
  trackFocusMode: (exampleId: string) => void;
}

const ExamplesContext = createContext<ExamplesContextType | undefined>(undefined);

export const useExamples = () => {
  const context = useContext(ExamplesContext);
  if (!context) {
    throw new Error('useExamples must be used within an ExamplesProvider');
  }
  return context;
};

interface ExamplesProviderProps {
  children: ReactNode;
  initialExamples?: CodeExample[];
}

export const ExamplesProvider: React.FC<ExamplesProviderProps> = ({ 
  children, 
  initialExamples = [] 
}) => {
  const [examples, setExamples] = useState<CodeExample[]>(initialExamples);
  const [selectedExample, setSelectedExample] = useState<CodeExample | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | 'all'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'correct' | 'incorrect'>('all');

  const addExample = useCallback((example: CodeExample) => {
    setExamples(prev => [...prev, example]);
  }, []);

  const updateExample = useCallback((id: string, updates: Partial<CodeExample>) => {
    setExamples(prev => 
      prev.map(example => 
        example.id === id 
          ? { ...example, ...updates }
          : example
      )
    );
  }, []);

  const removeExample = useCallback((id: string) => {
    setExamples(prev => prev.filter(example => example.id !== id));
  }, []);

  const markAsExecuted = useCallback((
    id: string, 
    status: 'success' | 'error', 
    output?: string, 
    executionTime?: number
  ) => {
    updateExample(id, {
      lastExecuted: {
        timestamp: new Date(),
        status,
        output,
        executionTime
      }
    });
  }, [updateExample]);

  const getExample = useCallback((id: string) => {
    return examples.find(example => example.id === id);
  }, [examples]);

  // Analytics tracking functions
  const trackExampleView = useCallback((exampleId: string) => {
    const example = examples.find(e => e.id === exampleId);
    if (example) {
      updateExample(exampleId, {
        viewCount: (example.viewCount || 0) + 1,
        lastViewed: new Date()
      });
    }
  }, [examples, updateExample]);

  const trackExampleCopy = useCallback((exampleId: string, context: 'inline_card' | 'modal_focus') => {
    const example = examples.find(e => e.id === exampleId);
    if (example) {
      updateExample(exampleId, {
        copyCount: (example.copyCount || 0) + 1
      });
    }
  }, [examples, updateExample]);

  const trackFocusMode = useCallback((exampleId: string) => {
    const example = examples.find(e => e.id === exampleId);
    if (example) {
      updateExample(exampleId, {
        focusModeCount: (example.focusModeCount || 0) + 1
      });
    }
  }, [examples, updateExample]);

  const value: ExamplesContextType = {
    examples,
    setExamples,
    addExample,
    updateExample,
    removeExample,
    markAsExecuted,
    getExample,
    selectedExample,
    setSelectedExample,
    searchQuery,
    setSearchQuery,
    selectedLanguage,
    setSelectedLanguage,
    selectedType,
    setSelectedType,
    trackExampleView,
    trackExampleCopy,
    trackFocusMode
  };

  return (
    <ExamplesContext.Provider value={value}>
      {children}
    </ExamplesContext.Provider>
  );
};

// Exemplos padrão removidos: exemplos reais são carregados após a interação do aluno.
export const defaultExamples: CodeExample[] = [];
