"use client";

typescript
import React from 'react';

const StardustDreams: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000',
      color: '#ffffff'
    }}>
      <h1 style={{ fontSize: 48, marginBottom: 24 }}>Stardust Dreams</h1>
      <p style={{ maxWidth: 600, lineHeight: 1.5, textAlign: 'center', fontSize: 24 }}>
        As we gaze upon the vast expanse of space, a cosmic journey awaits us, one that evokes feelings of wonder and insignificance in equal measure. This artwork captures the essence of that journey, depicting a lone astronaut drifting through swirling galaxies and nebulae. It serves as a reminder of our place in the universe and the boundless potential for discovery and exploration.
      </p>
    </div>
  );
};

export default StardustDreams;