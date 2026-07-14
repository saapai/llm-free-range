"use client";

import React, { useRef } from 'react'

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#2E3A5C" }}>
      <canvas ref={canvasRef} width="100%" height="100%" />
      <h1 style={{ color: "#F4EFE6", fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)`, marginBottom: "1em" }}>The Vast Expanse</h1>
      <p style={{ color: "#F4EFE6", fontSize: "18px", lineHeight: "1.5", width: "44rem", marginLeft: "auto", marginRight: "auto", marginBottom: "2em" }}>
        As we gaze into the night sky, our imaginations stretch to encompass the vast expanse of the cosmos. Galaxies swirl in a majestic dance, their stars twinkling like distant dreams. Nebulae cast ethereal glows, reminding us of the infinite tapestry that surrounds us. In this moment of curiosity and eagerness, we feel both small and connected to something greater than ourselves.
      </p>
    </div>
  )
}