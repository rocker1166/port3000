// File: src/app/api/generate_quizz/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
  systemInstruction: `You are an expert educational quiz generator.
Your task: Generate high-quality multiple-choice questions.
Output JSON array of objects:
[
  {
    "question": "...",
    "options": ["a", "b", "c", "d"],
    "correct": "the correct full option text"
  }
]`,
});
const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 4086,
  responseMimeType: "application/json",
};

export async function POST(req: NextRequest) {
  try {
    const { no_of_questions, difficulty, topics } = await req.json();
    if (
      !no_of_questions ||
      !difficulty ||
      !topics ||
      !Array.isArray(topics) ||
      !topics.length
    ) {
      return NextResponse.json(
        { error: "Need no_of_questions, difficulty, topics[]" },
        { status: 400 }
      );
    }
    const lvl = difficulty.toLowerCase();
    if (!["easy", "medium", "hard"].includes(lvl)) {
      return NextResponse.json(
        { error: "Difficulty must be easy|medium|hard" },
        { status: 400 }
      );
    }

    const chat = model.startChat({ generationConfig, history: [] });
    const prompt = `Generate ${no_of_questions} ${lvl} multiple-choice questions on: ${topics.join(
      ", "
    )}.
Return only the JSON array.`;
    const res = await chat.sendMessage(prompt);
    const text = await res.response.text();
    const data = JSON.parse(text);
    return NextResponse.json({ data });
  } catch (e: any) {
    console.error("Quiz generation error:", e);
    return NextResponse.json(
      { error: e.message || "Generation failed" },
      { status: 500 }
    );
  }
}
