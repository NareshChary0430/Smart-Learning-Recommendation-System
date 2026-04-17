/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import Button from './Button';
import './MiniQuiz.css';

const MiniQuiz = ({ questions, onCorrect }) => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (questions && questions.length > 0) {
      const q = questions[Math.floor(Math.random() * questions.length)];
      setQuestionData(q);
      setIsAnswered(false);
      setSelectedIdx(null);
    }
  }, [questions]);

  if (!questionData) return null;

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);
    
    if (idx === questionData.answer) {
      if (onCorrect) onCorrect();
    }
  };

  const nextQuestion = () => {
    if (questions && questions.length > 0) {
      const q = questions[Math.floor(Math.random() * questions.length)];
      setQuestionData(q);
      setIsAnswered(false);
      setSelectedIdx(null);
    }
  };

  return (
    <div className="miniquiz-container card-anim">
      <div className="miniquiz-header">
        <h3 className="m-0">🧠 Daily Knowledge Check</h3>
        <span className="xp-badge">+10 XP</span>
      </div>
      <p className="miniquiz-q">{questionData.question}</p>
      
      <div className="miniquiz-options">
        {questionData.options.map((opt, i) => {
          let className = "miniquiz-opt ";
          if (isAnswered) {
             if (i === questionData.answer) className += "correct";
             else if (i === selectedIdx) className += "wrong";
             else className += "faded";
          }
          
          return (
            <button 
              key={i} 
              className={className} 
              onClick={() => handleSelect(i)}
              disabled={isAnswered}
            >
              <div className="miniquiz-opt-letter">{String.fromCharCode(65 + i)}</div>
              <div className="miniquiz-opt-text">{opt}</div>
            </button>
          );
        })}
      </div>
      
      {isAnswered && (
        <div className="miniquiz-footer fade-in">
           <p className={`miniquiz-feedback ${selectedIdx === questionData.answer ? 'text-accent' : 'text-secondary'}`}>
              {selectedIdx === questionData.answer ? 'Nailed it! You earned 10 XP! 🎉' : 'Ooph, not quite. Try another one!'}
           </p>
           <Button variant="outline" onClick={nextQuestion} style={{padding: '6px 16px', fontSize: '0.85rem'}}>Next Question ⏭</Button>
        </div>
      )}
    </div>
  );
};

export default MiniQuiz;
