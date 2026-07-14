"use client";

typescript
import React from 'react';

const WhispersOfTheDeep: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#18293C' }}>
      <header>
        <h1 style={{ fontSize: '5rem', color: '#FFF6DC', textShadow: '2px 4px #000000' }}>Whispers of the Deep</h1>
        <p style={{ fontSize: '3rem', color: '#E9DACB', marginBottom: '5vh' }}>A captivating scene of a glowing, bioluminescent lanternshark swimming in the dark abyss.</p>
      </header>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        {/* Replace with image or animation of lanternshark */}
        <svg viewBox="0 0 500 500">
          <circle cx="250" cy="250" r="200" fill="#1DB7E6" />
          {/* Add bioluminescent details as desired */}
        </svg>
      </div>
      
      <footer style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <p style={{ fontSize: '2rem', color: '#E9DACB', textAlign: 'center' }}>&copy; Your Name, 2023</p>
      </footer>
    </div>
  );
};

export default WhispersOfTheDeep;