"use client";

export default function ArchiveCycle25() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `radial-gradient(circle, #365c82 1%, rgba(0, 0, 0, 0) 47%), radial-gradient(circle at center, rgb(90, 175, 235), transparent 75%)`,
      backgroundSize: 'cover',
      fontFamily: "'Orbitron', sans-serif",
    }}>
      <h1 style={{ color: '#fff', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000' }}>Galactic Whispers</h1>
      <p style={{
        maxWidth: '800px',
        width: '90%',
        fontSize: '24px',
        lineHeight: '1.5',
        color: '#ddd'
      }}>In the vast expanse of the cosmos, whispers echo through the abyss. Each star a flicker in the darkness, a testament to the infinite potential for creation and destruction. As we peer into the unknown, we are at once humbled by our insignificance and emboldened by our curiosity.</p>
    </div>
  );
}