import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  { id: 1, category: "Design", title: "Unseen Stories", image: "https://i.ibb.co/L5h8xDB/Screenshot-2024-11-01-222502.png", link: "https://shanmukhsrinadh.github.io/Unseen-stories/" },
  { id: 2, category: "Development", title: "Earthquake Detection", image: "https://i.ibb.co/bHjYmG1/Screenshot-2024-11-07-234521.png", link: "https://earthquakemodel-2.onrender.com/" },
  { id: 3, category: "Development", title: "Mini Research Assistant", image: "https://i.ibb.co/k0X4hM1/Screenshot-2024-11-22-043602.png", link: "https://shanmukhsrinadh.github.io/research-assistant/" },
  { id: 4, category: "Development", title: "Legacyonwheels", image: "https://i.ibb.co/RTWsFrvg/Screenshot-2025-02-12-014242.png", link: "https://shanmukhsrinadh.github.io/Legacyonwheelsclone-main/" },
  { id: 5, category: "Development", title: "Sbank", image: "https://i.ibb.co/mpfMYXt/Screenshot-2025-02-12-014701.png", link: "https://shanmukhsrinadh.github.io/Sbank/" },
  { id: 6, category: "Development", title: "Luxora", image: "https://i.ibb.co/9mFyPqXr/Screenshot-2025-02-12-015041.png", link: "https://shanmukhsrinadh.github.io/LuxoraEcom/index.html" },
  { id: 7, category: "Development", title: "Fashique", image: "https://i.ibb.co/Nh6fKrf/Whats-App-Image-2025-03-13-at-14-03-46.jpg", link: "https://shanmukhsrinadh.github.io/Fashiquecomstore01/" },
  { id: 8, category: "WordPress", title: "Maply Travel", image: "https://i.ibb.co/tPxf2Tmt/Wordpress-static.png", link: "https://dev-sweb1.pantheonsite.io/" },
  { id: 9, category: "Figma", title: "Timber Oak App", image: "https://i.ibb.co/VcsX0wHG/Untitled-1.jpg", link: "https://www.figma.com/proto/ac8saGZ1ybu6zHQljHKavE/Untitled?node-id=15-1430" },
];

const categories = ["All", "Figma", "Design", "Development", "WordPress"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-32 bg-background min-h-screen relative">
        <div className="w-full px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <h2 className="text-5xl md:text-7xl font-display font-bold">
                My <br /> <span className="text-white/30">Work</span>
            </h2>

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
                        onClick={() => window.open(project.link, "_blank")}
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

                        {hoveredProject === project.id && (
                             <motion.div 
                                layoutId="project-preview"
                                className="absolute right-20 top-1/2 -translate-y-1/2 w-[400px] h-[250px] rounded-lg overflow-hidden pointer-events-none hidden lg:block z-0"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
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
