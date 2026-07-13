"use client";

export default function ArchiveCycle6() {
	return (
		<div style={{ minHeight: '100vh', backgroundColor: '#2b3e5a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<svg viewBox="0 0 800 600" width="800" height="600" style={{ fill: 'white' }} xmlns="http://www.w3.org/2000/svg">
				{Array.from({ length: 50 }).map((_, i) => (
					<line key={i} x1={Math.random() * 800} y1={Math.random() * 600} x2={Math.random() * 800} y2={Math.random() * 600} strokeWidth="2" style={{ transition: 'all .3s' }} />
				))}
			</svg>
			<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 48, fontWeight: 'bold', color: '#e6f1ff' }}>Whispers of Change</div>
			<div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', width: '80%', fontSize: 24, color: '#c7d3dd', textAlign: 'center' }}>
				<p style={{ marginBottom: 0 }}>Invisible forces shape our world. They are the whispers of change that guide us through life.</p>
				<p>From weather patterns to technological advancements, these forces are all around us.</p>
			</div>
		</div>
	);
}