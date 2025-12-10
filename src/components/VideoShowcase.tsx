"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const mediaOptions = [
  {
    id: "producao",
    type: "video" as const,
    src: "/Video/video.mp4",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
      </svg>
    ),
    title: "Produção de Vídeo",
    description: "Conteúdo audiovisual de alta qualidade para sua marca"
  },
  {
    id: "drone",
    type: "video" as const,
    src: "/Video/videodrone.mp4",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L8 6h8l-4-4z" />
        <path d="M12 22l4-4H8l4 4z" />
        <path d="M2 12l4-4v8l-4-4z" />
        <path d="M22 12l-4 4V8l4 4z" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    title: "Drone 360°",
    description: "Capturas aéreas impressionantes e panorâmicas"
  },
  {
    id: "fotografia",
    type: "slideshow" as const,
    images: ["/fotos/fotografia.png", "/fotos/fotografia2.png"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
    title: "Fotografia Profissional",
    description: "Imagens que capturam a essência do seu negócio"
  },
];

export default function VideoShowcase() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeMedia, setActiveMedia] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0); // -1 esquerda, 1 direita

  const currentMedia = mediaOptions[activeMedia];
  const isSlideshow = currentMedia.type === "slideshow";

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextSlide = useCallback(() => {
    if (currentMedia.type === "slideshow") {
      setSlideDirection(1);
      setCurrentSlide((prev) => (prev + 1) % currentMedia.images.length);
    }
  }, [currentMedia]);

  const prevSlide = useCallback(() => {
    if (currentMedia.type === "slideshow") {
      setSlideDirection(-1);
      setCurrentSlide((prev) => (prev - 1 + currentMedia.images.length) % currentMedia.images.length);
    }
  }, [currentMedia]);

  const goToSlide = useCallback((idx: number) => {
    if (currentMedia.type === "slideshow") {
      setSlideDirection(idx > currentSlide ? 1 : -1);
      setCurrentSlide(idx);
    }
  }, [currentMedia, currentSlide]);

  const changeMedia = (index: number) => {
    if (index === activeMedia || isTransitioning) return;

    setIsTransitioning(true);
    setIsPlaying(false);

    // Aguarda a transição de saída
    setTimeout(() => {
      setActiveMedia(index);
      setCurrentSlide(0);
      // Aguarda carregar e inicia
      setTimeout(() => {
        setIsTransitioning(false);
        if (mediaOptions[index].type === "video" && videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      }, 100);
    }, 300);
  };

  // Auto-slide para slideshow
  useEffect(() => {
    if (isSlideshow && currentMedia.type === "slideshow") {
      const interval = setInterval(() => {
        setSlideDirection(1);
        setCurrentSlide((prev) => (prev + 1) % currentMedia.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isSlideshow, currentMedia]);

  useEffect(() => {
    // Pequeno delay para garantir que o ref foi atualizado
    const timer = setTimeout(() => {
      if (videoRef.current && !isSlideshow) {
        videoRef.current.load();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [activeMedia, isSlideshow]);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Layout grid - Video left, Text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video container - Left side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative group w-fit justify-self-center lg:justify-self-start"
          >
            {/* Decorative frame - fora do wrapper mas segue o tamanho do w-fit */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-cyan-500/20 to-pink-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

            {/* Video wrapper - tamanho definido pelo primeiro vídeo */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black backdrop-blur-sm">
              {/* Vídeo invisível só pra definir o tamanho */}
              <video
                className="max-w-full h-auto block invisible"
                aria-hidden="true"
                preload="metadata"
              >
                <source src="/Video/video.mp4" type="video/mp4" />
              </video>

              {/* Conteúdo ativo com transição suave */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMedia}
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                    opacity: { duration: 0.4 },
                    filter: { duration: 0.5 },
                    scale: { duration: 0.5 }
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {currentMedia.type === "video" ? (
                    <video
                      ref={videoRef}
                      className="max-w-full max-h-full"
                      loop
                      muted={isMuted}
                      playsInline
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    >
                      <source src={currentMedia.src} type="video/mp4" />
                      Seu navegador não suporta vídeos.
                    </video>
                  ) : (
                    /* Slideshow de imagens */
                    <div className="relative w-full h-full overflow-hidden">
                      {/* Imagens com animação de slide */}
                      <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                        <motion.div
                          key={currentSlide}
                          custom={slideDirection}
                          variants={{
                            enter: (direction: number) => ({
                              x: direction > 0 ? "100%" : "-100%",
                              opacity: 0.5,
                            }),
                            center: {
                              x: 0,
                              opacity: 1,
                            },
                            exit: (direction: number) => ({
                              x: direction > 0 ? "-100%" : "100%",
                              opacity: 0.5,
                            }),
                          }}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 }
                          }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={currentMedia.images[currentSlide]}
                            alt={`${currentMedia.title} ${currentSlide + 1}`}
                            fill
                            className="object-contain"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Controles do slideshow com aparição suave */}
                      <motion.button
                        onClick={prevSlide}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.15, backgroundColor: "rgba(0,0,0,0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors duration-300 z-10"
                      >
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                          whileHover={{ x: -2 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <path d="m15 18-6-6 6-6"/>
                        </motion.svg>
                      </motion.button>
                      <motion.button
                        onClick={nextSlide}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.15, backgroundColor: "rgba(0,0,0,0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors duration-300 z-10"
                      >
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                          whileHover={{ x: 2 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <path d="m9 18 6-6-6-6"/>
                        </motion.svg>
                      </motion.button>

                      {/* Indicadores de slide elegantes */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {currentMedia.images.map((_, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative h-2 rounded-full overflow-hidden transition-all duration-500"
                            style={{ width: idx === currentSlide ? 32 : 8 }}
                          >
                            <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                              idx === currentSlide ? "bg-white/40" : "bg-white/20"
                            }`} />
                            {idx === currentSlide && (
                              <motion.div
                                className="absolute inset-0 bg-white rounded-full origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 4, ease: "linear" }}
                                key={`progress-${currentSlide}`}
                              />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Loading overlay during transition */}
              <AnimatePresence>
                {isTransitioning && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="w-12 h-12 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Play button overlay - só para vídeos */}
              {!isSlideshow && !isPlaying && !isTransitioning && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center group/play"
                >
                  <div className="relative">
                    {/* Pulse rings */}
                    <div className="absolute inset-0 w-24 h-24 rounded-full bg-white/20 animate-ping" />
                    <div className="absolute inset-0 w-24 h-24 rounded-full bg-white/10 animate-pulse" />

                    {/* Play button */}
                    <div className="relative w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover/play:bg-white/20 group-hover/play:scale-110 transition-all duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-white ml-1"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                </motion.button>
              )}

              {/* Controls bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex items-center justify-between">
                {/* Left side - Play/Pause (só para vídeos) */}
                {!isSlideshow && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                    >
                      {isPlaying ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-white"
                        >
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-white ml-0.5"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                    >
                      {isMuted ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <line x1="23" y1="9" x2="17" y2="15" />
                          <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                      )}
                    </button>
                  </div>
                )}

                {/* Spacer para slideshow */}
                {isSlideshow && <div />}

                {/* Right side - Current media label (só para vídeos) */}
                {!isSlideshow && (
                  <div className="hidden md:flex items-center gap-3">
                    <motion.div
                      key={activeMedia}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                    >
                      <span className="text-white/80 text-sm font-medium">
                        {mediaOptions[activeMedia].title}
                      </span>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-violet-500/50 rounded-tl-lg" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-pink-500/50 rounded-bl-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-violet-500/50 rounded-br-lg" />
          </motion.div>

          {/* Text content - Right side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
                Nosso trabalho em ação
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Veja o que <span className="gradient-text">criamos</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Experiências visuais que contam histórias e conectam marcas ao seu público.
              </p>
            </div>

            {/* Media selector buttons */}
            <div className="space-y-4">
              {mediaOptions.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.15, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => changeMedia(index)}
                  className={`group w-full flex items-start gap-4 p-5 rounded-2xl border transition-all duration-500 text-left relative overflow-hidden ${
                    activeMedia === index
                      ? "bg-gradient-to-r from-violet-500/15 to-cyan-500/10 border-violet-500/40 shadow-lg shadow-violet-500/10"
                      : "bg-white/[0.02] border-white/5 hover:border-violet-500/30 hover:bg-white/[0.05]"
                  }`}
                >
                  {/* Animated background glow */}
                  {activeMedia === index && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-500/10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Icon container */}
                  <motion.div
                    animate={{
                      scale: activeMedia === index ? 1.1 : 1,
                      rotate: activeMedia === index ? [0, -5, 5, 0] : 0
                    }}
                    transition={{
                      scale: { duration: 0.3 },
                      rotate: { duration: 0.5, ease: "easeInOut" }
                    }}
                    className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
                      activeMedia === index
                        ? "bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/30"
                        : "bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-violet-400 group-hover:from-violet-500/30 group-hover:to-cyan-500/30"
                    }`}
                  >
                    {item.icon}
                    {/* Pulse effect when active */}
                    {activeMedia === index && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-white/20"
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Text content */}
                  <div className="flex-1 relative z-10">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold mb-1 transition-all duration-300 ${
                        activeMedia === index ? "text-white" : "text-white/90 group-hover:text-white"
                      }`}>
                        {item.title}
                      </h3>
                      <AnimatePresence>
                        {activeMedia === index && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                            className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-violet-500/40 to-cyan-500/40 text-white rounded-full border border-white/10"
                          >
                            Reproduzindo
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <p className={`text-sm transition-colors duration-300 ${
                      activeMedia === index ? "text-white/70" : "text-white/50 group-hover:text-white/60"
                    }`}>
                      {item.description}
                    </p>
                  </div>

                  {/* Play/Active indicator */}
                  <motion.div
                    animate={{
                      scale: activeMedia === index ? [1, 1.1, 1] : 1,
                      backgroundColor: activeMedia === index ? "rgba(139, 92, 246, 0.3)" : "rgba(255, 255, 255, 0.05)"
                    }}
                    transition={{
                      scale: { duration: 0.8, repeat: activeMedia === index ? Infinity : 0, repeatDelay: 0.5 }
                    }}
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeMedia === index
                        ? "text-white"
                        : "text-white/30 group-hover:text-violet-400 group-hover:bg-violet-500/20"
                    }`}
                  >
                    {activeMedia === index ? (
                      item.type === "slideshow" ? (
                        /* Ícone de câmera animado para slideshow */
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                          <circle cx="12" cy="13" r="3" />
                        </motion.svg>
                      ) : (
                        /* Barras de áudio animadas para vídeo */
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-0.5"
                        >
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-white rounded-full"
                              animate={{ height: [8, 16, 8] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </motion.div>
                      )
                    ) : item.type === "slideshow" ? (
                      /* Ícone de câmera para slideshow inativo */
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                        <circle cx="12" cy="13" r="3" />
                      </svg>
                    ) : (
                      /* Ícone de play para vídeo inativo */
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
