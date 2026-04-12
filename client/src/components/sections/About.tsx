"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Code,
  Figma,
  Palette,
  Globe,
  Layers,
  Layout,
  Image,
  Smartphone,
  Monitor,
  Database,
  Github,
} from "lucide-react";

const skills = [
  { name: "HTML & CSS", icon: Layout },
  { name: "Bootstrap", icon: Layers },
  { name: "JavaScript", icon: Code },
  { name: "React JS", icon: Smartphone },
  { name: "Figma", icon: Figma },
  { name: "Photoshop", icon: Image },
  { name: "Illustrator", icon: Palette },
  { name: "VS Code", icon: Monitor },
  { name: "GitHub", icon: Github },
  { name: "WordPress", icon: Globe },
  { name: "Material UI", icon: Database },
];

export default function About() {
  const gridRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 220,
    damping: 25,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 220,
    damping: 25,
  });

  const maskImage = useMotionTemplate`
    radial-gradient(170px circle at ${smoothX}px ${smoothY}px, black, transparent)
  `;

  const [canHover, setCanHover] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setCanHover(mediaQuery.matches);
  }, []);

  const updatePosition = (clientX: number, clientY: number) => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;

    pointerX.set(clientX - rect.left);
    pointerY.set(clientY - rect.top);
  };

  return (
    <section id="about" className="relative py-32 bg-black overflow-hidden">
      <div className="w-full px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* BIO */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Shanmukh Srinadh <br />
              <span className="text-white/50">
                UI/UX Designer & Developer
              </span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I bring strong technical skills, creativity, and a user-centric
              approach to design, ensuring seamless and engaging experiences.
            </p>
          </div>

          {/* GRID */}
          <div
            ref={gridRef}
            className={`relative ${canHover ? "cursor-none" : ""}`}
            style={{ touchAction: "auto" }}
            onPointerEnter={(e) => {
              if (canHover) {
                setIsActive(true);
                updatePosition(e.clientX, e.clientY);
              }
            }}
            onPointerLeave={() => {
              if (canHover) setIsActive(false);
            }}
            onPointerDown={(e) => {
              if (!canHover) return;
              setIsActive(true);
              updatePosition(e.clientX, e.clientY);
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (canHover && isActive) {
                updatePosition(e.clientX, e.clientY);
              }
            }}
            onPointerUp={(e) => {
              if (!canHover) return;
              setIsActive(false);
              e.currentTarget.releasePointerCapture(e.pointerId);
            }}
          >
            {/* Base Grid */}
            <div
              className={`grid grid-cols-3 md:grid-cols-4 gap-4 ${
                canHover ? "opacity-20" : "opacity-100"
              }`}
            >
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`aspect-square flex flex-col items-center justify-center p-4 border ${
                    canHover
                      ? "border-white/20"
                      : "border-primary/40 bg-white/5 backdrop-blur-sm"
                  }`}
                >
                  <skill.icon
                    className={`w-6 h-6 mb-2 ${
                      !canHover
                        ? "text-primary drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                        : ""
                    }`}
                  />
                  <span className="text-[10px] text-center">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Spotlight (Desktop Only) */}
            {canHover && isActive && (
              <motion.div
                className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 gap-4 pointer-events-none"
                style={{
                  maskImage,
                  WebkitMaskImage: maskImage,
                }}
              >
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="aspect-square bg-white/5 border border-primary/50 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
                  >
                    <skill.icon className="w-8 h-8 mb-2 text-primary drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]" />
                    <span className="text-[10px] font-bold text-white uppercase text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}