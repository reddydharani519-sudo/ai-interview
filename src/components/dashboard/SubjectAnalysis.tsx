"use client";

import { motion } from "framer-motion";
import { SUBJECTS } from "@/lib/constants";

const mockScores: Record<string, number> = {
  react: 92,
  javascript: 85,
  python: 78,
  java: 70,
  dbms: 65,
  dsa: 60,
};

export const SubjectAnalysis = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass p-6 rounded-2xl"
    >
      <h3 className="text-white font-bold text-lg mb-6">
        Subject Analysis
      </h3>
      <div className="space-y-4">
        {SUBJECTS.slice(0, 6).map((subject, i) => {
          const score = mockScores[subject.id] || 50;
          return (
            <div key={subject.id}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{subject.icon}</span>
                  <span className="text-white/70 text-sm">
                    {subject.name}
                  </span>
                </div>
                <span
                  className="text-sm font-bold"
                  style={{ color: subject.color }}
                >
                  {score}%
                </span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${subject.color}, ${subject.color}80)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SubjectAnalysis;