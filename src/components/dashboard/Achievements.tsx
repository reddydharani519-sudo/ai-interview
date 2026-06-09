"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const achievements = [
  {
    id: 1,
    icon: "🏆",
    title: "First Interview",
    description: "Completed your first session",
    unlocked: true,
    color: "#f59e0b",
  },
  {
    id: 2,
    icon: "🔥",
    title: "On Fire",
    description: "7 day practice streak",
    unlocked: true,
    color: "#ef4444",
  },
  {
    id: 3,
    icon: "⭐",
    title: "High Scorer",
    description: "Score above 90% once",
    unlocked: true,
    color: "#8b5cf6",
  },
  {
    id: 4,
    icon: "🧠",
    title: "AI Master",
    description: "Complete 50 interviews",
    unlocked: false,
    color: "#06b6d4",
  },
];

export const Achievements = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass p-6 rounded-2xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <h3 className="text-white font-bold text-lg">Achievements</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement, i) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded-xl text-center transition-all"
            style={{
              background: achievement.unlocked
                ? `${achievement.color}10`
                : "rgba(255,255,255,0.02)",
              border: `1px solid ${
                achievement.unlocked
                  ? `${achievement.color}30`
                  : "rgba(255,255,255,0.05)"
              }`,
              opacity: achievement.unlocked ? 1 : 0.4,
            }}
          >
            <div className="text-2xl mb-1">{achievement.icon}</div>
            <p className="text-white text-xs font-bold leading-tight">
              {achievement.title}
            </p>
            <p className="text-white/30 text-xs mt-0.5 leading-tight">
              {achievement.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Achievements;