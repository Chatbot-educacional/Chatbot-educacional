// HowItWorksSection.tsx – passo a passo de uso
import * as React from "react";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Professores criam turmas",
    description: "Os professores podem criar turmas, convidar alunos e preparar material didático personalizado.",
    icon: "🎓",
  },
  {
    number: 2,
    title: "Alunos se matriculam",
    description: "Os alunos recebem convites, se matriculam nas turmas e ganham acesso aos materiais e exercícios.",
    icon: "✍️",
  },
  {
    number: 3,
    title: "Aprendizado interativo",
    description: "Os alunos resolvem exercícios no ambiente de codificação e recebem feedback imediato.",
    icon: "💡",
  },
  {
    number: 4,
    title: "Análise de progresso",
    description: "Professores acompanham o desempenho dos alunos através de métricas detalhadas.",
    icon: "📊",
  },
];

interface StepItemProps {
  number: number;
  title: string;
  description: string;
  icon: string;
  index: number;
}

function StepItem({ number, title, description, icon, index }: StepItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <SpotlightCard className="group flex items-start gap-6 transition-all duration-300 hover:translate-x-2 bg-white/80 hover:bg-white/95">
        <div className="relative">
          <div className={cn(
            "relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center",
            "rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700",
            "text-xl font-bold text-white shadow-lg shadow-purple-500/25",
            "transition-transform duration-300 group-hover:scale-110"
          )}>
            {icon}
            <div className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-white text-sm font-bold text-purple-600 flex items-center justify-center ring-2 ring-purple-100 shadow-sm">
              {number}
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -inset-4 z-0 rounded-full bg-gradient-to-br from-purple-500/20 via-purple-300/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-semibold text-purple-900 transition-colors duration-200 group-hover:text-purple-700">
            {title}
          </h3>
          <p className="text-purple-800/70 leading-relaxed group-hover:text-purple-900">
            {description}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="ml-4 mt-1.5 text-purple-500 opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
          →
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-purple-100/20 px-6 py-24 lg:px-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-purple-300/20 blur-3xl" />
        {/* Additional decorative elements */}
        <div className="absolute top-1/2 left-1/4 h-[300px] w-[300px] rounded-full bg-purple-100/20 blur-2xl" />
        <div className="absolute bottom-1/4 right-1/3 h-[250px] w-[250px] rounded-full bg-purple-400/10 blur-2xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          className="relative text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Como Funciona
          </h2>
          <p className="mt-4 text-lg text-purple-900/70">
            Siga os passos abaixo para começar sua jornada de aprendizado
          </p>
          {/* Decorative line */}
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </motion.div>

        <div className="mx-auto mt-16 flex max-w-4xl flex-col gap-6">
          {steps.map((step, index) => (
            <StepItem key={step.number} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(HowItWorksSection);
