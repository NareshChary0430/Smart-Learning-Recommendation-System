import React from 'react';
import './SkillGap.css';

const SkillGap = ({ skills }) => {
  return (
    <div className="skill-gap-container">
      <h3 className="section-header">Skill Gap Analysis</h3>
      <div className="skill-list">
        {skills.map((skill, index) => (
          <div key={index} className={`skill-item ${skill.status.toLowerCase().replace(' ', '-')}`}>
            <div className="skill-info">
              <span className="skill-icon">{skill.icon}</span>
              <span className="skill-name">{skill.name}</span>
            </div>
            <span className="skill-status">{skill.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillGap;
