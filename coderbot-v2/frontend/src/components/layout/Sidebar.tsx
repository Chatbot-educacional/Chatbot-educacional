import { useState, useEffect } from "react";
import { MessageSquare, Code, BarChart3, GraduationCap, FileText, Menu, X, User, LayoutDashboard, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
  accessKey?: string;
  to?: string;
  isCollapsed: boolean;
};

const SidebarItem = ({ icon: Icon, label, active, onClick, accessKey, to, isCollapsed }: SidebarItemProps) => {
  const Component = to ? Link : "button";
  
  return (
    <Component
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium w-full transition-all group relative",
        active
          ? "bg-coderbot-purple text-white"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
      onClick={onClick}
      accessKey={accessKey}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span>{label}</span>}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
          {label}
        </div>
      )}
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
  const [isCollapsed, setIsCollapsed] = useState(false);
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
          isMobile && isOpen ? "w-[80%] max-w-[250px]" : "",
          isCollapsed && !isMobile ? "w-16" : ""
        )}
      >
        <div className="p-2 border-b border-sidebar-border">
          <div className="flex items-center justify-between gap-2">
            {!isCollapsed && <h1 className="text-xl font-bold text-coderbot-purple truncate">Learn Code Bot</h1>}
            {!isMobile && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-coderbot-purple hover:bg-coderbot-purple/90 text-white transition-colors"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
            )}
          </div>
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
                isCollapsed={isCollapsed}
              />
            ))}
          </nav>
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
              isCollapsed={isCollapsed}
            />
          </div>
          {!isCollapsed && (
            <div className="text-xs text-muted-foreground">
              <p>Learn Code Bot v1.0</p>
              <p>©2025 Educational Platform</p>
            </div>
          )}
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
