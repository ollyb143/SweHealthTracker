import React, { useContext } from "react";
import "../../userdetails.css";
import { ProfileContext } from "./UserInfoLayout";


const ProfilePage = () => {
  const profile = useContext(ProfileContext);
  
  return (



      <div className="details-container">
      <section className="details">
          <p><strong>Name:</strong> {profile.realname}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Date of Birth:</strong> {new Date(profile.dob).toLocaleDateString()}</p>
          <p><strong>Height:</strong> {profile.height} cm</p>
          <p><strong>Weight:</strong> {profile.weight} kg</p>
          <p><strong>Goal Weight:</strong> {profile.goalWeight} kg</p>
      </section>
      </div>

      

  );  
};

export default ProfilePage;
