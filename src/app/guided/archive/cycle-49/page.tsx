"use client";

import React from 'react';

export default function ArchiveCycle49() {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#F4EFE6", color: "#1C1A17" }}>
            <header style={{ padding: "2rem 3.5rem", borderBottom: `solid ${(0.08).toFixed(1)}rem #8B3A2E`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ fontSize: clamp(2.1, 1.3 + 4.2 * vw / 100, 3.9), margin: 0, fontFamily: 'Georgia', lineHeight: 1.92, }}>The Endless Echo</h1>
                <p style={{ fontSize: "1rem", letterSpacing: ".1em" }}><i>Cosmic Expansion</i></p>
            </header>
            <main style={{ padding: "3.5rem", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", }}>
                <div style={{ width: "44rem", maxWidth: "100%" }}>
                    <p><i>As visitors walk through a dark room filled with glowing, expanding spheres that represent galaxies...</i></p>
                    ...
                </div>
            </main>
        </div>
    );
}