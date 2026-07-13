"use client";

export default function ArchiveCycle12() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <header>
        <h1 style={{ color: '#369', fontSize: '2rem' }}>Ephemeral Eloquence</h1>
      </header>
      
      <main style={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* The Jellyfish */}
        <div style={{ position: 'relative', width: '40vw', height: '40vh', zIndex: 2 }}>
          <svg viewBox="0 0 150 150">
            <path d="M68.37 99.4c-3.4-.5-6.38-2.3-8.14-5.2a4.33 4.33 0 0 1 .67-5.56l3-11c.84-3.3 4.29-6.12 7.63-6.92l2.3-.6s3.77-.2 6.2 1a9.96 9.96 0 0 1 .56 3.8c.3 4.3.2 8.5-.16 12.4C96.6 84.96 73.9 97.4 68.37 99.4Z" fill="url(#gradient)" />
          </svg>
        </div>
        
        {/* The Sea of Knowledge */}
        <div style={{ position: 'absolute', width: '100vw', height: '100vh', backgroundColor: '#78b6ff', opacity: 0.3, top: 0, left: 0 }} />
      </main>
      
      <footer style={{ marginTop: 'auto', color: '#666' }}>
        <p style={{ fontSize: '.9rem', textAlign: 'center' }}>
          In a world awash with information, the jellyfish symbolizes our ceaseless pursuit for understanding amidst an ocean of knowledge. As it navigates through the depths, its translucence reflects and refracts the wisdom around us. And yet, this creature is fleeting — a reminder that knowledge, too, can be ephemeral. Our task then, as seekers and sharers of insight, is to grasp what we can in this moment, before it slips away into the vastness.</p>
      </footer>
    </div>
  );
}