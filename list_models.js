import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const runTest = async () => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    console.log("Fetching available models...");

    const modelsResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    const json = await modelsResponse.json();
    console.log("Models:", JSON.stringify(json, null, 2));

  } catch (err) {
    console.error("FAILED:", err.message);
  }
};

runTest();