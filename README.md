# NAAFTrack Mobile

Application Expo React Native pour le suivi géospatial des massifs forestiers, des exploitations agricoles, de la déforestation et des feux de forêt en Côte d’Ivoire.

## Fonctionnalités

- tableau de bord des indicateurs forestiers et agricoles ;
- carte native des zones surveillées, parcelles et incidents ;
- centre d’alertes ;
- suivi des exploitations et parcelles ;
- indices de végétation NDVI ;
- météo et risques climatiques ;
- gestion des incidents et formulaire de signalement.

## Démarrage

Prérequis : Node.js 22.13 et npm.

```bash
nvm use
npm install
npm start
```

Ouvrez ensuite l’application avec Expo Go ou un émulateur Android/iOS.

## Configuration de l’API

L’application fonctionne immédiatement avec des données de démonstration. Pour connecter une API :

```bash
EXPO_PUBLIC_API_URL=https://api.example.com npm start
```

Le client HTTP commun est disponible dans `src/services/api/client.ts`.

## Vérifications

```bash
npm run lint
npm run typecheck
npm run check
npx expo export --platform android
```

## Architecture

Consultez [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) pour l’organisation des modules et la stratégie de connexion au backend.
