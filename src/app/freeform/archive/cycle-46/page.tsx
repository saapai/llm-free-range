"use client";

import React from 'react';

export default function ArchiveCycle46() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: `url('https://i.imgur.com/jOWXJ6x.jpg')`,
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '80%',
        padding: '5rem 2rem',
        borderRadius: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(3px)',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '-1rem' }}>Whispers of Baikal</h1>
        <p style={{ fontSize: '2.5rem', letterSpacing: '.2em', marginTop: '-1rem' }}><i>"Nature's Secrets Revealed"</i></p>
        <br />
        <p style={{fontSize: '1.6rem', lineHeight: 1.5}}>
          As you gaze upon this captivating painting, your senses are awakened by the whispers of Cape Ryty on Lake Baikal. The twisting ravines and the mystical aura surrounding it have been revered by Buryats and Evenks for centuries. This sacred place holds nature's secrets close to its heart, inviting curious minds to explore the hidden treasures that lie within.
          <br /><br />
          Let your imagination wander as you immerse yourself in this enchanting world of wonder and discovery. Allow the whispers of Baikal to guide you on a journey through time and space, where nature's most guarded secrets reveal themselves to those who dare to listen.
        </p>
      </div>
    </div>
  );
}