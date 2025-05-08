// src/hooks/useAuthRedirect.ts
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
      navigate("/auth");
      return;
    }

    // Verify token by attempting to get user data
    const verifyToken = async () => {
      try {
        const response = await fetch(`http://localhost:8090/api/collections/users/auth-refresh`, {
          method: 'POST',
          headers: {
            'Authorization': authToken
          }
        });

        if (!response.ok) {
          localStorage.removeItem('authToken');
          navigate("/auth");
        } else {
          const data = await response.json();
          // Update token if refreshed
          if (data.token) {
            localStorage.setItem('authToken', data.token);
          }
        }
      } catch (error) {
        localStorage.removeItem('authToken');
        navigate("/auth");
      }
    };

    verifyToken();

    // Listen for storage events (token changes)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken') {
        if (e.newValue) {
          navigate("/");
          toast.success("Login realizado com sucesso!");
        } else {
          navigate("/auth");
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate]);
}
