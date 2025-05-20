import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import GradientContainer from "../../components/Gradient";
import Buttoncomponent from "../../components/Buttoncomponent";
import BMIWidget from "../../components/BMIScale";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { logoutUser } from "../../../store/userSlice";
import "../../dashboard.css";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State
  const [weightHistory, setWeightHistory] = useState(null);
  const [wtError, setWtError] = useState("");
  const [chartView, setChartView] = useState("all");
  const [weightInput, setWeightInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [weightFormError, setWeightFormError] = useState("");
  const [bmiRefresh, setBmiRefresh] = useState(0);
  const [popupText, setPopupText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const API_BASE = "http://localhost:3000/api";

  // Auth check on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/check`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Unauthorized");
      } catch {
        dispatch(logoutUser());
        navigate("/login", { replace: true });
      }
    })();
  }, [dispatch, navigate]);

  const handleLogout = async () => {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    handleLogout();
  };

  // Fetch weight history
  const fetchWeightHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/dashboard/weightHistory`, {
        credentials: "include",
      });
      if (res.status === 401) throw new Error("Session expired");
      if (!res.ok) throw new Error("Failed to fetch weight logs");
      setWeightHistory(await res.json());
    } catch (err) {
      setWeightHistory([]);
      setWtError(err.message);
      setPopupText(err.message);
      setShowPopup(true);
    }
  };

  useEffect(() => {
    fetchWeightHistory();
  }, []);

  // Log new weight
  const handleLogWeight = async () => {
    setWeightFormError("");
    const w = parseFloat(weightInput);
    const date = new Date(dateInput);
    if (!weightInput) return setWeightFormError("Weight is required.");
    if (date > new Date()) return setWeightFormError("Date cannot be in the future.");
    if (w <= 20 || w > 700) return setWeightFormError("Weight must be 20–700 kg.");

    try {
      const res = await fetch(`${API_BASE}/dashboard/logWeight`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight: w, date: dateInput }),
      });
      if (!res.ok) throw new Error("Failed to log weight");
      setWeightInput("");
      setDateInput("");
      await fetchWeightHistory();
      setBmiRefresh((k) => k + 1);
    } catch (err) {
      setWeightFormError(err.message);
    }
  };

  // Delete weight entry
  const handleDeleteWeight = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/dashboard/deleteWeightLog/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete weight log");
      setWeightHistory((prev) => prev.filter((entry) => entry.weightID !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Prepare chart data
  const chartData = (weightHistory || [])
    .filter((log) => {
      const d = new Date(log.date),
        now = new Date();
      if (chartView === "30days") {
        const cutoff = new Date(now);
        cutoff.setDate(now.getDate() - 30);
        return d >= cutoff;
      }
      if (chartView === "1year") {
        const cutoff = new Date(now);
        cutoff.setFullYear(now.getFullYear() - 1);
        return d >= cutoff;
      }
      return true;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((log) => ({
      date: new Date(log.date).toLocaleDateString(),
      weight: log.weight,
    }));

  return (
    <div className="dashboard-page">
      <NavBar />

      <header className="dashboard-welcome">
        <h1>Your Dashboard</h1>
        <p>Use the weight log tracker below to view your progress and BMI</p>
      </header>

      <main>
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

          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#82dce1" strokeWidth={3}/>
              </LineChart>
            </ResponsiveContainer>
          ) : wtError ? (
            <p className="error">{wtError}</p>
          ) : (
            <p className="no-data">No weight data yet.</p>
          )}

          <div className="weight-information">
            <div className="weight-logs">
              <h4>Logs</h4>

              
               <ul className="weight-ul">
                {(weightHistory || []).map((log, index) => (
                <li className="weight-entry" key={index}>
                  {new Date(log.date).toLocaleDateString()} — {log.weight} kg
                  <button className="weight-delete" onClick={() => handleDeleteWeight(log.weightID)}>✖</button>
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
              {weightFormError && <p className="error">{weightFormError}</p>}
          
            </div>
          </div>
        </Card>

        <Card className="BMI-card">
          <BMIWidget refreshKey={bmiRefresh} />
        </Card>
      </main>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="popup-close" onClick={handleClosePopup}>
              ×
            </button>
            <p>{popupText}</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
