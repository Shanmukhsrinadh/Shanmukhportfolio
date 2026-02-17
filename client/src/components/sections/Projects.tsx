import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import projectUi from "@/assets/project-ui.png";
import projectArt from "@/assets/project-art.png";

// Placeholder project data
const projects = [
  { id: 1, category: "Figma", title: "NeoBank Mobile App", image: projectUi, link: "#" },
  { id: 2, category: "Development", title: "Crypto Dashboard", image: projectArt, link: "#" },
  { id: 3, category: "Design", title: "Luxury Hotel Branding", image: projectUi, link: "#" },
  { id: 4, category: "WordPress", title: "E-Commerce Platform", image: projectArt, link: "#" },
  { id: 5, category: "Development", title: "AI Content Generator", image: projectUi, link: "#" },
  { id: 6, category: "Figma", title: "SaaS Landing Page", image: projectArt, link: "#" },
];

const categories = ["All", "Figma", "Design", "Development", "WordPress"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  // Filter projects
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-32 bg-background min-h-screen relative">
      <div className="container px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <h2 className="text-5xl md:text-7xl font-display font-bold">
                Selected <br /> <span className="text-white/30">Works</span>
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-sm uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
                            activeCategory === cat 
                                ? "border-primary bg-primary text-background" 
                                : "border-white/10 hover:border-white/30 text-muted-foreground"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Project List */}
        <div className="flex flex-col">
            <AnimatePresence mode="wait">
                {filteredProjects.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                        className="group relative border-t border-white/10 py-12 cursor-pointer flex justify-between items-center"
                    >
                        <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-4">
                            <span className="text-xs text-primary mb-2 block">{project.category}</span>
                            <h3 className="text-3xl md:text-5xl font-display font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                {project.title}
                            </h3>
                        </div>

                        <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white text-black">
                                <ArrowUpRight className="w-5 h-5" />
                             </div>
                        </div>

                        {/* Hover Image Preview (Floating) */}
                        {hoveredProject === project.id && (
                             <motion.div 
                                layoutId="project-preview"
                                className="absolute right-20 top-1/2 -translate-y-1/2 w-[400px] h-[250px] rounded-lg overflow-hidden pointer-events-none hidden lg:block z-0"
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                             >
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20" />
                             </motion.div>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
            <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
