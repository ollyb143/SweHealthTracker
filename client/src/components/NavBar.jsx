import React, { useState } from "react";
import "../index.css"; //css file

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <h1 className="logo">Logo</h1>

        {/* Desktop/Laptop Menu */}
        <ul className="nav-links">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/fooddrink">Food & Drink</a></li>
          <li><a href="/exercise">Exercise</a></li>
          <li><a href="/goals">Goals</a></li>
          <li><a href="/groups">Groups</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/">Logout</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="nav-menu-button" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="nav-mobile-menu">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/fooddrink">Food & Drink</a></li>
          <li><a href="/exercise">Exercise</a></li>
          <li><a href="/goals">Goals</a></li>
          <li><a href="/groups">Groups</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/">Logout</a></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
