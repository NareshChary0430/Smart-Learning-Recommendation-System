import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Container from '../layout/Container';
import SkillGap from '../ui/SkillGap';
import StudyPlan from '../ui/StudyPlan';
import CareerInsights from '../ui/CareerInsights';
import { generatePDF } from '../../utils/pdfGenerator';
import { generateCalendarICS } from '../../utils/calendarGenerator';
import { updateTaskProgress, updateUserNotes, recordActivity, updateUserXP } from '../../utils/db';
import { usePomodoro } from '../../hooks/usePomodoro';
import Heatmap from '../ui/Heatmap';
import MiniQuiz from '../ui/MiniQuiz';
import './Result.css';

const Result = ({ userId, userPhoto, userEmail, userData, recommendations, initialCompletedTasks = [], initialNotes = "", initialXP = 0, initialActivityLog = {}, onReset, onRegenerate }) => {
  const [expandedStep, setExpandedStep] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(initialCompletedTasks);
  const [showConfetti, setShowConfetti] = useState(false);
  const [focusTaskId, setFocusTaskId] = useState('');
  const [notes, setNotes] = useState(initialNotes);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [xp, setXp] = useState(initialXP);
  const [activityLog, setActivityLog] = useState(initialActivityLog);

  useEffect(() => {
    setCompletedTasks(initialCompletedTasks);
    setNotes(initialNotes || "");
    setXp(initialXP || 0);
    setActivityLog(initialActivityLog || {});
  }, [initialCompletedTasks, initialNotes, initialXP, initialActivityLog]);

  useEffect(() => {
    if (notes === initialNotes) return;
    setIsSavingNotes(true);
    const handler = setTimeout(() => {
      if (userId) {
        updateUserNotes(userId, notes).then(() => {
          setIsSavingNotes(false);
        });
      }
    }, 1500);
    return () => clearTimeout(handler);
  }, [notes, userId, initialNotes]);

  const totalTasks = recommendations.roadmapSteps.reduce((acc, step) => acc + step.tasks.length, 0);
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  useEffect(() => {
    if (progressPercent === 100 && totalTasks > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [progressPercent, totalTasks]);

  const handleToggleTask = async (taskId) => {
    const isCompleted = completedTasks.includes(taskId);
    let newTasks;
    if (isCompleted) {
      newTasks = completedTasks.filter(id => id !== taskId);
    } else {
      newTasks = [...completedTasks, taskId];
    }
    setCompletedTasks(newTasks);
    
    if (userId) {
      await updateTaskProgress(userId, newTasks);
      if (!isCompleted) {
        await recordActivity(userId);
        const tzOffset = (new Date()).getTimezoneOffset() * 60000;
        const today = (new Date(Date.now() - tzOffset)).toISOString().split('T')[0];
        setActivityLog(prev => ({ ...prev, [today]: (prev[today] || 0) + 1 }));
      }
    }
  };

  const handleQuizWin = async () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    setXp(prev => prev + 10);
    if (userId) {
      await updateUserXP(userId, 10);
      await recordActivity(userId);
      const tzOffset = (new Date()).getTimezoneOffset() * 60000;
      const today = (new Date(Date.now() - tzOffset)).toISOString().split('T')[0];
      setActivityLog(prev => ({ ...prev, [today]: (prev[today] || 0) + 1 }));
    }
  };

  const handlePomodoroComplete = () => {
    if (focusTaskId && !completedTasks.includes(focusTaskId)) {
      handleToggleTask(focusTaskId);
    }
  };

  const pomodoro = usePomodoro(25, handlePomodoroComplete);

  const uncompletedTasksList = [];
  recommendations.roadmapSteps.forEach((step, stepIndex) => {
    step.tasks.forEach((t, taskIndex) => {
      const taskId = `${stepIndex}-${taskIndex}`;
      if (!completedTasks.includes(taskId)) {
        uncompletedTasksList.push({ id: taskId, text: t });
      }
    });
  });

  useEffect(() => {
    if (uncompletedTasksList.length > 0 && (!focusTaskId || completedTasks.includes(focusTaskId))) {
      setFocusTaskId(uncompletedTasksList[0].id);
    }
  }, [uncompletedTasksList.length, completedTasks, focusTaskId]);

  const handleDownload = () => generatePDF(userData, recommendations);
  const handleCalendarSync = () => generateCalendarICS(recommendations.studyPlan, userData);

  return (
    <div className="dashboard-container">
      {/* 1. Header & Profile Banner */}
      <section className="professional-panel profile-header-card">
        <div className="profile-top-row">
          <div className="profile-identity">
            <div className="profile-avatar" style={{ overflow: 'hidden', padding: 0, border: '1px solid var(--border-muted)', background: '#fff' }}>
              <img 
                src={userPhoto || `https://api.dicebear.com/9.x/notionists/svg?seed=${userEmail || userData.name}`} 
                alt="Profile Avatar" 
                referrerPolicy="no-referrer"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div>
              <h2 className="profile-name">{userData.name}</h2>
              <span className="profile-tag">{userData.interest}</span>
            </div>
          </div>
          <div className="xp-badge">
            ⚡ {xp} XP
          </div>
        </div>

        <div className="progress-section mt-4">
          <div className="progress-header">
            <span>Overall Completion</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="actions-row mt-2">
          <Button onClick={handleCalendarSync} className="btn-professional btn-primary">Add to Calendar</Button>
          <Button onClick={handleDownload} className="btn-professional">Download PDF</Button>
          <Button onClick={onRegenerate} className="btn-professional">Regenerate Plan</Button>
          <Button onClick={onReset} className="btn-professional">Home</Button>
        </div>
      </section>

      {/* 2. Interactive Roadmap Core */}
      <section className="professional-panel">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title m-0">Roadmap Strategy</h2>
          <span className="confidence-badge m-0">AI Confidence: {recommendations.confidence}%</span>
        </div>
        <p className="section-subtitle mb-6">{recommendations.motivationalLine}</p>
        
        <div className="roadmap-grid">
          {recommendations.roadmapSteps.map((step, stepIndex) => (
            <div key={stepIndex} className={`roadmap-step-professional ${expandedStep === stepIndex ? 'expanded' : ''}`}>
              <div className="step-summary" onClick={() => setExpandedStep(expandedStep === stepIndex ? -1 : stepIndex)}>
                <div className="step-num-text">{stepIndex + 1}.</div>
                <div className="step-info-summary">
                  <h4>{step.title}</h4>
                  <p className="step-desc m-0">{step.description}</p>
                </div>
                <span className="expand-icon">{expandedStep === stepIndex ? '-' : '+'}</span>
              </div>
              
              {expandedStep === stepIndex && (
                <div className="step-details">
                  <div className="skills-tags mt-2">
                    {step.skills.map((s, si) => <span key={si} className="skill-tag">{s}</span>)}
                  </div>
                  <div className="task-checklist mt-4">
                    {step.tasks.map((t, taskIndex) => {
                      const taskId = `${stepIndex}-${taskIndex}`;
                      const isCompleted = completedTasks.includes(taskId);
                      return (
                        <div 
                          key={taskIndex} 
                          className={`task-item ${isCompleted ? 'completed' : ''}`}
                          onClick={() => handleToggleTask(taskId)}
                        >
                          <div className={`task-checkbox ${isCompleted ? 'checked' : ''}`}>
                            {isCompleted && <span className="checkmark">✔</span>}
                          </div>
                          <span className="task-text">{t}</span>
                          {focusTaskId === taskId && pomodoro.isRunning && (
                            <span className="focusing-badge ml-auto">Focusing</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Deep Focus & Tools (Pomodoro & Scratchpad) */}
      <section className="bottom-sections">
        <div className="professional-panel pomodoro-card">
          <div className="mb-4">
            <h2 className="section-title m-0 mb-2">Deep Focus Engine</h2>
            <p className="section-subtitle m-0">The selected task will auto-complete when the timer finishes.</p>
          </div>
          
          {uncompletedTasksList.length > 0 ? (
            <div className="pomodoro-controls-grid">
              <div className={`pomodoro-timer-display ${pomodoro.isRunning ? 'running' : ''}`}>
                {pomodoro.minutes}:{pomodoro.seconds}
              </div>
              <div style={{flex: 1}}>
                <select 
                  className="pomodoro-select" 
                  value={focusTaskId} 
                  onChange={(e) => setFocusTaskId(e.target.value)}
                  disabled={pomodoro.isRunning}
                >
                  <option value="" disabled>Select a task...</option>
                  {uncompletedTasksList.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.text.length > 40 ? t.text.substring(0, 40) + '...' : t.text}
                    </option>
                  ))}
                </select>
                <div className="flex gap-4">
                  {!pomodoro.isRunning && pomodoro.timeLeft > 0 && (
                    <Button onClick={pomodoro.startTimer} className="btn-professional btn-primary flex-1">Start Focus</Button>
                  )}
                  {pomodoro.isRunning && (
                    <Button onClick={pomodoro.pauseTimer} className="btn-professional flex-1">Pause Timer</Button>
                  )}
                  <button onClick={pomodoro.resetTimer} className="btn-professional" style={{background:'transparent', border:'none', textDecoration:'underline'}}>Reset</button>
                </div>
              </div>
            </div>
          ) : (
             <div className="text-muted mt-4">All structured tasks completed!</div>
          )}
        </div>

        <div className="professional-panel">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title m-0">Study Notes</h2>
            <span style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>
              {isSavingNotes ? 'Saving...' : 'Saved to Cloud'}
            </span>
          </div>
          <textarea 
            className="scratchpad-textarea"
            placeholder="Jot down commands, concepts, or code snippets here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      </section>

      {/* 4. Curriculum & Quiz */}
      <section className="professional-panel">
         <MiniQuiz questions={recommendations.quizQuestions} onCorrect={handleQuizWin} />
      </section>

      <section className="professional-panel">
        <h2 className="section-title">Recommended Courses</h2>
        <div className="course-list">
          {recommendations.courses.map((course, i) => (
            <div key={i} className="course-card-dash">
              <div className="course-provider">{course.provider}</div>
              <h4>{course.title}</h4>
              <div className="course-meta-inline mb-3">
                <span>⏱️ {course.duration}</span>
                <span className="difficulty-badge">{course.difficulty}</span>
              </div>
              <div style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight: '1.5'}}>
                <strong>Insight:</strong> {course.why}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Supporting Metrics */}
      <section className="professional-panel p-0 overflow-hidden">
        <StudyPlan plan={recommendations.studyPlan} />
      </section>

      <section className="professional-panel p-0 overflow-hidden">
        <SkillGap skills={recommendations.skillGap} />
      </section>
      
      <section className="professional-panel">
        <h2 className="section-title mb-4">Activity Heatmap</h2>
        <Heatmap activityLog={activityLog} />
      </section>

      {/* 6. External Resources & Career */}
      <section className="bottom-sections">
        <div className="professional-panel">
          <h2 className="section-title">Core Resources</h2>
          <div className="flex flex-col gap-3">
            {recommendations.resources && recommendations.resources.map((res, i) => (
              <div key={`${res.name}-${i}`} className="resource-card-professional">
                <div>
                  <strong style={{color:'var(--text-main)'}}>{res.name}</strong>
                  <div style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px'}}>{res.type}</div>
                </div>
                <a href={res.url} target="_blank" rel="noopener noreferrer">
                  <Button className="btn-professional" style={{padding: '6px 16px', fontSize: '0.85rem'}}>Visit</Button>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="professional-panel p-0 overflow-hidden">
          <CareerInsights insights={recommendations.careerInsights} />
        </div>
      </section>

    </div>
  );
};
export default Result;
