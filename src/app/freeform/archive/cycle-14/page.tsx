"use client";

import { useState } from 'react'
const EternalOdyssey = () => {
 const [scrollPosition, setScrollPosition] = useState(0)
 const handleScroll = (event: any) => {
   let position = event.target.documentElement.scrollTop;
   setScrollPosition(position);
 };
 return (
 <div style={{minHeight:"100vh", display: 'flex', flexDirection: 'column'}}>
  <header style={{backgroundColor:'black', color:'white', textAlign:'center', fontSize:'2rem', padding:'1em', position:'sticky', top:0, zIndex:99}}>Eternal Odyssey</header>
  <main style={{flexGrow:1, overflowY:"auto", backgroundColor:'grey' }}>
    <div style={{display:"grid", placeItems:"center" ,height:'80vh', fontSize:'3rem'}}>
      <p >
        "The wanderer traversed the ancient forest, guided by the moonlight that filtered through the twisted branches above. The gnarled trees stood as sentinels, their tangled vines whispering secrets in the stillness of night. In this timeless journey, he sought wisdom, peace, and a glimpse into the mysteries that lay beyond."
      </p>
    </div>
  </main>
   <footer style={{backgroundColor:'black', color:'white', textAlign:'center', padding:'.5em'}} >The Timeless Journey</footer>
 </div>
)
}
export default EternalOdyssey