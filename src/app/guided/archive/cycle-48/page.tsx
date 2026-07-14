"use client";

import { useEffect, useState } from 'react';
export default function ArchiveCycle48() {
	const [progress, setProgress] = useState(0);
  
	useEffect(() => {
		function handleScroll() {
		  const scrollTop = window.pageYOffset;
		  const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
		  setProgress((scrollTop / maxScrollTop) * 100);
		}
  
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
  
	return (
	<div style={{
		minHeight:"100vh",
		display:"flex",
		flexDirection:"column",
		alignItems:"center",
		justifyContent:"space-between",
		background: `linear-gradient(to bottom, #F4EFE6, white)`,
		paddingBottom: "50px"
	}}>
		<h1 style={{
			fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`,
			marginTop:"50px",
			textAlign:"center"
		}}>Dragon's Flight</h1>
		<div style={{
			display: "flex",
			flexDirection:"column",
			alignItems:"center",
			maxWidth:"44rem",
			marginTop:"50px"
		}}>
			<p style={{
				fontSize:"1.92rem",
				lineHeight:"1.92",
				color:"#1C1A17"
			}}>
				{`
				The dragon rises, its wings unfurled in the golden light of dawn. Each scale reflects the vibrant landscape below, a symphony of greens and blues that ebb and flow like a living sea. 

				Its eyes hold the weight of centuries - ancient wisdom etched into every line, every curve. They regard you with an intensity that pierces the soul, stirring something deep within your being. It is a call to greatness, a whisper of potential yet unrealized.

				This creature of myth and legend beckons you onward, urging you to rise above the mundane. In its flight, there lies a promise - a journey towards ascension, where the mundane gives way to the extraordinary. 

				Take heart, for the dragon's path is fraught with peril and wonder in equal measure. But fear not, brave traveler; for as long as you hold true to your purpose, no challenge shall stand before you. So spread your wings and ascend - let the dragon guide you towards greatness.
				`}
			</p>
			<div style={{
				position:"relative",
				width:"100%",
				height:"500px",
				marginTop:"50px"
			}}>
				{/* SVG artwork of the dragon here */}
			</div>
			<p style={{
				fontSize:"1.2rem",
				lineHeight: "1.92",
				color:"#6B6560",
				textAlign:"center",
				marginTop:"50px"
			}}>Scroll Progress: {progress.toFixed(2)}%</p>
		</div>
	</div>)
}