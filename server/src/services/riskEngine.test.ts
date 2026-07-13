import assert from 'node:assert/strict';
import test from 'node:test';
import { analyzeLocally } from './riskEngine.js';

test('classifies combined fire and deforestation signals as critical', () => {
  const analysis = analyzeLocally(
    'Une fumée confirme un feu proche d’une nouvelle déforestation.',
  );

  assert.equal(analysis.provider, 'local');
  assert.equal(analysis.riskLevel, 'critical');
  assert.ok(analysis.anomalies.length >= 2);
});

test('keeps a neutral observation at low risk', () => {
  const analysis = analyzeLocally(
    'La patrouille régulière est terminée sans événement particulier.',
  );

  assert.equal(analysis.riskLevel, 'low');
});
