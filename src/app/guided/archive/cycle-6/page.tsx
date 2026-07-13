"use client";

import React from 'react'

export default function ArchiveCycle6() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EDE5D5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
          {/* Glowing nodes and pulsating connections */}
          {[...Array(50)].map((_, i) => (
            <circle key={i} cx={Math.random() * 800} cy={Math.random() * 600} r="20" fill="#E8B547" />
          ))}
        </svg>
        {/* Abstract figure */}
        <div style={{ position: 'absolute', top: '30%', left: '50%' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 240">
            {[...Array(10)].map((_, i) => (
              <rect key={i} x={Math.random() * 80 + 50} y={Math.random() * 100 + 30} width="60" height="40" fill="#2E3A5C" />
            ))}
          </svg>
        </div>
        {/* Encrypted text */}
        <div style={{ position: 'absolute', top: '15%', left: '15%' }}>
          <h1 style={{ fontSize: clamp(2.1, 1.3 + (4.2 * 0.1), 3.9), color: '#F4EFE6', fontFamily: 'Georgia, Cormorant Garamond', letterSpacing: '-0.05em' }}>Whispers in the Data Stream</h1>
          <p style={{ fontSize: '2rem', color: '#3E4852', lineHeight: 1.92, marginTop: '2rem', maxWidth: '44rem' }}>
            The world pulses with information, a digital tapestry woven from threads of light and sound. We navigate this landscape with our thoughts, traversing the vast expanse of knowledge in moments that stretch into eternity. As we move through the network, we leave behind whispers in the data stream — echoes of our presence that linger long after we have moved on.
          </p>
        </div>
      </div>
    </div>
  )
}