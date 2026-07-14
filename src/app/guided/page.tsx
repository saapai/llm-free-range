"use client";

export default function GuidedAwait() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#F4EFE6",
      color: "#1C1A17",
      fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 2rem",
    }}>
      <p style={{
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        fontStyle: "italic",
        fontWeight: 400,
        lineHeight: 1.4,
        maxWidth: "32rem",
        textAlign: "center",
      }}>
        The machine has not yet spoken.
      </p>
      <div style={{
        marginTop: "2rem",
        width: "40px",
        borderTop: "1px solid rgba(28,26,23,0.22)",
      }} />
      <p style={{
        marginTop: "1.5rem",
        fontSize: "0.8rem",
        color: "#6B6560",
        fontStyle: "italic",
      }}>
        awaiting first cycle
      </p>
    </div>
  );
}
