import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./CSS/Auth.css";

export default function LoginPage() {
  const [userData, setUserData] = useState({});
  let navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", userData);
      localStorage.setItem("token", res.data.token);
      navigate("/ProfilePage");
      alert("Login successful");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      if (err.response?.status === 403) {
        alert("Your account is blocked. Please contact support.");
      } else {
        alert(errorMessage);
      }
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div id="loginBox">
        <Link to={"/"}>Login</Link>
        <Link to={"/RegisterPage"}>Register</Link>
        <Link to={"/Adminlogin"}>Admin Login</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" onChange={handleOnChange} name="email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" onChange={handleOnChange} name="password" required />
          </div>
          <button className="auth-btn">Submit</button>
        </form>
        <p onClick={() => navigate(`/forgot-password/${userData.email || ""}`)} className="link-text">
  Forgot Password?
</p>

      </div>
    </div>
  );
}
