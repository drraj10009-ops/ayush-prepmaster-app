import React, { useState } from "react";
import { AyushSubject, ExamCategory, MCQQuestion, UserAnalytics, UserProfile } from "../types";
import { ALL_AYUSH_SUBJECTS, TOTAL_BANK_CAPACITY } from "../data/questionBankEngine";
import { CANONICAL_QUESTIONS } from "../data/canonicalQuestions";

interface DashboardProps {
  analytics: UserAnalytics;
  profile: UserProfile;
  onStartExam: (category: ExamCategory, subjects?: AyushSubject[]) => void;
  onOpenAmoSeries?: () => void;
  onOpenCustomTestBuilder: () => void;
  onOpenQBank: (subject?: AyushSubject) => void;
  onOpenMistakeNotebook: () => void;
  onAnswerQuestion: (questionId: string, isCorrect: boolean, subject: AyushSubject) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  analytics,
  profile,
  onStartExam,
  onOpenAmoSeries,
  onOpenCustomTestBuilder,
  onOpenQBank,
  onOpenMistakeNotebook,
  onAnswerQuestion
}) => {
  // Daily Clinical Case from canonical questions
  const dailyCase = CANONICAL_QUESTIONS[3]; // Vatarakta / Gout case
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (isAnswerRevealed) return;
    setSelectedOption(idx);
    setIsAnswerRevealed(true);
    const isCorrect = idx === dailyCase.correctAnswer;
    onAnswerQuestion(dailyCase.id, isCorrect, dailyCase.subject);
  };

  const dailyProgress = Math.min(100, Math.round(((profile.questionsAttemptedToday || 0) / profile.dailyGoalQuestions) * 100));

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner: Welcome, Target Exam & Readiness */}
      <div
        id="dashboard-hero-card"
        className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-emerald-700/40 relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 bottom-0 w-96 opacity-10 pointer-events-none flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 200 200" fill="currentColor">
            <path d="M100 0 C120 40 160 80 200 100 C160 120 120 160 100 200 C80 160 40 120 0 100 C40 80 80 40 100 0 Z" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-950 uppercase tracking-wide">
                Target: {profile.targetExam} Exam
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-700/60 text-emerald-100 border border-emerald-600/50">
                NCISM 2026 Curriculum Aligned
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif">
              Namaste, {profile.name}
            </h1>
            <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
              Master the entire NCISM syllabus with India's largest AYUSH question bank of <strong>{TOTAL_BANK_CAPACITY.toLocaleString()}+ authentic MCQs</strong>, 
              clinical vignettes, classical shloka references, and timed mock examinations.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-start-next-mock-btn"
                onClick={() => onStartExam("NEXT")}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <span>Launch NEXT Mock Exam (120 Qs)</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                id="hero-custom-test-btn"
                onClick={onOpenCustomTestBuilder}
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm rounded-xl border border-emerald-500/40 transition-colors shadow-xs"
              >
                Customize Practice Session
              </button>
            </div>
          </div>

          {/* Quick Metrics & Daily Goal Tracker */}
          <div className="bg-emerald-950/60 backdrop-blur-xs rounded-xl p-4 sm:p-5 border border-emerald-600/40 space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-200">
              <span>Today's NCISM Practice</span>
              <span>{profile.questionsAttemptedToday || 0} / {profile.dailyGoalQuestions} MCQs</span>
            </div>
            <div className="w-full bg-emerald-900 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${dailyProgress}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 text-center">
              <div className="p-2.5 rounded-lg bg-emerald-900/60 border border-emerald-700/50">
                <div className="text-xl sm:text-2xl font-black text-amber-300">
                  {analytics.overallAccuracyPercentage}%
                </div>
                <div className="text-[11px] text-emerald-200 mt-0.5">Overall Accuracy</div>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-900/60 border border-emerald-700/50">
                <div className="text-xl sm:text-2xl font-black text-white">
                  {analytics.totalQuestionsAttempted}
                </div>
                <div className="text-[11px] text-emerald-200 mt-0.5">Attempted MCQs</div>
              </div>
            </div>

            {analytics.mistakeQuestionIds.length > 0 && (
              <button
                onClick={onOpenMistakeNotebook}
                className="w-full text-center py-2 px-3 rounded-lg text-xs font-bold bg-rose-900/50 hover:bg-rose-900/80 text-rose-200 border border-rose-700/60 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Review {analytics.mistakeQuestionIds.length} Mistakes in Notebook</span>
                <span className="text-sm">➔</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Exam Simulator Launchers & Daily Case */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Exam Categories */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <span>National & State Examination Simulations</span>
            </h2>
            <button
              onClick={() => onStartExam("CUSTOM_MIXED")}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Mixed Quick Practice ➔
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* NEXT Card */}
            <div
              id="card-exam-next"
              className="bg-white rounded-xl p-5 border border-stone-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800 uppercase">
                    National Exit Test
                  </span>
                  <span className="text-xs font-semibold text-stone-500">120 Qs • 120 Mins</span>
                </div>
                <h3 className="text-base font-bold text-stone-900">Ayush NEXT Exam</h3>
                <p className="text-xs text-stone-600 line-clamp-2">
                  Clinical vignettes, diagnostic algorithms, emergency management & modern integration.
                </p>
                <div className="text-[11px] text-stone-500 pt-1">
                  Marking: <strong>+1 / -0.25 (25% neg)</strong>
                </div>
              </div>
              <button
                onClick={() => onStartExam("NEXT")}
                className="mt-4 w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
              >
                Start NEXT Simulation
              </button>
            </div>

            {/* AIAPGET Card */}
            <div
              id="card-exam-aiapget"
              className="bg-white rounded-xl p-5 border border-stone-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-100 text-indigo-800 uppercase">
                    MD / MS Entrance
                  </span>
                  <span className="text-xs font-semibold text-stone-500">120 Qs • 120 Mins</span>
                </div>
                <h3 className="text-base font-bold text-stone-900">AIAPGET Grand Mock</h3>
                <p className="text-xs text-stone-600 line-clamp-2">
                  Deep classical Samhita shlokas, Charaka, Sushruta, Vagbhata, Dravyaguna & Rasa Shastra.
                </p>
                <div className="text-[11px] text-stone-500 pt-1">
                  Marking: <strong>+4 / -1.00 (25% neg)</strong>
                </div>
              </div>
              <button
                onClick={() => onStartExam("AIAPGET")}
                className="mt-4 w-full py-2 bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
              >
                Start AIAPGET Mock
              </button>
            </div>

            {/* AMO Card */}
            <div
              id="card-exam-amo"
              className="bg-white rounded-xl p-5 border-2 border-amber-300 hover:border-amber-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-amber-500 text-stone-950 font-bold text-[9px] px-2 py-0.5 rounded-bl uppercase">
                25 Sets • 12,500+ Qs
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-900 uppercase">
                    AMO • PSC • UPSC
                  </span>
                  <span className="text-xs font-semibold text-stone-500">500 Qs/Set • 300 Mins</span>
                </div>
                <h3 className="text-base font-bold text-stone-900">AMO Master Test Series</h3>
                <p className="text-xs text-stone-600 line-clamp-2">
                  25 marathon sets of 500 MCQs each in authentic CBT format: one question at a time, submit to reveal next, simultaneous Sanskrit, Hindi &amp; English.
                </p>
                <div className="text-[11px] text-stone-500 pt-1">
                  Marking: <strong>+1 / -0.33 (1/3 neg)</strong> • 25 Sets
                </div>
              </div>
              <button
                onClick={() => {
                  if (onOpenAmoSeries) {
                    onOpenAmoSeries();
                  } else {
                    onStartExam("AMO");
                  }
                }}
                className="mt-4 w-full py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1"
              >
                <span>Explore 25 × 500-Q Sets</span>
                <span>➔</span>
              </button>
            </div>
          </div>

          {/* Subject-Wise NCISM Mastery Grid */}
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900">NCISM Core Subject Drills</h3>
                <p className="text-xs text-stone-500">Pick any subject for focused question bank exploration</p>
              </div>
              <button
                onClick={() => onOpenQBank()}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                View Full 10,000+ Bank ➔
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {ALL_AYUSH_SUBJECTS.slice(0, 8).map((subject) => {
                const subStat = analytics.subjectBreakdown[subject];
                return (
                  <div
                    key={subject}
                    onClick={() => onOpenQBank(subject)}
                    className="p-3 rounded-lg border border-stone-100 hover:border-emerald-400 bg-stone-50/70 hover:bg-emerald-50/50 cursor-pointer transition-all group"
                  >
                    <div className="text-xs font-bold text-stone-800 group-hover:text-emerald-900 truncate">
                      {subject.split("(")[0]}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mt-1">
                      <span>{subStat?.attempted || 0} Solved</span>
                      <span className="font-semibold text-emerald-700">
                        {subStat?.attempted ? `${subStat.accuracyPercentage}%` : "—"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: High-Yield Daily Question & Flashcards Promo */}
        <div className="space-y-6">
          {/* Daily Clinical Case Challenge */}
          <div
            id="daily-clinical-case-card"
            className="bg-white rounded-xl p-5 border border-amber-200 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-900 uppercase">
                Daily Clinical Vignette
              </span>
              <span className="text-[11px] font-semibold text-stone-500">NEXT Pattern</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                  {dailyCase.subject} • {dailyCase.topic}
                </span>
                <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                  संस्कृत • हिन्दी • English
                </span>
              </div>

              {/* Classical Sanskrit Shloka */}
              {dailyCase.sanskritTerm && (
                <div className="p-2.5 rounded-lg bg-amber-50/90 border border-amber-200/90 text-stone-900 space-y-0.5">
                  <span className="text-[10px] font-bold text-amber-900 flex items-center gap-1">
                    <span>📜</span>
                    <span>शास्त्रीय संदर्भ (Classical Shloka):</span>
                  </span>
                  <p className="font-serif text-xs font-semibold text-amber-950 italic">
                    "{dailyCase.sanskritTerm}"
                  </p>
                </div>
              )}

              {/* Hindi Question */}
              {dailyCase.questionHindi && (
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-1.5 py-0.5 rounded uppercase">
                    हिन्दी प्रश्न
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-stone-900 mt-1 leading-relaxed">
                    {dailyCase.questionHindi}
                  </p>
                </div>
              )}

              {/* English Question */}
              <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-stone-900 space-y-0.5">
                <span className="text-[10px] font-bold text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded uppercase">
                  English
                </span>
                <p className="text-xs sm:text-sm font-normal text-stone-800 mt-1 leading-relaxed">
                  {dailyCase.question}
                </p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {dailyCase.options.map((opt, idx) => {
                let btnStyle = "border-stone-200 bg-white hover:bg-stone-50 text-stone-800";
                if (isAnswerRevealed) {
                  if (idx === dailyCase.correctAnswer) {
                    btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                  } else if (idx === selectedOption) {
                    btnStyle = "border-rose-500 bg-rose-50 text-rose-900 font-medium";
                  } else {
                    btnStyle = "border-stone-200 bg-stone-50 opacity-60 text-stone-600";
                  }
                } else if (selectedOption === idx) {
                  btnStyle = "border-emerald-600 bg-emerald-50 text-emerald-900";
                }

                const optHindi = dailyCase.optionsHindi?.[idx];

                return (
                  <button
                    key={idx}
                    disabled={isAnswerRevealed}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-start gap-2 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border border-current mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className="space-y-0.5">
                      <div className="pt-0.5 leading-relaxed">{opt}</div>
                      {optHindi && (
                        <div className="text-[11px] opacity-80 pt-0.5 border-t border-stone-200/50">
                          {optHindi}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation */}
            {isAnswerRevealed && (
              <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs space-y-2 animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <svg className="w-4 h-4 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>
                    {selectedOption === dailyCase.correctAnswer ? "Correct Answer!" : "Detailed Clinical Rationale"}
                  </span>
                </div>
                <p className="text-stone-700 leading-relaxed text-[11px]">
                  {dailyCase.explanation}
                </p>
                {dailyCase.explanationHindi && (
                  <div className="text-[11px] text-stone-700 bg-white/70 p-2 rounded border border-stone-200/70 leading-relaxed">
                    <span className="font-bold text-amber-900 block mb-0.5">📜 संस्कृत तात्पर्य:</span>
                    {dailyCase.explanationHindi}
                  </div>
                )}
                <div className="text-[10px] text-emerald-800 font-medium pt-1 border-t border-emerald-200">
                  Reference: <em>{dailyCase.classicalReference}</em>
                </div>
              </div>
            )}
          </div>

          {/* Quick NCISM Study Tips Card */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2.5">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide flex items-center gap-1.5">
              <span>💡 NCISM High-Yield Strategy</span>
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              In both NEXT and AIAPGET exams, ~35% of questions focus on <strong>Agrya Aushadhi, Marma Viddha Lakshana, and Dhatu-Srotas correlation</strong>. 
              Always review the "Why" and classical reference for every incorrect answer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
