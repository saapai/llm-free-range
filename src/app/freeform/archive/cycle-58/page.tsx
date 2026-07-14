"use client";

import React from 'react';

export default function ArchiveCycle58() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
      color: '#fff',
      fontSize: '24px',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <h1>The Unseen Visions</h1>
        <p>Celestial bodies swirl around, each with its own story waiting to be discovered.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: '#ff69b4', margin: '10px', borderRadius: '50%', width: '80px', height: '80px' }}></div>
          <div style={{ backgroundColor: '#33ccff', margin: '10px', borderRadius: '50%', width: '60px', height: '60px' }}></div>
          <div style={{ backgroundColor: '#9966ff', margin: '10px', borderRadius: '50%', width: '40px', height: '40px' }}></div>
        </div>
      </div>
    </div>
  );
}