import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

const contentConfigPath = path.join(root, 'src', 'content.config.ts');
const legacyConfigPath = path.join(root, 'src', 'content', 'config.ts');
const singleRoute = await readFile(path.join(root, 'src', 'pages', 'thoughts', '[slug].astro'), 'utf8');
const nestedRoute = await readFile(path.join(root, 'src', 'pages', 'thoughts', '[...slug].astro'), 'utf8');
const config = await readFile(contentConfigPath, 'utf8');

if (await exists(legacyConfigPath)) failures.push('legacy src/content/config.ts must be removed');
if (!config.includes("from 'astro/loaders'")) failures.push('Content Layer glob loader is missing');
for (const collection of ['thoughts', 'blog', 'predictions']) {
  if (!config.includes(`const ${collection} = defineCollection`)) failures.push(`${collection} collection is not explicitly defined`);
}
if (!singleRoute.includes("!entry.id.includes('/')")) failures.push('single route must accept only top-level entries');
if (!nestedRoute.includes("entry.id.includes('/')")) failures.push('catch-all route must accept only nested entries');

const expectedBuiltRoutes = [
  'dist/thoughts/first-intuition/index.html',
  'dist/thoughts/2025-01-01-new-year/index.html',
  'dist/thoughts/builder/first-intuition/index.html',
  'dist/thoughts/creator/first-intuition/index.html',
  'dist/thoughts/dreamer/first-intuition/index.html',
  'dist/thoughts/observer/first-intuition/index.html',
  'dist/en/thoughts/first-intuition/index.html',
  'dist/ja/thoughts/first-intuition/index.html',
  'dist/zh/thoughts/first-intuition/index.html',
];

for (const route of expectedBuiltRoutes) {
  if (!await exists(path.join(root, ...route.split('/')))) failures.push(`missing built route: ${route}`);
}

if (failures.length) {
  failures.forEach((failure) => console.error(`FAIL: ${failure}`));
  process.exitCode = 1;
} else {
  console.log('PASS: Astro Content Layer configuration and complementary Thoughts routes are valid.');
}
