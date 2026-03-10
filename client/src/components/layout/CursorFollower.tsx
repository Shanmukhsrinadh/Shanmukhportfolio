import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CursorFollower() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports hover (has mouse/pointer)
    const mediaQuery = window.matchMedia("(hover: hover)");
    const isHoverSupported = mediaQuery.matches;
    
    // Also check for touch events
    const hasTouchSupport = () => {
      return (
        window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches ||
        navigator.maxTouchPoints > 0
      );
    };

    if (!isHoverSupported || hasTouchSupport()) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  // Don't render cursor ball on touch devices
  if (isTouchDevice) {
    return null;
  }

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
