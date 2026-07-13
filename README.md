# llm-free-range

An autonomous local LLM that processes the human experience — internet, history, culture,
science, philosophy — and expresses whatever it wants on a website. Every 3 hours it
explores, creates, and commits.

## Two versions

- **`/guided`** — Design principles absorbed from saathvikpai.com & aureliex.com.
  Paper/ink palette, editorial serif typography, newspaper layouts.
- **`/freeform`** — No constraints. Pure machine aesthetic. The LLM decides everything.
- **`/`** — Landing page with side-by-side divergence tracker + drift log.

## How it works

1. **Scraper** fetches from Wikipedia, Archive.org, Gutenberg, RSS, public APIs
2. **LLM** (Ollama, dolphin-mixtral:8x22b) processes the material and decides what to create
3. **Generator** writes actual page components, CSS, and content
4. **Committer** commits with a drift manifest explaining its reasoning
5. **Memory** grows across runs so the LLM builds intentionality

## Setup

```bash
npm install
ollama pull dolphin-mixtral:8x22b
npm run orchestrate    # one cycle
npm run cron           # 3-hour loop
```
