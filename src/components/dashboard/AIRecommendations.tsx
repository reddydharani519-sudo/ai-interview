"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const recommendations = [
  {
    subject: "Data Structures",
    reason: "Low practice time detected",
    color: "#ec4899",
    icon: "🌳",
  },
  {
    subject: "System Design",
    reason: "Trending in interviews",
    color: "#8b5cf6",
    icon: "🏗️",
  },
  {
    subject: "OS Concepts",
    reason: "Score below average",
    color: "#3b82f6",
    icon: "💻",
  },
];

export const AIRecommendations = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass p-6 rounded-2xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-violet-400" />
        <h3 className="text-white font-bold text-lg">
          AI Recommendations
        </h3>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <motion.div
            key={rec.subject}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl
              bg-white/3 border border-white/5
              hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center
              justify-center text-sm flex-shrink-0"
              style={{ background: `${rec.color}15` }}
            >
              {rec.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {rec.subject}
              </p>
              <p className="text-white/30 text-xs">{rec.reason}</p>
            </div>
            <ArrowRight
              className="w-4 h-4 text-white/20
              group-hover:text-white/60 transition-colors flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIRecommendations;