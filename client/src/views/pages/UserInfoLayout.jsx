import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import GradientContainer from "../../components/Gradient";
import "../../userlayout.css";

const UserInfoLayout = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <Card className="you-card">
        <GradientContainer>

          <h1>All About You</h1>
        </GradientContainer>

          <div className="link-container">
            <Link to="account" className="link-text">
              <h2>Your Account</h2>
            
            </Link>

            <Link to="profile" className="link-text">
              <h2>Your Profile</h2>
             
            </Link>
          </div>
          
        
        <Outlet />
      </Card>
      <Footer />
    </div>
  );
};

export default UserInfoLayout;
