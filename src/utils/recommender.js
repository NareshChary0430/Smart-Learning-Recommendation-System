import genAI from '../config/gemini';



export const getRecommendations = async (interest, level, goal, commitment = '2-4') => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
You are a Senior Technical Career Strategist, Ex-FAANG Hiring Manager, and AI Learning Architect.

You specialize in designing brutally realistic, market-aligned, and execution-focused career roadmaps for developers.

A candidate has approached you for a personalized roadmap.

-------------------------
👤 USER PROFILE
-------------------------
- Target Domain: "${interest}"
- Current Level: "${level}"
- Career Goal: "${goal}"
- Weekly Time Commitment: "${commitment}" hours

-------------------------
⚠️ IMPORTANT CONTEXT
-------------------------
The tech industry is highly competitive. Generic advice like "learn basics" or "build projects" is unacceptable.

You MUST:
- Think like a real hiring manager
- Align with CURRENT (2025+) industry standards
- Suggest ONLY relevant and in-demand tools, frameworks, and workflows
- Avoid outdated tech or vague recommendations
- Include execution depth (WHAT exactly to build, HOW, and WHY)

-------------------------
🎯 YOUR TASK
-------------------------
Generate a highly practical, no-fluff, execution-driven JSON roadmap.

This roadmap should feel like:
- A real mentor guiding the user step-by-step
- A hiring manager preparing them for interviews
- A strategist optimizing their chances to get hired

-------------------------
📦 OUTPUT FORMAT (STRICT JSON)
-------------------------

{
  "courses": [
    {
      "id": "unique-id",
      "title": "Real course name (must exist in real world)",
      "provider": "Coursera | Udemy | edX | etc",
      "duration": "Realistic duration",
      "difficulty": "Beginner | Intermediate | Advanced",
      "why": "Explain specifically how this course helps bridge their CURRENT level to their goal, mentioning skills/tools gained"
    }
  ],

  "confidence": number (85-99),

  "roadmapSteps": [
    {
      "title": "Specific phase name (not generic)",
      "description": "Explain WHAT they will do and WHY it matters in hiring",
      "skills": ["specific tools like React, Docker, Redis, etc"],
      "tasks": [
        "Concrete task (e.g., Build a full-stack app with JWT auth)",
        "Portfolio-level task",
        "Real-world simulation task (e.g., replicate a production feature)"
      ]
    }
  ],

  "skillGap": [
    {
      "name": "Critical industry skill (e.g., System Design, CI/CD, Docker)",
      "status": "Good | Needs Practice | Missing",
      "icon": "✔ | ⚠ | ❌"
    }
  ],

  "studyPlan": [
    {
      "week": "Week X",
      "title": "Focused milestone",
      "topics": [
        "Very specific micro-topics (e.g., React Hooks lifecycle, REST vs GraphQL tradeoffs)"
      ]
    }
  ],

  "careerInsights": {
    "roles": "3 specific job roles (e.g., Frontend Engineer I, React Developer, UI Engineer)",
    "salary": "Realistic salary range based on India/global market",
    "companies": "Examples: Startups, Product-based companies, FAANG-like tiers"
  },

  "aiTips": [
    "Advanced, non-obvious strategy (e.g., build in public, optimize GitHub)",
    "Hiring hack or shortcut",
    "Learning efficiency tip"
  ],

  "motivationalLine": "A sharp, realistic, slightly intense line pushing them toward their goal. End with 🚀",

  "quizQuestions": [
    {
      "question": "Challenging, real interview-style question",
      "options": ["A", "B", "C", "D"],
      "answer": 0
    }
  ],

  "resources": [
    {
      "name": "Exact resource name",
      "url": "Valid URL",
      "type": "Documentation | Tool | Community | Course"
    }
  ]
}

-------------------------
🚫 STRICT RULES
-------------------------
- NO generic phrases like "learn basics"
- NO fake courses or fake URLs
- NO outdated tech (avoid jQuery unless necessary)
- EVERY step must be actionable and portfolio-driven
- PRIORITIZE real-world hiring readiness over theory

-------------------------
💡 FINAL GOAL
-------------------------
This roadmap should maximize the user's probability of getting hired or achieving their goal in the shortest realistic time.

Return ONLY JSON.
`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    let responseText = result.response.text();
    // Strip markdown formatting if Gemini mistakenly wrapped the JSON output
    responseText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
    
    return JSON.parse(responseText);

  } catch (error) {
    console.error("Gemini API generation failed. Ensure your API Key is valid and you have quota.", error);
    throw new Error("Failed to generate AI Roadmap: " + error.message);
  }
};
