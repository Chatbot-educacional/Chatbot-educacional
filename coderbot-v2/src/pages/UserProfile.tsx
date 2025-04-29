// src/pages/UserProfile.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "@/hooks/useUserData";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, BookOpen, Calendar, LogOut, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pb } from "@/integrations/pocketbase/client";
import { toast } from "sonner";

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

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-8 max-w-4xl">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded"></div>
          <div className="h-[400px] bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-8 max-w-4xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="flex-shrink-0"
            title="Voltar ao chat"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <ProfileHeader
            isEditing={isEditing}
            onEditToggle={() => setIsEditing(!isEditing)}
          />
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Informações do Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center pb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={profile?.avatar_url || "/placeholder.svg"}
                  alt="User Avatar"
                />
                <AvatarFallback>
                  {profile?.full_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{profile?.full_name || "Nome não definido"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{profile?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span>Estudante</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  Membro desde{' '}
                  {new Date(profile?.created_at || "").toLocaleDateString(
                    "pt-BR"
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-5">
          <ProfileForm isEditing={isEditing} onSaved={() => setIsEditing(false)} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
