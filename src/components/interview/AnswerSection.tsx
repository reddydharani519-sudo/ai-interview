"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Send, RotateCcw } from "lucide-react";
import { useVoice } from "@/hooks/useVoice";
import { VoiceVisualizer } from "./VoiceVisualizer";

interface AnswerSectionProps {
  onSubmit: (answer: string, audioBlob?: Blob) => void;
  isLoading: boolean;
}

export const AnswerSection = ({
  onSubmit,
  isLoading,
}: AnswerSectionProps) => {
  const [textAnswer, setTextAnswer] = useState("");
  const [mode, setMode] = useState<"text" | "voice">("text");

  const {
    isRecording,
    audioBlob,
    audioLevel,
    transcript,
    startRecording,
    stopRecording,
    resetRecording,
  } = useVoice();

  const handleSubmit = () => {
    const answer = mode === "voice" ? transcript : textAnswer;
    if (!answer.trim()) return;
    onSubmit(answer, audioBlob || undefined);
    setTextAnswer("");
    resetRecording();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-2xl space-y-4"
    >
      {/* Mode Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMode("text")}
          className={`flex-1 py-2 rounded-xl text-sm font-medium
            transition-all ${
              mode === "text"
                ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                : "bg-white/5 text-white/40 border border-white/10"
            }`}
        >
          Type Answer
        </button>
        <button
          onClick={() => setMode("voice")}
          className={`flex-1 py-2 rounded-xl text-sm font-medium
            transition-all ${
              mode === "voice"
                ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                : "bg-white/5 text-white/40 border border-white/10"
            }`}
        >
          Voice Answer
        </button>
      </div>

      {/* Text Mode */}
      <AnimatePresence mode="wait">
        {mode === "text" ? (
          <motion.div
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={5}
              className="w-full bg-white/5 border border-white/10
                rounded-xl p-4 text-white text-sm
                placeholder:text-white/20 outline-none
                focus:border-violet-500/50 transition-all
                resize-none"
            />
          </motion.div>
        ) : (
          <motion.div
            key="voice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Visualizer */}
            <div
              className="bg-white/3 border border-white/5
              rounded-xl p-4"
            >
              <VoiceVisualizer
                isRecording={isRecording}
                audioLevel={audioLevel}
              />
            </div>

            {/* Transcript */}
            {transcript && (
              <div
                className="bg-white/3 border border-white/5
                rounded-xl p-4"
              >
                <p className="text-white/70 text-sm">{transcript}</p>
              </div>
            )}

            {/* Record Button */}
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isRecording ? stopRecording : startRecording}
                className="flex items-center gap-2 px-6 py-3
                  rounded-xl font-medium text-sm transition-all"
                style={{
                  background: isRecording
                    ? "rgba(239,68,68,0.2)"
                    : "rgba(139,92,246,0.2)",
                  border: `1px solid ${
                    isRecording
                      ? "rgba(239,68,68,0.3)"
                      : "rgba(139,92,246,0.3)"
                  }`,
                  color: isRecording ? "#ef4444" : "#8b5cf6",
                }}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    Start Recording
                  </>
                )}
              </motion.button>

              {audioBlob && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetRecording}
                  className="p-3 rounded-xl bg-white/5
                    border border-white/10 text-white/40
                    hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={
          isLoading ||
          (mode === "text" ? !textAnswer.trim() : !transcript.trim())
        }
        className="w-full py-3 rounded-xl
          bg-gradient-to-r from-violet-600 to-blue-600
          text-white font-bold flex items-center
          justify-center gap-2 hover:shadow-lg
          hover:shadow-violet-500/30 transition-all
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div
            className="w-5 h-5 border-2 border-white/30
            border-t-white rounded-full animate-spin"
          />
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Answer
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default AnswerSection;