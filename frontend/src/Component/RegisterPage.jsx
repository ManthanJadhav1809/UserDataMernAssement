import React, { useState } from "react";
import api from "../api";
import "./CSS/Auth.css";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [userData, setUserData] = useState({});

  const navigate=useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/register", userData);
      alert(res.data.message);
      navigate(`/VerifyOtp/${userData.email}`)
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
      <div id="loginBox">
      <Link to={"/RegisterPage"}>Register</Link>
      <Link to={"/"}>Login</Link>       
      </div>
        <form>
          <div className="input-group">
            <label>First Name</label>
            <input type="text" onChange={handleOnChange} name="firstName" required />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input type="text" onChange={handleOnChange} name="lastName" required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" onChange={handleOnChange} name="email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" onChange={handleOnChange} name="password" required />
          </div>
          <button onClick={handleSubmit} className="auth-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
