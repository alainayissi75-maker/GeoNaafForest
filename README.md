# NaafGeoForest Intelligence

Plateforme Expo Universal et API Node.js pour le suivi géospatial des massifs
forestiers, la télédétection, les opérations terrain et la prévention des
risques en Côte d’Ivoire.

## Plateformes

- Android et iOS avec React Native ;
- Web responsive avec Expo Web ;
- bureau installable grâce au manifeste PWA ;
- API HTTP et événements temps réel dans le même dépôt.

## Fonctionnalités

- cartographie standard, satellite, hybride et terrain ;
- couches forêts, parcelles, incidents, drones et capteurs IoT ;
- NDVI, RECI, GNDVI, LAI, MSAVI, BSI, ARVI et Tasseled Cap ;
- Burn Severity, Canopy Cover, Forest Loss et Forest Gain ;
- carbone stocké/perdu, émissions, biomasse et restauration ;
- alertes, interventions, drones, équipes, documents et audit ;
- suivi SMS, email et push ;
- adaptateurs Sentinel Hub, Global Forest Watch, FIRMS et Copernicus ;
- moteur local de détection d’anomalies ;
- adaptateurs serveur OpenAI et Gemini.

## Démarrage

Prérequis : Node.js 22.13 et npm 10.

```bash
nvm use
npm install
npm run api
```

Dans un second terminal :

```bash
EXPO_PUBLIC_API_URL=http://localhost:8787 npm start
```

Commandes ciblées :

```bash
npm run web
npm run android
npm run ios
```

Pour un appareil physique, remplacez `localhost` par l’adresse IP locale de la
machine qui exécute l’API.

## Configuration de l’API

L’application fonctionne sans secret avec des données de démonstration et son
moteur d’analyse local. Le client utilise :

```bash
EXPO_PUBLIC_API_URL=https://api.example.com
```

Copiez le modèle de configuration du serveur si des fournisseurs réels doivent
être activés :

```bash
cp server/.env.example server/.env
```

Les clés restent exclusivement dans `server/.env`. Sans clé, les connecteurs
retournent explicitement `not_configured` et l’application ne présente aucune
donnée externe comme réelle.

Le contrat de l’API est dans `server/openapi.yaml`.

## Vérifications

```bash
npm run lint
npm run typecheck
npm run api:typecheck
npm run api:test
npm run check
npm run export:web
npm run export:android
npx expo-doctor
```

## Architecture

Consultez :

- [Architecture](docs/ARCHITECTURE.md) ;
- [Intégrations et secrets](docs/INTEGRATIONS.md) ;
- [Contrat OpenAPI](server/openapi.yaml).
