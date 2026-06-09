"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Trophy, Star, Clock, ArrowRight, RotateCcw } from "lucide-react";
import { useInterviewStore } from "@/store/interviewStore";
import { getScoreColor, getScoreLabel } from "@/lib/utils";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const { session, resetInterview } = useInterviewStore();

  const handleRetry = () => {
    resetInterview();
    router.push("/subjects");
  };

  const handleDashboard = () => {
    resetInterview();
    router.push("/dashboard");
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-white/40 mb-4">No session data found</p>
          <button
            onClick={() => router.push("/subjects")}
            className="text-violet-400 hover:text-violet-300"
          >
            Start New Interview
          </button>
        </div>
      </div>
    );
  }

  const avgScore = session.score || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass p-8 rounded-3xl text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15))",
          border: "1px solid rgba(139,92,246,0.3)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.15), transparent 60%)",
          }}
        />

        <div className="relative z-10">
          {/* Trophy */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-6xl mb-4"
          >
            {avgScore >= 80 ? "🏆" : avgScore >= 60 ? "⭐" : "💪"}
          </motion.div>

          <h1 className="text-3xl font-black text-white mb-2">
            Interview Complete!
          </h1>
          <p className="text-white/50 mb-6">
            Here's how you performed in your {session.subject} interview
          </p>

          {/* Score */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="inline-flex flex-col items-center"
          >
            <span
              className="text-7xl font-black"
              style={{ color: getScoreColor(avgScore) }}
            >
              {Math.round(avgScore)}%
            </span>
            <span
              className="text-lg font-bold mt-1"
              style={{ color: getScoreColor(avgScore) }}
            >
              {getScoreLabel(avgScore)}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            icon: Trophy,
            label: "Final Score",
            value: `${Math.round(avgScore)}%`,
            color: "#f59e0b",
          },
          {
            icon: Star,
            label: "Questions",
            value: session.answers.length,
            color: "#8b5cf6",
          },
          {
            icon: Clock,
            label: "Duration",
            value: `${session.duration || 0} min`,
            color: "#06b6d4",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass p-5 rounded-2xl text-center"
            >
              <Icon
                className="w-6 h-6 mx-auto mb-2"
                style={{ color: stat.color }}
              />
              <p
                className="text-2xl font-black"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="text-white/40 text-sm">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Feedback Per Question */}
      {session.feedback.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-6 rounded-2xl"
        >
          <h2 className="text-white font-bold text-lg mb-4">
            Question Breakdown
          </h2>
          <div className="space-y-4">
            {session.feedback.map((fb, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="p-4 rounded-xl bg-white/3
                  border border-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">
                    Question {i + 1}
                  </span>
                  <span
                    className="font-bold text-sm"
                    style={{ color: getScoreColor(fb.score) }}
                  >
                    {fb.score}%
                  </span>
                </div>

                {/* Score Bar */}
                <div className="h-1.5 bg-white/5 rounded-full mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fb.score}%` }}
                    transition={{ duration: 0.8, delay: 0.1 * i }}
                    className="h-full rounded-full"
                    style={{
                      background: getScoreColor(fb.score),
                    }}
                  />
                </div>

                <p className="text-white/50 text-xs leading-relaxed">
                  {fb.suggestion}
                </p>

                {/* Strengths */}
                {fb.strengths.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {fb.strengths.map((s, j) => (
                      <span
                        key={j}
                        className="text-xs px-2 py-0.5 rounded-full
                          bg-green-500/10 text-green-400
                          border border-green-500/20"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRetry}
          className="flex-1 flex items-center justify-center gap-2
            py-4 rounded-2xl border border-white/10
            bg-white/5 text-white font-bold
            hover:bg-white/10 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDashboard}
          className="flex-1 flex items-center justify-center gap-2
            py-4 rounded-2xl
            bg-gradient-to-r from-violet-600 to-blue-600
            text-white font-bold hover:shadow-lg
            hover:shadow-violet-500/30 transition-all"
        >
          Go to Dashboard
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}