
import { useState, useEffect } from "react";
import { MessageSquare, Code, BarChart3, GraduationCap, FileText, Menu, X, User, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
  accessKey?: string;
  to?: string;
};

const SidebarItem = ({ icon: Icon, label, active, onClick, accessKey, to }: SidebarItemProps) => {
  const Component = to ? Link : "button";
  
  return (
    <Component
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium w-full transition-all",
        active
          ? "bg-coderbot-purple text-white"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
      onClick={onClick}
      accessKey={accessKey}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Component>
  );
};

type SidebarProps = {
  onNavChange: (nav: string) => void;
  currentNav: string;
};

export const Sidebar = ({ onNavChange, currentNav }: SidebarProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);
  const location = useLocation();
  
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const navItems = [
    { id: "chat", label: "Chat", icon: MessageSquare, accessKey: "c" , to: "/chat"},
    { id: "playground", label: "Playground", icon: Code, accessKey: "p" , to: "/playground" },
    { id: "exercises", label: "Exercícios", icon: FileText, accessKey: "e" , to: "/exercises" },
    { id: "metrics", label: "Métricas", icon: BarChart3, accessKey: "m" , to: "/metrics" },
    { id: "teacher", label: "Professor", icon: GraduationCap, accessKey: "t", to: "/teacher" },
    {id: "whiteboard", label: "Quadro", icon: LayoutDashboard, accessKey: "q", to: "/whiteboard" },
  ];

  return (
    <>
      {isMobile && (
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 bg-coderbot-purple text-white p-2 rounded-md shadow-md"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      <div 
        className={cn(
          "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300",
          isMobile ? "fixed z-40 left-0 top-0" : "w-64",
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0",
          isMobile && isOpen ? "w-[80%] max-w-[250px]" : ""
        )}
      >
        <div className="p-4 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-coderbot-purple">Learn Code Bot</h1>
        </div>
        <div className="flex-1 p-3 overflow-y-auto">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={item.label} 
                active={location.pathname === item.to}
                onClick={() => {
                  if (isMobile) setIsOpen(false);
                  onNavChange(item.id);
                }}
                to={item.to}
                accessKey={item.accessKey}
              />
            ))}
            

          </nav>

        </div>
        </div>
        <div className="p-3 border-t border-sidebar-border">
          <div className="mb-3">
            <SidebarItem
              icon={User}
              label="Meu Perfil"
              active={location.pathname === "/profile"}
              onClick={() => {
                if (isMobile) setIsOpen(false);
              }}
              to="/profile"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            <p>Learn Code Bot v1.0</p>
            <p>©2025 Educational Platform</p>
          </div>
        </div>
     
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
