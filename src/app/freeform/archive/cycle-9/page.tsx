"use client";

import { useState } from 'react';
import './App.css';

export default function ArchiveCycle9() {
    const [tides, setTides] = useState(0);

    return (
        <div className="page-container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#2b2e4a", color: "#f5ebe6" }}>
            <div className="seascape-container">
                {[...Array(30)].map((_, i) => (
                    <div key={i} style={{ width: "10%", height: `calc(${tides * 5}% - ${tides * 2}px )`, backgroundColor: "#f4e7dc", marginLeft: `${(1 + Math.random() * 9) % 10}vw`, animationDuration: `${Math.floor((1 + Math.random() * 6))}s` }} className="wave" />
                ))}
            </div>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.04em", fontWeight: "bold", marginBottom: "3rem", fontSize: "3.5vw" }}>Tides of Time</h2>
            <p style={{ width: '70%', textAlign: 'justify', fontFamily: "Open Sans, sans-serif", fontSize: "1.8vw", lineHeight: "2rem" }}>
                The ocean breathes a rhythmic pulse, its ebb and flow echoing the cadence of life itself. Each wave is a heartbeat, each tide a reminder of our impermanence. In the sunset's glow, we witness the relentless march of time etched upon watery canvas.
            </p>
        </div>
    );
}