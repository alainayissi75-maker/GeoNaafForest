import cors from '@fastify/cors';
import Fastify from 'fastify';
import { z } from 'zod';
import { config } from './config.js';
import {
  audit,
  dashboardData,
  documents,
  drones,
  interventions,
  notifications,
  roles,
  sensors,
  tasks,
} from './data.js';
import { analyze } from './services/aiService.js';
import { getIntegrationStates } from './services/integrationRegistry.js';

const analysisRequestSchema = z.object({
  prompt: z.string().trim().min(10).max(8000),
  provider: z.enum(['auto', 'local', 'openai', 'gemini']).default('auto'),
});

const incidentRequestSchema = z.object({
  areaHectares: z.number().nonnegative().optional(),
  title: z.string().trim().min(3).max(160),
  description: z.string().trim().min(10).max(4000),
  type: z
    .enum(['wildfire', 'deforestation', 'degradation'])
    .default('degradation'),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export async function buildApp() {
  const app = Fastify({ logger: true });
  await app.register(cors, {
    origin: config.CLIENT_ORIGIN.split(',').map((origin) => origin.trim()),
  });

  app.get('/healthz', async () => ({
    service: 'naaftrack-api',
    status: 'ok',
    time: new Date().toISOString(),
  }));

  app.get('/api/dashboard', async () => dashboardData);
  app.get('/api/analytics', async () => ({
    vegetation: dashboardData.vegetation,
    carbon: dashboardData.carbon,
    mode: dashboardData.mode,
  }));
  app.get('/api/operations', async () => ({
    summary: dashboardData.operations,
    drones,
    sensors,
    tasks,
    interventions,
    notifications,
  }));
  app.get('/api/drones', async () => drones);
  app.get('/api/iot/sensors', async () => sensors);
  app.get('/api/tasks', async () => tasks);
  app.get('/api/interventions', async () => interventions);
  app.get('/api/documents', async () => documents);
  app.get('/api/audit', async () => audit);
  app.get('/api/roles', async () => roles);
  app.get('/api/integrations', async () => getIntegrationStates());

  app.post('/api/ai/analyze', async (request, reply) => {
    const parsed = analysisRequestSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        error: 'INVALID_ANALYSIS_REQUEST',
        issues: parsed.error.issues,
      });
    }
    return analyze(parsed.data.prompt, parsed.data.provider);
  });

  app.post('/api/incidents', async (request, reply) => {
    const parsed = incidentRequestSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        error: 'INVALID_INCIDENT',
        issues: parsed.error.issues,
      });
    }

    return reply.status(201).send({
      id: `INC-${Date.now()}`,
      status: 'active',
      openedAt: new Date().toISOString(),
      ...parsed.data,
    });
  });

  app.get('/api/events', async (request, reply) => {
    reply.hijack();
    reply.raw.writeHead(200, {
      'Access-Control-Allow-Origin': config.CLIENT_ORIGIN,
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
    });
    reply.raw.write(
      `event: connected\ndata: ${JSON.stringify({
        status: 'ready',
        time: new Date().toISOString(),
      })}\n\n`,
    );
    const heartbeat = setInterval(() => {
      reply.raw.write(`event: heartbeat\ndata: ${Date.now()}\n\n`);
    }, 25000);
    request.raw.on('close', () => clearInterval(heartbeat));
  });

  return app;
}
