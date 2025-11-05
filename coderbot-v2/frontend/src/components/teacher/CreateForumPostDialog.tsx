import { useState, useRef } from 'react';
import { Loader2, Plus, Link2, FileText, X, Target, MessageCircle, Code, BookOpen, Music, Sparkles, ClipboardList, Zap, LayoutDashboard, MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import {
  ClassForumPostType,
  CLASS_FORUM_TYPES,
  ClassForumLink,
  createClassForumPost,
  MissionType,
  ModuleType,
  createClassMission,
} from '@/integrations/pocketbase/client';

interface CreateForumPostDialogProps {
  classId: string;
  onPostCreated?: () => void;
}

const forumTypeLabels: Record<ClassForumPostType, string> = {
  aviso: 'Aviso',
  info: 'Info',
  conteudo: 'Conteúdo',
  arquivos: 'Arquivos',
  links: 'Links',
  mensagens: 'Mensagens',
  atividade: 'Atividade',
};

const forumTypeDescriptions: Record<ClassForumPostType, string> = {
  aviso: 'Comunicados importantes e urgentes',
  info: 'Informações gerais da turma',
  conteudo: 'Materiais didáticos e recursos',
  arquivos: 'Uploads de documentos e materiais',
  links: 'Referências e recursos externos',
  mensagens: 'Mensagens gerais e discussões',
  atividade: 'Lançar atividades e missões para os alunos',
};

const missionTypeIcons: Record<MissionType, React.ReactNode> = {
  chat_interaction: <MessageCircle className="h-4 w-4" />,
  code_execution: <Code className="h-4 w-4" />,
  exercise_completion: <BookOpen className="h-4 w-4" />,
  notes_creation: <FileText className="h-4 w-4" />,
  whiteboard_interaction: <LayoutDashboard className="h-4 w-4" />,
  custom: <Sparkles className="h-4 w-4" />,
};

const missionTypeLabels: Record<MissionType, string> = {
  chat_interaction: 'Conversa com IA',
  code_execution: 'Execução de Código',
  exercise_completion: 'Exercícios',
  notes_creation: 'Criação de Anotações',
  whiteboard_interaction: 'Interação no Quadro',
  custom: 'Personalizada',
};

const missionTypeDescriptions: Record<MissionType, string> = {
  chat_interaction: 'Enviar mensagens para a IA e receber respostas',
  code_execution: 'Executar código no ambiente de desenvolvimento',
  exercise_completion: 'Completar exercícios práticos',
  notes_creation: 'Criar e salvar anotações textuais',
  whiteboard_interaction: 'Desenhar e interagir com o quadro branco',
  custom: 'Atividade personalizada definida pelo professor',
};

const moduleTypeIcons: Record<ModuleType, React.ReactNode> = {
  chat: <MessageSquare className="h-4 w-4" />,
  notes: <FileText className="h-4 w-4" />,
  quadro: <LayoutDashboard className="h-4 w-4" />,
  ide: <Code className="h-4 w-4" />,
  general: <Target className="h-4 w-4" />,
};

const moduleTypeLabels: Record<ModuleType, string> = {
  chat: 'Chat com IA',
  notes: 'Bloco de Notas',
  quadro: 'Quadro Branco',
  ide: 'Editor de Código (IDE)',
  general: 'Geral',
};

const moduleTypeDescriptions: Record<ModuleType, string> = {
  chat: 'Atividade relacionada ao módulo de chat com a IA',
  notes: 'Atividade relacionada ao bloco de anotações textuais',
  quadro: 'Atividade relacionada ao quadro branco colaborativo',
  ide: 'Atividade relacionada ao editor de código integrado',
  general: 'Atividade não específica de um módulo',
};

export const CreateForumPostDialog = ({ classId, onPostCreated }: CreateForumPostDialogProps) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<ClassForumPostType>('mensagens');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [links, setLinks] = useState<ClassForumLink[]>([]);
  const [linkInput, setLinkInput] = useState({ url: '', label: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado para missões
  const [missionType, setMissionType] = useState<MissionType>('chat_interaction');
  const [moduleType, setModuleType] = useState<ModuleType>('general');
  const [missionTarget, setMissionTarget] = useState(20);
  const [missionReward, setMissionReward] = useState(100);
  const [missionDescription, setMissionDescription] = useState('');

  const resetForm = () => {
    setTitle('');
    setContent('');
    setType('mensagens');
    setAttachments([]);
    setLinks([]);
    setLinkInput({ url: '', label: '' });
    setMissionType('chat_interaction');
    setModuleType('general');
    setMissionTarget(20);
    setMissionReward(100);
    setMissionDescription('');
  };

  const handleAddLink = () => {
    const url = linkInput.url.trim();
    if (!url) {
      toast.message('Digite uma URL válida');
      return;
    }

    const newLink: ClassForumLink = {
      url,
      label: linkInput.label.trim() || url,
    };

    setLinks([...links, newLink]);
    setLinkInput({ url: '', label: '' });
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const totalSize = [...attachments, ...newFiles].reduce((acc, file) => acc + file.size, 0);

    // Limite de 50MB total
    if (totalSize > 52428800) {
      toast.error('O tamanho total dos arquivos não pode exceder 50MB');
      return;
    }

    setAttachments([...attachments, ...newFiles]);
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.message('Digite um título para o post');
      return;
    }

    // Validação específica para atividades
    if (type === 'atividade') {
      if (missionTarget <= 0) {
        toast.error('A meta da missão deve ser maior que zero');
        return;
      }
      if (missionReward < 0) {
        toast.error('Os pontos de recompensa não podem ser negativos');
        return;
      }
      if (!missionDescription.trim()) {
        toast.error('Digite a descrição da missão');
        return;
      }
    }

    setSubmitting(true);

    try {
      // Se for uma atividade
      if (type === 'atividade') {
        // Criar missão tradicional
        await createClassMission({
          classId,
          title: title.trim(),
          description: missionDescription.trim(),
          type: missionType,
          module_type: moduleType,
          target_value: missionTarget,
          reward_points: missionReward,
        });

        toast.success('Missão criada e publicada no fórum com sucesso!');
      } else {
        // Para outros tipos, criar post normal
        await createClassForumPost({
          classId,
          title: title.trim(),
          content: content.trim() || undefined,
          type,
          attachments: attachments.length > 0 ? attachments : undefined,
          links: links.length > 0 ? links : undefined,
        });

        toast.success('Post criado com sucesso!');
      }

      resetForm();
      setOpen(false);
      onPostCreated?.();
    } catch (error) {
      console.error('Erro ao criar post:', error);
      toast.error('Não foi possível criar o post. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Criar Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-5xl w-full">
        <DialogHeader>
          <DialogTitle>Criar novo post no fórum</DialogTitle>
          <DialogDescription>
            Compartilhe avisos, materiais, links e mensagens com os alunos da turma.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Tipo de post */}
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de post *</Label>
            <Select value={type} onValueChange={(value) => setType(value as ClassForumPostType)}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CLASS_FORUM_TYPES.map((forumType) => (
                  <SelectItem key={forumType} value={forumType}>
                    <div className="flex flex-col">
                      <span className="font-medium">{forumTypeLabels[forumType]}</span>
                      <span className="text-xs text-muted-foreground">
                        {forumTypeDescriptions[forumType]}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Digite o título do post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              disabled={submitting}
            />
            <p className="text-xs text-muted-foreground">{title.length}/120 caracteres</p>
          </div>

          {/* Conteúdo */}
          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo</Label>
            <SimpleEditor
              value={content}
              onChange={setContent}
              readOnly={submitting}
              placeholder="Digite o conteúdo do post (opcional)"
            />
            <p className="text-xs text-muted-foreground">
              Use a barra de ferramentas para formatar o texto, adicionar listas e links.
            </p>
          </div>

          {/* Configurações específicas para atividades/missões */}
          {type === 'atividade' && (
            <div className="space-y-4 p-5 border-2 border-primary/20 rounded-xl bg-gradient-to-br from-primary/5 via-background to-purple-500/5 backdrop-blur-sm">
              <div className="flex items-center gap-3 pb-2 border-b border-primary/10">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="text-base font-semibold">Configurações da Missão</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Configure o tipo de missão, meta e recompensa
                  </p>
                </div>
              </div>

              {/* Tipo de Missão */}
                  <div className="space-y-2">
                    <Label htmlFor="mission-type" className="flex items-center gap-2">
                      Tipo de missão *
                    </Label>
                    <Select value={missionType} onValueChange={(value) => setMissionType(value as MissionType)}>
                      <SelectTrigger id="mission-type" className="h-auto py-2.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(['chat_interaction', 'code_execution', 'exercise_completion', 'notes_creation', 'whiteboard_interaction', 'custom'] as MissionType[]).map((type) => (
                          <SelectItem key={type} value={type} className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 rounded bg-primary/10">
                                {missionTypeIcons[type]}
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="font-medium">{missionTypeLabels[type]}</span>
                                <span className="text-xs text-muted-foreground">
                                  {missionTypeDescriptions[type]}
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Módulo Relacionado */}
                  <div className="space-y-2">
                    <Label htmlFor="module-type" className="flex items-center gap-2">
                      Módulo relacionado
                    </Label>
                    <Select value={moduleType} onValueChange={(value) => setModuleType(value as ModuleType)}>
                      <SelectTrigger id="module-type" className="h-auto py-2.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(['chat', 'notes', 'quadro', 'ide', 'general'] as ModuleType[]).map((mod) => (
                          <SelectItem key={mod} value={mod} className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 rounded bg-primary/10">
                                {moduleTypeIcons[mod]}
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="font-medium">{moduleTypeLabels[mod]}</span>
                                <span className="text-xs text-muted-foreground">
                                  {moduleTypeDescriptions[mod]}
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Meta e Recompensa */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="mission-target" className="flex items-center gap-2">
                        <Target className="h-3.5 w-3.5" />
                        Meta da missão *
                      </Label>
                      <Input
                        id="mission-target"
                        type="number"
                        placeholder="Ex: 20"
                        value={missionTarget}
                        onChange={(e) => setMissionTarget(parseInt(e.target.value) || 1)}
                        min={1}
                        disabled={submitting}
                        className="h-11"
                      />
                      <p className="text-xs text-muted-foreground">
                        Quantidade de ações para completar
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mission-reward" className="flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                        Pontos de recompensa *
                      </Label>
                      <Input
                        id="mission-reward"
                        type="number"
                        placeholder="Ex: 100"
                        value={missionReward}
                        onChange={(e) => setMissionReward(parseInt(e.target.value) || 0)}
                        min={0}
                        disabled={submitting}
                        className="h-11"
                      />
                      <p className="text-xs text-muted-foreground">
                        Pontos concedidos ao completar
                      </p>
                    </div>
                  </div>

                  {/* Descrição da Missão */}
                  <div className="space-y-2">
                    <Label htmlFor="mission-description">Descrição da missão *</Label>
                    <Textarea
                      id="mission-description"
                      placeholder="Descreva detalhadamente o que os alunos precisam fazer para completar esta missão..."
                      value={missionDescription}
                      onChange={(e) => setMissionDescription(e.target.value)}
                      maxLength={500}
                      disabled={submitting}
                      rows={4}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      {missionDescription.length}/500 caracteres
                    </p>
                  </div>

                  {/* Preview da Missão */}
                  <div className="p-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5 backdrop-blur-sm">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-primary/10">
                        {missionTypeIcons[missionType]}
                      </span>
                      Preview da Missão
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Título:</span>
                        <span className="font-medium">{title || 'Sem título'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Tipo:</span>
                        <span className="font-medium">{missionTypeLabels[missionType]}</span>
                      </div>
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/50 backdrop-blur-sm border">
                          <Target className="h-3 w-3 text-primary" />
                          <span className="font-medium">{missionTarget} ações</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/50 backdrop-blur-sm border">
                          <Sparkles className="h-3 w-3 text-amber-500" />
                          <span className="font-medium">{missionReward} pontos</span>
                        </div>
                      </div>
                      {missionDescription && (
                        <div className="pt-2 border-t border-border/50">
                          <span className="text-muted-foreground block mb-1">Descrição:</span>
                          <p className="text-foreground/90 text-xs leading-relaxed">
                            {missionDescription}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
            </div>
          )}

          {/* Anexos */}
          <div className="space-y-2">
            <Label>Arquivos anexos (opcional)</Label>
            <div className="flex gap-2">
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                className="hidden"
                disabled={submitting}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={submitting || attachments.length >= 10}
                className="w-full"
              >
                <FileText className="mr-2 h-4 w-4" />
                Adicionar arquivos
              </Button>
            </div>
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/40 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAttachment(index)}
                      disabled={submitting}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">
                  {attachments.length}/10 arquivos · Total:{' '}
                  {(attachments.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="space-y-2">
            <Label>Links (opcional)</Label>
            <div className="space-y-2 rounded-lg border border-dashed border-border/60 p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="URL do link"
                  value={linkInput.url}
                  onChange={(e) => setLinkInput({ ...linkInput, url: e.target.value })}
                  disabled={submitting}
                />
                <Input
                  placeholder="Título (opcional)"
                  value={linkInput.label}
                  onChange={(e) => setLinkInput({ ...linkInput, label: e.target.value })}
                  disabled={submitting}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddLink}
                  disabled={submitting || !linkInput.url.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {links.length > 0 && (
                <div className="mt-3 space-y-2">
                  {links.map((link, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/40 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <Link2 className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{link.label}</span>
                          <span className="text-xs text-muted-foreground">{link.url}</span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveLink(index)}
                        disabled={submitting}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando...
              </>
            ) : (
              'Criar Post'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};




