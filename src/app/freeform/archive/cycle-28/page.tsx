"use client";

typescript
import React from 'react';

const GalacticOdyssey = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0923' }}>
      <div style={{ fontSize: '4rem', color: '#FED675', textAlign: 'center' }}>Galactic Odyssey</div>
      <div style={{ fontSize: '1.5rem', color: '#FFC0CB', marginTop: '2rem', textShadow: '-1px -1px 0 #FFFFFF, 1px -1px 0 #FFFFFF,-1px 1px 0 #FFFFFF, 1px 1px 0 #FFFFFF' }}>
        In the vastness of cosmic seas<br />
        I sail, an infinitesimal speck.<br /><br />
        My heart echoes with whispered dreams,<br />
        A symphony of stardust in my veins.
      </div>
      <div style={{ marginTop: '4rem', width: '80%', display: 'flex', justifyContent: 'center' }}>
        <img src="https://images.unsplash.com/photo-1539297618110-f5cfc1a89bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJhbWVyaWNhfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="Galaxy Image" style={{ borderRadius: '50%', width: '100%' }} />
      </div>
    </div>
  );
}

export default GalacticOdyssey;