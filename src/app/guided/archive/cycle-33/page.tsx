"use client";

import { useState } from 'react'
export default function ArchiveCycle33() {
    const [expansion, setExpansion] = useState(0)
    setTimeout(() => {setExpansion((prev) => prev + 1)}, 250)
    return (
        <div style={{backgroundColor: '#1C1A17', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <svg width={`${expansion * 2}%`} viewBox="0 0 200 200" style={{backgroundColor: '#EDE5D5', transformOrigin: 'top left', transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s'}}>
                <circle cx="100" cy="100" r={`${expansion}%`} fill="#F4EFE6"/>
                {[...Array(25)].map((_, i) => (
                    <circle key={i} cx={Math.random() * 200} cy={Math.random() * 200} r={`${expansion - i / 4}%`} fill="#6B6560"/>
                ))}
            </svg>
        </div>
    )
}