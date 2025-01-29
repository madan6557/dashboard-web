import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Layout from "./container/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Gunakan useNavigate dari react-router-dom

  const checkAuthStatus = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/landing"); // Redirect ke landing jika tidak ada token
    }
  };

  useEffect(() => {
    checkAuthStatus(); // Cek status saat pertama kali aplikasi dimuat
  }, [navigate]);

  return isAuthenticated ? <Layout /> : <LandingPage />;
};

export default App;