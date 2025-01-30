import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Layout from "./container/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const checkAndClearExpiredToken = () => {
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    if (tokenExpiry) {
      const now = new Date().getTime();
      if (now >= parseInt(tokenExpiry, 10)) {
        // Jika sudah melewati 00:00, hapus token
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("tokenExpiry");
        console.log("Token expired and removed.");
      }
    }
  };

  const checkAuthStatus = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      if (location.pathname !== "/reset-password") {
        navigate("/landing"); // Redirect ke landing jika tidak ada token
      }
    }
  };

  useEffect(() => {
    checkAndClearExpiredToken(); // Hapus token jika sudah expired
    checkAuthStatus(); // Lalu cek status login
    // eslint-disable-next-line
  }, [location.pathname]); // Gunakan location.pathname agar tidak terjadi infinite re-render

  return (
    <Routes>
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/*" element={isAuthenticated ? <Layout /> : <LandingPage />} />
    </Routes>
  );
};

export default App;
