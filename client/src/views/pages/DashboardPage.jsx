import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const DashboardPage = () => {
  return ( 
    <div>
      {/* Navbar */}
      <NavBar />
        <main>

          <section id="dashboardHeader">
            <h1>Your Dashboard</h1>
            <p>Welcome! This is where you can track your progress for the day.</p>
          </section>

          <section id="exerciseSection">
            <h2>Track your exercise for the day:</h2>
            <ul id="exerciseList">
              <li>*Exercise 1*</li>
              <li>*Exercise 2*</li>
              <li>*Exercise 3*</li>
            </ul>
          </section>

          <section id="dietSection">
            <h2>Track your diet:</h2>
            <h3>Breakfast:</h3>
            
          </section>
        </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardPage;
