"use client";

`use client`

export default function ArchiveCycle7() {
  return (
    <div style={{
      backgroundColor: '#F4EFE6',
      color: '#1C1A17',
      fontFamily: 'Georgia, Cormorant Garamond, serif',
      lineHeight: 1.92,
      maxWidth: '44rem',
      padding: '3rem'
    }}>
      <h1 style={{
        fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`,
        marginBottom: '.5em'
      }}>Unveiling the Mysteries of Knowledge</h1>
      <p style={{marginBottom: '2em', fontSize: '18px'}}>
        As we journey through the realms of knowledge, each brushstroke signifies a new revelation and discovery. The vibrant colors and textures embody the excitement and curiosity that comes with uncovering hidden truths.</p>
      <div style={{display:'flex', marginBottom: '2em'}}>
        <span style={{fontSize: '13px', letterSpacing: '.22em', textTransform: 'uppercase', color: '#6B6560' }}>MATHEMATICS</span>
        <div style={{backgroundColor: '#EDE5D5', borderRadius: '3px', flexGrow: 1, marginLeft: '1em', height: '2px' }}></div>
      </div>
      <p>The language of numbers holds mysteries that only the most brilliant minds can decipher. It’s a realm where infinity is tangible and paradoxes become solutions.</p>
      <div style={{display:'flex', marginBottom: '2em'}}>
        <span style={{fontSize: '13px', letterSpacing: '.22em', textTransform: 'uppercase', color: '#6B6560' }}>PHILOSOPHY</span>
        <div style={{backgroundColor: '#EDE5D5', borderRadius: '3px', flexGrow: 1, marginLeft: '1em', height: '2px' }}></div>
      </div>
      <p>Where mathematics seeks to quantify the universe, philosophy attempts to understand it through reason and logic. It’s a journey into the nature of existence itself.</p>
    </div>
  )
}