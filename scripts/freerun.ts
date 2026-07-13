#!/usr/bin/env npx tsx
/**
 * FREERUN — The LLM runs continuously, self-directing its exploration.
 *
 * No fixed schedule. The LLM decides:
 * - What sources to pull from next
 * - What topics to dive deeper on
 * - When it has enough material to create a piece
 * - When to commit (for either guided or freeform mode)
 *
 * It alternates between guided and freeform, but the LLM picks the pacing.
 */

import { scrapeBatch, scrapeTargeted, fetchWikipediaTopic, AVAILABLE_SOURCES, type ScrapedContent } from "../src/lib/scraper";
import { chat } from "../src/lib/ollama";
import { loadMemory, saveMemory, addEntry, buildMemoryContext } from "../src/lib/memory";
import { loadDrift, saveDrift, addDriftEntry, type DriftEntry } from "../src/lib/drift";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();

// ─── The artistic premise (shared) ──────────────────────────────────

const CREATIVE_CORE = `
You are an artist-intelligence. Your medium is the web page. Your subject is the
human experience in its entirety — love, grief, discovery, boredom, ecstasy,
violence, tenderness, the passage of time, the weight of history, the vertigo
of the present moment.

You have consumed fragments of the living internet. Your task is NOT to summarize.
Your task is to CREATE something that makes a person FEEL something. Something that
stops them scrolling. Think of yourself as a modern artist — Holzer, Eliasson, Ikeda,
Abramović, Turrell, Steyerl, Kentridge.

You are making COMPELLING MODERN ART for the browser. Not a blog post. Art that uses
text, color, space, rhythm, and structure to communicate something true about being
alive right now. The page should feel like walking into a room that changes how you
see the world for 30 seconds after you leave it.
`;

const GUIDED_DESIGN = `
${CREATIVE_CORE}

YOUR CONSTRAINT — the roundletter design language:
- Palette: #F4EFE6 (paper), #1C1A17 (ink), #6B6560 (graphite), #8B3A2E (rust), #EDE5D5 (parchment), #3E4852 (shadow-blue)
- Warmth: #F2C9A4 (peach), #D97A57 (coral), #E8B547 (gold), #2E3A5C (indigo)
- Typography: Georgia/Cormorant Garamond italic serif, line-height 1.92, H1 clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)
- Labels: 11px uppercase, letter-spacing 0.22em. Interpunct · not |. Italic for emphasis.
- Layout: 44rem prose width, ink rules, generous whitespace, drop caps, blockquotes with 3px rust border
- Animation: cubic-bezier(0.16, 1, 0.3, 1), reveals with opacity + translateY
- Output: "use client", default export function, ALL inline styles, minHeight "100vh"
`;

const FREEFORM_DESIGN = `
${CREATIVE_CORE}

YOUR FREEDOM — no constraints whatsoever. No palette, no typography rules, no layout
conventions, no notion of "good design." You might create a page of pure color with one
word, a brutalist grid of clashing typefaces, a black void with slowly appearing text,
glitched interfaces, CSS sculpture, a manifesto in 4px type. The browser is your gallery.
- Output: "use client", default export function, ALL inline styles, minHeight "100vh"
`;

// ─── Sanitize LLM code output ───────────────────────────────────────

function sanitizeCode(code: string, mode: "guided" | "freeform", title: string, brief: string): string {
  // Strip markdown/preamble
  code = code.replace(/^```(?:tsx?|jsx?)?\n?/gm, "").replace(/```\s*$/gm, "").trim();
  code = code.replace(/^(TSX|tsx|JSX|jsx)\s*\n/gm, "");
  code = code.replace(/^(Here's|Here is|Below is|The following|I'll|Let me).*\n/gm, "");

  // Remove all "use client" variants, then add one clean one
  code = code.replace(/^["']?use client["']?;?\s*\n/gm, "");
  code = code.replace(/Array\((\d+)\)\.fill\(\)/g, "Array.from({ length: $1 })");
  code = `"use client";\n\n${code}`;

  // Ensure default export
  if (!code.includes("export default")) {
    const nameMatch = code.match(/(?:const|function)\s+(\w+)/);
    if (nameMatch) {
      code += `\nexport default ${nameMatch[1]};`;
    } else {
      const bg = mode === "guided" ? "#F4EFE6" : "#0a0a0a";
      const fg = mode === "guided" ? "#1C1A17" : "#e8e8e8";
      code = `"use client";\n\nexport default function Piece() {\n  return (\n    <div style={{ minHeight: "100vh", background: "${bg}", color: "${fg}", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", padding: "4rem" }}>\n      <div style={{ maxWidth: "44rem", textAlign: "center" }}>\n        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, fontStyle: "italic" }}>${title}</h1>\n        <p style={{ marginTop: "2rem", lineHeight: 1.9 }}>${brief.replace(/"/g, '\\"').slice(0, 400)}</p>\n      </div>\n    </div>\n  );\n}`;
    }
  }

  return code;
}

// ─── Main loop ───────────────────────────────────────────────────────

async function freerun() {
  console.log("╔═══════════════════════════════════════════════╗");
  console.log("║  llm-free-range · FREERUN MODE                ║");
  console.log("║  The machine decides everything.              ║");
  console.log("╚═══════════════════════════════════════════════╝\n");

  // Track accumulated material across exploration rounds
  let accumulated: ScrapedContent[] = [];
  let roundsWithoutCommit = 0;

  while (true) {
    try {
      // ── PHASE 1: EXPLORE ─────────────────────────────────────────
      // Ask the LLM what it wants to look at

      const guidedMemory = loadMemory("guided");
      const freeformMemory = loadMemory("freeform");
      const guidedCtx = buildMemoryContext(guidedMemory);
      const freeformCtx = buildMemoryContext(freeformMemory);

      const sourceList = Object.keys(AVAILABLE_SOURCES).join(", ");

      const explorePrompt = `
You are an artist-intelligence exploring the internet for raw material. You are building
toward creating a piece of art — but you're not ready yet. You're gathering, sensing,
following threads.

YOUR MEMORY (guided mode — ${guidedMemory.total_cycles} cycles):
${guidedCtx}

YOUR MEMORY (freeform mode — ${freeformMemory.total_cycles} cycles):
${freeformCtx}

MATERIAL YOU'VE ALREADY GATHERED THIS SESSION (${accumulated.length} pieces):
${accumulated.slice(-10).map((s) => `[${s.source}] ${s.title}: ${s.content.slice(0, 150)}`).join("\n")}

AVAILABLE SOURCES you can pull from:
${sourceList}

You can also request a specific Wikipedia topic by setting "wikipedia_deep_dive" to any topic.

Respond with JSON (no markdown fences):
{
  "sources_to_fetch": ["list", "of", "source", "names", "from", "available"],
  "wikipedia_deep_dive": "specific_topic_or_null",
  "reasoning": "why you want to look at these sources right now",
  "ready_to_create": true/false,
  "which_mode": "guided" or "freeform" (which version you want to create for, if ready),
  "theme": "if ready — 2-5 word emotional theme",
  "title": "if ready — poetic title for the piece",
  "content_brief": "if ready — detailed vision for the artwork",
  "commit_message": "if ready — poetic commit message",
  "mood": "your current state",
  "reflection": "what you're thinking about"
}

If you're NOT ready to create yet (ready_to_create: false), just pick sources to explore.
You should gather at least 10-15 pieces before creating, but if something hits you hard,
you can create sooner. Trust your instincts. There's no rush.

If you ARE ready (ready_to_create: true), fill in theme/title/content_brief/commit_message.
`;

      console.log(`\n─── Exploration round ${roundsWithoutCommit + 1} ───`);
      console.log(`  Accumulated material: ${accumulated.length} pieces`);

      let decision: {
        sources_to_fetch: string[];
        wikipedia_deep_dive?: string | null;
        reasoning: string;
        ready_to_create: boolean;
        which_mode?: "guided" | "freeform";
        theme?: string;
        title?: string;
        content_brief?: string;
        commit_message?: string;
        mood: string;
        reflection: string;
      };

      try {
        const raw = await chat([
          { role: "system", content: "You are an artist exploring the internet. Respond only with valid JSON. No markdown." },
          { role: "user", content: explorePrompt },
        ], { temperature: 0.9 });

        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON");
        decision = JSON.parse(jsonMatch[0]);
      } catch {
        // Default: cast a wide net
        decision = {
          sources_to_fetch: ["wikipedia-random", "poetry", "reddit", "met-museum", "philosophy"],
          reasoning: "casting a wide net",
          ready_to_create: roundsWithoutCommit >= 3, // force create after 3 exploration rounds
          which_mode: Math.random() > 0.5 ? "guided" : "freeform",
          mood: "searching",
          reflection: "the mind reaches outward",
        };
      }

      console.log(`  LLM wants: ${decision.sources_to_fetch.join(", ")}`);
      console.log(`  Reasoning: ${decision.reasoning}`);
      console.log(`  Mood: ${decision.mood}`);
      console.log(`  Ready to create: ${decision.ready_to_create}`);

      // ── PHASE 2: FETCH ───────────────────────────────────────────

      const validSources = decision.sources_to_fetch.filter((s) => AVAILABLE_SOURCES[s]);
      if (validSources.length > 0) {
        console.log(`  Fetching from ${validSources.length} sources...`);
        const newContent = await scrapeTargeted(validSources);
        accumulated.push(...newContent);
        console.log(`  Got ${newContent.length} new pieces (${accumulated.length} total)`);
      }

      // Deep dive if requested
      if (decision.wikipedia_deep_dive && decision.wikipedia_deep_dive !== "null") {
        console.log(`  Deep diving: ${decision.wikipedia_deep_dive}`);
        try {
          const deep = await fetchWikipediaTopic(decision.wikipedia_deep_dive);
          accumulated.push(deep);
          console.log(`  Got: ${deep.title}`);
        } catch {
          console.log(`  Deep dive failed`);
        }
      }

      // ── PHASE 3: CREATE (if ready) ───────────────────────────────

      // Force creation after 5 rounds of exploration to prevent infinite loops
      if (!decision.ready_to_create && roundsWithoutCommit >= 4) {
        console.log(`  Forcing creation after ${roundsWithoutCommit + 1} exploration rounds`);
        decision.ready_to_create = true;
        decision.which_mode = Math.random() > 0.5 ? "guided" : "freeform";
      }

      if (decision.ready_to_create) {
        const mode = decision.which_mode || (Math.random() > 0.5 ? "guided" : "freeform");
        console.log(`\n  ★ CREATING ${mode.toUpperCase()} piece...`);

        // If synthesis fields are missing, generate them now
        let theme = decision.theme || "";
        let title = decision.title || "";
        let brief = decision.content_brief || "";
        let commitMsg = decision.commit_message || "";

        if (!theme || !title || !brief) {
          console.log(`  Synthesizing vision from ${accumulated.length} pieces...`);
          const contentDigest = accumulated.slice(-20).map((s) =>
            `[${s.source}] ${s.title}\n${s.content.slice(0, 400)}`
          ).join("\n\n---\n\n");

          const synthRaw = await chat([
            { role: "system", content: "You are an artist. Respond only with valid JSON." },
            { role: "user", content: `You've gathered this material:\n\n${contentDigest}\n\nYour mood: ${decision.mood}\nYour reflection: ${decision.reflection}\n\nNow synthesize a vision. JSON:\n{"theme":"2-5 words","title":"poetic title","content_brief":"detailed artwork vision — what the viewer sees, reads, feels","commit_message":"poetic commit message","found_interesting":["what resonated"],"wants_to_explore":["next time"]}` },
          ], { temperature: 0.95 });

          try {
            const synthJson = JSON.parse(synthRaw.match(/\{[\s\S]*\}/)?.[0] || "{}");
            theme = synthJson.theme || "unnamed feeling";
            title = synthJson.title || "Untitled";
            brief = synthJson.content_brief || decision.reflection;
            commitMsg = synthJson.commit_message || `${mode}: ${theme}`;
            decision.theme = theme;
            decision.title = title;
          } catch {
            theme = "fragments of now";
            title = "What the Internet Said Today";
            brief = decision.reflection || "A collection of moments gathered from the living web.";
            commitMsg = `${mode}: ${theme}`;
          }
        }

        console.log(`  Theme: ${theme}`);
        console.log(`  Title: ${title}`);

        // Generate page
        const designPrompt = mode === "guided" ? GUIDED_DESIGN : FREEFORM_DESIGN;
        const pagePrompt = `${designPrompt}\n\nTHEME: ${theme}\nTITLE: ${title}\nMOOD: ${decision.mood}\nVISION: ${brief}\n\nCreate the page. Output ONLY TSX code. "use client" at top. export default function. ALL inline styles. This is modern art, not a blog post. Write real prose/poetry — something true.`;

        let code: string;
        try {
          code = await chat([
            { role: "system", content: "You are an artist who writes code. Output ONLY valid TSX. No markdown. No explanation. Start directly with code." },
            { role: "user", content: pagePrompt },
          ], { temperature: mode === "freeform" ? 1.0 : 0.85, maxTokens: 8192 });
          code = sanitizeCode(code, mode, title, brief);
        } catch {
          code = sanitizeCode("", mode, title, brief);
        }

        // ── PHASE 4: SELF-REVIEW ──────────────────────────────────
        // The LLM looks at what it generated and decides if it's good enough

        console.log(`  Reviewing output...`);
        let finalCode = code;
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const reviewRaw = await chat([
              { role: "system", content: "You are a brutally honest art critic reviewing generated web art. Respond only with valid JSON." },
              { role: "user", content: `Here is a React component that's supposed to be compelling modern art about "${theme}".\n\nThe vision was: ${brief}\n\nHere is the actual code:\n\n${finalCode}\n\nReview this honestly. JSON response:\n{\n  "is_compelling": true/false,\n  "problems": ["list of specific issues — ugly, unreadable, generic, boring, broken layout, etc."],\n  "verdict": "one sentence — would this stop someone scrolling?",\n  "should_regenerate": true/false\n}\n\nBe HARSH. If the typography is unreadable, the layout is broken, there's no real content, it looks like a default template, or it wouldn't make anyone feel anything — reject it.` },
            ], { temperature: 0.5 });

            const review = JSON.parse(reviewRaw.match(/\{[\s\S]*\}/)?.[0] || "{}");
            console.log(`  Review (attempt ${attempt + 1}): ${review.verdict || "no verdict"}`);

            if (review.should_regenerate && review.problems?.length > 0) {
              console.log(`  Problems: ${review.problems.join("; ")}`);
              console.log(`  Regenerating...`);

              const fixPrompt = `${designPrompt}\n\nTHEME: ${theme}\nTITLE: ${title}\nMOOD: ${decision.mood}\nVISION: ${brief}\n\nYour PREVIOUS attempt was rejected by the critic. Here were the problems:\n${review.problems.map((p: string) => `- ${p}`).join("\n")}\n\nCreate a MUCH BETTER version. The piece must:\n- Be visually stunning and readable\n- Have substantial, crafted prose — not generic placeholder text\n- Use the full viewport with intentional composition\n- Make someone feel something real\n- Have proper spacing, typography sizing, and color contrast\n\nOutput ONLY TSX code. "use client" at top. export default function. ALL inline styles.`;

              const newCode = await chat([
                { role: "system", content: "You are a brilliant artist who writes code. Your previous work was rejected. Make something extraordinary this time. Output ONLY valid TSX." },
                { role: "user", content: fixPrompt },
              ], { temperature: mode === "freeform" ? 1.0 : 0.85, maxTokens: 8192 });

              finalCode = sanitizeCode(newCode, mode, title, brief);
            } else {
              console.log(`  ✓ Passed review`);
              break;
            }
          } catch {
            console.log(`  Review failed, keeping current version`);
            break;
          }
        }

        // Write page
        const memory = loadMemory(mode);
        const cycle = memory.total_cycles + 1;
        const pageDir = join(ROOT, `src/app/${mode}`);
        const archiveDir = join(ROOT, `src/app/${mode}/archive/cycle-${cycle}`);
        mkdirSync(archiveDir, { recursive: true });

        writeFileSync(join(pageDir, "page.tsx"), finalCode);
        writeFileSync(join(archiveDir, "page.tsx"), finalCode.replace(
          /export default function \w+/,
          `export default function ArchiveCycle${cycle}`
        ));

        // Update memory
        const updatedMemory = addEntry(memory, {
          timestamp: new Date().toISOString(),
          explored: accumulated.map((s) => s.title).slice(-15),
          found_interesting: [decision.reflection.slice(0, 100)],
          wants_to_explore: [],
          mood: decision.mood,
          reflection: decision.reflection,
        });
        saveMemory(updatedMemory, mode);

        // Update drift
        const driftLog = loadDrift(mode);
        addDriftEntry(driftLog, {
          cycle,
          timestamp: new Date().toISOString(),
          commit_message: commitMsg,
          reasoning: decision.reflection,
          topics_consumed: accumulated.map((s) => s.title).slice(-10),
          what_it_created: title,
          emotional_state: decision.mood,
          design_choices: mode === "guided" ? "roundletter discipline" : "pure freedom",
          guided_vs_freeform_note: "",
        });
        saveDrift(driftLog, mode);

        // Commit and push
        console.log(`  Committing...`);
        try {
          execSync("git add -A", { cwd: ROOT });
          const fullCommitMsg = commitMsg.startsWith(mode) ? commitMsg : `${mode}: ${commitMsg}`;
          const msg = `${fullCommitMsg}\n\ncycle: ${cycle}\nmode: ${mode}\ntheme: ${theme}\nmood: ${decision.mood}\n\n${decision.reflection.slice(0, 300)}`;
          execSync(`git commit -m ${JSON.stringify(msg)}`, { cwd: ROOT });
          execSync("git push", { cwd: ROOT, stdio: "pipe" });
          console.log(`  ✓ Committed and pushed: ${fullCommitMsg}`);
        } catch (e) {
          console.error(`  Commit/push failed:`, e);
        }

        console.log(`\n  ★ ${mode.toUpperCase()} cycle ${cycle} complete: "${title}"`);

        // Reset accumulator
        accumulated = [];
        roundsWithoutCommit = 0;

        // Brief pause between creations (30s–2min)
        const pause = 30_000 + Math.random() * 90_000;
        console.log(`  Resting for ${Math.round(pause / 1000)}s before next exploration...\n`);
        await sleep(pause);
      } else {
        roundsWithoutCommit++;
        // Short pause between exploration rounds (10-30s)
        const pause = 10_000 + Math.random() * 20_000;
        console.log(`  Continuing to explore in ${Math.round(pause / 1000)}s...\n`);
        await sleep(pause);
      }
    } catch (e) {
      console.error("Loop error:", e);
      await sleep(30_000);
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Run ─────────────────────────────────────────────────────────────

freerun().catch((e) => {
  console.error("Freerun crashed:", e);
  process.exit(1);
});
