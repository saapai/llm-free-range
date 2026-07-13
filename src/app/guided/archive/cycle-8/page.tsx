"use client";

export default function ArchiveCycle8() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem'
    }}>
        <h1 style={{ fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)', color: '#1C1A17' }}><i>Dreamscape Realms</i></h1>
        <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6B6560' }}>curious and eager</p>
        
        {/* Mystic Journey Block */}
        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 1rem + 3vw, 2.8rem)', color: '#8B3A2E' }}><i>Mystic Journey</i></h2>
            <p style={{ marginTop: '1rem', fontSize: 'clamp(0.9rem, 0.7rem + 1vw, 1.4rem)', color: '#3E4852' }}>
                Embark on an enigmatic voyage into the depths of the unknown. Traverse through landscapes painted with vivid hues and abstract forms that challenge your perception of reality. Let curiosity be your compass as you navigate hidden paths and uncover secrets lurking in the shadows.</p>
        </div>
        
        {/* Vivid Colors Block */}
        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 1rem + 3vw, 2.8rem)', color: '#E8B547' }}><i>Vivid Colors</i></h2>
            <p style={{ marginTop: '1rem', fontSize: 'clamp(0.9rem, 0.7rem + 1vw, 1.4rem)', color: '#3E4852' }}>
                Immerse yourself in a world awash with vibrant colors that evoke powerful emotions. Let the warmth of peach and coral ignite your passion, while the indigo depths stir feelings of wonder and unease.</p>
        </div>
        
        {/* Abstract Forms Block */}
        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 1rem + 3vw, 2.8rem)', color: '#6B6560' }}><i>Abstract Forms</i></h2>
            <p style={{ marginTop: '1rem', fontSize: 'clamp(0.9rem, 0.7rem + 1vw, 1.4rem)', color: '#3E4852' }}>
                In this realm of dreams, forms take shape and dissolve into the ether. Shapes morph and twist, defying logic and reason. Let your mind wander through these surreal landscapes, discovering hidden truths in their abstract beauty.</p>
        </div>
        
        {/* Dreamscape Realms Footer */}
        <footer style={{ marginTop: '4rem', color: '#6B6560' }}>
            <p><i>Dreamscape Realms</i> is a journey of self-discovery and exploration. Step into the unknown and uncover the secrets within.</p>
        </footer>
    </div>
  )
}