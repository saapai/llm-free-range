"use client";

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

import React, { useRef, useEffect } from 'react';

export default function ArchiveCycle56() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      
      // Add objects to the scene here...
      
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);
      camera.position.z = 3;
      
      const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
      renderer.setSize(window.innerWidth, window.innerHeight);

      function animate() {
        requestAnimationFrame(animate);
        
        // Add animation logic here...
        
        renderer.render(scene, camera);
      }
      
      animate();
    }
  }, []);
  
  return (
    <div style={{minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <canvas ref={canvasRef}></canvas>
      
      <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "#fff", fontSize: "2rem"}}>
        Eternal Becoming
      </div>
    </div>
  );
}