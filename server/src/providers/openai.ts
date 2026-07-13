import { config } from '../config.js';

interface OpenAiResponse {
  output?: {
    content?: {
      type: string;
      text?: string;
    }[];
  }[];
}

export async function summarizeWithOpenAi(prompt: string): Promise<string> {
  if (!config.OPENAI_API_KEY) {
    throw new Error('OPENAI_NOT_CONFIGURED');
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    body: JSON.stringify({
      input: [
        {
          role: 'system',
          content:
            'Tu es un analyste forestier. Réponds en français avec une synthèse opérationnelle concise et factuelle.',
        },
        { role: 'user', content: prompt },
      ],
      model: config.OPENAI_MODEL,
    }),
    headers: {
      Authorization: `Bearer ${config.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) {
    throw new Error(`OPENAI_HTTP_${response.status}`);
  }

  const payload = (await response.json()) as OpenAiResponse;
  const text = payload.output
    ?.flatMap((item) => item.content ?? [])
    .find((item) => item.type === 'output_text')?.text;

  if (!text) {
    throw new Error('OPENAI_EMPTY_RESPONSE');
  }
  return text;
}
