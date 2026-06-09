"use client";

import { motion } from "framer-motion";

interface VoiceVisualizerProps {
  isRecording: boolean;
  audioLevel: number;
}

export const VoiceVisualizer = ({
  isRecording,
  audioLevel,
}: VoiceVisualizerProps) => {
  const bars = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {bars.map((bar) => {
        const height = isRecording
          ? Math.random() * audioLevel * 0.8 + 10
          : 4;

        return (
          <motion.div
            key={bar}
            animate={{ height: `${height}%` }}
            transition={{
              duration: 0.1,
              ease: "easeOut",
            }}
            className="w-1 rounded-full"
            style={{
              background: isRecording
                ? `rgba(139, 92, 246, ${0.4 + (audioLevel / 100) * 0.6})`
                : "rgba(255,255,255,0.1)",
              minHeight: "4px",
              maxHeight: "100%",
            }}
          />
        );
      })}
    </div>
  );
};

export default VoiceVisualizer;