"use client";

import React from 'react';

export default function ArchiveCycle36() {
	return (
		<div style={{ minHeight: "100vh", backgroundColor: "#2E3A5C" }}>
			<svg viewBox="0 0 84 76">
				<defs>
					<linearGradient id="grad1" x1={0} y1={0} x2={1} y2={1}>
						<stop offset={0} style={{ stopColor: "#6B6560", stopOpacity: 1 }} />
						<stop offset={1} style={{ stopColor: "#F4EFE6", stopOpacity: 1 }} />
					</linearGradient>
				</defs>
				<polygon points="0,75.983 23.5,63.895 64.167,27.5 84,35.718 67.353,76 0,75.983" fill="url(#grad1)" />
			</svg>
			<div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
				<h1 style={{ fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`, color: "#EDE5D5", textAlign: "center", marginTop: "20%" }}>
					Indifferent Observation
				</h1>
				<p style={{ fontFamily: "'Georgia', serif", lineHeight: 1.92, color: "#F4EFE6", textAlign: "center", marginTop: "-3%" }}>
					In the silence of cosmic expansion, our existence is a fleeting spark against the eternal night. The universe expands, indifferent to our presence, as galaxies and stars dance on the canvas of creation. We are both spectators and actors in this grand performance, where time unfolds like an endless scroll. In this moment, we pause to contemplate our place within the cosmos, marveling at 13.8 billion years of becoming.
				</p>
			</div>
		</div>
	);
}