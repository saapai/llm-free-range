/**
 * LLM Memory System — persistent context that grows across runs.
 * Each mode (guided/freeform) has its own memory file.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const MAX_ENTRIES = 200;

function memoryPath(mode?: string): string {
  if (mode) return join(DATA_DIR, `memory-${mode}.json`);
  return join(DATA_DIR, "llm-memory.json");
}

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

export function loadMemory(mode?: string): Memory {
  const file = memoryPath(mode);
  if (!existsSync(file)) {
    return { total_cycles: 0, entries: [] };
  }
  try {
    return JSON.parse(readFileSync(file, "utf-8"));
  } catch {
    return { total_cycles: 0, entries: [] };
  }
}

export function saveMemory(memory: Memory, mode?: string): void {
  if (memory.entries.length > MAX_ENTRIES) {
    memory.entries = memory.entries.slice(-MAX_ENTRIES);
  }
  writeFileSync(memoryPath(mode), JSON.stringify(memory, null, 2));
}

export function addEntry(memory: Memory, entry: Omit<MemoryEntry, "cycle">): Memory {
  memory.total_cycles += 1;
  memory.entries.push({ ...entry, cycle: memory.total_cycles });
  return memory;
}

/** Build a context summary from recent memory for the LLM */
export function buildMemoryContext(memory: Memory): string {
  if (memory.entries.length === 0) {
    return "This is your first cycle. You have no prior memory. The canvas is blank. You have never made anything before. Everything is possible.";
  }

  const recent = memory.entries.slice(-5);
  const allExplored = memory.entries.flatMap((e) => e.explored);
  const uniqueTopics = [...new Set(allExplored)];
  const allMoods = memory.entries.map((e) => e.mood);

  let ctx = `You have completed ${memory.total_cycles} cycles so far.\n\n`;
  ctx += `Your emotional arc across all cycles: ${allMoods.join(" → ")}\n\n`;
  ctx += `Topics you've touched: ${uniqueTopics.slice(-40).join(", ")}\n\n`;
  ctx += `Your recent creative history:\n`;

  for (const entry of recent) {
    ctx += `\n--- Cycle ${entry.cycle} (${entry.timestamp}) ---\n`;
    ctx += `Mood: ${entry.mood}\n`;
    ctx += `Explored: ${entry.explored.join(", ")}\n`;
    ctx += `What resonated: ${entry.found_interesting.join(", ")}\n`;
    ctx += `Wanted to explore next: ${entry.wants_to_explore.join(", ")}\n`;
    ctx += `Reflection: ${entry.reflection}\n`;
  }

  return ctx;
}
