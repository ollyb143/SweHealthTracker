import { useState } from "react";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import GradientContainer from "../../components/Gradient";
import Buttoncomponent from "../../components/Buttoncomponent"
import "../../forgotpassword.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Check your email for reset instructions.");
        setStep(2);
      } else {
        setError(data.message || "Failed to send reset email.");
      }
    } catch (err) {
      setError("Network error, try again later.");
    }
  };


  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/verify-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Code verified. You may now reset your password.");
        setStep(3);
      } else {
        setError(data.message || "Invalid or expired code.");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep(4);
        setEmail("");
        setCode("");
        setNewPassword("");
      } else {
        setError(data.message || "Reset failed.");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div>
      <Banner/>
      <Card className="forgot-card">
      <GradientContainer className="forgot-title"><h1>Reset your password</h1></GradientContainer>


      {step === 1 &&(
        <form onSubmit={handleSubmit}>
            <input
            className="input-field"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <Buttoncomponent type="submit">Send code</Buttoncomponent>
        </form> )}



        {step === 2 &&(
        <form onSubmit={handleVerifyCode}>
          <input
          className="input-field"
            type="text"
            placeholder="Enter your verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Buttoncomponent type="submit">Submit</Buttoncomponent>
        </form>
      )}


        {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <input
          className="input-field"
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Buttoncomponent className="forgot-button" type="submit">Confirm</Buttoncomponent>
        </form>)}


        {step === 4 && (
          <div>
          <h3>Password successfully reset!</h3>
          <div>
            <a href="/login">Return to login</a>
          </div>
          </div>
        )}


       

        


        {message && <p >{message}</p>}
        {error && <p>{error}</p>}

        </Card>



    


    <Footer/>
    </div>
  );
};

export default ForgotPasswordPage;
