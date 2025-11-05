import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  CheckCircle, 
  XCircle, 
  Copy, 
  Sparkles,
  ChevronRight,
  Maximize2,
  Code2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { useExamples, type CodeExample, type CodeExampleStep } from '@/context/ExamplesContext';

interface ExamplesPanelProps {
  className?: string;
  onExampleSelect?: (example: CodeExample) => void;
  theme?: 'light' | 'dark';
}

// Componente de card de exemplo com destaque de código
const ExampleCard: React.FC<{
  example: CodeExample;
  onSelect?: (example: CodeExample) => void;
  isSelected?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onOpenFullView?: () => void;
  onOpenCodeView?: () => void;
}> = ({ 
  example, 
  onSelect, 
  isSelected = false, 
  isExpanded = false, 
  onToggleExpand,
  onOpenFullView,
  onOpenCodeView
}) => {

  const handleCopy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(example.code);
    toast.success('Código copiado! 📋');
  }, [example.code]);

  const handleSelect = useCallback(() => {
    if (onSelect) {
      onSelect(example);
      toast.success('Exemplo selecionado! ✨');
    }
  }, [example, onSelect]);

  return (
    <Card 
      className={cn(
        'overflow-hidden transition-all duration-200 w-full',
        'border bg-card hover:bg-accent/5',
        isSelected && 'ring-2 ring-primary',
        example.type === 'correct' 
          ? 'border-l-4 border-l-emerald-500' 
          : 'border-l-4 border-l-rose-500'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header compacto */}
        <div className="flex items-center justify-between px-2.5 py-2 border-b">
          <div className="flex items-center gap-2">
            {example.type === 'correct' ? (
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-500" />
            )}
            <Badge 
              variant="outline" 
              className={cn(
                'text-[10px] px-1.5 py-0.5',
                example.type === 'correct'
                  ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'border-rose-500/30 text-rose-600 dark:text-rose-400'
              )}
            >
              {example.type === 'correct' ? 'Correto' : 'Incorreto'}
            </Badge>
          </div>

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenCodeView}
              className="h-6 px-2 text-[10px]"
              title="Ver código em destaque"
            >
              <Code2 className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenFullView}
              className="h-6 px-2 text-[10px]"
              title="Expandir card completo"
            >
              <Maximize2 className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-6 px-2 text-[10px]"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 px-2.5 py-2 overflow-hidden">
          {/* Título */}
          <h3 className="font-semibold text-[13px] mb-1.5 text-foreground leading-tight">
            {example.title}
          </h3>
          
          {/* Explicação */}
          <p className={cn(
            "text-xs text-muted-foreground mb-2 leading-snug",
            !isExpanded && "line-clamp-2"
          )}>
            {example.explanation}
          </p>

          {/* Container com scroll quando expandido */}
          <div className={cn(
            "space-y-2",
            isExpanded && "overflow-y-auto pr-1",
            isExpanded ? "max-h-[500px]" : ""
          )}>
            {/* Passo a passo (primeiro quando expandido) */}
            {isExpanded && example.steps && example.steps.length > 0 && (
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className={cn(
                    "w-5 h-5 rounded-md flex items-center justify-center",
                    example.type === 'correct'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  )}>
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <h4 className="text-xs font-semibold text-foreground">
                    Passo a Passo
                  </h4>
                </div>
                
                <div className="space-y-2">
                  {example.steps.map((step) => (
                    <div key={step.number} className="space-y-2">
                      {/* Passo principal */}
                      <div 
                        className={cn(
                          "rounded-md border p-2.5 transition-colors",
                          example.type === 'correct'
                            ? 'border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10'
                            : 'border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10'
                        )}
                      >
                        <div className="flex gap-2">
                          <div className={cn(
                            "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                            example.type === 'correct'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-rose-500 text-white'
                          )}>
                            {step.number}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-semibold text-foreground mb-1 leading-tight">
                              {step.title}
                            </h5>
                            <p className="text-[11px] text-muted-foreground leading-snug">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Sub-etapas (se existirem) */}
                      {step.substeps && step.substeps.length > 0 && (
                        <div className="ml-7 space-y-1.5 border-l-2 border-border pl-3">
                          {step.substeps.map((substep) => (
                            <div 
                              key={substep.number}
                              className={cn(
                                "rounded-md border p-2 transition-colors",
                                example.type === 'correct'
                                  ? 'border-emerald-500/10 bg-emerald-500/[0.02] hover:bg-emerald-500/5'
                                  : 'border-rose-500/10 bg-rose-500/[0.02] hover:bg-rose-500/5'
                              )}
                            >
                              <div className="flex gap-2">
                                <div className={cn(
                                  "flex-shrink-0 w-4 h-4 rounded flex items-center justify-center text-[9px] font-semibold",
                                  example.type === 'correct'
                                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                                    : 'bg-rose-500/20 text-rose-700 dark:text-rose-300'
                                )}>
                                  {step.number}.{substep.number}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h6 className="text-[11px] font-semibold text-foreground mb-0.5 leading-tight">
                                    {substep.title}
                                  </h6>
                                  <p className="text-[10px] text-muted-foreground leading-snug">
                                    {substep.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bloco de código com destaque */}
            <div className="relative rounded-lg overflow-hidden border border-border bg-slate-950 dark:bg-slate-900">
              {/* Header do bloco de código */}
              <div className="flex items-center justify-between px-2.5 py-1 bg-slate-900/50 dark:bg-slate-800/50 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[9px] text-slate-400 ml-1.5 font-mono uppercase">
                    {example.language}
                  </span>
                </div>
              </div>

              {/* Código */}
              <div 
                className={cn(
                  "w-full overflow-y-auto",
                  isExpanded ? "max-h-[200px]" : "max-h-24"
                )}
              >
                <pre className="px-2.5 py-2 text-xs font-mono leading-relaxed">
                  <code className="text-slate-100 dark:text-slate-200">
                    {example.code}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-2 px-2.5 py-2 border-t bg-muted/30">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleExpand}
            className="flex-1 h-7 text-[11px]"
          >
            <ChevronRight className={cn(
              "w-3 h-3 mr-1 transition-transform",
              isExpanded && "rotate-90"
            )} />
            {isExpanded ? 'Recolher' : 'Ver Mais'}
          </Button>
          
          {/* <Button
            size="sm"
            onClick={handleSelect}
            className={cn(
              'flex-1 h-7 text-[11px]',
              example.type === 'correct'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-rose-600 hover:bg-rose-700 text-white'
            )}
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Usar
          </Button> */}
        </div>
      </div>
    </Card>
  );
};

export const ExamplesPanel: React.FC<ExamplesPanelProps> = ({
  className,
  onExampleSelect,
  theme = 'dark'
}) => {
  const { examples } = useExamples();
  
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [selectedExample, setSelectedExample] = useState<CodeExample | null>(null);
  const [expandedExampleId, setExpandedExampleId] = useState<string | null>(null);
  const [modalExample, setModalExample] = useState<CodeExample | null>(null);
  const [modalMode, setModalMode] = useState<'full' | 'code'>('full');

  // Usar exemplos do contexto
  const allExamples = examples;

  // Pegar um exemplo correto e um incorreto
  const correctExamples = useMemo(() => 
    allExamples.filter(ex => ex.type === 'correct'),
    [allExamples]
  );
  const incorrectExamples = useMemo(() => 
    allExamples.filter(ex => ex.type === 'incorrect'),
    [allExamples]
  );

  const currentCorrect = correctExamples[currentPairIndex % correctExamples.length];
  const currentIncorrect = incorrectExamples[currentPairIndex % incorrectExamples.length];

  const handleGenerateNew = useCallback(() => {
    setCurrentPairIndex(prev => prev + 1);
    setSelectedExample(null);
    setExpandedExampleId(null);
    toast.success('Novos exemplos gerados! 🎯');
  }, []);

  const handleSelectExample = useCallback((example: CodeExample) => {
    setSelectedExample(example);
    if (onExampleSelect) {
      onExampleSelect(example);
    }
  }, [onExampleSelect]);

  const handleToggleExpand = useCallback((exampleId: string) => {
    setExpandedExampleId(prev => prev === exampleId ? null : exampleId);
  }, []);

  const handleOpenFullView = useCallback((example: CodeExample) => {
    setModalExample(example);
    setModalMode('full');
  }, []);

  const handleOpenCodeView = useCallback((example: CodeExample) => {
    setModalExample(example);
    setModalMode('code');
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalExample(null);
  }, []);

  const handleCopyFromModal = useCallback(() => {
    if (modalExample) {
      navigator.clipboard.writeText(modalExample.code);
      toast.success('Código copiado! 📋');
    }
  }, [modalExample]);

  if (!currentCorrect || !currentIncorrect) {
    return (
      <div className={cn('flex flex-col items-center justify-center h-full p-8 text-center', className)}>
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-base font-semibold text-foreground mb-2">
          Nenhum exemplo disponível
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Adicione exemplos ao sistema para começar a aprender com código prático.
        </p>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col h-full w-full', className)}>
      {/* Header compacto */}
      <div className="px-3 py-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
        <div className="flex items-center justify-between">
         

          <Button
            onClick={handleGenerateNew}
            variant="outline"
            size="sm"
            className="h-7 text-xs"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Outros Exemplos
          </Button>
        </div>
      </div>

      {/* Lista de exemplos com scroll */}
      <ScrollArea className="flex-1 w-full">
        <div className="flex min-h-full items-center justify-center p-2">
          <div className="w-full space-y-2">
            {/* Exemplo Correto */}
            <ExampleCard
              example={currentCorrect}
              onSelect={handleSelectExample}
              isSelected={selectedExample?.id === currentCorrect.id}
              isExpanded={expandedExampleId === currentCorrect.id}
              onToggleExpand={() => handleToggleExpand(currentCorrect.id)}
              onOpenFullView={() => handleOpenFullView(currentCorrect)}
              onOpenCodeView={() => handleOpenCodeView(currentCorrect)}
            />

            {/* Exemplo Incorreto */}
            <ExampleCard
              example={currentIncorrect}
              onSelect={handleSelectExample}
              isSelected={selectedExample?.id === currentIncorrect.id}
              isExpanded={expandedExampleId === currentIncorrect.id}
              onToggleExpand={() => handleToggleExpand(currentIncorrect.id)}
              onOpenFullView={() => handleOpenFullView(currentIncorrect)}
              onOpenCodeView={() => handleOpenCodeView(currentIncorrect)}
            />
          </div>
        </div>
      </ScrollArea>

      {/* Modal para visualização expandida */}
      <Dialog open={!!modalExample} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col gap-0 p-0">
          {modalExample && (
            <>
              <DialogHeader className="px-6 pt-6 pb-4 border-b flex-shrink-0">
                <div className="flex items-center gap-3">
                  {modalExample.type === 'correct' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <DialogTitle className="text-lg font-semibold">
                      {modalExample.title}
                    </DialogTitle>
                    <DialogDescription className="text-sm mt-1">
                      {modalExample.explanation}
                    </DialogDescription>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      'text-xs px-2 py-1',
                      modalExample.type === 'correct'
                        ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                        : 'border-rose-500/30 text-rose-600 dark:text-rose-400'
                    )}
                  >
                    {modalExample.type === 'correct' ? 'Correto ✓' : 'Incorreto ❌'}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  {/* Modo Full: Mostrar passos + código */}
                  {modalMode === 'full' && (
                    <>
                      {/* Passo a passo */}
                      {modalExample.steps && modalExample.steps.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Sparkles className={cn(
                              "w-5 h-5",
                              modalExample.type === 'correct'
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-rose-600 dark:text-rose-400'
                            )} />
                            <h3 className="text-base font-semibold">Passo a Passo</h3>
                          </div>
                          
                          <div className="space-y-3">
                            {modalExample.steps.map((step) => (
                              <div key={step.number} className="space-y-2">
                                {/* Passo principal */}
                                <div 
                                  className={cn(
                                    "rounded-lg border p-4 transition-colors",
                                    modalExample.type === 'correct'
                                      ? 'border-emerald-500/20 bg-emerald-500/5'
                                      : 'border-rose-500/20 bg-rose-500/5'
                                  )}
                                >
                                  <div className="flex gap-3">
                                    <div className={cn(
                                      "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold",
                                      modalExample.type === 'correct'
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-rose-500 text-white'
                                    )}>
                                      {step.number}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-sm font-semibold text-foreground mb-2">
                                        {step.title}
                                      </h4>
                                      <p className="text-sm text-muted-foreground leading-relaxed">
                                        {step.description}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Sub-etapas */}
                                {step.substeps && step.substeps.length > 0 && (
                                  <div className="ml-10 space-y-2 border-l-2 border-border pl-4">
                                    {step.substeps.map((substep) => (
                                      <div 
                                        key={substep.number}
                                        className={cn(
                                          "rounded-lg border p-3 transition-colors",
                                          modalExample.type === 'correct'
                                            ? 'border-emerald-500/10 bg-emerald-500/[0.02]'
                                            : 'border-rose-500/10 bg-rose-500/[0.02]'
                                        )}
                                      >
                                        <div className="flex gap-2.5">
                                          <div className={cn(
                                            "flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-semibold",
                                            modalExample.type === 'correct'
                                              ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                                              : 'bg-rose-500/20 text-rose-700 dark:text-rose-300'
                                          )}>
                                            {step.number}.{substep.number}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <h5 className="text-sm font-semibold text-foreground mb-1">
                                              {substep.title}
                                            </h5>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                              {substep.description}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Separador */}
                      {modalExample.steps && modalExample.steps.length > 0 && (
                        <div className="flex items-center gap-3 py-2">
                          <div className="h-px flex-1 bg-border" />
                          <Code2 className="w-4 h-4 text-muted-foreground" />
                          <div className="h-px flex-1 bg-border" />
                        </div>
                      )}
                    </>
                  )}

                  {/* Código (sempre mostrado) */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-semibold">Código</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyFromModal}
                        className="h-8"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar Código
                      </Button>
                    </div>
                    
                    <div className="relative rounded-lg overflow-hidden border border-border bg-slate-950 dark:bg-slate-900">
                      {/* Header do bloco de código */}
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 dark:bg-slate-800/50 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <span className="text-xs text-slate-400 ml-2 font-mono uppercase">
                            {modalExample.language}
                          </span>
                        </div>
                      </div>

                      {/* Código com scroll interno */}
                      <div className="max-h-[400px] overflow-y-auto">
                        <pre className="px-4 py-3 text-sm font-mono leading-relaxed">
                          <code className="text-slate-100 dark:text-slate-200">
                            {modalExample.code}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamplesPanel;
