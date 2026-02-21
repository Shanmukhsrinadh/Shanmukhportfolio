import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useEffect, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": any;
    }
  }
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex items-center py-20 md:py-0">

      {/* ========== Spline Background (Zoomed 10%) ========== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* @ts-ignore */}
        <spline-viewer
          url="https://prod.spline.design/5FhkalGo8zOKwTsh/scene.splinecode"
          class="w-full h-full scale-150 md:scale-110"
          loading-anim-type="none"
        />
      </div>

      {/* Overlay (does NOT block interaction) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black pointer-events-none z-10" />

      {/* ========== Content ========== */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary mb-4 md:mb-6"
          >
            Shanmukh Srinadh
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] md:leading-[1.05]"
          >
            Designing
            <br />
            <span className="text-white/40">Thoughtful</span>
            <br />
            Digital Experiences
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-8"
          >
            <p className="max-w-md text-muted-foreground text-base md:text-lg leading-relaxed">
              UI/UX Designer & Web Developer crafting refined,
              human-centered interfaces with modern technologies.
            </p>

            <a
              href="#projects"
              className="group inline-flex items-center gap-4 text-white font-medium self-start md:self-auto"
            >
              <span className="relative">
                View Projects
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
              </span>

              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all group-hover:bg-white group-hover:text-black">
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </a>
          </motion.div>

        </div>
      </div>

      {/* ========== Original Scroll Indicator (Restored Animation) ========== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>

    </section>
  );
}
