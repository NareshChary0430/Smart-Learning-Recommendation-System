import React, { useEffect } from 'react';
import './Splash.css';

const Splash = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-logo">🚀</div>
        <h1 className="splash-title">SERS</h1>
        <p className="splash-text">Smart E-Learning Recommendation System</p>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
