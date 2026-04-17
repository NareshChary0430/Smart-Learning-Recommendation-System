import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "missing_key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "missing_domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "missing_id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "missing_bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "missing_sender",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "missing_app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
