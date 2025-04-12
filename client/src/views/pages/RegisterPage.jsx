import React, { useState } from "react";
import "../../register.css";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";

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
    setError(""); // Reset error message before submitting

    // Simple client-side validation
    if (!form.realname || !form.username || !form.email || !form.password || !form.dob || !form.gender || !form.height || !form.weight) {
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
      <main id="registerMain">
        <section id="enterInfo">
          <h1 id="registerText">Register</h1>
          <p id="enterInfoText">Enter your information below:</p>

          <label htmlFor="realname">Full Name:</label>
          <input
            type="text"
            id="realname"
            name="realname"
            value={form.realname}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <br />
        </section>

        <section id="additionalInfo">
          <h2>Additional Information</h2>

          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            id="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="Other">Other</option>
            <option value="PNTS">Prefer not to say</option>
          </select>
          <br />

          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            name="height"
            value={form.height}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="weight">Weight (Kg):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="goalWeight">Goal Weight (Kg) (optional):</label>
          <input
            type="number"
            id="goalWeight"
            name="goalWeight"
            value={form.goalWeight}
            onChange={handleChange}
          />
          <br />

          {error && <p className="error">{error}</p>}

          <button id="continueButton" onClick={handleSubmit}>
            Continue
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
