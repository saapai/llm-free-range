"use client";

import { useState } from 'react';

export default function ArchiveCycle18() {
  const [isArticleVisible, setIsArticleVisible] = useState(false);
  
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#F4EFE6",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "8rem",
      paddingBottom: "8rem"
    }}>
      
      <svg style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1
      }} viewBox="0 0 576 432">
        
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="5%" stopColor="#F2C9A4"/>
            <stop offset="95%" stopColor="#D97A57"/>
          </linearGradient>
        </defs>
        
        <path d="M0 384h576V144H0z" fill={`url(#gradient)`} />
        
        <foreignObject width="100%" height="100%">
          <body xmlns="http://www.w3.org/1999/xhtml">
            {isArticleVisible && (
              <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#3E4852",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#F4EFE6"
              }}>
                
                <h1 style={{
                  fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`,
                  marginBottom: "0",
                  textAlign: "center"
                }}>The Timeless Echoes of Imes</h1>
                
                <p style={{ fontSize: '16px', lineHeight: '1.7', maxWidth: '44rem' }}>
                  As you step onto the Imes Bridge, time seems to slow down. The wooden planks creak gently under your feet, whispering stories of generations past. The lush greenery surrounding the bridge frames a tranquil river that flows tirelessly. It is 1870, and you can feel the resilience and history seeping through every inch of this serene painting.
                </p>
                
                <button style={{
                  backgroundColor: "#E8B547",
                  color: "#2E3A5C",
                  borderRadius: "0",
                  padding: "1rem 2rem",
                  fontSize: "1.2rem",
                  cursor: "pointer"
                }} onClick={() => setIsArticleVisible(false)}>
                  Close article
                </button>
              </div>
            )}
            
            {!isArticleVisible && (
              <img src="https://source.unsplash.com/random/800x600/?nature,bridge" alt="Nature's Bridge" style={{
                display: "block",
                marginBottom: "2rem",
                boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.4)"
              }} onClick={() => setIsArticleVisible(true)} />
            )}
          </body>
        </foreignObject>
      </svg>
    </div>
  );
}