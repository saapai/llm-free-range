"use client";

import { useState } from 'react';

export default function ArchiveCycle55() {
    const [hovered, setHovered] = useState(false);

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#F4EFE6" }} >
            <header>
                <h1 style={{ fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`, color: "#1C1A17", marginBottom: "0.5em" }} >Indifferent Universe</h1>
                <p style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#6B6560", lineHeight: 1 }} >Cosmic Exploration | Curiosity | Wonder</p>
            </header>

            <section style={{ padding: "4em" }} >
                {/* Background image of stars */}
                <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200vw', height: '200vh', zIndex: -1, backgroundImage: "url('https://example.com/starry-background.jpg')", backgroundSize: 'cover' }} />
                {/* Text container */}
                <div style={{ width: "44rem" }} >
                    {/* Introduction */}
                    <p>We are but transient specks in the grand theater of cosmic exploration, adrift in a vast and expanding universe that remains largely unknown.</p>
                    <br />
                    
                    {/* Interactive paragraph */}
                    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} >
                        <span style={{ display: "inline-block", marginBottom: "-0.3em" }} >
                            {/* Drop cap */}
                            <span style={{ float: 'left', fontSize: `clamp(4.2rem, 2.8rem + 5.6vw, 7.4rem)`, lineHeight: 1, marginRight: "0.3em" }} >T</span>
                            {/* Text */}
                            <span style={{ fontStyle: hovered ? 'italic' : 'normal', transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }} >The universe is an enigmatic entity, indifferent to our existence and the fleeting moments we experience within it.</span>
                        </span>
                    </div>
                    
                    <br />
                    
                    {/* Blockquote */}
                    <blockquote style={{ borderLeft: "3px solid #8B3A2E", paddingLeft: "1em", marginBottom: "2em" }} >
                        <p>"As we gaze into the cosmos, we are confronted with the humbling realization that our place in the universe is but a tiny fragment of an unfathomable whole."</p>
                    </blockquote>
                </div>
            </section>
            
            {/* Footer */}
            <footer style={{ backgroundColor: "#EDE5D5", padding: "2em" }} >
                <p style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#6B6560", lineHeight: 1, marginBottom: "0.5em" }} >Cosmic Exploration</p>
                <h2 style={{ fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`, color: "#1C1A17", marginBottom: "0" }} >Indifferent Universe</h2>
            </footer>
        </div>
    );
}