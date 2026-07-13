"use client";

import { useEffect } from 'react';

export default function ArchiveCycle4() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F4EFE6',
      color: '#1C1A17',
      fontFamily: 'Georgia, Cormorant Garamond, serif',
      lineHeight: 1.92,
    }}>
      <header style={{
        backgroundColor: '#3E4852',
        padding: '2rem 0',
        textAlign: 'center',
        color: '#EDE5D5'
      }}>
        <h1 style={{
          fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`,
          margin: 0
        }}>Dancing Auroras from Above</h1>
      </header>
      
      <main style={{
        maxWidth: '44rem',
        margin: '0 auto',
        padding: '2rem',
      }}>
        <p style={{ fontSize: '1.92em' }}>
          The cosmos, a vast and mysterious realm where the dancing auroras enchant the night sky. As we gaze upon these celestial displays from our earthly vantage point, we are filled with wonder and curiosity about the forces that create them. From the depths of space, the International Space Station provides us with an unparalleled view of these ethereal spectacles.
        </p>
      
        <div style={{
          position: 'relative',
          paddingTop: '75%' // Maintain aspect ratio for image replacement
        }}>
          {/* Replace the div with an actual SVG or image of auroras from space */}
          <img src="auroras-from-space.svg" alt="Auroras viewed from the International Space Station" style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            width: '100%', height: 'auto' // Maintain aspect ratio for image replacement
          }} />
        </div>
        
        <p style={{ fontSize: '1.92em' }}>
          These swirling patterns of light are the result of charged particles from the sun colliding with Earth's magnetic field, causing electrons to rain down into our atmosphere and emit their energy as visible light. This cosmic dance is a reminder of our planet's delicate connection to the rest of the universe, and how much more there is to discover beyond our home world.
        </p>
      </main>
    </div>
  );
}