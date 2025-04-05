import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupController } from "../../authController/authController";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import "../../register.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    realname: "",
    username: "",
    email: "",
    password: "",
    dob: "",
    gender: "male",
    height: "",
    weight: "",
    goalWeight: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    dispatch(signupController(formData, navigate));
  };

  return (
    <div>
      <Banner />
      <form onSubmit={handleSubmit}>
        <main id="registerMain">
          {/* LEFT COLUMN */}
          <section id="enterInfo">
            <h1 id="registerText">Register</h1>
            <p id="enterInfoText">Enter your information below:</p>

            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="realname"
              value={formData.realname}
              onChange={handleChange}
              required
            /><br />

            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            /><br />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            /><br />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            /><br />
          </section>

          {/* RIGHT COLUMN */}
          <section id="additionalInfo">
            <h2>Additional Information</h2>

            <label htmlFor="DoB">Date of Birth:</label>
            <input
              type="date"
              id="DoB"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            /><br />

            <label htmlFor="gender">Gender:</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="Other">Other</option>
              <option value="PNTS">Prefer not to say</option>
            </select><br />

            <label htmlFor="height">Height (cm):</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            /><br />

            <label htmlFor="weight">Weight (Kg):</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            /><br />

            <label htmlFor="goalWeight">Goal Weight (Kg) (optional):</label>
            <input
              type="number"
              id="goalWeight"
              name="goalWeight"
              value={formData.goalWeight}
              onChange={handleChange}
            /><br />

            <button id="continueButton" type="submit">Continue</button>
            <div className="sign-in-link">
        <p>
          Already got an account?{" "}
          <a href="/login">Sign in here!</a>
        </p>
      </div>
          </section>
          {/* Link to the login page */}
        </main>
      </form>
      <Footer />
    </div>
  );
};

export default RegisterPage;
