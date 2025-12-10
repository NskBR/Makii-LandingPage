"use client";

import { motion } from "framer-motion";

const words = [
  "BRANDING",
  "DESIGN",
  "MARKETING",
  "CRIATIVIDADE",
  "ESTRATÉGIA",
  "INOVAÇÃO",
  "RESULTADOS",
  "PUBLICIDADE",
];

export default function ScrollMarquee() {
  return (
    <section className="py-20 overflow-hidden">
      {/* Marquee 1 - Palavras grandes (direita para esquerda) */}
      <div className="relative mb-12">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* Duplicamos o conteúdo para criar loop infinito */}
          {[...words, ...words].map((word, index) => (
            <span
              key={index}
              className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/5 hover:from-violet-500 hover:to-cyan-500 transition-all duration-500 cursor-default"
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Marquee 2 - Direção oposta (esquerda para direita) */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...words, ...words].map((word, index) => (
            <span
              key={index}
              className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500/20 to-cyan-500/20 hover:from-violet-500 hover:to-cyan-500 transition-all duration-500 cursor-default"
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Linha divisória animada */}
      <div className="mt-20 max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      </div>
    </section>
  );
}
