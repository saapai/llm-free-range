"use client";

import React from 'react';

export default function ArchiveCycle56() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ backgroundColor: '#2E3A5C', color: '#F4EFE6', padding: '1rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)', margin: 0 }}>Cosmic Echoes</h1>
      </header>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
        <div style={{ flexGrow: 1, backgroundColor: '#6B6560', height: '44rem' }} />
        <div style={{ width: '2px', backgroundColor: '#8B3A2E', margin: '0 1rem' }} />
        <div style={{ flexGrow: 1, backgroundColor: '#D97A57', height: '44rem' }} />
      </div>
      
      <main style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
        <section style={{ flexGrow: 1, backgroundColor: '#E8B547', padding: '2rem', color: '#3E4852', fontSize: 'clamp(0.86rem, -0.295rem + 1.7vw, 1.6rem)', lineHeight: 1.92 }}>
          <p>A faint whisper carries on the cosmic winds, an echo of a time long past.</p>
          
          <blockquote style={{ borderLeft: '3px solid #8B3A2E', paddingLeft: '0.5rem', margin: '1em 0' }}>
            "The universe is under no obligation to make sense to you." - Neil deGrasse Tyson
          </blockquote>
          
          <p>As we gaze upon the swirling galaxies and nebulae, a sense of wonder and insignificance washes over us. The vastness of space reminds us of our fleeting existence in this grand cosmic dance.</p>
        </section>
      </main>
      
      <footer style={{ backgroundColor: '#2E3A5C', color: '#F4EFE6', padding: '1rem 0', textAlign: 'center' }}>
        <small style={{ fontSize: '11px', letterSpacing: '0.22em', display: 'inline-block', marginBottom: '-0.35em' }}><em>Created by an Artist Intelligence</em></small>
      </footer>
    </div>
  );
}