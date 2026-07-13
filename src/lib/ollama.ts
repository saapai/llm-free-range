/**
 * Ollama client — talks to the local LLM.
 * Uses dolphin-mixtral:8x22b by default (uncensored, large context).
 */

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const MODEL = process.env.OLLAMA_MODEL || "dolphin-mixtral:8x22b";

export interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
  total_duration?: number;
}

export async function generate(
  prompt: string,
  opts: { model?: string; temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  const res = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: opts.model || MODEL,
      prompt,
      stream: false,
      options: {
        temperature: opts.temperature ?? 0.9,
        num_predict: opts.maxTokens ?? 4096,
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Ollama error ${res.status}: ${await res.text()}`);
  }

  const data: OllamaResponse = await res.json();
  return data.response;
}

export async function chat(
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
  opts: { model?: string; temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  const res = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: opts.model || MODEL,
      messages,
      stream: false,
      options: {
        temperature: opts.temperature ?? 0.9,
        num_predict: opts.maxTokens ?? 4096,
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Ollama error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  return data.message?.content || "";
}

export async function isAvailable(): Promise<boolean> {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`);
    return res.ok;
  } catch {
    return false;
  }
}
