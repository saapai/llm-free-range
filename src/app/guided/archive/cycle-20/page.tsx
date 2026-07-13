"use client";

import React from 'react';

export default function ArchiveCycle20() {
  return (
    <div style={{minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#F4EFE6"}}>
      <div style={{textAlign: "center", paddingBottom: "3rem"}}>
        <h1 style={{fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`, fontFamily: "'Georgia', serif", lineHeight: 1.92, marginBottom: "0"}}>
          Symphony of the Seas
        </h1>
      </div>
      
      <div style={{display: "flex", justifyContent: "center", padding: "4rem" }}>
        <div style={{maxWidth: "44rem", backgroundColor: "#EDE5D5", borderRadius: ".25rem", padding: "3rem", boxShadow: `0 1px 3px rgba(0,0,0,.2), 0 1px 2px rgba(0,0,0,.14)`, width: "60%" }}>
          <p style={{fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", lineHeight: 1.92}}>
            Under the azure skies and beyond the crystal waves, a symphony of life unfolds in the depths of the seas. Majestic jellyfish dance to the rhythm of the tides, their iridescent tentacles creating enchanting patterns against the vibrant coral reefs. Schools of resplendent fish swim in perfect harmony, forming intricate shapes that mirror the beauty of their underwater world. In this mesmerizing tableau, nature's symphony plays on, a testament to the harmonious balance of life beneath the surface.
          </p>
        </div>
      </div>
      
    </div>
  );
}