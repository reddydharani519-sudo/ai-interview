import { useState, useCallback } from "react";
import {
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useInterviewStore } from "@/store/interviewStore";
import { useAuthStore } from "@/store/authStore";
import { InterviewSession, Answer, SessionFeedback } from "@/types/interview";
import { Question } from "@/types/question";
import { generateSessionId } from "@/lib/utils";
import { QUESTION_TIME_LIMIT } from "@/lib/constants";

export const useInterview = () => {
  const { user } = useAuthStore();
  const {
    session,
    currentQuestionIndex,
    isRecording,
    isAISpeaking,
    isLoading,
    error,
    timeRemaining,
    setSession,
    setCurrentQuestion,
    nextQuestion,
    setRecording,
    setAISpeaking,
    setLoading,
    setError,
    setTimeRemaining,
    resetInterview,
  } = useInterviewStore();

  const startSession = useCallback(
    async (subject: string, difficulty: "easy" | "medium" | "hard") => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        const sessionId = generateSessionId();

        // Fetch questions from backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/questions`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subject, difficulty, count: 10 }),
          }
        );

        const { questions } = await response.json();

        const newSession: InterviewSession = {
          id: sessionId,
          userId: user.uid,
          subject,
          difficulty,
          status: "active",
          questions,
          answers: [],
          feedback: [],
          score: 0,
          duration: 0,
          startedAt: new Date().toISOString(),
        };

        // Save to Firestore
        await setDoc(doc(db, "sessions", sessionId), {
          ...newSession,
          startedAt: serverTimestamp(),
        });

        setSession(newSession);
        setLoading(false);

        return sessionId;
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    },
    [user]
  );

  const submitAnswer = useCallback(
    async (answerText: string, audioBlob?: Blob) => {
      if (!session || !user) return;

      try {
        setLoading(true);

        const currentQuestion =
          session.questions[currentQuestionIndex];

        // Get AI feedback
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/interview/feedback`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question: currentQuestion.text,
              answer: answerText,
              subject: session.subject,
              difficulty: session.difficulty,
            }),
          }
        );

        const feedback: SessionFeedback = await response.json();

        const answer: Answer = {
          questionId: currentQuestion.id,
          text: answerText,
          timeTaken: QUESTION_TIME_LIMIT - timeRemaining,
          score: feedback.score,
          feedback: feedback.suggestion,
          submittedAt: new Date().toISOString(),
        };

        const updatedSession: InterviewSession = {
          ...session,
          answers: [...session.answers, answer],
          feedback: [...session.feedback, feedback],
        };

        setSession(updatedSession);

        // Update Firestore
        await updateDoc(doc(db, "sessions", session.id), {
          answers: updatedSession.answers,
          feedback: updatedSession.feedback,
        });

        setLoading(false);
        nextQuestion();

        return feedback;
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    },
    [session, currentQuestionIndex, timeRemaining, user]
  );

  const completeSession = useCallback(async () => {
    if (!session) return;

    try {
      const totalScore =
        session.feedback.reduce((sum, f) => sum + f.score, 0) /
        session.feedback.length;

      const updatedSession: InterviewSession = {
        ...session,
        status: "completed",
        score: totalScore,
        completedAt: new Date().toISOString(),
      };

      setSession(updatedSession);

      await updateDoc(doc(db, "sessions", session.id), {
        status: "completed",
        score: totalScore,
        completedAt: serverTimestamp(),
      });

      return updatedSession;
    } catch (err: any) {
      setError(err.message);
    }
  }, [session]);

  return {
    session,
    currentQuestionIndex,
    currentQuestion: session?.questions[currentQuestionIndex] || null,
    isRecording,
    isAISpeaking,
    isLoading,
    error,
    timeRemaining,
    startSession,
    submitAnswer,
    completeSession,
    resetInterview,
    setRecording,
    setAISpeaking,
    setTimeRemaining,
  };
};