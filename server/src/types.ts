export type AiProvider = 'auto' | 'local' | 'openai' | 'gemini';

export interface AiAnalysis {
  provider: Exclude<AiProvider, 'auto'>;
  configuration: 'configured' | 'not_configured' | 'local';
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  anomalies: string[];
  recommendations: string[];
  generatedAt: string;
}

export interface IntegrationState {
  id: string;
  name: string;
  category: 'satellite' | 'forest' | 'fire' | 'artificial-intelligence';
  status: 'configured' | 'not_configured';
  environmentVariables: string[];
}
