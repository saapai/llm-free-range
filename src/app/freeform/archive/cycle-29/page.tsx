"use client";

import React from 'react';

export default function ArchiveCycle29() {
	return (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			minHeight: '100vh',
			backgroundColor: '#252b34' // deep space blue
		}}>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '2rem',
				backgroundColor: '#fae5a9' // sunset orange
			}}>
				<h1 style={{ fontSize: '3rem', color: '#1d4e89' }}>Stardust Shores</h1>
				<p style={{ textAlign: 'center', marginTop: '2rem', color: '#5c6a77' }} >
					The viewer is transported to a mystical shoreline, where ancient ruins meet futuristic technology. The sky is filled with distant galaxies and nebulae, while the sand glimmers with remnants of supernova dust. A lone figure stands on the beach, gazing out at the horizon as if searching for something lost in time.
				</p>
				<img src="https://via.placeholder.com/500x250" alt="A mystical shoreline where ancient ruins meet futuristic technology." />
				<button style={{ marginTop: '2rem', padding: '1rem 2rem', backgroundColor: '#3c8dbc', color: 'white', borderRadius: '4px', cursor: 'pointer' }} >
					Explore
				</button>
			</div>
		</div>
	);
}