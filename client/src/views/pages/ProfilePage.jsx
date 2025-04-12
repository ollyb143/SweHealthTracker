import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";

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
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
            <Footer />
    </div>
  );
};
export default ProfilePage;
