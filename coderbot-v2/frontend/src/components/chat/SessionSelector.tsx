import { useState, useEffect } from "react";
import { chatService } from "@/services/chat-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { MessageSquarePlus, Edit2, Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";

// Match the actual structure from PocketBase
export interface SessionInfo {
  id: string;
  title: string;
  created: string;
  usuario: string; // relation para users
  messageIDs: string[];
}

interface SessionSelectorProps {
  currentSessionId: string;
  onSessionChange: (sessionId: string) => void;
  onNewSession: () => void;
}

export const SessionSelector: React.FC<SessionSelectorProps> = ({
  currentSessionId,
  onSessionChange,
  onNewSession
}) => {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    loadSessions();
  }, [currentSessionId]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const userSessions = await chatService.getUserSessions();
      setSessions(userSessions);
    } catch (error) {
      console.error("Error loading sessions:", error);
      toast.error("Erro ao carregar sessões");
    } finally {
      setLoading(false);
    }
  };

  const handleEditTitle = async (sessionId: string) => {
    if (!editTitle.trim()) {
      setEditingSessionId(null);
      return;
    }

    try {
      await chatService.updateSessionTitle(sessionId, editTitle);
      setSessions(prev => 
        prev.map(session => 
          session.id === sessionId 
            ? { ...session, title: editTitle } 
            : session
        )
      );
      toast.success("Título atualizado");
    } catch (error) {
      console.error("Error updating session title:", error);
      toast.error("Erro ao atualizar título");
    } finally {
      setEditingSessionId(null);
    }
  };

  const startEditing = (session: SessionInfo) => {
    setEditingSessionId(session.id);
    setEditTitle(session.title);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          Sessões de Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Suas Sessões</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-between items-center mb-4">
          <Button 
            onClick={onNewSession} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <MessageSquarePlus size={16} />
            Nova Conversa
          </Button>
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <p className="text-center py-4 text-muted-foreground">Carregando sessões...</p>
          ) : sessions.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">Nenhuma sessão encontrada</p>
          ) : (
            sessions.map(session => (
              <div 
                key={session.id} 
                className={`p-3 rounded-md border flex justify-between items-center ${
                  session.id === currentSessionId ? 'bg-muted border-primary' : ''
                }`}
              >
                {editingSessionId === session.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      autoFocus
                      className="flex-1"
                    />
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleEditTitle(session.id)}
                    >
                      <Check size={16} />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div 
                      className="flex-1 cursor-pointer" 
                      onClick={() => onSessionChange(session.id)}
                    >
                      <p className="font-medium">{session.title || "Conversa sem título"}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(session.created).toLocaleString()}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => startEditing(session)}
                    >
                      <Edit2 size={16} />
                    </Button>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        <DialogClose asChild>
          <Button className="w-full mt-2">Fechar</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};