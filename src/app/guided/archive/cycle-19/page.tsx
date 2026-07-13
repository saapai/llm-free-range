"use client";

typescript
import React from 'react';

export default function ArchiveCycle19() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <header>
        <h1>Moose Bay Mirrored</h1>
        <p className="mood">Curious and Eager</p>
      </header>
      
      <main>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <section>
            <p><em>"The viewer sees a serene landscape of Kenosee Lake, with its calm waters reflecting the vibrant foliage around Moose Bay. A subtle breeze creates gentle ripples on the surface, blurring and blending the colors together."</em></p>
          </section>
          
          <div style={{ backgroundImage: 'url(https://example.com/kenosee-lake-moose-bay.jpg)', width: '40%', height: 500, backgroundSize: 'cover' }} />
        </div>
        
        <section className="description">
          <p>"The sky is painted in hues of orange and purple as the sun sets behind the distant hills."</p>
          <p>"One can almost feel the tranquility of the scene, as if taking a deep breath of fresh Canadian air."</p>
        </section>
      </main>
    </div>
  );
}