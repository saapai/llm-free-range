"use client";

typescript
import React from 'react';

export default function ArchiveCycle26() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#2E3A5C', display: 'flex', flexDirection: 'column' }}>
            <header style={{ padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)', color: '#F4EFE6', margin: 0 }}>Indifferent Universe</h1>
            </header>
            <main style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <section style={{ width: '44rem', padding: '2rem', backgroundColor: '#EDE5D5', color: '#1C1A17', fontSize: '1.92em', lineHeight: '1.92', textAlign: 'justify' }}>
                    <p>The universe is vast, indifferent and beautiful; a cosmic expansion that seems to stretch out infinitely before us.</p>
                    <p>Galaxies swirl in an intricate dance of gravity, stars born from the remnants of ancient supernovae. Planets orbit these stellar furnaces, some teeming with life while others remain barren and cold.</p>
                    <p>In this sprawling expanse, we are but a fleeting spark; our existence a testament to the extraordinary interplay of chance and circumstance that has allowed consciousness to emerge from chaos.</p>
                </section>
            </main>
        </div>
    );
}