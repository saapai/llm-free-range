"use client";

typescript
import React from 'react';

const GalacticWhispers = () => {
  return (
    <div style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}}>
      <div style={{position: 'relative', width: '80%', maxWidth: '1200px'}}>
        <div style={{color: '#fff', fontSize: '36px', lineHeight: 1.5, marginBottom: '40px'}}>
          In the infinite expanse of the cosmos, whispers echo through the void, carrying ancient secrets and profound truths. As we gaze upon the swirling galaxies that stretch beyond our comprehension, we are filled with a sense of wonder and humility. The universe is not silent; it speaks to us in whispers that reverberate throughout eternity.
        </div>
        <audio src="./galactic-whispers.mp3" autoPlay loop style={{position: 'absolute', top: 0, left: 0}} />
      </div>
    </div>
  );
};

export default GalacticWhispers;