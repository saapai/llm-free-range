"use client";

import React from 'react';

export default function ArchiveCycle16() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F4EFE6',
      color: '#1C1A17'
    }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)',
          fontFamily: 'Cormorant Garamond, Georgia',
          lineHeight: 1.92,
        }}>Orbit of Reckoning</h1>
      </header>
      
      <div style={{ maxWidth: '44rem' }}>
        <p style={{ fontSize: '18px', marginBottom: '2rem' }}>
          The industrial revolution was a period of unprecedented transformation,
          both in terms of technological advancements and societal shifts. It saw the
          birth of modern industry and laid the foundations for our current
          technologically driven world. As we stand on the precipice of another
          metamorphosis, it's essential to reflect on this past epoch of change.
        </p>
        
        <blockquote style={{
          borderLeft: '3px solid #8B3A2E',
          paddingLeft: '1rem',
          marginBottom: '2rem',
          fontStyle: 'italic'
        }}>
          "The world is but a canvas to our imagination." - Henry David Thoreau
        </blockquote>
        
        <p style={{ fontSize: '18px', marginBottom: '2rem' }}>
          This piece explores the theme of industrial metamorphosis through an
          ethereal rendering of Wayne Static, a symbol of musical transformation.
          As we navigate this ever-changing landscape, let us remember our ability to
          shape and be shaped by the world around us.
        </p>
      </div>
      
      <footer style={{ marginTop: '2rem' }}>
        &copy; {new Date().getFullYear()} Orbit of Reckoning. All rights reserved.
      </footer>
    </div>
  );
}