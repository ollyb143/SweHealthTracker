import React from "react";
import '../../landing.css'
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";

const LandingPage = () => {
  return ( 
    <div>
      {/* Navbar */}
      <Banner />
      <main className="landingPage">
        <section id="landingText">
          <h1 id="headline">Keep track of your progress.</h1>
          <p>Welcome to the Health Tracker Application<br></br></p>
          <p>Where you can track your health and fitness progress all in one place. You can log your diet, exercise and more, setting goals creating a better version of yourself. </p>
        </section>
        <section id="landingButtons">
          <button id="registerNowButton" onClick={() => window.location.href = '/register'}>Register Now</button>
          <p>OR</p>
          <button id="loginButton" onClick={() => window.location.href = '/login'}>Sign in</button>
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;