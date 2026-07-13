# Intégrations et secrets

## Principe

Toutes les intégrations externes sont exécutées par `server/`. Le bundle Expo
ne doit contenir que `EXPO_PUBLIC_API_URL`.

## Intelligence artificielle

| Fournisseur | Variables |
| --- | --- |
| OpenAI | `OPENAI_API_KEY`, `OPENAI_MODEL` |
| Gemini | `GEMINI_API_KEY`, `GEMINI_MODEL` |

Sans clé, `/api/ai/analyze` utilise le moteur local de détection d’anomalies.
Une panne du fournisseur provoque également un repli local sans exposer la clé.

## Observation de la Terre

| Source | Variables |
| --- | --- |
| Sentinel Hub | `SENTINEL_HUB_CLIENT_ID`, `SENTINEL_HUB_CLIENT_SECRET` |
| Global Forest Watch | `GLOBAL_FOREST_WATCH_API_TOKEN` |
| NASA FIRMS | `FIRMS_MAP_KEY` |
| Copernicus Data Space | `COPERNICUS_CLIENT_ID`, `COPERNICUS_CLIENT_SECRET` |

`GET /api/integrations` retourne `configured` ou `not_configured`. La présence
d’une variable ne vaut pas validation du compte fournisseur ; un contrôle de
santé distant devra être ajouté lors du déploiement.

## Notifications

Le modèle prévoit SMS, email et push. Les variables génériques du fichier
`server/.env.example` sont des points d’extension ; aucun message réel n’est
envoyé tant qu’un fournisseur n’est pas implémenté et configuré.

## Mise en production

1. Créer des comptes de service dédiés et limités.
2. Stocker les secrets dans le gestionnaire du serveur ou de la plateforme.
3. Définir `CLIENT_ORIGIN` avec les domaines autorisés.
4. Déployer l’API derrière HTTPS.
5. Définir `EXPO_PUBLIC_API_URL` vers l’URL HTTPS de l’API.
6. Tester chaque connecteur avec son endpoint de santé.
