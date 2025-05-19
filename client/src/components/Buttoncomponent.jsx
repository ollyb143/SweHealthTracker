import React from 'react';
import '../buttoncomponent.css';

const Buttoncomponent = ({
    children,
    variant = "primary",
    className = "",
    onClick,
    type = "button",
  }) => {
    return (
      <button
        className={`buttoncomponent ${variant} ${className}`}
        onClick={onClick}
        type={type}
    
      >
        {children}
      </button>
    );
  };
  

export default Buttoncomponent;