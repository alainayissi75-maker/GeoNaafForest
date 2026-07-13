# Architecture NAAFTrack Mobile

## Vue d’ensemble

L’application mobile est autonome et le serveur métier reste un service séparé. Cette séparation évite d’embarquer Express, PostgreSQL ou Drizzle dans le bundle mobile.

```text
src/
├── app/
│   └── AppNavigator.tsx
├── components/
│   └── ui.tsx
├── constants/
│   └── theme.ts
├── data/
│   └── demoData.ts
├── features/
│   ├── alerts/
│   ├── dashboard/
│   ├── farms/
│   ├── incidents/
│   ├── map/
│   ├── more/
│   ├── parcels/
│   ├── surveillance/
│   └── weather/
├── services/
│   └── api/
├── types/
│   └── domain.ts
└── utils/
    └── format.ts
```

## Navigation

La navigation principale utilise quatre onglets adaptés aux petits écrans :

1. Accueil ;
2. Carte ;
3. Alertes ;
4. Plus.

Les modules Exploitations, Parcelles, Météo, Surveillance et Incidents sont ouverts dans une pile native depuis l’onglet Plus.

## Cartographie

`react-native-maps` remplace les bibliothèques cartographiques DOM. Les entités utilisent les primitives natives suivantes :

- `MapView` pour la carte ;
- `Polygon` pour les limites des parcelles et zones ;
- `Marker` pour les incidents.

Le dessin interactif de polygones doit être ajouté comme module mobile spécifique, puis envoyer des coordonnées GeoJSON à l’API.

## Données

`src/data/demoData.ts` fournit un mode de démonstration local immédiatement exécutable. Les modèles de domaine sont séparés dans `src/types/domain.ts` afin de pouvoir remplacer progressivement ces données par des appels réseau.

Le client `src/services/api/client.ts` utilise `EXPO_PUBLIC_API_URL`. Les routes métier prévues sont :

```text
/farms
/parcels
/parcels/:id/indices
/weather
/surveillance-zones
/incidents
/alerts
/stats/summary
/stats/timeline
```

## Authentification

L’application ne dépend d’aucun fournisseur d’identité particulier. Une intégration future peut utiliser Expo AuthSession avec un serveur OIDC configurable. Les jetons devront être stockés dans Expo SecureStore et injectés dans le client HTTP.

## Évolution recommandée

1. Connecter les écrans de lecture à l’API.
2. Persister les signalements d’incidents.
3. Ajouter la localisation terrain et la capture photo.
4. Ajouter le dessin et l’édition de parcelles.
5. Générer les types TypeScript depuis le contrat OpenAPI.
6. Ajouter les tests unitaires et les tests E2E.
