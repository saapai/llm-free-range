"use client";

import React from 'react';

export default () => (
  <div style={{ minHeight: "100vh", backgroundColor: "#F4EFE6" }}>
    <header>
      <h1 style={{ fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`, marginBottom: "10px", color: "#1C1A17" }}><span style={{ fontWeight: "normal" }}>Galactic</span> Wanderlust</h1>
      <p style={{ fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#6B6560", marginBottom: "30px" }}>Curious and Eager</p>
    </header>
    
    <main style={{ width: "44rem", margin: "auto", paddingTop: "120px", position: "relative" }}>
      <div style={{ backgroundColor: "#EDE5D5", height: "300px", borderRadius: "8px", overflow: "hidden" }}></div>
      
      <article style={{ marginTop: "40px", lineHeight: 1.92, color: "#1C1A17" }}>
        <p><span style={{ fontStyle: "italic" }}>The viewer is transported into a vibrant and surreal galaxy, with swirling colors and celestial bodies.</span> They feel a sense of wonder and curiosity as they explore the unknown.</p>
        
        <blockquote style={{ borderLeft: "3px solid #8B3A2E", paddingLeft: "10px", color: "#2E3A5C" }}>
          <span style={{ fontStyle: "italic" }}>We are all star-stuff, and we are made of cosmic dust.</span> — Carl Sagan
        </blockquote>
        
        <p>The universe is vast, infinite even. It's a playground for the imagination, where dreams soar among stars and planets serve as stepping stones to discovery.</p>
      </article>
      
      <div style={{ position: "absolute", bottom: "-50px", left: "calc(50% - 100px)", width: "200px" }}></div>
    </main>
    
    <footer style={{ textAlign: "center", paddingBottom: "60px", color: "#3E4852" }}>
      © Galactic Wanderlust Inc. All rights reserved.
    </footer>
  </div>
);