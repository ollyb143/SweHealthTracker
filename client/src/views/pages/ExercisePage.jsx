import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "../../excercisePage.css";


const ExercisePage = () => {
    return ( 
        <div>
          {/* Navbar */}
          <NavBar />
          <div class="container">
            <div class="header">
              <h1>Log Exercise</h1>
              <p>Welcome! This is where you can log your exercise for the day</p>
            </div>

            <div class="excerise-form">
              <div class="data-time">
                <label>Date:</label>
                <input type="date" id="excercise-date"></input>

                <label>Time:</label>
                <input type="time" id="excercise-time"></input>
              </div>

              <div class="excercise-type">
                <label>Excercise Type:</label>
                <div class="buttons">
                    <button class="type-btn">Walking</button>
                    <button class="type-btn">Cycling</button>
                    <button class="type-btn">Swimming</button>
                    <button class="type-btn">Running</button>
                    <button class="type-btn">Pilates</button>
                    <button class="type-btn">Climbing</button>
                </div>
                <input type="number" id="length-input" placeholder="Enter length in minutes"></input>
            </div>

            <button id="log-btn">Log Excercise</button>
            </div>
          </div>


          {/* Footer */}
          <Footer />
        </div>
      );
  };
  
export default ExercisePage;
  