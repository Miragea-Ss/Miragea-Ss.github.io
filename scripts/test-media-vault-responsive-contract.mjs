import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [html, css, app] = await Promise.all([
  readFile(path.join(root, 'public', 'eliora', 'media-vault', 'index.html'), 'utf8'),
  readFile(path.join(root, 'public', 'eliora', 'media-vault', 'styles.css'), 'utf8'),
  readFile(path.join(root, 'public', 'eliora', 'media-vault', 'app.js'), 'utf8'),
]);

const smartphoneBlock = css.match(/@media \(max-width: 720\.98px\) \{([\s\S]*?)\n\}/)?.[1] || '';
const tabletBlock = css.match(/@media \(max-width: 1050px\) \{([\s\S]*?)\n\}/)?.[1] || '';

const checks = [
  ['desktop navigation has an independent class', html.includes('class="desktop-nav"')],
  ['smartphone navigation has an independent class', html.includes('class="mobile-nav"')],
  ['smartphone navigation is hidden by default', css.includes('.mobile-nav { display: none; }')],
  ['only the desktop navigation is hidden at tablet width', tabletBlock.includes('.desktop-nav { display: none; }') && !/(^|\s)nav\s*\{\s*display:\s*none/.test(tabletBlock)],
  ['smartphone navigation appears only in the 720px block', smartphoneBlock.includes('.mobile-nav {') && smartphoneBlock.includes('display: grid;')],
  ['smartphone sticky header keeps horizontal clipping local', smartphoneBlock.includes('html, body { overflow-x: clip; }')],
  ['smartphone anchors clear the taller header', smartphoneBlock.includes('scroll-margin-top: 124px;')],
  ['all three languages include a smartphone navigation label', ['スマートフォンナビゲーション', 'Smartphone navigation', '手机导航'].every((label) => app.includes(label))],
];

const failed = checks.filter(([, ok]) => !ok);
for (const [label, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}: ${label}`);
if (failed.length) process.exitCode = 1;
