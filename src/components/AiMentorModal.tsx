import React, { useState, useEffect, useRef } from "react";
import { MCQQuestion } from "../types";

interface Message {
  role: "user" | "mentor";
  content: string;
}

interface AiMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextQuestion?: MCQQuestion | null;
}

export const AiMentorModal: React.FC<AiMentorModalProps> = ({
  isOpen,
  onClose,
  contextQuestion
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "mentor",
      content:
        "Namaste! I am your AI Ayush Clinical Guru. Ask me any doubt on Charaka, Sushruta, Vagbhata, Dravyaguna, Rasa Shastra, Marma anatomy, or modern clinical correlation for NEXT, AIAPGET, and AMO exams."
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // If opened with a specific question context, auto-trigger deep explanation
  useEffect(() => {
    if (contextQuestion && isOpen) {
      handleExplainContextQuestion(contextQuestion);
    }
  }, [contextQuestion, isOpen]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const handleExplainContextQuestion = async (q: MCQQuestion) => {
    const userPrompt = `Please provide a comprehensive NCISM analysis for Question ${q.id}: "${q.question}" (Subject: ${q.subject}, Topic: ${q.topic}). Explain why Option (${String.fromCharCode(65 + q.correctAnswer)}) "${q.options[q.correctAnswer]}" is correct and give classical Samhita references and high-yield tips.`;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userPrompt },
      { role: "mentor", content: "Consulting classical Samhita treatises..." }
    ]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionText: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          classicalReference: q.classicalReference,
          subject: q.subject
        })
      });

      const data = await res.json();
      const answer = data.explanation || "Detailed analysis retrieved successfully.";

      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "mentor", content: answer };
        return copy;
      });
    } catch (e) {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "mentor",
          content: `${q.explanation}\n\nClassical Reference: ${q.classicalReference}\n\nHigh Yield Tip: ${q.highYieldTip || "Review the corresponding Samhita chapter before exam."}`
        };
        return copy;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputQuery.trim();
    if (!query || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini/ask-mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "mentor", content: data.answer }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "mentor",
          content:
            "According to classical Ayurvedic Siddhanta, please verify this concept across Charaka Samhita and Sushruta Samhita. For instance, in Agrya Dravyas (Sutrasthana 25), Haritaki is Pathyanaam, Amalaki is Vayahsthapana, and Shilajatu is Pramehajit."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickChips = [
    "Differentiate 20 Pramehas by Dosha",
    "Agrya Aushadhis of Charaka Sutrasthana 25",
    "Nirvisha vs Savisha Jalauka features",
    "107 Marmas structural breakdown",
    "Bhasma Pariksha tests (Varitara, Apunarbhava)"
  ];

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full h-[600px] shadow-2xl flex flex-col overflow-hidden animate-fadeIn border border-emerald-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 font-bold flex items-center justify-center text-lg">
              🕉️
            </div>
            <div>
              <h2 className="text-base font-bold font-serif">AI Ayush Clinical Guru</h2>
              <p className="text-[11px] text-emerald-200">
                NCISM, NEXT & AIAPGET Mentor • Powered by Gemini
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-emerald-100 hover:text-white hover:bg-white/10 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50/70 text-xs sm:text-sm">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-line shadow-xs ${
                  m.role === "user"
                    ? "bg-emerald-800 text-white rounded-br-xs"
                    : "bg-white text-stone-800 border border-stone-200 rounded-bl-xs"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 rounded-2xl p-3 shadow-xs text-xs text-stone-500 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-ping"></span>
                <span>Synthesizing classical Samhita citations...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Query Chips */}
        <div className="p-2 border-t border-stone-200 bg-white flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
          <span className="text-stone-400 font-semibold pl-1">Suggested:</span>
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputQuery(chip);
              }}
              className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200 whitespace-nowrap transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Query Input Footer */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your clinical doubt, shloka question, or herb query..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 p-2.5 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
