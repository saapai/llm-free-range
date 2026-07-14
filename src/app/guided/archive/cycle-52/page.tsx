"use client";

typescript
import React from 'react';

export default function ArchiveCycle52() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#2E3A5C' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem', color: '#F4EFE6', fontSize: 'clamp(1.6rem, 0.8rem + 7vw, 3rem)' }}>
        <h1 style={{ marginRight: 'auto' }}>Indifferent Universes</h1>
        <span style={{ letterSpacing: '0.22em', fontSize: 'clamp(1.6rem, 0.8rem + 7vw, 3rem)', textTransform: 'uppercase' }}>THEME: Cosmic Expansion</span>
      </header>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', padding: '4rem 0', backgroundColor: '#E8B547' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(3.6rem, 1.9rem + 10vw, 5.4rem)' }}>The Cosmic Dance</h2>
        <p style={{ maxWidth: '44rem', margin: 'auto', lineHeight: '1.92', fontSize: 'clamp(1.6rem, 0.8rem + 7vw, 3rem)', color: '#3E4852' }}>
          In the vast expanse of the universe, galaxies swirl and collide in a cosmic dance of creation and destruction. Stars are born, live their lives, and die, leaving behind remnants that give rise to new life. The indifference of these celestial forces is both humbling and awe-inspiring, reminding us of our place in the grand scheme of existence.
        </p>
      </div>
      
      <footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', color: '#6B6560', fontSize: 'clamp(1.4rem, 0.7rem + 5vw, 3rem)' }}>
        <p>© 2022 Indifferent Universes</p>
      </footer>
    </div>
  );
}