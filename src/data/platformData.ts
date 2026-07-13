import type {
  AuditEvent,
  CarbonSummary,
  DeforestationCause,
  DocumentRecord,
  DroneMission,
  FieldTask,
  IntegrationStatus,
  Intervention,
  IoTSensor,
  NotificationDelivery,
  OperationalSummary,
  SpeciesImpact,
  TeamMember,
  VegetationIndexSnapshot,
  VegetationSeriesPoint,
} from '@/types/platform';

export const vegetationSeries: VegetationSeriesPoint[] = [
  { month: 'Fév', ndvi: 0.68, gndvi: 0.59, reci: 2.16 },
  { month: 'Mars', ndvi: 0.7, gndvi: 0.61, reci: 2.23 },
  { month: 'Avr', ndvi: 0.66, gndvi: 0.57, reci: 2.04 },
  { month: 'Mai', ndvi: 0.63, gndvi: 0.54, reci: 1.91 },
  { month: 'Juin', ndvi: 0.65, gndvi: 0.56, reci: 1.98 },
  { month: 'Juil', ndvi: 0.61, gndvi: 0.52, reci: 1.82 },
];

export const vegetationIndices: VegetationIndexSnapshot[] = [
  { name: 'NDVI', value: 0.61, unit: '', trend: -6.2, status: 'declining' },
  { name: 'RECI', value: 1.82, unit: '', trend: -4.8, status: 'declining' },
  { name: 'GNDVI', value: 0.52, unit: '', trend: -3.7, status: 'declining' },
  { name: 'LAI', value: 4.28, unit: 'm²/m²', trend: 1.4, status: 'stable' },
  { name: 'MSAVI', value: 0.57, unit: '', trend: -2.1, status: 'stable' },
  { name: 'BSI', value: 0.19, unit: '', trend: 8.4, status: 'critical' },
  { name: 'ARVI', value: 0.58, unit: '', trend: -3.1, status: 'declining' },
  {
    name: 'Tasseled Cap',
    value: 0.64,
    unit: 'greenness',
    trend: -1.2,
    status: 'stable',
  },
  {
    name: 'Burn Severity',
    value: 0.31,
    unit: 'dNBR',
    trend: 12.8,
    status: 'critical',
  },
  {
    name: 'Canopy Cover',
    value: 73.4,
    unit: '%',
    trend: -2.9,
    status: 'declining',
  },
  {
    name: 'Forest Loss',
    value: 486.2,
    unit: 'ha',
    trend: 9.6,
    status: 'critical',
  },
  {
    name: 'Forest Gain',
    value: 128.7,
    unit: 'ha',
    trend: 14.2,
    status: 'improving',
  },
];

export const carbonSummary: CarbonSummary = {
  storedTons: 1842600,
  lostTons: 18470,
  estimatedEmissionsTons: 67723,
  biomassTons: 3298000,
  restoredHectares: 128.7,
};

export const deforestationCauses: DeforestationCause[] = [
  { label: 'Agriculture extensive', percentage: 42, hectares: 204.2 },
  { label: 'Exploitation illégale', percentage: 24, hectares: 116.7 },
  { label: 'Feux non maîtrisés', percentage: 18, hectares: 87.5 },
  { label: 'Infrastructures et mines', percentage: 10, hectares: 48.6 },
  { label: 'Autres pressions', percentage: 6, hectares: 29.2 },
];

export const speciesImpacts: SpeciesImpact[] = [
  {
    name: 'Khaya ivorensis',
    commonName: 'Acajou',
    affectedHectares: 82.4,
    carbonLossTons: 4280,
  },
  {
    name: 'Milicia excelsa',
    commonName: 'Iroko',
    affectedHectares: 64.1,
    carbonLossTons: 3650,
  },
  {
    name: 'Terminalia superba',
    commonName: 'Fraké',
    affectedHectares: 58.7,
    carbonLossTons: 2940,
  },
  {
    name: 'Triplochiton scleroxylon',
    commonName: 'Samba',
    affectedHectares: 41.8,
    carbonLossTons: 2310,
  },
];

export const operationalSummary: OperationalSummary = {
  averageAlertResponseMinutes: 38,
  dronesInMission: 3,
  satelliteImagesAnalyzed: 1284,
  averageCloudCoverage: 27.6,
  illegalActivities: 17,
  openInterventions: 8,
};

export const droneMissions: DroneMission[] = [
  {
    id: 'DRM-1042',
    drone: 'Mavic 3M Alpha',
    zone: 'Forêt classée de Taï',
    pilot: 'Mariam Koné',
    batteryLevel: 72,
    progress: 64,
    status: 'active',
    flightPlan: 'Quadrillage 80 m · 12,4 km',
    imagesCaptured: 386,
  },
  {
    id: 'DRM-1043',
    drone: 'Matrice 350 RTK',
    zone: 'Mangrove de Sassandra',
    pilot: 'Yao N’Guessan',
    batteryLevel: 54,
    progress: 41,
    status: 'active',
    flightPlan: 'Corridor côtier · 8,1 km',
    imagesCaptured: 241,
  },
  {
    id: 'DRM-1044',
    drone: 'Anafi USA',
    zone: 'Forêt du Banco',
    pilot: 'Aïcha Touré',
    batteryLevel: 86,
    progress: 22,
    status: 'active',
    flightPlan: 'Thermique · 4,6 km',
    imagesCaptured: 97,
  },
];

export const sensors: IoTSensor[] = [
  {
    id: 'IOT-001',
    name: 'Tour Taï Nord',
    type: 'smoke',
    zone: 'Forêt classée de Taï',
    value: 18,
    unit: 'ppm',
    batteryLevel: 81,
    status: 'warning',
    lastSeenAt: '2026-07-13T00:12:00Z',
  },
  {
    id: 'IOT-014',
    name: 'Banco Canopée',
    type: 'temperature',
    zone: 'Forêt du Banco',
    value: 31.6,
    unit: '°C',
    batteryLevel: 67,
    status: 'active',
    lastSeenAt: '2026-07-13T00:16:00Z',
  },
  {
    id: 'IOT-027',
    name: 'Sassandra Pluie',
    type: 'rainfall',
    zone: 'Mangrove de Sassandra',
    value: 12.4,
    unit: 'mm',
    batteryLevel: 92,
    status: 'active',
    lastSeenAt: '2026-07-13T00:14:00Z',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 'USR-01',
    name: 'Koffi Adjoua',
    role: 'Forest Ranger',
    status: 'assigned',
    currentAssignment: 'Patrouille Taï Nord',
  },
  {
    id: 'USR-02',
    name: 'Mariam Koné',
    role: 'Drone Pilot',
    status: 'assigned',
    currentAssignment: 'Mission DRM-1042',
  },
  {
    id: 'USR-03',
    name: 'Serge Bamba',
    role: 'GIS Analyst',
    status: 'available',
    currentAssignment: 'Analyse Sentinel-2',
  },
  {
    id: 'USR-04',
    name: 'Dr Élise Amani',
    role: 'Forestry Engineer',
    status: 'assigned',
    currentAssignment: 'Plan de restauration',
  },
  {
    id: 'USR-05',
    name: 'Issa Coulibaly',
    role: 'Government Inspector',
    status: 'available',
    currentAssignment: 'Contrôle concessions',
  },
  {
    id: 'USR-06',
    name: 'Anne-Maëlle Kouassi',
    role: 'NGO Observer',
    status: 'available',
    currentAssignment: 'Suivi communautaire',
  },
  {
    id: 'USR-07',
    name: 'Prof. Marc Dago',
    role: 'Researcher',
    status: 'offline',
    currentAssignment: 'Modèle carbone',
  },
];

export const fieldTasks: FieldTask[] = [
  {
    id: 'TSK-241',
    title: 'Vérifier le point chaud TAI-18',
    assignee: 'Koffi Adjoua',
    zone: 'Forêt classée de Taï',
    dueAt: '2026-07-13T07:30:00Z',
    priority: 'critical',
    status: 'active',
  },
  {
    id: 'TSK-242',
    title: 'Collecter les preuves photo',
    assignee: 'Anne-Maëlle Kouassi',
    zone: 'Mangrove de Sassandra',
    dueAt: '2026-07-13T11:00:00Z',
    priority: 'high',
    status: 'planned',
  },
  {
    id: 'TSK-243',
    title: 'Calibrer le capteur IOT-014',
    assignee: 'Serge Bamba',
    zone: 'Forêt du Banco',
    dueAt: '2026-07-14T09:00:00Z',
    priority: 'medium',
    status: 'planned',
  },
];

export const interventions: Intervention[] = [
  {
    id: 'INT-880',
    title: 'Feu secteur nord',
    openedAt: '2026-07-12T14:25:00Z',
    responseMinutes: 24,
    team: 'Brigade Taï 2',
    status: 'active',
  },
  {
    id: 'INT-874',
    title: 'Coupe illégale Sassandra',
    openedAt: '2026-07-11T08:10:00Z',
    closedAt: '2026-07-11T11:46:00Z',
    responseMinutes: 36,
    team: 'Unité côtière',
    status: 'completed',
  },
];

export const notificationDeliveries: NotificationDelivery[] = [
  { channel: 'SMS', sent: 184, delivered: 176, failed: 8 },
  { channel: 'Email', sent: 327, delivered: 319, failed: 8 },
  { channel: 'Push', sent: 642, delivered: 611, failed: 31 },
];

export const documents: DocumentRecord[] = [
  {
    id: 'DOC-301',
    name: 'Rapport intervention Taï.pdf',
    type: 'pdf',
    size: '4,8 Mo',
    owner: 'Brigade Taï 2',
    updatedAt: '2026-07-12T18:20:00Z',
  },
  {
    id: 'DOC-302',
    name: 'Orthomosaïque Sassandra',
    type: 'photo',
    size: '82,3 Mo',
    owner: 'Mariam Koné',
    updatedAt: '2026-07-12T16:44:00Z',
  },
  {
    id: 'DOC-303',
    name: 'Bilan carbone mensuel.pdf',
    type: 'report',
    size: '2,1 Mo',
    owner: 'Dr Élise Amani',
    updatedAt: '2026-07-11T09:05:00Z',
  },
];

export const auditEvents: AuditEvent[] = [
  {
    id: 'AUD-991',
    actor: 'Serge Bamba',
    action: 'a recalculé les indices',
    resource: 'Parcelle Cacao Nord',
    occurredAt: '2026-07-13T00:16:00Z',
  },
  {
    id: 'AUD-990',
    actor: 'Mariam Koné',
    action: 'a lancé la mission',
    resource: 'DRM-1042',
    occurredAt: '2026-07-12T23:48:00Z',
  },
  {
    id: 'AUD-989',
    actor: 'Koffi Adjoua',
    action: 'a ouvert une intervention',
    resource: 'INT-880',
    occurredAt: '2026-07-12T14:29:00Z',
  },
];

export const integrations: IntegrationStatus[] = [
  {
    id: 'sentinel-hub',
    name: 'Sentinel Hub',
    category: 'satellite',
    configured: false,
    description: 'Imagerie multispectrale et calcul des indices.',
    environmentVariables: [
      'SENTINEL_HUB_CLIENT_ID',
      'SENTINEL_HUB_CLIENT_SECRET',
    ],
  },
  {
    id: 'global-forest-watch',
    name: 'Global Forest Watch',
    category: 'forest',
    configured: false,
    description: 'Alertes de perte et gain du couvert forestier.',
    environmentVariables: ['GLOBAL_FOREST_WATCH_API_TOKEN'],
  },
  {
    id: 'firms',
    name: 'NASA FIRMS',
    category: 'fire',
    configured: false,
    description: 'Points chauds et feux actifs MODIS/VIIRS.',
    environmentVariables: ['FIRMS_MAP_KEY'],
  },
  {
    id: 'copernicus',
    name: 'Copernicus Data Space',
    category: 'satellite',
    configured: false,
    description: 'Catalogue européen d’observation de la Terre.',
    environmentVariables: [
      'COPERNICUS_CLIENT_ID',
      'COPERNICUS_CLIENT_SECRET',
    ],
  },
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'artificial-intelligence',
    configured: false,
    description: 'Analyse conversationnelle et synthèse des anomalies.',
    environmentVariables: ['OPENAI_API_KEY'],
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'artificial-intelligence',
    configured: false,
    description: 'Analyse multimodale des rapports et images terrain.',
    environmentVariables: ['GEMINI_API_KEY'],
  },
];
