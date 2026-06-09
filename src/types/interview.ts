import { Question } from "./question";

export interface InterviewSession {
  id: string;
  userId: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  status: "idle" | "starting" | "active" | "paused" | "completed" | "error";
  questions: Question[];
  answers: Answer[];
  feedback: SessionFeedback[];
  score: number;
  duration: number;
  startedAt: Date | string;
  completedAt?: Date | string;
}

export interface Answer {
  questionId: string;
  text: string;
  audioUrl?: string;
  timeTaken: number;
  score: number;
  feedback: string;
  submittedAt: Date | string;
}

export interface SessionFeedback {
  questionId: string;
  score: number;
  strengths: string[];
  improvements: string[];
  suggestion: string;
}

export interface InterviewState {
  session: InterviewSession | null;
  currentQuestionIndex: number;
  isRecording: boolean;
  isAISpeaking: boolean;
  isLoading: boolean;
  error: string | null;
  timeRemaining: number;
}