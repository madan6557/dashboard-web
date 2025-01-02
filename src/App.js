import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import navigate hook
import Layout from './container/Layout/Layout';
import LandingPage from './pages/LandingPage/LandingPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();  // Hook untuk navigasi programatik

  useEffect(() => {
    // localStorage.setItem('authToken', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkdW1teS11c2VyLWlkIiwidXNlcm5hbWUiOiJkdW1teXVzZXIiLCJyb2xlIjoiZXhhbXBsZSJ9.CpTj1qFhhH3G6j6HvF1zO-Pel3VfukdAW59fdbGVg9g");
    const token = localStorage.getItem('authToken');

    if (token) {
      setIsAuthenticated(true);
      if (window.location.pathname === '/landing' || window.location.pathname === '/') {
        navigate('/dashboard'); // Redirect ke /dashboard jika token valid
      }
    } else {
      setIsAuthenticated(false);
      if (window.location.pathname === '/') {
        navigate('/landing'); // Redirect ke /landing jika token tidak ada
      }
    }
  }, [navigate]);

  // Render berdasarkan path
  if (window.location.pathname === '' || !isAuthenticated) {
    return <LandingPage />;
  } else {
    return <Layout />;
  }
};

export default App;
