import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pb, getCurrentUser } from "@/integrations/pocketbase/client";
import { toast } from "sonner";

// 1) Defina o record com todos os campos que vão realmente existir:
interface ProfileRecord {
  id: string;
  created: string;
  updated: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

// 2) A interface que seu hook expõe:
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export function useUserData() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/auth");
      setLoading(false);
      return;
    }

    // 3) Use o ProfileRecord explicitamente:
    pb
      .collection("profiles")
      .getOne<ProfileRecord>(user.id)
      .then((rec) => {
        setProfile({
          id: rec.id,
          email: rec.email,
          full_name: rec.full_name ?? null,
          avatar_url: rec.avatar_url ?? null,
          created_at: rec.created,  // agora existe no ProfileRecord
        });
      })
      .catch((err) => {
        console.error("Erro ao carregar perfil:", err);
        toast.error("Erro ao carregar dados do usuário");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return { profile, loading };
}
