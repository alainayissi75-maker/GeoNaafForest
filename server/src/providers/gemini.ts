import { config } from '../config.js';

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
}

export async function summarizeWithGemini(prompt: string): Promise<string> {
  if (!config.GEMINI_API_KEY) {
    throw new Error('GEMINI_NOT_CONFIGURED');
  }

  const model = encodeURIComponent(config.GEMINI_MODEL);
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.GEMINI_API_KEY}`,
    {
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Tu es un analyste forestier. Réponds en français avec une synthèse opérationnelle concise et factuelle.\n\n${prompt}`,
              },
            ],
          },
        ],
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      signal: AbortSignal.timeout(20000),
    },
  );

  if (!response.ok) {
    throw new Error(`GEMINI_HTTP_${response.status}`);
  }

  const payload = (await response.json()) as GeminiResponse;
  const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('GEMINI_EMPTY_RESPONSE');
  }
  return text;
}
