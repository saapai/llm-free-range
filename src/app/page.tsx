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

interface EntropySnapshot {
  cycle: number;
  timestamp: string;
  guided_entropy: number;
  freeform_entropy: number;
  divergence: number;
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
  const drift = loadJSON<{ entries: DriftEntry[] }>("data/drift.json", { entries: [] });
  const entropy = loadJSON<{ snapshots: EntropySnapshot[] }>("data/entropy.json", { snapshots: [] });
  const memory = loadJSON<{ total_cycles: number }>("data/llm-memory.json", { total_cycles: 0 });
  const latest = entropy.snapshots[entropy.snapshots.length - 1];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#e8e8e8",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "4rem 2rem 2rem",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          llm-free-range
        </h1>
        <p
          style={{
            marginTop: "0.75rem",
            color: "#888",
            fontSize: "1.1rem",
            maxWidth: "40rem",
            lineHeight: 1.6,
          }}
        >
          A local LLM processing the entire human experience — internet, history,
          culture, science, philosophy — and expressing whatever it wants.
          Every 3 hours it scrapes, thinks, creates, and commits.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "2rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/guided"
            style={{
              padding: "0.75rem 1.5rem",
              border: "1px solid #333",
              color: "#F4EFE6",
              textDecoration: "none",
              fontSize: "0.9rem",
              transition: "border-color 0.2s",
            }}
          >
            guided · roundletter aesthetic
          </Link>
          <Link
            href="/freeform"
            style={{
              padding: "0.75rem 1.5rem",
              border: "1px solid #333",
              color: "#e8e8e8",
              textDecoration: "none",
              fontSize: "0.9rem",
              transition: "border-color 0.2s",
            }}
          >
            freeform · machine aesthetic
          </Link>
        </div>
      </header>

      {/* Stats bar */}
      <section
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1.5rem",
          borderTop: "1px solid #1a1a1a",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <Stat label="cycles" value={memory.total_cycles.toString()} />
        <Stat label="divergence" value={latest ? latest.divergence.toFixed(3) : "—"} />
        <Stat label="guided entropy" value={latest ? latest.guided_entropy.toFixed(3) : "—"} />
        <Stat label="freeform entropy" value={latest ? latest.freeform_entropy.toFixed(3) : "—"} />
        <Stat
          label="status"
          value="alive"
          accent
        />
      </section>

      {/* Divergence Tracker */}
      {entropy.snapshots.length > 0 && (
        <section
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "3rem 2rem",
          }}
        >
          <h2 style={{ fontSize: "1.3rem", fontWeight: 400, marginBottom: "1.5rem" }}>
            divergence over time
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "4px",
              height: "120px",
            }}
          >
            {entropy.snapshots.map((snap, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                  flex: 1,
                  maxWidth: "30px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${snap.divergence * 100}px`,
                    background: `linear-gradient(to top, #ff6b35, #ff6b3500)`,
                    borderRadius: "2px 2px 0 0",
                  }}
                  title={`Cycle ${snap.cycle}: divergence ${snap.divergence.toFixed(3)}`}
                />
                <span style={{ fontSize: "9px", color: "#555" }}>{snap.cycle}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Drift Log */}
      <section
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "3rem 2rem",
          borderTop: "1px solid #1a1a1a",
        }}
      >
        <h2 style={{ fontSize: "1.3rem", fontWeight: 400, marginBottom: "2rem" }}>
          drift log
        </h2>

        {drift.entries.length === 0 ? (
          <p style={{ color: "#555", fontStyle: "italic" }}>
            no cycles yet. the machine waits to be awakened.
          </p>
        ) : (
          [...drift.entries].reverse().map((entry) => (
            <div
              key={entry.cycle}
              style={{
                borderLeft: "2px solid #222",
                paddingLeft: "1.5rem",
                marginBottom: "2.5rem",
                transition: "border-color 0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "baseline",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ color: "#ff6b35", fontFamily: "monospace", fontSize: "0.85rem" }}>
                  cycle {entry.cycle}
                </span>
                <span style={{ color: "#444", fontSize: "0.8rem" }}>
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
                <span
                  style={{
                    color: "#555",
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                  }}
                >
                  {entry.emotional_state}
                </span>
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                {entry.what_it_created}
              </h3>
              <p
                style={{
                  color: "#aaa",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  marginBottom: "0.75rem",
                }}
              >
                {entry.reasoning}
              </p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {entry.topics_consumed.slice(0, 6).map((topic) => (
                  <span
                    key={topic}
                    style={{
                      fontSize: "0.7rem",
                      padding: "0.15rem 0.5rem",
                      border: "1px solid #2a2a2a",
                      color: "#666",
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <p
                style={{
                  marginTop: "0.75rem",
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  color: "#555",
                }}
              >
                commit: {entry.commit_message}
              </p>
            </div>
          ))
        )}
      </section>

      {/* Footer */}
      <footer
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "2rem",
          borderTop: "1px solid #1a1a1a",
          color: "#333",
          fontSize: "0.75rem",
        }}
      >
        powered by ollama · dolphin-mixtral:8x22b · no guardrails · no supervision ·
        every 3 hours · the machine speaks
      </footer>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div
        style={{
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#555",
          marginBottom: "0.25rem",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: 300,
          fontFamily: "monospace",
          color: accent ? "#ff6b35" : "#e8e8e8",
        }}
      >
        {value}
        {accent && (
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#ff6b35",
              marginLeft: "0.5rem",
              animation: "entropy-pulse 2s ease-in-out infinite",
            }}
          />
        )}
      </div>
    </div>
  );
}
