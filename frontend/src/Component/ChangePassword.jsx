import React, { useState } from "react";
import api from "../api";
import "./CSS/Auth.css";

export default function ChangePassword() {
  const [formData, setFormData] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/change-password", formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Old Password</label>
            <input type="password" onChange={handleOnChange} name="oldPassword" required />
          </div>
          <div className="input-group">
            <label>New Password</label>
            <input type="password" onChange={handleOnChange} name="newPassword" required />
          </div>
          <button className="auth-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
