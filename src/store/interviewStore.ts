import { create } from "zustand";
import { InterviewState, InterviewSession } from "@/types/interview";

interface InterviewStore extends InterviewState {
  setSession: (session: InterviewSession | null) => void;
  setCurrentQuestion: (index: number) => void;
  nextQuestion: () => void;
  setRecording: (isRecording: boolean) => void;
  setAISpeaking: (isAISpeaking: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setTimeRemaining: (time: number) => void;
  resetInterview: () => void;
}

const initialState: InterviewState = {
  session: null,
  currentQuestionIndex: 0,
  isRecording: false,
  isAISpeaking: false,
  isLoading: false,
  error: null,
  timeRemaining: 120,
};

export const useInterviewStore = create<InterviewStore>((set) => ({
  ...initialState,

  setSession: (session) => set({ session }),
  setCurrentQuestion: (index) => set({ currentQuestionIndex: index }),
  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
      timeRemaining: 120,
    })),
  setRecording: (isRecording) => set({ isRecording }),
  setAISpeaking: (isAISpeaking) => set({ isAISpeaking }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setTimeRemaining: (timeRemaining) => set({ timeRemaining }),
  resetInterview: () => set(initialState),
}));