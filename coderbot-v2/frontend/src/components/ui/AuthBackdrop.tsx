// src/components/ui/AuthBackdrop.tsx
export function AuthBackdrop() {
    return (
      <>
        {/* gradiente animado */}
        <div className="pointer-events-none absolute inset-0 -z-10 animate-gradient
                        bg-[linear-gradient(115deg,var(--tw-color-from)_0%,var(--tw-color-via)_45%,var(--tw-color-to)_100%)]
                        bg-[length:200%_200%] opacity-30" />
  
        {/* blobs */}
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2
                        rounded-full bg-fuchsia-600 opacity-[--blob1] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3
                        rounded-full bg-emerald-500 opacity-[--blob2] blur-2xl" />
      </>
    );
  }
  