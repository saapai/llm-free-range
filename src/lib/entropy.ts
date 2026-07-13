/**
 * Entropy scoring — measures how different each commit is from the last.
 * Tracks divergence between guided and freeform versions over time.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const ENTROPY_FILE = join(process.cwd(), "data", "entropy.json");

export interface EntropySnapshot {
  cycle: number;
  timestamp: string;
  guided_entropy: number;
  freeform_entropy: number;
  divergence: number; // how different guided vs freeform are
  guided_delta: number; // change from previous guided
  freeform_delta: number; // change from previous freeform
}

export interface EntropyLog {
  snapshots: EntropySnapshot[];
}

export function loadEntropy(): EntropyLog {
  if (!existsSync(ENTROPY_FILE)) {
    return { snapshots: [] };
  }
  try {
    return JSON.parse(readFileSync(ENTROPY_FILE, "utf-8"));
  } catch {
    return { snapshots: [] };
  }
}

export function saveEntropy(log: EntropyLog): void {
  writeFileSync(ENTROPY_FILE, JSON.stringify(log, null, 2));
}

/** Simple content hash for change detection */
function simpleHash(content: string): number {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit int
  }
  return Math.abs(hash);
}

/** Calculate normalized entropy score (0-1) between two strings */
export function calculateEntropy(prev: string, next: string): number {
  if (!prev || !next) return 1;
  if (prev === next) return 0;

  // Character frequency divergence
  const freqA = new Map<string, number>();
  const freqB = new Map<string, number>();
  for (const c of prev) freqA.set(c, (freqA.get(c) || 0) + 1);
  for (const c of next) freqB.set(c, (freqB.get(c) || 0) + 1);

  const allChars = new Set([...freqA.keys(), ...freqB.keys()]);
  let divergence = 0;
  for (const c of allChars) {
    const a = (freqA.get(c) || 0) / prev.length;
    const b = (freqB.get(c) || 0) / next.length;
    divergence += Math.abs(a - b);
  }

  // Length ratio
  const lenRatio = Math.abs(prev.length - next.length) / Math.max(prev.length, next.length);

  // Hash difference (structural change)
  const hashDiff = simpleHash(prev) !== simpleHash(next) ? 0.3 : 0;

  return Math.min(1, (divergence / 2) + (lenRatio * 0.3) + hashDiff);
}

export function addSnapshot(
  log: EntropyLog,
  cycle: number,
  guidedContent: string,
  freeformContent: string
): EntropyLog {
  const prev = log.snapshots[log.snapshots.length - 1];
  const snapshot: EntropySnapshot = {
    cycle,
    timestamp: new Date().toISOString(),
    guided_entropy: prev
      ? calculateEntropy(prev.guided_entropy.toString(), guidedContent)
      : 1,
    freeform_entropy: prev
      ? calculateEntropy(prev.freeform_entropy.toString(), freeformContent)
      : 1,
    divergence: calculateEntropy(guidedContent, freeformContent),
    guided_delta: prev
      ? calculateEntropy(prev.guided_entropy.toString(), guidedContent)
      : 1,
    freeform_delta: prev
      ? calculateEntropy(prev.freeform_entropy.toString(), freeformContent)
      : 1,
  };
  log.snapshots.push(snapshot);
  return log;
}
