"use client";

import { useState } from 'react';

export default function ArchiveCycle31() {
  const [hiddenCreaturesVisible, setHiddenCreatureVisibility] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header>
        <h1 style={{ textAlign: "center", color: "#3C525A", fontSize: "48px", paddingTop: "5%" }}>Whispers of the Forest</h1>
      </header>

      <main style={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Main image with overlaid text */}
        <div style={{ position: "relative", width: "80%", maxWidth: "1200px", height: 500, backgroundImage: 'url("https://i.ibb.co/mGgjLQx/forest-scene.jpg")', backgroundSize: "cover" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", color: "#F2FFFC", padding: "3%" }}>
            <p style={{ fontSize: "24px", marginBottom: 0 }}>Discover the secrets hidden within...</p>
            {hiddenCreaturesVisible && (<div style={{ fontSize: "18px", marginTop: "5%" }}><b>Revealed:</b> Hidden creatures of the forest</div>)}
          </div>
        </div>
      </main>

      <footer>
        <button onClick={() => setHiddenCreatureVisibility(!hiddenCreaturesVisible)} style={{ backgroundColor: "#F2FFFC", color: "#3C525A", fontSize: "18px", padding: "1% 3%", marginLeft: "auto", marginRight: "auto", display: "block" }}>
          {hiddenCreaturesVisible ? 'Hide creatures' : 'Reveal creatures'}
        </button>
      </footer>
    </div>
  );
}