"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Zap } from "lucide-react";
import { SUBJECTS, DIFFICULTIES } from "@/lib/constants";
import { useInterview } from "@/hooks/useInterview";

export default function SubjectsPage() {
  const router = useRouter();
  const { startSession, isLoading } = useInterview();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const handleStart = async () => {
    if (!selectedSubject || !selectedDifficulty) return;
    const sessionId = await startSession(
      selectedSubject,
      selectedDifficulty as "easy" | "medium" | "hard"
    );
    if (sessionId) {
      router.push(`/interview/${sessionId}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-2">
          Choose Your Subject
        </h1>
        <p className="text-white/40">
          Select a subject and difficulty to start your AI interview
        </p>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {SUBJECTS.map((subject, i) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => setSelectedSubject(subject.id)}
            className="glass p-5 rounded-2xl cursor-pointer transition-all"
            style={{
              border: `1px solid ${
                selectedSubject === subject.id
                  ? subject.color
                  : `${subject.color}20`
              }`,
              boxShadow:
                selectedSubject === subject.id
                  ? `0 0 30px ${subject.color}30`
                  : undefined,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center
                justify-center text-xl"
                style={{ background: `${subject.color}15` }}
              >
                {subject.icon}
              </div>
              <h3 className="text-white font-bold text-sm">
                {subject.name}
              </h3>
            </div>
            <p className="text-white/40 text-xs">{subject.description}</p>
            {selectedSubject === subject.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 flex items-center gap-1"
                style={{ color: subject.color }}
              >
                <Zap className="w-3 h-3" />
                <span className="text-xs font-bold">Selected</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Difficulty */}
      {selectedSubject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 rounded-2xl"
        >
          <h2 className="text-white font-bold text-lg mb-4">
            Select Difficulty
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {DIFFICULTIES.map((diff) => (
              <motion.div
                key={diff.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedDifficulty(diff.id)}
                className="p-4 rounded-xl cursor-pointer text-center transition-all"
                style={{
                  background:
                    selectedDifficulty === diff.id
                      ? `${diff.color}20`
                      : "rgba(255,255,255,0.03)",
                  border: `1px solid ${
                    selectedDifficulty === diff.id
                      ? diff.color
                      : `${diff.color}30`
                  }`,
                }}
              >
                <p
                  className="font-bold text-lg mb-1"
                  style={{ color: diff.color }}
                >
                  {diff.name}
                </p>
                <p className="text-white/40 text-sm">{diff.description}</p>
                <p className="text-white/30 text-xs mt-1">
                  {diff.questions} Questions
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Start Button */}
      {selectedSubject && selectedDifficulty && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            disabled={isLoading}
            className="flex items-center gap-3 px-10 py-4
              rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600
              text-white font-bold text-lg hover:shadow-xl
              hover:shadow-violet-500/30 transition-all
              disabled:opacity-50"
          >
            {isLoading ? (
              <div
                className="w-5 h-5 border-2 border-white/30
                border-t-white rounded-full animate-spin"
              />
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Start Interview
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}