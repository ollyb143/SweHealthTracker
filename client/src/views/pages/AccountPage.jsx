import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import GradientContainer from "../../components/Gradient";
import Card from "../../components/Card";
import "../../userdetails.css";

const AccountPage = () => {
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

  if (!profile) return null;

  return (
    <div className="details-container">
      <GradientContainer>
        <h1>Your Account</h1>
      </GradientContainer>

      <section className="details">
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p>Change your password</p>
      </section>
    </div>
  );
};

export default AccountPage;
