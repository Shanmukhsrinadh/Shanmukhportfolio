"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": any;
    }
  }
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">

      {/* ================= Spline Background ================= */}
      <div className="absolute inset-0 z-0">
        <spline-viewer
          url="https://prod.spline.design/5FhkalGo8zOKwTsh/scene.splinecode"
          class="w-full h-full scale-[1.1] origin-center pointer-events-auto"
          loading-anim-type="none"
        />
      </div>

      {/* ================= Soft Global Overlay ================= */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40 pointer-events-none z-10" />

      {/* ================= Bottom Cinematic Fade ================= */}
      <div className="absolute bottom-0 left-0 w-full h-56 bg-gradient-to-b from-transparent to-black pointer-events-none z-20" />

      {/* ================= Content ================= */}
      <div className="relative z-30 w-full px-6 md:px-12 lg:px-24 pointer-events-none">
        <div className="max-w-5xl">

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm tracking-[0.3em] uppercase text-primary mb-6"
          >
            Shanmukh Srinadh
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.05]"
          >
            Designing
            <br />
            <span className="text-white/50">Thoughtful</span>
            <br />
            Digital Experiences
          </motion.h1>

          {/* Description + CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 flex flex-col md:flex-row md:items-center gap-8"
          >
            <p className="max-w-md text-white/70 text-lg leading-relaxed">
              UI/UX Designer & Web Developer crafting refined,
              human-centered interfaces with modern technologies.
            </p>

            {/* CTA Button */}
            <a
              href="#projects"
              className="group inline-flex items-center gap-4 text-white font-medium pointer-events-auto"
            >
              <span className="relative">
                View Projects
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </span>

              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black">
                <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </a>
          </motion.div>

        </div>
      </div>

      {/* ================= Scroll Indicator ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none"
      >
        <span className="text-xs uppercase tracking-widest text-white/60">
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