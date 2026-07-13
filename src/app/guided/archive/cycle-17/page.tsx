"use client";

`use client`

export default function ArchiveCycle17() {
  return (
    <div style={{minHeight: '100vh', backgroundColor: '#2E3A5C'}}>
      <header style={{backgroundColor: '#F4EFE6', padding: '1rem'}}>
        <h1 style={{fontSize: 'clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)', fontFamily: 'Cormorant Garamond, Georgia', lineHeight: 1.92}}>Whispers of the Deep</h1>
      </header>
      
      <div style={{maxWidth: '44rem', margin: '0 auto', padding: '2rem'}}>
        <p style={{color: '#6B6560', fontSize: '1.2rem', lineHeight: 1.92, marginBottom: '2rem'}}>
          The ocean whispers secrets in the language of waves. It calls us to explore its depths, promising a world teeming with life and wonder. As we delve into this aquatic realm, our senses are overwhelmed by vibrant colors, surreal shapes, and the ethereal dance of light through water. Here, time slows down, and we find ourselves at once enchanted and humbled by the vastness and majesty of nature.
        </p>
        
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <img src='/coral_reef.jpg' alt='Vibrant coral reefs' style={{width: '48%', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, .3)', marginBottom: '1rem'}} />
          <img src='/school_of_fish.jpg' alt='School of colorful fish' style={{width: '48%', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, .3)', marginBottom: '1rem'}} />
        </div>
        
        <p style={{color: '#6B6560', fontSize: '1.2rem', lineHeight: 1.92, marginBottom: '2rem'}}>
          Schools of fish swirl in a hypnotic ballet, their scales reflecting the sun's rays like precious jewels. The coral reef is an intricate tapestry of color and texture, home to countless species that thrive within its protective embrace. And then there are creatures so magnificent they seem to defy reality – like sea turtles, whose ancient gaze speaks of untold stories and wisdom passed down through generations.
        </p>
        
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <img src='/sea_turtle.jpg' alt='Majestic sea turtle' style={{width: '70%', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, .3)'}} />
        </div>
      </div>
    </div>
  )
}