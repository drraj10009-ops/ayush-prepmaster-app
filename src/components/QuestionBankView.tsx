import React, { useState, useMemo } from "react";
import { AyushSubject, DifficultyLevel, ExamCategory, LanguageMode, MCQQuestion } from "../types";
import { ALL_AYUSH_SUBJECTS, getCachedQuestion, queryQuestionBank, TOTAL_BANK_CAPACITY } from "../data/questionBankEngine";

interface QuestionBankViewProps {
  initialSubject?: AyushSubject | "ALL";
  onAnswerQuestion: (questionId: string, isCorrect: boolean, subject: AyushSubject) => void;
  onToggleBookmark: (questionId: string) => boolean;
  isBookmarked: (questionId: string) => boolean;
  onAskAiExplain: (question: MCQQuestion) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  initialSubject = "ALL",
  onAnswerQuestion,
  onToggleBookmark,
  isBookmarked,
  onAskAiExplain
}) => {
  const [selectedSubject, setSelectedSubject] = useState<AyushSubject | "ALL">(initialSubject);
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory | "ALL">("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [jumpIndexInput, setJumpIndexInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Track attempts made in this session: questionId -> selectedOption
  const [attempts, setAttempts] = useState<Record<string, number>>({});

  // Query engine
  const { questions, totalMatched } = useMemo(() => {
    return queryQuestionBank({
      subject: selectedSubject,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      searchQuery,
      limit: pageSize,
      offset: (currentPage - 1) * pageSize
    });
  }, [selectedSubject, selectedCategory, selectedDifficulty, searchQuery, currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalMatched / pageSize));

  const handleSelectOption = (q: MCQQuestion, optionIdx: number) => {
    if (attempts[q.id] !== undefined) return; // already attempted
    setAttempts((prev) => ({ ...prev, [q.id]: optionIdx }));
    const isCorrect = optionIdx === q.correctAnswer;
    onAnswerQuestion(q.id, isCorrect, q.subject);
  };

  const handleJumpToIndex = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(jumpIndexInput.trim(), 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= TOTAL_BANK_CAPACITY) {
      const page = Math.ceil(parsed / pageSize);
      setCurrentPage(Math.min(page, totalPages));
      setJumpIndexInput("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
              NCISM Question Bank
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {TOTAL_BANK_CAPACITY.toLocaleString()}+ MCQs
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Browse, practice, and test any question from our authentic Ayush question bank with immediate verification & classical rationales.
          </p>
        </div>

        {/* Direct Jump to Question Number */}
        <form onSubmit={handleJumpToIndex} className="flex items-center gap-2 shrink-0">
          <label htmlFor="jump-q-input" className="text-xs font-semibold text-stone-600 whitespace-nowrap">
            Jump to Q#:
          </label>
          <input
            id="jump-q-input"
            type="number"
            min={1}
            max={TOTAL_BANK_CAPACITY}
            placeholder={`1 - ${TOTAL_BANK_CAPACITY}`}
            value={jumpIndexInput}
            onChange={(e) => setJumpIndexInput(e.target.value)}
            className="w-28 px-2.5 py-1.5 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Go
          </button>
        </form>
      </div>

      {/* Filter Bar */}
      <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Subject Filter */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wide mb-1">
            Subject ({ALL_AYUSH_SUBJECTS.length})
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value as AyushSubject | "ALL");
              setCurrentPage(1);
            }}
            className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="ALL">All AYUSH Subjects ({TOTAL_BANK_CAPACITY}+ Qs)</option>
            {ALL_AYUSH_SUBJECTS.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Exam Type Filter */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wide mb-1">
            Exam Target
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value as ExamCategory | "ALL");
              setCurrentPage(1);
            }}
            className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="ALL">All Exam Formats</option>
            <option value="NEXT">NEXT (Clinical Exit Test)</option>
            <option value="AIAPGET">AIAPGET (PG Entrance)</option>
            <option value="AMO">AMO (Medical Officer / PSC)</option>
          </select>
        </div>

        {/* Difficulty Level */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wide mb-1">
            Difficulty Level
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => {
              setSelectedDifficulty(e.target.value as DifficultyLevel | "ALL");
              setCurrentPage(1);
            }}
            className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="ALL">All Levels</option>
            <option value="Easy">Easy (Recall & Definition)</option>
            <option value="Medium">Medium (Application & Shloka)</option>
            <option value="Hard">Hard (Multistep & Combinations)</option>
            <option value="Clinical Vignette">Clinical Vignette (Case Scenario)</option>
          </select>
        </div>

        {/* Search Input */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wide mb-1">
            Search Term / Shloka / Herb
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Ashwagandha, Marma, Jwara, Charaka..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs bg-white border border-stone-300 rounded-lg p-2 pr-7 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-2 text-stone-400 hover:text-stone-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header with Real Exam Standard Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-600 px-1">
        <div>
          Showing page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> (
          <strong>{totalMatched.toLocaleString()}</strong> questions matching filter)
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Real Exam Trilingual Format Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 font-medium text-xs shadow-xs">
            <span className="text-sm">🏛️</span>
            <span>
              Real Exam Format: <strong>संस्कृत सूत्र • हिन्दी प्रश्न • English</strong> (Combined)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1 rounded border border-stone-300 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
            >
              ← Prev
            </button>
            <span className="font-semibold text-stone-800">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-2.5 py-1 rounded border border-stone-300 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-5">
        {questions.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-stone-200">
            <p className="text-stone-500 text-sm">No MCQs matched your search criteria.</p>
            <button
              onClick={() => {
                setSelectedSubject("ALL");
                setSelectedCategory("ALL");
                setSelectedDifficulty("ALL");
                setSearchQuery("");
              }}
              className="mt-3 px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          questions.map((q) => {
            const userAttempt = attempts[q.id];
            const isAttempted = userAttempt !== undefined;
            const isBookmarkedFlag = isBookmarked(q.id);

            return (
              <div
                key={q.id}
                id={`q-card-${q.id}`}
                className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-xs hover:border-emerald-300 transition-colors space-y-4"
              >
                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-800">
                      Q.{q.id.replace("q-", "")}
                    </span>
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {q.subject}
                    </span>
                    <span className="text-stone-500">• {q.topic}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        q.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : q.difficulty === "Medium"
                          ? "bg-blue-100 text-blue-800"
                          : q.difficulty === "Hard"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Ask AI Guru */}
                    <button
                      onClick={() => onAskAiExplain(q)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-200 transition-colors"
                      title="Ask AI Ayush Guru to explain this concept or break down classical shlokas"
                    >
                      <span>🤖 Ask AI Guru</span>
                    </button>

                    {/* Bookmark */}
                    <button
                      onClick={() => onToggleBookmark(q.id)}
                      className={`p-1.5 rounded-md border text-xs transition-colors ${
                        isBookmarkedFlag
                          ? "bg-amber-100 text-amber-700 border-amber-300"
                          : "bg-stone-50 text-stone-400 hover:text-stone-700 border-stone-200"
                      }`}
                      title={isBookmarkedFlag ? "Remove bookmark" : "Bookmark for revision"}
                    >
                      ★
                    </button>
                  </div>
                </div>

                {/* Question Text in Sanskrit, Hindi, and English (Real Exam Combined Layout) */}
                <div className="space-y-3">
                  {/* Classical Sanskrit Shloka / Sutra Reference */}
                  {q.sanskritTerm && (
                    <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-3 text-stone-900 shadow-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-amber-900 uppercase">
                        <span>📜</span>
                        <span>संस्कृत सूत्र / शास्त्रीय श्लोक (Sanskrit Classical Shloka)</span>
                      </div>
                      <p className="font-serif text-sm sm:text-base font-semibold text-amber-950 italic leading-relaxed pl-1">
                        "{q.sanskritTerm}"
                      </p>
                    </div>
                  )}

                  {/* Hindi Question Formulation */}
                  {q.questionHindi && (
                    <div className="bg-stone-50/90 border border-stone-200/90 rounded-xl p-3 text-stone-900 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-emerald-900 uppercase">
                        <span>🇮🇳</span>
                        <span>हिन्दी प्रश्न (Hindi Formulation)</span>
                      </div>
                      <p className="text-sm sm:text-base font-medium text-stone-900 leading-relaxed pl-1">
                        {q.questionHindi}
                      </p>
                    </div>
                  )}

                  {/* English Question Formulation */}
                  <div className="p-3 bg-white border border-stone-200/80 rounded-xl text-stone-900 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-stone-600 uppercase">
                      <span>🌐</span>
                      <span>English Formulation</span>
                    </div>
                    <p className="text-sm sm:text-base font-normal text-stone-800 leading-relaxed pl-1">
                      {q.question}
                    </p>
                  </div>
                </div>

                {/* 4 Options (Showing Sanskrit/Hindi & English simultaneously inside each option) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, optIdx) => {
                    let btnClass = "border-stone-200 bg-white hover:bg-stone-50 text-stone-800";

                    if (isAttempted) {
                      if (optIdx === q.correctAnswer) {
                        // Correct option
                        btnClass = "border-emerald-600 bg-emerald-50/90 text-emerald-950 font-bold ring-1 ring-emerald-500";
                      } else if (optIdx === userAttempt) {
                        // User chose wrong option
                        btnClass = "border-rose-500 bg-rose-50 text-rose-900 font-semibold ring-1 ring-rose-400";
                      } else {
                        // Other unselected options
                        btnClass = "border-stone-200 bg-stone-50/50 text-stone-500 opacity-60";
                      }
                    }

                    const optHindi = q.optionsHindi?.[optIdx];

                    return (
                      <button
                        key={optIdx}
                        disabled={isAttempted}
                        onClick={() => handleSelectOption(q, optIdx)}
                        className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${btnClass}`}
                      >
                        <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border border-current mt-0.5">
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
                                ? "text-xs sm:text-sm text-stone-600 font-sans border-t border-stone-200/60 pt-1"
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

                {/* Instant Feedback & Comprehensive Explanation (Combined Trilingual Rationale) */}
                {isAttempted && (
                  <div
                    id={`rationale-${q.id}`}
                    className={`rounded-xl p-4 border text-xs sm:text-sm space-y-3 animate-fadeIn ${
                      userAttempt === q.correctAnswer
                        ? "bg-emerald-50/60 border-emerald-200 text-stone-800"
                        : "bg-amber-50/60 border-amber-200 text-stone-800"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/70 pb-2">
                      <div className="flex items-center gap-2 font-bold">
                        {userAttempt === q.correctAnswer ? (
                          <span className="text-emerald-800 flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[11px]">
                              ✓
                            </span>
                            सही उत्तर! / Correct Answer!
                          </span>
                        ) : (
                          <span className="text-rose-800 flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-rose-700 text-white flex items-center justify-center text-[11px]">
                              ✕
                            </span>
                            गलत उत्तर / Incorrect Attempt
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-stone-700 bg-white/80 px-2.5 py-1 rounded-md border border-stone-200">
                        सही विकल्प / Correct Option: <strong>({String.fromCharCode(65 + q.correctAnswer)})</strong>{" "}
                        {q.optionsHindi?.[q.correctAnswer] && (
                          <span className="font-bold text-emerald-900">
                            {q.optionsHindi[q.correctAnswer]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-stone-700 leading-relaxed space-y-2.5">
                      {/* Sanskrit Tatparya & Hindi Vyakhya */}
                      {q.explanationHindi && (
                        <div className="p-3 rounded-xl bg-white/80 border border-stone-200 text-stone-800 space-y-1">
                          <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                            <span>📜</span>
                            <span>हिन्दी तात्पर्य एवं शास्त्रीय व्याख्या (Hindi Rationale):</span>
                          </div>
                          <p className="leading-relaxed text-xs sm:text-sm font-sans">
                            {q.explanationHindi}
                          </p>
                        </div>
                      )}

                      {/* English Detailed Rationale */}
                      <div className="p-3 rounded-xl bg-white/70 border border-stone-200 text-stone-800 space-y-1">
                        <div className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                          <span>🌐</span>
                          <span>English Scientific Rationale:</span>
                        </div>
                        <p className="leading-relaxed text-xs sm:text-sm">
                          {q.explanation}
                        </p>
                      </div>

                      {/* High Yield Exam Tip */}
                      {q.highYieldTip && (
                        <div className="p-2.5 rounded-xl bg-amber-100/70 border border-amber-300 text-xs text-amber-950 font-medium flex items-start gap-2">
                          <span className="text-base leading-none">💡</span>
                          <div>
                            <strong>परीक्षोपयोगी स्मरणीय तथ्य / High-Yield Tip:</strong> {q.highYieldTip}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center justify-between text-[11px] text-stone-500">
                      <span>
                        Classical Reference: <strong>{q.classicalReference}</strong>
                      </span>
                      <span>Target Exams: {q.examType.join(", ")}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-stone-200 pt-4 text-xs text-stone-600">
          <div>
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalMatched)} of{" "}
            {totalMatched.toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
            >
              Previous
            </button>
            <span className="px-2 font-bold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
