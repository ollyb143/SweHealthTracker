import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../../store/userSlice";
import "../../login.css";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import GradientContainer from "../../components/Gradient";
import Card from "../../components/Card";
import Buttoncomponent from "../../components/Buttoncomponent";

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
    
        <Card className="welcome-card">
        <GradientContainer id="welcomeSection">
          <h1 id="welcome">Welcome back to Health Tracker</h1>

          <br />
          <p>Where you can track your health and fitness progress all in one place.</p>
        </GradientContainer>

        <section id="logInSection">
  
          <p id="signUpText">
            If you do not have an account already, you can sign up{" "}
            <a href="/register">here.</a>
          </p>
          


          
          <form onSubmit={handleSubmit}>
            <div className="login-row ">
            <input
              type="text"
              className="input-field"
              placeholder="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            </div>

            <div className="login-row ">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            </div>

            <Buttoncomponent variant="primary" className="edit-button" type="submit">
              Sign in
            </Buttoncomponent>

            {/* Error message */}
            {error && <p className="loginError">{error}</p>}
          </form>
        </section>
        </Card>

      <Footer />
    </div>
  );
};

export default LoginPage;
