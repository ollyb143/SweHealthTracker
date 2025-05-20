import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Buttoncomponent from "../../components/Buttoncomponent";
import GradientContainer from "../../components/Gradient";
import "../../excercisePage.css";

function startOfMonday(d) {
  const day = d.getDay();
  const diff = (day + 6) % 7;
  const m = new Date(d);
  m.setDate(d.getDate() - diff);
  m.setHours(0, 0, 0, 0);
  return m;
}
function toLocalYMD(d) {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

const API_BASE = "http://localhost:3000/api/exercise";

const ExercisePage = () => {
  const [exercise, setExercise] = useState({
    exerciseType: "",
    duration: "",
    distance: "",
    caloriesBurned: "",
    entryDate: "",
  });

  const [chartData, setChartData] = useState([]);
  const [pastLogs, setPastLogs] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState("");

  const [weekStart, setWeekStart] = useState(() => startOfMonday(new Date()));
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const fmt = (d, opts) => new Date(d).toLocaleDateString(undefined, opts);

  const weeklyData = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      const key = toLocalYMD(d);
      const found = chartData.find((c) => c.date === key);
      arr.push({ date: key, count: found ? found.count : 0 });
    }
    return arr;
  }, [weekStart, chartData]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/check", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not authenticated");
      } catch {
        navigate("/login", { replace: true });
      }
    })();
  }, [navigate]);

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const res = await fetch(`${API_BASE}/stats`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load stats");
      const stats = await res.json();
      setChartData(
        stats.map((s) => ({
          date: toLocalYMD(new Date(s.entryDate)),
          count: Number(s.count),
        }))
      );
    } catch (e) {
      console.error(e);
      setError("Could not load exercise stats.");
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch(API_BASE, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load logs");
      setPastLogs(await res.json());
    } catch (e) {
      console.error(e);
      setError("Could not load exercise logs.");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchLogs();
  }, []);

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exercise),
      });
      if (!res.ok) throw new Error(await res.text());
      alert("Exercise logged");
      setExercise({
        exerciseType: "",
        duration: "",
        distance: "",
        caloriesBurned: "",
        entryDate: "",
      });
      fetchStats();
      fetchLogs();
    } catch (e) {
      console.error(e);
      setError("Failed to log exercise: " + e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entry?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(await res.text());
      setPastLogs((logs) => logs.filter((l) => l.exerciseID !== id));
      fetchStats();
    } catch (e) {
      console.error(e);
      setError("Failed to delete entry.");
    }
  };


  const prevWeek = () =>
    setWeekStart((w) => {
      const d = new Date(w);
      d.setDate(d.getDate() - 7);
      return d;
    });
  const nextWeek = () =>
    setWeekStart((w) => {
      const d = new Date(w);
      d.setDate(d.getDate() + 7);
      return d;
    });

  const scroll = (x) => scrollRef.current?.scrollBy({ left: x, behavior: "smooth" });

  return (
    <div>
      <NavBar />

      <header className="dashboard-welcome">
        <h1>Your Exercise</h1>
        <p>Add your exercises below and view your progress in the chart</p>
      </header>

      <Card className="exercise-card">
        <GradientContainer>
          <h1>Your Exercise Diary</h1>
        </GradientContainer>
        <div className="main-content">
          {/* LEFT: Form */}
          <section className="exercise-form">
            <h2  >Log Exercise</h2>
            {error && <p className="loginError">{error}</p>}
           

            <div className="data-time">
              <div className="exercise-label"><p>Date:</p></div>
              
              <input
              className="input-field"
                type="date"
                value={exercise.entryDate}
                onChange={(e) =>
                  setExercise((ex) => ({ ...ex, entryDate: e.target.value }))
                }
              />
            </div>

            <div className="excercise-type">
              <div className="exercise-label"><label>Type:</label></div>
              <div className="meal-buttons">
                {[
                  "walking",
                  "cycling",
                  "swimming",
                  "running",
                  "pilates",
                  "climbing",
                ].map((type) => (
                  <button
                    key={type}
                    className={`meal-type-btn${exercise.exerciseType === type ? " selected" : ""
                      }`}
                    onClick={() =>
                      setExercise((ex) => ({ ...ex, exerciseType: type }))
                    }
                  >
                    {type[0].toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <input
            className="input-field"
              type="number"
              placeholder="Duration (min)"
              value={exercise.duration}
              onChange={(e) =>
                setExercise((ex) => ({ ...ex, duration: e.target.value }))
              }
            />
            <input
            className="input-field"
              type="number"
              placeholder="Distance (km)"
              value={exercise.distance}
              onChange={(e) =>
                setExercise((ex) => ({ ...ex, distance: e.target.value }))
              }
            />
            <input
            className="input-field"
              type="number"
              placeholder="Calories Burned"
              value={exercise.caloriesBurned}
              onChange={(e) =>
                setExercise((ex) => ({ ...ex, caloriesBurned: e.target.value }))
              }
            />

            <Buttoncomponent onClick={handleSubmit} className="log-exercise-btn">
              Log Exercise
            </Buttoncomponent>
          </section>

          {/* RIGHT: Weekly Chart */}
          <section className="chart-container">
            <h2>Exercise Chart</h2>
            <p className="section-subtitle">
              Scroll through to view your fitness progress
            </p>

            <div className="week-nav">
              <button className="week-btn" onClick={prevWeek}>
                &lt;
              </button>
              <span className="week-range">
                {fmt(weekStart, {
                  weekday: "short",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                {" – "}
                {fmt(new Date(weekStart.getTime() + 4 * 86400000), {
                  weekday: "short",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button className="week-btn" onClick={nextWeek}>
                &gt;
              </button>
            </div>

            <div className="responsive-chart">
              {!loadingStats ? (
                <ResponsiveContainer>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(d) =>
                        fmt(d, { weekday: "short" })
                      }
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                      labelFormatter={(d) =>
                        fmt(d, {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      }
                    />
                    <Bar
                      dataKey="count"
                      fill="#83dce2"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p>Loading chart…</p>
              )}
            </div>
          </section>
        </div>
      </Card>

      {/* Past Entries (scrollable) */}
      <Card className="exercise-card">
        <GradientContainer>
          <h2>Previously Logged Exercises</h2>
        </GradientContainer>
        <div className="exercise-label"><p>Browse your past logs (newest first)</p></div>
  

        

        <div className="cards-wrapper">
          <button className="scroll-btn left" onClick={() => scroll(-300)}>
            &lt;
          </button>
          <div className="log-cards" ref={scrollRef}>
            {pastLogs.map((log) => (
              <div className="log-card" key={log.exerciseID}>
                <div className="log-details">
                  <div className="log-date">
                    {fmt(log.entryDate, {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="log-type">{log.exerciseType}</div>
                  <div className="log-duration">{log.duration} min</div>
                  <div className="log-distance">
                    {log.distance ?? "—"} km
                  </div>
                  <div className="log-calories">{log.caloriesBurned} kcal</div>
                </div>
                <button
                  className="weight-delete"
                  onClick={() => handleDelete(log.exerciseID)}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
          <button className="scroll-btn right" onClick={() => scroll(300)}>
            &gt;
          </button>
        </div>
      </Card>

      <Footer />
    </div>
  );
};

export default ExercisePage;
