import { useEffect, useState, createContext } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link} from "react-router-dom";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import GradientContainer from "../../components/Gradient";
import "../../userinfolayout.css";
import { useNavigate } from "react-router-dom";


export const ProfileContext = createContext(null);

const UserInfoLayout = () => {
  const token = useSelector(state => state.user.token);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch failed:", err);
        setError(true);
        // optionally redirect to login
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    if (token) fetchProfile();
    else setError(true);
  }, [token, navigate]);

  if (error) {
    return <p style={{ textAlign: "center" }}>Session expired. Redirecting to login...</p>;
  }

  if (!profile) return null; 

  return (
    <ProfileContext.Provider value={profile}>
      <Navbar />
      <Card className="you-card">

      <GradientContainer>
        <h1>All About You</h1>
        <div className="link-container">
            <Link to="account" className="link-text">
              <h2>Your Account</h2>
            </Link>

            <Link to="profile" className="link-text">
              <h2>Your Profile</h2>
            </Link>
          </div>
      </GradientContainer>
      
      <div className="content"><Outlet /> </div>
       
      </Card>
      <Footer />
    </ProfileContext.Provider>
  );
};

export default UserInfoLayout;
