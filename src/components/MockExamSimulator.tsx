import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { AyushSubject, ExamCategory, LanguageMode, MCQQuestion, TestResult, TestSession } from "../types";

interface MockExamSimulatorProps {
  session: TestSession;
  onFinishTest: (result: TestResult) => void;
  onExitTest: () => void;
}

export const MockExamSimulator: React.FC<MockExamSimulatorProps> = ({
  session,
  onFinishTest,
  onExitTest
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, { selectedOption: number; isCorrect: boolean }>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [visited, setVisited] = useState<Record<string, boolean>>({ [session.questions[0]?.id || ""]: true });
  const [timeRemaining, setTimeRemaining] = useState(session.timeRemainingSeconds);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Section navigation for 500-question marathon exams
  const [paletteBlock, setPaletteBlock] = useState<number | "ALL">(0);
  const [paletteFilter, setPaletteFilter] = useState<"ALL" | "ANSWERED" | "UNANSWERED" | "MARKED">("ALL");
  const [jumpInput, setJumpInput] = useState("");

  // Review mode filter on result screen
  const [reviewFilter, setReviewFilter] = useState<"ALL" | "INCORRECT" | "CORRECT" | "UNATTEMPTED">("ALL");

  const currentQ = session.questions[currentIndex];

  // Timer effect
  useEffect(() => {
    if (isCompleted || isPaused) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTestAuto();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompleted, isPaused]);

  // Mark current as visited
  useEffect(() => {
    if (currentQ) {
      setVisited((prev) => ({ ...prev, [currentQ.id]: true }));
    }
  }, [currentIndex, currentQ]);

  // Auto-advance toggle for rapid AMO CBT answering
  const [autoAdvanceOnSelect, setAutoAdvanceOnSelect] = useState(false);
  // Submission toast
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  // Submit current question answer and immediately transition to next question (AMO CBT pattern)
  const handleSubmitAndShowNext = (markForReview = false) => {
    if (isCompleted) return;

    if (markForReview) {
      setMarkedForReview((prev) => ({ ...prev, [currentQ.id]: true }));
    }

    const hasAnswer = userAnswers[currentQ.id] !== undefined;
    const msg = hasAnswer
      ? `✓ Question ${currentIndex + 1} Answer Submitted & Saved`
      : `Question ${currentIndex + 1} Skipped (Not Answered)`;

    setSubmitFeedback(msg);
    setTimeout(() => setSubmitFeedback(null), 1400);

    if (currentIndex < session.questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      // Smoothly scroll to question top
      const topEl = document.getElementById("active-question-card");
      if (topEl) {
        topEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      setIsSubmitModalOpen(true);
    }
  };

  const handleSelectOption = (optIdx: number) => {
    if (isCompleted) return;
    const isCorrect = optIdx === currentQ.correctAnswer;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { selectedOption: optIdx, isCorrect }
    }));

    if (autoAdvanceOnSelect) {
      setSubmitFeedback(`✓ Option ${String.fromCharCode(65 + optIdx)} selected. Loading next question...`);
      setTimeout(() => {
        setSubmitFeedback(null);
        if (currentIndex < session.questions.length - 1) {
          setCurrentIndex((i) => i + 1);
          const topEl = document.getElementById("active-question-card");
          if (topEl) {
            topEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } else {
          setIsSubmitModalOpen(true);
        }
      }, 350);
    }
  };

  // Keyboard shortcut listener for rapid CBT exam navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if modal or completed or focused on an input
      if (isCompleted || isSubmitModalOpen || isPaused) return;
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea") return;

      if (["1", "a", "A"].includes(e.key)) {
        e.preventDefault();
        handleSelectOption(0);
      } else if (["2", "b", "B"].includes(e.key)) {
        e.preventDefault();
        handleSelectOption(1);
      } else if (["3", "c", "C"].includes(e.key)) {
        e.preventDefault();
        handleSelectOption(2);
      } else if (["4", "d", "D"].includes(e.key)) {
        e.preventDefault();
        handleSelectOption(3);
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleSubmitAndShowNext(false);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isCompleted, isSubmitModalOpen, isPaused, autoAdvanceOnSelect, currentQ]);

  const handleClearResponse = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleToggleMarkForReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleNext = () => {
    if (currentIndex < session.questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  // Calculate score and submit
  const calculateAndSubmit = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const marksPerCorrect = session.category === "AIAPGET" ? 4 : 1;
    const negPerIncorrect = session.negativeMarking;

    const subjectBreakdown: Record<AyushSubject, { attempted: number; correct: number }> = {} as any;

    session.questions.forEach((q) => {
      if (!subjectBreakdown[q.subject]) {
        subjectBreakdown[q.subject] = { attempted: 0, correct: 0 };
      }

      const ans = userAnswers[q.id];
      if (ans !== undefined) {
        subjectBreakdown[q.subject].attempted += 1;
        if (ans.isCorrect) {
          correctCount += 1;
          subjectBreakdown[q.subject].correct += 1;
        } else {
          incorrectCount += 1;
        }
      } else {
        unattemptedCount += 1;
      }
    });

    const rawScore = correctCount * marksPerCorrect - incorrectCount * negPerIncorrect;
    const maxScore = session.questions.length * marksPerCorrect;
    const score = Math.max(0, Math.round(rawScore * 100) / 100);
    const percentage = Math.max(0, Math.round((rawScore / maxScore) * 1000) / 10);
    const timeSpentSeconds = session.durationMinutes * 60 - timeRemaining;

    const result: TestResult = {
      id: `result-${Date.now()}`,
      sessionId: session.id,
      sessionTitle: session.title,
      category: session.category,
      completedAt: new Date().toISOString(),
      totalQuestions: session.questions.length,
      correctCount,
      incorrectCount,
      unattemptedCount,
      score,
      maxScore,
      percentage,
      timeSpentSeconds,
      subjectBreakdown,
      userAnswers
    };

    setTestResult(result);
    setIsCompleted(true);
    setIsSubmitModalOpen(false);
    onFinishTest(result);

    // Confetti celebration if passed with flying colors
    if (percentage >= 60) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback if canvas-confetti context is unavailable
      }
    }
  };

  const handleSubmitTestAuto = () => {
    calculateAndSubmit();
  };

  // Format time mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Summary counts for palette
  const answeredCount = Object.keys(userAnswers).length;
  const markedCount = Object.values(markedForReview).filter(Boolean).length;
  const unattemptedCount = session.questions.length - answeredCount;

  // -------------------------------------------------------------
  // RESULT VIEW
  // -------------------------------------------------------------
  if (isCompleted && testResult) {
    const filteredReviewQuestions = session.questions.filter((q) => {
      const userAns = userAnswers[q.id];
      if (reviewFilter === "CORRECT") return userAns && userAns.isCorrect;
      if (reviewFilter === "INCORRECT") return userAns && !userAns.isCorrect;
      if (reviewFilter === "UNATTEMPTED") return userAns === undefined;
      return true;
    });

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Score Card Banner */}
        <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-emerald-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-950 uppercase">
                {session.category} Mock Exam Complete
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif">{session.title}</h1>
              <p className="text-emerald-100 text-xs sm:text-sm">
                Completed in {Math.floor(testResult.timeSpentSeconds / 60)} minutes{" "}
                {testResult.timeSpentSeconds % 60} seconds
              </p>
            </div>

            {/* Main Score Ring / Box */}
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-5 border border-white/20 text-center min-w-[200px]">
              <div className="text-4xl font-black text-amber-300">
                {testResult.score} / {testResult.maxScore}
              </div>
              <div className="text-xs font-semibold text-emerald-100 mt-1">
                Net Score ({testResult.percentage}%)
              </div>
              <div className="text-[11px] text-amber-200 mt-2 font-medium">
                {testResult.percentage >= 65
                  ? "🌟 Excellent NCISM Proficiency"
                  : testResult.percentage >= 50
                  ? "✓ Qualified • Target High-Yield Weak Spots"
                  : "⚠ Needs Comprehensive Samhita Revision"}
              </div>
            </div>
          </div>

          {/* Quick Metrics row */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-emerald-700/50 text-center">
            <div className="bg-emerald-950/40 p-3 rounded-lg">
              <div className="text-2xl font-bold text-emerald-300">{testResult.correctCount}</div>
              <div className="text-xs text-emerald-100">Correct Answers</div>
            </div>
            <div className="bg-emerald-950/40 p-3 rounded-lg">
              <div className="text-2xl font-bold text-rose-300">{testResult.incorrectCount}</div>
              <div className="text-xs text-emerald-100">
                Incorrect (-{(testResult.incorrectCount * session.negativeMarking).toFixed(2)} Marks)
              </div>
            </div>
            <div className="bg-emerald-950/40 p-3 rounded-lg">
              <div className="text-2xl font-bold text-stone-300">{testResult.unattemptedCount}</div>
              <div className="text-xs text-emerald-100">Unattempted</div>
            </div>
          </div>
        </div>

        {/* Action buttons with Language Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-700">Filter Review:</span>
            <button
              onClick={() => setReviewFilter("ALL")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                reviewFilter === "ALL" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              All ({session.questions.length})
            </button>
            <button
              onClick={() => setReviewFilter("INCORRECT")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                reviewFilter === "INCORRECT" ? "bg-rose-700 text-white" : "bg-rose-50 text-rose-800 hover:bg-rose-100"
              }`}
            >
              Mistakes ({testResult.incorrectCount})
            </button>
            <button
              onClick={() => setReviewFilter("CORRECT")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                reviewFilter === "CORRECT" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              Correct ({testResult.correctCount})
            </button>
            <button
              onClick={() => setReviewFilter("UNATTEMPTED")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                reviewFilter === "UNATTEMPTED" ? "bg-stone-600 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              Skipped ({testResult.unattemptedCount})
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Real Exam Standard Format Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-semibold shadow-xs">
              <span>🏛️</span>
              <span>Real Exam Format: <strong>संस्कृत • हिन्दी • English</strong> (Combined)</span>
            </div>

            <button
              onClick={onExitTest}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
            >
              Return to Dashboard
            </button>
          </div>
        </div>

        {/* Detailed Solutions & Rationales List */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-stone-900 font-serif">
            Detailed Question Explanations & Classical References
          </h3>

          {filteredReviewQuestions.map((q, idx) => {
            const userAns = userAnswers[q.id];
            const isCorrect = userAns?.isCorrect;
            const isUnattempted = userAns === undefined;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-xl border space-y-3 bg-white shadow-xs ${
                  isCorrect
                    ? "border-emerald-200"
                    : isUnattempted
                    ? "border-stone-300"
                    : "border-rose-200"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-800">
                      Q.{session.questions.findIndex((item) => item.id === q.id) + 1}
                    </span>
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {q.subject}
                    </span>
                    <span className="text-stone-500">• {q.topic}</span>
                  </div>

                  <span
                    className={`font-bold px-2.5 py-0.5 rounded-full text-xs ${
                      isCorrect
                        ? "bg-emerald-100 text-emerald-800"
                        : isUnattempted
                        ? "bg-stone-100 text-stone-700"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {isCorrect ? "✓ Correct (+Marks)" : isUnattempted ? "⚪ Skipped" : `✕ Incorrect (-${session.negativeMarking})`}
                  </span>
                </div>

                {/* Simultaneous Sanskrit, Hindi & English Question Presentation */}
                <div className="space-y-2.5">
                  {/* Classical Sanskrit Shloka / Sutra */}
                  {q.sanskritTerm && (
                    <div className="bg-amber-50/90 border border-amber-200/90 rounded-lg p-2.5 text-stone-900 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-900 uppercase">
                        <span>📜</span>
                        <span>संस्कृत सूत्र / संदर्भ:</span>
                      </div>
                      <p className="font-serif text-sm font-semibold text-amber-950 italic leading-relaxed">
                        "{q.sanskritTerm}"
                      </p>
                    </div>
                  )}

                  {/* Hindi Question */}
                  {q.questionHindi && (
                    <div className="text-stone-900 bg-stone-50/90 p-2.5 rounded-lg border border-stone-200 space-y-1">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900 uppercase">
                        हिन्दी प्रश्न
                      </span>
                      <p className="text-sm font-medium leading-relaxed mt-1">
                        {q.questionHindi}
                      </p>
                    </div>
                  )}

                  {/* English Question */}
                  <div className="p-2.5 bg-white rounded-lg border border-stone-200 space-y-1">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-stone-200 text-stone-800 uppercase">
                      English
                    </span>
                    <p className="text-sm font-normal text-stone-800 leading-relaxed mt-1">
                      {q.question}
                    </p>
                  </div>
                </div>

                {/* Options Review - Both Hindi/Sanskrit & English together */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, optIdx) => {
                    let optStyle = "border-stone-200 bg-white text-stone-700";
                    if (optIdx === q.correctAnswer) {
                      optStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-400";
                    } else if (userAns && userAns.selectedOption === optIdx && !isCorrect) {
                      optStyle = "border-rose-500 bg-rose-50 text-rose-900 font-semibold";
                    }

                    const optHindi = q.optionsHindi?.[optIdx];

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-lg border flex items-start gap-2.5 ${optStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border border-current mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <div className="space-y-1 w-full">
                          {optHindi && (
                            <div className="font-semibold text-stone-900 text-xs sm:text-sm leading-snug">
                              {optHindi}
                            </div>
                          )}
                          <div className={`leading-snug ${optHindi ? "text-[11px] text-stone-600 font-sans border-t border-stone-200/50 pt-0.5" : "font-normal"}`}>
                            {opt}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Classical Reference & Explanation Box */}
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-900 bg-emerald-50/80 p-2 rounded-lg border border-emerald-200">
                    <span>
                      सही उत्तर / Correct: ({String.fromCharCode(65 + q.correctAnswer)}){" "}
                      {q.optionsHindi?.[q.correctAnswer] && (
                        <span className="ml-1">{q.optionsHindi[q.correctAnswer]}</span>
                      )}
                    </span>
                    <span className="font-normal text-stone-600 text-[11px]">
                      {q.options[q.correctAnswer]}
                    </span>
                  </div>

                  {q.explanationHindi && (
                    <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-stone-800 space-y-1">
                      <div className="text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
                        <span>📜</span>
                        <span>हिन्दी तात्पर्य एवं शास्त्रीय व्याख्या:</span>
                      </div>
                      <p className="leading-relaxed text-stone-800 text-xs">
                        {q.explanationHindi}
                      </p>
                    </div>
                  )}

                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-stone-800 space-y-1">
                    <div className="text-[11px] font-bold text-stone-700 flex items-center gap-1.5">
                      <span>🌐</span>
                      <span>English Scientific Rationale:</span>
                    </div>
                    <p className="leading-relaxed text-stone-700 text-xs">
                      {q.explanation}
                    </p>
                  </div>

                  {q.highYieldTip && (
                    <div className="text-amber-950 bg-amber-50 p-2.5 rounded-lg border border-amber-200 font-medium text-xs flex items-start gap-2">
                      <span className="text-sm">💡</span>
                      <div>
                        <strong>परीक्षोपयोगी स्मरणीय तथ्य / High-Yield Tip:</strong> {q.highYieldTip}
                      </div>
                    </div>
                  )}

                  <div className="text-[11px] text-emerald-800 font-medium pt-1.5 border-t border-stone-200 flex flex-wrap justify-between">
                    <span>Classical Reference: <em>{q.classicalReference}</em></span>
                    <span>Target Exams: {q.examType.join(", ")}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LIVE TEST SIMULATION VIEW
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
      {/* Top Test Header Bar */}
      <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
              {session.category} Simulation
            </span>
            <h2 className="text-base font-bold text-stone-900 font-serif truncate max-w-md">
              {session.title}
            </h2>
          </div>
          <div className="text-xs text-stone-500 mt-0.5">
            Marking Scheme:{" "}
            <strong>+{session.category === "AIAPGET" ? 4 : 1} / -{session.negativeMarking} Marks</strong>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Authentic Real Exam CBT Standard Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-semibold shadow-xs">
            <span>🏛️</span>
            <span>Exam Format: <strong>संस्कृत सूत्र • हिन्दी प्रश्न • English</strong></span>
          </div>

          {/* Live Timer */}
          <div
            id="test-countdown-timer"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-sm font-mono font-bold shadow-xs ${
              timeRemaining < 300
                ? "bg-rose-50 border-rose-300 text-rose-700 animate-pulse"
                : "bg-stone-50 border-stone-300 text-stone-800"
            }`}
          >
            <span className="text-base">⏱️</span>
            <span>{formatTime(timeRemaining)}</span>
          </div>

          {/* Pause Test Button */}
          <button
            onClick={() => setIsPaused(true)}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1"
            title="Pause examination timer"
          >
            <span>⏸️</span>
            <span>Pause</span>
          </button>

          {/* Submit Test Button */}
          <button
            id="finish-exam-trigger-btn"
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Main Grid: Question Area (Left) + Question Palette (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Question Area (3 Cols) - One Question At A Time */}
        <div
          id="active-question-card"
          className="lg:col-span-3 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between min-h-[560px] relative transition-all"
        >
          <div className="space-y-4">
            {/* Question Top Meta & Feedback Flash */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                  Question {currentIndex + 1} of {session.questions.length}
                </span>
                <span className="text-xs font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md">
                  {currentQ.subject}
                </span>
                <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  🎯 One Question Mode
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Submit Feedback Toast */}
                {submitFeedback && (
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-300 animate-fadeIn">
                    {submitFeedback}
                  </span>
                )}

                <button
                  onClick={handleToggleMarkForReview}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                    markedForReview[currentQ.id]
                      ? "bg-purple-100 text-purple-900 border-purple-300"
                      : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  {markedForReview[currentQ.id] ? "★ Marked for Review" : "Mark for Review"}
                </button>
              </div>
            </div>

            {/* Question Stem (Real Exam Simultaneous Trilingual Display) */}
            <div className="py-1 space-y-2.5">
              {/* Classical Sanskrit Shloka / Sutra */}
              {currentQ.sanskritTerm && (
                <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-3 text-stone-900 space-y-1 shadow-xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                    <span>📜</span>
                    <span>संस्कृत सूत्र / संदर्भ (Classical Shloka)</span>
                  </div>
                  <p className="font-serif text-sm sm:text-base font-semibold text-amber-950 italic leading-relaxed pl-1">
                    "{currentQ.sanskritTerm}"
                  </p>
                </div>
              )}

              {/* Hindi Question Formulation */}
              {currentQ.questionHindi && (
                <div className="text-stone-900 bg-stone-50/90 p-3 rounded-xl border border-stone-200/90 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-900 uppercase tracking-wider">
                    <span>🇮🇳</span>
                    <span>हिन्दी प्रश्न (Hindi Formulation)</span>
                  </div>
                  <p className="text-sm sm:text-base font-medium leading-relaxed pl-1">
                    {currentQ.questionHindi}
                  </p>
                </div>
              )}

              {/* English Question Formulation */}
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                  <span>🌐</span>
                  <span>English Formulation</span>
                </div>
                <p className="text-sm sm:text-base font-normal text-stone-800 leading-relaxed pl-1">
                  {currentQ.question}
                </p>
              </div>
            </div>

            {/* 4 Interactive Options (Both Sanskrit/Hindi & English shown together) */}
            <div className="space-y-3 pt-1">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQ.id]?.selectedOption === optIdx;
                const optHindi = currentQ.optionsHindi?.[optIdx];

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3.5 transition-all ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/90 text-emerald-950 font-semibold ring-2 ring-emerald-500 shadow-xs"
                        : "border-stone-200 bg-white hover:bg-stone-50 text-stone-800"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border mt-0.5 ${
                        isSelected
                          ? "border-emerald-700 bg-emerald-700 text-white"
                          : "border-stone-400 text-stone-700 bg-stone-50"
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <div className="space-y-1 w-full leading-snug">
                      {optHindi && (
                        <div className="font-semibold text-stone-900 text-sm sm:text-base">
                          {optHindi}
                        </div>
                      )}
                      <div
                        className={`leading-snug ${
                          optHindi
                            ? "text-xs sm:text-sm text-stone-600 font-sans border-t border-stone-200/50 pt-1"
                            : "text-stone-900 font-medium text-sm sm:text-base"
                        }`}
                      >
                        {opt}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CBT Immediate Submit & Next Question Action Panel */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50/90 to-stone-50 border border-emerald-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3.5 h-3.5 rounded-full shrink-0 transition-colors ${
                    userAnswers[currentQ.id] !== undefined
                      ? "bg-emerald-600 ring-4 ring-emerald-100"
                      : "bg-stone-300"
                  }`}
                />
                <div className="text-xs">
                  {userAnswers[currentQ.id] !== undefined ? (
                    <span className="font-bold text-emerald-950">
                      Option {String.fromCharCode(65 + (userAnswers[currentQ.id]?.selectedOption ?? 0))} Selected
                    </span>
                  ) : (
                    <span className="text-stone-500 font-medium">
                      Select option (A–D), then click Submit to proceed
                    </span>
                  )}
                  <div className="text-[10px] text-stone-500">
                    Keyboard: [1-4] or [A-D] to select, [Enter] to submit
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSubmitAndShowNext(true)}
                  className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-semibold rounded-xl transition-colors shadow-2xs"
                  title="Save this answer, flag for review, and load next question"
                >
                  Save &amp; Review Later
                </button>

                <button
                  onClick={() => handleSubmitAndShowNext(false)}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>Submit Answer &amp; Next Question →</span>
                  <span className="text-[10px] bg-emerald-950/50 px-1.5 py-0.5 rounded font-mono">↵ Enter</span>
                </button>
              </div>
            </div>

            {/* Rapid CBT Auto-Advance Toggle */}
            <div className="flex items-center justify-between text-xs text-stone-500 pt-1 px-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoAdvanceOnSelect}
                  onChange={(e) => setAutoAdvanceOnSelect(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                />
                <span className="text-stone-700 font-medium">
                  ⚡ Auto-advance to next question upon selecting an option (त्वरित उत्तर प्रणाली)
                </span>
              </label>

              <span className="text-[11px] text-stone-400 hidden sm:inline">
                AMO CBT Format • 1 Question At A Time
              </span>
            </div>
          </div>

          {/* Navigation Controls Bottom Bar */}
          <div className="pt-5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 mt-4">
            <div className="flex items-center gap-2">
              <button
                disabled={currentIndex === 0}
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous Question
              </button>
              {userAnswers[currentQ.id] !== undefined && (
                <button
                  onClick={handleClearResponse}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors"
                >
                  Clear Choice
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleNext}
                disabled={currentIndex >= session.questions.length - 1}
                className="px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Skip / Next →
              </button>

              {currentIndex < session.questions.length - 1 ? (
                <button
                  onClick={() => handleSubmitAndShowNext(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Save &amp; Next →
                </button>
              ) : (
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors shadow-xs"
                >
                  Review &amp; Final Submit Set
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Question Palette Sidebar (1 Col) with 500-Question Block Navigation */}
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
              Question Palette
            </h3>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {session.questions.length} MCQs
            </span>
          </div>

          {/* Palette Legend */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-600 shrink-0"></span>
              <span>Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-purple-600 shrink-0"></span>
              <span>Marked ({markedCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-stone-200 border border-stone-300 shrink-0"></span>
              <span>Unattempted ({unattemptedCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-500 shrink-0"></span>
              <span>Current ({currentIndex + 1})</span>
            </div>
          </div>

          {/* For tests with more than 50 questions (e.g. 500 MCQs), provide 50-Q block navigation */}
          {session.questions.length > 50 && (
            <div className="space-y-2 pt-1 border-t border-stone-100">
              <div className="flex items-center justify-between text-[11px] font-bold text-stone-600">
                <span>Section Blocks:</span>
                <button
                  onClick={() => setPaletteBlock(paletteBlock === "ALL" ? 0 : "ALL")}
                  className="text-emerald-800 hover:underline text-[10px]"
                >
                  {paletteBlock === "ALL" ? "Show 50-Q Blocks" : "Show All 500"}
                </button>
              </div>

              {paletteBlock !== "ALL" && (
                <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                  {Array.from({ length: Math.ceil(session.questions.length / 50) }).map((_, bIdx) => {
                    const bStart = bIdx * 50 + 1;
                    const bEnd = Math.min(session.questions.length, (bIdx + 1) * 50);
                    const isCurBlock = paletteBlock === bIdx;
                    const hasCurQ = currentIndex >= bStart - 1 && currentIndex < bEnd;

                    return (
                      <button
                        key={bIdx}
                        onClick={() => setPaletteBlock(bIdx)}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition-all border ${
                          isCurBlock
                            ? "bg-emerald-800 text-white border-emerald-900 shadow-xs"
                            : hasCurQ
                            ? "bg-amber-100 text-amber-950 border-amber-300"
                            : "bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-200"
                        }`}
                      >
                        Q.{bStart}-{bEnd}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Direct Jump to Question Number */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const qNum = parseInt(jumpInput, 10);
                  if (!isNaN(qNum) && qNum >= 1 && qNum <= session.questions.length) {
                    setCurrentIndex(qNum - 1);
                    setPaletteBlock(Math.floor((qNum - 1) / 50));
                    setJumpInput("");
                  }
                }}
                className="flex items-center gap-1.5 pt-1"
              >
                <input
                  type="number"
                  min="1"
                  max={session.questions.length}
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  placeholder={`Jump to Q (1-${session.questions.length})`}
                  className="flex-1 px-2.5 py-1 text-xs rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-bold"
                >
                  Go
                </button>
              </form>
            </div>
          )}

          {/* Grid of Question Number Buttons */}
          <div className="max-h-72 overflow-y-auto pr-1">
            <div className="grid grid-cols-5 gap-1.5">
              {session.questions.map((q, idx) => {
                if (paletteBlock !== "ALL" && session.questions.length > 50) {
                  const bStart = (paletteBlock as number) * 50;
                  const bEnd = bStart + 50;
                  if (idx < bStart || idx >= bEnd) return null;
                }

                const isCurrent = idx === currentIndex;
                const isAns = userAnswers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];

                let bgClass = "bg-stone-100 text-stone-700 border-stone-200";
                if (isCurrent) {
                  bgClass = "bg-amber-500 text-stone-950 font-bold ring-2 ring-amber-300";
                } else if (isMarked) {
                  bgClass = "bg-purple-600 text-white font-semibold";
                } else if (isAns) {
                  bgClass = "bg-emerald-600 text-white font-semibold";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      if (session.questions.length > 50 && paletteBlock !== "ALL") {
                        setPaletteBlock(Math.floor(idx / 50));
                      }
                    }}
                    className={`h-8 rounded text-xs border flex items-center justify-center transition-colors ${bgClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
            <button
              onClick={() => setIsPaused(true)}
              className="flex-1 text-center py-2 text-xs font-semibold text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors"
            >
              ⏸️ Pause Exam
            </button>
            <button
              onClick={onExitTest}
              className="flex-1 text-center py-2 text-xs font-semibold text-stone-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
            >
              Exit Exam
            </button>
          </div>
        </div>
      </div>

      {/* Examination Pause Modal */}
      {isPaused && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-fadeIn border border-amber-200 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-3xl mx-auto">
              ⏸️
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-900 font-serif">Examination Paused</h3>
              <p className="text-xs text-stone-600 mt-1">
                Your exam timer is paused and your responses are safely retained.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
              <div>
                <div className="text-base font-bold text-emerald-700">{answeredCount}</div>
                <div className="text-[10px] text-stone-500">Answered</div>
              </div>
              <div>
                <div className="text-base font-bold text-stone-700">{unattemptedCount}</div>
                <div className="text-[10px] text-stone-500">Unanswered</div>
              </div>
              <div>
                <div className="text-base font-bold text-amber-700 font-mono">{formatTime(timeRemaining)}</div>
                <div className="text-[10px] text-stone-500">Time Left</div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => setIsPaused(false)}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-colors shadow-xs"
              >
                Resume Examination ▶
              </button>
              <button
                onClick={onExitTest}
                className="w-full py-2 text-xs font-semibold text-stone-500 hover:text-rose-700 transition-colors"
              >
                Exit and Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal before Submit */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-amber-900">
              <span className="text-xl">⚠️</span>
              <h3 className="text-base font-bold">Submit Examination?</h3>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you want to finish and evaluate your exam? Review your test status summary:
            </p>

            <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
              <div>
                <div className="text-lg font-bold text-emerald-700">{answeredCount}</div>
                <div className="text-[10px] text-stone-500">Answered</div>
              </div>
              <div>
                <div className="text-lg font-bold text-stone-700">{unattemptedCount}</div>
                <div className="text-[10px] text-stone-500">Unanswered</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-700">{markedCount}</div>
                <div className="text-[10px] text-stone-500">Marked</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50"
              >
                Resume Exam
              </button>
              <button
                onClick={calculateAndSubmit}
                className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
