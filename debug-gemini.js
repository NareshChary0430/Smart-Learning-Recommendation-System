import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
const match = env.match(/VITE_GEMINI_API_KEY=["']?([^"'\s]+)["']?/);
const apiKey = match ? match[1] : null;

async function test() {
  if (!apiKey) {
    console.error("API Key not found in .env.local");
    return;
  }
  console.log("Using API Key starting with:", apiKey.substring(0, 10));
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Try listModels first to see what's available
    // Note: listModels is on the genAI instance if using newer SDK versions, 
    // but the most reliable way to check if a key works is to just ping a known model.
    
    // We'll try gemini-1.5-flash which is widely available.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello!");
    console.log("SUCCESS with gemini-1.5-flash:", result.response.text());
  } catch (error) {
    console.error("FAILED with gemini-1.5-flash:", error.message);
    
    // Try gemini-2.0-flash-exp if possible
    try {
        const model2 = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const result2 = await model2.generateContent("Hello!");
        console.log("SUCCESS with gemini-2.0-flash-exp:", result2.response.text());
    } catch (e2) {
        console.error("FAILED with gemini-2.0-flash-exp:", e2.message);
    }
  }
}

test();
