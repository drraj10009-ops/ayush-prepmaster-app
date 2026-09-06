export type AyushSubject =
  | "Charaka Samhita"
  | "Sushruta Samhita"
  | "Ashtanga Hridaya & Sangraha"
  | "Rachana Sharir (Anatomy)"
  | "Kriya Sharir (Physiology)"
  | "Dravyaguna Vijnana (Pharmacognosy)"
  | "Rasa Shastra & Bhaishajya Kalpana"
  | "Roganidana & Vikriti Vijnana (Pathology)"
  | "Kayachikitsa (Internal Medicine)"
  | "Shalya Tantra (Surgery)"
  | "Shalakya Tantra (ENT & Ophthalmology)"
  | "Prasuti Tantra & Stri Roga (Obs & Gynae)"
  | "Kaumarbhritya (Pediatrics)"
  | "Agada Tantra & Forensic (Vyavahara)"
  | "Swasthavritta & Yoga (Preventive Medicine)"
  | "Research Methodology & Statistics"
  | "Modern Clinical Medicine for AMO/NEXT"
  | "AYUSH Ministry Guidelines & National Programs";

export type ExamCategory =
  | "NEXT"
  | "AIAPGET"
  | "AMO"
  | "SUBJECT_WISE"
  | "CUSTOM_MIXED"
  | "MISTAKE_DRILL";

export type DifficultyLevel = "Easy" | "Medium" | "Hard" | "Clinical Vignette";

export type LanguageMode = "bilingual" | "english" | "hindi";

export interface MCQQuestion {
  id: string;
  question: string;
  questionHindi?: string;
  options: [string, string, string, string];
  optionsHindi?: [string, string, string, string];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
  explanationHindi?: string;
  classicalReference: string;
  subject: AyushSubject;
  topic: string;
  difficulty: DifficultyLevel;
  examType: ("NEXT" | "AIAPGET" | "AMO")[];
  highYieldTip?: string;
  sanskritTerm?: string;
}

export interface Flashcard {
  id: string;
  subject: AyushSubject;
  topic: string;
  front: string;
  back: string;
  sanskritShloka?: string;
  mnemonic?: string;
  classicalReference?: string;
  mastered?: boolean;
}

export interface TestSession {
  id: string;
  title: string;
  category: ExamCategory;
  subjects: AyushSubject[];
  totalQuestions: number;
  durationMinutes: number;
  timeRemainingSeconds: number;
  questions: MCQQuestion[];
  negativeMarking: number;
  userAnswers?: Record<string, number>;
  markedForReview?: Record<string, boolean>;
  startedAt?: string;
  completedAt?: string;
  isSubmitted?: boolean;
  score?: number;
  correctCount?: number;
  incorrectCount?: number;
  unattemptedCount?: number;
  accuracy?: number;
}

export interface TestResult {
  id: string;
  sessionId: string;
  sessionTitle: string;
  category: ExamCategory;
  completedAt: string;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  score: number;
  maxScore: number;
  percentage: number;
  timeSpentSeconds: number;
  subjectBreakdown: Record<AyushSubject, { attempted: number; correct: number }>;
  userAnswers: Record<string, { selectedOption: number; isCorrect: boolean }>;
}

export interface UserProfile {
  id: string;
  name: string;
  targetExam: "NEXT" | "AIAPGET" | "AMO";
  examDate: string;
  studyStreakDays: number;
  dailyGoalQuestions: number;
  questionsAttemptedToday?: number;
  weakSubjects: string[];
  strongSubjects: string[];
}

export interface UserAnalytics {
  totalQuestionsAttempted: number;
  totalCorrect: number;
  totalIncorrect: number;
  overallAccuracyPercentage: number;
  testsCompleted: number;
  subjectBreakdown: Record<
    AyushSubject,
    { attempted: number; correct: number; accuracyPercentage: number }
  >;
  mistakeQuestionIds: string[];
  bookmarkedQuestionIds: string[];
  recentScores: {
    date: string;
    scorePercentage: number;
    testTitle: string;
  }[];
}

export interface StudyNote {
  id: string;
  subject: AyushSubject;
  title: string;
  highYieldPoints: string[];
  classicalTable?: { headers: string[]; rows: string[][] };
  tags: string[];
  reference: string;
}
