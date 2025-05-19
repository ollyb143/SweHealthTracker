import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Buttoncomponent from "../../components/Buttoncomponent";
import GradientContainer from "../../components/Gradient";
import "../../goalsPage.css";

const API_BASE = "http://localhost:3000/api/goal";
const GROUPS_API = "http://localhost:3000/api/group";

export default function GoalsPage() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({
    goalID: null,
    goalName: "",
    goalType: "",
    targetType: "reps",
    targetValue: "",
    deadline: "",
    groupID: ""
  });
  const [error, setError] = useState("");
  const [popupText, setPopupText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Auth check
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/check", { credentials: "include" });
        if (!res.ok) throw new Error("Unauthorized");
      } catch (_) {
        navigate("/login", { replace: true });
      }
    })();
  }, [navigate]);

  // Fetch goals
  const loadGoals = async () => {
    try {
      const res = await fetch(API_BASE, { credentials: "include" });
      if (res.status === 401) throw new Error("Session expired");
      if (!res.ok) throw new Error("Failed to fetch goals");
      setGoals(await res.json());
    } catch (err) {
      setGoals([]);
      setPopupText(err.message);
      setShowPopup(true);
    }
  };

  // Fetch groups
  const loadGroups = async () => {
    try {
      const res = await fetch(GROUPS_API, { credentials: "include" });
      if (res.status === 401) throw new Error("Session expired");
      if (!res.ok) throw new Error("Failed to fetch groups");
      setGroups(await res.json());
    } catch (err) {
      setGroups([]);
      setPopupText(err.message);
      setShowPopup(true);
    }
  };

  useEffect(() => {
    loadGoals();
    loadGroups();
  }, []);

  // Save or update goal
  const handleSaveGoal = async () => {
    setError("");
    const { goalName, goalType, targetValue, deadline } = form;
    if (!goalName || !goalType || !targetValue || !deadline) {
      return setError("Please fill all required fields.");
    }

    try {
      const method = form.goalID ? "PUT" : "POST";
      const url = form.goalID ? `${API_BASE}/${form.goalID}` : API_BASE;
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 401) throw new Error("Session expired");
      if (!res.ok) throw new Error("Failed to save goal");
      await loadGoals();
      setForm({ goalID: null, goalName: "", goalType: "", targetType: "reps", targetValue: "", deadline: "", groupID: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle completion
  const handleToggleGoalCompleted = async (goalID) => {
    try {
      const res = await fetch(`${API_BASE}/complete/${goalID}`, {
        method: "PATCH",
        credentials: "include",
      });
      if (res.status === 401) throw new Error("Session expired");
      if (!res.ok) throw new Error("Failed to toggle goal completion");
      await loadGoals();
    } catch (err) {
      setPopupText(err.message);
      setShowPopup(true);
    }
  };

  // Delete goal
  const handleDeleteGoal = async (goalID) => {
    if (!window.confirm("Delete this goal?")) return;
    try {
      const res = await fetch(`${API_BASE}/${goalID}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.status === 401) throw new Error("Session expired");
      if (!res.ok) throw new Error("Failed to delete goal");
      await loadGoals();
    } catch (err) {
      setPopupText(err.message);
      setShowPopup(true);
    }
  };

  // Edit goal
  const handleEditGoal = (goal) => {
    setForm({
      goalID: goal.goalID,
      goalName: goal.goalName,
      goalType: goal.goalType,
      targetType: goal.goalDescription,
      targetValue: goal.targetValue,
      deadline: goal.deadline.slice(0, 10),
      groupID: goal.groupID || ""
    });
  };

  const pendingGoals = goals.filter((g) => !g.goalCompleted);
  const completedGoals = goals.filter((g) => g.goalCompleted);
  const closePopup = () => setShowPopup(false);

  return (
    <div>
      <NavBar />

      <header className="dashboard-welcome">
        <h1>Your Goals</h1>
        <p>Add your goals below to keep track of your success</p>
      </header>

      <Card className="goals-container">
        <GradientContainer>
          <h1>{form.goalID ? "Edit Goal" : "Create a Goal"}</h1>
        </GradientContainer>

        {error && <p className="gf__error">{error}</p>}

        <div className="gf__form">
          <input
            type="text"
            placeholder="Goal Name"
            value={form.goalName}
            onChange={(e) => setForm({ ...form, goalName: e.target.value })}
          />

          <div className="gf__buttons activity-buttons">
            {["Walking","Cycling","Running","Pilates","Swimming","Climbing"].map((type) => (
              <button
                key={type}
                className={form.goalType === type ? "selected" : ""}
                onClick={() => setForm({ ...form, goalType: type })}
              >
                {type}
              </button>
            ))}
          </div>

          <select
            value={form.targetType}
            onChange={(e) => setForm({ ...form, targetType: e.target.value })}
          >
            <option value="reps">Reps</option>
            <option value="distance">Distance</option>
            <option value="time">Time</option>
          </select>

          <input
            type="number"
            placeholder="Target Value"
            value={form.targetValue}
            onChange={(e) => setForm({ ...form, targetValue: e.target.value })}
          />

          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />

          <select
            value={form.groupID}
            onChange={(e) => setForm({ ...form, groupID: e.target.value })}
          >
            <option value="">Assign to group…</option>
            {groups.map((g) => (
              <option key={g.groupID} value={g.groupID}>{g.groupName}</option>
            ))}
          </select>
        </div>

        <Buttoncomponent
          onClick={handleSaveGoal}
          className="gf__submit"
        >
          {form.goalID ? "Update Goal" : "Create Goal"}
        </Buttoncomponent>
      </Card>

      <Card className="goals-list">
        <GradientContainer><h1>Pending Goals</h1></GradientContainer>
        <ul>
          {pendingGoals.map((g) => (
            <li key={g.goalID}>
              <label>
                <input
                  type="checkbox"
                  checked={g.goalCompleted}
                  onChange={() => handleToggleGoalCompleted(g.goalID)}
                />
                <strong>{g.goalName}</strong> — {g.goalType} ({g.targetDescription} {g.targetValue})
              </label>
              <div>
                Deadline: {new Date(g.deadline).toLocaleDateString()}
                {g.groupID && (<><br />Group: {groups.find(x=>x.groupID===g.groupID)?.groupName}</>)}
              </div>
              <div className="goal-actions">
                <button onClick={() => handleEditGoal(g)}>✎</button>
                <button onClick={() => handleDeleteGoal(g.goalID)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="goals-list">
        <GradientContainer><h1>Completed Goals</h1></GradientContainer>
        <ul>
          {completedGoals.map((g) => (
            <li key={g.goalID}>
              <label>
                <input
                  type="checkbox"
                  checked={g.goalCompleted}
                  onChange={() => handleToggleGoalCompleted(g.goalID)}
                />
                <strong>{g.goalName}</strong> — {g.goalType}
              </label>
              <div>Completed: {new Date(g.deadline).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="goals-groups">
        <GradientContainer><h1>Your Groups</h1></GradientContainer>
        {groups.length > 0 ? (
          <ul className="groups-inline">
            {groups.map((g) => (<li key={g.groupID}>{g.groupName}</li>))}
          </ul>
        ) : (
          <p>You’re not a member of any groups yet.</p>
        )}
      </Card>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="popup-close" onClick={closePopup}>×</button>
            <p>{popupText}</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}