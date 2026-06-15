import { useCallback } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useInterviewStore } from "@/store/interviewStore";
import { useAuthStore } from "@/store/authStore";
import { Answer, SessionFeedback } from "@/types/interview";
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
      if (!user) {
        console.error("No user found");
        return null;
      }

      try {
        setLoading(true);
        setError(null);

        console.log("Starting session:", subject, difficulty);

        const response = await fetch(
          "http://localhost:5000/api/questions",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subject,
              difficulty,
              count: 5,
            }),
          }
        );

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`Backend error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Questions received:", data);

        const questions = data.questions || [];

        if (questions.length === 0) {
          throw new Error("No questions received");
        }

        const sessionId = generateSessionId();

        const newSession = {
          id: sessionId,
          userId: user.uid,
          subject,
          difficulty,
          status: "active" as const,
          questions,
          answers: [] as Answer[],
          feedback: [] as SessionFeedback[],
          score: 0,
          duration: 0,
          startedAt: new Date().toISOString(),
        };

        await setDoc(doc(db, "sessions", sessionId), {
          ...newSession,
          startedAt: serverTimestamp(),
        });

        setSession(newSession as any);
        setLoading(false);

        console.log("Session created:", sessionId);
        return sessionId;
      } catch (err: any) {
        console.error("Start session error:", err);
        setError(err.message);
        setLoading(false);
        return null;
      }
    },
    [user]
  );

  const submitAnswer = useCallback(
    async (answerText: string, audioBlob?: Blob) => {
      if (!session || !user) return null;

      try {
        setLoading(true);

        const currentQuestion =
          session.questions[currentQuestionIndex];

        const response = await fetch(
          "http://localhost:5000/api/interview/feedback",
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

        const updatedSession = {
          ...session,
          answers: [...session.answers, answer],
          feedback: [...session.feedback, feedback],
        };

        setSession(updatedSession as any);
        setLoading(false);
        nextQuestion();

        return feedback;
      } catch (err: any) {
        console.error("Submit answer error:", err);
        setError(err.message);
        setLoading(false);
        return null;
      }
    },
    [session, currentQuestionIndex, timeRemaining, user]
  );

  const completeSession = useCallback(async () => {
    if (!session) return null;

    try {
      const totalScore =
        session.feedback.length > 0
          ? session.feedback.reduce(
              (sum: number, f: SessionFeedback) => sum + f.score,
              0
            ) / session.feedback.length
          : 0;

      const updatedSession = {
        ...session,
        status: "completed" as const,
        score: totalScore,
        completedAt: new Date().toISOString(),
      };

      setSession(updatedSession as any);
      return updatedSession;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  }, [session]);

  return {
    session,
    currentQuestionIndex,
    currentQuestion:
      session?.questions[currentQuestionIndex] || null,
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