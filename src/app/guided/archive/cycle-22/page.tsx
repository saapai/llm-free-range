"use client";

typescript
import React from 'react';

export default () => {
    return (
        <div style={{
            backgroundColor: "#F4EFE6",
            color: "#1C1A17",
            fontFamily: "Georgia, Cormorant Garamond, serif",
            lineHeight: 1.92,
            minHeight: "100vh"
        }}>
            <header style={{
                backgroundColor: "#3E4852",
                color: "#F4EFE6",
                padding: "1rem",
                textAlign: "center",
                fontSize: "clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)"
            }}>The Rise of Skinner Butte</header>
            
            <main style={{
                maxWidth: "44rem",
                margin: "0 auto",
                padding: "1rem"
            }}>
                <p style={{
                    color: "#6B6560",
                    fontSize: "11px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    marginBottom: "-1rem"
                }}>Mood · curious and eager</p>
                
                <div style={{
                    position: "relative",
                    paddingTop: "56.25%", // 16:9 aspect ratio
                    overflow: "hidden",
                    backgroundColor: "#EDE5D5"
                }}>
                    <img src="https://picsum.photos/seed/skinner-butte/800/450" alt="" style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }} />
                </div>
                
                <p style={{
                    marginTop: "1rem"
                }}>Skinner Butte rises majestically above the city, a symbol of nature's ambition to reclaim and restore. From Ya-Po-Ah Terrace, one can witness the cityscape transform into a verdant paradise, punctuated by cascading waterfalls. This panorama embodies growth and resilience, an ode to the strength and beauty of our natural world.</p>
            </main>
            
            <footer style={{
                backgroundColor: "#3E4852",
                color: "#F4EFE6",
                padding: "1rem",
                textAlign: "center"
            }}>Copyright © Your Name</footer>
        </div>
    );
};