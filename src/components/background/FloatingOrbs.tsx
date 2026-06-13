"use client";

import { motion } from "framer-motion";

const orbs = [
  {
    id: 1,
    size: 700,
    color: "rgba(239, 68, 68, 0.07)",
    x: "5%",
    y: "10%",
    duration: 25,
    delay: 0,
  },
  {
    id: 2,
    size: 600,
    color: "rgba(245, 158, 11, 0.06)",
    x: "75%",
    y: "5%",
    duration: 30,
    delay: 5,
  },
  {
    id: 3,
    size: 500,
    color: "rgba(16, 185, 129, 0.08)",
    x: "85%",
    y: "65%",
    duration: 22,
    delay: 3,
  },
  {
    id: 4,
    size: 400,
    color: "rgba(239, 68, 68, 0.05)",
    x: "15%",
    y: "75%",
    duration: 28,
    delay: 8,
  },
  {
    id: 5,
    size: 450,
    color: "rgba(245, 158, 11, 0.05)",
    x: "50%",
    y: "50%",
    duration: 35,
    delay: 4,
  },
  {
    id: 6,
    size: 550,
    color: "rgba(16, 185, 129, 0.06)",
    x: "30%",
    y: "30%",
    duration: 20,
    delay: 2,
  },
];

export const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            left: orb.x,
            top: orb.y,
            transform: "translate(-50%, -50%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, 60, -40, 30, 0],
            y: [0, -40, 60, -30, 0],
            scale: [1, 1.05, 0.98, 1.03, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Top aurora red */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-80"
        style={{
          background:
            "linear-gradient(180deg, rgba(239,68,68,0.05) 0%, transparent 100%)",
          filter: "blur(60px)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom aurora green */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-80"
        style={{
          background:
            "linear-gradient(0deg, rgba(16,185,129,0.07) 0%, transparent 100%)",
          filter: "blur(60px)",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Center aurora yellow */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-96"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.04), transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      {/* Extra green glow */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.06), transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 dot-grid"
        style={{ opacity: 0.3 }}
      />
    </div>
  );
};

export default FloatingOrbs;