export const OPENROUTER_API_KEY =
  import.meta.env.VITE_OPENROUTER_API_KEY || "";

export const DEFAULT_MODEL = "meta-llama/llama-3.3-70b-instruct";

/**
 * Ask OpenRouter with portfolio context or custom prompt.
 * @param {Array<{role: string, content: string}>} messages
 * @param {Object} options
 * @returns {Promise<string>}
 */
export async function chatWithOpenRouter(messages, options = {}) {
  const apiKey = options.apiKey || OPENROUTER_API_KEY;
  const model = options.model || DEFAULT_MODEL;

  if (!apiKey) {
    throw new Error("Missing OpenRouter API Key. Please add VITE_OPENROUTER_API_KEY to .env.local");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "http://localhost:5173",
      "X-Title": "Om Raut Portfolio AI Assistant",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 600,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}
