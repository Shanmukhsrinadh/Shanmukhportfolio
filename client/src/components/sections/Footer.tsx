"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LetterBlock = ({ letter }: { letter: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-24 h-24 border-4 border-white bg-white/5 backdrop-blur-sm flex items-center justify-center relative cursor-pointer group transition-all duration-300"
      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
    >
      {/* Corner borders */}
      <div className="absolute w-5 h-5 border-t-2 border-l-2 border-white top-0 left-0" />
      <div className="absolute w-5 h-5 border-t-2 border-r-2 border-white top-0 right-0" />
      <div className="absolute w-5 h-5 border-b-2 border-l-2 border-white bottom-0 left-0" />
      <div className="absolute w-5 h-5 border-b-2 border-r-2 border-white bottom-0 right-0" />

      {/* Letter outline (default) */}
      <span
        className={`text-5xl font-bold transition-all duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
        style={{
          WebkitTextStroke: "1px white",
          color: "transparent",
        }}
      >
        {letter}
      </span>

      {/* Letter solid (on hover) */}
      <span
        className={`text-5xl font-bold text-white absolute transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {letter}
      </span>
    </motion.div>
  );
};

export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  const name = "SHANNU";
  const letters = name.split("");

  return (
    <footer className="relative w-full py-24 bg-black text-white overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534996858221-380b92700493?q=80&w=1631&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />

      <div className="absolute inset-0 bg-black/75 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight"
        >
          Let's Create Something <br />
          <span className="text-white/40">Amazing Together</span>
        </motion.h3>

        {/* Letter Blocks */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap gap-6 justify-center mb-16"
        >
          {letters.map((letter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <LetterBlock letter={letter} />
            </motion.div>
          ))}
        </motion.div>

        {/* Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center"
        >
          {/* Location */}
          <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
            <p className="text-white/60 text-sm uppercase tracking-widest mb-2">
              Location
            </p>
            <p className="text-2xl font-semibold">Visakhapatnam, India</p>
          </div>

          {/* Current Time */}
          <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
            <p className="text-white/60 text-sm uppercase tracking-widest mb-2">
              Current Time
            </p>
            <p className="text-2xl font-semibold font-mono">{currentTime}</p>
          </div>

          {/* Status */}
          <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
            <p className="text-white/60 text-sm uppercase tracking-widest mb-2">
              Status
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-2xl font-semibold">Open to Work</p>
            </div>
          </div>
        </motion.div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-4 border-t border-white/10 pt-8"
        >
          <p className="text-white/70 text-sm leading-relaxed">
            Shanmukh Srinadh • Brewed in Visakhapatnam, India • <br />
            Currently designing the future with code & creativity
          </p>
          <p className="text-white/50 text-xs">
            © 2026 Shanmukh Srinadh. Crafted with Design Excellence.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
