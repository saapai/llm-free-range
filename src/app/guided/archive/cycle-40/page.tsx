"use client";

import { useState } from 'react'

export default function ArchiveCycle40() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F4EFE6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Cormorant Garamond, Georgia, serif',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`,
            marginBottom: '0',
          }}
        >
          Whispers of Time
        </h1>
      </div>
      
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '44rem',
          width: '100%',
          paddingTop: '2.5rem',
          paddingBottom: '3rem',
        }}
      >
        <p style={{ fontSize: '1.92em' }}>
          "In the shadows of time, ancient wisdom whispers from the mountains above."
        </p>
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '2rem',
            transform: `translateY(${mousePosition.y / 10}px)`,
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div style={{ width: '2rem', height: '2rem' }}>
            {/* Insert a beautiful SVG image of the Baikushev's pine and Pirin mountains */}
          </div>
        </div>
        
        <p
          style={{ marginTop: '1.5rem', fontSize: '0.875em', letterSpacing: '0.22em', textTransform: 'uppercase' }}
        >
          The Timeless Baikushev's Pine
        </p>
        
        <p style={{ marginTop: '1rem', fontSize: '1.375em' }}>
          "A symbol of resilience, the ancient pine towers over the majestic mountains, echoing its secrets to the world below."
        </p>
      </div>
      
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        {/* Insert a beautiful SVG image of the Baikushev's pine and Pirin mountains */}
      </div>
    </div>
  )
}