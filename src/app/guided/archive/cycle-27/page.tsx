"use client";

import React from 'react';

export default function ArchiveCycle27() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#1C1A17', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="145" height="82" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#F4EFE6', stopOpacity: '1' }} />
                        <stop offset="100%" style={{ stopColor: '#2E3A5C', stopOpacity: '1' }} />
                    </linearGradient>
                </defs>
                <rect width="145" height="82" fill="#F4EFE6" rx="10" ry="10"/>
            </svg>

            <h1 style={{ color: '#F4EFE6', fontFamily: 'Cormorant Garamond, Georgia', fontWeight: 'normal', fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)', marginBottom: '0.5em' }}>
                Indifferent Universe
            </h1>
            
            <p style={{ color: '#EDE5D5', fontFamily: 'Cormorant Garamond, Georgia', lineHeight: '1.92', fontSize: '1rem', maxWidth: '44rem' }}>
                We exist within a cosmic expanse of unfathomable scale, each particle tracing an intricate path through the fabric of spacetime. Our lives, fleeting and ephemeral, are but brief flickers against the eternal backdrop of the universe. And yet, in our curiosity and wonder, we find meaning - a testament to the resilience of the human spirit amidst indifferent cosmic forces.
            </p>
            
            <div style={{ marginTop: '2em', display: 'flex', flexWrap: 'wrap' }}>
                <svg width="150" height="84">
                    <rect fill="#F4EFE6" rx="10" ry="10" width="150" height="84"/>
                </svg>

                <svg width="230" height="78">
                    <rect fill="#F4EFE6" rx="10" ry="10" width="230" height="78"/>
                </svg>
            </div>
        </div>
    );
}