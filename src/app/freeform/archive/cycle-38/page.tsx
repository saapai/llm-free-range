"use client";

import { useState } from 'react';

export default function ArchiveCycle38() {
  const [showText, setShowText] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#222', color: '#fff' }}>
      {!showText && <button onClick={() => setShowText(true)}>Enter the Trail</button>}
      {showText && (
        <div style={{ maxWidth: 800, lineHeight: '1.5', textAlign: 'justify', padding: 24 }}>
          <h1 style={{ fontSize: 36, marginBottom: 16 }}>The Trail of Intrigue</h1>
          <p style={{ fontSize: 20, marginBottom: 8 }}>In a world shrouded in mystery and filled with hidden treasures, the thirst for knowledge beckons explorers down a path of intrigue.</p>
          <p style={{ fontSize: 20, marginBottom: 16 }}>As we delve deeper into this vast landscape, our curiosity drives us to uncover more secrets and unearth new threads of understanding. Each discovery fuels our hunger for knowledge, propelling us further along the trail.</p>
          <button onClick={() => setShowText(false)}>Return to Trailhead</button>
        </div>
      )}
    </div>
  );
}