"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { AIAvatar } from "@/components/interview/AIAvatar";
import { CameraFeed } from "@/components/interview/CameraFeed";
import { QuestionPanel } from "@/components/interview/QuestionPanel";
import { AnswerSection } from "@/components/interview/AnswerSection";
import { InterviewTimer } from "@/components/interview/InterviewTimer";
import { ScoreTracker } from "@/components/interview/ScoreTracker";
import { useInterview } from "@/hooks/useInterview";

export default function InterviewPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;
  const [scores, setScores] = useState<number[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);

  const {
    session,
    currentQuestionIndex,
    currentQuestion,
    isLoading,
    submitAnswer,
    completeSession,
  } = useInterview();

  useEffect(() => {
    if (!session) return;
    if (currentQuestionIndex >= session.questions.length) {
      handleComplete();
    }
  }, [currentQuestionIndex, session]);

  const handleSubmit = async (answer: string, audioBlob?: Blob) => {
    setIsAIThinking(true);
    const feedback = await submitAnswer(answer, audioBlob);
    setIsAIThinking(false);

    if (feedback) {
      setScores((prev) => [...prev, feedback.score]);
      setCurrentScore(feedback.score);
      setIsAISpeaking(true);
      setTimeout(() => setIsAISpeaking(false), 3000);
    }
  };

  const handleComplete = async () => {
    const completed = await completeSession();
    if (completed) {
      router.push(`/results/${sessionId}`);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-96">
        <div
          className="w-8 h-8 border-2 border-violet-500
          border-t-transparent rounded-full animate-spin"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">
            {session.subject} Interview
          </h1>
          <p className="text-white/40 text-sm capitalize">
            {session.difficulty} difficulty
          </p>
        </div>
        <InterviewTimer />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left — Camera */}
        <div className="space-y-4">
          <CameraFeed />
          <ScoreTracker
            scores={scores}
            currentScore={currentScore}
          />
        </div>

        {/* Center — Question + Answer */}
        <div className="space-y-4">
          <QuestionPanel
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={session.questions.length}
          />
          <AnswerSection
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        {/* Right — AI Interviewer */}
        <div className="flex flex-col items-center justify-start pt-8">
          <AIAvatar
            isSpeaking={isAISpeaking}
            isThinking={isAIThinking}
          />

          {/* AI Message */}
          <motion.div
            className="mt-6 glass p-4 rounded-2xl w-full"
            animate={isAISpeaking ? { borderColor: "rgba(139,92,246,0.5)" } : {}}
          >
            <p className="text-white/60 text-sm text-center leading-relaxed">
              {isAIThinking
                ? "Analyzing your answer..."
                : isAISpeaking
                ? "Great answer! Let me give you feedback..."
                : currentQuestion
                ? "Please answer the question to the best of your ability."
                : "Loading next question..."}
            </p>
          </motion.div>

          {/* End Interview */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleComplete}
            className="mt-4 w-full py-3 rounded-xl
              border border-red-500/30 text-red-400
              hover:bg-red-500/10 transition-all text-sm font-medium"
          >
            End Interview
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}