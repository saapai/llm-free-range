"use client";

export default function ArchiveCycle41() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F4EFE6',
      color: '#1C1A17',
      fontFamily: 'Georgia, Cormorant Garamond, serif',
      lineHeight: 1.92,
    }}>
      <header style={{
        backgroundColor: '#3E4852',
        color: '#F4EFE6',
        padding: '2rem 0',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`,
          margin: 0
        }}>Indifferent Cosmos</h1>
        <p style={{
          letterSpacing: '0.22em',
          fontSize: '11px',
          textTransform: 'uppercase',
          marginTop: '-0.5rem'
        }}>A captivating artwork that portrays the vastness of space, its endless expansion and our fleeting existence in it.</p>
      </header>
      
      <main style={{
        maxWidth: '44rem',
        margin: '2.5rem auto',
        padding: '0 1.5rem'
      }}>
        <div style={{
          backgroundColor: '#EDE5D5',
          color: '#6B6560',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: `3px 3px 6px rgba(0, 0, 0, 0.1)`,
        }}>
          <p>We are but specks of dust in the vast cosmic ocean that stretches endlessly beyond our comprehension.</p>
          
          <p><em>The universe is indifferent to our observation</em>, it has been expanding for 13.8 billion years, and will continue to do so without a care for our existence.</p>
          
          <blockquote style={{
            borderLeft: `3px solid #8B3A2E`,
            paddingLeft: '1rem',
            marginBottom: '-0.5rem'
          }}>
            "The cosmos is all that is or ever was or ever will be." - Carl Sagan
          </blockquote>
          
          <p>As we gaze upon the cosmic canvas, a sense of awe and insignificance overcomes us. Our lives are but brief flickers in the eternal expansion.</p>
        </div>
      </main>
      
      <footer style={{
        backgroundColor: '#3E4852',
        color: '#F4EFE6',
        padding: '1rem 0',
        textAlign: 'center'
      }}>
        <p>&copy; 2022 Indifferent Cosmos. All rights reserved.</p>
      </footer>
    </div>
  );
}