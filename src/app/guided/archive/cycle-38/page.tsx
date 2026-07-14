"use client";

typescript
/* use client */
import * as React from 'react';

const CosmicExploration: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#2E3A5C',
      color: '#F4EFE6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <h1 style={{
        fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`,
        marginBottom: '1rem',
        textAlign: 'center',
      }}>The Infinite Horizon</h1>
      <div style={{
        width: '44rem',
        maxWidth: '90%',
        fontFamily: 'Georgia, Cormorant Garamond, serif',
        lineHeight: 1.92,
        textAlign: 'justify'
      }}>
        <p>As we gaze into the night sky, a profound sense of curiosity takes hold. The vast expanse of deep blues and purples, punctuated by vibrant stars twinkling against the backdrop of an ever-expanding universe, beckons us to explore.</p>
        <p>Our journey through this cosmic tapestry is one of wonder and discovery, as we seek to understand our place within this infinite horizon. Each celestial body holds a story, waiting for us to unravel its secrets.</p>
        <blockquote style={{
          borderLeft: '3px solid #8B3A2E',
          paddingLeft: '1rem',
          margin: '2rem 0'
        }}>
          "The universe is a big place. Perhaps there are other worlds, like ours, where life has flourished and evolved."
        </blockquote>
        <p>As we venture further into the cosmos, our curiosity only deepens. The unknown beckons us, urging us to press onward in search of answers that may forever change how we see ourselves and our world.</p>
      </div>
    </div>
  );
}

export default CosmicExploration;