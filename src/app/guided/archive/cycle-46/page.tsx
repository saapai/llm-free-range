"use client";

import React from 'react';

export default function ArchiveCycle46() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#2E3A5C" }}>
      <header>
        <nav style={{ backgroundColor: "#F4EFE6" }}>
          Navbar
        </nav>
      </header>
      <main style={{ maxWidth: "44rem", margin: "0 auto", paddingTop: "2rem", color: "#1C1A17" }}>
        <h1 style={{ fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`, marginBottom: "0.5rem", lineHeight: "1.92" }}>Indifferent Cosmos</h1>
        <p style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#6B6560", marginBottom: "2rem" }}>
          THEME: Cosmic Exploration | MOOD: curious and eager
        </p>
        <section style={{ position: "relative", paddingTop: "48%", backgroundImage: 'url("path/to/universe-background.jpg")', backgroundSize: "cover" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center", color: "#EDE5D5", fontSize: "1.2rem" }}>
            <div>
              <p>"Indifferent to our observation." - NASA</p>
              <h2 style={{ marginTop: "2rem", lineHeight: "1.92" }}>The Universe, Indifferent</h2>
              <p style={{ fontSize: ".8rem", marginBottom: "4rem", textAlign: "center", maxWidth: "30rem", width: "auto" }}>
                Our universe is vast and unending, filled with mysteries that we may never fully understand. As we gaze upon this cosmic vista, we are reminded of our own smallness in the face of such immense forces. The galaxies swirl around us, their light whispering secrets we can only begin to comprehend. And yet, despite its indifference to our observation, the universe offers a profound sense of wonder and awe that captivates our imagination.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}