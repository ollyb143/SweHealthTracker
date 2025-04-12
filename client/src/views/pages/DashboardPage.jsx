import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar";
import { logout } from "../../../store/userSlice";


const DashboardPage = () => {
  const [exercises, setExercises] = useState([]);
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <div>
      <Navbar />
      <header>
        <h1>Your Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
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
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
