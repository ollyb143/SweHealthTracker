import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import GradientContainer from "../../components/Gradient";
import "../../userinfo.css";

const UserInfoPage = () => {
  const token = useSelector(state => state.user.token);
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setProfile(data);

        setEditableProfile({
          realname: data.realname || "",
          gender: data.gender || "",
          height: data.height ?? "",
          weight: data.weight ?? "",
          goalWeight: data.goalWeight ?? "",
        });

      } catch (err) {
        console.error("Profile fetch failed:", err);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      
      setProfile({
        ...editableProfile,
        height: Number(editableProfile.height),
        weight: Number(editableProfile.weight),
        goalWeight: Number(editableProfile.goalWeight),
      });
    }

    setIsEditing((prev) => !prev);
  };

  if (!profile) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div>
      <Navbar />
      <Card className="you-card">
        <GradientContainer>
          <h1>All About You</h1>
          <div className="tab-button-container">
            <button
              className={`tab-button ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}
            >
              Your Account
            </button>
            <button
              className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Your Profile
            </button>
          </div>
        </GradientContainer>

        <div className="details-container">
          {activeTab === "account" && (
            <div className="details">
              <h2>Account Details</h2>
              <p><strong>Name:</strong> {profile.realname}</p>
              <p><strong>Email:</strong> {profile.email}</p>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="details">
              <h2>Profile Information</h2>
              {isEditing ? (
                <>
                  <div className="input-row">
                    <strong>Name:</strong>{" "}
                    <input
                      name="realname"
                      value={editableProfile.realname || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-row">
                    <strong>Gender:</strong>{" "}
                    <input
                      name="gender"
                      value={editableProfile.gender || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-row">
                    <strong>Height:</strong>{" "}
                    <input
                      name="height"
                      value={editableProfile.height || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-row">
                    <strong>Weight:</strong>{" "}
                    <input
                      name="weight"
                      value={editableProfile.weight || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-row">
                    <strong>Goal Weight:</strong>{" "}
                    <input
                      name="goalWeight"
                      value={editableProfile.goalWeight || ""}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p><strong>Name:</strong> {profile.realname}</p>
                  <p><strong>Gender:</strong> {profile.gender}</p>
                  <p><strong>Height:</strong> {profile.height} cm</p>
                  <p><strong>Weight:</strong> {profile.weight} kg</p>
                  <p><strong>Goal Weight:</strong> {profile.goalWeight} kg</p>
                </>
              )}
              <button className="edit-button" onClick={toggleEdit}>
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          )}
        </div>
      </Card>
      <Footer />
    </div>
  );
};

export default UserInfoPage;
