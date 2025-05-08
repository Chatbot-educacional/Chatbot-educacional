// FooterSection.tsx – rodapé da aplicação
import * as React from "react";
import { motion } from "framer-motion";

function FooterSection() {
  return (
    <footer className="relative bg-gradient-to-t from-gray-900 via-gray-800 to-purple-700 px-6 pt-16 pb-8 text-gray-300 lg:px-24">
      <div className="absolute -top-14 left-0 w-full -rotate-180 opacity-40">
      
      </div>

      <div className="relative z-10 flex flex-col gap-12 md:flex-row md:justify-between">
        <div>
          <motion.h2
            className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-2xl font-bold text-transparent drop-shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            CoderBot
          </motion.h2>
          <p className="mt-1 text-gray-400">Educação em programação para todos</p>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <a href="/dashboard" className="transition hover:text-white">
            Dashboard
          </a>
          <a href="/auth" className="transition hover:text-white">
            Entrar / Registrar
          </a>
          <a href="https://github.com/Chatbot-educacional" className="transition hover:text-white" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
      </div>

      <div className="relative z-10 mt-12 border-t border-white/10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} CoderBot. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default React.memo(FooterSection);
