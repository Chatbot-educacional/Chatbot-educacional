import React, { useCallback, useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Excalidraw, serializeAsJSON } from "@excalidraw/excalidraw";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import "@excalidraw/excalidraw/index.css";
import { Save, Plus, UploadCloud, Loader2, MessageCircle, Star, Trophy, Zap, Heart, Sparkles, ArrowLeft, Cpu, Database } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import {
  pb,
  type DrawingRecord,
  registerUserAction,
} from "@/integrations/pocketbase/client";
import { useAuthState } from "@/hooks/useAuthState";
import { useDrawings } from "@/hooks/useDrawings";
import { useMissionTracker } from "@/hooks/useMissionTracker";
import { DrawingList } from "@/components/whiteboard/DrawingList";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { usePerformance } from "@/hooks/usePerformance";
import { Button } from "@/components/ui/button";

// ---------- Tipos auxiliares ----------
/** Estrutura mínima do JSON exportado pelo Excalidraw */
type SceneJSON = Record<string, unknown>;

const getToday = () => new Date().toISOString().slice(0, 10);

// Hook para otimizar salvamento com debounce
const useDebouncedSave = (saveFunction: () => Promise<void>, delay: number = 2000) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastSaveRef = useRef<number>(0);
  const saveFunctionRef = useRef(saveFunction);

  // Atualiza a referência da função sem causar re-renders
  useEffect(() => {
    saveFunctionRef.current = saveFunction;
  }, [saveFunction]);

  const debouncedSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const now = Date.now();
      // Evita salvamentos muito frequentes (mínimo 1 segundo entre salvamentos)
      if (now - lastSaveRef.current > 1000) {
        try {
          await saveFunctionRef.current();
          lastSaveRef.current = now;
        } catch (error) {
          console.error('Erro no salvamento automático:', error);
        }
      }
    }, delay);
  }, [delay]); // Remove saveFunction das dependências

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedSave;
};

// Hook para cache inteligente de desenhos
const useDrawingCache = () => {
  const cacheRef = useRef<Map<string, { data: any; timestamp: number }>>(new Map());

  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  const getCached = useCallback((id: string) => {
    const cached = cacheRef.current.get(id);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }, []); // Remove cache das dependências

  const setCached = useCallback((id: string, data: any) => {
    const newCache = new Map(cacheRef.current);
    newCache.set(id, { data, timestamp: Date.now() });

    // Limpa cache antigo (mantém apenas os 10 mais recentes)
    if (newCache.size > 10) {
      const sorted = Array.from(newCache.entries())
        .sort(([,a], [,b]) => b.timestamp - a.timestamp);
      cacheRef.current = new Map(sorted.slice(0, 10));
    } else {
      cacheRef.current = newCache;
    }
  }, []);

  const clearCache = useCallback(() => {
    cacheRef.current = new Map();
  }, []);

  return { getCached, setCached, clearCache };
};

const Whiteboard: React.FC = () => {
  const apiRef = useRef<ExcalidrawImperativeAPI>(null);
  const inflightRef = useRef(false); // evita salvar em paralelo

  // ---------- Performance ----------
  const { metrics, isSlowConnection } = usePerformance();
  const { getCached, setCached, clearCache } = useDrawingCache();

  // ---------- Sessão do usuário ----------
  // 🔥 FIX: Usar hook reativo ao invés de getCurrentUser()
  const { currentUser } = useAuthState();
  const { drawings, loading, refresh } = useDrawings(currentUser?.id);

  // Mission Tracker - Rastreamento automático de progresso das missões
  // Passa undefined para buscar missões de todas as turmas do usuário automaticamente
  const { trackWhiteboardInteraction } = useMissionTracker(undefined);

  // ---------- Estado local otimizado ----------
  const [editorVisible, setEditorVisible] = useState(false);
  const [scene, setScene] = useState<SceneJSON | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState("");
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // // Bônus diário ao acessar pela primeira vez no dia
  // React.useEffect(() => {
  //   if (user && !dailyBonusGiven) {
  //     const lastBonus = localStorage.getItem('whiteboard_daily_bonus');
  //     const today = getToday();
  //     if (lastBonus !== today) {
  //       registerUserAction(user.id, 'whiteboard_daily_bonus'); // 200 pontos
  //       localStorage.setItem('whiteboard_daily_bonus', today);
  //       setDailyBonusGiven(true);
  //     }
  //   }
  // }, [user, dailyBonusGiven]);

  /* ===================== FUNÇÃO DE SALVAR OTIMIZADA ===================== */
  const saveScene = useCallback(async (isAutoSave: boolean = false) => {
    const api = apiRef.current;
    if (!api || !currentUser) return;
    if (inflightRef.current) return; // já tem save rodando

    inflightRef.current = true;

    try {
      const jsonObj = serializeAsJSON(
        api.getSceneElements(),
        api.getAppState(),
        api.getFiles(),
        "local",
      );
      const jsonStr = JSON.stringify(jsonObj);

      // Compressão simples para reduzir tamanho se necessário
      const compressedData = jsonStr.length > 50000 ? jsonStr : jsonStr; // Placeholder para futura compressão

      if (activeId) {
        await pb.collection("drawings").update(activeId, { data: compressedData });
      } else {
        const record = await pb.collection("drawings").create({
          title: "Quadro sem nome",
          data: compressedData,
          user: currentUser.id,
        });
        setActiveId(record.id);
      }

      setLastSaved(new Date());

      // Atualiza cache se for um quadro existente
      if (activeId && jsonObj) {
        setCached(activeId, jsonObj);
      }

      if (!isAutoSave) {
        toast.success("Quadro salvo");
        
        // Rastrear salvamento de desenho para progresso da missão
        await trackWhiteboardInteraction('whiteboard_save', {
          drawingId: activeId || 'new',
          dataSize: compressedData.length,
        });
      }

      refresh();
    } catch (err) {
      toast.error("Erro ao salvar");
      console.error(err);
    } finally {
      inflightRef.current = false;
    }
  }, [activeId, currentUser, refresh]);

  // Auto-save inteligente com debounce
  const debouncedAutoSave = useDebouncedSave(() => saveScene(true), isSlowConnection ? 5000 : 3000);

  // Função otimizada para onChange - evita re-renders excessivos
  const handleExcalidrawChange = useCallback(() => {
    // Removida a geração automática de contexto IA
  }, []);

  // Hook para detectar mudanças no quadro e acionar auto-save
  useEffect(() => {
    if (!editorVisible || !autoSaveEnabled || !apiRef.current) return;

    const api = apiRef.current;
    let changeTimeout: NodeJS.Timeout;
    let pollInterval: NodeJS.Timeout;

    const handleChange = () => {
      clearTimeout(changeTimeout);
      changeTimeout = setTimeout(() => {
        if (autoSaveEnabled && editorVisible) {
          debouncedAutoSave();
        }
      }, 1000); // Espera 1s após parar de editar
    };

    // Adiciona listeners para mudanças
    if (api) {
      // Note: Excalidraw API pode não ter eventos diretos, então usamos polling inteligente
      pollInterval = setInterval(() => {
        if (editorVisible && autoSaveEnabled) {
          handleChange();
        }
      }, 5000); // Verifica a cada 5s

      return () => {
        clearInterval(pollInterval);
        clearTimeout(changeTimeout);
      };
    }
  }, [editorVisible, autoSaveEnabled]);

  // Preload inteligente dos desenhos mais recentes
  useEffect(() => {
    if (drawings.length > 0 && !editorVisible) {
      // Preload os 3 desenhos mais recentes em background
      const recentDrawings = drawings
        .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
        .slice(0, 3);

      recentDrawings.forEach((drawing, index) => {
        // Preload com delay progressivo para não sobrecarregar
        const timeoutId = setTimeout(() => {
          if (!getCached(drawing.id)) {
            try {
              const jsonObj = typeof drawing.data === "string"
                ? JSON.parse(drawing.data)
                : drawing.data;
              setCached(drawing.id, jsonObj);
            } catch (error) {
              console.warn(`Erro ao fazer preload do desenho ${drawing.id}:`, error);
            }
          }
        }, index * 500); // 0ms, 500ms, 1000ms

        // Cleanup timeout
        return () => clearTimeout(timeoutId);
      });
    }
  }, [drawings.length, editorVisible]);

  /* ===================== AÇÕES DO MENU INICIAL OTIMIZADAS ===================== */
  const handleOpenEditor = useCallback(() => {
    setEditorVisible(true);
  }, []);

  const openLocalFile = useCallback(async (file: File) => {
    try {
      const jsonObj = JSON.parse(await file.text());
      setScene(jsonObj);
      setActiveId(null);
      handleOpenEditor();
      if (currentUser) registerUserAction(currentUser.id, 'whiteboard_upload_file');

      // Feedback visual de carregamento
      toast.success("Arquivo carregado com sucesso!");
    } catch {
      toast.error("Arquivo inválido ou corrompido");
    }
  }, [currentUser]);

  const openFromDB = useCallback((d: DrawingRecord) => {
    try {
      // Tenta carregar do cache primeiro
      let jsonObj: SceneJSON = getCached(d.id);

      if (!jsonObj) {
        // Se não está no cache, parse do banco
        jsonObj = typeof d.data === "string" ? JSON.parse(d.data) : (d.data as SceneJSON);

        // Salva no cache para futuras utilizações
        setCached(d.id, jsonObj);
      }

      setScene(jsonObj);
      setActiveId(d.id);
      handleOpenEditor();
      if (currentUser) registerUserAction(currentUser.id, 'whiteboard_open_board');

      // Feedback de performance inteligente
      const wasCached = getCached(d.id) !== null;
      toast.success(
        `Quadro "${d.title || 'Sem nome'}" ${wasCached ? 'carregado (cache)' : 'carregado'}`,
        {
          duration: wasCached ? 1500 : 2000,
          icon: wasCached ? '⚡' : '📁'
        }
      );
    } catch (error) {
      console.error('Erro ao abrir quadro:', error);
      toast.error("Não foi possível abrir o quadro");
    }
  }, [currentUser, getCached, handleOpenEditor, setCached]); // Re-executar quando currentUser mudar

  const newBoard = useCallback(() => {
    // Limpa todos os estados relacionados
    setScene(null);
    setActiveId(null);
    setLastSaved(null);

    // Limpa cache
    clearCache();
    

    handleOpenEditor();
    toast.success("Novo quadro criado!", { duration: 1500 });
  }, [handleOpenEditor, clearCache]);

  /* ===================== COMPONENTES OTIMIZADOS ===================== */

  // Componente lazy para Excalidraw com loading state
  const LazyExcalidraw = useMemo(() => React.lazy(() =>
    import("@excalidraw/excalidraw").then(module => ({
      default: module.Excalidraw
    }))
  ), []);

  // Indicador de performance aprimorado (menor)
  const PerformanceIndicator = useMemo(() => {
    const getPerformanceColor = () => {
      if (isSlowConnection) return 'bg-orange-600';
      if (metrics.cls && metrics.cls > 0.1) return 'bg-yellow-600';
      return 'bg-green-600';
    };

    return (
      <div className={`fixed top-12 right-4 z-30 ${getPerformanceColor()} text-white px-2 py-1 rounded-md text-xs font-mono shadow-md`}>
        <div className="flex items-center gap-1">
          <Cpu className="w-3 h-3" />
          <span className="font-medium text-xs">
            {isSlowConnection ? 'Lento' : 'OK'}
          </span>
        </div>
      </div>
    );
  }, [isSlowConnection, metrics.cls]);

  // Função para obter o JSON atual do quadro
  const getCurrentSceneJSON = useCallback((): Record<string, any> | null => {
    const api = apiRef.current;
    if (!api) return null;
    const jsonStr = serializeAsJSON(
      api.getSceneElements(),
      api.getAppState(),
      api.getFiles(),
      "local",
    );
    try {
      return JSON.parse(jsonStr);
    } catch {
      return null;
    }
  }, []);

  /* ===================== RENDER OTIMIZADO ===================== */
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground relative">
      <Toaster position="bottom-center" />

      {/* Indicadores de Performance */}
      {editorVisible && PerformanceIndicator}

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white px-8 py-6 rounded-2xl shadow-2xl animate-bounce text-center max-w-md">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold mb-2">
              <Sparkles className="w-8 h-8 animate-spin" />
              {motivationalMessage}
              <Star className="w-8 h-8 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200/20 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200/20 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* ---------- Tela Inicial ---------- */}
      {!editorVisible ? (
        <div className="m-auto flex flex-col gap-8 items-center w-full max-w-lg p-8 border rounded-2xl shadow-2xl bg-card">
          <h1 className="text-3xl font-bold mb-2">Whiteboard</h1>
          <p className="text-gray-600 text-center mb-4">Crie, salve e compartilhe quadros visuais para potencializar seu aprendizado!</p>

          {/* Card de progresso do usuário */}
          {/*
          {currentUser && (
            <div className="w-full">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">Progresso</span>
                  <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-1">Nível 2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${Math.min(createdBoards * 10, 100)}%` }} />
                </div>
                <div className="flex gap-2 mt-2">
                  <span className="inline-block bg-yellow-200 text-yellow-800 rounded px-2 py-1 text-xs">Primeiro Quadro</span>
                  {createdBoards >= 10 && (
                    <div className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full px-3 py-1 text-xs font-bold shadow-md animate-in zoom-in-50 duration-500">
                      <Trophy className="w-3 h-3" />
                      10 Quadros!
                    </div>
                  )}
                  {dailyBonusGiven && (
                    <div className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-3 py-1 text-xs font-bold shadow-md animate-in zoom-in-50 duration-500">
                      <Star className="w-3 h-3" />
                      Bônus Diário
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          */}

          {/* Seção de desafios/missões */}
          {/*
          {currentUser && (
            <div className="w-full mb-4">
              <div className="font-semibold mb-1">Desafios</div>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Crie 10 quadros <span className={createdBoards >= 10 ? "text-green-600" : "text-gray-500"}>{createdBoards}/10</span></li>
                <li>Salve um quadro 5 dias seguidos <span className="text-gray-500">(em breve)</span></li>
                <li>Ganhe o bônus diário <span className={dailyBonusGiven ? "text-green-600" : "text-gray-500"}>{dailyBonusGiven ? "Concluído" : "Pendente"}</span></li>
              </ul>
            </div>
          )}
          */}

          {/* Upload com validação e feedback */}
          <label className="flex flex-col items-center gap-2 cursor-pointer w-full p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 hover:border-purple-400 transition-all duration-300 mb-2 text-black group">
            <div className="p-2 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
              <UploadCloud size={24} className="text-purple-600" />
            </div>
            <span className="text-sm text-black font-medium">Carregar arquivo (.json / .excalidraw)</span>
            <span className="text-xs text-gray-500">Máx. 10MB • Cache inteligente ativado</span>
            <input
              type="file"
              accept=".json,.excalidraw"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                // Validação de tamanho
                const maxSize = 10 * 1024 * 1024; // 10MB
                if (file.size > maxSize) {
                  toast.error("Arquivo muito grande! Máximo 10MB.");
                  return;
                }

                // Feedback de carregamento
                toast.loading("Carregando arquivo...", { id: 'upload' });

                try {
                  await openLocalFile(file);
                  toast.success("Arquivo carregado com sucesso!", { id: 'upload' });
                } catch (error) {
                  toast.error("Erro ao carregar arquivo", { id: 'upload' });
                }
              }}
            />
          </label>

          {/* Novo quadro com feedback visual aprimorado */}
          <button
            onClick={newBoard}
            className="btn-primary flex items-center gap-2 w-full justify-center py-3 text-lg rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mb-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Plus size={20} />
            Novo quadro
          </button>

              {/* Lista de quadros com design emocional */}
              {currentUser && (
                <div className="w-full animate-in slide-in-from-bottom-2 duration-700 delay-900">
              <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/50 dark:via-purple-950/50 dark:to-pink-950/50 rounded-2xl p-6 border border-indigo-200/50 dark:border-indigo-800/50 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative">
                    <Heart className="w-5 h-5 text-pink-500 animate-pulse" />
                    <div className="absolute inset-0 bg-pink-400/30 rounded-full blur-sm animate-ping"></div>
                  </div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    💖 Seus Quadros
                  </h2>
                </div>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Carregando seus quadros...</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <DrawingList items={drawings} onOpen={openFromDB} onRefresh={refresh} />
                    {drawings.length === 0 && (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-2">🎨</div>
                        <p className="text-muted-foreground text-sm">
                          Seus quadros aparecerão aqui
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Comece criando seu primeiro quadro!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ---------- Editor Otimizado ---------- */
        <>
          <div
            className="fixed inset-0 top-0 left-0 w-full h-full z-10 bg-background"
            style={{
              height: '100vh',
              width: '100vw',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-lg font-medium">Carregando editor...</p>
                  <p className="text-sm text-muted-foreground">Preparando ferramentas de desenho</p>
                </div>
              </div>
            }>
              <LazyExcalidraw
                initialData={scene || undefined}
                excalidrawAPI={(api) => (apiRef.current = api)}
                theme="dark"
                UIOptions={{
                  canvasActions: {
                    loadScene: false,
                    export: {
                      saveFileToDisk: true
                    }
                  }
                }}
                onChange={handleExcalidrawChange}
              />
            </Suspense>
          </div>

          {/* Botão de voltar - canto superior esquerdo */}
          <button
            onClick={() => {
              setEditorVisible(false);
            }}
            title="Voltar para a lista"
            className="group fixed top-5 left-5 z-50 p-3 rounded-full shadow-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 hover:scale-110 transition-all duration-300 border-2 border-white/20"
          >
            <div className="relative">
              <ArrowLeft size={20} className="group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:scale-150 transition-transform duration-300"></div>
            </div>
            {/* Efeito de pulso sutil */}
            <div className="absolute inset-0 bg-gray-400/20 rounded-full animate-ping opacity-50"></div>
          </button>

          {/* ---------- Chat Popup ---------- */}
          <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
            <SheetTrigger asChild>
              <button
                title="Abrir chat"
                className="fixed bottom-20 ml-2 z-50 p-5 rounded-full shadow-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] p-0">
              <ChatInterface
                methodology="worked_examples"
              />
            </SheetContent>
          </Sheet>

          {/* Controles de Performance (menores) */}
          <div className="fixed top-20 right-4 z-30 flex flex-col gap-1">
            <Button
              variant={autoSaveEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
              className="text-xs h-7 px-2"
              title="Ativar/desativar salvamento automático inteligente"
            >
              <Database className="w-3 h-3" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={clearCache}
              className="text-xs h-7 px-2"
              title="Limpar cache de desenhos"
            >
              <Zap className="w-3 h-3" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Whiteboard;
