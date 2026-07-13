"use client";

export default function ArchiveCycle14() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header>
        <h1 style={{ fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)', marginBottom: 0 }}>Whispers of Lycurgus</h1>
        <p style={{ color: '#6B6560', fontSize: '11px', letterSpacing: '0.22em' }}>CURIOUS AND EAGER</p>
      </header>
      
      <main style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4EFE6' }}>
        <div style={{ maxWidth: '44rem', textAlign: 'justify' }}>
          <p>The landscape stretched out before him like a tapestry woven of dreams. The mist, thick and gray, swirled around his feet as he stood atop the hill, surveying the ancient city below.</p>
          
          <p>This was Sparta, the birthplace of legends, where men were forged into warriors by the unyielding hand of Lycurgus. And yet, as he gazed upon the Polity of Athenians and Lacedaemonians in the distance, he could not help but feel a sense of unease.</p>
          
          <blockquote style={{ borderLeft: '3px solid #8B3A2E', paddingLeft: '10px', marginBottom: '20px' }}>
            <p>"For what purpose had the gods brought him to this place? What whispers of Lycurgus did they wish for him to hear?"</p>
          </blockquote>
          
          <p>The figure, reminiscent of Richard III, was not a man easily shaken. But in this dreamlike realm, where the boundaries between reality and illusion blurred, even he could not escape the pull of curiosity.</p>
        </div>
      </main>
      
      <footer style={{ backgroundColor: '#EDE5D5', padding: '10px 20px', textAlign: 'center' }}>
        <p style={{ color: '#6B6560', fontSize: '11px', letterSpacing: '0.22em' }}>&copy; Your Name, {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}