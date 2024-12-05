import "./App.css";
import LoginPage from "./Component/LoginPage";
import ProfilePage from "./Component/ProfilePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VerifyOtp from "./Component/VerifyOtp";
import ChangePassword from "./Component/ChangePassword";
import ForgotPassword from "./Component/ForgotPassword";
import RegisterPage from "./Component/RegisterPage";
import UpdateProfilePage from "./Component/UpdateProfilePage";
import AdminLogin from "./Component/AdminLogin";
import AdminProfilePage from "./Component/AdminProfilePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/Adminlogin" element={<AdminLogin></AdminLogin>}/>
          <Route path="/AdminProfilePage" element={<AdminProfilePage></AdminProfilePage>}/> 
          <Route path="/VerifyOtp/:email" element={<VerifyOtp />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/forgot-password/:email" element={<ForgotPassword />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/update-profile" element={<UpdateProfilePage></UpdateProfilePage>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
