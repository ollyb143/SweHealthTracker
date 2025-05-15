import React from 'react';
import '../gradient.css'; 

const GradientContainer = ({ children, className = ""}) => {
  return (
    <div className={`gradient-container  ${className}`}>
      {children}
    </div>
  );
};

export default GradientContainer;
