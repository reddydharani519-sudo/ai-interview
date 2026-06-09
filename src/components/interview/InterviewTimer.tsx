"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useInterviewStore } from "@/store/interviewStore";
import { formatDuration } from "@/lib/utils";
import { QUESTION_TIME_LIMIT } from "@/lib/constants";

export const InterviewTimer = () => {
  const { timeRemaining, setTimeRemaining } = useInterviewStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(Math.max(0, timeRemaining - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining]);

  const percentage = (timeRemaining / QUESTION_TIME_LIMIT) * 100;
  const isWarning = timeRemaining <= 30;
  const isDanger = timeRemaining <= 10;

  const color = isDanger
    ? "#ef4444"
    : isWarning
    ? "#f59e0b"
    : "#8b5cf6";

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12">
        {/* Circle Progress */}
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="3"
          />
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${2 * Math.PI * 20 * (1 - percentage / 100)}`}
            transition={{ duration: 0.5 }}
          />
        </svg>

        {/* Clock Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Clock className="w-4 h-4" style={{ color }} />
        </div>
      </div>

      <div>
        <motion.p
          animate={isDanger ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-lg font-black"
          style={{ color }}
        >
          {formatDuration(timeRemaining)}
        </motion.p>
        <p className="text-white/30 text-xs">remaining</p>
      </div>
    </div>
  );
};

export default InterviewTimer;