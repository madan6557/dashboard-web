import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Menggunakan Router di sini
import { NotificationProvider } from './context/NotificationContext';
import './index.css';
import App from './App'; // Mengimport App
import reportWebVitals from './reportWebVitals';

// Menggunakan Router di luar komponen App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </Router>
);

// Untuk mengukur performa aplikasi
reportWebVitals();
