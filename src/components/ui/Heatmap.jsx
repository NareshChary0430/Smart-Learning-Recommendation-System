import React from 'react';
import './Heatmap.css';

const Heatmap = ({ activityLog = {} }) => {
  // Generate the last 30 days
  const days = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const tzOffset = d.getTimezoneOffset() * 60000;
    const dateStr = (new Date(d.getTime() - tzOffset)).toISOString().split('T')[0];
    days.push({
      date: dateStr,
      count: activityLog[dateStr] || 0
    });
  }

  return (
    <div className="heatmap-container">
      <h4 className="heatmap-title">🔥 30-Day Activity Graph</h4>
      <div className="heatmap-grid">
        {days.map((day) => {
          let activityClass = 'level-0';
          if (day.count === 1) activityClass = 'level-1';
          if (day.count === 2) activityClass = 'level-2';
          if (day.count >= 3) activityClass = 'level-3';
          
          return (
            <div 
              key={day.date} 
              className={`heatmap-box ${activityClass}`} 
              title={`${day.date}: ${day.count} activities`}
            ></div>
          );
        })}
      </div>
      <div className="heatmap-legend">
        <span className="small-text">Less</span>
        <div className="heatmap-box level-0"></div>
        <div className="heatmap-box level-1"></div>
        <div className="heatmap-box level-2"></div>
        <div className="heatmap-box level-3"></div>
        <span className="small-text">More</span>
      </div>
    </div>
  );
};

export default Heatmap;
