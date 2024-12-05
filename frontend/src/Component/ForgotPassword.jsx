import React, { useState } from "react";
import api from "../api";
import "./CSS/Auth.css";
import { useNavigate, useParams } from "react-router-dom";

export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
 
  const navigate=useNavigate();
  const {email}=useParams()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/forgot-password", { email });
      navigate(`/VerifyOtp/${email}`)
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h3>Forgot Password</h3>
        <form >
          <div className="input-group">
            <label>Email</label>
            <input type="email"  value={email} required />
          </div>
          <button onClick={handleSubmit} className="auth-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
