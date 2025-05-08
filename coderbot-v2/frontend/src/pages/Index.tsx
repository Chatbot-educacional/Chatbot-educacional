import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { EditorCore } from "@/components/editor/EditorCore";
import { useCodeEditor } from "@/context/CodeEditorContext";

const Index = () => {
  const location = useLocation();
  const [currentNav, setCurrentNav] = useState<string>("chat");
  const isMobile = useIsMobile();
  const { setEditorVisible } = useCodeEditor();
  
  // Update currentNav based on the current route
  useEffect(() => {
    const path = location.pathname;
    
    if (path.includes("chat")) {
      setCurrentNav("chat");
      setEditorVisible(false);
    } else if (path.includes("playground")) {
      setCurrentNav("playground");
      setEditorVisible(true);
    } else if (path.includes("exercises")) {
      setCurrentNav("exercises");
      setEditorVisible(false);
    } else if (path.includes("metrics")) {
      setCurrentNav("metrics");
      setEditorVisible(false);
    } else if (path.includes("teacher")) {
      setCurrentNav("teacher");
      setEditorVisible(false);
    } else if (path.includes("student")) {
      setCurrentNav("student");
      setEditorVisible(false);
    } else if (path.includes("whiteboard")) {
      setCurrentNav("whiteboard");
      setEditorVisible(false);
    } else if (path.includes("mermaid")) {
      setCurrentNav("mermaid");
      setEditorVisible(false);
    } else if (path.includes("flashcard")) {
      setCurrentNav("flashcard");
      setEditorVisible(false);
    }
  }, [location.pathname, setEditorVisible]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
        <AppSidebar currentNav={currentNav} onNavChange={setCurrentNav} />
        <main className={cn(
          "flex-1 overflow-hidden relative",
          isMobile ? "w-full" : ""
        )}>
          {/* Editor core permanece sempre em memória */}
          <EditorCore />
          {/* Conteúdo atual da rota */}
          <div className="w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
