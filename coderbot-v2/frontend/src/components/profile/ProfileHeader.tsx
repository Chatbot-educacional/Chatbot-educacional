import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Edit, Save, X, Sparkles } from "lucide-react";
import { useUserData } from "@/hooks/useUserData";

interface ProfileHeaderProps {
  isEditing: boolean;
  onEditToggle: () => void;
}

export function ProfileHeader({ isEditing, onEditToggle }: ProfileHeaderProps) {
  const { profile } = useUserData();
  
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-gradient-to-r from-primary/5 to-secondary/10 rounded-lg p-4 border">
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 border-2 border-primary/20">
          <AvatarImage src={profile?.avatar_url || undefined} alt="Profile" />
          <AvatarFallback className="bg-primary/10 text-primary">
            {profile?.name?.charAt(0) || <User />}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{profile?.name || "Usuário"}</h1>
            {profile?.role === "teacher" && (
              <span className="bg-amber-500/10 text-amber-600 text-xs rounded-full px-2 py-0.5 flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                Professor
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-sm">{profile?.email}</p>
        </div>
      </div>
      
      <Button 
        onClick={onEditToggle}
        variant={isEditing ? "outline" : "default"} 
        className="md:w-auto transition-all duration-200"
        size="sm"
      >
        {isEditing ? (
          <>
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </>
        ) : (
          <>
            <Edit className="mr-2 h-4 w-4" />
            Editar Perfil
          </>
        )}
      </Button>
    </div>
  );
}
