"use client";

import React from 'react';

export default function ArchiveCycle47() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#F4EFE6",
      color: "#1C1A17",
      fontFamily: "'Georgia', 'Cormorant Garamond'",
      lineHeight: 1.92,
    }}>
      
      <header style={{
        paddingTop: "3vh",
        textAlign: "center",
        backgroundColor: "#EDE5D5"
      }}>
        <h1 style={{
          fontSize: "clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)"
        }}>The Eternal Cosmos</h1>
        
        <p style={{
          fontWeight: "bold",
          letterSpacing: "0.22em",
          marginTop: "-0.5rem"
        }}>A JOURNEY THROUGH SPACE & TIME</p>
      </header>
      
      <section style={{
        padding: "4vh",
        maxWidth: "44rem",
        margin: "auto",
        fontSize: "1.25rem"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "3px solid #8B3A2E",
          paddingBottom: "2vh",
          marginBottom: "4vh"
        }}>
          <div style={{width: "60%"}}>
            <p><span style={{fontWeight: "bold"}}>Stephen Hawking</span>, the renowned physicist and cosmologist, once said, “The universe doesn’t allow perfection.” This sentiment speaks to the vastness and unpredictability of space. It reminds us that in the grand cosmos, our place is but a tiny speck.</p>
          </div>
          
          <div style={{width: "40%"}}>
            <img src="https://example.com/image1.jpg" alt="Stephen Hawking" />
          </div>
        </div>
        
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "3px solid #8B3A2E", paddingBottom: "2vh", marginBottom: "4vh"}}>
          <div style={{width: "60%"}}>
            <p><span style={{fontWeight: "bold"}}>Carl Sagan</span>, the beloved astronomer and science communicator, often emphasized the importance of understanding our place in the cosmos. He wrote, “The cosmos is all that is or ever was or ever will be.” This statement highlights the awe-inspiring scope of the universe and encourages us to explore its mysteries.</p>
          </div>
          
          <div style={{width: "40%"}}>
            <img src="https://example.com/image2.jpg" alt="Carl Sagan" />
          </div>
        </div>
        
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "3px solid #8B3A2E", paddingBottom: "2vh", marginBottom: "4vh"}}>
          <div style={{width: "60%"}}>
            <p><span style={{fontWeight: "bold"}}>NASA</span>, the National Aeronautics and Space Administration, has been at the forefront of space exploration for decades. From launching satellites to studying distant galaxies, NASA's work reminds us that our understanding of the universe is constantly evolving.</p>
          </div>
          
          <div style={{width: "40%"}}>
            <img src="https://example.com/image3.jpg" alt="NASA" />
          </div>
        </div>
        
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "3px solid #8B3A2E", paddingBottom: "2vh", marginBottom: "4vh"}}>
          <div style={{width: "60%"}}>
            <p><span style={{fontWeight: "bold"}}>Hubble Space Telescope</span>, named after astronomer Edwin Hubble, has provided us with some of the most breathtaking images of space. Its observations have deepened our understanding of galaxies and the origins of the universe.</p>
          </div>
          
          <div style={{width: "40%"}}>
            <img src="https://example.com/image4.jpg" alt="Hubble Space Telescope" />
          </div>
        </div>
      </section>
      
      <footer style={{
        backgroundColor: "#EDE5D5",
        textAlign: "center",
        padding: "2vh 0",
        fontSize: "1.2rem"
      }}>
        © {new Date().getFullYear()} The Eternal Cosmos. All rights reserved.
      </footer>
    </div>
  );
}