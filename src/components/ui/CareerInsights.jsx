import React from 'react';
import Card from './Card';
import './CareerInsights.css';

const CareerInsights = ({ insights }) => {
  return (
    <Card className="career-insights-card">
      <h3 className="card-title">🚀 Career Insights</h3>
      <div className="insight-section">
        <div className="insight-label">Possible Job Roles</div>
        <div className="insight-value">{insights.roles}</div>
      </div>
      <div className="insight-section">
        <div className="insight-label">Estimated Salary Range</div>
        <div className="insight-value highlight">{insights.salary}</div>
      </div>
      <div className="insight-section">
        <div className="insight-label">Top Hiring Companies</div>
        <div className="insight-value">{insights.companies}</div>
      </div>
    </Card>
  );
};

export default CareerInsights;
