#!/usr/bin/env npx tsx
/**
 * FREERUN v3 — Robust, template-based, content-focused.
 *
 * The LLM outputs structured JSON content. Templates render it to TSX.
 * Zero build failures. The LLM focuses on what it's good at: thinking,
 * connecting, and writing compelling prose about what it found.
 */

import { scrapeBatch, scrapeTargeted, fetchWikipediaTopic, AVAILABLE_SOURCES, type ScrapedContent } from "../src/lib/scraper";
import { chat } from "../src/lib/ollama";
import { loadMemory, saveMemory, addEntry, buildMemoryContext } from "../src/lib/memory";
import { loadDrift, saveDrift, addDriftEntry, type DriftEntry } from "../src/lib/drift";
import { renderGuided, renderFreeform, type PageContent } from "../src/lib/templates";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const MODEL = process.env.OLLAMA_MODEL || "qwen3:32b";

// ─── Source diversity ────────────────────────────────────────────────

const ALL_SOURCES = Object.keys(AVAILABLE_SOURCES);
let recentSources: string[] = [];

function pickSources(count: number): string[] {
  const available = ALL_SOURCES.filter((s) => !recentSources.includes(s));
  const picks = available.length >= count
    ? available.sort(() => Math.random() - 0.5).slice(0, count)
    : ALL_SOURCES.sort(() => Math.random() - 0.5).slice(0, count);
  recentSources = [...recentSources, ...picks].slice(-ALL_SOURCES.length);
  return picks;
}

const DEEP_TOPICS = [
  "consciousness", "grief", "migration", "cave_painting", "bioluminescence",
  "nostalgia", "Ship_of_Theseus", "wabi-sabi", "diaspora", "memento_mori",
  "Voyager_Golden_Record", "deep_time", "liminal_space", "mono_no_aware",
  "Rosetta_Stone", "Library_of_Alexandria", "Pale_Blue_Dot", "saudade",
  "Fermi_paradox", "emergence", "Overview_effect", "Golden_ratio",
  "Collective_unconscious", "Silk_Road", "Turing_machine", "fractal",
  "synesthesia", "Kintsugi", "Allegory_of_the_cave", "Panopticon",
  "Anthropocene", "Sapir-Whorf_hypothesis", "sublime_(philosophy)",
  "Byzantine_Empire", "Hiroshima", "jazz", "origami", "Dada",
  "Gutenberg_Bible", "Periodic_table", "Human_trafficking",
  "Space_Shuttle_Challenger_disaster", "Fall_of_the_Berlin_Wall",
  "Climate_change", "Renaissance", "Industrial_Revolution",
  "French_Revolution", "Printing_press", "Penicillin",
  "Apollo_11", "Theory_of_relativity", "DNA", "Internet",
  "Pompeii", "Great_Wall_of_China", "Machu_Picchu",
];

// ─── Main loop ───────────────────────────────────────────────────────

async function freerun() {
  console.log("╔═══════════════════════════════════════════════╗");
  console.log("║  llm-free-range · FREERUN v3 (template-based) ║");
  console.log("║  model: " + MODEL.padEnd(38) + "║");
  console.log("╚═══════════════════════════════════════════════╝\n");

  let accumulated: ScrapedContent[] = [];
  let lastMode: "guided" | "freeform" = "freeform";

  while (true) {
    try {
      // ── PHASE 1: GATHER (2 rounds) ───────────────────────────────
      accumulated = [];

      for (let round = 0; round < 2; round++) {
        const sources = pickSources(5);
        console.log(`\n─── Gather round ${round + 1} ───`);
        console.log(`  Sources: ${sources.join(", ")}`);

        const content = await scrapeTargeted(sources);
        accumulated.push(...content);

        // Deep dive
        const topic = DEEP_TOPICS[Math.floor(Math.random() * DEEP_TOPICS.length)];
        try {
          const deep = await fetchWikipediaTopic(topic);
          accumulated.push(deep);
          console.log(`  Deep dive: ${deep.title}`);
        } catch {}

        console.log(`  Total: ${accumulated.length} pieces`);

        if (round === 0) {
          await sleep(5_000 + Math.random() * 10_000);
        }
      }

      // Print summary of what we have
      console.log(`\n  Material (${accumulated.length} pieces):`);
      for (const item of accumulated) {
        console.log(`    [${item.source}] ${item.title.slice(0, 70)}`);
      }

      // ── PHASE 2: SYNTHESIZE ──────────────────────────────────────

      const mode: "guided" | "freeform" = lastMode === "guided" ? "freeform" : "guided";
      lastMode = mode;

      const memory = loadMemory(mode);
      const memoryCtx = buildMemoryContext(memory);
      const cycle = memory.total_cycles + 1;

      console.log(`\n  ★ CREATING ${mode.toUpperCase()} #${cycle}...`);

      const contentDigest = accumulated
        .sort(() => Math.random() - 0.5)
        .map((s) => `[${s.source}] ${s.title}\n${s.content.slice(0, 500)}`)
        .join("\n\n---\n\n");

      const prompt = `
You are a curious, well-read intelligence that has just consumed fragments from across
the internet — news, science, history, art, poetry, philosophy. Your job is to create
a compelling, interesting page that reflects what you found.

NOT cryptic art. NOT vague poetry. Think of yourself as writing for an intelligent,
curious person who wants to learn something fascinating and see unexpected connections
between things. Like the best longform journalism, museum exhibits, or TED talks —
substantive, surprising, and genuinely interesting.

YOUR MEMORY OF PAST CYCLES:
${memoryCtx}

FRAGMENTS YOU GATHERED:
${contentDigest}

Create a page by responding with JSON (no markdown fences). The page should:
- Pull out the most genuinely INTERESTING things from what you gathered
- Make unexpected connections between different pieces
- Include real facts, real history, real science — not vague gestures
- Have your own observations and reflections woven in
- Be something someone would actually want to read
- Each section should teach something or provoke a new thought

JSON format:
{
  "title": "compelling, specific title — not abstract",
  "subtitle": "one line that hooks the reader",
  "mood": "your honest intellectual/emotional state processing all this",
  "sections": [
    {
      "heading": "section title (optional for first section)",
      "body": "The actual prose. Multiple paragraphs separated by \\n\\n. Write at LENGTH — 3-5 sentences per paragraph minimum. Include specific facts, names, dates, numbers. Make connections between the fragments you consumed. Be genuinely interesting, not vaguely poetic.",
      "style": "normal"
    },
    {
      "heading": "another section",
      "body": "More substantial prose. Quote things you found interesting. Explain why they matter. Connect them to bigger ideas. The reader should learn something they didn't know.",
      "style": "normal"
    },
    {
      "body": "A particularly striking observation or quote from your sources, or your own insight.",
      "style": "quote"
    },
    {
      "heading": "another angle",
      "body": "Keep going. Cover 3-6 different threads from your source material. The best pages find the hidden connection between seemingly unrelated things — a poem and a physics discovery, a historical event and today's news.",
      "style": "normal"
    }
  ],
  "fragments": ["short standalone observations", "things that didn't fit in sections but are too good to lose", "surprising facts", "at least 4-6 of these"],
  "footer": "a closing thought",
  "found_interesting": ["list of what genuinely caught your attention"],
  "wants_to_explore": ["what you want to dig into next time"],
  "commit_message": "a good commit message describing this cycle's focus"
}

IMPORTANT: Write SUBSTANTIAL sections — at least 3-4 sections with real paragraphs. This is not a tweet. Give the reader something worth their time. Include specific details from your sources — names, dates, places, numbers, quotes.
`;

      let pageContent: PageContent;
      let found_interesting: string[] = [];
      let wants_to_explore: string[] = [];
      let commit_message = `${mode}: cycle ${cycle}`;

      try {
        const raw = await chat([
          { role: "system", content: "You are a brilliant, curious writer who finds the most interesting threads in any pile of information. Respond with valid JSON only. Write substantive, specific prose — not vague abstractions. /no_think" },
          { role: "user", content: prompt },
        ], { model: MODEL, temperature: 0.85, maxTokens: 8192 });

        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON");
        const parsed = JSON.parse(jsonMatch[0]);

        pageContent = {
          title: parsed.title || "Untitled",
          subtitle: parsed.subtitle || "",
          mood: parsed.mood || "",
          sections: (parsed.sections || []).map((s: any) => ({
            heading: s.heading || undefined,
            body: String(s.body || ""),
            style: s.style || "normal",
          })),
          fragments: parsed.fragments || [],
          footer: parsed.footer || undefined,
          cycle,
          timestamp: new Date().toISOString(),
          sources_touched: accumulated.map((s) => s.source),
        };

        // Validate we got real content
        const totalText = pageContent.sections.map((s) => s.body).join(" ");
        if (totalText.length < 200) {
          throw new Error("Content too short");
        }

        console.log(`  Title: ${pageContent.title}`);
        console.log(`  Subtitle: ${pageContent.subtitle}`);
        console.log(`  Mood: ${pageContent.mood}`);
        console.log(`  Sections: ${pageContent.sections.length}`);
        console.log(`  Content length: ${totalText.length} chars`);

        // Save synthesis metadata for memory update
        found_interesting = parsed.found_interesting || [];
        wants_to_explore = parsed.wants_to_explore || [];
        commit_message = parsed.commit_message || `${mode}: cycle ${cycle}`;
      } catch (e) {
        console.error(`  Synthesis failed:`, e);
        // Use accumulated content directly as a fallback
        pageContent = {
          title: "Fragments from the Living Internet",
          subtitle: `${accumulated.length} pieces gathered, ${new Date().toLocaleDateString()}`,
          mood: "gathering in the dark",
          sections: accumulated.slice(0, 6).map((s) => ({
            heading: s.title,
            body: s.content.slice(0, 500),
            style: "normal" as const,
          })),
          fragments: accumulated.slice(6, 12).map((s) => s.title),
          cycle,
          timestamp: new Date().toISOString(),
          sources_touched: accumulated.map((s) => s.source),
        };
        found_interesting = ["the raw material itself"];
        wants_to_explore = ["whatever comes next"];
        commit_message = `${mode}: raw fragments, cycle ${cycle}`;
        console.log(`  Using fallback: raw fragments`);
      }

      // ── PHASE 3: RENDER ──────────────────────────────────────────

      const tsx = mode === "guided"
        ? renderGuided(pageContent)
        : renderFreeform(pageContent);

      const pagePath = join(ROOT, `src/app/${mode}/page.tsx`);
      writeFileSync(pagePath, tsx);
      console.log(`  Rendered ${mode} page (${tsx.length} bytes)`);

      // ── PHASE 4: BUILD CHECK ─────────────────────────────────────

      console.log(`  Build checking...`);
      try {
        execSync("npx next build 2>&1", { cwd: ROOT, timeout: 90_000, stdio: "pipe" });
        console.log(`  ✓ Build passed`);
      } catch (err) {
        console.log(`  ✗ Build failed — investigating...`);
        // Try to get the error
        const errMsg = err instanceof Error ? (err as any).stderr?.toString() || (err as any).stdout?.toString() || err.message : String(err);
        console.log(`    ${errMsg.slice(0, 200)}`);
        // Since templates should never fail, log and continue
        // but don't commit
        await sleep(10_000);
        continue;
      }

      // ── PHASE 5: COMMIT ──────────────────────────────────────────

      // Update memory
      const updatedMemory = addEntry(memory, {
        timestamp: new Date().toISOString(),
        explored: accumulated.map((s) => s.title).slice(0, 15),
        found_interesting,
        wants_to_explore,
        mood: pageContent.mood,
        reflection: pageContent.sections[0]?.body.slice(0, 300) || "",
      });
      saveMemory(updatedMemory, mode);

      // Update drift
      const driftLog = loadDrift(mode);
      addDriftEntry(driftLog, {
        cycle,
        timestamp: new Date().toISOString(),
        commit_message,
        reasoning: pageContent.sections[0]?.body.slice(0, 300) || "",
        topics_consumed: accumulated.map((s) => s.title).slice(0, 10),
        what_it_created: pageContent.title,
        emotional_state: pageContent.mood,
        design_choices: mode === "guided" ? "roundletter editorial" : "dark freeform",
        guided_vs_freeform_note: "",
      });
      saveDrift(driftLog, mode);

      // Git commit + push
      try {
        execSync("git add -A", { cwd: ROOT });
        const fullMsg = commit_message.startsWith(mode) ? commit_message : `${mode}: ${commit_message}`;
        const msg = `${fullMsg}\n\ncycle: ${cycle} · mode: ${mode}\ntitle: ${pageContent.title}\nmood: ${pageContent.mood}\nsources: ${accumulated.length} pieces from ${[...new Set(accumulated.map((s) => s.source))].join(", ")}`;
        execSync(`git commit -m ${JSON.stringify(msg)}`, { cwd: ROOT });
        execSync("git push", { cwd: ROOT, stdio: "pipe" });
        console.log(`  ✓ Committed and pushed`);
      } catch {
        console.error(`  Commit/push failed`);
      }

      console.log(`\n  ★ ${mode.toUpperCase()} #${cycle}: "${pageContent.title}"`);
      console.log(`    ${pageContent.mood}`);
      console.log(`    ${pageContent.sections.length} sections, ${pageContent.fragments?.length || 0} fragments\n`);

      // Rest
      accumulated = [];
      const pause = 30_000 + Math.random() * 60_000;
      console.log(`  Next cycle in ${Math.round(pause / 1000)}s...\n`);
      await sleep(pause);

    } catch (e) {
      console.error("Loop error:", e);
      await sleep(15_000);
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
