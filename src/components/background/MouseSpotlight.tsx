"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const MouseSpotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Main Spotlight */}
      <motion.div
        className="fixed pointer-events-none z-0"
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(20px)",
        }}
      />

      {/* Inner Glow */}
      <motion.div
        className="fixed pointer-events-none z-0"
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 200,
          height: 200,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(10px)",
        }}
      />

      {/* Cursor Dot */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: mouseX,
          top: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          background: "rgba(139, 92, 246, 0.8)",
          borderRadius: "50%",
          boxShadow: "0 0 10px rgba(139, 92, 246, 0.8)",
        }}
      />

      {/* Cursor Ring */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 40,
          height: 40,
          border: "1px solid rgba(139, 92, 246, 0.3)",
          borderRadius: "50%",
        }}
      />
    </>
  );
};

export default MouseSpotlight;