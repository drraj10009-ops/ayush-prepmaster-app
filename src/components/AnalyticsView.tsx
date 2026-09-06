import React, { useState } from "react";
import { AyushSubject, ExamCategory, MCQQuestion, TestResult, UserAnalytics, UserProfile } from "../types";
import { ALL_AYUSH_SUBJECTS, getCachedQuestion } from "../data/questionBankEngine";

interface AnalyticsViewProps {
  analytics: UserAnalytics;
  profile: UserProfile;
  pastResults: TestResult[];
  onStartMistakeTest: (questions: MCQQuestion[]) => void;
  onClearMistakes: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  analytics,
  profile,
  pastResults,
  onStartMistakeTest,
  onClearMistakes
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "mistakes" | "history">("overview");

  // Load actual mistake question objects from IDs
  const mistakeQuestions: MCQQuestion[] = analytics.mistakeQuestionIds.map((id) => {
    const num = parseInt(id.replace("q-", ""), 10) - 1;
    return getCachedQuestion(Math.max(0, num));
  });

  const handleLaunchMistakeSession = () => {
    if (mistakeQuestions.length === 0) {
      alert("No mistakes currently recorded in your notebook! Keep solving questions.");
      return;
    }
    onStartMistakeTest(mistakeQuestions);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">
              Performance Analytics & Mastery Index
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
              NCISM Readiness
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Track precision trends over time, identify high-yield weak spots across subjects, and drill mistakes.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "overview" ? "bg-white text-emerald-950 shadow-xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Subject Mastery
          </button>
          <button
            onClick={() => setActiveTab("mistakes")}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
              activeTab === "mistakes" ? "bg-white text-rose-900 shadow-xs font-bold" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <span>Mistake Notebook</span>
            {analytics.mistakeQuestionIds.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center">
                {analytics.mistakeQuestionIds.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "history" ? "bg-white text-emerald-950 shadow-xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Test History ({pastResults.length})
          </button>
        </div>
      </div>

      {/* ----------------- TAB: OVERVIEW ----------------- */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">Overall Accuracy</span>
              <div className="text-3xl font-black text-emerald-800">
                {analytics.overallAccuracyPercentage}%
              </div>
              <p className="text-[11px] text-stone-500">
                Based on {analytics.totalQuestionsAttempted} total attempts
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">Total Tests Completed</span>
              <div className="text-3xl font-black text-stone-900">
                {analytics.testsCompleted}
              </div>
              <p className="text-[11px] text-stone-500">
                Simulated mock and custom sessions
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">Study Streak</span>
              <div className="text-3xl font-black text-amber-600 flex items-center gap-1">
                <span>🔥</span> {profile.studyStreakDays} <span className="text-base text-stone-500">Days</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Target: {profile.dailyGoalQuestions} MCQs per day
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">Mistake Queue</span>
              <div className="text-3xl font-black text-rose-700">
                {analytics.mistakeQuestionIds.length}
              </div>
              <p className="text-[11px] text-stone-500">
                Questions needing active re-drill
              </p>
            </div>
          </div>

          {/* Recent Performance Score Trends */}
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Recent Mock Exam Score Progression
            </h3>
            <div className="space-y-2">
              {analytics.recentScores.map((score, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <span className="w-24 text-stone-500 shrink-0">{score.date}</span>
                  <div className="flex-1 bg-stone-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        score.scorePercentage >= 70
                          ? "bg-emerald-600"
                          : score.scorePercentage >= 50
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${score.scorePercentage}%` }}
                    ></div>
                  </div>
                  <span className="w-12 font-bold text-right shrink-0">{score.scorePercentage}%</span>
                  <span className="text-stone-600 truncate max-w-xs">{score.testTitle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject-Wise Accuracy Heatmap / Progress */}
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900 font-serif">
                  NCISM Subject-Wise Mastery Radar
                </h3>
                <p className="text-xs text-stone-500">
                  Precision scores across all 18 core competencies
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ALL_AYUSH_SUBJECTS.map((sub) => {
                const stat = analytics.subjectBreakdown[sub] || { attempted: 0, correct: 0, accuracyPercentage: 0 };
                const pct = stat.accuracyPercentage;
                const isWeak = stat.attempted > 0 && pct < 50;
                const isStrong = stat.attempted > 0 && pct >= 75;

                return (
                  <div
                    key={sub}
                    className={`p-3.5 rounded-xl border space-y-2 transition-all ${
                      isWeak
                        ? "bg-rose-50/50 border-rose-200"
                        : isStrong
                        ? "bg-emerald-50/50 border-emerald-200"
                        : "bg-stone-50/70 border-stone-200"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-800 truncate" title={sub}>
                        {sub}
                      </span>
                      <span
                        className={`font-mono font-bold ${
                          isWeak ? "text-rose-700" : isStrong ? "text-emerald-700" : "text-stone-700"
                        }`}
                      >
                        {stat.attempted > 0 ? `${pct}%` : "No attempts"}
                      </span>
                    </div>

                    <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${
                          isWeak ? "bg-rose-500" : isStrong ? "bg-emerald-600" : "bg-amber-500"
                        }`}
                        style={{ width: `${stat.attempted > 0 ? pct : 0}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span>{stat.attempted} Attempted</span>
                      <span>{stat.correct} Correct</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAB: MISTAKE NOTEBOOK ----------------- */}
      {activeTab === "mistakes" && (
        <div className="space-y-6">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-rose-950 font-serif">
                NCISM Mistake Notebook ({mistakeQuestions.length} Questions)
              </h2>
              <p className="text-xs text-rose-800 mt-1">
                Every incorrect question is automatically recorded here. Re-test your mistakes until your concepts are 100% solid!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLaunchMistakeSession}
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Re-Attempt All Mistakes ➔
              </button>
              <button
                onClick={onClearMistakes}
                className="px-3 py-2 bg-white border border-rose-300 text-rose-800 text-xs font-semibold rounded-xl hover:bg-rose-100 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          {mistakeQuestions.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-stone-200 space-y-2">
              <span className="text-3xl">🎉</span>
              <h3 className="text-base font-bold text-stone-900">Your Mistake Notebook is Clean!</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                You have no outstanding incorrect questions recorded. Continue practicing from the 10,000+ Question Bank to test your stamina.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mistakeQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between text-xs border-b pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900">
                        Mistake #{idx + 1}
                      </span>
                      <span className="font-semibold text-emerald-800">{q.subject}</span>
                    </div>
                    <span className="text-stone-500 font-mono">Q.ID: {q.id}</span>
                  </div>

                  {/* Simultaneous Sanskrit, Hindi & English Question Display */}
                  <div className="space-y-2">
                    {q.sanskritTerm && (
                      <div className="bg-amber-50/90 border border-amber-200/90 rounded-lg p-2.5 text-stone-900 space-y-0.5">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-900 uppercase">
                          <span>📜</span>
                          <span>संस्कृत सूत्र (Sanskrit Classical Shloka):</span>
                        </div>
                        <p className="font-serif text-xs sm:text-sm font-semibold text-amber-950 italic">
                          "{q.sanskritTerm}"
                        </p>
                      </div>
                    )}

                    {q.questionHindi && (
                      <div className="text-xs sm:text-sm text-stone-900 bg-stone-50 p-2.5 rounded-lg border border-stone-200 space-y-0.5">
                        <span className="font-bold text-[10px] text-emerald-900 bg-emerald-100 px-1.5 py-0.5 rounded uppercase">
                          हिन्दी प्रश्न
                        </span>
                        <p className="leading-relaxed mt-1 font-medium">{q.questionHindi}</p>
                      </div>
                    )}

                    <div className="p-2.5 bg-white rounded-lg border border-stone-200 space-y-0.5">
                      <span className="font-bold text-[10px] text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded uppercase">
                        English
                      </span>
                      <p className="text-xs sm:text-sm font-normal text-stone-800 leading-relaxed mt-1">
                        {q.question}
                      </p>
                    </div>
                  </div>

                  {/* 4 Options Review with Bilingual Labels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isCorrect = optIdx === q.correctAnswer;
                      const optHindi = q.optionsHindi?.[optIdx];

                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                            isCorrect
                              ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-400"
                              : "border-stone-200 bg-stone-50/50 text-stone-700"
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border border-current mt-0.5">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <div className="space-y-0.5 w-full">
                            {optHindi && (
                              <div className="font-semibold text-stone-900 text-xs leading-snug">
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

                  {/* Comprehensive Solution & Rationale */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-2">
                    <div className="font-bold text-emerald-950 flex items-center justify-between">
                      <span>
                        सही उत्तर / Correct: ({String.fromCharCode(65 + q.correctAnswer)}){" "}
                        {q.optionsHindi?.[q.correctAnswer] && (
                          <span className="ml-1 text-emerald-900">{q.optionsHindi[q.correctAnswer]}</span>
                        )}
                      </span>
                      <span className="font-normal text-stone-600 text-[11px]">
                        {q.options[q.correctAnswer]}
                      </span>
                    </div>

                    {q.explanationHindi && (
                      <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-stone-800 space-y-1">
                        <span className="font-bold text-[11px] text-amber-900 flex items-center gap-1">
                          <span>📜</span>
                          <span>हिन्दी तात्पर्य एवं शास्त्रीय व्याख्या:</span>
                        </span>
                        <p className="text-stone-700 leading-relaxed text-xs">
                          {q.explanationHindi}
                        </p>
                      </div>
                    )}

                    <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-stone-800 space-y-1">
                      <span className="font-bold text-[11px] text-stone-700 flex items-center gap-1">
                        <span>🌐</span>
                        <span>English Scientific Rationale:</span>
                      </span>
                      <p className="text-stone-700 leading-relaxed text-xs">
                        {q.explanation}
                      </p>
                    </div>

                    {q.highYieldTip && (
                      <div className="p-2 rounded bg-amber-100/70 border border-amber-300 text-[11px] text-amber-950 font-medium">
                        💡 <strong>स्मरणीय तथ्य / High-Yield Tip:</strong> {q.highYieldTip}
                      </div>
                    )}

                    <div className="text-[11px] text-emerald-800 font-medium pt-1.5 border-t border-emerald-200/60 flex justify-between">
                      <span>Classical Reference: <em>{q.classicalReference}</em></span>
                      <span>Target Exams: {q.examType.join(", ")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ----------------- TAB: TEST HISTORY ----------------- */}
      {activeTab === "history" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-stone-50 border-b border-stone-200">
              <h2 className="text-sm font-bold text-stone-900 font-serif">
                Exam History & Score Records
              </h2>
            </div>

            {pastResults.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-500">
                No past test results logged on this device yet. Complete your first mock test to see your history!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                      <th className="p-3">Date</th>
                      <th className="p-3">Test Title</th>
                      <th className="p-3">Exam Format</th>
                      <th className="p-3">Score</th>
                      <th className="p-3">Accuracy</th>
                      <th className="p-3">Correct / Incorrect / Skipped</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {pastResults.map((r) => (
                      <tr key={r.id} className="hover:bg-stone-50">
                        <td className="p-3 font-mono text-stone-600">
                          {new Date(r.completedAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 font-bold text-stone-900">{r.sessionTitle}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                            {r.category}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-emerald-900">
                          {r.score} / {r.maxScore}
                        </td>
                        <td className="p-3 font-bold text-stone-800">{r.percentage}%</td>
                        <td className="p-3 text-stone-600">
                          <span className="text-emerald-700 font-bold">{r.correctCount} ✓</span>{" "}
                          • <span className="text-rose-700 font-bold">{r.incorrectCount} ✕</span>{" "}
                          • <span className="text-stone-500">{r.unattemptedCount} ⚪</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
