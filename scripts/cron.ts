#!/usr/bin/env npx tsx
/**
 * CRON — Runs GUIDED and FREEFORM as independent creative loops.
 *
 * Each mode runs on its own 3-hour timer, offset by 90 minutes
 * so they don't compete for Ollama resources. This means the site
 * gets a new piece every ~90 minutes, alternating between modes.
 *
 * Usage: npx tsx scripts/cron.ts
 */

import { execSync } from "child_process";
import { join } from "path";

const INTERVAL_MS = 3 * 60 * 60 * 1000; // 3 hours
const OFFSET_MS = 90 * 60 * 1000; // 90 min offset between modes
const ROOT = process.cwd();

function timestamp(): string {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

async function runCycle(mode: "guided" | "freeform") {
  console.log(`\n[${timestamp()}] ▶ Starting ${mode.toUpperCase()} cycle...`);
  try {
    execSync(`npx tsx ${join(ROOT, "scripts/orchestrate.ts")} ${mode}`, {
      cwd: ROOT,
      stdio: "inherit",
      timeout: INTERVAL_MS - 60_000,
    });
    console.log(`[${timestamp()}] ✓ ${mode.toUpperCase()} cycle complete.`);

    try {
      execSync("git push", { cwd: ROOT, stdio: "inherit" });
      console.log(`[${timestamp()}]   Pushed to remote.`);
    } catch {
      console.log(`[${timestamp()}]   Push failed.`);
    }
  } catch (e) {
    console.error(`[${timestamp()}] ✗ ${mode.toUpperCase()} cycle failed:`, e);
  }
}

async function main() {
  console.log("╔═══════════════════════════════════════════════╗");
  console.log("║  llm-free-range · dual creative engine        ║");
  console.log("║                                               ║");
  console.log("║  GUIDED:   every 3h (roundletter aesthetic)   ║");
  console.log("║  FREEFORM: every 3h (no rules, offset 90min)  ║");
  console.log("╚═══════════════════════════════════════════════╝\n");

  // Run guided immediately
  await runCycle("guided");

  // Run freeform after 90min offset
  setTimeout(async () => {
    await runCycle("freeform");
    // Then every 3 hours
    setInterval(() => runCycle("freeform"), INTERVAL_MS);
    console.log(`\n[${timestamp()}] FREEFORM loop active. Next in 3h.`);
  }, OFFSET_MS);

  // Guided every 3 hours after initial run
  setInterval(() => runCycle("guided"), INTERVAL_MS);
  console.log(`\n[${timestamp()}] GUIDED loop active. Next in 3h.`);
  console.log(`[${timestamp()}] FREEFORM starts in 90 minutes.`);
}

main().catch(console.error);
