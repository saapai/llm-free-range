/**
 * Page templates — the LLM fills these with content via JSON.
 * This guarantees valid TSX every time. The LLM focuses on
 * thinking and writing, not fighting JSX syntax.
 */

export interface PageContent {
  title: string;
  subtitle: string;
  mood: string;
  sections: Array<{
    heading?: string;
    body: string; // can contain multiple paragraphs separated by \n\n
    style?: "normal" | "quote" | "aside" | "highlight" | "whisper";
  }>;
  fragments?: string[]; // short standalone phrases/observations
  footer?: string;
  cycle: number;
  timestamp: string;
  sources_touched: string[];
}

export function renderGuided(content: PageContent): string {
  const sections = content.sections.map((s, i) => {
    const paragraphs = s.body.split("\\n\\n").filter(Boolean);
    const pStyle = s.style === "quote"
      ? `borderLeft: "3px solid #8B3A2E", paddingLeft: "1.5rem", marginLeft: 0, fontStyle: "italic", color: "#3E4852"`
      : s.style === "aside"
      ? `fontSize: "0.9rem", color: "#6B6560", fontStyle: "italic"`
      : s.style === "highlight"
      ? `fontSize: "1.3rem", lineHeight: 1.6, fontWeight: 400`
      : s.style === "whisper"
      ? `fontSize: "0.85rem", color: "#6B6560", letterSpacing: "0.02em"`
      : ``;

    return `
      ${s.heading ? `<h2 style={{ fontSize: "clamp(1.4rem, 1.1rem + 1.1vw, 1.8rem)", fontWeight: 500, fontStyle: "italic", marginTop: "${i === 0 ? '0' : '3rem'}", marginBottom: "1.25rem", letterSpacing: "-0.01em" }}>${esc(s.heading)}</h2>` : ""}
      ${paragraphs.map((p) => `<p style={{ marginBottom: "1.5rem", ${pStyle} }}>${esc(p)}</p>`).join("\n      ")}
    `;
  }).join("\n");

  const fragmentsBlock = content.fragments && content.fragments.length > 0
    ? `
      <div style={{ borderTop: "1px solid rgba(28,26,23,0.22)", marginTop: "3rem", paddingTop: "2rem" }}>
        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "#8B3A2E", marginBottom: "1.5rem" }}>fragments gathered along the way</p>
        ${content.fragments.map((f) => `<p style={{ fontSize: "0.95rem", color: "#6B6560", marginBottom: "0.75rem", fontStyle: "italic" }}>${esc(f)}</p>`).join("\n        ")}
      </div>`
    : "";

  return `"use client";

export default function GuidedPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F4EFE6", color: "#1C1A17", fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}>
      <header style={{ maxWidth: "44rem", margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) clamp(1rem, 3vw, 1.5rem) 1.5rem", textAlign: "center" }}>
        <div style={{ fontStyle: "italic", fontWeight: 500, fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", letterSpacing: "-0.012em", lineHeight: 1 }}>
          llm-free-range<span style={{ color: "#8B3A2E" }}>.</span>
        </div>
        <div style={{ marginTop: "0.5rem", fontStyle: "italic", fontSize: "0.82rem", letterSpacing: "0.04em", color: "#6B6560" }}>
          guided edition <span style={{ color: "#8B3A2E", opacity: 0.7 }}>·</span> cycle ${content.cycle}
        </div>
      </header>

      <div style={{ borderTop: "1px solid rgba(28,26,23,0.22)", maxWidth: "44rem", margin: "0 auto" }} />

      <main style={{ maxWidth: "44rem", margin: "0 auto", padding: "2.5rem clamp(1rem, 3vw, 1.5rem) 4rem" }}>
        <h1 style={{ fontSize: "clamp(2rem, 1.2rem + 4vw, 3.5rem)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "0.75rem" }}>
          ${esc(content.title)}
        </h1>
        <p style={{ fontSize: "1.05rem", fontStyle: "italic", color: "#6B6560", marginBottom: "0.5rem" }}>
          ${esc(content.subtitle)}
        </p>
        <p style={{ fontSize: "0.75rem", color: "#8B3A2E", letterSpacing: "0.05em", marginBottom: "2.5rem" }}>
          ${esc(content.mood)}
        </p>

        <div style={{ borderTop: "1px solid rgba(28,26,23,0.12)", paddingTop: "2rem" }}>
          ${sections}
        </div>

        ${fragmentsBlock}
      </main>

      <footer style={{ maxWidth: "44rem", margin: "0 auto", padding: "2rem clamp(1rem, 3vw, 1.5rem)", borderTop: "1px solid rgba(28,26,23,0.22)", color: "#6B6560", fontSize: "0.75rem", fontStyle: "italic" }}>
        ${esc(content.footer || `cycle ${content.cycle} · ${content.sources_touched.length} sources · ${content.timestamp.slice(0, 10)}`)}
      </footer>
    </div>
  );
}`;
}

export function renderFreeform(content: PageContent): string {
  const sections = content.sections.map((s, i) => {
    const paragraphs = s.body.split("\\n\\n").filter(Boolean);
    const colors = ["#ff6b35", "#35ffa5", "#a535ff", "#ff3565", "#35c9ff", "#ffcc35", "#ff35d5"];
    const accentColor = colors[i % colors.length];

    if (s.style === "quote") {
      return `
        <div style={{ borderLeft: "3px solid ${accentColor}", paddingLeft: "1.5rem", margin: "2.5rem 0" }}>
          ${paragraphs.map((p) => `<p style={{ fontSize: "1.15rem", lineHeight: 1.7, opacity: 0.85 }}>${esc(p)}</p>`).join("\n          ")}
        </div>`;
    }
    if (s.style === "highlight") {
      return `
        <div style={{ margin: "3rem 0", padding: "2rem", background: "rgba(255,255,255,0.03)", borderRadius: "2px" }}>
          ${s.heading ? `<h2 style={{ fontSize: "1.8rem", fontWeight: 300, marginBottom: "1rem", color: "${accentColor}" }}>${esc(s.heading)}</h2>` : ""}
          ${paragraphs.map((p) => `<p style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>${esc(p)}</p>`).join("\n          ")}
        </div>`;
    }
    if (s.style === "whisper") {
      return `
        <div style={{ margin: "2rem 0", opacity: 0.4, fontSize: "0.85rem" }}>
          ${paragraphs.map((p) => `<p style={{ marginBottom: "0.5rem" }}>${esc(p)}</p>`).join("\n          ")}
        </div>`;
    }

    return `
      <div style={{ marginBottom: "3rem" }}>
        ${s.heading ? `<h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)", fontWeight: 300, marginBottom: "1rem", letterSpacing: "-0.02em" }}>${esc(s.heading)}</h2>` : ""}
        ${paragraphs.map((p) => `<p style={{ fontSize: "1.05rem", lineHeight: 1.85, marginBottom: "1rem", opacity: 0.9 }}>${esc(p)}</p>`).join("\n        ")}
      </div>`;
  }).join("\n");

  const fragmentsBlock = content.fragments && content.fragments.length > 0
    ? `
      <div style={{ borderTop: "1px solid #222", marginTop: "3rem", paddingTop: "2rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        ${content.fragments.map((f, i) => {
          const colors = ["#ff6b35", "#35ffa5", "#a535ff", "#ff3565", "#35c9ff"];
          return `<span style={{ fontSize: "0.8rem", padding: "0.3rem 0.7rem", border: "1px solid #333", color: "${colors[i % colors.length]}", opacity: 0.7 }}>${esc(f)}</span>`;
        }).join("\n        ")}
      </div>`
    : "";

  return `"use client";

export default function FreeformPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e8e8e8", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 4vw, 2.5rem)" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.25em", color: "#ff6b35", marginBottom: "1rem" }}>
            freeform · cycle ${content.cycle}
          </p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 200, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "1rem" }}>
            ${esc(content.title)}
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#888", fontStyle: "italic", marginBottom: "0.5rem" }}>
            ${esc(content.subtitle)}
          </p>
          <p style={{ fontSize: "0.8rem", color: "#555" }}>
            ${esc(content.mood)}
          </p>
        </div>

        <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "2.5rem" }}>
          ${sections}
        </div>

        ${fragmentsBlock}

        <footer style={{ marginTop: "4rem", paddingTop: "1.5rem", borderTop: "1px solid #111", color: "#333", fontSize: "0.7rem" }}>
          ${esc(content.footer || `cycle ${content.cycle} · ${content.sources_touched.length} sources · ${content.timestamp.slice(0, 10)}`)}
        </footer>
      </div>
    </div>
  );
}`;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}
