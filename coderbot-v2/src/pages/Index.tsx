
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
    if (location.pathname === "/" || location.pathname === "") {
      setCurrentNav("chat");
    } else if (location.pathname === "/playground") {
      setCurrentNav("playground");
    } else if (location.pathname === "/exercises") {
      setCurrentNav("exercises");
    } else if (location.pathname === "/metrics") {
      setCurrentNav("metrics");
    } else if (location.pathname === "/teacher") {
      setCurrentNav("teacher");
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
