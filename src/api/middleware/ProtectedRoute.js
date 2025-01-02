import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  // Cek apakah token valid (termasuk cek expired)
  const isTokenValid = token && !isTokenExpired(token);

  if (!isTokenValid) {
    // Jika token tidak ada atau sudah kadaluwarsa, arahkan ke halaman landing
    return <Navigate to="/" replace />;
  }

  return children; // Jika token valid, lanjutkan render children
};

// Fungsi untuk memeriksa apakah token sudah kadaluwarsa
const isTokenExpired = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode bagian payload dari JWT
    const expirationTime = decoded.exp * 1000; // Waktu kadaluarsa dalam milidetik (token exp dalam detik)
    return Date.now() > expirationTime; // Periksa apakah waktu sekarang lebih besar dari waktu kadaluarsa
  } catch (error) {
    // Jika ada kesalahan dalam decoding (misalnya token rusak atau tidak valid), anggap token expired
    return true;
  }
};

export default ProtectedRoute;
