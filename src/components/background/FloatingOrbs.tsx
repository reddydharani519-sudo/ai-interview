"use client";

import { motion } from "framer-motion";

const orbs = [
  {
    id: 1,
    size: 600,
    color: "rgba(139, 92, 246, 0.12)",
    x: "10%",
    y: "20%",
    duration: 20,
    delay: 0,
  },
  {
    id: 2,
    size: 500,
    color: "rgba(59, 130, 246, 0.10)",
    x: "70%",
    y: "10%",
    duration: 25,
    delay: 5,
  },
  {
    id: 3,
    size: 400,
    color: "rgba(6, 182, 212, 0.08)",
    x: "80%",
    y: "60%",
    duration: 18,
    delay: 2,
  },
  {
    id: 4,
    size: 450,
    color: "rgba(236, 72, 153, 0.08)",
    x: "20%",
    y: "70%",
    duration: 22,
    delay: 8,
  },
  {
    id: 5,
    size: 350,
    color: "rgba(16, 185, 129, 0.07)",
    x: "50%",
    y: "50%",
    duration: 30,
    delay: 3,
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
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 80, -60, 40, 0],
            y: [0, -60, 80, -40, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
            opacity: [0.6, 0.9, 0.7, 0.8, 0.6],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Aurora Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.03) 0%, transparent 50%, rgba(6,182,212,0.03) 100%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top Aurora */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-96"
        style={{
          background:
            "linear-gradient(180deg, rgba(139,92,246,0.08) 0%, transparent 100%)",
          filter: "blur(40px)",
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scaleX: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom Aurora */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-96"
        style={{
          background:
            "linear-gradient(0deg, rgba(59,130,246,0.06) 0%, transparent 100%)",
          filter: "blur(40px)",
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scaleX: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
};

export default FloatingOrbs;