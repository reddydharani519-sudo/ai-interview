"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Star,
  Clock,
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { formatScore } from "@/lib/utils";

export const StatsCards = () => {
  const { user } = useAuth();
  const stats = user?.stats;

  const cards = [
    {
      label: "Total Interviews",
      value: stats?.totalInterviews || 0,
      icon: BookOpen,
      color: "#8b5cf6",
      suffix: "",
    },
    {
      label: "Average Score",
      value: stats?.averageScore || 0,
      icon: Star,
      color: "#f59e0b",
      suffix: "%",
    },
    {
      label: "Hours Practiced",
      value: stats?.hoursPracticed || 0,
      icon: Clock,
      color: "#06b6d4",
      suffix: "h",
    },
    {
      label: "Current Streak",
      value: stats?.currentStreak || 0,
      icon: Trophy,
      color: "#10b981",
      suffix: " days",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="glass p-5 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `${card.color}15`,
                  border: `1px solid ${card.color}30`,
                }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{ color: card.color }}
                />
              </div>
            </div>
            <p
              className="text-3xl font-black mb-1"
              style={{ color: card.color }}
            >
              {card.value}
              {card.suffix}
            </p>
            <p className="text-white/40 text-sm">{card.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;