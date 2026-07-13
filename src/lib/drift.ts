/**
 * Drift log — each cycle the LLM explains what it did and why.
 * Each mode has its own drift log.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

function driftPath(mode?: string): string {
  if (mode) return join(process.cwd(), "data", `drift-${mode}.json`);
  return join(process.cwd(), "data", "drift.json");
}

export interface DriftEntry {
  cycle: number;
  timestamp: string;
  commit_message: string;
  reasoning: string;
  topics_consumed: string[];
  what_it_created: string;
  emotional_state: string;
  design_choices: string;
  guided_vs_freeform_note: string;
}

export interface DriftLog {
  entries: DriftEntry[];
}

export function loadDrift(mode?: string): DriftLog {
  const file = driftPath(mode);
  if (!existsSync(file)) {
    return { entries: [] };
  }
  try {
    return JSON.parse(readFileSync(file, "utf-8"));
  } catch {
    return { entries: [] };
  }
}

export function saveDrift(log: DriftLog, mode?: string): void {
  writeFileSync(driftPath(mode), JSON.stringify(log, null, 2));
}

export function addDriftEntry(log: DriftLog, entry: DriftEntry): DriftLog {
  log.entries.push(entry);
  return log;
}
