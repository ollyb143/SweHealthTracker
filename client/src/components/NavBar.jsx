import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/userSlice"; 
import "../navbar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // 1) Tell the server to clear the session cookie
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    // 2) Clear Redux / localStorage
    dispatch(logoutUser());
    localStorage.removeItem("appUser");

    // 3) Redirect to login (or "/" if you prefer)
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">HealthTracker</Link>

        {/* Desktop Menu */}
        <ul className="nav-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/fooddrink">Food & Drink</Link></li>
          <li><Link to="/exercise">Exercise</Link></li>
          <li><Link to="/goals">Goals</Link></li>
          <li><Link to="/groups">Groups</Link></li>
          <li><Link to="/aboutyou">Profile</Link></li>
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="nav-menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="nav-mobile-menu">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/fooddrink">Food & Drink</Link></li>
          <li><Link to="/exercise">Exercise</Link></li>
          <li><Link to="/goals">Goals</Link></li>
          <li><Link to="/groups">Groups</Link></li>
          <li><Link to="/aboutyou">Profile</Link></li>
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
