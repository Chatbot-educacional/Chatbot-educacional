import React, { useCallback, useRef, useState } from "react";
import { Excalidraw, serializeAsJSON } from "@excalidraw/excalidraw";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import "@excalidraw/excalidraw/index.css";
import { Save, Plus, UploadCloud, Loader2, MessageCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import {
  pb,
  getCurrentUser,
  type DrawingRecord,
} from "@/integrations/pocketbase/client";
import { useDrawings } from "@/hooks/useDrawings";
import { DrawingList } from "@/components/whiteboard/DrawingList";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

// ---------- Tipos auxiliares ----------
/** Estrutura mínima do JSON exportado pelo Excalidraw */
type SceneJSON = Record<string, unknown>;

const Whiteboard: React.FC = () => {
  const apiRef = useRef<ExcalidrawImperativeAPI>(null);
  const inflightRef = useRef(false); // evita salvar em paralelo

  // ---------- Sessão do usuário ----------
  const user = getCurrentUser();
  const { drawings, loading, refresh } = useDrawings(user?.id);

  // ---------- Estado local ----------
  const [editorVisible, setEditorVisible] = useState(false);
  const [scene, setScene] = useState<SceneJSON | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null); // controla update vs create

  /* ===================== FUNÇÃO DE SALVAR ===================== */
  const saveScene = useCallback(async () => {
    const api = apiRef.current;
    if (!api || !user) return;
    if (inflightRef.current) return; // já tem save rodando

    inflightRef.current = true;

    const jsonObj = serializeAsJSON(
      api.getSceneElements(),
      api.getAppState(),
      api.getFiles(),
      "local",
    );
    const jsonStr = JSON.stringify(jsonObj);

    try {
      if (activeId) {
        await pb.collection("drawings").update(activeId, { data: jsonStr });
      } else {
        const record = await pb.collection("drawings").create({
          title: "Quadro sem nome",
          data: jsonStr,
          user: user.id,
        });
        setActiveId(record.id);
      }
      toast.success("Quadro salvo");
      refresh();
    } catch (err) {
      toast.error("Erro ao salvar");
      console.error(err);
    } finally {
      inflightRef.current = false;
    }
  }, [activeId, user, refresh]);

  /* ===================== AÇÕES DO MENU INICIAL ===================== */
  const openLocalFile = async (file: File) => {
    try {
      const jsonObj = JSON.parse(await file.text());
      setScene(jsonObj);
      setActiveId(null);
      setEditorVisible(true);
    } catch {
      toast.error("Arquivo inválido");
    }
  };

  const openFromDB = (d: DrawingRecord) => {
    try {
      const jsonObj: SceneJSON = typeof d.data === "string" ? JSON.parse(d.data) : (d.data as SceneJSON);
      setScene(jsonObj);
      setActiveId(d.id);
      setEditorVisible(true);
    } catch {
      toast.error("Não foi possível abrir o quadro");
    }
  };

  const newBoard = () => {
    setScene(null);
    setActiveId(null);
    setEditorVisible(true);
  };

  /* ===================== RENDER ===================== */
  return (
    <div className="flex flex-col w-full h-screen bg-background text-foreground">
      <Toaster position="bottom-center" />

      {/* ---------- Tela Inicial ---------- */}
      {!editorVisible ? (
        <div className="m-auto flex flex-col gap-6 items-center w-full max-w-lg p-6 border rounded-xl shadow-lg bg-card">
          <h1 className="text-3xl font-bold">Whiteboard</h1>

          {/* upload */}
          <label className="flex flex-col items-center gap-2 cursor-pointer">
            <UploadCloud size={24} />
            <span className="text-sm">Carregar arquivo (.json / .excalidraw)</span>
            <input
              type="file"
              accept=".json,.excalidraw"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && openLocalFile(e.target.files[0])}
            />
          </label>

          {/* novo quadro */}
          <button onClick={newBoard} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Novo quadro
          </button>

          {/* lista do usuário */}
          {user && (
            <div className="w-full">
              <h2 className="text-lg font-semibold mb-2">Seus quadros</h2>
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <DrawingList items={drawings} onOpen={openFromDB} onRefresh={refresh} />
              )}
            </div>
          )}
        </div>
      ) : (
        /* ---------- Editor ---------- */
        <>
          <div className="flex-1">
            <Excalidraw
              initialData={scene || undefined}
              excalidrawAPI={(api) => (apiRef.current = api)}
            />
          </div>

          {/* FAB salvar manual */}
          <button
            onClick={saveScene}
            title="Salvar quadro"
            className="fixed bottom-5 right-5 z-50 p-4 rounded-full shadow-xl bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition"
          >
            <Save size={24} />
          </button>

          {/* ---------- Chat Popup ---------- */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                title="Abrir chat"
                className="fixed bottom-20 ml-2  z-50 p-5 rounded-full shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 transition"
              >
                <MessageCircle size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] p-0">
              <ChatInterface />
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
};

export default Whiteboard;
