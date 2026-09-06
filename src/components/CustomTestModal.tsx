import React, { useState } from "react";
import { AyushSubject, ExamCategory } from "../types";
import { ALL_AYUSH_SUBJECTS } from "../data/questionBankEngine";

interface CustomTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCustomTest: (config: {
    title: string;
    category: ExamCategory;
    subjects: AyushSubject[];
    questionCount: number;
    durationMinutes: number;
    negativeMarking: number;
  }) => void;
}

export const CustomTestModal: React.FC<CustomTestModalProps> = ({
  isOpen,
  onClose,
  onStartCustomTest
}) => {
  const [title, setTitle] = useState("Custom Ayush High-Yield Drill");
  const [category, setCategory] = useState<ExamCategory>("SUBJECT_WISE");
  const [selectedSubjects, setSelectedSubjects] = useState<AyushSubject[]>([
    "Charaka Samhita",
    "Dravyaguna Vijnana (Pharmacognosy)",
    "Kayachikitsa (Internal Medicine)"
  ]);
  const [questionCount, setQuestionCount] = useState<number>(30);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [negativeMarking, setNegativeMarking] = useState<number>(0.25);

  if (!isOpen) return null;

  const handleToggleSubject = (subject: AyushSubject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const handleSelectAll = () => setSelectedSubjects([...ALL_AYUSH_SUBJECTS]);
  const handleDeselectAll = () => setSelectedSubjects([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubjects.length === 0) {
      alert("Please select at least one subject to generate your test.");
      return;
    }
    onStartCustomTest({
      title: title.trim() || "Custom Practice Test",
      category,
      subjects: selectedSubjects,
      questionCount,
      durationMinutes,
      negativeMarking
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900 font-serif">
              Customize Practice Exam
            </h2>
            <p className="text-xs text-stone-500">
              Build a personalized timed session mapped to NCISM competencies
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Test Name */}
          <div>
            <label className="block font-bold text-stone-700 mb-1 uppercase tracking-wide">
              Test Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="e.g. Samhita Speed Drill #1"
            />
          </div>

          {/* Exam Category */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: "NEXT", label: "NEXT Simulation", neg: 0.25 },
              { id: "AIAPGET", label: "AIAPGET PG", neg: 1.0 },
              { id: "AMO", label: "AMO / PSC Drill", neg: 0.33 },
              { id: "SUBJECT_WISE", label: "Subject Drill", neg: 0 }
            ].map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => {
                  setCategory(cat.id as ExamCategory);
                  setNegativeMarking(cat.neg);
                }}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  category === cat.id
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500"
                    : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Question Count & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1 uppercase tracking-wide">
                No. of Questions
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value, 10))}
                className="w-full p-2 border border-stone-300 rounded-lg bg-white"
              >
                <option value={10}>10 Questions (Quick)</option>
                <option value={25}>25 Questions</option>
                <option value={30}>30 Questions</option>
                <option value={50}>50 Questions</option>
                <option value={100}>100 Questions (AMO Pattern)</option>
                <option value={120}>120 Questions (Grand Mock)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1 uppercase tracking-wide">
                Time Duration
              </label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value, 10))}
                className="w-full p-2 border border-stone-300 rounded-lg bg-white"
              >
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
                <option value={90}>90 Minutes</option>
                <option value={120}>120 Minutes (2 Hours)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1 uppercase tracking-wide">
                Negative Marking
              </label>
              <select
                value={negativeMarking}
                onChange={(e) => setNegativeMarking(parseFloat(e.target.value))}
                className="w-full p-2 border border-stone-300 rounded-lg bg-white"
              >
                <option value={0}>No Negative (Practice)</option>
                <option value={0.25}>-0.25 (NEXT 25%)</option>
                <option value={0.33}>-0.33 (AMO 1/3)</option>
                <option value={1.0}>-1.00 (AIAPGET 25%)</option>
              </select>
            </div>
          </div>

          {/* Subjects Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-stone-700 uppercase tracking-wide">
                Select NCISM Subjects ({selectedSubjects.length} of {ALL_AYUSH_SUBJECTS.length})
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold"
                >
                  Select All
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={handleDeselectAll}
                  className="text-stone-500 hover:text-stone-700"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-stone-200 rounded-lg bg-stone-50">
              {ALL_AYUSH_SUBJECTS.map((sub) => {
                const isSelected = selectedSubjects.includes(sub);
                return (
                  <label
                    key={sub}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                      isSelected ? "bg-emerald-50 text-emerald-950 font-medium" : "text-stone-700 hover:bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleSubject(sub)}
                      className="rounded text-emerald-700 focus:ring-emerald-500"
                    />
                    <span className="truncate">{sub}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 font-semibold hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow-xs transition-colors"
            >
              Generate & Launch Test ➔
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
