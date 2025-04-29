// src/components/ProfileForm.tsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Mail, User, Calendar } from "lucide-react";
import { toast } from "sonner";
import { pb } from "@/integrations/pocketbase/client";
import { useUserData } from "@/hooks/useUserData";

interface ProfileFormProps {
  isEditing: boolean;
  onSaved: () => void;
}

interface ProfileFormData {
  full_name: string;
}

export function ProfileForm({ isEditing, onSaved }: ProfileFormProps) {
  const { profile, loading } = useUserData();
  const [updating, setUpdating] = useState(false);

  const form = useForm<ProfileFormData>({
    defaultValues: {
      full_name: profile?.full_name || "",
    },
    mode: "onChange",
  });

  // Atualiza valores quando o profile carrega
  useEffect(() => {
    if (profile) {
      form.reset({ full_name: profile.full_name });
    }
  }, [profile, form]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!profile) return;
    setUpdating(true);
    try {
      // Atualiza apenas full_name no PocketBase
      await pb.collection("profiles").update(profile.id, {
        full_name: data.full_name,
        updated: new Date().toISOString(),
      });

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
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? "Editar Perfil" : "Detalhes do Perfil"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={profile?.avatar_url || undefined} alt="Profile" />
                  <AvatarFallback>
                    {profile?.full_name?.charAt(0) || <User />}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => {
                    toast("Funcionalidade de alterar foto não implementada");
                  }}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Alterar Foto
                </Button>
              </div>

              <FormField
                control={form.control}
                name="full_name"
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

              <div className="flex justify-end">
                <Button type="submit" disabled={updating}>
                  {updating ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User />
              <span>{profile?.full_name}</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail />
              <span>{profile?.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar />
              <span>
                {new Date(profile?.created_at).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
