"use client";


import React from 'react';

export default function ArchiveCycle30() {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f2f3f4",
            color: "#333"
        }}>
            
            <h1 style={{
                fontSize: "3rem",
                marginBottom: "1rem",
                textShadow: "0px 0px 8px rgba(0, 0, 0, .5)"
            }}>Ephemeral Threads</h1>
            
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                
                <img src="https://source.unsplash.com/random/400x300?tokyo+train" alt="Tokyo train scene" style={{
                    marginRight: "2rem",
                    boxShadow: "0px 0px 16px rgba(0, 0, 0, .5)"
                }}/>
                
                <div style={{flexGrow: 1}}>
                    
                    <h3 style={{fontSize: "2rem", marginBottom: ".5rem"}}>Yamanote Line</h3>
                    
                    <p style={{fontSize: "1.2rem", lineHeight: 1.6, maxWidth: "70ch"}}>The Tokyo crowd flows in and out of the train cars like water. Each person is an island of experience; each gaze a momentary connection in this sea of humanity. The rhythmic chatter of the conductor echoes throughout the station, punctuating the humdrum of life.</p>
                    
                </div>
            
            </div>
            
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                
                <img src="https://source.unsplash.com/random/400x300?antarctica+explorer" alt="Antarctic explorer scene" style={{
                    marginLeft: "2rem",
                    boxShadow: "0px 0px 16px rgba(0, 0, 0, .5)"
                }}/>
                
                <div style={{flexGrow: 1}}>
                    
                    <h3 style={{fontSize: "2rem", marginBottom: ".5rem"}}>Antarctic Solitude</h3>
                    
                    <p style={{fontSize: "1.2rem", lineHeight: 1.6, maxWidth: "70ch"}}>Frozen tundra stretches to the horizon, silent save for the wind's haunting song. Here, amidst the coldest place on Earth, an explorer ponders his existence. The starkness of this white void heightens the awareness of one's self; a solitary figure in the vast expanse.</p>
                    
                </div>
            
            </div>
        
        </div>
    );
}