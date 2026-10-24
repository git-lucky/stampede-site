import { priorityCities } from '@/content/cities';

const site = 'https://stampede.quest';

const staticPaths = ['/', '/cities/', '/privacy/', '/terms/', '/support/'];
const cityPaths = priorityCities.map((city) => `/cities/${city.slug}/`);

function url(path: string) {
  return `
  <url>
    <loc>${site}${path}</loc>
    <changefreq>${path.startsWith('/cities/') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${path === '/' ? '1.0' : path.startsWith('/cities/') ? '0.8' : '0.5'}</priority>
  </url>`;
}

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...staticPaths, ...cityPaths].map(url).join('')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
