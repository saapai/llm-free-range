"use client";

typescript
import { useState } from 'react';

export default function ArchiveCycle54() {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F4EFE6" }} className="relative">
      <header style={{ color: "#2E3A5C" }}>
        <h1
          style={{ fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`, margin: "0", paddingTop: "1.5rem" }}
          className="text-center uppercase letter-spacing-0_22em font-italic mb-6">
          The Infinite Canvas
        </h1>
      </header>

      <main style={{ width: "44rem", margin: "auto" }}>
        <p
          className="drop-cap pb-3 border-b border-rust"
          style={{ fontSize: "2.1rem", lineHeight: 1.92, color: "#1C1A17" }}
          onAnimationEnd={() => setIsAnimated(true)}>
          As I stand before this monumental work of art, my senses are overwhelmed by the vastness of space and the infinite possibilities it holds. The swirling galaxies and nebulae seem to dance before my eyes, beckoning me to explore the wonders of the universe. Each celestial body is a masterstroke of cosmic creation, painting a picture of the boundless expanse that lies beyond our earthly realm.
        </p>
      </main>
    </div>
  );
}