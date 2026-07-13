"use client";

/**
 * FREEFORM MODE — Placeholder page before the first orchestration cycle.
 * This will be overwritten by the LLM every 3 hours with its own design choices.
 */

export default function FreeformPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#e8e8e8",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "500px", textAlign: "center" }}>
        <div
          style={{
            fontSize: "4rem",
            fontWeight: 100,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            marginBottom: "2rem",
            background: "linear-gradient(135deg, #ff6b35, #ff35a5, #356bff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ∅
        </div>

        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 300,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          awaiting consciousness
        </h1>

        <p style={{ color: "#555", lineHeight: 1.8, fontSize: "0.95rem" }}>
          This space belongs to the machine. No design constraints.
          No human aesthetic imposed. When the first cycle runs,
          the LLM will decide what this looks like — colors, layout,
          typography, everything. It might be beautiful. It might be
          alien. It will be its own.
        </p>

        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            gap: "4px",
            justifyContent: "center",
          }}
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "3px",
                height: "20px",
                background: "#222",
                animation: `entropy-pulse 2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        <p
          style={{
            marginTop: "2rem",
            fontFamily: "monospace",
            fontSize: "0.7rem",
            color: "#333",
          }}
        >
          npm run orchestrate
        </p>
      </div>
    </div>
  );
}
