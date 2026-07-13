"use client";

'use strict';

export default () => (
  <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
    <header style={{backgroundColor: '#2E3A5C', color: '#F4EFE6', padding: '1em', textAlign: 'center'}}>
      <h1 style={{fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)', fontFamily: 'Cormorant Garamond, Georgia, serif', lineHeight: 1.92}}>Unraveling the Threads of Knowledge</h1>
    </header>
    <main style={{flexGrow: 1, backgroundColor: '#F4EFE6', padding: '3em'}}>
      <div style={{maxWidth: '44rem', margin: '0 auto'}}>
        <p style={{fontSize: '18px', fontFamily: 'Cormorant Garamond, Georgia, serif', lineHeight: 1.92}}>
          The entrance to the labyrinth looms large before you, its ancient stone walls etched with cryptic symbols that whisper of a forgotten past. As you step into the maze, the air around you seems charged with mystery and anticipation, as if each twist and turn holds secrets waiting to be uncovered.
        </p>
        <p style={{fontSize: '18px', fontFamily: 'Cormorant Garamond, Georgia, serif', lineHeight: 1.92}}>
          With each new passage you traverse, fragments of knowledge begin to emerge from the shadows — ancient texts filled with arcane wisdom, forgotten relics that hint at long-lost civilizations, and whispered legends that speak of powerful beings who shaped the very fabric of reality. As these disparate threads of understanding intertwine, a rich tapestry begins to take shape, revealing a world whose depths are as vast and intricate as the labyrinth itself.
        </p>
      </div>
    </main>
  </div>
);