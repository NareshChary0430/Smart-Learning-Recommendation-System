<div align="center">
  <h1>🧠 SERS: Smart E-Learning Recommendation System</h1>
  <p><i>An AI-driven, highly gamified Professional Learning Management System built for extreme focus and retention.</i></p>
  
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase" />
  </p>
</div>

---

## 🌟 The Vision

**SERS** (Smart E-Learning Recommendation System) is not your average checklist app. It is a fully responsive, gamified Learning Management System designed around actual behavioral psychology. 

Typical learning platforms fail because users drop off. **SERS** solves the retention problem by wrapping an artificially intelligent study plan inside a beautifully localized, interactive environment featuring GitHub-style consistency matching, deep-focus Pomodoro physics, and active knowledge validation.

## ✨ Core Features

*   **🤖 AI Study Architect**: Enter your goal, focus, and time commitment. SERS dynamically generates a modular 4-week study plan, custom resource recommendations, and career insight scaling.
*   **🔥 GitHub-Style Activity Heatmap**: Tracks your daily learning streaks. Every complete Pomodoro block or aced quiz instantly lights up your 30-day consistency grid!
*   **⏱️ Deep Focus Pomodoro Engine**: Stop switching tabs to study. Select a generated roadmap task natively from your dashboard, start a 25-minute Deep Focus timer, and when it finishes, the app mathematically crosses off your task and pushes the update to the cloud.
*   **🗂️ Cloud-Synced Developer Scratchpad**: A responsive glassmorphic Markdown-esque IDE. Instead of jumping to Notion, type your notes directly in the browser—SERS watches your keystrokes and silently auto-saves payloads to Firebase every 1.5 seconds.
*   **🎮 Daily Knowledge Quizzes**: Interactive, multi-category knowledge challenges matching your specific study track. Guess correctly to watch Confetti explode, earn permanent `XP`, and paint your Heatmap green!
*   **☁️ Leapfrog Cloud Auth**: Fully powered by Google Firebase `Firestore`. The moment you log in via Google, the application bypasses the form state, physically pulls your saved schema, and seamlessly hydrates your personalized dashboard.

## 📸 Interface Sneak Peek

<div align="center">
  <details open>
    <summary><code>1. The Homepage</code></summary>
    <br>
    <img src="./src/assets/homepage.png" alt="SERS Homepage" width="800"/>
    <p><i>The landing perspective showcasing premium UI.</i></p>
  </details>
  <br>
  
  <details open>
    <summary><code>2. Profile Setup Engine</code></summary>
    <br>
    <img src="./src/assets/setup.png" alt="Profile Setup Form" width="800"/>
    <p><i>Dynamic logic form mapping user intent to AI generation.</i></p>
  </details>
  <br>

  <details open>
    <summary><code>3. Gamified Dashboard</code></summary>
    <br>
    <img src="./src/assets/dashboard.png" alt="SERS Dashboard" width="800"/>
    <p><i>The active learning environment showing the Pomodoro, Heatmap, and live Quizzes!</i></p>
  </details>
</div>

## 💻 Tech Stack

*   **Frontend**: React (Vite Pipeline), Vanilla CSS (Glassmorphism & Custom Keyframe Gradients)
*   **Backend / BaaS**: Firebase Authentication (Google Provider), Firebase Cloud Firestore (NoSQL)
*   **State Management**: Complex hierarchical `useEffect` React Hooks
*   **Export Engines**: Client-side native Blob API for `.PDF` generation.

## 🚀 Quick Start Local Setup

Want to run the SERS ecosystem on your local machine? It takes less than 3 minutes.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/SERS.git
   cd SERS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   Create a `.env.local` file in the root directory and securely paste your Firebase configuration keys:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
   *Make sure you have enabled Google Authentication and a Test-Mode Firestore Database in your Firebase Console!*

4. **Spin up the magical dev server:**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema 

This project utilizes a completely customized `NoSQL` schema structure utilizing Firestore's `setDoc({ merge: true })` philosophy to allow decoupled scaling.

```json
{
  "userRoadmaps": {
    "USER_UUID_1234": {
       "userData": { "interest": "Programming", "goal": "Job" },
       "completedTaskIds": ["0-0", "0-1", "1-0"],
       "notes": "React uses a virtual DOM...",
       "xp": 140,
       "activityLog": {
          "2024-10-14": 1,
          "2024-10-15": 3
       }
    }
  }
}
```

## 📂 Architecture & Folder Structure

This project uses a highly modular architecture for clean component separation and logic decoupling:

```text
SERS-main/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Showcase screenshots and UI graphics
│   ├── components/
│   │   ├── layout/         # Standard wrappers (Header, Container)
│   │   ├── screens/        # Primary App Views (Auth, Home, Form, Result)
│   │   └── ui/             # Isolated Micro-components (Heatmap, MiniQuiz, Cards)
│   ├── config/             # Environment & Firebase initialization logic
│   ├── data/               # Native datasets (Course arrays, Quiz banks)
│   ├── hooks/              # Custom React Hooks (usePomodoro timing logic)
│   ├── styles/             # Global variables and CSS mappings
│   ├── utils/              # Application logic engines (AI Recommender, PDF Generator)
│   ├── App.jsx             # Complex Global State Machine & Leaf Router
│   └── main.jsx            # React root DOM injector
├── .env.local              # Local Firebase environment variables (ignored by Git)
├── package.json            # Project manifest & NPM dependencies
└── README.md               # You are here!
```
