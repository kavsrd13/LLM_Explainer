export interface StudentInfo {
  name: string;
  studentId: string;
  email?: string;
  className?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  type: "multiple-choice" | "boolean" | "scenario";
}

export interface QuizAnswer {
  questionId: string;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface ModuleData {
  id: string;
  title: string;
  icon: string;
}

export interface ReportPayload {
  studentName: string;
  studentId: string;
  email?: string;
  className?: string;
  completedModules: string[];
  quizScore: number;
  totalQuestions: number;
  questionsAttempted: number;
  answers: QuizAnswer[];
  timeSpentSeconds: number;
  badge: string;
  createdAt: string;
}
