---
name: testing-naaftrack-web-api
description: Test NAAFTrack Expo Web end-to-end against its local Fastify API, including maps, local AI, integrations, and incident submission.
---

# Testing NAAFTrack Web and API

## Devin Secrets Needed

No secret is required for the local fallback test.

Optional provider tests require these server-side secrets:

- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
- `SENTINEL_HUB_CLIENT_ID`
- `SENTINEL_HUB_CLIENT_SECRET`
- `GLOBAL_FOREST_WATCH_API_TOKEN`
- `FIRMS_MAP_KEY`
- `COPERNICUS_CLIENT_ID`
- `COPERNICUS_CLIENT_SECRET`

Never expose these variables in the Expo bundle or browser console.

## Start the application

Use Node.js `22.13.0`.

```bash
npm install
npm run api:start
EXPO_PUBLIC_API_URL=http://localhost:8787 npm run web -- --port 8081
```

Open `http://localhost:8081`. Prefer `localhost` consistently: the API CORS
origin may reject a client opened from `127.0.0.1`.

## End-to-end checks

1. Confirm the desktop sidebar exposes Accueil, Carte, Analyses, Opérations and Plus.
2. Confirm Analyses identifies demonstration data and renders six NDVI months.
3. Confirm Opérations renders alert, drone, imagery, cloud, activity and intervention metrics.
4. Open Carte, switch the base map, toggle Drones and IoT, and verify the visible-layer count and markers.
5. Open Intelligence artificielle and submit a prompt containing at least two critical terms such as feu, fumée or déforestation.
6. Verify the UI result and the Fastify `POST /api/ai/analyze` status. Without provider keys, `Moteur local` is expected.
7. Open Intégrations and verify every provider status matches the server configuration. Without secrets, each card should display `À configurer`.
8. Submit an incident through the UI and verify both the visible confirmation and Fastify `POST /api/incidents` status `201`.

## Runtime evidence

- Test user-facing behavior through the browser rather than direct HTTP requests.
- Keep the API process output available to distinguish a server response from a client fallback.
- Capture full-screen evidence after the map layers, AI result, integration states, and incident confirmation settle.
- Preserve public map attributions; they are licensing requirements, not application authorship signatures.

## Web-specific cautions

- React Native Web may not display native `Alert.alert()` dialogs. Verify that important success and error states have visible Web feedback.
- Map tiles may need a few seconds to settle before asserting the selected base map and markers.
- Service-worker registration can be delayed in development; report it separately if it blocks navigation or offline behavior.
