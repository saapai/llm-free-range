"use client";

export default function ArchiveCycle43() {
	return (
		<div style={{
			minHeight: '100vh',
			backgroundColor: '#F4EFE6',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontFamily: '"Georgia", "Cormorant Garamond", serif'
		}}>
			<div style={{
				maxWidth: '44rem',
				margin: '0 auto',
				padding: '3em 2em',
				boxSizing: 'border-box'
			}}>
				<h1 style={{
					fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)',
					marginBottom: '1em',
					color: '#1C1A17'
				}}>Whispers in the Twilight</h1>

				<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2em'}}>
					<span style={{fontSize: '.8rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#6B6560'}}>Mood</span>
					<span style={{fontSize: '.8rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#6B6560'}}>Vision</span>
				</div>

				<p style={{marginBottom: '1.92em', lineHeight: 1.92, fontSize: '1rem', color: '#1C1A17'}}>
					In the twilight realm of dreams, whispers echo like distant memories, calling us to explore a world where shadows dance and ethereal glows illuminate the mysterious creatures that inhabit this surreal landscape. Each step is an invitation to wonder and enchantment, as we journey through a place that exists only in the depths of our imagination.</p>
			</div>
		</div>
	);
}