"use client";

export default function ArchiveCycle19() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
      minHeight: '100vh'
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485 496">
        <defs>
          <radialGradient id="a" cx="0.5" cy="0.127" r="1.218">
            <stop stopColor="#FFC34A"/>
            <stop offset="1" stopColor="#F98E3B"/>
          </radialGradient>
        </defs>
        <path fill="url(#a)" d="M0 275.6l341-31c86.5,12.6 156.6,69.2 163.6,141.5 10.3,96.3 -61.2,175.2 -149.2,205.9C389.6,491.5 335.8,496 280,496S224.4,491.5 214,476.7c-77.2-29 -123.5,-83.2 -149.2,-205.9C25.5,344.8 98.4,266 179,252.9l-341,31C97.2,255.5 37.4,260 0,275.6z"/>
        <path fill="#FFF" d="M281.2,275c95.3,0 173,-77.7 173,-173s-77.7,-173 -173,-173S108.2,182.7 108.2,275zm-46,-19C234.9,260.7 231.7,260.2 231,260a1,1,0,0,1-.4-.4l-45.8-33.6c-5.3,-4.4 -13.9,-5.3 -18.8,-1.7s-8.3,13.9 -1.7,18.8L209.2,265a.98.98,0,0,0,1,.4l46,33.6c4.9,4 13.6,4.9 18.8,1.7s8.3-13.9 1.7-18.8L235.2,261Z"/>
      </svg>
      <h1 style={{
        fontSize: '2em',
        color: '#FFF',
        marginTop: '2rem'
      }}>Eternal Becoming</h1>
      <p style={{
        fontSize: '1.5em',
        color: '#FFF',
        maxWidth: '60%',
        textAlign: 'center',
        lineHeight: 1.5,
        marginTop: '2rem'
      }}>The universe unfolds before us, a cosmic tapestry of infinite possibility. As we gaze upon the swirling expanse of vibrant colors and abstract shapes, let us embrace our place within this vastness — ever-changing, always becoming.</p>
    </div>
  );
}