"use client";

export default function ArchiveCycle59() {
  return (
    <div style={{
      backgroundColor: '#1C1A17',
      color: 'white',
      fontFamily: 'Georgia, Cormorant Garamond italic serif',
      lineHeight: '1.92',
      minHeight: '100vh',
      padding: '4rem 8rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <img src="https://i.imgur.com/h60M7qn.png" alt="Linux terminal icon" style={{ height: '3rem' }} />
        <div>
          <span style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8B3A2E' }}>THEME</span>
          <h1 style={{ marginTop: 0, fontWeight: 'normal', fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)' }} >Resilience Reborn</h1>
        </div>
      </div>
      
      <p style={{
        backgroundColor: '#EDE5D5',
        borderLeft: '6px solid #8B3A2E',
        padding: '1.5rem 2rem',
        maxWidth: '44rem'
      }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum dictum arcu vel leo ultrices faucibus id at tortor.</p>
      
      <div style={{ display: 'flex', marginTop: '3rem' }}>
        <div>
          <span style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8B3A2E' }}>MOOD</span>
          <p style={{ marginTop: 0, fontWeight: 'normal', fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)' }} >curious and eager</p>
        </div>
        
        <div style={{ marginLeft: '6rem' }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8B3A2E' }}>VISION</span>
          <p style={{ marginTop: 0, fontWeight: 'normal', fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)' }} >A vivid digital canvas depicts a determined Linux user navigating through the trials of system crashes and freezes.</p>
        </div>
      </div>
    </div>
  );
}