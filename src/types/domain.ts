import type { LatLng } from 'react-native-maps';

export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentType = 'wildfire' | 'deforestation' | 'degradation';
export type IncidentStatus = 'active' | 'monitoring' | 'resolved';
export type HealthStatus = 'good' | 'moderate' | 'stressed' | 'critical';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface TimelinePoint {
  label: string;
  hectares: number;
}

export interface Incident {
  id: number;
  type: IncidentType;
  title: string;
  description: string;
  severity: Severity;
  status: IncidentStatus;
  coordinate: LatLng;
  areaHectares: number;
  zoneName: string;
  reportedAt: string;
}

export interface AlertItem {
  id: number;
  type: IncidentType;
  title: string;
  message: string;
  severity: Severity;
  acknowledged: boolean;
  createdAt: string;
}

export interface SurveillanceZone {
  id: number;
  name: string;
  type: 'forest' | 'mangrove' | 'savanna' | 'wetland';
  totalAreaHectares: number;
  affectedAreaHectares: number;
  riskLevel: RiskLevel;
  activeIncidents: number;
  coordinate: LatLng;
  boundary: LatLng[];
}

export interface Farm {
  id: number;
  name: string;
  region: string;
  primaryCulture: string;
  totalAreaHectares: number;
  parcelCount: number;
  coordinate: LatLng;
}

export interface Parcel {
  id: number;
  farmName: string;
  name: string;
  culture: string;
  areaHectares: number;
  latestNdvi: number;
  healthStatus: HealthStatus;
  sowingDate: string;
  boundary: LatLng[];
}

export interface WeatherDay {
  date: string;
  tempMin: number;
  tempMax: number;
  precipitationProbability: number;
  windSpeed: number;
}
