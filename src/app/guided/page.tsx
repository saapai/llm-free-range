"use client";

export default function KintsugiSouls() {
  return (
<div style={{ minHeight: "100vh", backgroundColor: "#F4EFE6" }}>
    <header>
        <h1 style={{ textAlign: "center", fontSize: `clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)` }}>Kintsugi Souls</h1>
        <hr style={{ borderColor: "#1C1A17" }} />
    </header>
    <main style={{ padding: "3rem", maxWidth: "44rem", margin: "0 auto" }}>
        <p style={{ fontStyle: "italic", fontWeight: 500, letterSpacing: "-.02em", lineHeight: "1.92" }}>
            A multimedia installation featuring a golden web of broken pottery pieces, symbolizing our interconnected lives. The viewer walks through the labyrinthine space, reading fragments from the archive — stories of triumphs, tragedies, and transformations. A live feed of real-time global news is projected on the walls, emphasizing the constant need for repair in our ever-changing world.</p>
        <blockquote style={{ borderLeft: "3px solid #8B3A2E", paddingLeft: "1rem", marginBottom: "2rem" }}>
            "In brokenness, we find beauty. Our scars tell a story of healing and resilience."
        </blockquote>
        <p style={{ fontStyle: "italic", fontWeight: 500, letterSpacing: "-.02em", lineHeight: "1.92" }}>
            The art of Kintsugi teaches us that there is beauty in imperfection. Each broken piece, when joined with gold, creates a unique and powerful work of art. So too do our lives, when mended with love and understanding, become stronger and more beautiful than before.</p>
    </main>
</div>
);
}