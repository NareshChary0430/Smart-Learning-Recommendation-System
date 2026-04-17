import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("VITE_GEMINI_API_KEY is missing. Please add it to your .env.local file.");
}

const genAI = new GoogleGenerativeAI(apiKey || "missing_key");

export default genAI;
