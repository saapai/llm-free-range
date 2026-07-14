"use client";

import React from 'react';

export default () => (
<div style={{ display: 'flex', minHeight: '100vh' }}>
   <div>
      <h2 style={{ fontWeight: 'bold', color: '#6C5CE7' }}>Eternal Becoming</h2>
        <p style={{ lineHeight: 1.5, maxWidth: '48ch', color: '#CCC' }}>
          A vast, swirling galaxy stretches across the canvas, its spiraling arms composed of vibrant shades of blues and purples. At the heart of the galaxy, a brilliant supernova explodes, casting waves of light and energy outwards into the darkness. The viewer is immersed in this cosmic dance, feeling both insignificant and profoundly connected to the endless cycle of creation and destruction.
        </p>
   </div>
   <div style={{ flex: 1, backgroundImage: `url('https://images.unsplash.com/photo-1604937548948-2ecfa4a2f2c1')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
</div>);