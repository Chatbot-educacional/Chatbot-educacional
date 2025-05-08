// Home.tsx – refactor with modern UX/UI, shadcn/ui components & best‑practice structure
// -------------------------------------------------------------------------------------------------
// • Type‑safe with React 18 & Vite
// • Tailwind CSS + shadcn/ui for consistent design tokens
// • Declarative, data‑driven sections (easy to extend)
// • Split into small semantic sub‑components for readability & automatic code‑splitting via React.lazy
// • Motion‑safe animations (prefers‑reduced‑motion respected)
// -------------------------------------------------------------------------------------------------

import * as React from "react";
import { Suspense, lazy, useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import Waves from "@/Backgrounds/Waves/Waves";
import { invoke } from "@tauri-apps/api/core"; // or plugin-fs if using plugin

// Lazy sections (code-splitting) ————————————————————————————————————————————
const Features     = lazy(() => import("./sections/FeaturesSection"));
const Curriculum   = lazy(() => import("./sections/CurriculumSection"));
const HowItWorks   = lazy(() => import("./sections/HowItWorksSection"));
const Footer       = lazy(() => import("./sections/footer"));

// Hero Section ———————————————————————————————————————————————————————————————
function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY * 0.4);
    const id = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      style={{ backgroundPositionY: `${offsetY}px` }}
      className="relative isolate flex min-h-[88vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-600 to-fuchsia-500 px-6 py-24 text-center text-white lg:px-24"
    >
      {/* Waves Background */}
      <Waves className="-z-20" lineColor="#B39DFF" backgroundColor="transparent" waveAmpX={36} waveAmpY={18} />
      {/* Background Blur Blob */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <div className="absolute -top-20 right-1/4 aspect-square w-[60rem] rounded-full bg-purple-400 opacity-40 blur-3xl" />
      </motion.div>

      {/* Overlay para suavizar o fundo (opcional, pode ser removido se quiser só o card) */}
      {/* <div className="absolute inset-0 z-0 bg-white/30 backdrop-blur-sm pointer-events-none" /> */}

      {/* Card centralizado para destaque do produto */}
      <div className="relative z-10 mx-auto w-full max-w-xl rounded-2xl bg-white/70 backdrop-blur-md shadow-2xl p-8 flex flex-col items-center">
        {/* Logo */}
        <motion.img
          src="/coderbot_colorfull.png"
          alt="CoderBot logo"
          className="mb-6 w-36 drop-shadow-lg lg:w-44"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
        />

        {/* Heading */}
        <motion.h1
          className="max-w-4xl bg-gradient-to-r from-indigo-700 via-purple-600 to-fuchsia-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl drop-shadow-md"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.04 },
            },
          }}
        >
          {"CoderBot".split("").map((c, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
            >
              {c}
            </motion.span>
          ))}
        </motion.h1>

        <p className="mt-4 max-w-xl text-lg/relaxed text-gray-800 text-center">
          Plataforma inteligente que conecta professores e alunos por meio de aprendizado ativo
          e experiências de codificação imersivas.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="shadow-lg">
            <a href="/dashboard">Começar agora</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/40 bg-white/10 backdrop-blur">
            <a href="/auth">Saiba mais</a>
          </Button>
        </div>
      </div>

      {/* Floating code card */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ y: 60, opacity: 0, rotateX: -10 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ 
            delay: 0.8, 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.1 
          }}
          className="perspective-1000"
        >
          <motion.pre
            className={cn(
              "pointer-events-none mt-20 hidden select-none md:block",
              "overflow-hidden rounded-xl border border-white/10",
              "bg-gradient-to-br from-slate-900/90 to-slate-800/90",
              "p-6 font-mono text-sm leading-relaxed tracking-wide",
              "text-sky-100/90 shadow-2xl backdrop-blur-sm",
              "hover:border-white/20 hover:from-slate-900/95 hover:to-slate-800/95",
              "transition-colors duration-300"
            )}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <TypewriterText text={`function aprender(): Promise<Sucesso> {
  const conhecimento: string = "infinito";
  const habilidades: string[] = [];
  
  while (motivacao > 0) {
    await habilidades.push("novoConhecimento");
    if (praticar) {
      dominio += experiencia;
    }
  }
  
  return new Sucesso(habilidades);
}`} />
          </motion.pre>
        </motion.div>
      )}
    </section>
  );
}

// TypeWriter Animation Component
interface TypewriterTextProps {
  text: string;
}

function TypewriterText({ text }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.span
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
      {displayText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </motion.span>
  );
}

// Video Modal Component
function VideoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl rounded-2xl bg-white p-2 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute -right-4 -top-4 rounded-full bg-white p-2 shadow-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/seu-video-id"
                title="CoderBot - O Futuro do Ensino de Programação"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Home —————————————————————————————————————————————————————————————————
export default function Home() {
  return (
    <main className="font-sans text-gray-900 antialiased">
      <Hero />

      <Suspense fallback={<SectionLoader />}>
        <Features />
        <HowItWorks />
        {/* <Curriculum /> */}
        <CtaSection />
        <Footer />
      </Suspense>
    </main>
  );
}

// CTA Section —————————————————————————————————————————————————————————
function CtaSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-purple-100/20 px-6 py-32 lg:px-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] animate-pulse-slow rounded-full bg-blue-400 opacity-20 blur-[100px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] animate-pulse-slow rounded-full bg-purple-300 opacity-20 blur-[100px]" />
        
        {/* Decorative floating elements */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute left-10 top-10 h-8 w-8 rounded-lg bg-purple-200"
            animate={{
              y: [0, 20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-20 bottom-20 h-6 w-6 rounded-full bg-blue-200"
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-1/4 top-1/4 h-10 w-10 rounded-lg bg-purple-100 rotate-45"
            animate={{
              rotate: [45, 90, 45],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SpotlightCard className="group overflow-hidden">
          <CardContent className="relative flex flex-col items-center gap-8 p-12 md:p-16">
            {/* Main content */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="bg-gradient-to-r from-purple-500 via-purple-800 to-purple-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
                  Pronto para transformar seu ensino de programação?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg/relaxed text-black">
                  Junte-se a milhares de educadores e estudantes que já utilizam o CoderBot 
                  para criar experiências de aprendizado extraordinárias.
                </p>
              </motion.div>
            </div>

            {/* Action buttons with video */}
            <motion.div 
              className="flex flex-col gap-4 sm:flex-row sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-purple-600 text-white hover:bg-purple-700"
                onClick={() => window.location.href = '/dashboard'}
              >
                Começar gratuitamente
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-200 bg-purple-800/10 text-black backdrop-blur hover:bg-purple-500/10 hover:text-black"
                onClick={() => setIsVideoOpen(true)}
              >
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
                  </svg>
                  Ver vídeo
                </div>
              </Button>
            </motion.div>

            {/* Stats */}
            {/* <div className="mt-8 grid grid-cols-2 gap-8 border-t border-purple-300/20 pt-8 sm:grid-cols-4">
              {[
                { value: "2000+", label: "Estudantes" },
                { value: "500+", label: "Professores" },
                { value: "50+", label: "Instituições" },
                { value: "98%", label: "Satisfação" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="mt-1 text-sm text-purple-200">{stat.label}</div>
                </motion.div>
              ))}
            </div> */}

            {/* Open Source Support */}
            <motion.div 
              className="mt-12 border-t border-purple-300/20 pt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mx-auto max-w-2xl">
                <h3 className="text-xl font-semibold text-black">
                  Apoie este Projeto Open Source
                </h3>
                <p className="mt-4 text-black">
                  O CoderBot é um projeto de código aberto dedicado a democratizar o ensino de programação.
                  Sua contribuição pode ajudar a transformar a educação tecnológica no Brasil.
                </p>
                <div className="mt-6 flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-purple-200 bg-purple-800/10 text-black backdrop-blur hover:bg-purple-500/10 hover:text-black"
                    onClick={() => window.open('https://github.com/mendes-dv/Chatbot-educacional', '_blank')}
                  >
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      Contribuir no GitHub
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-purple-200 bg-purple-800/10 text-black backdrop-blur hover:bg-purple-500/10 hover:text-black"
                    onClick={() => window.open('https://github.com/mendes-dv/Chatbot-educacional/stargazers', '_blank')}
                  >
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                      </svg>
                      Dar uma Estrela
                    </div>
                  </Button>
                </div>
                <p className="mt-4 text-sm text-black">
                  Junte-se à nossa comunidade open source e ajude a construir o futuro da educação em programação!
                </p>
              </div>
            </motion.div>
          </CardContent>
        </SpotlightCard>
      </div>

      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
}

// Loader for lazy sections ———————————————————————————————————————————
function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <span className="animate-spin rounded-full border-4 border-indigo-400 border-t-transparent p-3" />
    </div>
  );
}

// Default export ends above – sub‑sections live in ./sections/* ————
//   Each section is isolated: accepts no props, exports memo‑ized FC.
//   This keeps Home.tsx tidy and boosts maintainability.

type FileEntry = { path: string; entry_type: "file" | "directory" };

export const CodeEditor = () => {
  const [fileEntries, setFileEntries] = useState<FileEntry[]>([]);

  useEffect(() => {
    (async () => {
      const entries = await invoke<FileEntry[]>("list_workspace_files");
      setFileEntries(entries);
      // ...load file contents for editor as needed
    })();
  }, []);
};
