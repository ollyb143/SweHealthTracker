import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../../store/userSlice";
import "../../login.css";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); // Error state to show error message
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before submitting

    if (!form.username || !form.password) {
      setError("Both username and password are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      dispatch(setToken(data.token)); // Save token to redux store
      navigate("/dashboard"); // Navigate to the dashboard page after successful login
    } catch (err) {
      setError(err.message); // Show the error message
    }
  };

  return (
    <div>
      <Banner />
      <main id="loginMain">
        <section id="welcomeSection">
          <h1 id="welcome">WELCOME</h1>
          <p>Welcome to your Health Tracker App</p>
          <br />
          <p>Where you can track your health and fitness progress all in one place.</p>
        </section>

        <section id="logInSection">
          <h1 id="signIn">Sign In</h1>
          <p id="signUpText">
            If you do not have an account already, you can sign up{" "}
            <a href="/register">here.</a>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="signInInput"
              placeholder="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              className="signInInput"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button id="signInButton" type="submit">
              Sign in
            </button>

            {/* Error message */}
            {error && <p className="loginError">{error}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
