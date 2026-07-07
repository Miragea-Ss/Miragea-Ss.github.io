#!/usr/bin/env node
/**
 * Append verified entries to agents/*.yaml — run agents:export after.
 * Usage:
 *   npm run agents:add -- contest --title "..." --url "https://..." [--deadline 2026-08-01] [--ongoing]
 *   npm run agents:add -- publish --title "..." --url "https://x.com/..."
 *   npm run agents:add -- log --title "..." --url "https://x.com/..." [--steps 8]
 *   npm run agents:add -- idea --title "..." --url "/eliora/atelier/ja/" --buildable 80
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const AGENTS_DIR = join(ROOT, 'agents');

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = next;
        i += 1;
      }
    } else {
      args._.push(token);
    }
  }
  return args;
}

function requireUrl(url, label) {
  if (!url || typeof url !== 'string') {
    throw new Error(`${label} requires --url (official or real post URL)`);
  }
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return url;
  throw new Error(`${label} URL must be https://, http://, or internal path starting with /`);
}

function loadYaml(name) {
  const path = join(AGENTS_DIR, name);
  return { path, data: parseYaml(readFileSync(path, 'utf8')) ?? {} };
}

function saveYaml(path, data) {
  writeFileSync(path, stringifyYaml(data, { lineWidth: 0 }), 'utf8');
}

const args = parseArgs(process.argv.slice(2));
const kind = args._[0];

if (!kind) {
  console.error('Usage: npm run agents:add -- <contest|publish|log|idea> --title "..." --url "..."');
  process.exit(1);
}

const now = new Date().toISOString();
const title = args.title;
if (!title) throw new Error('--title is required');

if (kind === 'contest') {
  const url = requireUrl(args.url, 'contest');
  const { path, data } = loadYaml('contests.yaml');
  const entry = {
    at: now,
    type: args.type || 'ai-contest',
    title,
    url,
  };
  if (args.ongoing) entry.ongoing = true;
  if (args.deadline) entry.deadline = args.deadline;
  if (args.startsAt) entry.startsAt = args.startsAt;
  if (args.period) {
    entry.period = { en: args.period, ja: args.period, zh: args.period };
  }
  data.contests = [entry, ...(data.contests ?? [])];
  saveYaml(path, data);
  console.log(`Added contest: ${title}`);
} else if (kind === 'publish') {
  const url = requireUrl(args.url, 'publish');
  const { path, data } = loadYaml('publish-manifest.yaml');
  const channels = (args.channels || 'x').split(',').map((c) => c.trim());
  const date = new Date(now);
  const periodEn = `Published ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · ${channels.join(', ')}`;
  data.publishes = [
    {
      at: now,
      type: 'publish',
      title,
      url,
      channels,
      period: { en: periodEn, ja: periodEn, zh: periodEn },
    },
    ...(data.publishes ?? []),
  ];
  saveYaml(path, data);
  console.log(`Added publish: ${title}`);
} else if (kind === 'log') {
  const url = requireUrl(args.url, 'log');
  const { path, data } = loadYaml('production-log.yaml');
  const steps = Number(args.steps || args.stepsRecorded || 0);
  data.logs = [
    {
      at: now,
      type: 'article',
      title,
      url,
      ...(steps > 0 ? { stepsRecorded: steps, draftArticles: 1 } : {}),
    },
    ...(data.logs ?? []),
  ];
  saveYaml(path, data);
  console.log(`Added production log: ${title}`);
} else if (kind === 'idea') {
  const url = requireUrl(args.url, 'idea');
  const buildable = Number(args.buildable);
  if (!Number.isFinite(buildable)) throw new Error('idea requires --buildable <number>');
  const { path, data } = loadYaml('ideas.yaml');
  data.ideas = [
    {
      at: now,
      type: 'score',
      title,
      url,
      buildable,
    },
    ...(data.ideas ?? []),
  ];
  saveYaml(path, data);
  console.log(`Added idea score: ${title} (${buildable}%)`);
} else {
  throw new Error(`Unknown kind: ${kind}`);
}

console.log('Run: npm run agents:export && npm run agents:validate');