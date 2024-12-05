import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./CSS/ProfilePage.css";
import Navbar from "./Navbar";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.message);
        alert("Failed to load profile. Please log in again.");
        navigate("/");
      }
    }
    fetchProfile();
  }, [navigate]);

  // Delete profile
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await api.delete("/api/user/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Account deleted successfully.");
        localStorage.removeItem("token");
        navigate("/");
      } catch (err) {
        console.error("Error deleting account:", err.message);
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2>Welcome to Your Profile</h2>
        {user ? (
          <div className="profile-box">
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button
              className="btn-update"
              onClick={() => navigate("/update-profile")}
            >
              Edit Profile
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              Delete Account
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
