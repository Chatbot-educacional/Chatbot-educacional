
import { Button } from "@/components/ui/button";
import { User, Edit, Save, X } from "lucide-react";

interface ProfileHeaderProps {
  isEditing: boolean;
  onEditToggle: () => void;
}

export function ProfileHeader({ isEditing, onEditToggle }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-coderbot-purple" />
        <h1 className="text-2xl font-bold">Perfil do Usuário</h1>
      </div>
      
      <Button 
        onClick={onEditToggle}
        variant={isEditing ? "outline" : "default"} 
        className="w-full md:w-auto"
      >
        {isEditing ? (
          <>
            <X className="mr-2 h-4 w-4" />
            Cancelar Edição
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
