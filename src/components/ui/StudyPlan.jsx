import React from 'react';
import Card from './Card';
import './StudyPlan.css';

const StudyPlan = ({ plan }) => {
  return (
    <div className="study-plan-container">
      <h3 className="section-header">Weekly Study Plan</h3>
      <div className="study-grid">
        {plan.map((week, index) => (
          <Card key={index} className="week-card" animate={false}>
            <span className="week-badge">{week.week}</span>
            <h4 className="week-title">{week.title}</h4>
            <ul className="topic-list">
              {week.topics.map((topic, tidx) => (
                <li key={tidx}>{topic}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudyPlan;
