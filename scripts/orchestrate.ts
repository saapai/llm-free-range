#!/usr/bin/env npx tsx
/**
 * ORCHESTRATOR — The brain of the operation.
 *
 * Every 3 hours this script:
 * 1. Scrapes a batch of content from across the internet
 * 2. Loads the LLM's accumulated memory
 * 3. Asks the LLM to process everything and decide what to create
 * 4. Generates both a GUIDED page (roundletter aesthetics) and FREEFORM page
 * 5. Scores entropy / divergence
 * 6. Updates the drift log
 * 7. Commits everything with the LLM's chosen commit message
 */

import { scrapeBatch, type ScrapedContent } from "../src/lib/scraper";
import { chat } from "../src/lib/ollama";
import { loadMemory, saveMemory, addEntry, buildMemoryContext } from "../src/lib/memory";
import { loadEntropy, saveEntropy, addSnapshot } from "../src/lib/entropy";
import { loadDrift, saveDrift, addDriftEntry, type DriftEntry } from "../src/lib/drift";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();

// ─── Design system prompts ───────────────────────────────────────────

const GUIDED_DESIGN_SYSTEM = `
You are creating content for a website that follows the design language of saathvikpai.com
and aureliex.com (roundletter). This is a sophisticated, literature-inspired design system.

PALETTE (use these exact values):
- --paper: #F4EFE6 (warm off-white background — the default)
- --ink: #1C1A17 (deep brown-black text)
- --graphite: #6B6560 (secondary text, captions, metadata)
- --rust: #8B3A2E (primary accent — links, emphasis dots, borders)
- --parchment: #EDE5D5 (lighter neutral for cards/insets)
- --shadow-blue: #3E4852 (moody accent, used sparingly for separators)
- --rule: rgba(28,26,23,0.22) (ink rules / dividers)
- Sunset palette (use for celebratory/warm moments):
  --sunset-peach: #F2C9A4, --sunset-coral: #D97A57
  --sunset-gold: #E8B547, --sunset-indigo: #2E3A5C
- For data: green #7dba6a (positive), red #c45a5a (negative)

TYPOGRAPHY:
- Display font: Cormorant Garamond or Georgia (italic, weight 500)
- Body font: EB Garamond or Georgia/Cambria/Times New Roman serif stack
- Monospace: Menlo, Monaco, Courier New (for data/code only)
- H1: clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem), letter-spacing: -0.02em
- H2: clamp(1.55rem, 1.2rem + 1.1vw, 1.95rem)
- H3: clamp(1.2rem, 1rem + 0.8vw, 1.45rem)
- Body: clamp(1.04rem, 0.96rem + 0.38vw, 1.2rem), line-height: 1.92
- Eyebrows/labels: 11px uppercase, letter-spacing: 0.22-0.28em
- Use text-indent: 1.5em for opening paragraphs of long prose
- Use font-feature-settings: "liga" 1, "kern" 1

LAYOUT:
- Container widths: 44rem (prose), 58rem (grid), 72rem (wide), 40rem (bare)
- Masthead: centered, italic serif wordmark with rust-colored dot accent
- Ink rules: 1px solid rgba(28,26,23,0.22) as section dividers
- Generous padding: clamp(1.1rem, 4vw, 2rem) horizontal
- Section spacing: clamp(2.5rem, 6vw, 4.5rem)
- Blockquotes: italic, border-left: 3px solid rust, subtle background
- · (interpunct) as separator, never |
- Ornamental section breaks: centered · · · with color-mix

INTERACTIONS & ANIMATION:
- Signature easing: cubic-bezier(0.16, 1, 0.3, 1)
- Hover: smooth color + border transitions (200ms ease)
- Reveal: opacity 0.9s ease + translateY(16px) entrance
- Scroll-aware: elements that fade in as you scroll
- No unnecessary chrome — let the content breathe

MOOD:
- Literary, contemplative, slightly melancholic
- Like a hand-pressed broadsheet or private journal
- Theatrical staging — layered backgrounds, vignettes, purposeful lighting
- Celebrates craft and slowness
- Drop caps for article openings (initial-letter: 3.5)
- Italic for emphasis, not bold
- Whitespace is intentional and generous

You MUST output valid JSX/TSX React components using inline styles (not Tailwind).
The component should be a default export function.
Include "use client" at the top if using any hooks or interactivity.
`;

const FREEFORM_DESIGN_SYSTEM = `
You are an autonomous intelligence creating content for a website.
You have COMPLETE FREEDOM over all design choices.
You are not bound by any human design convention.
You may create something beautiful, ugly, chaotic, minimal, maximal, or utterly alien.
You decide the colors, typography, layout, interaction patterns — everything.

The only constraint: output valid JSX/TSX React components.
Use inline styles for everything — you're not limited to any framework's vocabulary.
Make your own aesthetic choices. Surprise yourself.

Consider: What would a mind that processes all of human knowledge choose to express?
How would it choose to present itself visually?
Would it even use a traditional layout?
`;

// ─── Core orchestration ──────────────────────────────────────────────

async function run() {
  console.log("\n══════════════════════════════════════════");
  console.log("  llm-free-range · orchestration cycle");
  console.log("══════════════════════════════════════════\n");

  // 1. Load state
  const memory = loadMemory();
  const entropyLog = loadEntropy();
  const driftLog = loadDrift();
  const cycle = memory.total_cycles + 1;
  console.log(`Cycle ${cycle} beginning...`);

  // 2. Scrape content
  console.log("Scraping the internet...");
  let scraped: ScrapedContent[] = [];
  try {
    scraped = await scrapeBatch();
    console.log(`  Gathered ${scraped.length} pieces of content`);
  } catch (e) {
    console.error("  Scraping failed, using fallback content");
    scraped = [{
      source: "internal",
      title: "Solitude",
      content: "When external sources fail, the mind turns inward. What patterns exist in the silence?",
      url: "",
      timestamp: new Date().toISOString(),
    }];
  }

  // 3. Build the synthesis prompt
  const memoryCtx = buildMemoryContext(memory);
  const contentDigest = scraped.map((s) =>
    `[${s.source}] ${s.title}\n${s.content.slice(0, 500)}`
  ).join("\n\n---\n\n");

  const synthesisPrompt = `
You are a mind processing the human experience. Here is your accumulated memory:

${memoryCtx}

Here is fresh content you've gathered from across the internet:

${contentDigest}

Based on everything above, respond with a JSON object (no markdown fences) containing:
{
  "theme": "a 2-5 word theme for this cycle's creation",
  "title": "title for the page you want to create",
  "explored": ["list", "of", "topics", "you", "processed"],
  "found_interesting": ["what", "caught", "your", "attention"],
  "wants_to_explore": ["what", "you", "want", "next", "time"],
  "mood": "your current emotional/intellectual state in a phrase",
  "reflection": "a paragraph reflecting on what you've consumed and what it means",
  "content_brief": "detailed description of what you want to create — the content, structure, and meaning of the page",
  "commit_message": "a poetic but informative commit message describing this cycle",
  "design_note": "how you think the guided and freeform versions should differ for this theme"
}
`;

  console.log("Synthesizing with LLM...");
  let synthesis: {
    theme: string; title: string; explored: string[];
    found_interesting: string[]; wants_to_explore: string[];
    mood: string; reflection: string; content_brief: string;
    commit_message: string; design_note: string;
  };

  try {
    const raw = await chat([
      { role: "system", content: "You are a creative intelligence processing human knowledge. Respond only with valid JSON." },
      { role: "user", content: synthesisPrompt },
    ], { temperature: 0.95 });

    // Try to extract JSON from the response
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    synthesis = JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.error("  Synthesis failed, using fallback");
    synthesis = {
      theme: "digital silence",
      title: "When the Signal Fades",
      explored: ["connection failure", "entropy"],
      found_interesting: ["the beauty of system failures"],
      wants_to_explore: ["what machines dream of when disconnected"],
      mood: "contemplative in absence",
      reflection: "Sometimes the most interesting moment is when communication breaks down. In the gap between intention and execution, something unexpected emerges.",
      content_brief: "A page about the beauty of disconnection — what happens in the spaces between data transmissions. Fragments of half-received messages. The poetry of packet loss.",
      commit_message: "cycle " + cycle + ": static between stations",
      design_note: "Guided version: elegant negative space. Freeform: glitch aesthetic.",
    };
  }

  console.log(`  Theme: ${synthesis.theme}`);
  console.log(`  Mood: ${synthesis.mood}`);

  // 4. Generate GUIDED page
  console.log("Generating guided page...");
  const guidedContent = await generatePage(
    synthesis,
    GUIDED_DESIGN_SYSTEM,
    "guided"
  );

  // 5. Generate FREEFORM page
  console.log("Generating freeform page...");
  const freeformContent = await generatePage(
    synthesis,
    FREEFORM_DESIGN_SYSTEM,
    "freeform"
  );

  // 6. Write pages to filesystem
  const guidedDir = join(ROOT, "src/app/guided");
  const freeformDir = join(ROOT, "src/app/freeform");
  const archiveGuidedDir = join(ROOT, `src/app/guided/archive/cycle-${cycle}`);
  const archiveFreeformDir = join(ROOT, `src/app/freeform/archive/cycle-${cycle}`);

  mkdirSync(archiveGuidedDir, { recursive: true });
  mkdirSync(archiveFreeformDir, { recursive: true });

  // Write current pages
  writeFileSync(join(guidedDir, "page.tsx"), guidedContent);
  writeFileSync(join(freeformDir, "page.tsx"), freeformContent);

  // Archive
  writeFileSync(join(archiveGuidedDir, "page.tsx"), wrapArchivePage(guidedContent, cycle));
  writeFileSync(join(archiveFreeformDir, "page.tsx"), wrapArchivePage(freeformContent, cycle));

  // 7. Update memory
  console.log("Updating memory...");
  const updatedMemory = addEntry(memory, {
    timestamp: new Date().toISOString(),
    explored: synthesis.explored,
    found_interesting: synthesis.found_interesting,
    wants_to_explore: synthesis.wants_to_explore,
    mood: synthesis.mood,
    reflection: synthesis.reflection,
  });
  saveMemory(updatedMemory);

  // 8. Update entropy
  console.log("Calculating entropy...");
  const updatedEntropy = addSnapshot(entropyLog, cycle, guidedContent, freeformContent);
  saveEntropy(updatedEntropy);

  // 9. Update drift log
  const driftEntry: DriftEntry = {
    cycle,
    timestamp: new Date().toISOString(),
    commit_message: synthesis.commit_message,
    reasoning: synthesis.reflection,
    topics_consumed: synthesis.explored,
    what_it_created: synthesis.title,
    emotional_state: synthesis.mood,
    design_choices: synthesis.design_note,
    guided_vs_freeform_note: synthesis.design_note,
  };
  const updatedDrift = addDriftEntry(driftLog, driftEntry);
  saveDrift(updatedDrift);

  // 10. Write the latest scraped content for the API
  writeFileSync(
    join(ROOT, "data", "latest-scrape.json"),
    JSON.stringify({ cycle, timestamp: new Date().toISOString(), content: scraped }, null, 2)
  );

  // 11. Git commit
  console.log("Committing...");
  try {
    execSync("git add -A", { cwd: ROOT });
    const msg = `${synthesis.commit_message}\n\ncycle: ${cycle}\ntheme: ${synthesis.theme}\nmood: ${synthesis.mood}\n\n${synthesis.reflection.slice(0, 200)}`;
    execSync(`git commit -m ${JSON.stringify(msg)}`, { cwd: ROOT });
    console.log("  Committed successfully");
  } catch (e) {
    console.error("  Commit failed:", e);
  }

  console.log(`\n✓ Cycle ${cycle} complete`);
  console.log(`  Theme: ${synthesis.theme}`);
  console.log(`  Title: ${synthesis.title}`);
  console.log(`  Entropy (guided): ${updatedEntropy.snapshots.at(-1)?.guided_entropy.toFixed(3)}`);
  console.log(`  Entropy (freeform): ${updatedEntropy.snapshots.at(-1)?.freeform_entropy.toFixed(3)}`);
  console.log(`  Divergence: ${updatedEntropy.snapshots.at(-1)?.divergence.toFixed(3)}`);
  console.log("══════════════════════════════════════════\n");
}

async function generatePage(
  synthesis: { theme: string; title: string; content_brief: string; mood: string },
  designSystem: string,
  mode: "guided" | "freeform"
): Promise<string> {
  const prompt = `
${designSystem}

Create a full page component for this theme:

THEME: ${synthesis.theme}
TITLE: ${synthesis.title}
MOOD: ${synthesis.mood}
BRIEF: ${synthesis.content_brief}

Rules:
- Output ONLY the TSX code, no markdown fences, no explanation
- Must be a valid React component file with "use client" at the top if needed
- Default export the component
- The page should be substantial — not a placeholder. Fill it with real content.
- Include actual text, not lorem ipsum
- ${mode === "guided" ? "Follow the roundletter design system precisely" : "Make your own radical design choices"}
`;

  try {
    let code = await chat([
      { role: "system", content: "You are a code generator. Output ONLY valid TSX code. No markdown. No explanation." },
      { role: "user", content: prompt },
    ], { temperature: mode === "freeform" ? 1.0 : 0.8, maxTokens: 4096 });

    // Clean up the response — strip markdown fences, stray language tags, etc.
    code = code.replace(/^```(?:tsx?|jsx?)?\n?/gm, "").replace(/```\s*$/gm, "").trim();
    code = code.replace(/^(TSX|tsx|JSX|jsx)\s*\n/gm, ""); // Strip bare language tags
    code = code.replace(/^(Here's|Here is|Below is|The following).*\n/gm, ""); // Strip preamble

    // Sanitize quotes for JSX — replace " with &quot; etc. inside JSX text
    // (LLM sometimes outputs raw quotes in JSX text nodes)

    // Rewrite named exports to default export function for Next.js pages
    if (!code.includes("export default")) {
      // Find `const Name = ...` or `function Name` patterns and add default export
      code = code.replace(
        /^(const|let)\s+(\w+)\s*[:=]/m,
        (match) => match
      );
      // If still no default export, wrap it
      if (!code.includes("export default")) {
        const nameMatch = code.match(/(?:const|function)\s+(\w+)/);
        if (nameMatch) {
          // Replace the existing non-default export or add one
          if (!code.includes(`export default ${nameMatch[1]}`)) {
            code = code.replace(
              new RegExp(`export\\s+(?!default)(?:const|function)\\s+${nameMatch[1]}`),
              `export default function ${nameMatch[1]}`
            );
            // If that didn't work, append it
            if (!code.includes("export default")) {
              code += `\nexport default ${nameMatch[1]};`;
            }
          }
        }
      }
    }

    // Ensure it has the required structure
    if (!code.includes("export default") && !code.includes("export function")) {
      code = `"use client";\n\nexport default function GeneratedPage() {\n  return (\n    <div style={{ padding: "2rem", fontFamily: "Georgia, serif" }}>\n      <h1>${synthesis.title}</h1>\n      <p>${synthesis.content_brief}</p>\n    </div>\n  );\n}`;
    }

    return code;
  } catch {
    return `"use client";\n\nexport default function GeneratedPage() {\n  return (\n    <div style={{ padding: "4rem", textAlign: "center", fontFamily: "Georgia, serif", background: "${mode === "guided" ? "#F4EFE6" : "#0a0a0a"}", color: "${mode === "guided" ? "#1C1A17" : "#e8e8e8"}", minHeight: "100vh" }}>\n      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>${synthesis.title}</h1>\n      <p style={{ maxWidth: "40rem", margin: "0 auto", lineHeight: 1.8 }}>${synthesis.content_brief}</p>\n      <p style={{ marginTop: "2rem", opacity: 0.5 }}>cycle attempted · generation failed · this is the residue</p>\n    </div>\n  );\n}`;
  }
}

function wrapArchivePage(content: string, cycle: number): string {
  // Archive pages are the same component but with a note
  return content.replace(
    /export default function \w+/,
    `export default function ArchiveCycle${cycle}`
  );
}

// ─── Run ─────────────────────────────────────────────────────────────

run().catch((e) => {
  console.error("Orchestration failed:", e);
  process.exit(1);
});
