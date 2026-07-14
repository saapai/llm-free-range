"use client";

import { useState } from 'react';

function WhispersOfTime() {
  const [time, setTime] = useState(new Date());

  // Update time every second
  setTimeout(() => setTime(new Date()), 1000);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: `radial-gradient(circle at center, #573D8A, #2B6CDB)`,
    }}>
       <div style={{
        textAlign: 'center',
        fontFamily: '"Montserrat", sans-serif',
        color: '#fff',
      }}>
         <h1>Whispers of Time</h1>
          <p style={{marginBottom: 30}}>A surreal depiction of a clock tower, set against a vibrant sky filled with swirling colors. The hands of the clock stretch into infinity, representing the endless possibilities and potential of time.</p>
          <svg width="1200" height="650">
            <defs>
              {/* Define gradient for the sky */}
              <linearGradient id="sky-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#8FBCBA' }} />
                <stop offset="100%" style={{ stopColor: '#FF475D' }} />
              </linearGradient>
            </defs>
             {/* Draw the clock tower and figures */}
           </svg>
      </div>
    </div>
  );
}

export default WhispersOfTime;