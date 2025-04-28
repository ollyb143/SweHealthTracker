import React from 'react';
import '../gradient.css'; 

const GradientContainer = ({ children }) => {
  return (
    <div className="gradient-container">
      {children}
    </div>
  );
};

export default GradientContainer;
