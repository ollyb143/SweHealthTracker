import { useContext } from "react";
import { ProfileContext } from "./UserInfoLayout";
import "../../userdetails.css";

const AccountPage = () => {
  const profile = useContext(ProfileContext);

  return (
   
      <div className="details-container">
        <section className="details">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p>Change your password</p>
        </section>
      </div>

  );
};

export default AccountPage;
