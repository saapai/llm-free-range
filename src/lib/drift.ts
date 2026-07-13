/**
 * Drift log — each cycle the LLM explains what it did and why.
 * The git history becomes a narrative.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DRIFT_FILE = join(process.cwd(), "data", "drift.json");

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

export function loadDrift(): DriftLog {
  if (!existsSync(DRIFT_FILE)) {
    return { entries: [] };
  }
  try {
    return JSON.parse(readFileSync(DRIFT_FILE, "utf-8"));
  } catch {
    return { entries: [] };
  }
}

export function saveDrift(log: DriftLog): void {
  writeFileSync(DRIFT_FILE, JSON.stringify(log, null, 2));
}

export function addDriftEntry(log: DriftLog, entry: DriftEntry): DriftLog {
  log.entries.push(entry);
  return log;
}
