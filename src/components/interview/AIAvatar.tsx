"use client";

import { motion } from "framer-motion";

interface AIAvatarProps {
  isSpeaking: boolean;
  isThinking: boolean;
}

export const AIAvatar = ({ isSpeaking, isThinking }: AIAvatarProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Avatar Container */}
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2
            border-transparent border-t-violet-500 border-r-blue-500"
        />

        {/* Speaking Rings */}
        {isSpeaking && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full
                  border border-violet-500/30"
                animate={{ scale: [1, 1.5 + i * 0.3], opacity: [0.5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{ inset: `-${i * 8}px` }}
              />
            ))}
          </>
        )}

        {/* Thinking Animation */}
        {isThinking && (
          <motion.div
            className="absolute inset-0 rounded-full
              border-2 border-cyan-500/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Avatar Face */}
        <div
          className="absolute inset-2 rounded-full
            bg-gradient-to-br from-violet-600 to-blue-600
            flex items-center justify-center"
          style={{
            boxShadow: isSpeaking
              ? "0 0 30px rgba(139,92,246,0.6)"
              : "0 0 15px rgba(139,92,246,0.3)",
          }}
        >
          <motion.span
            animate={
              isSpeaking
                ? { scale: [1, 1.1, 1] }
                : isThinking
                ? { opacity: [1, 0.5, 1] }
                : {}
            }
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-3xl"
          >
            🧠
          </motion.span>
        </div>
      </div>

      {/* Status */}
      <div className="text-center">
        <p className="text-white font-bold text-sm">AI Interviewer</p>
        <div className="flex items-center gap-1.5 justify-center mt-1">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: isSpeaking
                ? "#10b981"
                : isThinking
                ? "#f59e0b"
                : "#8b5cf6",
            }}
          />
          <span className="text-white/40 text-xs">
            {isSpeaking
              ? "Speaking..."
              : isThinking
              ? "Thinking..."
              : "Ready"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AIAvatar;