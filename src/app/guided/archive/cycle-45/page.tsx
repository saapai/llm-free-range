"use client";

import React from 'react';

export default function ArchiveCycle45() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{ backgroundColor: '#2E3A5C', padding: '2rem', textAlign: 'center', color: '#F4EFE6' }}>
                <h1 style={{ fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)', margin: 0 }}>Indifferent Cosmos</h1>
            </header>
            <main style={{ flexGrow: 1, backgroundColor: '#EDE5D5', padding: '4rem' }}>
                <p style={{ fontSize: '1.92rem', lineHeight: '1.92rem', maxWidth: '44rem', margin: 'auto' }}>
                    A vast, swirling galaxy dominates the scene, its ethereal colors and intricate patterns a testament to the unfathomable complexity of the universe. Tiny pinpricks of light represent stars, each one a distant world or sun waiting to be discovered. The viewer feels small and insignificant in the face of such vastness, yet cannot help but be drawn into the beauty and mystery of it all.
                </p>
            </main>
            <footer style={{ backgroundColor: '#3E4852', padding: '1rem', textAlign: 'center', color: '#F4EFE6' }}>
                &copy; Indifferent Cosmos - an exploration of the cosmic experience.
            </footer>
        </div>
    );
}