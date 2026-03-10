"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LetterBlock = ({ letter }: { letter: string }) => {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ scale: 1.05 }}
      className="relative 
      w-14 h-14 
      sm:w-16 sm:h-16 
      md:w-20 md:h-20 
      lg:w-24 lg:h-24
      border-[3px] border-white 
      flex items-center justify-center 
      cursor-pointer transition-all duration-300"
    >
      {/* Corner borders */}
      <div className="absolute w-3 h-3 border-t-2 border-l-2 border-white top-0 left-0" />
      <div className="absolute w-3 h-3 border-t-2 border-r-2 border-white top-0 right-0" />
      <div className="absolute w-3 h-3 border-b-2 border-l-2 border-white bottom-0 left-0" />
      <div className="absolute w-3 h-3 border-b-2 border-r-2 border-white bottom-0 right-0" />

      {/* Outline Letter */}
      <span
        className={`absolute font-bold transition-all duration-300
        text-xl sm:text-2xl md:text-3xl lg:text-4xl
        ${hover ? "opacity-0" : "opacity-100"}`}
        style={{
          WebkitTextStroke: "1px white",
          color: "transparent",
        }}
      >
        {letter}
      </span>

      {/* Filled Letter */}
      <span
        className={`absolute font-bold text-white transition-all duration-300
        text-xl sm:text-2xl md:text-3xl lg:text-4xl
        ${hover ? "opacity-100" : "opacity-0"}`}
      >
        {letter}
      </span>
    </motion.div>
  );
};

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("en-IN", {
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

  const letters = "SHANNU".split("");

  return (
    <footer className="bg-black text-white py-24">

      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* SHANNU blocks */}
        <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 flex-nowrap overflow-x-auto pb-4">
          {letters.map((letter, index) => (
            <LetterBlock key={index} letter={letter} />
          ))}
        </div>

        {/* Bottom text */}
        <p className="mt-10 text-xs sm:text-sm text-cyan-300 font-mono tracking-wide">
          Brewed in Visakhapatnam, India • Currently it is {time}
        </p>

      </div>

    </footer>
  );
}