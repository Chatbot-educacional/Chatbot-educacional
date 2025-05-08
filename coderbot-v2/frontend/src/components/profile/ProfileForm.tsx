// src/components/ProfileForm.tsx
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Mail, User, Calendar, CheckCircle, XCircle, Briefcase, CalendarDays, School } from "lucide-react";
import { toast } from "sonner";
import { pb, getCurrentUser } from "@/integrations/pocketbase/client";
import { useUserData } from "@/hooks/useUserData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ProfileFormProps {
  isEditing: boolean;
  onSaved: () => void;
}

interface ProfileFormData {
  name: string;
  bio: string;
}

interface Invitation {
  id: string;
  classId: string;
  className: string;
  teacherName: string;
  status: 'pending' | 'accepted' | 'rejected';
  created: string;
}

export function ProfileForm({ isEditing, onSaved }: ProfileFormProps) {
  const { profile, loading } = useUserData();
  const [updating, setUpdating] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loadingInvitations, setLoadingInvitations] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormData>({
    defaultValues: {
      name: profile?.name || "",
      bio: profile?.bio || "",
    },
    mode: "onChange",
  });

  // Atualiza valores quando o profile carrega
  useEffect(() => {
    if (profile) {
      form.reset({ 
        name: profile.name || "", 
        bio: profile.bio || ""
      });
    }
  }, [profile, form]);

  // Buscar convites do usuário
  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const user = getCurrentUser();
        if (!user) return;

        const response = await pb.collection('invitations').getList(1, 50, {
          filter: `email = "${user.email}" && status = "pending"`,
          expand: 'class,class.createdBy',
          sort: '-created'
        });

        const mappedInvitations = response.items.map(item => ({
          id: item.id,
          classId: item.class,
          className: item.expand?.class?.name || 'Turma',
          teacherName: item.expand?.class?.expand?.createdBy?.name || 'Professor',
          status: item.status,
          created: new Date(item.created).toLocaleDateString()
        }));

        setInvitations(mappedInvitations);
      } catch (error) {
        console.error('Erro ao buscar convites:', error);
      } finally {
        setLoadingInvitations(false);
      }
    };

    fetchInvitations();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAcceptInvitation = async (invitationId: string, classId: string) => {
    try {
      // Primeiro atualiza o status do convite para 'accepted'
      await pb.collection('invitations').update(invitationId, {
        status: 'accepted'
      });

      // Depois cria uma inscrição do aluno na turma
      await pb.collection('class_enrollments').create({
        class: classId,
        student: pb.authStore.model?.id
      });

      // Atualiza o estado local
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));

      toast.success('Convite aceito com sucesso!');
    } catch (error) {
      console.error('Erro ao aceitar convite:', error);
      toast.error('Erro ao aceitar convite');
    }
  };

  const handleRejectInvitation = async (invitationId: string) => {
    try {
      await pb.collection('invitations').update(invitationId, {
        status: 'rejected'
      });

      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
      toast.success('Convite recusado');
    } catch (error) {
      console.error('Erro ao recusar convite:', error);
      toast.error('Erro ao recusar convite');
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!profile) return;
    setUpdating(true);
    
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('bio', data.bio);
      
      if (avatar) {
        formData.append('avatar', avatar);
      }

      // Atualiza o usuário no PocketBase
      await pb.collection("users").update(profile.id, formData);

      toast.success("Perfil atualizado com sucesso");
      onSaved();
    } catch (err: any) {
      console.error("Erro ao atualizar perfil:", err);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">Perfil</TabsTrigger>
        <TabsTrigger value="invitations" className="relative">
          Convites
          {invitations.length > 0 && (
            <Badge className="ml-2 absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
              {invitations.length}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? "Editar Perfil" : "Detalhes do Perfil"}
            </CardTitle>
            <CardDescription>
              {isEditing 
                ? "Atualize suas informações pessoais" 
                : "Suas informações pessoais"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isEditing ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-24 w-24 mb-4 border-2 border-primary/20">
                      <AvatarImage 
                        src={avatarPreview || profile?.avatar_url || undefined} 
                        alt="Profile" 
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {profile?.name ? profile.name.charAt(0) : <User />}
                      </AvatarFallback>
                    </Avatar>
                    
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={triggerFileInput}
                      className="relative group overflow-hidden"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Alterar Foto
                      <span className="absolute inset-0 flex items-center justify-center bg-primary text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        Escolher arquivo
                      </span>
                    </Button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          value={profile?.email || ""} 
                          disabled 
                          className="bg-muted/50"
                        />
                      </FormControl>
                      <FormDescription>O email não pode ser alterado</FormDescription>
                    </FormItem>
                  </div>

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sobre você</FormLabel>
                        <FormControl>
                          <textarea 
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Conte um pouco sobre você, seus interesses e objetivos..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit" disabled={updating}>
                      {updating ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Nome</p>
                        <p className="font-medium">{profile?.name || "Não informado"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p className="font-medium">{profile?.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <School className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Tipo de Conta</p>
                        <p className="font-medium capitalize">
                          {getCurrentUser()?.role === 'teacher' ? 'Professor' : 'Aluno'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Membro desde</p>
                        <p className="font-medium">
                          {new Date(profile?.created_at || "").toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Sobre</h3>
                  <p className="text-muted-foreground">
                    {profile?.bio || "Nenhuma informação adicional fornecida."}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="invitations">
        <Card>
          <CardHeader>
            <CardTitle>Convites para Turmas</CardTitle>
            <CardDescription>
              Gerencie os convites de professores para participar de turmas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingInvitations ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
              </div>
            ) : invitations.length > 0 ? (
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {invitations.map((invitation) => (
                    <Card key={invitation.id} className="overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{invitation.className}</h3>
                            <p className="text-sm text-muted-foreground">
                              Professor: {invitation.teacherName}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Convidado em {invitation.created}
                            </p>
                          </div>
                          <Badge>Pendente</Badge>
                        </div>
                        
                        <div className="flex justify-end gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-destructive border-destructive/50"
                            onClick={() => handleRejectInvitation(invitation.id)}
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Recusar
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleAcceptInvitation(invitation.id, invitation.classId)}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Aceitar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="py-8 text-center">
                <Briefcase className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium text-lg">Sem convites pendentes</h3>
                <p className="text-sm text-muted-foreground">
                  Você não tem convites para turmas no momento.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
