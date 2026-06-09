export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  role: "user" | "admin";
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  theme: "dark" | "light";
  notifications: boolean;
  soundEffects: boolean;
  autoCamera: boolean;
  language: string;
}

export interface UserStats {
  totalInterviews: number;
  averageScore: number;
  hoursPracticed: number;
  bestSubject: string;
  currentStreak: number;
  longestStreak: number;
  totalQuestions: number;
  correctAnswers: number;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}