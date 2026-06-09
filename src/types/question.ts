export interface Question {
  id: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  text: string;
  expectedAnswer?: string;
  hints?: string[];
  tags: string[];
  createdAt: Date | string;
}

export interface QuestionBank {
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  questions: Question[];
  totalCount: number;
}