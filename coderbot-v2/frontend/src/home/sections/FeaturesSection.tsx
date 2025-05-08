// FeaturesSection.tsx – mostra recursos da plataforma
import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "👨‍🏫",
    title: "Interface para Professores",
    description: "Crie e gerencie turmas, exercícios e acompanhe o progresso dos alunos em tempo real.",
  },
  {
    icon: "👨‍🎓",
    title: "Interface para Alunos",
    description: "Acesse exercícios, receba feedback personalizado e acompanhe seu próprio progresso.",
  },
  {
    icon: "💻",
    title: "Ambiente de Codificação",
    description: "Editor de código integrado com suporte a várias linguagens de programação.",
  },
  {
    icon: "🤖💬",
    title: "ChatBot Inteligente",
    description: "Assistente virtual que ajuda os alunos a resolver problemas e entender conceitos.",
  },
  {
    icon: "💡",
    title: "Aprendizado Personalizado",
    description: "A plataforma adapta o conteúdo ao nível de conhecimento de cada aluno, garantindo um aprendizado eficiente e eficaz.",
  },
  {
    icon: "🔍",
    title: "Feedback Instantâneo",
    description: "Receba feedback imediato sobre o código dos alunos, ajudando a identificar erros e melhorar o entendimento.",
  },
  {
    icon: "🖼️",
    title: "Quadro De Aprendizado(Excalidraw)",
    description: "Crie diagramas de aprendizado para ajudar os alunos a entender melhor os conceitos, permitindo que eles sejam criados e editados pelos alunos.",
  },
  {
    icon: "🎮",
    title: "Gamificação",
    description: "A plataforma utiliza gamificação para motivar os alunos a aprenderem mais e melhor.",
  },
  
];

function FeatureItem({ icon, title, description }: Feature) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <SpotlightCard className="group h-full bg-amber-100 transition-all duration-300 hover:-translate-y-1 hover:bg-white/95">
        <CardContent className="relative flex h-full flex-col p-6">
          <div className="relative mb-4 text-4xl">
            {icon}
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-purple-500/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          
          <h3 className="mb-3 text-lg font-semibold text-gray-800 transition-colors duration-200 group-hover:text-purple-700">
            {title}
          </h3>
          
          <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-900">
            {description}
          </p>
          
          {/* Decorative gradient blur */}
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </CardContent>
      </SpotlightCard>
    </motion.div>
  );
}

function FeaturesSection() {
  return (
    <section className="relative isolate bg-white px-6 py-24 lg:px-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      <motion.div
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Recursos da Plataforma
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Ferramentas poderosas para transformar o ensino de programação
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default React.memo(FeaturesSection);
