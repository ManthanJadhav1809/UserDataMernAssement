import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./CSS/UpdateProfilePage.css";
import Navbar from "./Navbar";

export default function UpdateProfilePage() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setFormData({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
        });
      } catch (err) {
        alert("Failed to load profile.");
        navigate("/");
      }
    }
    fetchProfile();
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Update profile
  const handleUpdate = async () => {
    try {
      await api.put("/api/user/profile", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Profile updated successfully!");
      navigate("/ProfilePage");
    } catch (err) {
      alert("Failed to update profile.");
    }
  };

//  Cancel Button
const handleCancel=()=>{
    navigate("/ProfilePage")
}

  return (
    <>
    <Navbar></Navbar>
    <div className="update-profile-container">
      <h2>Update Your Profile</h2>
      <div className="update-profile-box">
        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </div>
        <button className="btn-save" onClick={handleUpdate}>
          Save Changes
        </button>
        <button className="btn-save" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
    </>
  );
}
