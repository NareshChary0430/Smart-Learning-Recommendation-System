import React, { useState, useEffect } from 'react';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserRoadmap, saveUserRoadmap } from './utils/db';
import Header from './components/layout/Header';
import Splash from './components/screens/Splash';
import Home from './components/screens/Home';
import Form from './components/screens/Form';
import Loading from './components/screens/Loading';
import Result from './components/screens/Result';
import Auth from './components/screens/Auth';
import { getRecommendations } from './utils/recommender';
import './styles/global.css';

const App = () => {
  const [screen, setScreen] = useState('splash');
  const [userData, setUserData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [completedTaskIds, setCompletedTaskIds] = useState([]);
  const [initialNotes, setInitialNotes] = useState("");
  const [xp, setXp] = useState(0);
  const [activityLog, setActivityLog] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // If they have a roadmap, leapfrog to result
        const savedData = await getUserRoadmap(currentUser.uid);
        if (savedData && savedData.recommendations) {
           setUserData(savedData.userData);
           setRecommendations(savedData.recommendations);
           setCompletedTaskIds(savedData.completedTaskIds || []);
           setInitialNotes(savedData.notes || "");
           setXp(savedData.xp || 0);
           setActivityLog(savedData.activityLog || {});
           setScreen('result');
        } else {
           setScreen(prev => (prev === 'auth' || prev === 'splash') ? 'home' : prev);
        }
      } else {
        setScreen(prev => prev === 'splash' ? 'splash' : 'auth');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSplashComplete = () => {
    // Relying on effect state fallback
    if (user && recommendations) {
      setScreen('result');
    } else {
      setScreen(user ? 'home' : 'auth');
    }
  };

  const handleStart = () => {
    setScreen('form');
  };

  const handleFormSubmit = (data) => {
    setUserData(data);
    setScreen('loading');
  };

  const handleLoadingComplete = async () => {
    try {
      const results = await getRecommendations(userData.interest, userData.level, userData.goal, userData.commitment);
      setRecommendations(results);
      setCompletedTaskIds([]);
      setInitialNotes("");
      setXp(0);
      setActivityLog({});
      if (user) {
        await saveUserRoadmap(user.uid, userData, results);
      }
      setScreen('result');
    } catch (error) {
      console.error("Error generating recommendations:", error);
      alert("Failed to generate AI roadmap. Please check your Gemini API key and try again.");
      setScreen('form'); // Send them back to the form so they aren't stuck on a blank screen
    }
  };

  const handleRegenerate = async () => {
    setScreen('loading'); // Show loading screen while regenerating
    try {
      const results = await getRecommendations(userData.interest, userData.level, userData.goal, userData.commitment);
      setRecommendations(results);
      setCompletedTaskIds([]);
      setInitialNotes("");
      setXp(0);
      setActivityLog({});
      if (user) {
        await saveUserRoadmap(user.uid, userData, results);
      }
      setScreen('result');
    } catch (error) {
      console.error("Error generating recommendations:", error);
      alert("Failed to regenerate AI roadmap. Please wait a moment and try again.");
      setScreen('result'); // Fall back to existing cached recommendations if regenerate fails
    }
  };

  const handleReset = () => {
    setScreen('home');
    setUserData(null);
    setRecommendations(null);
    setCompletedTaskIds([]);
    setInitialNotes("");
    setXp(0);
    setActivityLog({});
  };

  return (
    <div className="app">
      {screen === 'splash' ? (
        <Splash onComplete={handleSplashComplete} />
      ) : (
        <>
          <Header user={user} />
          <main className="main-content">
            {screen === 'auth' && <Auth />}
            {screen === 'home' && <Home onNext={handleStart} />}
            {screen === 'form' && <Form onSubmit={handleFormSubmit} />}
            {screen === 'loading' && <Loading onComplete={handleLoadingComplete} />}
            {screen === 'result' && recommendations && (
              <Result 
                userId={user?.uid}
                userPhoto={user?.photoURL}
                userEmail={user?.email}
                userData={userData} 
                recommendations={recommendations} 
                initialCompletedTasks={completedTaskIds}
                initialNotes={initialNotes}
                initialXP={xp}
                initialActivityLog={activityLog}
                onReset={handleReset} 
                onRegenerate={handleRegenerate}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default App;
