"use client";

import React from 'react';

export default function ArchiveCycle21() {
  return (
    <div style={{
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '2rem',
    }}>
      <h1 style={{ fontSize: '48px' }}>Stardust Reflections</h1>
      <p style={{ fontSize: '24px', textAlign: 'center' }}>
        A swirling galaxy of colors and shapes, intertwined with elements of the cosmos. The viewer feels a sense of wonder and curiosity as they delve deeper into the intricacies of this celestial artwork. Stars twinkle in the distance, while nebulae and galaxies dance across the canvas. A feeling of exploration permeates every brushstroke, inviting the viewer to journey through the universe alongside the artist.</p>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '50%', background: '#36c29a', height: '1px' }} />
        <span style={{ margin: 'auto 2rem auto 2rem', fontSize: '48px' }}>//</span>
        <div style={{ width: '50%', background: '#bcb2f3', height: '1px' }} />
      </div>
    </div>
  );
}