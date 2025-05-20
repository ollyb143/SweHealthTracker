import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Buttoncomponent from "../../components/Buttoncomponent";
import GradientContainer from "../../components/Gradient";
import "../../groupsPage.css";

const API_BASE = "http://localhost:3000/api/group";

export default function GroupsPage() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/check", {
          credentials: "include",
        });
        if (!res.ok) throw new Error();
      } catch {
        navigate("/login", { replace: true });
      }
    })();
  }, [navigate]);

  const loadGroups = async () => {
    try {
      const res = await fetch(API_BASE, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch groups");
      setGroups(await res.json());
    } catch (e) {
      console.error("loadGroups error:", e);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    const name = groupName.trim();
    if (!name) {
      setError("Group name cannot be empty");
      return;
    }
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupName: name }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Create failed");
      }
      setGroupName("");
      await loadGroups();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleLeave = async (groupID) => {
    if (!window.confirm("Leave this group?")) return;
    try {
      const res = await fetch(`${API_BASE}/leave`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupID }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Leave failed");
      }
      await loadGroups();
    } catch (e) {
      console.error("handleLeave error:", e);
    }
  };

  return (
    <div>
      <NavBar />

      <header className="dashboard-welcome">
        <h1>Your Groups</h1>
        <p>Create groups to keep track of your progress</p>
      </header>

      <Card className="groups-container">
        <form className="create-group-form" onSubmit={handleCreate}>
          <GradientContainer><h1>Create a Group</h1></GradientContainer>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            placeholder="Group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="input-field"
          />
          <Buttoncomponent
            type="submit"
            className="gf__submit"
          >
            Create Group
          </Buttoncomponent>
        </form>
      </Card>

      <Card className="groups-container">
        <GradientContainer>
          <h1>Your Groups</h1>
        </GradientContainer>

        <ul className="groups-list">
          {groups.length > 0 ? (
            groups.map((g) => (
              <li key={g.groupID} className="goals-ul">
                <span>{g.groupName}</span>
                <Buttoncomponent
                  className="gradient"
                  onClick={() => handleLeave(g.groupID)}
                >
                  Leave
                </Buttoncomponent>
              </li>
            ))
          ) : (
            <div className="exercise-label" ><p>No groups yet.</p></div>
          )}
        </ul>
      </Card>

      <Footer />
    </div>
  );
}
