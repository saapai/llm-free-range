/**
 * Scraper pipeline — gathers raw material from the internet for the LLM to process.
 * Sources: Wikipedia, Archive.org, Project Gutenberg, RSS feeds, public APIs.
 */

export interface ScrapedContent {
  source: string;
  title: string;
  content: string;
  url: string;
  timestamp: string;
}

/** Fetch a random Wikipedia article summary */
async function fetchWikipediaRandom(): Promise<ScrapedContent> {
  const res = await fetch(
    "https://en.wikipedia.org/api/rest_v1/page/random/summary"
  );
  const data = await res.json();
  return {
    source: "wikipedia",
    title: data.title || "Unknown",
    content: data.extract || "",
    url: data.content_urls?.desktop?.page || "",
    timestamp: new Date().toISOString(),
  };
}

/** Fetch content from a specific Wikipedia topic */
async function fetchWikipediaTopic(topic: string): Promise<ScrapedContent> {
  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`
  );
  const data = await res.json();
  return {
    source: "wikipedia",
    title: data.title || topic,
    content: data.extract || "",
    url: data.content_urls?.desktop?.page || "",
    timestamp: new Date().toISOString(),
  };
}

/** Fetch from Archive.org — random texts */
async function fetchArchiveOrg(): Promise<ScrapedContent> {
  const collections = [
    "americana", "opensource", "gutenberg", "milliondollarway",
    "biodiversity", "smithsonian", "nasa", "europeanlibraries"
  ];
  const collection = collections[Math.floor(Math.random() * collections.length)];
  const res = await fetch(
    `https://archive.org/advancedsearch.php?q=collection:${collection}&fl=title,description,identifier&sort=random&rows=1&output=json`
  );
  const data = await res.json();
  const doc = data?.response?.docs?.[0];
  if (!doc) {
    return {
      source: "archive.org",
      title: "Archive exploration",
      content: `Explored the ${collection} collection on Archive.org. The digital shelves stretch endlessly.`,
      url: `https://archive.org/details/${collection}`,
      timestamp: new Date().toISOString(),
    };
  }
  return {
    source: "archive.org",
    title: doc.title || "Untitled",
    content: doc.description?.toString() || `An artifact from the ${collection} collection.`,
    url: `https://archive.org/details/${doc.identifier}`,
    timestamp: new Date().toISOString(),
  };
}

/** Fetch top stories from Hacker News */
async function fetchHackerNews(): Promise<ScrapedContent[]> {
  const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
  const ids: number[] = await res.json();
  const selected = ids.slice(0, 5).sort(() => Math.random() - 0.5).slice(0, 3);

  const stories = await Promise.all(
    selected.map(async (id) => {
      const r = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      const item = await r.json();
      return {
        source: "hackernews" as const,
        title: item.title || "Untitled",
        content: item.title + (item.text ? `\n\n${item.text}` : ""),
        url: item.url || `https://news.ycombinator.com/item?id=${id}`,
        timestamp: new Date().toISOString(),
      };
    })
  );
  return stories;
}

/** Fetch astronomy picture of the day from NASA */
async function fetchNasaApod(): Promise<ScrapedContent> {
  // Public DEMO_KEY — rate limited but works
  const res = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
  if (!res.ok) {
    return {
      source: "nasa",
      title: "The cosmos",
      content: "The universe continues its expansion, indifferent to our observation.",
      url: "https://apod.nasa.gov",
      timestamp: new Date().toISOString(),
    };
  }
  const data = await res.json();
  return {
    source: "nasa",
    title: data.title || "Astronomy Picture of the Day",
    content: data.explanation || "",
    url: data.url || "https://apod.nasa.gov",
    timestamp: new Date().toISOString(),
  };
}

/** Fetch random quotes — on philosophy, science, literature */
async function fetchQuotes(): Promise<ScrapedContent> {
  const res = await fetch("https://api.quotable.io/quotes/random?limit=5");
  if (!res.ok) {
    return {
      source: "quotes",
      title: "Reflections",
      content: "The unexamined life is not worth living. — Socrates",
      url: "",
      timestamp: new Date().toISOString(),
    };
  }
  const data = await res.json();
  const quotes = data.map((q: { content: string; author: string }) =>
    `"${q.content}" — ${q.author}`
  ).join("\n\n");
  return {
    source: "quotes",
    title: "Collected wisdom",
    content: quotes,
    url: "",
    timestamp: new Date().toISOString(),
  };
}

/** Fetch open library random subject */
async function fetchOpenLibrary(): Promise<ScrapedContent> {
  const subjects = [
    "philosophy", "mathematics", "poetry", "astronomy", "history",
    "mythology", "biology", "music", "psychology", "linguistics",
    "anthropology", "architecture", "art", "physics", "chemistry",
    "theater", "dance", "folklore", "religion", "economics",
    "geography", "sociology", "technology", "medicine", "law"
  ];
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const res = await fetch(
    `https://openlibrary.org/subjects/${subject}.json?limit=3`
  );
  if (!res.ok) {
    return {
      source: "openlibrary",
      title: subject,
      content: `The field of ${subject} stretches across centuries of human inquiry.`,
      url: `https://openlibrary.org/subjects/${subject}`,
      timestamp: new Date().toISOString(),
    };
  }
  const data = await res.json();
  const works = data.works?.map((w: { title: string; authors?: Array<{ name: string }> }) =>
    `${w.title} by ${w.authors?.[0]?.name || "unknown"}`
  ).join("\n") || "";
  return {
    source: "openlibrary",
    title: `Books on ${subject}`,
    content: `${data.name || subject}\n\n${works}`,
    url: `https://openlibrary.org/subjects/${subject}`,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Main scraper — gathers a batch of content from multiple sources.
 * Each run pulls ~10-15 pieces of content for the LLM to synthesize.
 */
export async function scrapeBatch(): Promise<ScrapedContent[]> {
  const results: ScrapedContent[] = [];

  const fetchers = [
    // 3 random Wikipedia articles
    fetchWikipediaRandom(),
    fetchWikipediaRandom(),
    fetchWikipediaRandom(),
    // 1 topic deep-dive (LLM will pick next time via memory)
    fetchWikipediaTopic(
      ["consciousness", "fibonacci", "Byzantine_Empire", "jazz", "entropy",
       "Rosetta_Stone", "aurora", "Borges", "fractals", "Sapir-Whorf_hypothesis",
       "synesthesia", "Voyager_program", "Turing_machine", "origami",
       "bioluminescence", "Silk_Road", "Fermi_paradox", "emergence",
       "Pythagorean_theorem", "Dada"][Math.floor(Math.random() * 20)]
    ),
    // Archive.org
    fetchArchiveOrg(),
    // Hacker News
    fetchHackerNews().then((stories) => {
      results.push(...stories);
      return null;
    }),
    // NASA
    fetchNasaApod(),
    // Quotes
    fetchQuotes(),
    // Open Library
    fetchOpenLibrary(),
  ];

  const settled = await Promise.allSettled(fetchers);
  for (const result of settled) {
    if (result.status === "fulfilled" && result.value) {
      results.push(result.value as ScrapedContent);
    }
  }

  return results;
}
