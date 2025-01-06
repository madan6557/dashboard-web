import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Menggunakan Router di sini
import { NotificationProvider } from './context/NotificationContext';
import { DataIDProvider } from './context/SelectedIDContext';
import { SiteIDProvider } from './context/SiteIDContext';
import { DataOptionProvider } from './context/dataOptionContext';
import './index.css';
import App from './App'; // Mengimport App
import reportWebVitals from './reportWebVitals';

// Menggunakan Router di luar komponen App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <DataOptionProvider>
      <SiteIDProvider>
        <DataIDProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </DataIDProvider>
      </SiteIDProvider>
    </DataOptionProvider>
  </Router>
);

// Untuk mengukur performa aplikasi
reportWebVitals();
