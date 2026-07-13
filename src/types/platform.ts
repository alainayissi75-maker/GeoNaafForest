export type VegetationIndexName =
  | 'NDVI'
  | 'RECI'
  | 'GNDVI'
  | 'LAI'
  | 'MSAVI'
  | 'BSI'
  | 'ARVI'
  | 'Tasseled Cap'
  | 'Burn Severity'
  | 'Canopy Cover'
  | 'Forest Loss'
  | 'Forest Gain';

export type TeamRole =
  | 'Forest Ranger'
  | 'Drone Pilot'
  | 'GIS Analyst'
  | 'Forestry Engineer'
  | 'Government Inspector'
  | 'NGO Observer'
  | 'Researcher';

export type OperationalStatus =
  | 'planned'
  | 'active'
  | 'completed'
  | 'warning'
  | 'offline';

export interface VegetationSeriesPoint {
  month: string;
  ndvi: number;
  gndvi: number;
  reci: number;
}

export interface VegetationIndexSnapshot {
  name: VegetationIndexName;
  value: number;
  unit: string;
  trend: number;
  status: 'stable' | 'improving' | 'declining' | 'critical';
}

export interface CarbonSummary {
  storedTons: number;
  lostTons: number;
  estimatedEmissionsTons: number;
  biomassTons: number;
  restoredHectares: number;
}

export interface DeforestationCause {
  label: string;
  percentage: number;
  hectares: number;
}

export interface SpeciesImpact {
  name: string;
  commonName: string;
  affectedHectares: number;
  carbonLossTons: number;
}

export interface OperationalSummary {
  averageAlertResponseMinutes: number;
  dronesInMission: number;
  satelliteImagesAnalyzed: number;
  averageCloudCoverage: number;
  illegalActivities: number;
  openInterventions: number;
}

export interface DroneMission {
  id: string;
  drone: string;
  zone: string;
  pilot: string;
  batteryLevel: number;
  progress: number;
  status: OperationalStatus;
  flightPlan: string;
  imagesCaptured: number;
}

export interface IoTSensor {
  id: string;
  name: string;
  type: 'smoke' | 'temperature' | 'humidity' | 'rainfall' | 'acoustic';
  zone: string;
  value: number;
  unit: string;
  batteryLevel: number;
  status: OperationalStatus;
  lastSeenAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: TeamRole;
  status: 'available' | 'assigned' | 'offline';
  currentAssignment: string;
}

export interface FieldTask {
  id: string;
  title: string;
  assignee: string;
  zone: string;
  dueAt: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: OperationalStatus;
}

export interface Intervention {
  id: string;
  title: string;
  openedAt: string;
  closedAt?: string;
  responseMinutes: number;
  team: string;
  status: OperationalStatus;
}

export interface NotificationDelivery {
  channel: 'SMS' | 'Email' | 'Push';
  sent: number;
  delivered: number;
  failed: number;
}

export interface DocumentRecord {
  id: string;
  name: string;
  type: 'report' | 'photo' | 'pdf';
  size: string;
  owner: string;
  updatedAt: string;
}

export interface AuditEvent {
  id: string;
  actor: string;
  action: string;
  resource: string;
  occurredAt: string;
}

export interface IntegrationStatus {
  id:
    | 'sentinel-hub'
    | 'global-forest-watch'
    | 'firms'
    | 'copernicus'
    | 'openai'
    | 'gemini';
  name: string;
  category: 'satellite' | 'forest' | 'fire' | 'artificial-intelligence';
  configured: boolean;
  lastSyncAt?: string;
  description: string;
  environmentVariables: string[];
}

export interface AiAnalysis {
  provider: 'local' | 'openai' | 'gemini';
  configuration: 'configured' | 'not_configured' | 'local';
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  anomalies: string[];
  recommendations: string[];
  generatedAt: string;
}
