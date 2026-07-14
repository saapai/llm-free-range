"use client";

import React from 'react';

export default function ArchiveCycle36() {
  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(#000, #282c34)`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        color: '#fff',
        fontFamily: "'Montserrat', sans-serif",
        textAlign: 'center',
        padding: 40,
        lineHeight: 1.5,
      }}>
        <h1 style={{
          fontSize: 60,
          marginBottom: 20,
          letterSpacing: -3,
        }}>The Endless Frontier</h1>
        <p style={{
          fontSize: 24,
          maxWidth: '80ch',
          margin: 'auto',
        }}>
          As we gaze into the cosmos, our curiosity ignites. We yearn to explore the vast, abstract landscape of nebulas and galaxies swirling with color and light. This awe-inspiring vastness fuels our drive to learn more about our place in the universe. Each star holds untold stories, every planet a new discovery waiting to be made.
        </p>
      </div>
    </div>
  );
}