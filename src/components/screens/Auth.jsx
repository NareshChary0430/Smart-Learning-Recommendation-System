import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './Auth.css';

const Auth = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      // App.jsx will automatically detect auth state change and unmount this.
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/popup-closed-by-user') {
         setError('Sign-in cancelled. Please try again.');
      } else {
         setError('Failed to authenticate with Google. Please check your configuration.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-split-grid flex-row lg:flex-row">
        
        {/* LEFT PANEL: Value Proposition */}
        <div className="auth-info-panel">
          <h1 className="auth-hero-title">Architect your career trajectory with AI.</h1>
          <p className="auth-hero-subtitle">
            SERS transforms your learning goals into execution-driven, highly structured study roadmaps built by advanced models.
          </p>
          
          <div className="auth-features">
            <div className="auth-feature-item">
              <div className="feature-icon-wrapper">🧠</div>
              <div className="feature-text">
                <h4>Generative AI Roadmaps</h4>
                <p>Personalized workflows that mimic expectations from Ex-FAANG hiring managers.</p>
              </div>
            </div>
            
            <div className="auth-feature-item">
              <div className="feature-icon-wrapper">⏱️</div>
              <div className="feature-text">
                <h4>Deep Focus Pomodoro</h4>
                <p>Execute tasks with integrated focal timers that natively update your progress.</p>
              </div>
            </div>

            <div className="auth-feature-item">
              <div className="feature-icon-wrapper">💾</div>
              <div className="feature-text">
                <h4>Persistent Cloud Sync</h4>
                <p>Your notes, timeline progression, and XP are securely anchored in the cloud.</p>
              </div>
            </div>
          </div>

          <div className="tech-badge-container">
            <span className="tech-badge">
              ⚡ Powered by Gemini 2.5
            </span>
            <span className="tech-badge">
              🛡️ Secured by Firebase
            </span>
          </div>
        </div>

        {/* RIGHT PANEL: Authentication */}
        <div className="auth-action-panel">
          <div className="auth-login-card">
            
            <h2 className="login-heading">Welcome to SERS</h2>
            <p className="login-subheading">Sign in securely to access your dashboard.</p>

            {error && <div className="auth-error-toast">{error}</div>}

            <button 
              onClick={handleGoogleSignIn} 
              className="google-auth-btn" 
              disabled={loading} 
            >
              <svg className="google-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.81 15.73 17.58V20.35H19.3C21.39 18.43 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.46 22.02 19.3 20.35L15.73 17.58C14.74 18.25 13.48 18.64 12 18.64C9.13 18.64 6.7 16.7 5.84 14.1H2.15V16.96C3.96 20.57 7.7 23 12 23Z" fill="#34A853"/>
                <path d="M5.84 14.11C5.62 13.44 5.5 12.74 5.5 12.01C5.5 11.28 5.62 10.58 5.84 9.91V7.05H2.15C1.41 8.53 1 10.22 1 12.01C1 13.8 1.41 15.49 2.15 16.97L5.84 14.11Z" fill="#FBBC05"/>
                <path d="M12 5.38C13.62 5.38 15.07 5.94 16.22 6.99L19.4 3.82C17.46 2.01 14.97 1 12 1C7.7 1 3.96 3.43 2.15 7.05L5.84 9.91C6.7 7.32 9.13 5.38 12 5.38Z" fill="#EA4335"/>
              </svg>
              {loading ? 'Authenticating...' : 'Continue with Google'}
            </button>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;
