import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";


const LoginPage = () => {
    return ( 
        <div>
        {/* Just left the navbar here to navigate through pages */}
          {/* Navbar */}
          <NavBar />
          <h1>Welcome to the Login Page</h1>


          {/* Footer */}
          <Footer />
        </div>
      );
  };
  
export default LoginPage;