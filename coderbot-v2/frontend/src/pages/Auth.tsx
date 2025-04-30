// src/pages/Auth.tsx
import { Suspense, lazy, useState } from "react";
import { AuthBackdrop } from "@/components/ui/AuthBackdrop";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { Loader2 } from "lucide-react";


import AuthForm from "@/components/auth/AuthForm";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);

  // encapsula supabase + navigate + toast
  useAuthRedirect();

  return (
    <main
      role="main"
      aria-busy={isLoading}
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-950"
    >
      <AuthBackdrop />

      {/* overlay de carregamento global opcional */}
      {isLoading && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-slate-950/60 backdrop-blur-sm">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}

      <Suspense
        fallback={
          <div className="rounded-2xl border border-white/10 bg-white/5 p-16 backdrop-blur-sm shadow-xl">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-white" />
          </div>
        }
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-xl">
          <AuthForm isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      </Suspense>
    </main>
  );
}
