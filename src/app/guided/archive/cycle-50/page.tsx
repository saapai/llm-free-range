"use client";

typescript
import React from 'react';

export default function ArchiveCycle50() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#F4EFE6'
    }}>
      <div style={{
        width: '44rem',
        padding: '2em',
        textAlign: 'justify',
        fontFamily: '"Georgia", "Cormorant Garamond", serif',
        lineHeight: 1.92,
      }}>
        <h1 style={{
          fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`,
          textTransform: 'uppercase',
          letterSpacing: '0.22em'
        }}>Indifferent Eternity</h1>
        <p style={{marginTop: '1.5em'}}>
          In the vast expanse of the cosmos, our existence is but a fleeting moment. Amidst the swirling vortex of colors and shapes, we are reminded of the grandeur of the universe, its indifference to our struggles and triumphs.
        </p>
        <p style={{marginTop: '1.5em'}}>
          As we gaze upon this endless expanse, we cannot help but feel small, insignificant even, in the face of such cosmic majesty. Yet within us lies an unquenchable curiosity, a desire to understand and explore the mysteries that surround us.
        </p>
        <h2 style={{marginTop: '3em', fontSize: `clamp(1.5rem, 0.8rem + 4vw, 2.7rem)`}}>The Cosmic Dance</h2>
        <p style={{marginTop: '1.5em'}}>
          The universe is a symphony of movement, an intricate dance of matter and energy that has been unfolding for billions of years. From the birth of stars to the collision of galaxies, every celestial event contributes to this grand ballet, shaping our understanding of existence itself.
        </p>
      </div>
    </div>
  );
}