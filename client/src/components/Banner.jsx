import React from "react";
import { Link } from "react-router-dom"; 
import "../banner.css"; 

const Banner = () => {
  return (
    <div className="banner">
      <Link to="/" className="logo">
        HealthTracker
      </Link>
    </div>
  );
};

export default Banner;
