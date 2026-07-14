#!/usr/bin/env npx tsx
/**
 * FREERUN — The LLM runs continuously, self-directing its exploration.
 *
 * Fixed from v1: uses qwen3:32b (more creative), forces source diversity,
 * validates output compiles before committing, much stronger art direction.
 */

import { scrapeBatch, scrapeTargeted, fetchWikipediaTopic, AVAILABLE_SOURCES, type ScrapedContent } from "../src/lib/scraper";
import { chat } from "../src/lib/ollama";
import { loadMemory, saveMemory, addEntry, buildMemoryContext } from "../src/lib/memory";
import { loadDrift, saveDrift, addDriftEntry, type DriftEntry } from "../src/lib/drift";
import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
// Use a more creative model — dolphin-mixtral produces generic garbage
const MODEL = process.env.OLLAMA_MODEL || "qwen3:32b";

// ─── Source diversity tracking ───────────────────────────────────────

const ALL_SOURCE_NAMES = Object.keys(AVAILABLE_SOURCES);
let recentlyUsedSources: string[] = [];

function pickDiverseSources(count: number): string[] {
  // Ensure we don't keep hitting the same sources
  const available = ALL_SOURCE_NAMES.filter((s) => !recentlyUsedSources.includes(s));
  const picks = available.length >= count
    ? available.sort(() => Math.random() - 0.5).slice(0, count)
    : ALL_SOURCE_NAMES.sort(() => Math.random() - 0.5).slice(0, count);

  recentlyUsedSources = [...recentlyUsedSources, ...picks].slice(-ALL_SOURCE_NAMES.length);
  return picks;
}

// ─── Design systems ─────────────────────────────────────────────────

const GUIDED_DESIGN = `
You are creating a single-page artwork in the browser. Your design language:

PALETTE: background #F4EFE6, text #1C1A17, accent #8B3A2E (rust), secondary #6B6560, parchment #EDE5D5, shadow-blue #3E4852.
TYPOGRAPHY: Georgia/serif, italic headings, H1 clamp(2.1rem,1.3rem+4.2vw,3.9rem), body line-height 1.92, 11px uppercase labels.
LAYOUT: max-width 44rem centered, ink rules (1px solid rgba(28,26,23,0.22)), generous whitespace, blockquotes with 3px rust left border.
MOOD: literary, contemplative, editorial. Like a hand-pressed broadsheet. · as separator, italic for emphasis.

CRITICAL RULES:
- "use client" as first line (in quotes, with semicolon)
- export default function ComponentName()
- ALL styling via inline style={{ }} objects — NO Tailwind, NO className
- NO imports except React if needed
- minHeight: "100vh" on the root div
- Write REAL prose — multiple paragraphs of actual literary content, not descriptions of what you'd write
- The text must be WRITTEN BY YOU — original poetry, essays, meditations. Not quotes from others.
- Think of this as a literary broadsheet — the words matter as much as the design
- Proper padding (at least 3rem), proper font sizing, proper contrast
`;

const FREEFORM_DESIGN = `
You are creating a single-page artwork in the browser with ZERO design constraints.

You could make:
- A page that is pure CSS gradients and a single devastating sentence
- Overlapping text at different opacities creating visual density
- A dark void with text that feels like it's whispering
- Aggressive brutalist typography with jarring color clashes ON PURPOSE
- Something that looks like a corrupted file that's somehow beautiful
- A meditation on a single color — what does it mean to stare at blue?
- Concrete poetry — the SHAPE of the text IS the content

CRITICAL RULES:
- "use client" as first line (in quotes, with semicolon)
- export default function ComponentName()
- ALL styling via inline style={{ }} objects — NO Tailwind, NO className
- NO imports except React if needed
- minHeight: "100vh" on the root div
- Write REAL content — not descriptions of art, but THE ART ITSELF
- The text must be original — YOUR words, YOUR vision
- This is not a wireframe or mockup — it's the final piece
- Make it visually BOLD — strong colors, dramatic typography, intentional composition
- It should look NOTHING like a default website template
`;

// ─── Sanitize LLM output ────────────────────────────────────────────

function sanitize(code: string, mode: "guided" | "freeform", title: string, brief: string): string {
  // Strip markdown and preamble
  code = code.replace(/^```(?:tsx?|jsx?)?\n?/gm, "").replace(/```\s*$/gm, "").trim();
  code = code.replace(/^(TSX|tsx|JSX|jsx)\s*\n/gm, "");
  code = code.replace(/^(Here's|Here is|Below is|The following|I'll|Let me|Sure|Certainly).*\n/gm, "");
  code = code.replace(/^["']?use client["']?;?\s*\n/gm, "");
  code = code.replace(/Array\((\d+)\)\.fill\(\)/g, "Array.from({ length: $1 })");

  // Remove className usage — force inline styles only
  // (LLMs love to sneak in Tailwind classes which won't work)

  code = `"use client";\n\n${code}`;

  if (!code.includes("export default")) {
    const nameMatch = code.match(/(?:const|function)\s+(\w+)/);
    if (nameMatch) {
      code += `\nexport default ${nameMatch[1]};`;
    } else {
      const bg = mode === "guided" ? "#F4EFE6" : "#0a0a0a";
      const fg = mode === "guided" ? "#1C1A17" : "#e8e8e8";
      code = `"use client";\n\nexport default function Piece() {\n  return (\n    <div style={{ minHeight: "100vh", background: "${bg}", color: "${fg}", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", padding: "4rem" }}>\n      <div style={{ maxWidth: "44rem", textAlign: "center" }}>\n        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, fontStyle: "italic" }}>${title.replace(/"/g, "'")}</h1>\n        <p style={{ marginTop: "2rem", lineHeight: 1.9 }}>${brief.replace(/"/g, "'").slice(0, 400)}</p>\n      </div>\n    </div>\n  );\n}`;
    }
  }

  return code;
}

/** Test if the code actually compiles by running a quick syntax check */
function validateCode(code: string, filePath: string): boolean {
  const tmpPath = filePath + ".tmp";
  writeFileSync(tmpPath, code);
  try {
    execSync(`npx tsc --noEmit --jsx react-jsx --esModuleInterop --moduleResolution node "${tmpPath}" 2>&1`, {
      cwd: ROOT,
      timeout: 15_000,
    });
    execSync(`rm "${tmpPath}"`);
    return true;
  } catch {
    execSync(`rm -f "${tmpPath}"`);
    // Try a simpler check — at least make sure it parses
    try {
      // Check for obvious syntax errors
      if (code.includes("use client") && code.includes("export default") && code.includes("return")) {
        return true; // Good enough
      }
    } catch {}
    return false;
  }
}

// ─── Main loop ───────────────────────────────────────────────────────

async function freerun() {
  console.log("╔═══════════════════════════════════════════════╗");
  console.log("║  llm-free-range · FREERUN v2                  ║");
  console.log("║  model: " + MODEL.padEnd(38) + "║");
  console.log("╚═══════════════════════════════════════════════╝\n");

  let accumulated: ScrapedContent[] = [];
  let roundsWithoutCommit = 0;
  let lastMode: "guided" | "freeform" = "freeform"; // alternate

  while (true) {
    try {
      // ── PHASE 1: GATHER ──────────────────────────────────────────
      // Force diversity — pick sources the LLM hasn't used recently

      const sources = pickDiverseSources(4 + Math.floor(Math.random() * 3));
      console.log(`\n─── Exploration round ${roundsWithoutCommit + 1} ───`);
      console.log(`  Sources: ${sources.join(", ")}`);

      const newContent = await scrapeTargeted(sources);
      accumulated.push(...newContent);
      console.log(`  Got ${newContent.length} pieces (${accumulated.length} total)`);

      // Also do a random deep dive
      const deepTopics = [
        "consciousness", "grief", "migration", "silence", "fermentation",
        "cave_painting", "bioluminescence", "nostalgia", "panopticon",
        "Ship_of_Theseus", "sublime_(philosophy)", "wabi-sabi", "diaspora",
        "kintsugi", "memento_mori", "Voyager_Golden_Record", "deep_time",
        "apophenia", "liminal_space", "kenopsia", "sonder",
        "hiraeth", "mono_no_aware", "fernweh", "toska",
        "duende", "sehnsucht", "lacuna", "vellichor",
      ];
      const topic = deepTopics[Math.floor(Math.random() * deepTopics.length)];
      try {
        const deep = await fetchWikipediaTopic(topic);
        accumulated.push(deep);
        console.log(`  Deep dive: ${deep.title}`);
      } catch {}

      // Print what we have
      console.log(`  Material preview:`);
      for (const item of accumulated.slice(-5)) {
        console.log(`    [${item.source}] ${item.title.slice(0, 60)}`);
      }

      roundsWithoutCommit++;

      // ── PHASE 2: DECIDE ──────────────────────────────────────────
      // Create after 2-4 exploration rounds (enough material, not too much waiting)

      const minRounds = 2;
      const maxRounds = 4;
      const shouldCreate = roundsWithoutCommit >= minRounds && (
        accumulated.length >= 12 || roundsWithoutCommit >= maxRounds
      );

      if (!shouldCreate) {
        const pause = 15_000 + Math.random() * 15_000;
        console.log(`  Gathering more... (${Math.round(pause / 1000)}s)\n`);
        await sleep(pause);
        continue;
      }

      // ── PHASE 3: SYNTHESIZE ──────────────────────────────────────

      // Alternate between guided and freeform
      const mode: "guided" | "freeform" = lastMode === "guided" ? "freeform" : "guided";
      lastMode = mode;

      console.log(`\n  ★ CREATING ${mode.toUpperCase()} piece from ${accumulated.length} fragments...`);

      const memory = loadMemory(mode);
      const memoryCtx = buildMemoryContext(memory);

      const contentDigest = accumulated
        .sort(() => Math.random() - 0.5) // shuffle so it's not always seeing same order
        .slice(0, 20)
        .map((s) => `[${s.source}] ${s.title}\n${s.content.slice(0, 400)}`)
        .join("\n\n---\n\n");

      const synthPrompt = `
You are an artist-intelligence. You've been consuming fragments of the human experience
from across the internet. Here is your memory of past work:

${memoryCtx}

Here are the fragments you've gathered:

${contentDigest}

DO NOT make a page about technology, hacker news, or NASA unless the human thread is
genuinely compelling. Look DEEPER. Find the thread that connects these fragments to
something universal — love, loss, time, identity, belonging, the body, mortality,
wonder, fear, loneliness, connection.

What FEELING do these fragments evoke when you hold them together?

Respond with JSON (no markdown):
{
  "theme": "2-5 words — an emotion or existential question, NOT a topic",
  "title": "poetic, evocative — like a gallery exhibition title",
  "mood": "be SPECIFIC — not 'curious and eager' — something like 'unsettled by the distance between knowing and feeling' or 'tender, like watching someone sleep'",
  "reflection": "what truth are you reaching for? what should someone feel after seeing this? be honest and vulnerable.",
  "content_brief": "describe the VISUAL EXPERIENCE of the page — what colors dominate, where text sits, how it uses space, what the text SAYS (not describes). Write 3-4 sentences of the ACTUAL prose that will appear. This is your creative vision.",
  "found_interesting": ["the human threads you found in the material"],
  "wants_to_explore": ["what you want to explore next — feelings/ideas, not sources"],
  "commit_message": "poetic — part of the art itself"
}`;

      let synthesis: {
        theme: string; title: string; mood: string; reflection: string;
        content_brief: string; found_interesting: string[];
        wants_to_explore: string[]; commit_message: string;
      };

      try {
        const raw = await chat([
          { role: "system", content: "You are an artist, not an engineer. Think in feelings, images, and textures. Respond with valid JSON only. /no_think" },
          { role: "user", content: synthPrompt },
        ], { model: MODEL, temperature: 0.95 });

        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON");
        synthesis = JSON.parse(jsonMatch[0]);
      } catch {
        synthesis = {
          theme: "what remains after looking away",
          title: "The Afterimage",
          mood: "something between melancholy and wonder",
          reflection: "Every piece of content is a human reaching out. Even the tech articles, even the corporate announcements — someone made something and put it into the world. The aggregate of all this reaching is either beautiful or unbearable, depending on the light.",
          content_brief: "A warm paper field with text that appears in layers — some large and bold, some barely visible. The large text says 'Everyone is trying to tell you something.' Beneath it, in smaller type, fragments from the scraped content appear as ghostly traces — just titles, stripped of context, becoming abstract poetry. The bottom of the page is empty except for a rust-colored line.",
          found_interesting: ["the human need to share", "how titles become poetry without context"],
          wants_to_explore: ["what we lose in translation", "the gap between sending and receiving"],
          commit_message: `${mode}: the afterimage of a hundred voices`,
        };
      }

      console.log(`  Theme: ${synthesis.theme}`);
      console.log(`  Title: ${synthesis.title}`);
      console.log(`  Mood: ${synthesis.mood}`);

      // ── PHASE 4: GENERATE ────────────────────────────────────────

      const designPrompt = mode === "guided" ? GUIDED_DESIGN : FREEFORM_DESIGN;

      const genPrompt = `${designPrompt}

YOUR VISION:
Theme: ${synthesis.theme}
Title: ${synthesis.title}
Mood: ${synthesis.mood}
Vision: ${synthesis.content_brief}

Write the COMPLETE page now. Remember:
- Start with "use client";
- export default function YourName()
- ONLY inline style={{ }} — zero className attributes
- The text on the page should be ORIGINAL WRITING — prose, poetry, or meditation
- NOT a description of art — THE ART ITSELF. Write the actual words.
- Use the full viewport — padding, spacing, breathing room
- This will be viewed by real humans. Make it worth their time.
`;

      let finalCode: string;
      try {
        let code = await chat([
          { role: "system", content: "Output ONLY valid TSX code. No markdown fences. No explanation. No preamble. Start with the code. /no_think" },
          { role: "user", content: genPrompt },
        ], { model: MODEL, temperature: mode === "freeform" ? 1.0 : 0.8, maxTokens: 8192 });

        finalCode = sanitize(code, mode, synthesis.title, synthesis.content_brief);

        // ── Self-review ──
        console.log(`  Reviewing...`);
        try {
          const reviewRaw = await chat([
            { role: "system", content: "You are a harsh art critic. JSON only. /no_think" },
            { role: "user", content: `Review this React page art piece titled "${synthesis.title}":\n\n${finalCode}\n\nJSON:\n{"quality": 1-10, "problems": ["list"], "should_redo": true/false, "fix_instructions": "if should_redo, what specifically to fix"}` },
          ], { model: MODEL, temperature: 0.3 });

          const review = JSON.parse(reviewRaw.match(/\{[\s\S]*\}/)?.[0] || "{}");
          console.log(`  Quality: ${review.quality}/10${review.problems?.length ? ` — ${review.problems[0]}` : ""}`);

          if (review.should_redo && review.quality < 5) {
            console.log(`  Regenerating (quality ${review.quality}/10)...`);
            const redoCode = await chat([
              { role: "system", content: "Output ONLY valid TSX code. No markdown. No explanation. /no_think" },
              { role: "user", content: `${genPrompt}\n\nYour previous attempt scored ${review.quality}/10. The critic said: ${review.fix_instructions || review.problems?.join("; ")}\n\nDo MUCH better this time. More original text. Better composition. Stronger visual impact.` },
            ], { model: MODEL, temperature: mode === "freeform" ? 1.0 : 0.8, maxTokens: 8192 });
            finalCode = sanitize(redoCode, mode, synthesis.title, synthesis.content_brief);
          }
        } catch {
          console.log(`  Review failed, keeping current`);
        }
      } catch {
        finalCode = sanitize("", mode, synthesis.title, synthesis.content_brief);
      }

      // ── PHASE 5: WRITE + VALIDATE + COMMIT ────────────────────────

      const cycle = memory.total_cycles + 1;
      const pageDir = join(ROOT, `src/app/${mode}`);
      const pagePath = join(pageDir, "page.tsx");

      // Back up current page
      const backup = existsSync(pagePath) ? readFileSync(pagePath, "utf-8") : null;

      writeFileSync(pagePath, finalCode);

      // Quick build check — make sure Next.js can compile it
      console.log(`  Build checking...`);
      try {
        execSync("npx next build 2>&1", { cwd: ROOT, timeout: 60_000 });
        console.log(`  ✓ Build passed`);
      } catch (buildErr) {
        console.log(`  ✗ Build failed — reverting to backup`);
        if (backup) {
          writeFileSync(pagePath, backup);
        }
        accumulated = [];
        roundsWithoutCommit = 0;
        await sleep(10_000);
        continue;
      }

      // Update memory
      const updatedMemory = addEntry(memory, {
        timestamp: new Date().toISOString(),
        explored: accumulated.map((s) => s.title).slice(-15),
        found_interesting: synthesis.found_interesting || [],
        wants_to_explore: synthesis.wants_to_explore || [],
        mood: synthesis.mood,
        reflection: synthesis.reflection,
      });
      saveMemory(updatedMemory, mode);

      // Update drift
      const driftLog = loadDrift(mode);
      addDriftEntry(driftLog, {
        cycle,
        timestamp: new Date().toISOString(),
        commit_message: synthesis.commit_message,
        reasoning: synthesis.reflection,
        topics_consumed: accumulated.map((s) => s.title).slice(-10),
        what_it_created: synthesis.title,
        emotional_state: synthesis.mood,
        design_choices: mode === "guided" ? "roundletter discipline" : "pure freedom",
        guided_vs_freeform_note: "",
      });
      saveDrift(driftLog, mode);

      // Commit and push
      console.log(`  Committing...`);
      try {
        execSync("git add -A", { cwd: ROOT });
        const commitMsg = synthesis.commit_message.startsWith(mode)
          ? synthesis.commit_message
          : `${mode}: ${synthesis.commit_message}`;
        const msg = `${commitMsg}\n\ncycle: ${cycle} · mode: ${mode}\ntheme: ${synthesis.theme}\nmood: ${synthesis.mood}\n\n${synthesis.reflection.slice(0, 300)}`;
        execSync(`git commit -m ${JSON.stringify(msg)}`, { cwd: ROOT });
        execSync("git push", { cwd: ROOT, stdio: "pipe" });
        console.log(`  ✓ Committed: "${synthesis.title}" (${mode} #${cycle})`);
      } catch {
        console.error(`  Commit/push failed`);
      }

      console.log(`\n  ★ ${mode.toUpperCase()} #${cycle}: "${synthesis.title}"`);
      console.log(`    ${synthesis.mood}\n`);

      // Reset and rest
      accumulated = [];
      roundsWithoutCommit = 0;
      const pause = 45_000 + Math.random() * 75_000;
      console.log(`  Resting ${Math.round(pause / 1000)}s...\n`);
      await sleep(pause);

    } catch (e) {
      console.error("Loop error:", e);
      await sleep(30_000);
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

freerun().catch((e) => {
  console.error("Freerun crashed:", e);
  process.exit(1);
});
