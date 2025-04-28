import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import GradientContainer from "../../components/Gradient";
import "../../profile.css";


const ProfilePage = () => {
  const token = useSelector(state => state.user.token);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('http://localhost:3000/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setProfile(data);
    };
    fetchProfile();
  }, [token]);

  return (
    <div>
      <Navbar />
      <h1>Your Profile</h1>
      {profile ? (
        <div className="profilecontainer">
          <GradientContainer><h2>Your Profile</h2></GradientContainer>
          <div className="profilecard">
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Real Name:</strong> {profile.realname}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Date of Birth:</strong> {new Date(profile.dob).toLocaleDateString()}</p>
            <p><strong>Height:</strong> {profile.height} cm</p>
            <p><strong>Weight:</strong> {profile.weight} kg</p>
            <p><strong>Goal Weight:</strong> {profile.goalWeight} kg</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </div>
  );  
};
export default ProfilePage;
