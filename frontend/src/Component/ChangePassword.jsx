import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function ChangePassword() {
  const { email } = useParams();
  const [formData, setFormData] = useState({ otp: "", newPassword: "" });
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (timeLeft === 0) {
      alert("OTP has expired. Please request a new OTP.");
      return;
    }

    try {
      const res = await api.put("/api/auth/change-password", {
        email,
        ...formData,
      });
      alert(res.data.message);
      navigate("/"); // Navigate to login page
      alert("login with email and new password");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to change password.");
    }
  };

  const handleResendOtp = async () => {
    try {
      await api.post("/api/auth/forgot-password", { email });
      alert("New OTP has been sent to your email.");
      setTimeLeft(180); // Reset timer to 3 minutes
    } catch (err) {
      alert(err.response?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h3>Change Password</h3>
        <h4>OTP has been sent to your email {email}</h4>
        <p>Time remaining: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>OTP</label>
            <input
              type="text"
              name="otp"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              onChange={handleOnChange}
              required
            />
          </div>
          <button className="auth-btn">Submit</button>
        </form>
        <button onClick={handleResendOtp} className="auth-btn" disabled={timeLeft > 0}>
          Resend OTP
        </button>
      </div>
    </div>
  );
}
