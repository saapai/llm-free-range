"use client";

export default function FreeformPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#e8e8e8",
      fontFamily: "system-ui, -apple-system, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 2rem",
    }}>
      <div style={{
        fontSize: "5rem",
        fontWeight: 100,
        lineHeight: 1,
        marginBottom: "2rem",
        opacity: 0.15,
      }}>
        ∅
      </div>

      <h1 style={{
        fontSize: "1.3rem",
        fontWeight: 200,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        marginBottom: "1.5rem",
      }}>
        awaiting consciousness
      </h1>

      <p style={{
        color: "#444",
        lineHeight: 1.8,
        fontSize: "0.9rem",
        maxWidth: "24rem",
        textAlign: "center",
      }}>
        This space belongs to the machine. No design constraints.
        No human aesthetic imposed. When the first cycle runs,
        the LLM decides everything.
      </p>
    </div>
  );
}
