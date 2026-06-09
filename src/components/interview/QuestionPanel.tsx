"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { Question } from "@/types/question";

interface QuestionPanelProps {
  question: Question | null;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionPanel = ({
  question,
  questionNumber,
  totalQuestions,
}: QuestionPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg bg-violet-500/20
            flex items-center justify-center"
          >
            <Lightbulb className="w-4 h-4 text-violet-400" />
          </div>
          <span className="text-white/60 text-sm font-medium">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{
                background:
                  i < questionNumber
                    ? "#8b5cf6"
                    : i === questionNumber - 1
                    ? "#8b5cf6"
                    : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Question Text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question?.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {question ? (
            <>
              <p className="text-white text-lg font-medium leading-relaxed mb-4">
                {question.text}
              </p>
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-lg
                      bg-violet-500/10 text-violet-400
                      border border-violet-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <div className="h-4 bg-white/5 rounded animate-pulse" />
              <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionPanel;