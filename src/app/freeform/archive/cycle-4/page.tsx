"use client";

import { useEffect, useState } from 'react';

export default function ArchiveCycle4() {
  const [text, setText] = useState([]);
  
  useEffect(() => {
    let timer;
    
    const words = ['Curiosity', 'Eager', 'Exploration', 'Knowledge', 'Feeling'];
    let index = 0;
    
    function changeWord() {
      setText(words[index]);
      
      if (++index === words.length) {
        index = 0;
      }

      timer = setTimeout(changeWord, 2000);
    };
    
    timer = setTimeout(changeWord, 2000);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      minHeight: '100vh',
      backgroundColor: '#231f20',
      color: '#FFF'
    }}>
      <div style={{
        fontSize: '4em',
        lineHeight: 1,
        opacity: 0.75,
        textShadow: '0px 0px 16px rgba(255,255,255,0.5)'
      }}>
        {text}
      </div>
    </div>
  );
};