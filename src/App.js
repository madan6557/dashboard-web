import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Layout from "./container/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Gunakan useNavigate dari react-router-dom

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
    checkAuthStatus(); // Cek status saat pertama kali aplikasi dimuat
    // eslint-disable-next-line
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/*" element={isAuthenticated ? <Layout /> : <LandingPage />} />
      </Routes>
    </>
  );
};

export default App;