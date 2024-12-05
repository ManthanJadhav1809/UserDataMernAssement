import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const navigate = useNavigate();
  
  const {email}=useParams();

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
      const res = await api.post("/api/auth/verify-otp", { email, otp });
      console.log(res);
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/ProfilePage");
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed.");
    }
  };


  const handleResendOtp = async () => {
    try {
      await api.post("/api/auth/resend-otp", { email });
      alert("New OTP has been sent to your email.");
      setTimeLeft(600); // Reset timer
    } catch (err) {
      alert(err.response?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h3>Verify OTP</h3>
        <h4>The OTP has been send to your email {email}</h4>
        <p>Time remaining: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
        <form>
          <div className="input-group">
            <label>OTP</label>
            <input type="text" onChange={(e) => setOtp(e.target.value)} required />
          </div>
          <button onClick={handleSubmit} disabled={timeLeft === 0}>
            Submit
          </button>
          <button onClick={handleResendOtp} disabled={timeLeft > 0}>
  Resend OTP
</button>
        </form>
      </div>
    </div>
  );
}
