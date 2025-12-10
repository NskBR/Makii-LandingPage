"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  {
    id: 1,
    title: "Estratégia",
    subtitle: "Planejamento que gera resultados",
    description:
      "Analisamos seu mercado, concorrência e público-alvo para criar estratégias personalizadas que realmente funcionam.",
    color: "from-violet-600 to-violet-800",
    accent: "violet",
  },
  {
    id: 2,
    title: "Design",
    subtitle: "Visual que conecta",
    description:
      "Transformamos conceitos em experiências visuais impactantes. Do branding ao digital, criamos designs únicos.",
    color: "from-cyan-500 to-blue-700",
    accent: "cyan",
  },
  {
    id: 3,
    title: "Execução",
    subtitle: "Ideias que saem do papel",
    description:
      "Colocamos tudo em prática com excelência e atenção aos detalhes em cada etapa do processo.",
    color: "from-pink-500 to-rose-700",
    accent: "pink",
  },
  {
    id: 4,
    title: "Resultados",
    subtitle: "Métricas que importam",
    description:
      "Monitoramos e otimizamos continuamente para garantir o crescimento da sua marca.",
    color: "from-amber-500 to-orange-700",
    accent: "amber",
  },
];

export default function ScrollSections() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [fixedPosition, setFixedPosition] = useState<"top" | "fixed" | "bottom">("top");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      const containerBottom = rect.bottom;
      const windowHeight = window.innerHeight;

      const isInView = containerTop < windowHeight && containerBottom > 0;
      setIsVisible(isInView);

      if (containerTop > 0) {
        setFixedPosition("top");
        setProgress(0);
      } else if (containerBottom < windowHeight) {
        setFixedPosition("bottom");
        setProgress(100);
      } else {
        setFixedPosition("fixed");

        const scrollableHeight = rect.height - windowHeight;
        const scrolled = -containerTop;
        const progressValue = Math.max(0, Math.min(1, scrolled / scrollableHeight));
        setProgress(progressValue * 100);

        const newIndex = Math.min(
          Math.floor(progressValue * sections.length),
          sections.length - 1
        );
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeSection = sections[activeIndex];

  return (
    <div
      ref={containerRef}
      className="relative bg-[#050505]"
      style={{ height: `${sections.length * 100}vh` }}
    >
      <div
        className={`inset-x-0 h-screen z-40 ${
          fixedPosition === "fixed"
            ? "fixed top-0"
            : fixedPosition === "bottom"
            ? "absolute bottom-0"
            : "absolute top-0"
        }`}
        style={{
          visibility: isVisible ? "visible" : "hidden",
        }}
      >
        <div className="relative w-full h-full bg-[#050505] overflow-hidden">
          {/* Background gradient animado */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: activeSection.accent === "violet"
                ? "radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)"
                : activeSection.accent === "cyan"
                ? "radial-gradient(circle at 70% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)"
                : activeSection.accent === "pink"
                ? "radial-gradient(circle at 70% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)"
                : "radial-gradient(circle at 70% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)"
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Progress bar no topo */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-50">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 via-cyan-500 to-pink-500"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Header */}
          <div className="absolute top-12 left-0 right-0 text-center">
            <span className="text-violet-400 text-sm font-medium tracking-wider uppercase">
              Nosso processo
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
              Como <span className="gradient-text">trabalhamos</span>
            </h2>
          </div>

          {/* Conteúdo principal */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center mt-8">

                {/* Lado esquerdo - Texto único com animação */}
                <div className="relative h-[280px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="absolute inset-0 flex flex-col justify-center"
                    >
                      {/* Número grande de fundo */}
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`absolute -left-4 top-1/2 -translate-y-1/2 text-[180px] lg:text-[220px] font-bold leading-none pointer-events-none ${
                          activeSection.accent === "violet" ? "text-violet-500/10" :
                          activeSection.accent === "cyan" ? "text-cyan-500/10" :
                          activeSection.accent === "pink" ? "text-pink-500/10" :
                          "text-amber-500/10"
                        }`}
                      >
                        0{activeSection.id}
                      </motion.span>

                      {/* Conteúdo do texto */}
                      <div className="relative z-10">
                        {/* Step indicator */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="flex items-center gap-3 mb-4"
                        >
                          <span className={`text-sm font-medium ${
                            activeSection.accent === "violet" ? "text-violet-400" :
                            activeSection.accent === "cyan" ? "text-cyan-400" :
                            activeSection.accent === "pink" ? "text-pink-400" :
                            "text-amber-400"
                          }`}>
                            ETAPA {activeSection.id} DE {sections.length}
                          </span>
                          <div className="flex gap-1">
                            {sections.map((_, i) => (
                              <div
                                key={i}
                                className={`w-6 h-1 rounded-full transition-all duration-300 ${
                                  i <= activeIndex
                                    ? activeSection.accent === "violet" ? "bg-violet-500" :
                                      activeSection.accent === "cyan" ? "bg-cyan-500" :
                                      activeSection.accent === "pink" ? "bg-pink-500" :
                                      "bg-amber-500"
                                    : "bg-white/10"
                                }`}
                              />
                            ))}
                          </div>
                        </motion.div>

                        {/* Título */}
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.15 }}
                          className="text-4xl lg:text-5xl font-bold text-white mb-3"
                        >
                          {activeSection.title}
                        </motion.h3>

                        {/* Subtítulo */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.25 }}
                          className={`text-lg lg:text-xl mb-4 ${
                            activeSection.accent === "violet" ? "text-violet-400" :
                            activeSection.accent === "cyan" ? "text-cyan-400" :
                            activeSection.accent === "pink" ? "text-pink-400" :
                            "text-amber-400"
                          }`}
                        >
                          {activeSection.subtitle}
                        </motion.p>

                        {/* Descrição */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.35 }}
                          className="text-white/50 text-base lg:text-lg leading-relaxed max-w-md"
                        >
                          {activeSection.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Lado direito - Card visual */}
                <div className="relative h-[300px] md:h-[380px] lg:h-[420px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        rotateY: -10,
                        x: 50
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotateY: 0,
                        x: 0
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        rotateY: 10,
                        x: -50
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="absolute inset-0"
                      style={{ perspective: "1000px" }}
                    >
                      <div
                        className={`relative w-full h-full rounded-3xl bg-gradient-to-br ${activeSection.color} overflow-hidden shadow-2xl`}
                        style={{
                          boxShadow: activeSection.accent === "violet"
                            ? "0 25px 80px -20px rgba(139, 92, 246, 0.4)"
                            : activeSection.accent === "cyan"
                            ? "0 25px 80px -20px rgba(6, 182, 212, 0.4)"
                            : activeSection.accent === "pink"
                            ? "0 25px 80px -20px rgba(236, 72, 153, 0.4)"
                            : "0 25px 80px -20px rgba(245, 158, 11, 0.4)"
                        }}
                      >
                        {/* Grid pattern */}
                        <div className="absolute inset-0 grid-bg opacity-20" />

                        {/* Elementos flutuantes */}
                        <motion.div
                          animate={{
                            y: [0, -20, 0],
                            rotate: [0, 8, 0],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute top-[15%] left-[12%] w-16 h-16 lg:w-24 lg:h-24 rounded-2xl bg-white/20 backdrop-blur-sm"
                        />
                        <motion.div
                          animate={{
                            y: [0, 25, 0],
                            rotate: [0, -10, 0],
                            scale: [1, 0.95, 1]
                          }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                          className="absolute bottom-[18%] right-[12%] w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-white/15 backdrop-blur-sm"
                        />
                        <motion.div
                          animate={{
                            y: [0, 15, 0],
                            x: [0, 12, 0],
                            rotate: [0, 15, 0]
                          }}
                          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                          className="absolute top-[45%] right-[25%] w-10 h-10 lg:w-16 lg:h-16 rounded-xl bg-white/10 backdrop-blur-sm"
                        />

                        {/* Número central */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.span
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-[100px] lg:text-[140px] font-bold text-white"
                          >
                            0{activeSection.id}
                          </motion.span>
                        </div>

                        {/* Label inferior */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                          className="absolute bottom-5 left-5 right-5 flex justify-between items-center"
                        >
                          <div className="px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm">
                            <span className="text-white text-sm font-medium">
                              {activeSection.title}
                            </span>
                          </div>
                          <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                            <span className="text-white/80 text-xs">
                              {activeSection.id}/{sections.length}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Progress indicator lateral */}
          <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="group relative flex items-center"
              >
                {/* Label que aparece no hover */}
                <span className={`absolute right-full mr-3 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
                  activeIndex === index ? "text-white" : "text-white/50"
                }`}>
                  {section.title}
                </span>
                {/* Dot */}
                <div
                  className={`rounded-full transition-all duration-500 ${
                    activeIndex === index
                      ? `w-2 h-10 ${
                          section.accent === "violet" ? "bg-violet-500" :
                          section.accent === "cyan" ? "bg-cyan-500" :
                          section.accent === "pink" ? "bg-pink-500" :
                          "bg-amber-500"
                        }`
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Scroll indicator embaixo */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <motion.span
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/40 text-xs"
            >
              {activeIndex < sections.length - 1 ? "Continue rolando" : "Fim da seção"}
            </motion.span>
            {activeIndex < sections.length - 1 && (
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/30"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
