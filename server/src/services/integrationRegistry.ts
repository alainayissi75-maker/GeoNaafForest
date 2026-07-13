import { config } from '../config.js';
import type { IntegrationState } from '../types.js';

export function getIntegrationStates(): IntegrationState[] {
  return [
    createState(
      'sentinel-hub',
      'Sentinel Hub',
      'satellite',
      Boolean(
        config.SENTINEL_HUB_CLIENT_ID && config.SENTINEL_HUB_CLIENT_SECRET,
      ),
      ['SENTINEL_HUB_CLIENT_ID', 'SENTINEL_HUB_CLIENT_SECRET'],
    ),
    createState(
      'global-forest-watch',
      'Global Forest Watch',
      'forest',
      Boolean(config.GLOBAL_FOREST_WATCH_API_TOKEN),
      ['GLOBAL_FOREST_WATCH_API_TOKEN'],
    ),
    createState(
      'firms',
      'NASA FIRMS',
      'fire',
      Boolean(config.FIRMS_MAP_KEY),
      ['FIRMS_MAP_KEY'],
    ),
    createState(
      'copernicus',
      'Copernicus Data Space',
      'satellite',
      Boolean(
        config.COPERNICUS_CLIENT_ID && config.COPERNICUS_CLIENT_SECRET,
      ),
      ['COPERNICUS_CLIENT_ID', 'COPERNICUS_CLIENT_SECRET'],
    ),
    createState(
      'openai',
      'OpenAI',
      'artificial-intelligence',
      Boolean(config.OPENAI_API_KEY),
      ['OPENAI_API_KEY'],
    ),
    createState(
      'gemini',
      'Google Gemini',
      'artificial-intelligence',
      Boolean(config.GEMINI_API_KEY),
      ['GEMINI_API_KEY'],
    ),
  ];
}

function createState(
  id: string,
  name: string,
  category: IntegrationState['category'],
  configured: boolean,
  environmentVariables: string[],
): IntegrationState {
  return {
    id,
    name,
    category,
    status: configured ? 'configured' : 'not_configured',
    environmentVariables,
  };
}
