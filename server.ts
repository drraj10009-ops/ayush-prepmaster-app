import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Mentor / Concept Explainer Endpoint
app.post("/api/gemini/explain", async (req, res) => {
  try {
    const { question, options, selectedAnswer, correctAnswer, subject, topic } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(200).json({
        success: true,
        explanation: "AI Mentor is available in live cloud mode with an active API key. Please check the classical Samhita references provided in the question breakdown below.",
      });
    }

    const prompt = `You are an expert NCISM Professor and National Exit Test (NEXT) / AIAPGET / AMO examiner for Indian Systems of Medicine (AYUSH - Ayurveda).
A student is reviewing this question:
Subject: ${subject || "General Ayurveda"}
Topic: ${topic || "Ayurvedic Principles"}
Question: "${question}"
Options:
${options ? options.map((opt: string, i: number) => `${String.fromCharCode(65 + i)}) ${opt}`).join("\n") : "N/A"}
Student Selected: ${selectedAnswer !== undefined ? String.fromCharCode(65 + selectedAnswer) : "None"}
Correct Answer: ${correctAnswer !== undefined ? String.fromCharCode(65 + correctAnswer) : "N/A"}

Please provide a structured, high-yield explanation containing:
1. Classical Samhita Shloka & Context (Charaka / Sushruta / Ashtanga Hridaya / NCISM syllabus reference).
2. Detailed Rationale: Why the correct option is indisputably right according to classical texts.
3. Option Elimination: Why the remaining options are incorrect and what disease/concept they actually belong to.
4. Clinical NEXT Vignette takeaway & High-Yield Mnemonic for quick recall.
Keep it concise, rigorous, and highly exam-relevant.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the top Ayush Medical Academy Professor specializing in NCISM guidelines, Charaka Samhita, Sushruta Samhita, and modern integrative clinical medicine.",
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      explanation: response.text || "Detailed breakdown generated based on classical NCISM curriculum.",
    });
  } catch (error: any) {
    console.error("Gemini Explain Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate AI explanation.",
    });
  }
});

// AI Clinical Doubt Solver Chat
app.post("/api/gemini/ask-mentor", async (req, res) => {
  try {
    const { query, subjectContext } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(200).json({
        success: true,
        answer: "The Ayush mentor system is in offline/cached knowledge base mode. Reference standard texts: Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, and Dravyaguna Vijnana (P.V. Sharma).",
      });
    }

    const prompt = `Student Query: "${query}"
Context / Subject: ${subjectContext || "All AYUSH disciplines (NCISM syllabus)"}

Provide an authoritative, clear answer citing authentic Ayurvedic classical treatises (Charaka, Sushruta, Vagbhata, Sharangadhara, Bhavaprakasha, Bhaishajya Ratnavali) or modern medical correlates as tested in NEXT and AMO exams. Include relevant shlokas (transliterated or Sanskrit) and key exam mnemonics.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an experienced AYUSH educator helping medical students clear NEXT, AMO, and PG entrance exams.",
      },
    });

    res.json({
      success: true,
      answer: response.text || "No response received.",
    });
  } catch (error: any) {
    console.error("Gemini Mentor Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to get response from AI mentor.",
    });
  }
});

// Dynamic AI MCQ Generator for customized clinical vignettes
app.post("/api/gemini/generate-mcqs", async (req, res) => {
  try {
    const { subject, count = 5, difficulty = "Clinical Vignette", examType = "NEXT" } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(200).json({
        success: false,
        message: "Gemini API key not configured on server. Falling back to built-in Question Bank.",
      });
    }

    const prompt = `Generate ${count} high-standard Multiple Choice Questions (MCQs) for ${examType} exam in ${subject}.
Difficulty level: ${difficulty}.
Focus on clinical case vignettes (patient presentations, signs, classical Ayurvedic diagnosis, chikitsa sutra, drug formulations, and contraindications).
Format MUST be a valid JSON array of objects with the exact schema:
[
  {
    "question": "string (clinical vignette or concept prompt)",
    "options": ["string", "string", "string", "string"],
    "correctAnswer": 0, // index 0 to 3
    "explanation": "string with thorough rationale and classical reference",
    "classicalReference": "string e.g. Charaka Chikitsa 3/120",
    "topic": "string",
    "difficulty": "${difficulty}",
    "highYieldTip": "string with mnemonic or exam rule"
  }
]
Output ONLY raw JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "[]");
    res.json({
      success: true,
      questions: parsed,
    });
  } catch (error: any) {
    console.error("Generate MCQs Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate dynamic questions.",
    });
  }
});

// Vite Middleware & SPA serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AYUSH Prepmaster server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
