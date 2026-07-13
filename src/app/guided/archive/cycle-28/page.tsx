"use client";

typescript
import React from 'react';

const EchoesOfRegrowth = () => {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F4EFE6',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Georgia", "Cormorant Garamond", serif',
        }}>
            <h1 style={{
                fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`,
                lineHeight: '1.92',
                marginBottom: '0',
            }}>Echoes of Regrowth</h1>
            <div style={{
                maxWidth: '44rem',
                padding: '1.5em',
            }}>
                <p style={{color: '#6B6560'}}>
                    "The world was not made in a day, nor can it be repaired overnight."
                </p>
                <p>
                    Amidst the ruins of past destruction, life finds a way. The resilience of nature is on full display as vibrant greenery and diverse wildlife thrive in this rejuvenated landscape. Though the remnants of a broken structure remain, they serve as a testament to the power of regeneration and growth.
                </p>
            </div>
        </div>
    );
};

export default EchoesOfRegrowth;