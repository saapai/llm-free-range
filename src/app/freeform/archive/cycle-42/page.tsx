"use client";

import React from 'react';

export default function ArchiveCycle42() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#333', color: '#fff', padding: '2rem' }}>
        <h1>Shadows of Progression</h1>
      </header>
      
      <main style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <div style={{ backgroundColor: '#66f', padding: '2rem', color: '#000', borderRadius: '50%', width: '30vmin', height: '30vmin', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '6vmin', lineHeight: 1.2 }}>AI</h2>
        </div>
        
        <div style={{ backgroundColor: '#f66', padding: '2rem', color: '#000', borderRadius: '50%', width: '30vmin', height: '30vmin', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '6vmin', lineHeight: 1.2 }}>Tech</h2>
        </div>
      </main>
      
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '2rem' }}>
        <p>The shadows of AI and technology cast their influence over our world, shaping the landscape and leaving us to ponder the consequences.</p>
      </footer>
    </div>
  );
}