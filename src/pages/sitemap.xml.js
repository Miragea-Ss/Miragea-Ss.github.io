import { getCollection } from 'astro:content';

const origin = 'https://miragea-ss.github.io';

const routes = [
  '/eliora/discovery/en/', '/eliora/discovery/scan/',
  '/eliora/discovery/ja/', '/eliora/discovery/zh/',
  '/eliora/discovery/ja/scan/', '/eliora/discovery/zh/scan/',
  '/en/', '/ja/', '/zh/',
  '/en/geekspell/', '/ja/geekspell/', '/zh/geekspell/',
  '/eliora/', '/eliora/index.html', '/eliora/infinite-canvas.html', '/eliora/media-vault/',
  '/eliora/media-vault/en/', '/eliora/media-vault/ja/', '/eliora/media-vault/zh/',
  '/eliora/atelier/en/', '/eliora/atelier/ja/', '/eliora/atelier/zh/',
  '/eliora/atelier/en/atelier/', '/eliora/atelier/ja/atelier/', '/eliora/atelier/zh/atelier/',
  '/eliora/atelier/en/contact/', '/eliora/atelier/ja/contact/', '/eliora/atelier/zh/contact/',
  '/eliora/atelier/en/services/', '/eliora/atelier/ja/services/', '/eliora/atelier/zh/services/',
];

// Pages that are plain files under src/pages (GeekSpell hubs and episodes in en/ja/zh).
const geekspellRoutes = Object.keys(import.meta.glob('./*/geekspell/**/index.astro')).map((key) =>
  key.replace('./', '/').replace('index.astro', ''),
);

export async function GET() {
  const thoughts = await getCollection('thoughts');
  const thoughtRoutes = ['/thoughts/'];
  for (const entry of thoughts) {
    thoughtRoutes.push(`/thoughts/${entry.id}/`);
    if (!entry.id.includes('/')) {
      thoughtRoutes.push(`/en/thoughts/${entry.id}/`, `/ja/thoughts/${entry.id}/`, `/zh/thoughts/${entry.id}/`);
    }
  }
  const all = [...new Set([...routes, ...geekspellRoutes, ...thoughtRoutes])].sort();
  const urls = all
    .map((route) => `  <url><loc>${origin}${route}</loc></url>`)
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
