import assert from 'node:assert/strict';
import test from 'node:test';
import { buildApp } from '../app.js';

test('serves health and dashboard endpoints', async () => {
  const app = await buildApp();

  const health = await app.inject({ method: 'GET', url: '/healthz' });
  const dashboard = await app.inject({
    method: 'GET',
    url: '/api/dashboard',
  });

  assert.equal(health.statusCode, 200);
  assert.equal(health.json().status, 'ok');
  assert.equal(dashboard.statusCode, 200);
  assert.equal(dashboard.json().mode, 'demo');

  await app.close();
});

test('returns a local AI analysis without provider secrets', async () => {
  const app = await buildApp();
  const response = await app.inject({
    method: 'POST',
    url: '/api/ai/analyze',
    payload: {
      prompt: 'Une fumée confirme un feu et une déforestation récente.',
      provider: 'auto',
    },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.json().provider, 'local');
  assert.equal(response.json().riskLevel, 'critical');

  await app.close();
});
