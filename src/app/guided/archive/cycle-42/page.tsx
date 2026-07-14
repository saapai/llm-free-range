"use client";

import React from 'react';

export default () => (
  <div style={{ minHeight: '100vh', backgroundColor: '#2E3A5C' }}>
    <header>
      <h1 style={{ fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)', color: '#F4EFE6', textAlign: 'center', marginTop: '40px' }}>Infinite Horizons</h1>
    </header>
    
    <section style={{ maxWidth: '44rem', margin: 'auto', padding: '32px 20px' }}>
      <p style={{ color: '#F4EFE6', lineHeight: '1.92', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
        In the vast expanse of space, there exists a realm beyond our comprehension - a place where dreams manifest as cosmic phenomena. Here, in this celestial tapestry, we find ourselves gazing upon the infinite horizon, captivated by the beauty and mystery that lies just beyond our reach.
      </p>
    </section>
    
    <footer style={{ textAlign: 'center', color: '#6B6560' }}>
      &copy; Celestial Dreams 2023
    </footer>
  </div>
);