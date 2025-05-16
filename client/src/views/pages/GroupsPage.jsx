import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import '../../create_group.css';

const GroupsPage = () => {
  const [groupName, setGroupName] = useState("");
  const [groupMember, setGroupMember] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [groups, setGroups] = useState([]);

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/group/getGroups', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setGroups(data);
        } else {
          throw new Error("Failed to get groups")
        }
      } catch (err) {
        console.error("Fetch groups error:", err);
        alert("Server error while loading groups");
      }
    };

    getGroups();
  }, [token]);

  const handleAddMember = () => {
    if (groupMember.trim() !== "") {
      setGroupMembers([...groupMembers, groupMember.trim()]);
      alert(`Added: ${groupMember}`);
      setGroupMember("");
    } else {
      alert("Please enter an email.");
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    if (!groupName) {
      alert("Please enter a group name.");
      return;
    }

    const groupData = {
      groupName,
      members: groupMembers
    };

    try {
      const res = await fetch('http://localhost:3000/api/group/createGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(groupData)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Group created successfully!");
        setGroupName("");
        setGroupMembers([]);
        setGroupMember("");

        setGroups(prev => [...prev, { groupName }]);
      } else {
        alert(data.error || "Failed to create group");
      }
    } catch (err) {
      alert("Server error. Please try again later.");
      console.error("Create Group Error:", err);
    }
  };

  return (
    <div>
      <NavBar />

      <div className="main-container">
        {/* Left Side - Create Group */}
        <div className="create-group">
          <h1>Create Group</h1>
          <form onSubmit={handleCreateGroup}>
            <label>Pick a name for your group</label><br />
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter a group name..."
            /><br />

            <label>Add people to the group</label><br />
            <div className="member-input">
              <input
                type="text"
                value={groupMember}
                onChange={(e) => setGroupMember(e.target.value)}
                placeholder="Email"
              />
              <button type="button" onClick={handleAddMember}>Add</button>
            </div>

            <ul>
              {groupMembers.map((email, idx) => (
                <li key={idx}>{email}</li>
              ))}
            </ul>

            <button type="submit" className="submit-button">Create Group</button>
          </form>
        </div>

        {/* Right Side - Your Groups */}
        <div className="your-groups">
          <h1>Your Groups</h1>
          <div className="groups-grid">
            {groups.length > 0 ? (
              groups.map((group, index) => (
                <div className="group-card" key={index}>
                  {group.groupName}
                </div>
              ))
            ) : (
              <p>No groups yet.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GroupsPage;
