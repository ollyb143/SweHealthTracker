import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import '../../create_goals.css';
import { useSelector } from "react-redux";

const GoalsPage = () => {
  const [goalName, setGoalName] = useState("");
  const [goalType, setGoalType] = useState(""); // walking, cycling, etc.
  const [targetType, setTargetType] = useState("time"); // reps, distance, time
  const [targetValue, setTargetValue] = useState("");
  const [deadline, setDeadline] = useState("");
  const [groupID, setGroupID] = useState(""); // NEW

  const [groups, setGroups] = useState([]); // NEW

  const token = useSelector((state) => state.user.token);

  // ✅ Fetch user's groups on mount
  useEffect(() => {
    const getGroups = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/group/getGroups", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setGroups(data);
        } else {
          alert(data.error || "Failed to load groups.");
        }
      } catch (err) {
        console.error("Failed to fetch groups:", err);
        alert("Server error.");
      }
    };

    getGroups();
  }, [token]);

  const handleActivityClick = (type) => {
    setGoalType(type);
  };

  const handleCreateGoal = async () => {
    if (!goalName || !goalType || !targetValue || !deadline || !groupID) {
      alert("Please fill out all fields, including group.");
      return;
    }

    const goalData = {
      goalName,
      goalType,
      targetType,
      targetValue,
      deadline,
      groupID
    };

    const res = await fetch('http://localhost:3000/api/goal/createGoal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(goalData)
    });

    const data = await res.json();
    if (res.ok) {
      alert("Goal created successfully!");
      setGoalName("");
      setGoalType("");
      setTargetType("time");
      setTargetValue("");
      setDeadline("");
      setGroupID("");
    } else {
      alert(data.error || "Failed to create goal.");
    }
  };

  const activityOptions = ["Walking", "Cycling", "Running", "Pilates", "Swimming", "Climbing"];

  return (
    <div>
      <NavBar />

      <div className="create-goal">
        <h1>Create a Goal</h1>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="goal-name">Goal Name:</label>
            <input
              type="text"
              id="goal-name"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="Enter a goal name..."
            />
          </div>

          <div className="form-group">
            <label>Goal Type</label>
            <div className="activity-buttons">
              {activityOptions.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={goalType === type ? "selected" : ""}
                  onClick={() => handleActivityClick(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Goal Target</label>
            <div className="goal-target">
              <select
                value={targetType}
                onChange={(e) => setTargetType(e.target.value)}
              >
                <option value="reps">Reps</option>
                <option value="distance">Distance</option>
                <option value="time">Time</option>
              </select>
              <input
                type="text"
                placeholder="Enter target..."
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Goal Deadline</label>
            <div className="goal-deadline">
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Assign to Group</label>
            <select
              value={groupID}
              onChange={(e) => setGroupID(e.target.value)}
            >
              <option value="">Select a group...</option>
              {groups.map((group) => (
                <option key={group.groupID} value={group.groupID}>
                  {group.groupName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="submit-button" onClick={handleCreateGoal}>
          Create Goal
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default GoalsPage;
