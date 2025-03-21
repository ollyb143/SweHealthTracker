import React from "react";
import '../../landing.css'
import NavBar from "../../components/NavBar";

const LandingPage = () => {
  return ( 
    <div>
      {/* Navbar */}
      <NavBar />
      <main class="landingPage">
        <section id="landingText">
          <h1 id="headline">Keep track of your progress.</h1>
          <p>Welcome to the Health Tracker Application<br></br></p>
          <p>Where you can track your health and fitness progress all in one place. You can log your diet, exercise and more, setting goals creating a better version of yourself. Invite your friends and set group challenges.</p>
        </section>
        <section id="landingButtons">
          <button id="registerNowButton" onClick={() => window.location.href = '/register'}>Register Now</button>
          <p>OR</p>
          <button id="loginButton" onClick={() => window.location.href = '/login'}>Sign in</button>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;