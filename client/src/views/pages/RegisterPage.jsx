import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "../../register.css";

const RegisterPage = () => {
    return ( 
        <div>
          {/* Navbar */}
          <NavBar />
          <main id="registerMain">
            <section id="enterInfo">
              <h1 id="registerText">Register</h1>
              <p id="enterInfoText">Enter your information below:</p>

              <label for="name">Full Name:</label>
              <input type="text" id="name" name="name" required></input><br></br>

              <label for="username">Username:</label>
              <input type="text" id="username" name="name" required></input><br></br>

              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required></input><br></br>

              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required></input><br></br>
            </section>
            <section id="additionalInfo">
              <h2>Additional Information</h2>

              <label for="DoB">Date of Birth:</label>
              <input type="date" id="DoB" name="DoB" required></input><br></br>

              <label for="gender">Gender:</label>
              <select name="gender" id="gender" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="Other">Other</option>
                <option value="PNTS">Prefer not to say</option>
              </select><br></br>

              <label for="height">Height (cm):</label>
              <input type="number" id="height" name="height" required></input><br></br>

              <label for="weight">Weight (Kg):</label>
              <input type="number" id="weight" name="weight" required></input><br></br>

              <label for="goalWeight">Goal Weight (Kg) (optional):</label>
              <input type="number" id="goalWeight" name="goalWeight"></input><br></br>

              <button id="continueButton">Continue</button>
            </section>
          </main>
          {/* Footer */}
          <Footer />
        </div>
      );
  };
  
export default RegisterPage;