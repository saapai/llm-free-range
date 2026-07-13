"use client";

import React from 'react';

export default function ArchiveCycle10() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#2E3A5C', padding: '1rem', textAlign: 'center', color: '#F4EFE6' }}>
        <h1 style={{ fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)', margin: 0 }}>Cicada's Lullaby</h1>
      </header>
      
      <main style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDE5D5' }}>
        <div style={{ width: '44rem', textAlign: 'justify', padding: '2rem' }}>
          <p>In the heart of a tranquil forest, cicadas perch on tree branches. Their melodious songs echo through the serene surroundings, filling the air with a symphony of nature.</p>
          
          <img src="https://example.com/cicada-image" alt="Cicada" style={{ float: 'left', marginRight: '1rem' }} />
          <p><strong>The Cicadas:</strong> These fascinating creatures, with their rusty hues and delicate wings, are the orchestra conductors of the forest. As they sing, the warm summer breeze carries their music far and wide.</p>
          
          <img src="https://example.com/forest-image" alt="Forest" style={{ float: 'right', marginLeft: '1rem' }} />
          <p><strong>The Forest:</strong> A vibrant ecosystem where every living being plays a part in the grand symphony of life. The rustling leaves, chirping birds, and the soft hum of insects create a harmonious atmosphere.</p>
          
          <p>As you immerse yourself in this lullaby, let the cicadas' song take you on a journey through nature's orchestra. Feel the warmth of the summer breeze and the serenity of the forest surroundings.</p>
        </div>
      </main>
      
      <footer style={{ backgroundColor: '#3E4852', padding: '1rem', textAlign: 'center', color: '#F4EFE6' }}>
        &copy; 2022 Cicada's Lullaby
      </footer>
    </div>
  );
}