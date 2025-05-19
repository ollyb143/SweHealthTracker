import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import GradientContainer from "../../components/Gradient";
import Buttoncomponent from "../../components/Buttoncomponent";
import "../../userinfo.css";

const API_BASE = "http://localhost:3000/api/profile";

export default function UserInfoPage() {
  const navigate = useNavigate();
  const token    = useSelector((s) => s.user.token);

  const [profile, setProfile]           = useState(null);
  const [editable, setEditable]         = useState({});
  const [isEditing, setIsEditing]       = useState(false);
  const [activeTab, setActiveTab]       = useState("account");
  const [error, setError]               = useState("");

  useEffect(() => {
    (async () => {
      try {
        const chk = await fetch("http://localhost:3000/api/auth/check", {
          credentials: "include",
        });
        if (!chk.ok) throw new Error();

        const res = await fetch(API_BASE, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
        setEditable({
          realname:  data.realname,
          gender:    data.gender,
          height:    data.height,
          weight:    data.weight,
          goalWeight:data.goalWeight,
          username:  data.username,
          email:     data.email,
        });
      } catch {
        navigate("/login", { replace: true });
      }
    })();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditable((p) => ({
      ...p,
      [name]: name === "height" || name === "weight" || name === "goalWeight"
        ? Number(value)
        : value,
    }));
    setError("");
  };

  const saveProfile = async () => {
    setError("");
    const { email, height, weight, goalWeight } = editable;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError("Invalid email format.");
    }
    if (weight < 20 || weight > 635) {
      return setError("Weight must be 20–635 kg.");
    }
    if (goalWeight < 20 || goalWeight > 635) {
      return setError("Goal weight must be 20–635 kg.");
    }
    if (height > 300) {
      return setError("Height must be ≤ 300 cm.");
    }

    try {
      const res = await fetch(API_BASE, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editable),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update profile");
      }
      const updated = await res.json();
      setProfile(updated);
      setIsEditing(false);
    } catch (e) {
      setError(e.message);
    }
  };


  if (!profile) {
    return (
      <div>
        <NavBar />
        <Card className="you-card">
          <GradientContainer>
            <h1>All About You</h1>
            <p style={{ textAlign: "center" }}>Loading…</p>
          </GradientContainer>
        </Card>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <Card className="you-card">
        <GradientContainer>
          <h1>All About You</h1>
          <div className="tab-button-container">
            <Buttoncomponent
              variant="secondary"
              className={activeTab === "account" ? "active" : ""}
              onClick={() => setActiveTab("account")}
            >
              Your Account
            </Buttoncomponent>
            <Buttoncomponent
              variant="secondary"
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              Your Profile
            </Buttoncomponent>
          </div>
        </GradientContainer>

        <div className="details-container">
          {activeTab === "account" && (
            <div className="details">
              {isEditing ? (
                <>
                  <div className="profile-row">
                    <label>Username</label>
                    <input
                      name="username"
                      className="input-field"
                      value={editable.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profile-row">
                    <label>Email</label>
                    <input
                      name="email"
                      className="input-field"
                      value={editable.email}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="profile-row">
                    <label>Username</label> {profile.username}
                  </p>
                  <p className="profile-row">
                    <label>Email</label> {profile.email}
                  </p>
                </>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="details">
              {isEditing ? (
                <>
                  <div className="profile-row">
                    <label>Name</label>
                    <input
                      name="realname"
                      className="input-field"
                      value={editable.realname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profile-row">
                    <label>Gender</label>
                    <select
                      name="gender"
                      className="input-field"
                      value={editable.gender}
                      onChange={handleChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                  <div className="profile-row">
                    <label>Height (cm)</label>
                    <input
                      name="height"
                      className="input-field"
                      type="number"
                      value={editable.height}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profile-row">
                    <label>Weight (kg)</label>
                    <input
                      name="weight"
                      className="input-field"
                      type="number"
                      value={editable.weight}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profile-row">
                    <label>Goal Weight (kg)</label>
                    <input
                      name="goalWeight"
                      className="input-field"
                      type="number"
                      value={editable.goalWeight}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="profile-row">
                    <label>Name</label> {profile.realname}
                  </p>
                  <p className="profile-row">
                    <label>Gender</label> {profile.gender}
                  </p>
                  <p className="profile-row">
                    <label>Height</label> {profile.height} cm
                  </p>
                  <p className="profile-row">
                    <label>Weight</label> {profile.weight} kg
                  </p>
                  <p className="profile-row">
                    <label>BMI</label> {profile.BMI?.toFixed(1) || "N/A"}
                  </p>
                  <p className="profile-row">
                    <label>Goal Weight</label> {profile.goalWeight} kg
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        <div className="input-row">
          <Buttoncomponent
            className="edit-button"
            onClick={() => (isEditing ? saveProfile() : setIsEditing(true))}
          >
            {isEditing ? "Save" : "Edit"}
          </Buttoncomponent>
          {error && <p className="error">{error}</p>}
        </div>
      </Card>

      <Footer />
    </div>
  );
}
