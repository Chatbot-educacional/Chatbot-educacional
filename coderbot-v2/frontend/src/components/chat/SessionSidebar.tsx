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
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MessageSquarePlus, Edit2, Check, Clock, Search, MoreVertical, Trash2, PenLine } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { SessionInfo } from "@/components/chat/SessionSelector";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

interface SessionSidebarProps {
  currentSessionId: string;
  onSessionChange: (sessionId: string) => void;
  onNewSession: () => void;
}

export const SessionSidebar: React.FC<SessionSidebarProps> = ({
  currentSessionId,
  onSessionChange,
  onNewSession
}) => {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [newSessionTitle, setNewSessionTitle] = useState("Nova Conversa");
  const [showNewSessionDialog, setShowNewSessionDialog] = useState(false);
  const { t } = useTranslation();

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

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await chatService.deleteSession(sessionId);
      setSessions(prev => prev.filter(session => session.id !== sessionId));
      
      // If the deleted session was the current one, create a new session
      if (sessionId === currentSessionId) {
        onNewSession();
      }
      
      toast.success("Sessão excluída com sucesso");
      setSessionToDelete(null);
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("Erro ao excluir sessão");
    }
  };

  const handleCreateNamedSession = () => {
    onNewSession();
    // The title will be updated after the session is created
    setTimeout(() => {
      if (currentSessionId) {
        chatService.updateSessionTitle(currentSessionId, newSessionTitle);
      }
    }, 500);
    setShowNewSessionDialog(false);
  };

  const startEditing = (session: SessionInfo, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditTitle(session.title || "");
  };

  const filteredSessions = sessions.filter(session => 
    (session.title || "Conversa sem título").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full border-r bg-background">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-2">{t('sidebar.yourConversations')}</h2>
        
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('sidebar.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={onNewSession} 
            className="flex-1 flex items-center justify-center gap-2"
          >
            <MessageSquarePlus size={16} />
            {t('sidebar.newConversation')}
          </Button>
          
          <Dialog open={showNewSessionDialog} onOpenChange={setShowNewSessionDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center justify-center">
                <PenLine size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('sidebar.newConversationTitle')}</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <label className="text-sm font-medium mb-2 block">
                  {t('sidebar.conversationTitleLabel')}
                </label>
                <Input
                  value={newSessionTitle}
                  onChange={(e) => setNewSessionTitle(e.target.value)}
                  placeholder={t('sidebar.conversationTitleLabel')}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{t('sidebar.cancel')}</Button>
                </DialogClose>
                <Button onClick={handleCreateNamedSession}>{t('sidebar.create')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <p className="text-center py-4 text-muted-foreground">{t('sidebar.loading')}</p>
        ) : filteredSessions.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">
            {searchQuery ? t('sidebar.noneFound') : t('sidebar.noneYet')}
          </p>
        ) : (
          <div className="space-y-1">
            <AnimatePresence initial={false}>
            {filteredSessions.map(session => (
              <motion.div
                key={session.id} 
                layout
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.5 } }}
                exit={{ scale: 0.9, opacity: 0, y: 30, transition: { duration: 0.2 } }}
                transition={{ layout: { type: 'spring', bounce: 0.3, duration: 0.5 } }}
                onClick={() => onSessionChange(session.id)}
                className={`p-2 rounded-md hover:bg-accent/50 cursor-pointer transition-colors group ${
                  session.id === currentSessionId ? 'bg-accent' : ''
                }`}
              >
                {editingSessionId === session.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleEditTitle(session.id);
                        }
                      }}
                      className="h-8 text-sm"
                    />
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTitle(session.id);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <Check size={14} />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="truncate flex-1">
                      <p className="font-medium text-sm truncate">
                        {session.title || t('sidebar.untitled')}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock size={12} className="mr-1" />
                        {new Date(session.created).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={(e) => e.stopPropagation()}
                          className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100"
                        >
                          <MoreVertical size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          startEditing(session, e);
                        }}>
                          <Edit2 size={14} className="mr-2" />
                          {t('sidebar.rename')}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSessionToDelete(session.id);
                          }}
                        >
                          <Trash2 size={14} className="mr-2" />
                          {t('sidebar.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      
      {/* Delete confirmation dialog */}
      <Dialog open={!!sessionToDelete} onOpenChange={(open) => !open && setSessionToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('sidebar.deleteTitle')}</DialogTitle>
          </DialogHeader>
          <p>{t('sidebar.deleteConfirm')}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSessionToDelete(null)}>
              {t('sidebar.cancel')}
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => sessionToDelete && handleDeleteSession(sessionToDelete)}
            >
              {t('sidebar.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};