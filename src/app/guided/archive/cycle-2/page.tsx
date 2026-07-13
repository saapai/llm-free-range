"use client";

export default function ArchiveCycle2() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F4EFE6" }}>
      <header>
        <h1 style={{ textAlign: "center", color: "#1C1A17" }}>
          Kintsugi Souls
        </h1>
        <p style={{ fontStyle: "italic", textAlign: "center" }}>
          Contemplating Transience and Connection
        </p>
      </header>
      <main>
        <div style={{ maxWidth: "44rem", margin: "auto" }}>
          <p style={{ fontSize: "clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)" }}>
            The beauty of imperfection is found in the cracks and crevices that make us whole.
          </p>
          <blockquote style={{ borderLeft: "3px solid #8B3A2E" }}>
            Our scars are a testament to our journey, each one telling a story of growth and resilience.
          </blockquote>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <img src="https://example.com/image1.jpg" alt="Kintsugi Art" />
            <p>A broken pottery mended with gold, a symbol of embracing imperfection.</p>
          </div>
        </div>
      </main>
    </div>
  );
}