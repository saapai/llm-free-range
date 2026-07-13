"use client";

import React from 'react';

export default function ThreadsOfLife() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F3F3F3" }}>
      <h1 style={{ textAlign: "center", fontSize: "48px", marginTop: "50px" }}>Threads of Life</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 200px)" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          {Array.from({ length: 50 }).map((_, index) => (
            <circle key={index} cx={Math.random() * 500} cy={Math.random() * 500} r={Math.random() * 20 + 10} fill="rgb(239, 68, 68)" />
          ))}
        </svg>
      </div>
      <p style={{ textAlign: "center", fontSize: "16px", marginBottom: "50px" }}>We are all threads in the fabric of existence, interwoven through time and space. Our connections may be fleeting, but their impact endures.</p>
    </div>
  );
}
