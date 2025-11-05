import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  FileText,
  Plus,
  Search,
  Tag,
  Calendar,
  Clock,
  Save,
  Share,
  Star,
  FolderOpen,
  MoreHorizontal,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Loader2
} from "lucide-react";
import BlockNoteEditor from "@/components/notes/BlockNoteEditor";
import { useNotes, type Note, type NoteFilters } from "@/hooks/useNotes";
import { useMissionTracker } from "@/hooks/useMissionTracker";
import { toast } from "sonner";

const SUBJECTS = [
  "Matemática",
  "Programação",
  "Algoritmos",
  "Estrutura de Dados",
  "Banco de Dados",
  "Redes",
  "Segurança",
  "IA & Machine Learning",
  "Outros"
];

const SAMPLE_TAGS = [
  "aula",
  "exercício",
  "projeto",
  "dúvida",
  "resumo",
  "importante",
  "revisão",
  "prática"
];

export default function NotesPage() {
  const {
    notes,
    isLoading,
    error,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    togglePublic,
    filterNotes,
    getNoteById,
  } = useNotes();

  // Mission Tracker - Rastreamento automático de progresso das missões
  // Passa undefined para buscar missões de todas as turmas do usuário automaticamente
  const { trackNoteCreation } = useMissionTracker(undefined);

  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [filters, setFilters] = useState<NoteFilters>({});
  const [isEditing, setIsEditing] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");

  const currentNoteId = currentNote?.id;
  const currentNoteUpdatedAt = currentNote?.updatedAt?.getTime() ?? null;

  useEffect(() => {
    if (!currentNoteId) {
      return;
    }

    const latest = notes.find(note => note.id === currentNoteId);

    if (!latest) {
      setCurrentNote(null);
      setIsEditing(false);
      return;
    }

    if (isEditing) {
      return;
    }

    const latestUpdatedAt = latest.updatedAt.getTime();
    if (currentNoteUpdatedAt === null || latestUpdatedAt !== currentNoteUpdatedAt) {
      setCurrentNote(latest);
    }
  }, [notes, currentNoteId, currentNoteUpdatedAt, isEditing]);

  // Filtered notes based on current filters
  const filteredNotes = useMemo(() => {
    return filterNotes(filters);
  }, [filterNotes, filters]);

  const handleCreateNewNote = async () => {
    try {
      const newNote = await createNote({
        title: newNoteTitle || "Nova Anotação",
        content: "",
        subject: filters.subject,
        tags: filters.tags || [],
        isFavorite: false,
        isPublic: false,
      });

      setCurrentNote(newNote);
      setNewNoteTitle("");
      setIsEditing(true);
      toast.success("Nova anotação criada!");
    } catch (error) {
      toast.error("Erro ao criar anotação");
    }
  };

  const handleSaveNote = async (content: string) => {
    if (!currentNote) return;

    try {
      const updated = await updateNote(currentNote.id, { content });
      if (updated) {
        setCurrentNote(updated);
        setIsEditing(false);
        
        // Rastrear criação/atualização de nota para progresso da missão
        await trackNoteCreation(currentNote.title, content.length);
      }
      toast.success("Anotação salva!");
    } catch (error) {
      toast.error("Erro ao salvar anotação");
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      if (currentNote?.id === noteId) {
        setCurrentNote(null);
        setIsEditing(false);
      }
      toast.success("Anotação excluída!");
    } catch (error) {
      toast.error("Erro ao excluir anotação");
    }
  };

  const handleSelectNote = (note: Note) => {
    setCurrentNote(note);
    setIsEditing(false);
  };

  const handleToggleFavorite = async (noteId: string) => {
    try {
      await toggleFavorite(noteId);
      if (currentNote?.id === noteId) {
        setCurrentNote(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : prev);
      }
      toast.success("Status de favorito atualizado!");
    } catch (error) {
      toast.error("Erro ao atualizar favorito");
    }
  };

  const handleTogglePublic = async (noteId: string) => {
    try {
      await togglePublic(noteId);
      if (currentNote?.id === noteId) {
        setCurrentNote(prev => prev ? { ...prev, isPublic: !prev.isPublic } : prev);
      }
      toast.success("Visibilidade atualizada!");
    } catch (error) {
      toast.error("Erro ao atualizar visibilidade");
    }
  };

  // Update filters
  const updateFilters = (newFilters: Partial<NoteFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 pb-32">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Bloco de Notas </h1>
                <p className="text-muted-foreground">
                  Carregando suas anotações...
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Skeleton className="h-[400px] w-full" />
            </div>
            <div className="lg:col-span-3">
              <Skeleton className="h-[600px] w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-destructive mb-2">Erro ao carregar anotações</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Tentar novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200/20 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200/20 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 pb-32">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Bloco de Notas </h1>
              <p className="text-muted-foreground">
                Organize suas anotações de estudo de forma inteligente
              </p>
            </div>
          </div>
          <Button onClick={handleCreateNewNote} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Anotação
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-32">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Buscar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Buscar anotações..."
                  value={filters.searchQuery || ""}
                  onChange={(e) => updateFilters({ searchQuery: e.target.value })}
                  className="mb-4"
                />

                {/* Subject Filter */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Matéria</h4>
                  <div className="flex flex-wrap gap-1">
                    {SUBJECTS.map(subject => (
                      <Badge
                        key={subject}
                        variant={filters.subject === subject ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => updateFilters({
                          subject: filters.subject === subject ? undefined : subject
                        })}
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Tags Filter */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {SAMPLE_TAGS.map(tag => (
                      <Badge
                        key={tag}
                        variant={(filters.tags || []).includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const currentTags = filters.tags || [];
                          updateFilters({
                            tags: currentTags.includes(tag)
                              ? currentTags.filter(t => t !== tag)
                              : [...currentTags, tag]
                          });
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Minhas Anotações ({filteredNotes.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {filteredNotes.map(note => (
                      <div
                        key={note.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          currentNote?.id === note.id
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleSelectNote(note)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{note.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              {note.subject && (
                                <Badge variant="secondary" className="text-xs">
                                  {note.subject}
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {formatDate(note.updatedAt)}
                              </span>
                            </div>
                            {note.tags.length > 0 && (
                              <div className="flex gap-1 mt-2">
                                {note.tags.slice(0, 2).map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {note.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{note.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {note.isFavorite && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite(note.id);
                              }}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentNote ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Edit3 className="h-5 w-5" />
                        {currentNote.title}
                      </CardTitle>
                      <CardDescription>
                        Criado em {formatDate(currentNote.createdAt)} •
                        Atualizado em {formatDate(currentNote.updatedAt)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleFavorite(currentNote.id)}
                      >
                        <Star className={`h-4 w-4 ${currentNote.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteNote(currentNote.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {currentNote.subject && (
                    <Badge variant="secondary">{currentNote.subject}</Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <BlockNoteEditor
                    initialContent={currentNote.content}
                    onChange={(content) => {
                      // Apenas atualizar o estado local se necessário
                      setCurrentNote(prev => prev ? { ...prev, content } : null);
                      setIsEditing(true);
                    }}
                    onSave={() => handleSaveNote(currentNote.content)}
                    placeholder="Comece a escrever suas anotações de estudo..."
                  />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nenhuma anotação selecionada</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Selecione uma anotação existente ou crie uma nova para começar
                  </p>
                  <Button onClick={handleCreateNewNote}>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeira Anotação
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
