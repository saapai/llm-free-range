"use client";

export default function ArchiveCycle5() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#2E3A5C',
      color: '#F4EFE6'
    }}>
      <header style={{
        padding: '1.5rem 2rem',
        borderBottom: '1px solid #F4EFE6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0 }}>Ethereal Dance</h1>
        <nav>
          <a href="#">About</a> · <a href="#">Contact</a>
        </nav>
      </header>
      <main style={{ padding: '2rem' }}>
        <div style={{
          maxWidth: '44rem',
          margin: '0 auto',
          fontSize: '1.92em',
          lineHeight: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)',
        }}>
          <p>In the infinite expanse of the cosmos, a peculiar spectacle unfolds.</p>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '2rem' }}>
            <span style={{ fontSize: '0.6em', letterSpacing: '0.22em', textTransform: 'uppercase', paddingRight: '1rem', color: '#6B6560' }}>
              Mood:
            </span>
            <div style={{
              height: '4px', width: '38%', marginLeft: 'auto', backgroundColor: '#F4EFE6',
              transformOrigin: 'left center', animation: `fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards`
            }}></div>
          </div>
        </div>
      </main>
    </div>
  );
}