"use client";

import { useState } from 'react';

export default function ArchiveCycle3() {
    const [textRevealed, setTextReveal] = useState(false);
    
    setTimeout(() => {
        setTextReveal(true);
    }, 2000) // Delay the reveal of text for two seconds.
    
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#00091B',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            
            {/* Star field */}
            <div style={{
                position: 'absolute',
                top: '-25%',
                left: '-10%',
                width: '130%',
                height: '130%',
                backgroundImage: 'radial-gradient(#4B67C9, #2E4AAB)',
                opacity: .5,
            }} />
            
            {/* Swirling Galaxy */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '120%',
                height: '120%',
                backgroundImage: 'url("https://example.com/swirling-galaxy.jpg")',
            }} />
            
            {/* Text container */}
            <div style={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#FFF',
                textAlign: 'center',
            }}>
                
                {/* Main Title */}
                <h1 style={{fontSize: '8vw'}}>Stardust Dreams</h1>
                
                {/* Subtitle */}
                <p style={{
                    fontSize: textRevealed ? '2.5vw' : '0', // Gradual reveal of text
                    opacity: textRevealed ? 1 : 0, // Fade in effect
                    transition: 'all .8s ease-in-out', // Transition settings
                }}>"We are stardust, dreaming of cosmic wonders."</p>
            </div>
            
        </div>
    )
}