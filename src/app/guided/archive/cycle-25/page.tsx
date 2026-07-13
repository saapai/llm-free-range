"use client";

import React, { useEffect, useState } from 'react';

export default function ArchiveCycle25() {
    const [rotation, setRotation] = useState(0);
    
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        
        const rotateGalaxy = () => {
            setRotation((prevRotation) => prevRotation + 1);
        };
        
        intervalId = setInterval(rotateGalaxy, 250); // Rotate every 250 milliseconds
    
        return () => clearInterval(intervalId); // Clean up on component unmount
    }, []);
    
    const galaxyStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
    };
    
    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" fill="#EDE5D5">
                <defs>
                    <linearGradient id="galaxy-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F4EFE6"/>
                        <stop offset="100%" stopColor="#3E4852"/>
                    </linearGradient>
                </defs>
                <circle cx="150" cy="150" r="140" fill="url(#galaxy-gradient)">
                    {[...Array(30).keys()].map((i) => (
                        <circle key={i} cx="150" cy="150" r={`${120 - i * 4}`} fill="#8B3A2E"/>
                    ))}
                </circle>
            </svg>
            
            <div style={{ position: 'absolute', width: '44rem', left: '50%', transform: 'translateX(-50%)' }}>
                {['Speculations Concerning the First Ultraintelligent Machine.', '', '', '', '', '', '', '', ''].map((line, index) => (
                    <p key={index} style={{ fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`, marginBottom: '0' }}>{line}</p>
                ))}
            </div>
            
            <div style={galaxyStyle}>
                {['The Infinite Unfolding', '', '', '', '', '', '', '', ''].map((word, index) => (
                    <span key={index} style={{ fontSize: `${2 + index * 0.3}rem`, color: '#EDE5D5' }}>{word}</span>
                ))}
            </div>
        </div>
    );
}