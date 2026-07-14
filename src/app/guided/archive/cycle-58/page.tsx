"use client";

import React from 'react';

const GalacticOdyssey = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#2E3A5C' }}>
      <header>
        <h1 style={{ fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)', color: '#F4EFE6', marginBottom: '0.8em', textAlign: 'center' }}>Galactic Odyssey</h1>
        <p style={{ fontSize: '1.1rem', color: '#EDE5D5', lineHeight: 1.92, maxWidth: '44rem', margin: '0 auto', paddingBottom: '3em' }}>
          {`Venturing into the vast cosmic ocean, we embark on a journey of celestial exploration. As ethereal astronauts, we traverse through swirling galaxies and glowing nebulae, transcending our earthly existence. The universe unveils its infinite wonders before us, inviting us to delve deeper into the mysteries of creation. Let your curiosity guide you on this galactic odyssey, where every moment holds the promise of discovery and awe.`}
        </p>
      </header>
      <main>
        {/* Add visual components here */}
      </main>
    </div>
  );
};

export default GalacticOdyssey;