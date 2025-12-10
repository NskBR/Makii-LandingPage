"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = ["Todos", "Branding", "Digital", "Social Media", "Print"];

const projects = [
  {
    id: 1,
    title: "Caffeine Lab",
    category: "Branding",
    description: "Identidade visual completa para cafeteria artesanal",
    image: "from-violet-600 to-purple-800",
    tags: ["Logo", "Identidade", "Embalagem"],
  },
  {
    id: 2,
    title: "TechVision",
    category: "Digital",
    description: "Redesign de plataforma SaaS",
    image: "from-cyan-600 to-blue-800",
    tags: ["UI/UX", "Web", "Dashboard"],
  },
  {
    id: 3,
    title: "Urban Fitness",
    category: "Social Media",
    description: "Campanha de lançamento nas redes sociais",
    image: "from-pink-600 to-rose-800",
    tags: ["Instagram", "Ads", "Motion"],
  },
  {
    id: 4,
    title: "Natura Cosmetics",
    category: "Branding",
    description: "Rebranding e nova linha de produtos",
    image: "from-emerald-600 to-teal-800",
    tags: ["Rebrand", "Packaging", "Print"],
  },
  {
    id: 5,
    title: "FinanceFlow",
    category: "Digital",
    description: "App de controle financeiro pessoal",
    image: "from-amber-600 to-orange-800",
    tags: ["App", "UI/UX", "Motion"],
  },
  {
    id: 6,
    title: "Gourmet House",
    category: "Print",
    description: "Material gráfico para restaurante premium",
    image: "from-red-600 to-rose-800",
    tags: ["Cardápio", "Print", "Brand"],
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects =
    activeFilter === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
            Nosso trabalho
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            <span className="gradient-text">Portfólio</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Conheça alguns dos projetos que desenvolvemos para nossos clientes.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-500/25"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Placeholder gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.image} transition-transform duration-700 group-hover:scale-110`}
              />

              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 grid-bg" />
              </div>

              {/* Placeholder icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border-2 border-dashed border-white/30 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:border-white/50 transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/50"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
              </div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Category */}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    hoveredProject === project.id
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.3 }}
                  className="text-xs font-medium text-violet-400 uppercase tracking-wider mb-2"
                >
                  {project.category}
                </motion.span>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-y-0 translate-y-4 transition-transform duration-500">
                  {project.title}
                </h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    hoveredProject === project.id
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-white/60 text-sm mb-4"
                >
                  {project.description}
                </motion.p>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    hoveredProject === project.id
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex flex-wrap gap-2"
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-white/70 bg-white/10 rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>

                {/* View button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    hoveredProject === project.id
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="absolute top-6 right-6"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <button className="group relative px-8 py-4 border border-white/20 rounded-full font-semibold overflow-hidden transition-all duration-500 hover:border-violet-500/50">
            <span className="relative z-10 text-white/80 group-hover:text-white transition-colors flex items-center gap-2">
              Ver Todos os Projetos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
