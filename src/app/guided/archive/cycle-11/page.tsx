"use client";

export default function ArchiveCycle11() {
	return (
		<div style={{ minHeight: "100vh", backgroundColor: "#F4EFE6", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" style={{ width: "100%", maxWidth: "44rem", height: "auto" }}>
				<defs>
					<linearGradient id="warmth_gradient" x1="0" y1="0" x2="1" y2="0">
						<stop offset="5%" style={{ stopColor: "#F2C9A4" }} />
						<stop offset="95%" style={{ stopColor: "#D97A57" }} />
					</linearGradient>
				</defs>
				<rect x="0" y="0" width="1920" height="1080" fill="#F4EFE6" />
				<g transform="translate(0 270)">
					<path d="M52,32 Q52,20 65,19.6T98,33 Q100,42 98,50 T85,67 Q80,75 70,78 H30 Q25,83 20,83 V180 Q20,185 25,185 H70 Q79.4,186.9 85,189 T100,200 Q100,203 98,203 T85,210 Q77.5,213.5 68,214 H30" fill="#2E3A5C" />
					<path d="M52,32 Q52,20 65,19.6T98,33 Q100,42 98,50 T85,67 Q80,75 70,78 H30 Q25,83 20,83 V180 Q20,185 25,185 H70 Q79.4,186.9 85,189 T100,200 Q100,203 98,203 T85,210 Q77.5,213.5 68,214 H30" fill="url(#warmth_gradient)" />
				</g>
				<text x="960" y="540" textAnchor="middle" style={{ fontFamily: "Cormorant Garamond, Georgia", fontSize: "3.2vmin", fill: "#1C1A17", lineHeight: 1.92 }}>
					Collapse and Renewal
				</text>
				<text x="480" y="560" style={{ fontSize: "1.2vmin", letterSpacing: "0.22em", fill: "#6B6560", textTransform: "uppercase" }}>
					A painting depicting the aftermath of the Late Bronze Age Collapse, showing remnants of ancient civilizations amidst a barren landscape. The viewer can feel the weight of history and the potential for rebirth.
				</text>
			</svg>
		</div>
	);
}