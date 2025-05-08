// src/pages/UserProfile.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "@/hooks/useUserData";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, ArrowLeft, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pb, startGithubOAuth } from "@/integrations/pocketbase/client";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { profile, loading } = useUserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      pb.authStore.clear();
      toast.success("Logout realizado com sucesso!");
      navigate("/auth");
    } catch (err: any) {
      console.error("Logout error:", err);
      toast.error("Erro ao fazer logout");
    }
  };

  // Handler real para conectar ao GitHub via PocketBase
  const handleGithubConnect = () => {
    startGithubOAuth();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 space-y-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-14 w-[250px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-4xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard/chat")}
            className="flex-shrink-0"
            title="Voltar ao dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Perfil</h1>
        </div>
        <div className="flex gap-2">
          {/* Botão de conectar GitHub via PocketBase OAuth */}
          <Button
            variant="outline"
            onClick={handleGithubConnect}
            className="flex items-center gap-2"
            size="sm"
          >
            <Github className="h-4 w-4" />
            Conectar GitHub
          </Button>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
            size="sm"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <ProfileHeader
          isEditing={isEditing}
          onEditToggle={() => setIsEditing(!isEditing)}
        />
        
        <ProfileForm 
          isEditing={isEditing} 
          onSaved={() => setIsEditing(false)} 
        />
      </div>
    </div>
  );
};

export default UserProfile;
