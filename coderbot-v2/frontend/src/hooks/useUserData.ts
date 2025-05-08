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
  name?: string;
  avatar_url?: string;
  bio?: string;
  role?: string;
}

// 2) A interface que seu hook expõe:
export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: string | null;
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
    
    // Get user data directly from auth store instead of making another request
    setProfile({
      id: user.id,
      email: user.email,
      name: user.name || null,
      // Convert avatar to URL if it exists
      avatar_url: user.avatar ? `${pb.baseUrl}/api/files/${user.collectionId}/${user.id}/${user.avatar}` : null,
      bio: user.bio || null,
      role: user.role || null,
      created_at: user.created,
    });
    
    setLoading(false);
  }, [navigate]);

  return { profile, loading };
}
