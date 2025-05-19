// src/views/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
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
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/check", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          navigate("/dashboard");
        }
      } catch {
      }
    })();
  }, [navigate]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.password) {
      setError("Both username and password are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store the token in Redux (optional, but keeps your guard logic working)
      dispatch(setToken(data.token));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Banner />

      <Card className="welcome-card">
        <GradientContainer id="welcomeSection">
          <h1 id="welcome">Welcome back to Health Tracker</h1>
          <p>Where you can track your health and fitness progress all in one place.</p>
        </GradientContainer>

        <section id="logInSection">
          <p id="signUpText">
            If you do not have an account already, you can sign up{" "}
            <a href="/register">here.</a>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="login-row">
              <input
                type="text"
                name="username"
                className="input-field"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-row">
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <Buttoncomponent variant="primary" className="edit-button" type="submit">
              Sign in
            </Buttoncomponent>

            {error && <p className="loginError">{error}</p>}
          </form>
        </section>
      </Card>

      <Footer />
    </div>
  );
};

export default LoginPage;
