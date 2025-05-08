import { User, MessageSquare, Code, BarChart3, GraduationCap, FileText, Presentation, GitBranch, ClipboardEdit} from "lucide-react";
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
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/integrations/pocketbase/client";
import { toast } from "sonner";

type AppSidebarProps = {
  currentNav: string;
  onNavChange: (nav: string) => void;
};

export const AppSidebar = ({ currentNav, onNavChange }: AppSidebarProps) => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      roles: ["teacher", "admin"]
    },
    // Show student dashboard for students (can also be visible to teachers/admins)
    { 
      id: "student", 
      label: "Aluno", 
      icon: GraduationCap, 
      accessKey: "s", 
      path: "/dashboard/student",
      roles: ["student", "teacher", "admin"]
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
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Carregando...</SidebarGroupLabel>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <SidebarContent>
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
                  >
                    <Link 
                      to={item.path}
                      onClick={() => onNavChange(item.id)}
                    >
                      <item.icon className="h-4 w-4" />
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
                >
                  <Link to="/profile">
                    <User className="h-4 w-4" />
                    <span>Meu Perfil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};
