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
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
        console.error("API ERROR:", data.error.message);
        if (data.error.message.includes("API key not valid")) {
            console.error("TIP: Your API key appears to be invalid. Gemini API keys usually start with 'AIza'.");
        }
    } else {
        console.log("Available Models:");
        data.models.forEach(m => console.log("- " + m.name));
    }
  } catch (error) {
    console.error("FETCH FAILED:", error.message);
  }
}

test();
