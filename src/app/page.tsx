import Link from "next/link";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

interface DriftEntry {
  cycle: number;
  timestamp: string;
  commit_message: string;
  reasoning: string;
  topics_consumed: string[];
  what_it_created: string;
  emotional_state: string;
  design_choices: string;
}

function loadJSON<T>(path: string, fallback: T): T {
  const full = join(process.cwd(), path);
  if (!existsSync(full)) return fallback;
  try {
    return JSON.parse(readFileSync(full, "utf-8"));
  } catch {
    return fallback;
  }
}

export default function Home() {
  const guidedDrift = loadJSON<{ entries: DriftEntry[] }>("data/drift-guided.json", { entries: [] });
  const freeformDrift = loadJSON<{ entries: DriftEntry[] }>("data/drift-freeform.json", { entries: [] });
  const guidedMemory = loadJSON<{ total_cycles: number }>("data/memory-guided.json", { total_cycles: 0 });
  const freeformMemory = loadJSON<{ total_cycles: number }>("data/memory-freeform.json", { total_cycles: 0 });

  // Interleave both drift logs by timestamp
  const allDrift = [
    ...guidedDrift.entries.map((e) => ({ ...e, mode: "guided" as const })),
    ...freeformDrift.entries.map((e) => ({ ...e, mode: "freeform" as const })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#e8e8e8",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      {/* Header */}
      <header style={{
        maxWidth: "72rem",
        margin: "0 auto",
        padding: "5rem 2rem 2rem",
      }}>
        <h1 style={{
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: 200,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
        }}>
          llm-free-range
        </h1>
        <p style={{
          marginTop: "1.25rem",
          color: "#777",
          fontSize: "1.15rem",
          maxWidth: "36rem",
          lineHeight: 1.7,
          fontStyle: "italic",
        }}>
          A local LLM making modern art about the human experience.
          It scrapes the living internet — poetry, news, philosophy, science,
          the voices of strangers — and creates something that makes you feel.
          Every 3 hours. No supervision. No guardrails.
        </p>
      </header>

      {/* Two doors */}
      <section style={{
        maxWidth: "72rem",
        margin: "0 auto",
        padding: "3rem 2rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
      }}>
        <Link href="/guided" style={{
          display: "block",
          padding: "2.5rem 2rem",
          background: "#F4EFE6",
          color: "#1C1A17",
          textDecoration: "none",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#8B3A2E",
            marginBottom: "1rem",
          }}>
            guided · roundletter aesthetic
          </div>
          <div style={{
            fontSize: "1.6rem",
            fontFamily: "Georgia, Cambria, serif",
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: 1.3,
            marginBottom: "0.75rem",
          }}>
            {guidedDrift.entries.at(-1)?.what_it_created || "Awaiting first cycle"}
          </div>
          <div style={{
            fontSize: "0.8rem",
            color: "#6B6560",
            lineHeight: 1.6,
          }}>
            {guidedMemory.total_cycles} cycles · constrained by craft
          </div>
        </Link>

        <Link href="/freeform" style={{
          display: "block",
          padding: "2.5rem 2rem",
          background: "#111",
          color: "#e8e8e8",
          textDecoration: "none",
          border: "1px solid #222",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#ff6b35",
            marginBottom: "1rem",
          }}>
            freeform · no constraints
          </div>
          <div style={{
            fontSize: "1.6rem",
            fontWeight: 300,
            lineHeight: 1.3,
            marginBottom: "0.75rem",
          }}>
            {freeformDrift.entries.at(-1)?.what_it_created || "Awaiting first cycle"}
          </div>
          <div style={{
            fontSize: "0.8rem",
            color: "#666",
            lineHeight: 1.6,
          }}>
            {freeformMemory.total_cycles} cycles · pure machine aesthetic
          </div>
        </Link>
      </section>

      {/* Combined drift log */}
      <section style={{
        maxWidth: "72rem",
        margin: "0 auto",
        padding: "3rem 2rem",
        borderTop: "1px solid #1a1a1a",
      }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 300, marginBottom: "2.5rem", letterSpacing: "0.05em" }}>
          drift log · what the machine chose and why
        </h2>

        {allDrift.length === 0 ? (
          <p style={{ color: "#444", fontStyle: "italic", lineHeight: 1.8 }}>
            the canvas is blank. the machine waits to be awakened.<br />
            <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#333", marginTop: "1rem", display: "block" }}>
              npm run orchestrate:guided<br />
              npm run orchestrate:freeform
            </span>
          </p>
        ) : (
          allDrift.map((entry, i) => (
            <div key={`${entry.mode}-${entry.cycle}`} style={{
              borderLeft: `2px solid ${entry.mode === "guided" ? "#8B3A2E" : "#ff6b35"}`,
              paddingLeft: "1.5rem",
              marginBottom: "3rem",
              opacity: i > 10 ? 0.5 : 1,
            }}>
              <div style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "baseline",
                marginBottom: "0.5rem",
                flexWrap: "wrap",
              }}>
                <span style={{
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: entry.mode === "guided" ? "#8B3A2E" : "#ff6b35",
                  fontFamily: "monospace",
                }}>
                  {entry.mode} #{entry.cycle}
                </span>
                <span style={{ color: "#333", fontSize: "0.75rem" }}>
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
                <span style={{
                  color: "#555",
                  fontSize: "0.75rem",
                  fontStyle: "italic",
                }}>
                  {entry.emotional_state}
                </span>
              </div>

              <h3 style={{
                fontSize: "1.15rem",
                fontWeight: 400,
                marginBottom: "0.6rem",
                fontFamily: entry.mode === "guided" ? "Georgia, serif" : "system-ui, sans-serif",
              }}>
                {entry.what_it_created}
              </h3>

              <p style={{
                color: "#999",
                fontSize: "0.9rem",
                lineHeight: 1.8,
                marginBottom: "0.75rem",
                maxWidth: "50rem",
              }}>
                {entry.reasoning}
              </p>

              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                {entry.topics_consumed.slice(0, 8).map((topic) => (
                  <span key={topic} style={{
                    fontSize: "0.65rem",
                    padding: "0.1rem 0.45rem",
                    border: "1px solid #222",
                    color: "#555",
                  }}>
                    {topic}
                  </span>
                ))}
              </div>

              <p style={{
                fontFamily: "monospace",
                fontSize: "0.7rem",
                color: "#444",
                fontStyle: "italic",
              }}>
                {entry.commit_message}
              </p>
            </div>
          ))
        )}
      </section>

      <footer style={{
        maxWidth: "72rem",
        margin: "0 auto",
        padding: "2rem",
        borderTop: "1px solid #111",
        color: "#2a2a2a",
        fontSize: "0.7rem",
        lineHeight: 1.8,
      }}>
        powered by ollama · dolphin-mixtral:8x22b · two independent creative loops ·
        one constrained by craft, one free to be anything ·
        the git log is part of the art
      </footer>
    </div>
  );
}
