import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar";
import Card from "../../components/Card";
import GradientContainer from "../../components/Gradient";
import Buttoncomponent from "../../components/Buttoncomponent"
import BMIWidget from "../../components/BMIScale"
import { logoutUser } from "../../../store/userSlice";
import "../../dashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';


 
const DashboardPage = () => {
  const [exercises, setExercises] = useState([]);
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [weightInput, setWeightInput] = useState('');
  const [weightHistory, setWeightHistory] = useState([]);
  const [dateInput, setDateInput] = useState(""); 
  const [weightError, setWeightError] = useState('');
  const [bmiRefresh, setBmiRefresh] = useState(0);
  const [chartView, setchartView] = useState("all"); 

 


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


    const selectedDate = new Date(dateInput);
    const currentDate = new Date();
    const parsedWeight = parseFloat(weightInput);

    
    if (!weightInput) {
      setWeightError("Weight is required.");
      return;
    }


    if (selectedDate > currentDate) {
      setWeightError("You cannot log weight for a future date");
      return;
    }

    if (parsedWeight <= 20 || parsedWeight > 700) {
      setWeightError("Weight must be between 20 and 700 kg.");
      return;
    }

    
    

    try {
      const res = await fetch('http://localhost:3000/api/dashboard/logWeight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ weight: parseFloat(weightInput), date: dateInput })
      });

      if (res.ok) {
        setWeightInput('');
        setDateInput('');
        setWeightError('');
        fetchWeightHistory(); 
        setBmiRefresh(prev => prev + 1);



        console.log('Weight log added successfully');
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


  const now = new Date();

  const filteredWeightData = weightHistory.filter((log) => {
    const logDate = new Date(log.date);
    if (chartView === "30days") {
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
      return logDate >= thirtyDaysAgo;
    }
  
    if (chartView === "1year") {
      const oneYearAgo = new Date(now);
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      return logDate >= oneYearAgo;
    }
    return true; 
  });

  const formattedWeightData = [...filteredWeightData]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((log) => ({
      date: new Date(log.date).toLocaleDateString(),
      weight: log.weight,
    }));


  



  


  

 
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
          <Card className="weight-card">

          <GradientContainer className="weight-title"><h1>Weight Log</h1></GradientContainer>

          <div className="chart-view-selector">
            <label>View: </label>
            <select value={chartView} onChange={(e) => setchartView(e.target.value)}>
              <option value="all">All Logs</option>
              <option value="30days">Past 30 days</option>
              <option value="1year">Past Year</option>
            </select>
          </div>

          

          {formattedWeightData.length > 0 && (
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={formattedWeightData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#82dce1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          )}

          {formattedWeightData.length == 0 && (
            <div><p>No weight logs yet!</p></div>
          )}

         
        

          <div className="weight-information">
            <div className="weight-logs">
            <h4>Your weight logs</h4>

            {formattedWeightData.length == 0 && (
            <div><p>No weight logs yet!</p></div>
          )}
              
            <ul className="weight-ul">
            {weightHistory.map((log, index) => (
              <li className="weight-entry" key={index}>
                {new Date(log.date).toLocaleDateString()} — {log.weight} kg
                <button className="weight-delete"onClick={() => handleDeleteWeight(log.weightID)}>✖</button>
              </li>
            ))}
            </ul>
            </div>

            <div className="weight-logger">
            <h4 className="log-your-weight">Log your weight</h4>
              <input type="number"
                        value={weightInput}
                        onChange={(e) => setWeightInput(e.target.value)}
                        placeholder="Enter your weight (kg)"
                        className="input-field"
              />
              <input
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="input-field"
              />
            <Buttoncomponent onClick={handleLogWeight}>Log Weight</Buttoncomponent>
            {weightError && <p className="weight-error-message">{weightError}</p>}
            </div>
          </div>

          </Card>
        </div>

        <Card className="BMI-card">
        <BMIWidget  refreshKey={bmiRefresh}/>
        </Card>


      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
