import React from "react";
import { PWAInstallPrompt } from "./PWAInstallPrompt";

export type ActiveTab = "dashboard" | "qbank" | "mocktests" | "flashcards" | "library" | "analytics";

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenAiMentor: () => void;
  streakDays: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenAiMentor,
  streakDays
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            id="brand-header-container"
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onSelectTab("dashboard")}
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs border border-emerald-200 bg-emerald-50 flex items-center justify-center p-0.5">
              <img
                src="/assets/ayush_logo.png"
                alt="AYUSH Prepmaster Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback icon if image hasn't finished copying
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <span className="text-xl font-bold text-emerald-800">आयु</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-emerald-950 font-serif">
                  AYUSH Prepmaster
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  10,000+ MCQs
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                NCISM Mapped • NEXT • AIAPGET • AMO Preparation
              </p>
            </div>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              id="nav-tab-dashboard"
              onClick={() => onSelectTab("dashboard")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === "dashboard"
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              Dashboard
            </button>
            <button
              id="nav-tab-qbank"
              onClick={() => onSelectTab("qbank")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                activeTab === "qbank"
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              <span>10,000+ Q-Bank</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </button>
            <button
              id="nav-tab-mocktests"
              onClick={() => onSelectTab("mocktests")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === "mocktests"
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              <span>AMO & Mock Tests</span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                activeTab === "mocktests" ? "bg-amber-400 text-stone-950" : "bg-amber-100 text-amber-900"
              }`}>
                500 Qs
              </span>
            </button>
            <button
              id="nav-tab-flashcards"
              onClick={() => onSelectTab("flashcards")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === "flashcards"
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              Flashcards
            </button>
            <button
              id="nav-tab-library"
              onClick={() => onSelectTab("library")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === "library"
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              NCISM Library
            </button>
            <button
              id="nav-tab-analytics"
              onClick={() => onSelectTab("analytics")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === "analytics"
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              Analytics
            </button>
          </nav>

          {/* Action buttons (Right) */}
          <div className="flex items-center space-x-2">
            {/* Study Streak Badge */}
            <div
              id="header-streak-badge"
              className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-medium text-amber-900"
              title={`${streakDays} Day Study Streak! Consistent NCISM practice builds retention.`}
            >
              <span className="text-sm">🔥</span>
              <span className="font-bold">{streakDays}</span>
              <span className="hidden sm:inline text-[11px] text-amber-700">Days</span>
            </div>

            {/* AI Clinical Mentor Button */}
            <button
              id="header-ai-mentor-btn"
              onClick={onOpenAiMentor}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100 transition-colors shadow-xs"
            >
              <svg className="w-3.5 h-3.5 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span>AI Ayush Guru</span>
            </button>

            {/* PWA Install Button */}
            <PWAInstallPrompt />
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-emerald-50 overflow-x-auto text-[11px]">
          <button
            onClick={() => onSelectTab("dashboard")}
            className={`px-2 py-1 rounded whitespace-nowrap ${
              activeTab === "dashboard" ? "font-bold text-emerald-800 bg-emerald-50" : "text-stone-600"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onSelectTab("qbank")}
            className={`px-2 py-1 rounded whitespace-nowrap ${
              activeTab === "qbank" ? "font-bold text-emerald-800 bg-emerald-50" : "text-stone-600"
            }`}
          >
            10,000+ MCQs
          </button>
          <button
            onClick={() => onSelectTab("mocktests")}
            className={`px-2 py-1 rounded whitespace-nowrap ${
              activeTab === "mocktests" ? "font-bold text-emerald-800 bg-emerald-50" : "text-stone-600"
            }`}
          >
            AMO 500-Q Tests
          </button>
          <button
            onClick={() => onSelectTab("flashcards")}
            className={`px-2 py-1 rounded whitespace-nowrap ${
              activeTab === "flashcards" ? "font-bold text-emerald-800 bg-emerald-50" : "text-stone-600"
            }`}
          >
            Flashcards
          </button>
          <button
            onClick={() => onSelectTab("library")}
            className={`px-2 py-1 rounded whitespace-nowrap ${
              activeTab === "library" ? "font-bold text-emerald-800 bg-emerald-50" : "text-stone-600"
            }`}
          >
            Library
          </button>
          <button
            onClick={() => onSelectTab("analytics")}
            className={`px-2 py-1 rounded whitespace-nowrap ${
              activeTab === "analytics" ? "font-bold text-emerald-800 bg-emerald-50" : "text-stone-600"
            }`}
          >
            Analytics
          </button>
        </div>
      </div>
    </header>
  );
};
