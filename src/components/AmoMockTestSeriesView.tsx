import React, { useState, useMemo } from "react";
import { getAmo500TestMetaList, AmoTestMeta, AMO_QUESTIONS_PER_TEST, AMO_TOTAL_FULL_TESTS } from "../data/questionBankEngine";
import { TestResult } from "../types";

interface AmoMockTestSeriesViewProps {
  onStartAmoTest?: (testNumber: number) => void;
  onStartTest?: (testNumber: number) => void;
  pastResults: TestResult[];
  onOpenCustomTestBuilder?: () => void;
  onOpenCustomBuilder?: () => void;
}

export const AmoMockTestSeriesView: React.FC<AmoMockTestSeriesViewProps> = ({
  onStartAmoTest,
  onStartTest,
  pastResults,
  onOpenCustomTestBuilder,
  onOpenCustomBuilder
}) => {
  const [filterStatus, setFilterStatus] = useState<"ALL" | "COMPLETED" | "UNATTEMPTED">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTestInfo, setSelectedTestInfo] = useState<AmoTestMeta | null>(null);

  const testList = useMemo(() => getAmo500TestMetaList(), []);

  // Unified start test handler
  const handleLaunch = (testNumber: number) => {
    if (onStartAmoTest) {
      onStartAmoTest(testNumber);
    } else if (onStartTest) {
      onStartTest(testNumber);
    }
  };

  const handleOpenCustom = () => {
    if (onOpenCustomTestBuilder) {
      onOpenCustomTestBuilder();
    } else if (onOpenCustomBuilder) {
      onOpenCustomBuilder();
    }
  };

  // Map completed tests by test session ID pattern (e.g., amo-mega-mock-1)
  const completedMap = useMemo(() => {
    const map = new Map<number, TestResult>();
    pastResults.forEach((res) => {
      if (res.sessionId && res.sessionId.startsWith("amo-mega-mock-")) {
        const numStr = res.sessionId.replace("amo-mega-mock-", "");
        const num = parseInt(numStr, 10);
        if (!isNaN(num)) {
          // Keep the highest score if attempted multiple times
          const existing = map.get(num);
          if (!existing || res.score > existing.score) {
            map.set(num, res);
          }
        }
      }
    });
    return map;
  }, [pastResults]);

  // Overall series statistics
  const completedCount = completedMap.size;
  const totalAvailableQuestions = AMO_TOTAL_FULL_TESTS * AMO_QUESTIONS_PER_TEST;
  const completedResults = Array.from(completedMap.values()) as TestResult[];
  const avgScore = completedCount > 0
    ? Math.round(completedResults.reduce((sum: number, r: TestResult) => sum + (r.score / (r.maxScore || 1)) * 100, 0) / completedCount)
    : 0;

  // Filtered tests
  const filteredTests = useMemo(() => {
    return testList.filter((test) => {
      const isCompleted = completedMap.has(test.testNumber);
      if (filterStatus === "COMPLETED" && !isCompleted) return false;
      if (filterStatus === "UNATTEMPTED" && isCompleted) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = test.title.toLowerCase().includes(q);
        const inNum = test.testNumber.toString() === q || `test ${test.testNumber}`.includes(q) || `set ${test.testNumber}`.includes(q);
        const inSubjects = test.primarySubjects.some((s) => s.toLowerCase().includes(q));
        const inRange = `${test.questionRange.start}-${test.questionRange.end}`.includes(q);
        if (!inTitle && !inNum && !inSubjects && !inRange) return false;
      }

      return true;
    });
  }, [testList, completedMap, filterStatus, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Flagship Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden border border-emerald-800/40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 uppercase tracking-wide">
              Official AMO Recruitment CBT Pattern
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-200 border border-white/15">
              12,500+ MCQs Divided into Sets of 500 Questions Each
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Total {AMO_TOTAL_FULL_TESTS} Sets (&gt;20 Sets)
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-white">
              AMO 12,500+ MCQ Master Test Series ({AMO_TOTAL_FULL_TESTS} Sets × 500 Qs)
            </h1>
            <p className="text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed">
              Complete bank divided into <strong>{AMO_TOTAL_FULL_TESTS} marathon examination sets of exactly 500 questions each</strong>.
              Replicates the authentic State PSC &amp; UPSC Ayush Medical Officer CBT format: <strong>One question is presented at a time</strong>, and upon submitting your answer, the next question is displayed seamlessly with live timer, question palette, and negative marking (-0.33).
            </p>
          </div>

          {/* CBT Examination Flow Highlights */}
          <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <div>
                <strong>Single-Question CBT Presentation:</strong> Exactly one question displayed at a time with simultaneous Sanskrit Shloka, Hindi, and English.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">💾</span>
              <div>
                <strong>Submit &amp; Next Workflow:</strong> Submitting an option immediately saves your answer and loads the next question.
              </div>
            </div>
          </div>

          {/* Key Parameters Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl p-3.5">
              <div className="text-xs text-emerald-300 font-medium">Questions Per Set</div>
              <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">500 MCQs</div>
              <div className="text-[11px] text-stone-400">One Question At A Time</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl p-3.5">
              <div className="text-xs text-amber-300 font-medium">Marking Scheme</div>
              <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">+1.0 / -0.33</div>
              <div className="text-[11px] text-stone-400">500 Total Maximum Marks</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl p-3.5">
              <div className="text-xs text-emerald-300 font-medium">Duration &amp; Clock</div>
              <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">300 Mins</div>
              <div className="text-[11px] text-stone-400">5.0 Hours Marathon Exam</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl p-3.5">
              <div className="text-xs text-purple-300 font-medium">Total Test Sets</div>
              <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">{AMO_TOTAL_FULL_TESTS} Sets</div>
              <div className="text-[11px] text-stone-400">12,500 Total Questions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Performance Tracker */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl shrink-0">
            📊
          </div>
          <div>
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wide">
              Series Completion Progress
            </div>
            <div className="text-lg sm:text-xl font-bold text-stone-900">
              {completedCount} of {AMO_TOTAL_FULL_TESTS} Sets Completed ({Math.round((completedCount / AMO_TOTAL_FULL_TESTS) * 100)}%)
            </div>
            <div className="text-xs text-stone-500">
              {completedCount * AMO_QUESTIONS_PER_TEST} / {totalAvailableQuestions} MCQs Evaluated
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
          <div className="text-right">
            <div className="text-[11px] text-stone-500 uppercase font-semibold">Average Accuracy</div>
            <div className="text-lg font-bold text-emerald-700">{completedCount > 0 ? `${avgScore}%` : "—"}</div>
          </div>

          <div className="text-right">
            <div className="text-[11px] text-stone-500 uppercase font-semibold">AMO Readiness</div>
            <div className="text-lg font-bold text-amber-700">
              {completedCount >= 12 ? "Advanced 🔥" : completedCount >= 4 ? "Progressing 📈" : "Initial 🎯"}
            </div>
          </div>

          {(onOpenCustomTestBuilder || onOpenCustomBuilder) && (
            <button
              onClick={handleOpenCustom}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors shrink-0"
            >
              Custom Test Builder
            </button>
          )}
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
          <button
            onClick={() => setFilterStatus("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === "ALL"
                ? "bg-white text-emerald-950 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            All {AMO_TOTAL_FULL_TESTS} Sets
          </button>
          <button
            onClick={() => setFilterStatus("UNATTEMPTED")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === "UNATTEMPTED"
                ? "bg-white text-emerald-950 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Unattempted ({AMO_TOTAL_FULL_TESTS - completedCount})
          </button>
          <button
            onClick={() => setFilterStatus("COMPLETED")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === "COMPLETED"
                ? "bg-white text-emerald-950 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Search input */}
        <div className="relative flex-1 sm:max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search set 1-${AMO_TOTAL_FULL_TESTS}, subject, or Q range...`}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
          <span className="absolute left-3 top-2.5 text-stone-400 text-xs">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Quick Jump Ribbon (Set 1 to 25) */}
      <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
            Quick Jump to Any of the {AMO_TOTAL_FULL_TESTS} Sets (500 Questions Each):
          </span>
          <span className="text-[11px] text-stone-500">
            Click set number to scroll
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {testList.map((t) => {
            const isDone = completedMap.has(t.testNumber);
            return (
              <button
                key={t.testNumber}
                onClick={() => {
                  const el = document.getElementById(`amo-card-${t.testNumber}`);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }}
                className={`w-9 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center border ${
                  isDone
                    ? "bg-emerald-700 text-white border-emerald-800 shadow-xs"
                    : "bg-white text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 border-stone-200"
                }`}
                title={`Set #${t.testNumber} (Q.${t.questionRange.start}-${t.questionRange.end})`}
              >
                {t.testNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* Test Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTests.map((test) => {
          const result = completedMap.get(test.testNumber);
          const isDone = !!result;

          return (
            <div
              key={test.testNumber}
              id={`amo-card-${test.testNumber}`}
              className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden ${
                isDone ? "border-emerald-300 ring-1 ring-emerald-200" : "border-stone-200"
              }`}
            >
              <div className="p-6 space-y-4">
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-950 border border-amber-200">
                        AMO SET #{String(test.testNumber).padStart(2, "0")}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 text-stone-700">
                        Q. {test.questionRange.start} – {test.questionRange.end}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-stone-900 font-serif leading-snug">
                      {test.title}
                    </h2>
                  </div>

                  {/* Status Badge */}
                  {isDone ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200 shrink-0 flex items-center gap-1">
                      <span>✓</span> Done
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-600 border border-stone-200 shrink-0">
                      Ready
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {test.description}
                </p>

                {/* Single Question Display Notice */}
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-[11px] text-emerald-950 flex items-center gap-2">
                  <span>ℹ️</span>
                  <span><strong>AMO Mock Test Flow:</strong> One question presented at a time with instant submit &amp; advance to next question.</span>
                </div>

                {/* Primary Subject Coverage Pills */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    Syllabus Coverage:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {test.primarySubjects.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-stone-50 text-stone-700 border border-stone-200"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Exam Parameters Bar */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-stone-50 border border-stone-200 text-center text-xs">
                  <div>
                    <div className="text-[10px] text-stone-500 font-medium">Questions</div>
                    <div className="font-bold text-stone-900 mt-0.5">500 MCQs</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500 font-medium">Total Marks</div>
                    <div className="font-bold text-stone-900 mt-0.5">500 Marks</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500 font-medium">Duration</div>
                    <div className="font-bold text-stone-900 mt-0.5">300 Mins</div>
                  </div>
                </div>

                {/* If completed, show performance overview */}
                {result && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-emerald-950">
                      <span>Score: {result.score} / {result.maxScore}</span>
                      <span>Accuracy: {result.percentage}%</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-emerald-900">
                      <span>Correct: {result.correctCount}</span>
                      <span>Wrong: {result.incorrectCount}</span>
                      <span>Unattempted: {result.unattemptedCount}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-stone-50/90 border-t border-stone-200 flex items-center gap-3">
                <button
                  onClick={() => handleLaunch(test.testNumber)}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 ${
                    isDone
                      ? "bg-stone-800 hover:bg-stone-900 text-white"
                      : "bg-emerald-800 hover:bg-emerald-900 text-white"
                  }`}
                >
                  <span>🏛️</span>
                  <span>{isDone ? "Retake 500-Q AMO Set" : "Launch 500-Q AMO Set"}</span>
                </button>

                <button
                  onClick={() => setSelectedTestInfo(test)}
                  className="p-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold"
                  title="View test details and exam rules"
                >
                  ℹ️
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Modal */}
      {selectedTestInfo && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-xl space-y-5 animate-fadeIn border border-stone-200">
            <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded uppercase">
                  AMO Set #{selectedTestInfo.testNumber}
                </span>
                <h3 className="text-lg font-bold text-stone-900 font-serif mt-1">
                  {selectedTestInfo.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTestInfo(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700 leading-relaxed">
              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <div className="font-bold text-stone-900">Official Exam Rules &amp; Protocol:</div>
                <ul className="list-disc list-inside space-y-1 text-stone-600">
                  <li><strong>Total Questions:</strong> 500 MCQs (from Q. {selectedTestInfo.questionRange.start} to {selectedTestInfo.questionRange.end}).</li>
                  <li><strong>One Question Display:</strong> One question rendered at a time on screen. Submit to proceed to next.</li>
                  <li><strong>Standard Time:</strong> 300 minutes (5 hours). Live countdown clock with pause &amp; resume.</li>
                  <li><strong>Marking Scheme:</strong> +1.0 mark for correct response; -0.33 negative marking (1/3rd penalty) for incorrect responses.</li>
                  <li><strong>Question Format:</strong> Sanskrit classical shloka + Hindi formulation + English formulation on every question.</li>
                  <li><strong>Question Palette:</strong> Divided into 50-question section blocks with instant jump.</li>
                </ul>
              </div>

              <div>
                <div className="font-bold text-stone-900 mb-1">Disciplines Covered:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedTestInfo.primarySubjects.map((s, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  const num = selectedTestInfo.testNumber;
                  setSelectedTestInfo(null);
                  handleLaunch(num);
                }}
                className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs text-center"
              >
                Start This 500-Question Exam Now
              </button>
              <button
                onClick={() => setSelectedTestInfo(null)}
                className="px-4 py-2.5 border border-stone-200 hover:bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
