"use client";

export default function EphemeralMonuments() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #001f3f, #000a1f)",
        color: "white",
        position: "relative",
        padding: "4rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          maxWidth: "600px",
          color: "#FFD700",
          textShadow: "0 0 20px #FFD700",
          fontSize: "24px",
          lineHeight: "1.8",
        }}
      >
        <p>
          She became a senator not for power, but to hold the door open for
          others.
        </p>
        <p>
          Our bodies are borrowed time—13.8 billion years of stardust learning
          how to ache.
        </p>
        <p>
          The house sold to make room for machines that will never understand
          memory.
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          opacity: 0.2,
          fontSize: "18px",
          fontFamily: "monospace",
          transform: "rotate(-3deg)",
        }}
      >
        Moments are comets—bright, brief, burning away
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "8%",
          opacity: 0.15,
          fontSize: "22px",
          color: "#00ffe5",
          textShadow: "0 0 8px #00ffe5",
        }}
      >
        In the silence between stars, we carve our names
      </div>

      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "70%",
          opacity: 0.3,
          fontSize: "14px",
          transform: "skewX(-10deg)",
          color: "#ffffff80",
        }}
      >
        The universe remembers what we cannot
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.08,
          fontSize: "36px",
          color: "#ff6347",
          fontWeight: "bold",
        }}
      >
        Eternity is the hourglass we never finish holding
      </div>

      <div
        style={{
          position: "absolute",
          top: "25%",
          right: "20%",
          opacity: 0.1,
          fontSize: "20px",
          color: "#ffffff66",
          textShadow: "1px 1px 5px #000000",
        }}
      >
        Time is a prism, shattering forever into now
      </div>

      <div
        style={{
          position: "absolute",
          top: "80%",
          left: "25%",
          opacity: 0.25,
          fontSize: "16px",
          color: "#00ffe5",
          transform: "rotate(5deg)",
        }}
      >
        We are fossils of stardust, dreaming in gravity
      </div>
    </div>
  );
}