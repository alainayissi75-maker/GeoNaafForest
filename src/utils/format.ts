import type {
  HealthStatus,
  IncidentStatus,
  IncidentType,
  RiskLevel,
  Severity,
} from '@/types/domain';

export function formatHectares(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function formatShortDate(value: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(value));
}

export const severityLabels: Record<Severity, string> = {
  low: 'Faible',
  medium: 'Moyenne',
  high: 'Élevée',
  critical: 'Critique',
};

export const riskLabels: Record<RiskLevel, string> = severityLabels;

export const healthLabels: Record<HealthStatus, string> = {
  good: 'Bonne',
  moderate: 'Moyenne',
  stressed: 'Stressée',
  critical: 'Critique',
};

export const incidentTypeLabels: Record<IncidentType, string> = {
  wildfire: 'Feu de forêt',
  deforestation: 'Déforestation',
  degradation: 'Dégradation',
};

export const incidentStatusLabels: Record<IncidentStatus, string> = {
  active: 'Actif',
  monitoring: 'Surveillance',
  resolved: 'Résolu',
};
