// src/icons/Icon.jsx
import React from 'react';

const NoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M9 7H23C23.0555 7 23.1105 7.00226 23.1649 7.0067L7.0067 23.1649C7.00226 23.1105 7 23.0555 7 23V9C7 7.89543 7.89543 7 9 7ZM9.41422 25H23C24.1046 25 25 24.1046 25 23V9.41422L9.41422 25ZM4 9C4 6.23858 6.23858 4 9 4H23C25.7614 4 28 6.23858 28 9V23C28 25.7614 25.7614 28 23 28H9C6.23858 28 4 25.7614 4 23V9Z" fill="currentColor" />
  </svg>

);

const Chevron = ({ currentRotation }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: `rotate(${currentRotation}deg)`, // Gunakan prop untuk rotasi
      transition: "transform 0.3s ease-in-out", // Tambahkan animasi rotasi
    }}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M6.35147 8.75147C6.8201 8.28284 7.5799 8.28284 8.04853 8.75147L12 12.7029L15.9515 8.75147C16.4201 8.28284 17.1799 8.28284 17.6485 8.75147C18.1172 9.2201 18.1172 9.9799 17.6485 10.4485L12.8485 15.2485C12.3799 15.7172 11.6201 15.7172 11.1515 15.2485L6.35147 10.4485C5.88284 9.9799 5.88284 9.2201 6.35147 8.75147Z" fill="currentColor" />
  </svg>
);

const Dot = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M16 12C18.2091 12 20 13.7908 20 16C20 18.2091 18.2091 20 16 20C13.7909 20 12 18.2091 12 16C12 13.7908 13.7909 12 16 12Z" fill="currentColor" />
  </svg>

);


export { NoIcon, Chevron, Dot };
