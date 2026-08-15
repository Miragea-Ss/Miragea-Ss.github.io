const origin = 'https://miragea-ss.github.io';

const routes = [
  '/en/', '/ja/', '/zh/',
  '/en/geekspell/', '/ja/geekspell/', '/zh/geekspell/',
  '/eliora/', '/eliora/index.html', '/eliora/infinite-canvas.html', '/eliora/media-vault/',
  '/eliora/atelier/en/', '/eliora/atelier/ja/', '/eliora/atelier/zh/',
  '/eliora/atelier/en/atelier/', '/eliora/atelier/ja/atelier/', '/eliora/atelier/zh/atelier/',
  '/eliora/atelier/en/contact/', '/eliora/atelier/ja/contact/', '/eliora/atelier/zh/contact/',
];

export function GET() {
  const urls = routes
    .map((route) => `  <url><loc>${origin}${route}</loc></url>`)
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
