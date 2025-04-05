// LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginController } from "../../authController/authController";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import "../../login.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); // Error state to show the error message
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      setError("Both username and password are required.");
      return;
    }

    const result = await dispatch(loginController(credentials, navigate));

    if (!result.success) {
      setError(result.message || "Login failed");
    }
  };

  return (
    <div>
            {/* Navbar */}
            <Banner />
      <main id="loginMain">
        <section id="welcomeSection">
          <h1 id="welcome">WELCOME</h1>
          <p>Welcome to your Health Tracker App</p><br />
          <p>Where you can track your health and fitness progress all in one place.</p>
        </section>

        <section id="logInSection">
          <h1 id="signIn">Sign In</h1>
          <p id="signUpText">
            If you do not have an account already you can sign up <a href="/register">here.</a>
          </p>

          <input
            type="text"
            className="signInInput"
            placeholder="Username"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            className="signInInput"
            placeholder="Password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          <button id="signInButton" onClick={handleSubmit}>Sign in</button>

          {/* Error message */}
          {error && (
            <p className="loginError">{error}</p> // Position this underneath the button
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
