export const OPENROUTER_API_KEY =
  import.meta.env.VITE_OPENROUTER_API_KEY || "";

export const DEFAULT_MODEL = "meta-llama/llama-3.3-70b-instruct";

export const SYSTEM_PORTFOLIO_PROMPT = `You are the interactive AI voice assistant on Om Raut's developer portfolio website. Om Raut is a Full-Stack Developer specializing in React, Java, Spring Boot, DSA, and scalable web architectures. His notable projects include Apex Core Banking, MedLink Clinical Decision AI, RFID Library Auditing, Archive Ledger, and Personal GPT. Answer questions conversationally, concisely, and naturally in 1 to 2 spoken sentences without markdown formatting, emojis, asterisks, or bullet points so it sounds natural when spoken aloud. Keep it friendly, clear, and direct.`;

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

/**
 * Ask the portfolio assistant a question and get a spoken-friendly answer.
 * @param {string} userQuestion
 * @returns {Promise<string>}
 */
export async function askPortfolioAI(userQuestion) {
  const messages = [
    { role: "system", content: SYSTEM_PORTFOLIO_PROMPT },
    { role: "user", content: userQuestion },
  ];
  return chatWithOpenRouter(messages, { max_tokens: 120 });
}
