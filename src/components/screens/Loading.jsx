import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Container from '../layout/Container';
import './Loading.css';

const Loading = ({ onComplete }) => {
  const [status, setStatus] = useState("Analyzing profile...");
  
  useEffect(() => {
    const statuses = [
      "Analyzing profile...",
      "Matching skills...",
      "Generating roadmap...",
      "Finalizing recommendations..."
    ];
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < statuses.length) {
        setStatus(statuses[currentIndex]);
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 1500);
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <Container className="fade-in">
      <div className="text-center mt-8">
        <h1 className="section-title">AI Engine at Work</h1>
        <p className="section-subtitle">Our engine is processing millions of data points to find your perfect path.</p>
        
        <div className="loading-card-wrapper">
          <Card className="loading-card" animate={false}>
            <div className="ai-spinner">
              <div className="spinner-inner"></div>
              <div className="spinner-pulse"></div>
            </div>
            <h2 className="loading-status-text">{status}</h2>
            <div className="status-indicator">
              <div className="status-dot active"></div>
              <div className="status-dot active"></div>
              <div className="status-dot active"></div>
              <div className="status-dot"></div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Loading;
