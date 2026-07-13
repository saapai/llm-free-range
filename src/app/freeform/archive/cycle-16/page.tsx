"use client";

import React from 'react';

export default function ArchiveCycle16() {
	return (
		<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<svg width="100%" height="100%" viewBox="0 0 560 420">
				<defs>
					<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" style={{ stopColor: '#5b96e4', stopOpacity: 1 }} />
						<stop offset="100%" style={{ stopColor: '#81a2f5', stopOpacity: 1 }} />
					</linearGradient>
					<filter id="blurMe">
						<feGaussianBlur in="SourceGraphic" stdDeviation="10" />
					</filter>
				</defs>

				<rect style={{ fill: 'url(#grad1)', filter: 'url(#blurMe)' }} width="560" height="420" />

				<circle cx="70" cy="398" r="30" stroke="#ccc" fill="#ccc"/>
				<line x1="70" y1="398" x2="560" y2="398" style={{ stroke: '#ccc', strokeWidth: 4 }} />

				<rect x="500" y="290" width="80" height="120" fill="#ccc"/>
				<circle cx="540" cy="370" r="20" stroke="#5b96e4" fill="#5b96e4" />
			</svg>
		</div>
	);
}