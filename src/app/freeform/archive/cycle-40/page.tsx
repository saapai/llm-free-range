"use client";

import React from 'react';

const GalacticThreads = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#243965' }}>
      <header style={{ display: 'flex', justifyContent: 'center', paddingTop: '5rem' }}>
        <h1 style={{ fontSize: '4.8rem', color: '#faeaec', letterSpacing: '-0.1rem', marginBottom: 0, textShadow: '-3px -3px #9B2A4C, 3px 3px #F6755D' }}>Galactic Threads of Knowledge</h1>
      </header>
      
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8rem' }}>
        <svg width="90%" height="300px">
          {/* Create SVG lines and circles to represent cosmic web and nodes */}
        </svg>
      </div>
      
      <footer style={{ display: 'flex', justifyContent: 'center', paddingTop: '5rem', color: '#9B2A4C' }}>
        <p>In the vast expanse of the cosmos, we seek understanding through a complex web of knowledge. Each strand glows with the colors of the universe, illuminating our pursuit to comprehend existence.</p>
      </footer>
    </div>
  );
};

export default GalacticThreads;