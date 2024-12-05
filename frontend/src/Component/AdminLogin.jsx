import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/AdminLogin.css";

export default function AdminLogin() {
  const [userData, setUserData] = useState({
    email:"Admin123@gmail.com",
    password:"admin123",
  });
  
  const navigate=useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    if(userData.email === "Admin123@gmail.com" && userData.password ==="admin123"){
         navigate("/AdminProfilePage");
    }
    else{
        alert("Invalid Credential")
    }
  };

  return (
    <div className="admin-container ">
      <div className="admin-box">
        <div id="loginBox">
         <Link to={"/Adminlogin"}>Admin Login</Link>
        <Link to={"/"}>User Login</Link>
            
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" onChange={handleOnChange} name="email" value={userData.email} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" onChange={handleOnChange} name="password" value={userData.password} required />
          </div>
          <button className="auth-btn">Submit</button>
        </form>
      </div>
      <p>email:-Admin123@gmail.com password=admin123</p>
    </div>
  );
}




