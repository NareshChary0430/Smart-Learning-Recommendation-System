import React from 'react';
import './Card.css';

const Card = ({ children, className = '', animate = true }) => {
  return (
    <div className={`card ${animate ? 'card-anim' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
