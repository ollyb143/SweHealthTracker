import React, { useState } from "react";
import "../../register.css";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import GradientContainer from "../../components/Gradient";

const RegisterPage = () => {
  const [form, setForm] = useState({
    realname: "",
    username: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    height: "",
    weight: "",
    goalWeight: "",
    bmi: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.realname ||
      !form.username ||
      !form.email ||
      !form.password ||
      !form.dob ||
      !form.gender ||
      !form.height ||
      !form.weight
    ) {
      setError("All fields except 'Goal Weight' are required.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (form.height <= 0 || form.weight <= 0) {
      setError("Height and weight must be positive values.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }
      alert("Registered successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Banner />
      <Card className="register-main">
        <section>
          <GradientContainer className="register-title">
            <h1>Register</h1>
            <p>Enter your information below.</p>
          </GradientContainer>

          <form onSubmit={handleSubmit}>
            <div className="input-grid">
              <div className="input-group">
                <label htmlFor="realname">Full Name:</label>
                <input
                  type="text"
                  name="realname"
                  className="input-field"
                  value={form.realname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username"
                  className="input-field"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="input-field"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  className="input-field"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  className="input-field"
                  value={form.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  name="gender"
                  className="input-field"
                  value={form.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="Other">Other</option>
                  <option value="PNTS">Prefer not to say</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="height">Height (cm):</label>
                <input
                  type="number"
                  name="height"
                  className="input-field"
                  value={form.height}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="weight">Weight (Kg):</label>
                <input
                  type="number"
                  name="weight"
                  className="input-field"
                  value={form.weight}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="goalWeight">Goal Weight (Kg) (optional):</label>
                <input
                  type="number"
                  name="goalWeight"
                  className="input-field"
                  value={form.goalWeight}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="continue-button">
              Continue
            </button>
          </form>
        </section>
      </Card>
      <Footer />
    </div>
  );
};

export default RegisterPage;
