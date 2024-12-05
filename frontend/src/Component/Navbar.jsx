import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Codestrup Assessment</div>
      <button className="btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
