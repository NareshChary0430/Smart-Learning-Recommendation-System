import { GoogleGenerativeAI } from '@google/generative-ai';

const runTest = async () => {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyDpJC3V6RwVfGpjnYGgII4RRzn71ycPMSg");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Test prompt`;
    console.log("Sending request to Gemini...");
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    console.log("Success:", result.response.text());
  } catch (err) {
    console.error("FAILED:", err.message);
  }
};
runTest();
