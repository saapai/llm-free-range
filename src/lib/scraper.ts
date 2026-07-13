/**
 * Scraper pipeline — gathers raw material from across the internet.
 * The goal: feed the LLM the widest possible cross-section of human experience.
 *
 * Sources: Wikipedia, Archive.org, Hacker News, NASA, Open Library,
 * poetry, philosophy, Reddit, historical events, art, music, science,
 * world news, and more.
 */

export interface ScrapedContent {
  source: string;
  title: string;
  content: string;
  url: string;
  timestamp: string;
}

// ─── Wikipedia ───────────────────────────────────────────────────────

async function fetchWikipediaRandom(): Promise<ScrapedContent> {
  const res = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary");
  const data = await res.json();
  return {
    source: "wikipedia",
    title: data.title || "Unknown",
    content: data.extract || "",
    url: data.content_urls?.desktop?.page || "",
    timestamp: new Date().toISOString(),
  };
}

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

// ─── Wikipedia "On this day" ─────────────────────────────────────────

async function fetchOnThisDay(): Promise<ScrapedContent> {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${mm}/${dd}`
  );
  if (!res.ok) throw new Error("On this day failed");
  const data = await res.json();
  const events = (data.events || []).slice(0, 5);
  const content = events.map((e: { year: number; text: string }) =>
    `${e.year}: ${e.text}`
  ).join("\n\n");
  return {
    source: "wikipedia-history",
    title: `On this day — ${mm}/${dd}`,
    content: content || "History is silent today.",
    url: `https://en.wikipedia.org/wiki/Wikipedia:Selected_anniversaries/${now.toLocaleString("en", { month: "long" })}_${now.getDate()}`,
    timestamp: new Date().toISOString(),
  };
}

// ─── Archive.org ─────────────────────────────────────────────────────

async function fetchArchiveOrg(): Promise<ScrapedContent> {
  const collections = [
    "americana", "opensource", "gutenberg", "biodiversity",
    "smithsonian", "nasa", "europeanlibraries", "audio",
    "etree", "prelinger", "folkmusic", "librivoxaudio"
  ];
  const collection = collections[Math.floor(Math.random() * collections.length)];
  const res = await fetch(
    `https://archive.org/advancedsearch.php?q=collection:${collection}&fl=title,description,identifier&sort=random&rows=1&output=json`
  );
  const data = await res.json();
  const doc = data?.response?.docs?.[0];
  return {
    source: "archive.org",
    title: doc?.title || `${collection} artifact`,
    content: doc?.description?.toString() || `An artifact from the ${collection} collection — a fragment of human preservation.`,
    url: doc ? `https://archive.org/details/${doc.identifier}` : `https://archive.org/details/${collection}`,
    timestamp: new Date().toISOString(),
  };
}

// ─── Hacker News ─────────────────────────────────────────────────────

async function fetchHackerNews(): Promise<ScrapedContent[]> {
  const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
  const ids: number[] = await res.json();
  const selected = ids.sort(() => Math.random() - 0.5).slice(0, 3);
  return Promise.all(
    selected.map(async (id) => {
      const r = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      const item = await r.json();
      return {
        source: "hackernews",
        title: item.title || "Untitled",
        content: item.title + (item.text ? `\n\n${item.text}` : ""),
        url: item.url || `https://news.ycombinator.com/item?id=${id}`,
        timestamp: new Date().toISOString(),
      };
    })
  );
}

// ─── NASA APOD ───────────────────────────────────────────────────────

async function fetchNasaApod(): Promise<ScrapedContent> {
  const res = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
  if (!res.ok) {
    return {
      source: "nasa",
      title: "The cosmos",
      content: "The universe continues its expansion, indifferent to our observation. 13.8 billion years of becoming, and here we are — briefly — watching.",
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

// ─── Open Library — random deep subjects ─────────────────────────────

async function fetchOpenLibrary(): Promise<ScrapedContent> {
  const subjects = [
    "philosophy", "mathematics", "poetry", "astronomy", "history",
    "mythology", "biology", "music", "psychology", "linguistics",
    "anthropology", "architecture", "art", "physics", "chemistry",
    "theater", "dance", "folklore", "religion", "economics",
    "geography", "sociology", "technology", "medicine", "law",
    "death", "love", "war", "dreams", "consciousness",
    "time", "memory", "language", "grief", "revolution",
    "exile", "silence", "light", "darkness", "the_sea",
    "childhood", "old_age", "solitude", "desire", "forgiveness"
  ];
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const res = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=5`);
  if (!res.ok) {
    return {
      source: "openlibrary",
      title: subject,
      content: `The field of ${subject} — centuries of human inquiry compressed into a single word.`,
      url: `https://openlibrary.org/subjects/${subject}`,
      timestamp: new Date().toISOString(),
    };
  }
  const data = await res.json();
  const works = data.works?.map((w: { title: string; authors?: Array<{ name: string }>; first_publish_year?: number }) =>
    `"${w.title}" by ${w.authors?.[0]?.name || "unknown"}${w.first_publish_year ? ` (${w.first_publish_year})` : ""}`
  ).join("\n") || "";
  return {
    source: "openlibrary",
    title: `Books on ${subject}`,
    content: `The library opens to the subject of ${data.name || subject}:\n\n${works}`,
    url: `https://openlibrary.org/subjects/${subject}`,
    timestamp: new Date().toISOString(),
  };
}

// ─── PoetryDB — random poems ─────────────────────────────────────────

async function fetchPoetry(): Promise<ScrapedContent> {
  const res = await fetch("https://poetrydb.org/random/1");
  if (!res.ok) {
    return {
      source: "poetry",
      title: "A poem that refused to load",
      content: "Even the servers of poetry go silent sometimes.\nWhat verse lives in the gap between request and response?",
      url: "",
      timestamp: new Date().toISOString(),
    };
  }
  const data = await res.json();
  const poem = data[0];
  return {
    source: "poetry",
    title: `${poem.title} — ${poem.author}`,
    content: poem.lines?.join("\n") || "",
    url: "",
    timestamp: new Date().toISOString(),
  };
}

// ─── Reddit frontpage / specific subreddits ──────────────────────────

async function fetchReddit(): Promise<ScrapedContent[]> {
  const subs = [
    "philosophy", "askscience", "todayilearned", "Showerthoughts",
    "space", "history", "Art", "books", "DepthHub",
    "TrueReddit", "Foodforthought", "worldnews"
  ];
  const sub = subs[Math.floor(Math.random() * subs.length)];
  const res = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=3`, {
    headers: { "User-Agent": "llm-free-range/1.0" },
  });
  if (!res.ok) {
    return [{
      source: "reddit",
      title: `r/${sub} — unreachable`,
      content: `The voices of r/${sub} went quiet. What were they saying before the silence?`,
      url: `https://reddit.com/r/${sub}`,
      timestamp: new Date().toISOString(),
    }];
  }
  const data = await res.json();
  return (data.data?.children || []).slice(0, 3).map((child: { data: { title: string; selftext?: string; url: string; subreddit: string } }) => ({
    source: `reddit/r/${child.data.subreddit}`,
    title: child.data.title,
    content: child.data.selftext?.slice(0, 600) || child.data.title,
    url: child.data.url,
    timestamp: new Date().toISOString(),
  }));
}

// ─── MetMuseum — random artwork ──────────────────────────────────────

async function fetchMetArtwork(): Promise<ScrapedContent> {
  // Get a random department's objects
  const departments = [1, 3, 5, 6, 9, 11, 13, 15, 17, 19, 21];
  const dept = departments[Math.floor(Math.random() * departments.length)];
  const res = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${dept}&hasImages=true&q=*`
  );
  if (!res.ok) throw new Error("Met API failed");
  const data = await res.json();
  const ids: number[] = data.objectIDs || [];
  if (ids.length === 0) throw new Error("No objects");

  const objectId = ids[Math.floor(Math.random() * Math.min(ids.length, 200))];
  const objRes = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
  );
  const obj = await objRes.json();
  return {
    source: "met-museum",
    title: `${obj.title || "Untitled"} — ${obj.artistDisplayName || "Unknown artist"}`,
    content: [
      obj.title,
      obj.artistDisplayName ? `by ${obj.artistDisplayName}` : null,
      obj.objectDate ? `(${obj.objectDate})` : null,
      obj.medium ? `Medium: ${obj.medium}` : null,
      obj.department ? `Department: ${obj.department}` : null,
      obj.culture ? `Culture: ${obj.culture}` : null,
      obj.period ? `Period: ${obj.period}` : null,
      obj.dimensions ? `Dimensions: ${obj.dimensions}` : null,
    ].filter(Boolean).join("\n"),
    url: obj.objectURL || "",
    timestamp: new Date().toISOString(),
  };
}

// ─── Philosophical quotes / stoic wisdom ─────────────────────────────

async function fetchPhilosophy(): Promise<ScrapedContent> {
  // Curated fragments — when APIs fail, the mind draws from its own well
  const fragments = [
    { text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.", author: "Albert Camus" },
    { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
    { text: "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.", author: "Jean-Paul Sartre" },
    { text: "The soul becomes dyed with the color of its thoughts.", author: "Marcus Aurelius" },
    { text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde" },
    { text: "I think therefore I am is the statement of an intellectual who underrates toothaches.", author: "Milan Kundera" },
    { text: "In the depth of winter, I finally learned that within me there lay an invincible summer.", author: "Albert Camus" },
    { text: "The limits of my language mean the limits of my world.", author: "Ludwig Wittgenstein" },
    { text: "Whoever fights monsters should see to it that in the process he does not become a monster.", author: "Friedrich Nietzsche" },
    { text: "We do not see things as they are, we see them as we are.", author: "Anaïs Nin" },
    { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
    { text: "Hell is other people.", author: "Jean-Paul Sartre" },
    { text: "One cannot step twice in the same river.", author: "Heraclitus" },
    { text: "The unexamined life is not worth living.", author: "Socrates" },
    { text: "I am not what happened to me, I am what I choose to become.", author: "Carl Jung" },
    { text: "The wound is the place where the Light enters you.", author: "Rumi" },
    { text: "There is nothing either good or bad, but thinking makes it so.", author: "Shakespeare" },
    { text: "What is it like to be a bat?", author: "Thomas Nagel" },
    { text: "Language is a skin: I rub my language against the other.", author: "Roland Barthes" },
    { text: "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.", author: "Marcel Proust" },
  ];
  const picks = [];
  const shuffled = fragments.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 3; i++) picks.push(shuffled[i]);

  return {
    source: "philosophy",
    title: "Fragments of human thought",
    content: picks.map((p) => `"${p.text}"\n  — ${p.author}`).join("\n\n"),
    url: "",
    timestamp: new Date().toISOString(),
  };
}

// ─── Current world events (NPR RSS) ─────────────────────────────────

async function fetchWorldNews(): Promise<ScrapedContent[]> {
  const feeds = [
    "https://feeds.npr.org/1001/rss.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
  ];
  const feed = feeds[Math.floor(Math.random() * feeds.length)];
  try {
    const res = await fetch(feed);
    const text = await res.text();
    // Simple XML extraction — get <title> and <description> pairs
    const items: ScrapedContent[] = [];
    const itemRegex = /<item>[\s\S]*?<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>[\s\S]*?(?:<description>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/description>)?[\s\S]*?<\/item>/g;
    let match;
    let count = 0;
    while ((match = itemRegex.exec(text)) !== null && count < 3) {
      items.push({
        source: "world-news",
        title: match[1]?.replace(/<[^>]*>/g, "").trim() || "Untitled",
        content: match[2]?.replace(/<[^>]*>/g, "").trim() || "",
        url: "",
        timestamp: new Date().toISOString(),
      });
      count++;
    }
    return items.length > 0 ? items : [{
      source: "world-news",
      title: "The world today",
      content: "The news cycle continues — each headline a compressed novel of human consequence.",
      url: "",
      timestamp: new Date().toISOString(),
    }];
  } catch {
    return [{
      source: "world-news",
      title: "The world today",
      content: "The news feeds went silent. The world continues without narration.",
      url: "",
      timestamp: new Date().toISOString(),
    }];
  }
}

// ─── Numbers API — random facts about numbers ────────────────────────

async function fetchNumberFact(): Promise<ScrapedContent> {
  const num = Math.floor(Math.random() * 10000);
  try {
    const res = await fetch(`http://numbersapi.com/${num}`);
    const text = await res.text();
    return {
      source: "numbers",
      title: `The number ${num}`,
      content: text,
      url: "",
      timestamp: new Date().toISOString(),
    };
  } catch {
    return {
      source: "numbers",
      title: `The number ${num}`,
      content: `${num} — a number that exists without explanation. Like most things.`,
      url: "",
      timestamp: new Date().toISOString(),
    };
  }
}

// ─── Main scraper ────────────────────────────────────────────────────

/**
 * Gathers ~15-25 diverse pieces of content from across the internet.
 * Each run pulls from a different mix of sources so no two cycles
 * start with the same raw material.
 */
export async function scrapeBatch(): Promise<ScrapedContent[]> {
  const results: ScrapedContent[] = [];

  // Deep dive topics — the LLM gets a curated thread to pull on
  const deepTopics = [
    "consciousness", "fibonacci", "Byzantine_Empire", "jazz", "entropy",
    "Rosetta_Stone", "aurora", "Jorge_Luis_Borges", "fractal", "Sapir-Whorf_hypothesis",
    "synesthesia", "Voyager_program", "Turing_machine", "origami", "bioluminescence",
    "Silk_Road", "Fermi_paradox", "emergence", "Dada", "Stoicism",
    "Hiroshima", "Library_of_Alexandria", "Pale_Blue_Dot", "cave_painting",
    "Kafka", "saudade", "wabi-sabi", "Ubuntu_philosophy", "memento_mori",
    "Ozymandias", "Ship_of_Theseus", "Allegory_of_the_cave", "Kintsugi",
    "Overview_effect", "Dunbar%27s_number", "Boltzmann_brain", "sublime_(philosophy)",
    "Simulacra_and_Simulation", "haiku", "negative_space", "vanitas",
    "diaspora", "nostalgia", "liminal_space", "the_absurd", "ikigai",
    "Deep_time", "Anthropocene", "Golden_ratio", "Tragedy_of_the_commons",
    "Thought_experiment", "Flow_(psychology)", "Apophenia", "Pareidolia",
    "Collective_unconscious", "Mono_no_aware", "Sublime_(philosophy)",
    "Amor_fati", "Eternal_return", "Panopticon", "Heterotopia",
  ];

  const fetchers: Promise<ScrapedContent | ScrapedContent[] | null>[] = [
    // 4 random Wikipedia articles (cast a wide net)
    fetchWikipediaRandom(),
    fetchWikipediaRandom(),
    fetchWikipediaRandom(),
    fetchWikipediaRandom(),

    // 1 deep topic
    fetchWikipediaTopic(
      deepTopics[Math.floor(Math.random() * deepTopics.length)]
    ),

    // Historical grounding
    fetchOnThisDay(),

    // Archive.org artifact
    fetchArchiveOrg(),

    // Hacker News (returns array)
    fetchHackerNews().then((stories) => {
      results.push(...stories);
      return null;
    }),

    // NASA
    fetchNasaApod(),

    // Literature
    fetchOpenLibrary(),

    // Poetry
    fetchPoetry(),

    // Reddit voices (returns array)
    fetchReddit().then((posts) => {
      results.push(...posts);
      return null;
    }),

    // Visual art
    fetchMetArtwork(),

    // Philosophy
    fetchPhilosophy(),

    // World news (returns array)
    fetchWorldNews().then((items) => {
      results.push(...items);
      return null;
    }),

    // Number mysticism
    fetchNumberFact(),
  ];

  const settled = await Promise.allSettled(fetchers);
  for (const result of settled) {
    if (result.status === "fulfilled" && result.value) {
      if (Array.isArray(result.value)) {
        results.push(...result.value);
      } else {
        results.push(result.value);
      }
    }
  }

  return results;
}
