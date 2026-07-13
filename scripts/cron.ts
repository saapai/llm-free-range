#!/usr/bin/env npx tsx
/**
 * CRON — Runs the orchestrator every 3 hours.
 * Also supports a "cooldown variation" where the LLM decides when it's done
 * (with a 3-hour max cap).
 */

import { execSync } from "child_process";
import { join } from "path";

const INTERVAL_MS = 3 * 60 * 60 * 1000; // 3 hours
const ROOT = process.cwd();
const ORCHESTRATE_SCRIPT = join(ROOT, "scripts/orchestrate.ts");

function timestamp(): string {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

async function runCycle() {
  console.log(`\n[${timestamp()}] Starting orchestration cycle...`);
  try {
    execSync(`npx tsx ${ORCHESTRATE_SCRIPT}`, {
      cwd: ROOT,
      stdio: "inherit",
      timeout: INTERVAL_MS - 60_000, // Leave 1 min buffer
    });
    console.log(`[${timestamp()}] Cycle complete.`);

    // Push to remote
    try {
      execSync("git push", { cwd: ROOT, stdio: "inherit" });
      console.log(`[${timestamp()}] Pushed to remote.`);
    } catch {
      console.log(`[${timestamp()}] Push failed (may need remote setup).`);
    }
  } catch (e) {
    console.error(`[${timestamp()}] Cycle failed:`, e);
  }
}

async function main() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  llm-free-range · cron daemon            ║");
  console.log("║  Running every 3 hours                   ║");
  console.log("╚══════════════════════════════════════════╝");

  // Run immediately on start
  await runCycle();

  // Then every 3 hours
  setInterval(runCycle, INTERVAL_MS);
  console.log(`\n[${timestamp()}] Next cycle in 3 hours. Waiting...`);
}

main().catch(console.error);
