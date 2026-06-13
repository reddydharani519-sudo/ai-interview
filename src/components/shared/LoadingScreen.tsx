"use client";

import { motion } from "framer-motion";

export const LoadingScreen = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "#0d2318" }}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2
          -translate-y-1/2 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center
            justify-center"
            style={{
              background:
                "linear-gradient(135deg, #10b981, #059669)",
              boxShadow: "0 0 30px rgba(16,185,129,0.4)",
            }}
          >
            <span className="text-2xl font-black text-white">AI</span>
          </div>
          <div>
            <h1 className="text-white font-black text-xl leading-none">
              AI Interview
            </h1>
            <p className="text-green-400 font-bold text-sm">PRO</p>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-64"
        >
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #10b981, #f59e0b, #ef4444)",
              }}
            />
          </div>
        </motion.div>

        {/* Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full"
              style={{ background: "#10b981" }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;