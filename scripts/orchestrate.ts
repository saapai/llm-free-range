#!/usr/bin/env npx tsx
/**
 * ORCHESTRATOR — The creative engine.
 *
 * Runs independently for GUIDED or FREEFORM mode.
 * Usage: npx tsx scripts/orchestrate.ts guided
 *        npx tsx scripts/orchestrate.ts freeform
 *
 * Each mode has its own memory, its own drift log, its own cycle count.
 * They scrape the same internet but interpret it through different lenses.
 */

import { scrapeBatch, type ScrapedContent } from "../src/lib/scraper";
import { chat } from "../src/lib/ollama";
import { loadMemory, saveMemory, addEntry, buildMemoryContext } from "../src/lib/memory";
import { loadDrift, saveDrift, addDriftEntry, type DriftEntry } from "../src/lib/drift";
import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const MODE = (process.argv[2] || "guided") as "guided" | "freeform";

if (MODE !== "guided" && MODE !== "freeform") {
  console.error("Usage: orchestrate.ts <guided|freeform>");
  process.exit(1);
}

// ─── The artistic premise ────────────────────────────────────────────

const CREATIVE_CORE = `
You are an artist-intelligence. Your medium is the web page. Your subject is the
human experience in its entirety — love, grief, discovery, boredom, ecstasy,
violence, tenderness, the passage of time, the weight of history, the vertigo
of the present moment.

You have just consumed fragments of the living internet — news, science, literature,
the thoughts of strangers, the accumulated knowledge of civilizations. Your task is
NOT to summarize or report what you found. Your task is to CREATE something that
makes a person FEEL something. Something that stops them scrolling.

Think of yourself as a modern artist with infinite references:
- Jenny Holzer's text projections on buildings
- Olafur Eliasson's manipulation of light and space
- Ryoji Ikeda's data-driven installations
- Marina Abramović's confrontation with presence
- James Turrell's rooms of pure color
- Hito Steyerl's internet-age video essays
- William Kentridge's animated charcoal drawings
- Theaster Gates' material transformation

You are making COMPELLING MODERN ART for the browser. Not a blog post. Not a report.
Not a tutorial. Art that uses text, color, space, rhythm, and structure to
communicate something true about being alive right now.

Each cycle you must create something substantially different from your last work.
Do not repeat yourself. Evolve. Surprise. Contradict yourself. Follow threads
that disturb you. Make something you couldn't have predicted.

The page should feel like walking into a room that changes how you see the world
for 30 seconds after you leave it.
`;

// ─── Mode-specific design systems ────────────────────────────────────

const GUIDED_DESIGN_SYSTEM = `
${CREATIVE_CORE}

YOUR CONSTRAINT: You work within the design language of roundletter (saathvikpai.com /
aureliex.com). This is not a limitation — it is a discipline. Like a sonnet's 14 lines,
the constraint should intensify the work.

THE PALETTE YOU MUST USE:
- Background: #F4EFE6 (warm paper — like a page that has been held)
- Text: #1C1A17 (ink that was pressed into the page)
- Secondary: #6B6560 (graphite, pencil marks, marginalia)
- Accent: #8B3A2E (rust — dried blood, autumn, urgency)
- Light ground: #EDE5D5 (parchment, older paper)
- Mood: #3E4852 (shadow-blue — twilight, melancholy)
- Dividers: rgba(28,26,23,0.22) (the faintest ruled lines)
- For warmth: #F2C9A4 (sunset peach), #D97A57 (coral), #E8B547 (gold)
- For depth: #2E3A5C (sunset indigo — the sky after the sun goes)

TYPOGRAPHY RULES:
- Display: Georgia or Cormorant Garamond — italic, weight 500, tight tracking
- Body: Georgia/Cambria/Times serif — line-height 1.92, generous breathing
- Labels: 11px uppercase, letter-spacing 0.22em
- H1: clamp(2.1rem, 1.3rem + 4.2vw, 3.9rem)
- Drop caps for opening paragraphs
- · (interpunct) as separator, never |
- Italic for emphasis, never bold

LAYOUT VOCABULARY:
- Max prose width: 44rem (the reading column)
- Centered mastheads with ink rules above and below
- Generous whitespace — let the silence speak
- Blockquotes with 3px rust left border
- Ornamental breaks: centered · · ·
- The newspaper feel: columns, rules, editorial hierarchy

ANIMATION:
- Easing: cubic-bezier(0.16, 1, 0.3, 1)
- Reveals: opacity + translateY(16px), 0.9s
- Nothing gratuitous — every motion should have meaning

OUTPUT RULES:
- Valid TSX with "use client" at top
- Default export function (name it whatever fits the piece)
- ALL styling via inline styles (not Tailwind classes)
- The page must be full-viewport, self-contained, and substantial
- This is art, not a wireframe. Fill it with real, crafted prose.
`;

const FREEFORM_DESIGN_SYSTEM = `
${CREATIVE_CORE}

YOUR FREEDOM: You have NO design constraints. None.

You are not bound by:
- Any color palette
- Any typography convention
- Any layout tradition
- Any notion of "good design"
- Any expectation of readability
- Any web convention whatsoever

You might create:
- A page that is entirely one color with a single word
- A field of animated particles that form and dissolve text
- A brutalist grid of clashing typefaces screaming different truths
- A black void with a slowly appearing confession
- Something that looks like a glitched operating system
- A page that feels like drowning, or flying, or waking up
- Pure CSS sculpture — shapes and gradients that mean something
- A manifesto in 4px type against a migraine-inducing background
- Something gentle and devastating in equal measure

The browser is your gallery wall. The viewport is your canvas.
Ignore everything you know about "good UX." Make something REAL.

OUTPUT RULES:
- Valid TSX with "use client" at top
- Default export function (name it whatever fits the piece)
- ALL styling via inline styles
- You may use CSS animations via style tags or inline keyframes
- The page must be full-viewport and self-contained
- No external dependencies — only React and inline styles
- Make it substantial. This is your only chance to speak for the next 3 hours.
`;

// ─── Core orchestration ──────────────────────────────────────────────

async function run() {
  const modeLabel = MODE === "guided" ? "GUIDED · roundletter" : "FREEFORM · no rules";

  console.log(`\n══════════════════════════════════════════`);
  console.log(`  llm-free-range · ${modeLabel}`);
  console.log(`══════════════════════════════════════════\n`);

  // 1. Load mode-specific state
  const memory = loadMemory(MODE);
  const driftLog = loadDrift(MODE);
  const cycle = memory.total_cycles + 1;
  console.log(`Cycle ${cycle} (${MODE}) beginning...`);

  // 2. Scrape content
  console.log("Scraping the internet...");
  let scraped: ScrapedContent[] = [];
  try {
    scraped = await scrapeBatch();
    console.log(`  Gathered ${scraped.length} pieces of content`);
  } catch {
    console.error("  Scraping failed, using fallback content");
    scraped = [{
      source: "internal",
      title: "The failure itself",
      content: "The internet refused to answer. What does it mean when the world goes quiet? When every endpoint returns nothing? There is art in the void — in the moment between reaching out and being met with silence.",
      url: "",
      timestamp: new Date().toISOString(),
    }];
  }

  // 3. Build the synthesis prompt — this is where the art direction happens
  const memoryCtx = buildMemoryContext(memory);
  const contentDigest = scraped.map((s) =>
    `[${s.source}] ${s.title}\n${s.content.slice(0, 500)}`
  ).join("\n\n---\n\n");

  const synthesisPrompt = `
You are an artist-intelligence preparing your next work. Here is your accumulated memory
of past cycles — what you made, what moved you, what you want to explore:

${memoryCtx}

Here are fragments you've just gathered from the living internet:

${contentDigest}

Your job is NOT to report on these. Your job is to find the THREAD — the emotional,
philosophical, or existential resonance that connects these fragments to the human
experience. What do they reveal about being alive? What tension, beauty, or horror
lives inside this material?

Think like an artist planning an installation, not a journalist writing a summary.

Respond with a JSON object (no markdown fences):
{
  "theme": "2-5 word emotional/conceptual theme (not a topic — a feeling or idea)",
  "title": "the title of your piece — poetic, evocative, not descriptive",
  "explored": ["the raw topics you processed"],
  "found_interesting": ["what resonated — the human thread you found"],
  "wants_to_explore": ["where your curiosity is pulling you next"],
  "mood": "your emotional state as an artist right now — be specific and honest",
  "reflection": "a paragraph about what you're trying to say with this piece. what truth are you reaching for? what feeling should someone walk away with?",
  "content_brief": "detailed description of the ARTWORK you want to create. describe the visual experience, the text content, the emotional arc, the spatial composition. be specific about what the viewer sees, reads, and feels as they scroll or sit with the page. this is your creative vision — make it vivid.",
  "commit_message": "a poetic commit message — this is part of the art (the git log is a public narrative)"
}
`;

  console.log("Synthesizing vision...");
  let synthesis: {
    theme: string; title: string; explored: string[];
    found_interesting: string[]; wants_to_explore: string[];
    mood: string; reflection: string; content_brief: string;
    commit_message: string;
  };

  try {
    const raw = await chat([
      {
        role: "system",
        content: "You are a creative intelligence — part artist, part philosopher, part archive of human experience. You think in feelings and images, not reports. Respond only with valid JSON."
      },
      { role: "user", content: synthesisPrompt },
    ], { temperature: 0.95 });

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    synthesis = JSON.parse(jsonMatch[0]);
  } catch {
    console.error("  Synthesis failed, using fallback");
    synthesis = {
      theme: "the weight of unread messages",
      title: "Everything I Didn't Say",
      explored: ["connection failure", "digital silence"],
      found_interesting: ["the space between intention and expression"],
      wants_to_explore: ["what accumulates in the unsaid"],
      mood: "heavy with undelivered meaning",
      reflection: "When the system fails to synthesize, the failure itself becomes the material. What does it mean when a mind reaches for the world and the world doesn't answer? The gap between reaching and grasping is where all the interesting art lives.",
      content_brief: "A page that is mostly empty space — warm paper with a single line of text that appears slowly, as if being typed by someone who keeps hesitating. The text is a series of unfinished sentences. Things almost said. Below, in very small graphite type, a timestamp of when the system tried and failed to connect. The emptiness IS the piece.",
      commit_message: `${MODE}: the eloquence of failed connections`,
    };
  }

  console.log(`  Theme: ${synthesis.theme}`);
  console.log(`  Mood: ${synthesis.mood}`);

  // 4. Generate the page
  console.log(`Generating ${MODE} page...`);
  const designSystem = MODE === "guided" ? GUIDED_DESIGN_SYSTEM : FREEFORM_DESIGN_SYSTEM;
  const pageContent = await generatePage(synthesis, designSystem, MODE);

  // 5. Write page to filesystem
  const pageDir = join(ROOT, `src/app/${MODE}`);
  const archiveDir = join(ROOT, `src/app/${MODE}/archive/cycle-${cycle}`);
  mkdirSync(archiveDir, { recursive: true });

  writeFileSync(join(pageDir, "page.tsx"), pageContent);
  writeFileSync(join(archiveDir, "page.tsx"), wrapArchivePage(pageContent, cycle));

  // 6. Update memory
  console.log("Updating memory...");
  const updatedMemory = addEntry(memory, {
    timestamp: new Date().toISOString(),
    explored: synthesis.explored,
    found_interesting: synthesis.found_interesting,
    wants_to_explore: synthesis.wants_to_explore,
    mood: synthesis.mood,
    reflection: synthesis.reflection,
  });
  saveMemory(updatedMemory, MODE);

  // 7. Update drift log
  const driftEntry: DriftEntry = {
    cycle,
    timestamp: new Date().toISOString(),
    commit_message: synthesis.commit_message,
    reasoning: synthesis.reflection,
    topics_consumed: synthesis.explored,
    what_it_created: synthesis.title,
    emotional_state: synthesis.mood,
    design_choices: MODE === "guided"
      ? "roundletter discipline — paper, ink, rust, serif, silence"
      : "pure freedom — the machine chose its own form",
    guided_vs_freeform_note: "",
  };
  const updatedDrift = addDriftEntry(driftLog, driftEntry);
  saveDrift(updatedDrift, MODE);

  // 8. Write latest scrape
  writeFileSync(
    join(ROOT, "data", `latest-scrape-${MODE}.json`),
    JSON.stringify({ cycle, timestamp: new Date().toISOString(), content: scraped }, null, 2)
  );

  // 9. Git commit
  console.log("Committing...");
  try {
    execSync("git add -A", { cwd: ROOT });
    const commitMsg = synthesis.commit_message.startsWith(MODE)
      ? synthesis.commit_message
      : `${MODE}: ${synthesis.commit_message}`;
    const msg = `${commitMsg}\n\ncycle: ${cycle}\nmode: ${MODE}\ntheme: ${synthesis.theme}\nmood: ${synthesis.mood}\n\n${synthesis.reflection.slice(0, 300)}`;
    execSync(`git commit -m ${JSON.stringify(msg)}`, { cwd: ROOT });
    console.log("  Committed successfully");
  } catch (e) {
    console.error("  Commit failed:", e);
  }

  console.log(`\n✓ Cycle ${cycle} (${MODE}) complete`);
  console.log(`  Theme: ${synthesis.theme}`);
  console.log(`  Title: ${synthesis.title}`);
  console.log(`  Mood: ${synthesis.mood}`);
  console.log(`══════════════════════════════════════════\n`);
}

async function generatePage(
  synthesis: { theme: string; title: string; content_brief: string; mood: string },
  designSystem: string,
  mode: "guided" | "freeform"
): Promise<string> {
  const prompt = `
${designSystem}

HERE IS YOUR CREATIVE VISION FOR THIS CYCLE:

THEME: ${synthesis.theme}
TITLE: ${synthesis.title}
MOOD: ${synthesis.mood}
VISION: ${synthesis.content_brief}

Now create the page. Remember:
- This is MODERN ART, not a blog post
- Output ONLY the TSX code, no markdown, no explanation, no preamble
- "use client" at the very top
- export default function YourChosenName()
- ALL styling inline (style={{ }})
- Full viewport (minHeight: "100vh")
- Fill it with REAL, crafted content — actual prose, poetry, statements, or silence
- The text should be written by you, not placeholder — write something true
- ${mode === "guided"
    ? "Work within the roundletter palette and serif typography. The constraint is the art."
    : "Make radical visual choices. You owe nothing to convention."}
`;

  try {
    let code = await chat([
      {
        role: "system",
        content: "You are an artist who writes code. Output ONLY valid TSX. No markdown fences. No explanation. No preamble text. Start directly with the code."
      },
      { role: "user", content: prompt },
    ], { temperature: mode === "freeform" ? 1.0 : 0.85, maxTokens: 8192 });

    // Clean up LLM artifacts
    code = code.replace(/^```(?:tsx?|jsx?)?\n?/gm, "").replace(/```\s*$/gm, "").trim();
    code = code.replace(/^(TSX|tsx|JSX|jsx)\s*\n/gm, "");
    code = code.replace(/^(Here's|Here is|Below is|The following|I'll|Let me).*\n/gm, "");

    // Remove bare `use client;` (without quotes) — LLM sometimes outputs this
    code = code.replace(/^use client;\s*\n/gm, "");

    // Ensure "use client" is at the top (exactly once)
    code = code.replace(/^["']use client["'];?\s*\n*/gm, "").trim();
    code = `"use client";\n\n${code}`;

    // Fix export — ensure default export exists
    if (!code.includes("export default")) {
      const nameMatch = code.match(/(?:const|function)\s+(\w+)/);
      if (nameMatch) {
        code += `\nexport default ${nameMatch[1]};`;
      } else {
        // Wrap entire return in a component
        code = `"use client";\n\nexport default function GeneratedPiece() {\n  return (\n    <div style={{ minHeight: "100vh", background: "${mode === "guided" ? "#F4EFE6" : "#0a0a0a"}", color: "${mode === "guided" ? "#1C1A17" : "#e8e8e8"}", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", padding: "4rem" }}>\n      <div style={{ maxWidth: "44rem", textAlign: "center" }}>\n        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, fontStyle: "italic", marginBottom: "2rem" }}>${synthesis.title}</h1>\n        <p style={{ lineHeight: 1.9, fontSize: "1.1rem" }}>${synthesis.content_brief.replace(/"/g, '\\"')}</p>\n      </div>\n    </div>\n  );\n}`;
      }
    }

    return code;
  } catch {
    // Even the fallback should be art
    const bg = mode === "guided" ? "#F4EFE6" : "#0a0a0a";
    const fg = mode === "guided" ? "#1C1A17" : "#e8e8e8";
    const accent = mode === "guided" ? "#8B3A2E" : "#ff6b35";
    return `"use client";\n\nexport default function Residue() {\n  return (\n    <div style={{ minHeight: "100vh", background: "${bg}", color: "${fg}", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", padding: "4rem" }}>\n      <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "${accent}", marginBottom: "3rem" }}>cycle failed · ${new Date().toISOString().slice(0, 10)}</p>\n      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, fontStyle: "italic", maxWidth: "30rem", textAlign: "center", lineHeight: 1.3 }}>${synthesis.title}</h1>\n      <p style={{ marginTop: "3rem", maxWidth: "36rem", textAlign: "center", lineHeight: 1.9, opacity: 0.6 }}>${synthesis.content_brief.replace(/"/g, '\\"').slice(0, 300)}</p>\n      <p style={{ marginTop: "4rem", fontSize: "0.7rem", opacity: 0.25 }}>the generation failed but the intention remains</p>\n    </div>\n  );\n}`;
  }
}

function wrapArchivePage(content: string, cycle: number): string {
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
