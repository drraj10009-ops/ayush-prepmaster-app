import { AyushSubject, ExamCategory, TestResult, UserAnalytics, UserProfile } from "../types";
import { ALL_AYUSH_SUBJECTS } from "../data/questionBankEngine";

const STORAGE_KEYS = {
  ANALYTICS: "ayush_prepmaster_analytics",
  TEST_RESULTS: "ayush_prepmaster_results",
  BOOKMARKS: "ayush_prepmaster_bookmarks",
  MISTAKES: "ayush_prepmaster_mistakes",
  PROFILE: "ayush_prepmaster_profile",
  FLASHCARD_PROGRESS: "ayush_prepmaster_flashcards"
};

const DEFAULT_PROFILE: UserProfile = {
  id: "user_ayush_doc",
  name: "Dr. Ayush Aspirant",
  targetExam: "NEXT",
  examDate: "2026-11-15",
  studyStreakDays: 7,
  dailyGoalQuestions: 50,
  questionsAttemptedToday: 32,
  weakSubjects: ["Shalya Tantra (Surgery)", "Agada Tantra & Forensic (Vyavahara)"],
  strongSubjects: ["Charaka Samhita", "Dravyaguna Vijnana (Pharmacognosy)"]
};

function initializeSubjectScores(): Record<AyushSubject, { attempted: number; correct: number; accuracyPercentage: number }> {
  const map = {} as Record<AyushSubject, { attempted: number; correct: number; accuracyPercentage: number }>;
  for (const sub of ALL_AYUSH_SUBJECTS) {
    map[sub] = { attempted: 0, correct: 0, accuracyPercentage: 0 };
  }
  return map;
}

const DEFAULT_ANALYTICS: UserAnalytics = {
  totalQuestionsAttempted: 145,
  totalCorrect: 112,
  totalIncorrect: 33,
  overallAccuracyPercentage: 77.2,
  testsCompleted: 3,
  subjectBreakdown: initializeSubjectScores(),
  mistakeQuestionIds: ["q-3", "q-7", "q-12"],
  bookmarkedQuestionIds: ["q-1", "q-2", "q-4", "q-8"],
  recentScores: [
    { date: "2026-09-01", scorePercentage: 72, testTitle: "Charaka Sutrasthana Core" },
    { date: "2026-09-03", scorePercentage: 78, testTitle: "Dravyaguna Herb Identification" },
    { date: "2026-09-05", scorePercentage: 81, testTitle: "NCISM NEXT Grand Mock #1" }
  ]
};

export const StorageService = {
  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error("Storage error loading profile", e);
    }
    return DEFAULT_PROFILE;
  },

  saveUserProfile(partial: Partial<UserProfile>): UserProfile {
    try {
      const current = this.getUserProfile();
      const updated = { ...current, ...partial };
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error("Storage error saving profile", e);
      return DEFAULT_PROFILE;
    }
  },

  getAnalytics(): UserAnalytics {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      if (data) {
        const parsed = JSON.parse(data);
        // Ensure all subjects are mapped
        for (const sub of ALL_AYUSH_SUBJECTS) {
          if (!parsed.subjectBreakdown[sub]) {
            parsed.subjectBreakdown[sub] = { attempted: 0, correct: 0, accuracyPercentage: 0 };
          }
        }
        return parsed;
      }
    } catch (e) {
      console.error("Storage error loading analytics", e);
    }
    return DEFAULT_ANALYTICS;
  },

  saveAnalytics(analytics: UserAnalytics): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
    } catch (e) {
      console.error("Storage error saving analytics", e);
    }
  },

  recordSingleAttempt(questionId: string, isCorrect: boolean, subject: AyushSubject): UserAnalytics {
    const a = this.getAnalytics();
    a.totalQuestionsAttempted += 1;
    if (isCorrect) {
      a.totalCorrect += 1;
      // remove from mistakes if answered correctly
      a.mistakeQuestionIds = a.mistakeQuestionIds.filter((id) => id !== questionId);
    } else {
      a.totalIncorrect += 1;
      if (!a.mistakeQuestionIds.includes(questionId)) {
        a.mistakeQuestionIds.push(questionId);
      }
    }

    a.overallAccuracyPercentage = Math.round((a.totalCorrect / Math.max(1, a.totalQuestionsAttempted)) * 1000) / 10;

    if (!a.subjectBreakdown[subject]) {
      a.subjectBreakdown[subject] = { attempted: 0, correct: 0, accuracyPercentage: 0 };
    }
    a.subjectBreakdown[subject].attempted += 1;
    if (isCorrect) {
      a.subjectBreakdown[subject].correct += 1;
    }
    a.subjectBreakdown[subject].accuracyPercentage = Math.round(
      (a.subjectBreakdown[subject].correct / Math.max(1, a.subjectBreakdown[subject].attempted)) * 1000
    ) / 10;

    this.saveAnalytics(a);

    // Update profile daily counter
    const profile = this.getUserProfile();
    profile.questionsAttemptedToday = (profile.questionsAttemptedToday || 0) + 1;
    this.saveUserProfile(profile);

    return a;
  },

  recordTestResult(result: TestResult): UserAnalytics {
    const a = this.getAnalytics();
    a.testsCompleted += 1;
    a.totalQuestionsAttempted += result.totalQuestions;
    a.totalCorrect += result.correctCount;
    a.totalIncorrect += result.incorrectCount;
    a.overallAccuracyPercentage = Math.round((a.totalCorrect / Math.max(1, a.totalQuestionsAttempted)) * 1000) / 10;

    // Track mistakes
    const entries = Object.entries(result.userAnswers) as [string, { selectedOption: number; isCorrect: boolean }][];
    for (const [qId, ans] of entries) {
      if (!ans.isCorrect) {
        if (!a.mistakeQuestionIds.includes(qId)) {
          a.mistakeQuestionIds.push(qId);
        }
      } else {
        a.mistakeQuestionIds = a.mistakeQuestionIds.filter((id) => id !== qId);
      }
    }

    // Append score history
    a.recentScores.push({
      date: new Date().toISOString().split("T")[0],
      scorePercentage: result.percentage,
      testTitle: result.sessionTitle
    });
    if (a.recentScores.length > 20) {
      a.recentScores.shift();
    }

    this.saveAnalytics(a);

    // Save test result to history
    try {
      const history = this.getTestResults();
      history.unshift(result);
      localStorage.setItem(STORAGE_KEYS.TEST_RESULTS, JSON.stringify(history.slice(0, 30)));
    } catch (e) {
      console.error("Storage error saving test result history", e);
    }

    return a;
  },

  getTestResults(): TestResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEST_RESULTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error("Storage error loading results", e);
    }
    return [];
  },

  toggleBookmark(questionId: string): boolean {
    const a = this.getAnalytics();
    const idx = a.bookmarkedQuestionIds.indexOf(questionId);
    let bookmarked = false;
    if (idx >= 0) {
      a.bookmarkedQuestionIds.splice(idx, 1);
      bookmarked = false;
    } else {
      a.bookmarkedQuestionIds.push(questionId);
      bookmarked = true;
    }
    this.saveAnalytics(a);
    return bookmarked;
  },

  isBookmarked(questionId: string): boolean {
    const a = this.getAnalytics();
    return a.bookmarkedQuestionIds.includes(questionId);
  },

  getMistakeQuestionIds(): string[] {
    return this.getAnalytics().mistakeQuestionIds;
  },

  getBookmarkedQuestionIds(): string[] {
    return this.getAnalytics().bookmarkedQuestionIds;
  },

  clearMistake(questionId: string): void {
    const a = this.getAnalytics();
    a.mistakeQuestionIds = a.mistakeQuestionIds.filter((id) => id !== questionId);
    this.saveAnalytics(a);
  },

  clearAllMistakes(): void {
    const a = this.getAnalytics();
    a.mistakeQuestionIds = [];
    this.saveAnalytics(a);
  },

  resetAnalytics(): void {
    localStorage.removeItem(STORAGE_KEYS.ANALYTICS);
    localStorage.removeItem(STORAGE_KEYS.TEST_RESULTS);
  }
};
