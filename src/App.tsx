import React, { useState, useEffect } from "react";
import { Header, ActiveTab } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { QuestionBankView } from "./components/QuestionBankView";
import { MockExamSimulator } from "./components/MockExamSimulator";
import { CustomTestModal } from "./components/CustomTestModal";
import { FlashcardsView } from "./components/FlashcardsView";
import { NcismLibraryView } from "./components/NcismLibraryView";
import { AnalyticsView } from "./components/AnalyticsView";
import { AiMentorModal } from "./components/AiMentorModal";
import { AmoMockTestSeriesView } from "./components/AmoMockTestSeriesView";
import { StorageService } from "./services/storageService";
import { createMockTestSession, createAmo500TestSession, TOTAL_BANK_CAPACITY } from "./data/questionBankEngine";
import { AyushSubject, ExamCategory, MCQQuestion, TestResult, TestSession, UserAnalytics, UserProfile } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [profile, setProfile] = useState<UserProfile>(StorageService.getUserProfile());
  const [analytics, setAnalytics] = useState<UserAnalytics>(StorageService.getAnalytics());
  const [pastResults, setPastResults] = useState<TestResult[]>(StorageService.getTestResults());

  // Active examination state
  const [activeTestSession, setActiveTestSession] = useState<TestSession | null>(null);

  // Subtab for mock tests view
  const [mockTestSubTab, setMockTestSubTab] = useState<"amo_series" | "other_exams">("amo_series");

  // Modals state
  const [isCustomTestModalOpen, setIsCustomTestModalOpen] = useState(false);
  const [isAiMentorModalOpen, setIsAiMentorModalOpen] = useState(false);
  const [aiMentorContextQuestion, setAiMentorContextQuestion] = useState<MCQQuestion | null>(null);

  // QBank filter state
  const [initialQBankSubject, setInitialQBankSubject] = useState<AyushSubject | "ALL">("ALL");

  // Reload data periodically or on focus
  useEffect(() => {
    setProfile(StorageService.getUserProfile());
    setAnalytics(StorageService.getAnalytics());
    setPastResults(StorageService.getTestResults());
  }, []);

  // Handler: Start predefined Exam
  const handleStartExam = (category: ExamCategory, subjects?: AyushSubject[]) => {
    const session = createMockTestSession({
      category,
      subjects
    });
    setActiveTestSession(session);
  };

  // Handler: Start 500-Question AMO Marathon Test
  const handleStartAmo500Test = (testNumber: number) => {
    const session = createAmo500TestSession(testNumber);
    setActiveTestSession(session);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handler: Start Custom Test from builder modal
  const handleStartCustomTest = (config: {
    title: string;
    category: ExamCategory;
    subjects: AyushSubject[];
    questionCount: number;
    durationMinutes: number;
    negativeMarking: number;
  }) => {
    const session = createMockTestSession({
      title: config.title,
      category: config.category,
      subjects: config.subjects,
      questionCount: config.questionCount,
      durationMinutes: config.durationMinutes,
      negativeMarking: config.negativeMarking
    });
    setActiveTestSession(session);
  };

  // Handler: Finish Test
  const handleFinishTest = (result: TestResult) => {
    const updatedAnalytics = StorageService.recordTestResult(result);
    setAnalytics(updatedAnalytics);
    setPastResults(StorageService.getTestResults());
  };

  // Handler: Exit Test Session
  const handleExitTest = () => {
    setActiveTestSession(null);
  };

  // Handler: Single Question Attempt (e.g. from Q-Bank or Daily case)
  const handleAnswerQuestion = (questionId: string, isCorrect: boolean, subject: AyushSubject) => {
    const updatedAnalytics = StorageService.recordSingleAttempt(questionId, isCorrect, subject);
    setAnalytics(updatedAnalytics);
    setProfile(StorageService.getUserProfile());
  };

  // Handler: Toggle Bookmark
  const handleToggleBookmark = (questionId: string) => {
    const isBookmarked = StorageService.toggleBookmark(questionId);
    setAnalytics(StorageService.getAnalytics());
    return isBookmarked;
  };

  const isQuestionBookmarked = (questionId: string) => {
    return StorageService.isBookmarked(questionId);
  };

  // Handler: Ask AI Guru to explain a question
  const handleAskAiExplain = (question: MCQQuestion) => {
    setAiMentorContextQuestion(question);
    setIsAiMentorModalOpen(true);
  };

  // Handler: Open Q-Bank filtered by subject
  const handleOpenQBank = (subject?: AyushSubject) => {
    setInitialQBankSubject(subject || "ALL");
    setActiveTab("qbank");
  };

  // Handler: Open Mistake Notebook
  const handleOpenMistakeNotebook = () => {
    setActiveTab("analytics");
  };

  // Handler: Start Mistake Test
  const handleStartMistakeTest = (questions: MCQQuestion[]) => {
    const session: TestSession = {
      id: `mistake-drill-${Date.now()}`,
      title: "Targeted Mistake Drill & Active Rectification",
      category: "SUBJECT_WISE",
      subjects: Array.from(new Set(questions.map((q) => q.subject))),
      totalQuestions: questions.length,
      durationMinutes: Math.max(15, Math.ceil(questions.length * 1.5)),
      timeRemainingSeconds: Math.max(15, Math.ceil(questions.length * 1.5)) * 60,
      questions,
      negativeMarking: 0.25
    };
    setActiveTestSession(session);
  };

  // Handler: Clear All Mistakes
  const handleClearAllMistakes = () => {
    StorageService.clearAllMistakes();
    setAnalytics(StorageService.getAnalytics());
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Global Application Header (Hidden during live exam to provide distraction-free test room) */}
      {!activeTestSession && (
        <Header
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenAiMentor={() => {
            setAiMentorContextQuestion(null);
            setIsAiMentorModalOpen(true);
          }}
          streakDays={profile.studyStreakDays}
        />
      )}

      {/* Main Body Content Router */}
      <main className="flex-1">
        {/* If an exam is in progress, display the Mock Exam Simulator */}
        {activeTestSession ? (
          <MockExamSimulator
            session={activeTestSession}
            onFinishTest={handleFinishTest}
            onExitTest={handleExitTest}
          />
        ) : (
          <>
            {activeTab === "dashboard" && (
              <Dashboard
                analytics={analytics}
                profile={profile}
                onStartExam={handleStartExam}
                onOpenAmoSeries={() => {
                  setActiveTab("mocktests");
                  setMockTestSubTab("amo_series");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onOpenCustomTestBuilder={() => setIsCustomTestModalOpen(true)}
                onOpenQBank={handleOpenQBank}
                onOpenMistakeNotebook={handleOpenMistakeNotebook}
                onAnswerQuestion={handleAnswerQuestion}
              />
            )}

            {activeTab === "qbank" && (
              <QuestionBankView
                key={initialQBankSubject}
                initialSubject={initialQBankSubject}
                onAnswerQuestion={handleAnswerQuestion}
                onToggleBookmark={handleToggleBookmark}
                isBookmarked={isQuestionBookmarked}
                onAskAiExplain={handleAskAiExplain}
              />
            )}

            {activeTab === "mocktests" && (
              <div className="space-y-6">
                {/* Sub-tab Navigation Switcher */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                  <div className="bg-white p-2 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
                      <button
                        onClick={() => setMockTestSubTab("amo_series")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                          mockTestSubTab === "amo_series"
                            ? "bg-emerald-800 text-white shadow-xs"
                            : "text-stone-700 hover:text-stone-900"
                        }`}
                      >
                        <span>🏛️ AMO 12,500+ MCQ Master Series</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            mockTestSubTab === "amo_series"
                              ? "bg-emerald-950/60 text-emerald-100 border border-emerald-700/50"
                              : "bg-stone-200 text-stone-700"
                          }`}
                        >
                          25 Sets × 500 Qs
                        </span>
                      </button>

                      <button
                        onClick={() => setMockTestSubTab("other_exams")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                          mockTestSubTab === "other_exams"
                            ? "bg-emerald-800 text-white shadow-xs"
                            : "text-stone-700 hover:text-stone-900"
                        }`}
                      >
                        <span>🎯 NTA Exam Simulations</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            mockTestSubTab === "other_exams"
                              ? "bg-emerald-950/60 text-emerald-100 border border-emerald-700/50"
                              : "bg-stone-200 text-stone-700"
                          }`}
                        >
                          NEXT &amp; AIAPGET
                        </span>
                      </button>
                    </div>

                    <button
                      onClick={() => setIsCustomTestModalOpen(true)}
                      className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors shadow-2xs shrink-0 flex items-center justify-center gap-1.5"
                    >
                      <span>⚙️</span>
                      <span>Custom Test Builder</span>
                    </button>
                  </div>
                </div>

                {/* SubTab Content */}
                {mockTestSubTab === "amo_series" ? (
                  <AmoMockTestSeriesView
                    onStartAmoTest={handleStartAmo500Test}
                    onStartTest={handleStartAmo500Test}
                    pastResults={pastResults}
                    onOpenCustomTestBuilder={() => setIsCustomTestModalOpen(true)}
                  />
                ) : (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h1 className="text-2xl font-bold text-stone-900 font-serif">
                          National Level NTA Exam Simulations
                        </h1>
                        <p className="text-xs sm:text-sm text-stone-500 mt-1">
                          Official standard simulations for Ayush NEXT Clinical Exit Exam and AIAPGET MD/MS entrance with negative marking and real time-clocks.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* NEXT */}
                      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 uppercase">
                            National Exit Test (NCISM)
                          </span>
                          <h2 className="text-xl font-bold text-stone-900 font-serif">
                            Ayush NEXT Clinical Simulation #1
                          </h2>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            120 NCISM-mapped clinical vignettes, integrative medicine questions, radiology, emergency ayurvedic management and patient safety.
                          </p>
                          <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 space-y-1">
                            <div>⏱️ <strong>Duration:</strong> 120 Minutes</div>
                            <div>📊 <strong>Questions:</strong> 120 MCQs</div>
                            <div>⚖️ <strong>Marking:</strong> +1.0 / -0.25 negative</div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleStartExam("NEXT")}
                          className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
                        >
                          Launch NEXT Simulation
                        </button>
                      </div>

                      {/* AIAPGET */}
                      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900 uppercase">
                            MD / MS Ayush Entrance (NTA)
                          </span>
                          <h2 className="text-xl font-bold text-stone-900 font-serif">
                            AIAPGET Samhita Grand Mock #1
                          </h2>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            Exhaustive coverage of Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, Dravyaguna, Rasa Shastra, and Bhaishajya Kalpana.
                          </p>
                          <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 space-y-1">
                            <div>⏱️ <strong>Duration:</strong> 120 Minutes</div>
                            <div>📊 <strong>Questions:</strong> 120 MCQs (480 Marks)</div>
                            <div>⚖️ <strong>Marking:</strong> +4.0 / -1.0 negative</div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleStartExam("AIAPGET")}
                          className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
                        >
                          Launch AIAPGET Mock
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "flashcards" && <FlashcardsView />}

            {activeTab === "library" && <NcismLibraryView />}

            {activeTab === "analytics" && (
              <AnalyticsView
                analytics={analytics}
                profile={profile}
                pastResults={pastResults}
                onStartMistakeTest={handleStartMistakeTest}
                onClearMistakes={handleClearAllMistakes}
              />
            )}
          </>
        )}
      </main>

      {/* Global Application Footer */}
      {!activeTestSession && (
        <footer className="bg-stone-900 text-stone-400 text-xs py-8 border-t border-stone-800 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-emerald-400 font-serif">
                AYUSH Prepmaster
              </span>
              <span>•</span>
              <span className="text-[11px] text-stone-400">
                {TOTAL_BANK_CAPACITY.toLocaleString()}+ NCISM MCQs • All-India Medical Entrance Preparation
              </span>
            </div>

            <div className="text-[11px] text-stone-500">
              Compatible with Android, Windows & macOS PWA • Offline Enabled
            </div>
          </div>
        </footer>
      )}

      {/* Custom Test Builder Modal */}
      <CustomTestModal
        isOpen={isCustomTestModalOpen}
        onClose={() => setIsCustomTestModalOpen(false)}
        onStartCustomTest={handleStartCustomTest}
      />

      {/* AI Ayush Guru Doubt Solver Modal */}
      <AiMentorModal
        isOpen={isAiMentorModalOpen}
        onClose={() => {
          setIsAiMentorModalOpen(false);
          setAiMentorContextQuestion(null);
        }}
        contextQuestion={aiMentorContextQuestion}
      />
    </div>
  );
}
