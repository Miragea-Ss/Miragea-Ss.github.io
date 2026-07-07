import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateAgentStatus } from './agent-schema.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STATUS_PATH = join(ROOT, 'public/eliora/atelier/data/agents/status.json');

const raw = JSON.parse(readFileSync(STATUS_PATH, 'utf8'));
validateAgentStatus(raw);

const ageHours = (Date.now() - new Date(raw.generatedAt)) / 3600000;
if (ageHours > 48) {
  console.warn(`WARN: status.json is ${Math.floor(ageHours)}h old — stale banner will show on site`);
}

console.log(`OK: ${STATUS_PATH}`);