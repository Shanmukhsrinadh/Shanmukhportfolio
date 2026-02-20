import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CursorFollower() {
  const [isMobile, setIsMobile] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      if (!isMobile) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", moveCursor);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed left-0 top-0 w-8 h-8 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm pointer-events-none z-100 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}
