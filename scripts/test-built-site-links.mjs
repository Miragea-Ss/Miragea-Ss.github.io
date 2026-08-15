import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const pages = [
  '/eliora/media-vault/',
  '/eliora/media-vault/en/',
  '/eliora/media-vault/ja/',
  '/eliora/media-vault/zh/',
  '/en/thoughts/first-intuition/',
  '/en/thoughts/2025-01-01-new-year/',
  '/thoughts/first-intuition/',
  '/thoughts/2025-01-01-new-year/'
];
const failures = [];

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function toDistPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  if (decoded.endsWith('/')) return path.join(dist, decoded, 'index.html');
  return path.join(dist, decoded);
}

for (const page of pages) {
  const pagePath = toDistPath(page);
  const html = await readFile(pagePath, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  const references = [...html.matchAll(/\s(?:href|src|poster|data-src)="([^"]*)"/g)].map((match) => match[1]);

  for (const reference of references) {
    if (!reference || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)) continue;
    if (reference.startsWith('#')) {
      const id = decodeURIComponent(reference.slice(1));
      if (id && !ids.has(id)) failures.push(`${page}: missing anchor ${reference}`);
      continue;
    }

    const url = new URL(reference, `https://miragea-ss.github.io${page}`);
    if (!await exists(toDistPath(url.pathname))) failures.push(`${page}: missing target ${reference}`);
  }

  console.log(`PASS: checked ${references.length} links/assets in ${page}`);
}

const localeExpectations = {
  en: { lang: 'en', title: 'A video portrait' },
  ja: { lang: 'ja', title: '映像でたどる' },
  zh: { lang: 'zh-CN', title: '用影像走进' }
};

for (const [locale, expected] of Object.entries(localeExpectations)) {
  const html = await readFile(toDistPath(`/eliora/media-vault/${locale}/`), 'utf8');
  const required = [
    `<html lang="${expected.lang}">`,
    expected.title,
    `window.__MEDIA_VAULT_LANG__ = "${locale}"`,
    `<link rel="canonical" href="https://miragea-ss.github.io/eliora/media-vault/${locale}/" />`,
    '<script type="application/ld+json">'
  ];
  for (const marker of required) {
    if (!html.includes(marker)) failures.push(`${locale}: missing metadata marker ${marker}`);
  }
  if (/<iframe[^>]+\ssrc=/i.test(html)) failures.push(`${locale}: video iframe must not load before a click`);
}

const localizedThoughtMediaPages = [
  '/ja/thoughts/first-intuition/',
  '/zh/thoughts/first-intuition/',
  '/ja/thoughts/2025-01-01-new-year/',
  '/zh/thoughts/2025-01-01-new-year/'
];

for (const page of localizedThoughtMediaPages) {
  const html = await readFile(toDistPath(page), 'utf8');
  const expectedLang = page.startsWith('/ja/') ? 'ja' : 'zh';
  if (!html.includes(`<html lang="${expectedLang}">`)) {
    failures.push(`${page}: expected html lang ${expectedLang}`);
  }
  if (/<(?:audio|video)\b/i.test(html)) {
    failures.push(`${page}: English-only audio/video must not be embedded in a localized route`);
  }
  if (!html.includes(`/en/thoughts/`)) {
    failures.push(`${page}: missing link to the English original`);
  }
}

if (failures.length) {
  failures.forEach((failure) => console.error(`FAIL: ${failure}`));
  process.exitCode = 1;
} else {
  console.log('PASS: Media Vault language metadata, JSON-LD, anchors, and internal targets are valid.');
}
