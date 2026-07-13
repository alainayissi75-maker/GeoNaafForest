# Architecture NAAFTrack Forest Intelligence

## Vue d’ensemble

Le dépôt contient un client Expo Universal et une API Node.js. Le client cible
Android, iOS et le Web ; le Web responsive peut être installé comme application
de bureau grâce au manifeste PWA. Les secrets et appels fournisseurs restent
dans l’API.

```text
src/
├── app/                      # navigation mobile et bureau
├── components/
│   └── ui.tsx                # primitives visuelles partagées
├── constants/
│   └── theme.ts
├── data/
│   ├── demoData.ts
│   └── platformData.ts
├── features/
│   ├── analytics/            # indices, carbone et biomasse
│   ├── artificial-intelligence/
│   ├── integrations/
│   ├── map/                  # implémentations native et Web
│   └── operations/           # drones, IoT, équipes et audit
├── services/
│   ├── ai/
│   └── api/
├── types/
│   ├── domain.ts
│   └── platform.ts
server/
├── src/
│   ├── providers/            # OpenAI et Gemini
│   ├── services/             # risque local et registre fournisseurs
│   ├── app.ts
│   └── index.ts
└── openapi.yaml
public/
├── manifest.json
├── service-worker.js
└── index.html
```

## Navigation

La navigation principale utilise cinq onglets :

1. Accueil ;
2. Carte ;
3. Analyses ;
4. Opérations ;
5. Plus.

Sur les écrans de bureau, les onglets deviennent automatiquement une barre
latérale. Les modules spécialisés sont ouverts dans une pile partagée.

## Cartographie

La couche cartographique possède deux implémentations derrière la même
interface :

- Android/iOS : `react-native-maps` ;
- Web/desktop : MapLibre GL avec `react-map-gl`.

Les fonds disponibles sont standard, satellite, hybride et terrain. Les
sources publiques conservent obligatoirement leur attribution. Les couches
métier incluent les forêts, parcelles, incidents, drones et capteurs.

## Données

`src/data` fournit un mode de démonstration immédiatement exécutable. Les
écrans indiquent ce mode et le serveur retourne `mode: demo` pour les métriques
non connectées à une source réelle.

Le client `src/services/api/client.ts` utilise `EXPO_PUBLIC_API_URL`. L’API
expose notamment :

```text
/api/dashboard
/api/analytics
/api/operations
/api/drones
/api/iot/sensors
/api/tasks
/api/interventions
/api/documents
/api/audit
/api/integrations
/api/ai/analyze
/api/events
```

## Intelligence artificielle

L’API choisit le premier fournisseur configuré entre OpenAI et Gemini. En
l’absence de clé, le moteur local classe les signaux textuels et produit des
recommandations. Un fournisseur demandé mais absent est signalé par
`configuration: not_configured`.

## Sécurité et permissions

Les rôles métier sont définis par l’API. La prochaine étape de production est
d’ajouter un fournisseur OIDC générique, des jetons courts, une matrice RBAC et
une base PostgreSQL/PostGIS. Les secrets ne sont jamais accessibles par
`EXPO_PUBLIC_*`.

## Persistance

La version actuelle expose un socle API fonctionnel avec données de
démonstration en mémoire. Pour la production, les interfaces doivent être
branchées sur PostgreSQL/PostGIS, un stockage objet compatible S3 et une file de
travaux pour les calculs satellite.
