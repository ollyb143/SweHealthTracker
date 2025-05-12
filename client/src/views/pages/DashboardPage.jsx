import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar";
import Card from "../../components/Card";
import GradientContainer from "../../components/Gradient";
import Buttoncomponent from "../../components/Buttoncomponent"
import { logoutUser } from "../../../store/userSlice";
import "../../dashboard.css";


const DashboardPage = () => {
  const [exercises, setExercises] = useState([]);
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [weightInput, setWeightInput] = useState('');
  const [weightHistory, setWeightHistory] = useState([]);

  useEffect(() => {
    if (!token) {
      // Redirect to login if the user is not logged in
      navigate("/login");
    }

    // Fetch the exercises logged by the user
    const fetchExercises = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/exercise", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch exercises");
        }

        const data = await res.json();
        setExercises(data);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    };

    fetchExercises();
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  //weight stuff

  const fetchWeightHistory = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/dashboard/weightHistory', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await res.json();
  
      if (Array.isArray(data)) {
        setWeightHistory(data);
      } else {
        console.warn("Expected array but got:", data);
        setWeightHistory([]); 
      }
  
    } catch (err) {
      console.error('Error fetching weight history:', err);
      setWeightHistory([]); 
    }
  };
  
  const handleLogWeight = async () => {
    if (!weightInput) return;

    try {
      const res = await fetch('http://localhost:3000/api/dashboard/logWeight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ weight: parseFloat(weightInput) })
      });

      if (res.ok) {
        setWeightInput('');
        fetchWeightHistory(); 
      } else {
        console.warn('Failed to log weight');
      }
    } catch (err) {
      console.error('Error logging weight:', err);
    }
  };

  const handleDeleteWeight = async (weightID) => {
    try {
      const response = await fetch(`http://localhost:3000/api/dashboard/deleteWeightLog/${weightID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete weight log');
      }
  
      setWeightHistory((prevLogs) => prevLogs.filter((log) => log.weightID !== weightID));
  
      console.log('Weight log deleted successfully');
    } catch (error) {
      console.error('Error deleting weight log:', error);
      console.error('Failed to delete weight log');
    }
  };

      

 
  useEffect(() => {
    if (token) fetchWeightHistory();
  }, [token]);

  

 
  return (
    <div>
      <Navbar />
      <header>
        <h1>Your Dashboard</h1>
        <button onClick={logoutUser} className="logout-button">
          Logout
        </button>
      </header>

      <main>
        <section>
          <h2>Logged Exercises</h2>
          <table>
            <thead>
              <tr>
                <th>Exercise Type</th>
                <th>Duration (minutes)</th>
                <th>Distance (km)</th>
                <th>Calories Burned</th>
                <th>Entry Date</th>
              </tr>
            </thead>
            <tbody>
              {exercises.length === 0 ? (
                <tr>
                  <td colSpan="5">No exercises logged yet.</td>
                </tr>
              ) : (
                exercises.map((exercise) => (
                  <tr key={exercise.id}>
                    <td>{exercise.exerciseType}</td>
                    <td>{exercise.duration}</td>
                    <td>{exercise.distance}</td>
                    <td>{exercise.caloriesBurned}</td>
                    <td>{new Date(exercise.entryDate).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        <div>
          <Card className="weight-container">

          <GradientContainer className="weight-title"><h1>Weight Log</h1></GradientContainer>

          

          

            <input type="number"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  placeholder="Enter your weight (kg)"
                  className="input-field"
            />

            <Buttoncomponent onClick={handleLogWeight}>Log Weight</Buttoncomponent>
        

       
        <details className="weight-logs">
          <summary className="weight-summary">View your weight logs</summary>
        <ul className="weight-ul">
        {weightHistory.map((log, index) => (
          <li className="weight-entry" key={index}>
            
            {new Date(log.date).toLocaleDateString()} — {log.weight} kg
            <button className="weight-delete"onClick={() => handleDeleteWeight(log.weightID)}>✖</button>
          </li>
        ))}
        </ul>
        </details>

          </Card>
        </div>


      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
