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
  ['video iframe waits for an explicit play action', html.includes('id="video-player"') && !/<iframe[^>]+\ssrc=/i.test(html) && app.includes("placeholder.addEventListener('click'")],
  ['language buttons use stable localized routes', ['/eliora/media-vault/en/', '/eliora/media-vault/ja/', '/eliora/media-vault/zh/'].every((route) => app.includes(route))],
  ['accessibility copy covers all three languages', ['skipLink', 'heroImageAlt', 'videoListLabel', 'videoFrameTitle'].every((key) => (app.match(new RegExp(`${key}:`, 'g')) || []).length === 3)],
  ['expired contest film is absent from the current page', !html.includes('eliora-product-film-45s.mp4') && !html.includes('id="proof-video"') && !app.includes('proofVideoStart')],
  ['engineering evidence uses recorded verification values', ['1,922', '184 → 13', '>100<', '2026-08-15'].every((value) => html.includes(value))],
  ['technical evidence is collapsed by default', html.includes('<details class="proof-details">') && !html.includes('<details class="proof-details" open>')],
  ['visitor-first proof copy covers all three languages', ['登録なしで始める', 'Start without an account', '无需注册即可开始'].every((value) => app.includes(value))],
  ['technical disclosure labels cover all three languages', ['技術検証の詳細を見る', 'View technical verification', '查看技术验证详情'].every((value) => app.includes(value))],
];

const failed = checks.filter(([, ok]) => !ok);
for (const [label, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}: ${label}`);
if (failed.length) process.exitCode = 1;
