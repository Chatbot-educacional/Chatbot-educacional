// FeaturesSection.tsx – mostra recursos da plataforma
import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const features = [
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
    icon: "🤖",
    title: "ChatBot Inteligente",
    description: "Assistente virtual que ajuda os alunos a resolver problemas e entender conceitos.",
  },
];

function FeatureItem({ icon, title, description }: (typeof features)[number]) {
  return (
    <motion.div
      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-600/20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mb-4 text-4xl">
        {icon}
        <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-purple-500/30 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function FeaturesSection() {
  return (
    <section className="bg-white px-6 py-24 lg:px-24">
      <motion.h2
        className="text-center text-4xl font-bold text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        Recursos da Plataforma
      </motion.h2>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <FeatureItem key={f.title} {...f} />
        ))}
      </div>
    </section>
  );
}

export default React.memo(FeaturesSection);
