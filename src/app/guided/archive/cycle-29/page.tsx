"use client";

export default () => (
  <div style={{
    backgroundColor: '#F4EFE6',
    color: '#1C1A17',
    fontFamily: 'Georgia, Cormorant Garamond',
    fontSize: '20px',
    lineHeight: '1.92',
    maxWidth: '44rem',
    padding: '3em'
  }}>
    <h1 style={{
      fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`,
      marginBottom: '-0.5em',
      position: 'relative',
      zIndex: '1'
    }}>The Moth's Dance</h1>
    <p style={{
      backgroundColor: '#EDE5D5',
      borderRadius: '3px',
      display: 'inline-block',
      fontSize: '0.8em',
      marginBottom: '1em',
      padding: '0.6em 1em',
      position: 'relative',
      top: '-0.4em'
    }}>By Ariel Franklin</p>

    <div style={{marginTop: '3em', textAlign: 'center'}}>
      <img src="https://example.com/moth-dance.jpg" alt="The Moth's Dance" width="100%" />
    </div>
    
    <p style={{marginTop: '3em', position: 'relative', zIndex: '1'}}>
      There is a certain elegance to the way a moth dances, its wings fluttering in rhythm with the sway of its body. The delicate Coleophora vibicella seems especially gifted in this regard; it moves with such grace and fluidity that one might mistake it for a creature of myth, born from the very essence of nature's artistry.</p>
    
    <blockquote style={{
      borderLeft: '3px solid #8B3A2E',
      fontSize: '1.4em',
      marginTop: '2em',
      paddingLeft: '0.6em'
    }}>
      "In the dance of life, it is often the smallest creatures that leave the most lasting impressions."</blockquote>
    
    <p style={{marginTop: '1em', position: 'relative', zIndex: '1'}}>
      As we wander through European wildflower meadows or explore hidden corners of our own backyards, let us remember to pause and appreciate these tiny dancers - for they remind us that beauty can be found in the most unexpected places.</p>
    
    <div style={{marginTop: '3em', textAlign: 'center'}}>
      <a href="/gallery" style={{
        backgroundColor: '#D97A57',
        color: '#F4EFE6',
        display: 'inline-block',
        fontSize: '0.8em',
        marginBottom: '1em',
        padding: '0.6em 1em',
        position: 'relative',
        textDecoration: 'none',
        top: '-0.4em'
      }}>Explore the Gallery</a>
    </div>
    
  </div>
);