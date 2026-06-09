"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { getScoreColor, getScoreLabel } from "@/lib/utils";

interface ScoreTrackerProps {
  scores: number[];
  currentScore: number;
}

export const ScoreTracker = ({
  scores,
  currentScore,
}: ScoreTrackerProps) => {
  const average =
    scores.length > 0
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass p-4 rounded-2xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-4 h-4 text-yellow-400" />
        <span className="text-white font-bold text-sm">Score Tracker</span>
      </div>

      {/* Current Score */}
      <div className="text-center mb-4">
        <motion.p
          key={currentScore}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl font-black"
          style={{ color: getScoreColor(currentScore) }}
        >
          {Math.round(currentScore)}%
        </motion.p>
        <p
          className="text-sm font-medium"
          style={{ color: getScoreColor(currentScore) }}
        >
          {getScoreLabel(currentScore)}
        </p>
      </div>

      {/* Score History */}
      <div className="flex items-end gap-1 h-12">
        {scores.map((score, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${score}%` }}
            className="flex-1 rounded-sm"
            style={{
              background: getScoreColor(score),
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Average */}
      {scores.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-xs">Average</span>
            <span
              className="text-sm font-bold"
              style={{ color: getScoreColor(average) }}
            >
              {Math.round(average)}%
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ScoreTracker;