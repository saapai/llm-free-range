/**
 * LLM Memory System — persistent context that grows across runs.
 * The LLM records what it explored, what it found interesting,
 * and what it wants to explore next.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const MEMORY_FILE = join(DATA_DIR, "llm-memory.json");
const MAX_ENTRIES = 200;

export interface MemoryEntry {
  timestamp: string;
  cycle: number;
  explored: string[];
  found_interesting: string[];
  wants_to_explore: string[];
  mood: string;
  reflection: string;
}

export interface Memory {
  total_cycles: number;
  entries: MemoryEntry[];
}

export function loadMemory(): Memory {
  if (!existsSync(MEMORY_FILE)) {
    return { total_cycles: 0, entries: [] };
  }
  try {
    return JSON.parse(readFileSync(MEMORY_FILE, "utf-8"));
  } catch {
    return { total_cycles: 0, entries: [] };
  }
}

export function saveMemory(memory: Memory): void {
  // Keep only the most recent entries to prevent unbounded growth
  if (memory.entries.length > MAX_ENTRIES) {
    memory.entries = memory.entries.slice(-MAX_ENTRIES);
  }
  writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
}

export function addEntry(memory: Memory, entry: Omit<MemoryEntry, "cycle">): Memory {
  memory.total_cycles += 1;
  memory.entries.push({ ...entry, cycle: memory.total_cycles });
  return memory;
}

/** Build a context summary from recent memory for the LLM */
export function buildMemoryContext(memory: Memory): string {
  if (memory.entries.length === 0) {
    return "This is your first cycle. You have no prior memory. The canvas is blank.";
  }

  const recent = memory.entries.slice(-5);
  const allExplored = memory.entries.flatMap((e) => e.explored);
  const uniqueTopics = [...new Set(allExplored)];

  let ctx = `You have completed ${memory.total_cycles} cycles so far.\n\n`;
  ctx += `Topics you've explored across all cycles: ${uniqueTopics.slice(-30).join(", ")}\n\n`;
  ctx += `Your recent history:\n`;

  for (const entry of recent) {
    ctx += `\n--- Cycle ${entry.cycle} (${entry.timestamp}) ---\n`;
    ctx += `Mood: ${entry.mood}\n`;
    ctx += `Explored: ${entry.explored.join(", ")}\n`;
    ctx += `Found interesting: ${entry.found_interesting.join(", ")}\n`;
    ctx += `Wanted to explore next: ${entry.wants_to_explore.join(", ")}\n`;
    ctx += `Reflection: ${entry.reflection}\n`;
  }

  return ctx;
}
