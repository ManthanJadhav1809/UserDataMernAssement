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

    if (email.length === 0) {
      alert("Email is required");
      return;
    }

   

    try {
      setDis(true);
      navigate(`/VerifyOtp/${email}`);
    } catch (err) {
      alert(err.response?.data?.error || "An error occurred");
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
