"use client";

`use client`
import { useState } from 'react';

export default () => {
  const [textVisible, setTextVisible] = useState(false);
  
  setTimeout(() => {
    setTextVisible(true);
  }, 1000);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {textVisible && <p style={{ color: '#fff', fontSize: 32, marginBottom: 0 }}>Indifferent Universe</p>}
      {textVisible && <span style={{ color: '#ffb39f', fontSize: 18, marginTop: 8 }}>A vast expanse of swirling galaxies and nebulae...</span>}
    </div>
  );
};