import { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Code, Figma, Palette, Globe, Cpu, Layers } from "lucide-react";

const skills = [
  { name: "Figma", icon: Figma },
  { name: "React", icon: Code },
  { name: "Three.js", icon: Layers },
  { name: "Next.js", icon: Globe },
  { name: "UI Design", icon: Palette },
  { name: "Node.js", icon: Cpu },
];

export default function About() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const section = sectionRef.current;
    if (section) {
        section.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
        if (section) {
            section.removeEventListener("mousemove", handleMouseMove);
        }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 relative bg-black overflow-hidden">
      <div className="container px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Bio */}
            <div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-display font-bold mb-8"
                >
                    More than just <br /> <span className="text-white/50">pixels & code.</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg text-muted-foreground leading-relaxed mb-8"
                >
                    I am a multidisciplinary creative obsessed with the intersection of design and technology. 
                    I don't just build websites; I craft digital journeys that evoke emotion and drive engagement. 
                    With a background in both traditional graphic design and full-stack engineering, I bridge the gap between form and function.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="h-px w-24 bg-primary mb-4" />
                    <p className="font-serif italic text-xl">"Simplicity is the ultimate sophistication."</p>
                </motion.div>
            </div>

            {/* Light Reveal Skills Grid */}
            <div className="relative group cursor-none">
                {/* Background Grid (Dimmed) */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 opacity-20 transition-opacity duration-500 group-hover:opacity-10">
                    {skills.map((skill) => (
                        <div key={skill.name} className="aspect-square border border-white/20 flex flex-col items-center justify-center p-4">
                            <skill.icon className="w-8 h-8 mb-2" />
                            <span className="text-sm font-medium">{skill.name}</span>
                        </div>
                    ))}
                </div>

                {/* Reveal Layer (Masked) */}
                <motion.div 
                    className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-4 pointer-events-none"
                    style={{
                        maskImage: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                        WebkitMaskImage: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                    }}
                >
                    {skills.map((skill) => (
                        <div key={skill.name} className="aspect-square bg-white/5 border border-primary/50 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
                            <skill.icon className="w-10 h-10 mb-2 text-primary drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                            <span className="text-sm font-bold text-white tracking-widest uppercase">{skill.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

        </div>
      </div>
    </section>
  );
}
