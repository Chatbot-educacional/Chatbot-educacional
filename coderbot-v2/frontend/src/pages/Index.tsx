import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const Index = () => {
  const location = useLocation();
  const [currentNav, setCurrentNav] = useState<string>("chat");
  const isMobile = useIsMobile();
  
  // Update currentNav based on the current route
  useEffect(() => {
    const path = location.pathname;
    
    if (path.includes("chat")) {
      setCurrentNav("chat");
    } else if (path.includes("playground")) {
      setCurrentNav("playground");
    } else if (path.includes("exercises")) {
      setCurrentNav("exercises");
    } else if (path.includes("metrics")) {
      setCurrentNav("metrics");
    } else if (path.includes("teacher")) {
      setCurrentNav("teacher");
    } else if (path.includes("student")) {
      setCurrentNav("student");
    } else if (path.includes("whiteboard")) {
      setCurrentNav("whiteboard");
    } else if (path.includes("mermaid")) {
      setCurrentNav("mermaid");
    } else if (path.includes("flashcard")) {
      setCurrentNav("flashcard");
    }
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
        <AppSidebar currentNav={currentNav} onNavChange={setCurrentNav} />
        <main className={cn(
          "flex-1 overflow-hidden",
          isMobile ? "w-full" : ""
        )}>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
