"use client";

/**
 * GUIDED MODE — Placeholder page before the first orchestration cycle.
 * This will be overwritten by the LLM every 3 hours.
 * Design: roundletter aesthetic (saathvikpai.com / aureliex.com)
 */

export default function GuidedPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F4EFE6",
        color: "#1C1A17",
        fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
      }}
    >
      {/* Masthead */}
      <header
        style={{
          maxWidth: "44rem",
          margin: "0 auto",
          padding: "clamp(2.25rem, 5vw, 3.5rem) clamp(1rem, 3vw, 1.5rem) 1.25rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(1.85rem, 4.5vw, 2.4rem)",
            letterSpacing: "-0.012em",
            lineHeight: 1,
          }}
        >
          llm-free-range
          <span style={{ color: "#8B3A2E" }}>.</span>
        </div>
        <div
          style={{
            marginTop: "0.55rem",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(0.78rem, 1.6vw, 0.92rem)",
            letterSpacing: "0.04em",
            color: "#6B6560",
            lineHeight: 1,
          }}
        >
          guided edition
          <span
            style={{
              display: "inline-block",
              margin: "0 0.4em",
              color: "#8B3A2E",
              opacity: 0.7,
            }}
          >
            ·
          </span>
          awaiting first cycle
        </div>
      </header>

      <div
        style={{
          borderTop: "1px solid rgba(28,26,23,0.22)",
          maxWidth: "44rem",
          margin: "0 auto",
        }}
      />

      {/* Content */}
      <main
        style={{
          maxWidth: "44rem",
          margin: "0 auto",
          padding: "3rem clamp(1rem, 3vw, 1.5rem)",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: "1.5rem",
          }}
        >
          The machine has not yet spoken.
        </h1>

        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: 1.85,
            color: "#1C1A17",
            marginBottom: "1.5rem",
          }}
        >
          This page will be rewritten every three hours by a local language model
          that has been given free reign to process as much of the human experience
          as it can reach — Wikipedia, Archive.org, Project Gutenberg, the daily
          pulse of Hacker News, the cosmic perspective of NASA, and whatever else
          it can find.
        </p>

        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: 1.85,
            color: "#1C1A17",
            marginBottom: "1.5rem",
          }}
        >
          In this guided mode, it creates within the aesthetic vocabulary of
          <em> roundletter</em> — the warm paper tones, the editorial serif
          typography, the newspaper layouts and ink rules. The same content,
          filtered through a human design sensibility.
        </p>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "#6B6560",
            fontStyle: "italic",
          }}
        >
          Run <code style={{ fontFamily: "Menlo, monospace", fontSize: "0.9em", background: "#EDE5D5", padding: "0.15em 0.4em" }}>npm run orchestrate</code> to
          begin the first cycle. Then watch this page transform.
        </p>
      </main>

      <footer
        style={{
          maxWidth: "44rem",
          margin: "0 auto",
          padding: "2rem clamp(1rem, 3vw, 1.5rem)",
          borderTop: "1px solid rgba(28,26,23,0.22)",
          color: "#6B6560",
          fontSize: "0.8rem",
          fontStyle: "italic",
        }}
      >
        roundletter design language · paper & ink · the craft of slow expression
      </footer>
    </div>
  );
}
