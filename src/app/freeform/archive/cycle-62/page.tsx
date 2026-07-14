"use client";

import React from 'react';

export default function ArchiveCycle62() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#080523",
      color: "#fdfcfc"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginBottom: "2em"
      }}>
        <h1 style={{ fontSize: "4rem", letterSpacing: "-0.05em" }}>The Infinite Canvas</h1>
        <p style={{ fontSize: "1.5rem", marginTop: "1em" }}>"The cosmos is within us. We are made of star-stuff." - Carl Sagan</p>
      </div>
      <svg viewBox="0 0 800 600">
        <circle style={{ fill: "#f2cd41" }} cx="400" cy="300" r="250"></circle>
        <path d="M-2,2 l804,-6 L798,-2 Z" stroke="#31eaea" strokeWidth="3px" />
      </svg>
    </div>
  );
}