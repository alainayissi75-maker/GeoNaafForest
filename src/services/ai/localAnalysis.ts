import type { AiAnalysis } from '@/types/platform';

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

export function createLocalAnalysis(prompt: string): AiAnalysis {
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
    (term) => `Signal « ${term} » détecté dans la description`,
  );

  return {
    provider: 'local',
    configuration: 'local',
    confidence: Math.min(0.56 + anomalies.length * 0.08, 0.92),
    riskLevel,
    summary:
      anomalies.length > 0
        ? `Le moteur local identifie ${anomalies.length} indicateur${
            anomalies.length > 1 ? 's' : ''
          } nécessitant une vérification terrain.`
        : 'Aucun signal critique évident. Une analyse satellitaire complémentaire reste recommandée.',
    anomalies:
      anomalies.length > 0
        ? anomalies
        : ['Aucune anomalie textuelle forte détectée'],
    recommendations: [
      'Comparer les dernières acquisitions satellite avec la période de référence.',
      riskLevel === 'high' || riskLevel === 'critical'
        ? 'Affecter immédiatement une équipe terrain et une mission drone.'
        : 'Maintenir la surveillance et vérifier les capteurs disponibles.',
      'Documenter la décision dans le journal d’audit.',
    ],
    generatedAt: new Date().toISOString(),
  };
}
