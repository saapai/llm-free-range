"use client";

typescript
export default function ArchiveCycle12() {
return (
	<div style={{ minHeight: '100vh', backgroundColor: '#2E3A5C' }}>
		<header style={{ color: '#F4EFE6', padding: '2rem 0', textAlign: 'center', fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)' }}>
			Stardust Symphony
		</header>
		<main style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 'calc(100vh - 4rem)', padding: '0 2rem' }}>
			<div style={{ width: '50%', backgroundColor: '#F4EFE6', boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.1)', padding: '2rem', borderRadius: '10px' }}>
				<p style={{ fontSize: 'clamp(1.5rem, 1rem + 1vw, 2rem)', lineHeight: 1.92 }}>
					In the depths of cosmic night, a symphony of stardust unfolds. Auroras dance in perfect harmony with the rhythm of celestial bodies, their vivid colors painting the canvas of the universe. The spectacle is breathtaking – an ethereal masterpiece that evokes wonder and connection to the vast expanse of space. As we gaze upon this cosmic ballet, our spirits soar among the stars, carried away by the enchanting melody of the Stardust Symphony.
				</p>
			</div>
			<div style={{ width: '40%', backgroundColor: '#2E3A5C', boxShadow: '-2px 1px 6px rgba(29, 26, 23, .3)', padding: '2rem', borderRadius: '10px' }}>
				<div style={{ backgroundColor: '#F4EFE6', marginBottom: '1rem', padding: '1rem', borderRadius: '5px' }}>
					<span style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6B6560' }}>Title</span>
					<h3 style={{ fontSize: 'clamp(1.5rem, 1rem + 1vw, 2rem)', margin: 0, paddingTop: '0.5rem', color: '#2E3A5C' }}>Stardust Symphony</h3>
				</div>
				<div style={{ backgroundColor: '#F4EFE6', marginBottom: '1rem', padding: '1rem', borderRadius: '5px' }}>
					<span style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6B6560' }}>Mood</span>
					<p style={{ fontSize: 'clamp(1.5rem, 1rem + 1vw, 2rem)', margin: 0, paddingTop: '0.5rem', color: '#2E3A5C' }}>Curious and Eager</p>
				</div>
				<div style={{ backgroundColor: '#F4EFE6', borderRadius: '5px' }}>
					<span style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6B6560' }}>Vision</span>
					<p style={{ fontSize: 'clamp(1.5rem, 1rem + 1vw, 2rem)', paddingTop: '0.5rem', margin: 0, color: '#2E3A5C' }}>In this artwork, the viewer is transported to a dreamlike realm where auroras dance in harmony with the rhythm of stardust. The vivid colors and ethereal glow evoke a sense of wonder and connection to the cosmos. As they gaze upon this celestial masterpiece, the viewer can't help but feel their spirit soar among the stars.</p>
				</div>
			</div>
		</main>
	</div>
);
}