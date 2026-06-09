"use client";

import { motion } from "framer-motion";
import { Clock, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getScoreColor } from "@/lib/utils";

const mockSessions = [
  {
    id: "1",
    subject: "React",
    difficulty: "Medium",
    score: 92,
    duration: "18 min",
    date: "Today",
    icon: "⚛️",
  },
  {
    id: "2",
    subject: "JavaScript",
    difficulty: "Hard",
    score: 78,
    duration: "22 min",
    date: "Yesterday",
    icon: "⚡",
  },
  {
    id: "3",
    subject: "Python",
    difficulty: "Easy",
    score: 85,
    duration: "15 min",
    date: "2 days ago",
    icon: "🐍",
  },
  {
    id: "4",
    subject: "DBMS",
    difficulty: "Medium",
    score: 70,
    duration: "20 min",
    date: "3 days ago",
    icon: "🗄️",
  },
];

export const RecentSessions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass p-6 rounded-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold text-lg">Recent Sessions</h3>
        <Link
          href="/subjects"
          className="text-violet-400 text-sm hover:text-violet-300
            transition-colors flex items-center gap-1"
        >
          View all
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {mockSessions.map((session, i) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-4 p-4 rounded-xl
              bg-white/3 border border-white/5
              hover:bg-white/5 transition-all cursor-pointer group"
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center
              justify-center text-xl bg-white/5 flex-shrink-0"
            >
              {session.icon}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white font-medium text-sm">
                  {session.subject}
                </p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full
                  bg-white/5 text-white/40"
                >
                  {session.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-white/30 text-xs">
                  <Clock className="w-3 h-3" />
                  {session.duration}
                </div>
                <span className="text-white/20 text-xs">•</span>
                <span className="text-white/30 text-xs">{session.date}</span>
              </div>
            </div>

            {/* Score */}
            <div className="text-right flex-shrink-0">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400" />
                <span
                  className="font-bold text-sm"
                  style={{ color: getScoreColor(session.score) }}
                >
                  {session.score}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentSessions;