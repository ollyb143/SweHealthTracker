import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import GradientContainer from "../../components/Gradient";
import Buttoncomponent from "../../components/Buttoncomponent";
import "../../userinfo.css";


const UserInfoPage = () => {
  const token = useSelector(state => state.user.token);
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({
    realname: "",
    gender: "",
    height: "",
    weight: "",
    goalWeight: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!res.ok) return;
  
        const data = await res.json();
        setProfile(data);
  
        setEditableProfile({
          realname: data.realname || "",
          gender: data.gender || "",
          height: data.height ?? "",
          weight: data.weight ?? "",
          goalWeight: data.goalWeight ?? "",
          username: data.username || "",
          email: data.email || "",
        });
  
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
  
    if (token) fetchProfile();
  }, [token]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`[Frontend] Updating field ${name} to:`, value);
  
    if (name === 'height' || name === 'weight' || name === 'goalWeight') {
      setEditableProfile((prev) => ({
        ...prev,
        [name]: value ? Number(value) : '',
      }));
    } else {
      setEditableProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };


  const saveProfile = async () => {
    if (!editableProfile) {
      console.error("[Frontend] No profile data available to save.");
      return;
    }
  
    console.log("[Frontend] Attempting to send profile data:", editableProfile);
  
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editableProfile),
      });
  
      console.log("[Frontend] Server response status:", res.status);
  
      const contentType = res.headers.get("Content-Type");
      if (!res.ok) {
        console.warn("[Frontend] Server responded with error status:", res.status);
        const errorText = await res.text(); 
        console.warn("[Frontend] Raw server error response:", errorText);
        return;
      }
  
      if (contentType && contentType.includes("application/json")) {
        const updatedProfile = await res.json();
        console.log("[Frontend] Successfully updated profile:", updatedProfile);
        setProfile(updatedProfile);
        setIsEditing(false); 
      } else {
        console.warn("[Frontend] Server returned non-JSON response");
      }
    } catch (err) {
      console.error("[Frontend] Network or parsing error:", err);
    }
  };
  
  
  
  
  

  if (!profile) {
    return (
      <div>
        <Navbar />
        <Card className="you-card">
          <GradientContainer>
            <h1>All About You</h1>
            <p style={{ textAlign: "center" }}>Loading...</p>
          </GradientContainer>
        </Card>
        <Footer />
      </div>
    );
  }
 
  return (
    <div>
      <Navbar />
      <Card className="you-card">
        <GradientContainer>
          <h1>All About You</h1>
          <div className="tab-button-container">
            <Buttoncomponent
              variant="secondary"
              className={`tab-button ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}
            >
              Your Account
            </Buttoncomponent>

            <Buttoncomponent
            variant="secondary"
              className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
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
                <div>
                  <div className="profile-row">
                    <label>Username</label>{" "}
                    <input
                      className="input-field"
                      name="username"
                      value={editableProfile.username || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="profile-row">
                    <label>Email</label>{" "}
                    <input
                      className="input-field"
                      name="email"
                      value={editableProfile.email || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="profile-row">
                    <label>Username</label> {profile.username}
                  </p>
                  <p className="profile-row">
                    <label>Email</label> {profile.email}
                  </p>
                </div>
              )}
            </div>
          )}

         
          {activeTab === "profile" && (
            <div className="details">
              <h2>Profile Information</h2>
              {isEditing ? (
                <div>
                  <div className="profile-row">
                    <label>Name</label>{" "}
                    <input
                      className="input-field"
                      name="realname"
                      value={editableProfile.realname || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="profile-row">
                    <label>Gender</label>{" "}
                    <select
                      className="input-field"
                      name="gender"
                      value={editableProfile.gender || ""}
                      onChange={handleChange}
                      required
                    >
                      
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>

                  </div>

                  <div className="profile-row">
                    <label>Height</label>{" "}
                    <input
                      className="input-field"
                      name="height"
                      value={editableProfile.height || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="profile-row">
                    <label>Weight</label>{" "}
                    <input
                      className="input-field"
                      name="weight"
                      value={editableProfile.weight || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="profile-row">
                    <label>Goal Weight</label>{" "}
                    <input
                      className="input-field"
                      name="goalWeight"
                      value={editableProfile.goalWeight || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : (
                <div>
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
                    <label>Goal Weight</label> {profile.goalWeight} kg
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="input-row">
          <Buttoncomponent className="edit-button" onClick={isEditing ? saveProfile : toggleEdit}>
            {isEditing ? "Save" : "Edit"}
          </Buttoncomponent>
        </div>
      </Card>
      <Footer />
    </div>
  );
};

export default UserInfoPage;
