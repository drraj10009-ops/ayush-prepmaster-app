import React, { useState } from "react";
import { NCISM_FLASHCARDS } from "../data/flashcardsData";
import { Flashcard } from "../types";

export const FlashcardsView: React.FC = () => {
  const [cards] = useState<Flashcard[]>(NCISM_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCardIds, setLearnedCardIds] = useState<Record<string, boolean>>({});
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");

  const filteredCards = cards.filter(
    (c) => selectedSubject === "ALL" || c.subject === selectedSubject
  );

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleMarkMastered = () => {
    if (currentCard) {
      setLearnedCardIds((prev) => ({ ...prev, [currentCard.id]: true }));
      handleNext();
    }
  };

  const uniqueSubjects: string[] = Array.from(new Set(cards.map((c) => c.subject)));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title Bar */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
          Active Recall & Spaced Repetition
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
          NCISM High-Yield Flashcards
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto">
          Rapidly memorize core classical shlokas, botanical classifications, formulations, and anatomical definitions.
        </p>
      </div>

      {/* Subject Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => {
            setSelectedSubject("ALL");
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
            selectedSubject === "ALL"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-white border border-stone-300 text-stone-700 hover:bg-stone-50"
          }`}
        >
          All Subjects ({cards.length})
        </button>
        {uniqueSubjects.map((sub) => (
          <button
            key={sub}
            onClick={() => {
              setSelectedSubject(sub);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              selectedSubject === sub
                ? "bg-emerald-800 text-white shadow-xs"
                : "bg-white border border-stone-300 text-stone-700 hover:bg-stone-50"
            }`}
          >
            {sub.split("(")[0]}
          </button>
        ))}
      </div>

      {/* Card Progress counter */}
      <div className="flex items-center justify-between text-xs text-stone-500 max-w-xl mx-auto px-2">
        <span>
          Card <strong>{currentIndex + 1}</strong> of <strong>{filteredCards.length}</strong>
        </span>
        <span>
          Mastered: <strong>{Object.keys(learnedCardIds).length}</strong>
        </span>
      </div>

      {/* Interactive 3D Flip Flashcard */}
      {currentCard && (
        <div className="max-w-xl mx-auto perspective-1000">
          <div
            id="interactive-flashcard"
            onClick={() => setIsFlipped(!isFlipped)}
            className={`cursor-pointer min-h-[340px] rounded-2xl p-6 sm:p-8 transition-all duration-500 shadow-md border flex flex-col justify-between select-none relative ${
              isFlipped
                ? "bg-emerald-900 text-white border-emerald-800"
                : "bg-white text-stone-900 border-stone-200 hover:border-emerald-400"
            }`}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between border-b pb-3 border-current/10">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">
                {currentCard.subject}
              </span>
              <span className="text-[11px] font-medium opacity-70">
                {isFlipped ? "Answer / Shloka (Click to flip back)" : "Prompt (Click to reveal)"}
              </span>
            </div>

            {/* Card Body */}
            <div className="py-6 my-auto text-center space-y-4">
              {!isFlipped ? (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-stone-500 uppercase">Topic: {currentCard.topic}</div>
                  <h3 className="text-lg sm:text-xl font-bold leading-relaxed">
                    {currentCard.front}
                  </h3>
                </div>
              ) : (
                <div className="space-y-4 text-left">
                  {currentCard.sanskritShloka && (
                    <div className="p-3 rounded-lg bg-black/20 text-emerald-200 font-serif text-xs sm:text-sm border border-emerald-700/50 leading-relaxed text-center">
                      {currentCard.sanskritShloka}
                    </div>
                  )}
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-emerald-50">
                    {currentCard.back}
                  </p>
                  {currentCard.mnemonic && (
                    <div className="p-2 rounded bg-amber-400 text-amber-950 font-bold text-xs">
                      💡 Mnemonic: {currentCard.mnemonic}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="border-t pt-3 border-current/10 flex items-center justify-between text-[11px] opacity-80">
              <span>Ref: {currentCard.classicalReference}</span>
              <span className="font-semibold">Tap anywhere to flip ⟳</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons below card */}
      <div className="flex items-center justify-center gap-3 max-w-xl mx-auto pt-2">
        <button
          onClick={handlePrev}
          className="px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 shadow-xs"
        >
          ← Prev Card
        </button>

        <button
          onClick={handleMarkMastered}
          className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs transition-colors"
        >
          ✓ Mark Mastered & Next
        </button>

        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 shadow-xs"
        >
          Next Card →
        </button>
      </div>
    </div>
  );
};
