
import { User, MessageSquare, Code, BarChart3, GraduationCap, FileText, Presentation } from "lucide-react";
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
import Whiteboard from "@/pages/Whiteboard";

type AppSidebarProps = {
  currentNav: string;
  onNavChange: (nav: string) => void;
};

export const AppSidebar = ({ currentNav, onNavChange }: AppSidebarProps) => {
  const location = useLocation();

  // Map navigation items to their corresponding routes
  const mainNavItems = [
    { id: "chat", label: "Chat", icon: MessageSquare, accessKey: "c", path: "/" },
    { id: "playground", label: "Playground", icon: Code, accessKey: "p", path: "/playground" },
    { id: "exercises", label: "Exercícios", icon: FileText, accessKey: "e", path: "/exercises" },
    { id: "metrics", label: "Métricas", icon: BarChart3, accessKey: "m", path: "/metrics" },
    { id: "teacher", label: "Professor", icon: GraduationCap, accessKey: "t", path: "/teacher" },
    { id: "whiteboard", label: "Quadro", icon: Presentation, accessKey: "w", path: "/whiteboard" },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
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
