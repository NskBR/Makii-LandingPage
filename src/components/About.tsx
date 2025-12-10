"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const values = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v4" />
        <path d="m6.8 14-3.5 2" />
        <path d="m20.7 16-3.5-2" />
        <path d="M6.8 10 3.3 8" />
        <path d="m20.7 8-3.5 2" />
        <path d="m9 22 3-8 3 8" />
        <path d="M8 22h8" />
        <path d="M12 6a4 4 0 0 0 0 8" />
      </svg>
    ),
    title: "Criatividade",
    description: "Pensamos fora da caixa para criar soluções únicas e memoráveis.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
    title: "Estratégia",
    description: "Cada projeto é pensado com objetivos claros e mensuráveis.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Parceria",
    description: "Trabalhamos junto com você para alcançar os melhores resultados.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-violet-400 text-sm font-medium tracking-wider uppercase">
              Quem somos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Somos a <span className="gradient-text">MAKII</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              A MAKII é uma agência e produtora digital com sede em Manaus que conecta
              marcas ao sucesso por meio de estratégias criativas e resultados reais.
              Especializa-se em tráfego pago, gestão de redes sociais, produção de conteúdo,
              cobertura de eventos e captação de imagens com drone 360°.
            </p>
            <p className="text-white/50 leading-relaxed mb-4">
              Orgulha-se de ajudar empresas a se destacarem no mercado e criar experiências
              visuais impactantes. A equipe é composta por profissionais apaixonados por
              inovação e comprometidos com a excelência.
            </p>
            <p className="text-white/50 leading-relaxed mb-8">
              Acredita que cada marca tem uma história única e busca transformá-la em algo memorável.
            </p>

            {/* Values */}
            <div className="space-y-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1 group-hover:text-violet-300 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-white/50 text-sm">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right content - Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square">
              {/* Main visual container */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/20 to-cyan-500/20 border border-white/10 overflow-hidden">
                {/* Grid pattern */}
                <div className="absolute inset-0 grid-bg opacity-30" />

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute top-1/4 left-1/4 w-32 h-32 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-2xl shadow-violet-500/30"
                />
                <motion.div
                  animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 shadow-2xl shadow-cyan-500/30"
                />
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-2xl shadow-pink-500/30"
                />

                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-40 h-40 backdrop-blur-sm bg-black/20 rounded-3xl p-4">
                    <Image
                      src="/logo.jpeg"
                      alt="Makii Publicidade"
                      fill
                      className="object-contain rounded-2xl p-2"
                    />
                  </div>
                </div>
              </div>

              {/* Decorative rings */}
              <div className="absolute -inset-4 border border-white/5 rounded-[2rem] -z-10" />
              <div className="absolute -inset-8 border border-white/[0.03] rounded-[2.5rem] -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
