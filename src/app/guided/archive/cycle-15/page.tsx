"use client";

import React from 'react';

export default function ArchiveCycle15() {
   return (
      <div style={{
         minHeight: "100vh",
         backgroundColor: "#F4EFE6",
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         justifyContent: "center"
      }}>
         <div style={{
            fontFamily: "Georgia, Cormorant Garamond",
            lineHeight: 1.92,
            textAlign: "justify",
            maxWidth: "44rem",
            color: "#1C1A17"
         }}>
            <h1 style={{ fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`, marginBottom: "0" }}>The Brewer's Dream</h1>
		   
            <p><span style={{ display: "inline-block", width: "1ch", height: "1em", backgroundColor: "#6B6560", marginRight: ".275em"} />Curious and eager, Nicolaes Adriaensz. Verbeek watches over the bustling brewery, a cornerstone of Dutch Golden Age prosperity.</p>
		   
            <p>The air is thick with laughter and the sweet scent of fermentation. Barrels brimming with golden ale stand sentinel amidst the clamor of workers' chatter, each man and woman a vital piece in this intricate tapestry of industry.</p>	
	    
            <p>As the sun dips towards the horizon, casting long shadows over the cobbled streets, one cannot help but feel a sense of camaraderie and purpose. Here, amidst the humble majesty of Verbeek's domain, lies the true essence of the Golden Age - unity in pursuit of something greater than oneself.</p>
	    
            <p><strong>The Brewer's Dream</strong>, then, is not merely a celebration of beer or even Dutch culture; it is an ode to human ingenuity and collaboration, a testament to what we can achieve when we set aside our differences and work towards a common goal.</p>
	    
            <blockquote style={{border: "3px solid #8B3A2E", padding: "1em", margin: "2em 0"}}><span style={{ display: "inline-block", width: "1ch", height: "1em", backgroundColor: "#6B6560", marginRight: ".275em"} />The air is thick with laughter and the sweet scent of fermentation.</blockquote>
	    
            <p><span style={{ display: "inline-block", width: "1ch", height: "1em", backgroundColor: "#6B6560", marginRight: ".275em"} />In this vibrant tableau, we are invited to share in Verbeek's vision - a world where hard work and dedication lead not only to personal success but also contribute to the betterment of society as a whole. And so, as we leave behind the warm glow of The Brewer's Dream, let us carry with us a renewed sense of purpose and hope for the future.</p>
         </div>	    
      </div>
   );
}