import type { AiAnalysis } from '../types.js';

const criticalTerms = [
  'feu',
  'incendie',
  'fumée',
  'coupe illégale',
  'déforestation',
  'braconnage',
];

const warningTerms = [
  'baisse',
  'stress',
  'anomalie',
  'sécheresse',
  'température',
  'carbone',
];

export function analyzeLocally(prompt: string): AiAnalysis {
  const normalizedPrompt = prompt.toLocaleLowerCase('fr');
  const criticalMatches = criticalTerms.filter((term) =>
    normalizedPrompt.includes(term),
  );
  const warningMatches = warningTerms.filter((term) =>
    normalizedPrompt.includes(term),
  );
  const riskLevel =
    criticalMatches.length >= 2
      ? 'critical'
      : criticalMatches.length === 1
        ? 'high'
        : warningMatches.length > 0
          ? 'medium'
          : 'low';
  const anomalies = [...criticalMatches, ...warningMatches].map(
    (term) => `Signal « ${term} » détecté`,
  );

  return {
    provider: 'local',
    configuration: 'local',
    confidence: Math.min(0.56 + anomalies.length * 0.08, 0.92),
    riskLevel,
    summary:
      anomalies.length > 0
        ? `${anomalies.length} indicateur${
            anomalies.length > 1 ? 's' : ''
          } nécessite${anomalies.length > 1 ? 'nt' : ''} une vérification.`
        : 'Aucun signal critique évident dans la description.',
    anomalies:
      anomalies.length > 0
        ? anomalies
        : ['Aucune anomalie textuelle forte détectée'],
    recommendations: [
      'Comparer les acquisitions récentes avec la période de référence.',
      riskLevel === 'high' || riskLevel === 'critical'
        ? 'Affecter une équipe terrain et une mission drone.'
        : 'Maintenir la surveillance des capteurs et indices.',
      'Enregistrer la décision dans le journal d’audit.',
    ],
    generatedAt: new Date().toISOString(),
  };
}
