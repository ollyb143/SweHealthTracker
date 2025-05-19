import { useState } from "react";

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
        setMessage("Password reset successfully!");
        setStep(1);
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
      <h2>Forgot Password</h2>

      {step === 1 &&(
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <button type="submit">Send Reset Link</button>
        </form> )}



        {step === 2 &&(
        <form onSubmit={handleVerifyCode}>
          <input
            type="text"
            placeholder="Enter your verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button type="submit">submit</button>
        </form>
      )}


        {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">confirm</button>
        </form>)}

        


        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

    



    </div>
  );
};

export default ForgotPasswordPage;