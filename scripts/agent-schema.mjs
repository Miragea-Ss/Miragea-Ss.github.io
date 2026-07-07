import { z } from 'zod';

const EventSchema = z.object({
  at: z.string().datetime(),
  type: z.string(),
  title: z.string(),
  url: z.string().optional(),
  startsAt: z.string().optional(),
  deadline: z.string().optional(),
  ongoing: z.boolean().optional(),
  expired: z.boolean().optional(),
  period: z
    .object({
      zh: z.string().max(80),
      ja: z.string().max(80),
      en: z.string().max(80),
    })
    .optional(),
});

export const AgentEntrySchema = z.object({
  status: z.enum(['active', 'idle', 'queued', 'error']),
  lastRun: z.string().datetime(),
  summary: z.object({
    zh: z.string().max(120),
    ja: z.string().max(120),
    en: z.string().max(120),
  }),
  metrics: z.record(z.union([z.string(), z.number()])).optional(),
  events: z.array(EventSchema).max(10),
});

export const AgentStatusSchema = z.object({
  generatedAt: z.string().datetime(),
  agents: z.object({
    'campaign-watcher': AgentEntrySchema,
    'production-recorder': AgentEntrySchema,
    'work-distributor': AgentEntrySchema,
    'idea-miner': AgentEntrySchema,
  }),
});

export function validateAgentStatus(data) {
  return AgentStatusSchema.parse(data);
}