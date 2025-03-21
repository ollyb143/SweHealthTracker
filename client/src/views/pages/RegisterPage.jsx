import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";


const RegisterPage = () => {
    return ( 
        <div>
          {/* Navbar */}
          <NavBar />
<<<<<<< HEAD
          <main>
            <section id="enterInfo">
              <h1 id="registerText">Register</h1>
              <p id="enterInfoText">Enter your information below:</p>

              <label for="name">Full Name:</label><br></br>
              <input type="text" id="name" name="name"></input><br></br>

              <label for="username">Username:</label><br></br>
              <input type="text" id="username" name="name"></input><br></br>

              <label for="email">Email:</label><br></br>
              <input type="email" id="email" name="email"></input><br></br>

              <label for="password">Password:</label><br></br>
              <input type="password" id="password" name="password"></input><br></br>
            </section>
            <section>
              <h2>Additional Information</h2>

              <label for="DoB">Date of Birth:</label><br></br>
              <input type="date" id="DoB" name="DoB"></input><br></br>

              <label for="gender">Gender:</label><br></br>
              <select name="gender" id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="Other">Other</option>
                <option value="PNTS">Prefer not to say</option>
              </select><br></br>

              <label for="height">Height (cm):</label><br></br>
              <input type="number" id="height" name="height"></input><br></br>

              <label for="weight">Weight (Kg):</label><br></br>
              <input type="number" id="weight" name="weight"></input><br></br>

              <label for="goalWeight">Goal Weight (Kg):</label><br></br>
              <input type="number" id="goalWeight" name="goalWeight"></input><br></br>

              <button id="continueButton">Continue</button>
            </section>
          </main>
=======
          <h1>Welcome to the Sign Up Page</h1>


          {/* Footer */}
          <Footer />
>>>>>>> e9f2ad99bdb66fbad6c24d57a64bb94e7a7f22d3
        </div>
      );
  };
  
export default RegisterPage;