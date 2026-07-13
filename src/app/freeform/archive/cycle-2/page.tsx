"use client";

typescript
// use client to enable react hydration
import React from 'react';

const WhispersOfInnovation: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#26273b", color: "#d8f5a2" }}>
      <title>Whispers of Innovation</title>
      <h1 style={{ fontSize: '4rem', textAlign: 'center' }}>Whispers of Innovation</h1>
      <p style={{ fontSize: '2.8rem', margin: "50px auto", maxWidth: 700, lineHeight: 1.6 }}>
        Step into a realm where the future is crafted by whispers. The cityscape before you pulsates with energy, each whisper driving technology to new heights. Holographic billboards flicker in the neon glow of sleek skyscrapers, casting an irresistible allure upon the masses below. 
        Above the bustling streets, drones swarm like bees, their propellers casting fluttering shadows that blur the line between reality and illusion. This is a world where innovation reigns supreme, constantly morphing to meet the demands of an ever-changing tomorrow. 
      </p>
    </div>
  );
};

export default WhispersOfInnovation;