export const dashboardData = {
  generatedAt: '2026-07-13T00:20:00Z',
  mode: 'demo',
  vegetation: {
    monthlyNdvi: [
      { month: 'Fév', value: 0.68 },
      { month: 'Mars', value: 0.7 },
      { month: 'Avr', value: 0.66 },
      { month: 'Mai', value: 0.63 },
      { month: 'Juin', value: 0.65 },
      { month: 'Juil', value: 0.61 },
    ],
    indices: {
      ndvi: 0.61,
      reci: 1.82,
      gndvi: 0.52,
      lai: 4.28,
      msavi: 0.57,
      bsi: 0.19,
      arvi: 0.58,
      tasseledCapGreenness: 0.64,
      burnSeverityDnbr: 0.31,
      canopyCoverPercent: 73.4,
      forestLossHectares: 486.2,
      forestGainHectares: 128.7,
    },
  },
  carbon: {
    storedTons: 1842600,
    lostTons: 18470,
    estimatedEmissionsTons: 67723,
    biomassTons: 3298000,
    restoredHectares: 128.7,
  },
  operations: {
    averageAlertResponseMinutes: 38,
    dronesInMission: 3,
    satelliteImagesAnalyzed: 1284,
    averageCloudCoverage: 27.6,
    illegalActivities: 17,
    openInterventions: 8,
  },
};

export const roles = [
  'Forest Ranger',
  'Drone Pilot',
  'GIS Analyst',
  'Forestry Engineer',
  'Government Inspector',
  'NGO Observer',
  'Researcher',
] as const;

export const drones = [
  {
    id: 'DRM-1042',
    drone: 'Mavic 3M Alpha',
    zone: 'Forêt classée de Taï',
    pilot: 'Mariam Koné',
    batteryLevel: 72,
    progress: 64,
    status: 'active',
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
    imagesCaptured: 97,
  },
];

export const sensors = [
  {
    id: 'IOT-001',
    name: 'Tour Taï Nord',
    type: 'smoke',
    zone: 'Forêt classée de Taï',
    value: 18,
    unit: 'ppm',
    batteryLevel: 81,
    status: 'warning',
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
  },
];

export const tasks = [
  {
    id: 'TSK-241',
    title: 'Vérifier le point chaud TAI-18',
    assignee: 'Koffi Adjoua',
    zone: 'Forêt classée de Taï',
    priority: 'critical',
    status: 'active',
  },
  {
    id: 'TSK-242',
    title: 'Collecter les preuves photo',
    assignee: 'Anne-Maëlle Kouassi',
    zone: 'Mangrove de Sassandra',
    priority: 'high',
    status: 'planned',
  },
];

export const interventions = [
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

export const documents = [
  {
    id: 'DOC-301',
    name: 'Rapport intervention Taï.pdf',
    type: 'pdf',
    size: '4,8 Mo',
    owner: 'Brigade Taï 2',
  },
  {
    id: 'DOC-302',
    name: 'Orthomosaïque Sassandra',
    type: 'photo',
    size: '82,3 Mo',
    owner: 'Mariam Koné',
  },
];

export const audit = [
  {
    id: 'AUD-991',
    actor: 'Serge Bamba',
    role: 'GIS Analyst',
    action: 'indices.recomputed',
    resource: 'parcel:1',
    occurredAt: '2026-07-13T00:16:00Z',
    before: { ndvi: 0.64 },
    after: { ndvi: 0.61 },
  },
  {
    id: 'AUD-990',
    actor: 'Mariam Koné',
    role: 'Drone Pilot',
    action: 'mission.started',
    resource: 'mission:DRM-1042',
    occurredAt: '2026-07-12T23:48:00Z',
    before: { status: 'planned' },
    after: { status: 'active' },
  },
];

export const notifications = [
  { channel: 'SMS', sent: 184, delivered: 176, failed: 8 },
  { channel: 'Email', sent: 327, delivered: 319, failed: 8 },
  { channel: 'Push', sent: 642, delivered: 611, failed: 31 },
];
