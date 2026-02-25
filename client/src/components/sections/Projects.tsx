"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  PenTool,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    category: "Design",
    title: "Timber Oak",
    image: "https://i.ibb.co/VcsX0wHG/Untitled-1.jpg",
    link:
      "https://www.figma.com/proto/ac8saGZ1ybu6zHQljHKavE/Untitled?node-id=15-1430",
  },
  {
    id: 2,
    category: "Design",
    title: "M-Wallet",
    image:
      "https://shanmukhsrinadh.github.io/Shannuportfolio/img/M-wallet%20mockup%20screen%20figma.png",
    link:
      "https://www.figma.com/proto/H5oV9PNMpZlcCDqE7dnHLh/Shanmukh-srinadh-9550563283-?node-id=9-617",
  },
  {
    id: 3,
    category: "Development",
    title: "Vaijayanta",
    image:
      "https://i.ibb.co/JWyNZJTd/Screenshot-2026-02-23-001847.png",
    link: "https://web-asset-manager--yop2483.replit.app",
  },
  {
    id: 4,
    category: "Development",
    title: "Fashique",
    image:
      "https://i.ibb.co/Nh6fKrf/Whats-App-Image-2025-03-13-at-14-03-46.jpg",
    link: "https://shanmukhsrinadh.github.io/Fashiquecomstore01/",
  },
  {
    id: 5,
    category: "Development",
    title: "Legacyonwheels",
    image:
      "https://i.ibb.co/RTWsFrvg/Screenshot-2025-02-12-014242.png",
    link:
      "https://shanmukhsrinadh.github.io/Legacyonwheelsclone-main/",
  },
  {
    id: 6,
    category: "Development",
    title: "Earthquake Detection",
    image:
      "https://i.ibb.co/bHjYmG1/Screenshot-2024-11-07-234521.png",
    link: "https://earthquakemodel-2.onrender.com/",
  },
  {
    id: 7,
    category: "WordPress",
    title: "Maply Travel",
    image:
      "https://i.ibb.co/tPxf2Tmt/Wordpress-static.png",
    link: "https://dev-sweb1.pantheonsite.io/",
  },
  {
    id: 8,
    category: "WordPress",
    title: "Gadgets WooCommerce",
    image:
      "https://i.ibb.co/TMBYjY2q/Woo-com.png",
    link: "https://dev-wp02woocom.pantheonsite.io/",
  },
];

const categories = ["Design", "Development", "WordPress"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Design");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setCanHover(mediaQuery.matches);
  }, []);

  const filteredProjects = projects.filter(
    (p) => p.category === activeCategory
  );

  const visibleProjects =
    showAll || filteredProjects.length <= 2
      ? filteredProjects
      : filteredProjects.slice(0, 2);

  useEffect(() => {
    setShowAll(false);
    setExpandedId(null);
  }, [activeCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Design":
        return <PenTool className="w-5 h-5" />;
      case "Development":
        return <Github className="w-5 h-5" />;
      case "WordPress":
        return <Globe className="w-5 h-5" />;
      default:
        return <ArrowUpRight className="w-5 h-5" />;
    }
  };

  const handleClick = (project: any) => {
    if (canHover) {
      window.open(project.link, "_blank");
    } else {
      setExpandedId(expandedId === project.id ? null : project.id);
    }
  };

  return (
    <section className="py-32 bg-background min-h-screen relative">
      <div className="w-full px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <h2 className="text-5xl md:text-7xl font-bold">
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

        {/* PROJECT LIST */}
        <div className="flex flex-col">
          <AnimatePresence>
            {visibleProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => canHover && setHoveredId(project.id)}
                onMouseLeave={() => canHover && setHoveredId(null)}
                onClick={() => handleClick(project)}
                className="relative border-t border-white/10 py-12 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-primary block mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-3xl md:text-5xl text-muted-foreground hover:text-foreground transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* CATEGORY ICON RESTORED */}
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white text-black hover:bg-primary hover:text-background transition-all">
                    {getCategoryIcon(project.category)}
                  </div>
                </div>

                {/* DESKTOP HOVER PREVIEW */}
                {canHover && hoveredId === project.id && (
                  <motion.div
                    className="absolute right-20 top-1/2 -translate-y-1/2 w-[400px] h-[250px] rounded-lg overflow-hidden pointer-events-none hidden lg:block"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </motion.div>
                )}

                {/* TOUCH INLINE EXPANSION */}
                {!canHover && expandedId === project.id && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 overflow-hidden rounded-lg"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full rounded-lg object-cover"
                    />

                    <div className="mt-4">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.link, "_blank");
                        }}
                        className="w-full"
                      >
                        Visit Project
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* VIEW TOGGLE */}
        {filteredProjects.length > 2 && (
          <div className="mt-10 flex justify-center">
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "View Less" : "View All Projects"}
              {showAll ? (
                <ChevronUp className="ml-2 w-4 h-4" />
              ) : (
                <ChevronDown className="ml-2 w-4 h-4" />
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}