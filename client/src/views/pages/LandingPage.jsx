import React from "react";
import '../../landing.css'
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import GradientContainer from "../../components/Gradient";
import Buttoncomponent from "../../components/Buttoncomponent";


const LandingPage = () => {
  return ( 
    <div className="landing-background">

      <Banner />
      
      <main className="landingPage">

        <div className="landing-header">
        <h1 id="headline">Keep track of your progress.</h1>
          <p className="tagline">Join today, and become the best version of yourself. </p>

          <section className="landing-button-sect" >
            <Buttoncomponent  variant="secondary" className="landing-button" onClick={() => window.location.href = '/register'}>Register Now</Buttoncomponent>
          
            <Buttoncomponent variant="secondary" className="landing-button" onClick={() => window.location.href = '/login'}>Sign in</Buttoncomponent>
          </section>

        </div>
      </main>
     
 
      <Footer />
    </div>
  );
};

export default LandingPage;