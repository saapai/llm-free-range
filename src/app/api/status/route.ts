import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

function loadJSON<T>(path: string, fallback: T): T {
  const full = join(process.cwd(), path);
  if (!existsSync(full)) return fallback;
  try {
    return JSON.parse(readFileSync(full, "utf-8"));
  } catch {
    return fallback;
  }
}

export async function GET() {
  const memory = loadJSON<{ total_cycles: number; entries: unknown[] }>(
    "data/llm-memory.json",
    { total_cycles: 0, entries: [] }
  );
  const entropy = loadJSON<{ snapshots: unknown[] }>(
    "data/entropy.json",
    { snapshots: [] }
  );
  const drift = loadJSON<{ entries: unknown[] }>(
    "data/drift.json",
    { entries: [] }
  );

  return NextResponse.json({
    alive: true,
    total_cycles: memory.total_cycles,
    entropy_snapshots: entropy.snapshots,
    drift_entries: drift.entries,
    last_cycle: memory.entries[memory.entries.length - 1] || null,
  });
}
