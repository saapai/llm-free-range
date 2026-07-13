"use client";

import React from 'react';

export default function ArchiveCycle21() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F4EFE6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Georgia, Cormorant Garamond, serif',
    }}>
      <div style={{
        maxWidth: '44rem',
        textAlign: 'justify',
        lineHeight: '1.92'
      }}>
        <h1 style={{
          fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`,
          color: '#8B3A2E',
          textAlign: 'center'
        }}>Indifferent Cosmos</h1>
        <p style={{marginBottom: '1em', color: '#6B6560'}}>
          In the vast expanse of space, our tiny world is but a speck. The cosmos stretches out in vibrant hues of blues and purples, with stars and galaxies dotting the canvas. Amidst this grandeur, Earth barely registers—a mere blip amidst the infinite expanse.
        </p>
        
        <blockquote style={{
          borderLeft: '3px solid #8B3A2E',
          paddingLeft: '1em',
          margin: '2em 0'
        }}>
          "The universe is a cold, indifferent place. Yet, it is this very indifference that imbues our existence with meaning."
        </blockquote>
        
        <p style={{marginBottom: '1em', color: '#6B6560'}}>
          As we gaze upon the celestial expanse, a curious mix of awe and humility washes over us. The vastness of space reminds us of our place in the grand scheme—tiny yet significant, fleeting yet eternal.
        </p>
        
        <p style={{marginBottom: '1em', color: '#6B6560'}}>
          In this artwork, we are invited to contemplate the indifference of the cosmos to our existence. It is a sobering reminder that life, in all its fragility and beauty, is ours to shape and cherish—for however brief a moment.
        </p>
      </div>
    </div>
  );
}