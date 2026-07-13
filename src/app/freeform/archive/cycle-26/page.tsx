"use client";

import React from 'react';

const StardustDreams: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <h1 style={{ fontSize: '5rem', color: '#fff', textShadow: '0 0 20px #ffd30a, 0 0 40px #ff0000' }}>Stardust Dreams</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
        <span style={{ fontSize: '3rem', color: '#ff0000', textShadow: '0 0 10px #fff, 0 0 20px #000' }}>galaxies swirl</span>
        <span style={{ fontSize: '3rem', color: '#ffd30a', textShadow: '0 0 10px #fff, 0 0 20px #000' }}>stars dance</span>
        
        <div style={{ width: '45vw', maxWidth: '960px', padding: '2rem', backgroundColor: '#111', borderRadius: '1.5rem', boxShadow: '0 0 30px #ffd30a, inset 0 0 20px #fff' }}>
          <p style={{ fontSize: '2rem', color: '#ddd', lineHeight: '1.5', textAlign: 'justify' }}>
            In the realm of Stardust Dreams, we embark on a cosmic journey through time and space, witnessing the birth and death of stars, the collision of galaxies, and the eternal allure of our vast universe. As we drift among celestial bodies, we find solace in their beauty and ponder the mysteries that lie beyond our grasp.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StardustDreams;