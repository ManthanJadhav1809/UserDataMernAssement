import React, { useState } from "react";
import api from "../api";
import "./CSS/Auth.css";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [dis, setDis] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the email is empty
    if (email.length === 0) {
      alert("Email is required");
      return;
    }
  
    // Check if the email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
  
    try {
      setDis(true);
      const res = await api.post("/api/auth/forgot-password", { email });
      console.log(res.data);
      alert(res.data.message); // Success message
      navigate(`/change-password/${email}`); // Navigate to the OTP verification page
    } catch (err) {
      // Check for error response and message
      let errorMessage =
        err.message ;

        console.log(err);
          alert(errorMessage);
    } finally {
      setDis(false);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h3>Forgot Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={dis} className="auth-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
