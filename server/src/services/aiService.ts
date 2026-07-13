import { config } from '../config.js';
import { summarizeWithGemini } from '../providers/gemini.js';
import { summarizeWithOpenAi } from '../providers/openai.js';
import type { AiAnalysis, AiProvider } from '../types.js';
import { analyzeLocally } from './riskEngine.js';

export async function analyze(
  prompt: string,
  requestedProvider: AiProvider,
): Promise<AiAnalysis> {
  const local = analyzeLocally(prompt);
  const selectedProvider = selectProvider(requestedProvider);

  if (selectedProvider === 'local') {
    return {
      ...local,
      configuration:
        requestedProvider === 'openai' || requestedProvider === 'gemini'
          ? 'not_configured'
          : 'local',
    };
  }

  try {
    const summary =
      selectedProvider === 'openai'
        ? await summarizeWithOpenAi(prompt)
        : await summarizeWithGemini(prompt);
    return {
      ...local,
      provider: selectedProvider,
      configuration: 'configured',
      confidence: Math.max(local.confidence, 0.82),
      summary,
    };
  } catch {
    return {
      ...local,
      configuration: 'not_configured',
    };
  }
}

function selectProvider(requestedProvider: AiProvider): Exclude<AiProvider, 'auto'> {
  if (requestedProvider === 'local') {
    return 'local';
  }
  if (requestedProvider === 'openai') {
    return config.OPENAI_API_KEY ? 'openai' : 'local';
  }
  if (requestedProvider === 'gemini') {
    return config.GEMINI_API_KEY ? 'gemini' : 'local';
  }
  if (config.OPENAI_API_KEY) {
    return 'openai';
  }
  if (config.GEMINI_API_KEY) {
    return 'gemini';
  }
  return 'local';
}
