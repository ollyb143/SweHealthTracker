import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Card from "../../components/Card"
import "../../excercisePage.css";

const ExercisePage = () => {
  const token = useSelector((state) => state.user.token);
  const [exercise, setExercise] = useState({ 
    exerciseType: '', 
    duration: '', 
    distance: '', 
    caloriesBurned: '', 
    entryDate: '' 
  });

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:3000/api/exercise/logExercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(exercise)
    });

    const data = await res.json();
    if (res.ok) alert('Exercise logged');
    else alert(data.error);
  };

  return (
    <div>
      {/* Navbar */}
      <NavBar />
      
      <Card className="container">
        <div className="header">
          <h1>Log Exercise</h1>
          <p>Welcome! This is where you can log your exercise for the day</p>
        </div>

        <div className="excerise-form">
          <div className="data-time">
            <label>Date:</label>
            <input
              type="date"
              value={exercise.entryDate}
              onChange={(e) => setExercise({ ...exercise, entryDate: e.target.value })}
            />
          </div>

          <div className="excercise-type">
            <label>Exercise Type:</label>
            <div className="buttons">
              <button className="type-btn" onClick={() => setExercise({ ...exercise, exerciseType: "walking" })}>Walking</button>
              <button className="type-btn" onClick={() => setExercise({ ...exercise, exerciseType: "cycling" })}>Cycling</button>
              <button className="type-btn" onClick={() => setExercise({ ...exercise, exerciseType: "swimming" })}>Swimming</button>
              <button className="type-btn" onClick={() => setExercise({ ...exercise, exerciseType: "running" })}>Running</button>
              <button className="type-btn" onClick={() => setExercise({ ...exercise, exerciseType: "pilates" })}>Pilates</button>
              <button className="type-btn" onClick={() => setExercise({ ...exercise, exerciseType: "climbing" })}>Climbing</button>
            </div>
          </div>

          <input
            type="number"
            id="length-input"
            value={exercise.duration}
            placeholder="Enter duration in minutes"
            onChange={(e) => setExercise({ ...exercise, duration: e.target.value })}
          />

          <input
            type="number"
            placeholder="Distance (km)"
            value={exercise.distance}
            onChange={(e) => setExercise({ ...exercise, distance: e.target.value })}
          />

          <input
            type="number"
            placeholder="Calories Burned"
            value={exercise.caloriesBurned}
            onChange={(e) => setExercise({ ...exercise, caloriesBurned: e.target.value })}
          />

          <button id="log-btn" onClick={handleSubmit}>Log Exercise</button>
        </div>
      </Card>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ExercisePage;
