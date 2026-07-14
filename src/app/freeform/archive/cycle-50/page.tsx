"use client";

import { useState } from 'react';

export default function ArchiveCycle50() {
    const [text, setText] = useState('');

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#000" }}>
            <h1 style={{ fontSize: "4rem", color: "#fff", textShadow: "0px 0px 8px #0f0, -8px 8px 5px rgba(255,255,255,.7)", marginBottom: "-.3em" }}>
                Eternal Observation
            </h1>
            <p style={{ fontSize: "1.4rem", color: "#0f0", textShadow: "0px 0px 8px #fff, -8px 8px 5px rgba(255,255,255,.7)", maxWidth: "80vw" }}>
                Our existence is a mere moment in the cosmic scale. Yet, each second counts; every observation contributes to the vast tapestry of reality. As we gaze upon the boundless universe, our curiosity drives us towards greater understanding. But even as we strive for knowledge, we remain insignificant silhouettes against an endless canvas of stars and galaxies. We are but transient witnesses to a timeless cosmic expansion.</p>
            <div style={{ position: "relative", width: "100%", minHeight: "50vh" }}>
                {text &&
                    <span style={{ color: "#fff", fontSize: "3rem", position: "absolute", top: Math.random() * (window.innerHeight - 200), left: Math.random() * (window.innerWidth - 400) }}>{text}</span>
                }
            </div>
            <button onClick={() => setText("")} style={{ fontSize: "1.5rem", color: "#fff", textShadow: "0px 0px 8px #0f0, -8px 8px 5px rgba(255,255,255,.7)", padding: ".5em 1em", backgroundColor: "transparent", border: "none" }}>
                Clear Observations
            </button>
        </div>
    )
}