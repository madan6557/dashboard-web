import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import navigate hook
import Layout from './container/Layout/Layout';
import LandingPage from './pages/LandingPage/LandingPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();  // Hook untuk navigasi programatik

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      setIsAuthenticated(true);
      if (window.location.pathname === '/landing' || window.location.pathname === '/') {
        navigate('/dashboard'); // Redirect ke /dashboard jika token valid
      }
    } else {
      setIsAuthenticated(false);
        navigate('/landing'); // Redirect ke /landing jika token tidak ada
    }
  }, [navigate]);

  // Render berdasarkan path
  if (!isAuthenticated) {
    return <LandingPage />;
  } else {
    return <Layout />;
  }
};

export default App;
