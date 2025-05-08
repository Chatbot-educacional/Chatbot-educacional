import { User, MessageSquare, Code, BarChart3, GraduationCap, FileText, Presentation, GitBranch, ClipboardEdit } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/integrations/pocketbase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type AppSidebarProps = {
  currentNav: string;
  onNavChange: (nav: string) => void;
};

export const AppSidebar = ({ currentNav, onNavChange }: AppSidebarProps) => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { state, isMobile } = useSidebar();

  useEffect(() => {
    // Get current user role
    const user = getCurrentUser();
    if (user) {
      setUserRole(user.role);
    }
    setIsLoading(false);
  }, []);

  // Map navigation items to their corresponding routes
  const mainNavItems = [
    { id: "chat", label: "Chat", icon: MessageSquare, accessKey: "c", path: "/dashboard/chat" },
    { id: "playground", label: "Playground", icon: Code, accessKey: "p", path: "/dashboard/playground" },
    { id: "exercises", label: "Exercícios", icon: FileText, accessKey: "e", path: "/dashboard/exercises" },
    { id: "metrics", label: "Métricas", icon: BarChart3, accessKey: "m", path: "/dashboard/metrics" },
    // Only show teacher dashboard for teachers and admins
    {
      id: "teacher",
      label: "Professor",
      icon: GraduationCap,
      accessKey: "t",
      path: "/dashboard/teacher",
      roles: ["teacher", "admin"],
    },
    // Show student dashboard for students (can also be visible to teachers/admins)
    {
      id: "student",
      label: "Aluno",
      icon: GraduationCap,
      accessKey: "s",
      path: "/dashboard/student",
      roles: ["student", "teacher", "admin"],
    },
    { id: "whiteboard", label: "Quadro", icon: Presentation, accessKey: "w", path: "/dashboard/whiteboard" },
    { id: "mermaid", label: "Diagramas", icon: GitBranch, accessKey: "d", path: "/dashboard/mermaid" },
    { id: "flashcard", label: "Flashcards", icon: ClipboardEdit, accessKey: "f", path: "/dashboard/flashcard" },
  ];

  // Filter items based on user role
  const filteredNavItems = mainNavItems.filter(item => {
    // If the item doesn't specify roles, show it to everyone
    if (!item.roles) return true;
    // If we don't know the user role yet or there's an error, hide role-specific items
    if (!userRole) return false;
    // Show the item if the user's role is in the item's roles array
    return item.roles.includes(userRole);
  });

  if (isLoading) {
    return (
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Carregando...</SidebarGroupLabel>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="flex flex-col items-center gap-2 p-2 border-b border-sidebar-border min-h-[72px]">
          <img
            src="/coderbot_colorfull.png"
            alt="Logo Coderbot"
            className="w-12 aspect-square mb-1 rounded-full shadow-lg transition-all duration-500 opacity-90 hover:opacity-100 hover:scale-105 object-contain mx-auto"
            style={{ animation: 'fadeInScale 0.7s' }}
          />
          <SidebarTrigger />
          {/* {state === "expanded" && (
            <span className="text-xl font-bold text-coderbot-purple truncate">Learn Code Bot</span>
          )} */}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredNavItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentNav === item.id}
                    tooltip={item.label}
                    className="transition-all duration-200 group hover:scale-105 hover:bg-coderbot-purple/20 focus:scale-105"
                  >
                    <Link
                      to={item.path}
                      onClick={() => onNavChange(item.id)}
                      className="flex items-center gap-2"
                    >
                      <item.icon className="h-5 w-5 transition-all duration-200 group-hover:text-coderbot-purple group-hover:scale-110" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/profile"}
                  tooltip="Meu Perfil"
                  className="flex items-center gap-2 transition-all duration-200 group hover:scale-105 hover:bg-coderbot-purple/20 focus:scale-105"
                >
                  <Link to="/profile" className="flex items-center gap-2 w-full">
                    <User className="h-5 w-5 transition-all duration-200 group-hover:text-coderbot-purple group-hover:scale-110" />
                    <span className={state === "collapsed" ? "sr-only" : ""}>Meu Perfil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            {state === "expanded" && (
              <div className="mt-4 text-xs text-muted-foreground">
                <p>Learn Code Bot v1.0</p>
                <p>©2025 Educational Platform</p>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};
