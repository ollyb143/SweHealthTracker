import React from "react";
import NavBar from "../../components/NavBar";
import '../../login.css'

const LoginPage = () => {
    return ( 
        <div>
        {/* Just left the navbar here to navigate through pages */}
          {/* Navbar */}
          <NavBar />
          <main id="loginMain">
            <section id="welcomeSection">
              <h1 id="welcome">WELCOME</h1>
              <p>Welcome to your Health Tracker App</p><br></br>
              <p>Where you can track your health and fitness progress all in one place.</p>
            </section>
            <section id="logInSection">
              <h1 id="signIn">Sign In</h1><br></br>
              <p id="signUpText">If you do not have an account already you can </p><a href="/register">Sign Up here.</a><br></br>
              <input type="text" class="signInInput" id="username" name="username"></input>
              <input type="text" class="signInInput" id="password" name="password"></input>
              <button id="signInButton">Sign in</button>
            </section>
          </main>
        </div>
      );
  };
  
export default LoginPage;