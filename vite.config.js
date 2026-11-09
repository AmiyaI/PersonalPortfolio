import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { seoFallback } from './scripts/seo-fallback.mjs';

// Staging must never be indexed; the live site gets an open robots.txt and a sitemap. Amplify sets AWS_BRANCH during its build:
// every branch except main (amiyaislam.com) gets a noindex meta tag and a
// robots.txt that blocks all crawlers. Local builds and main are unchanged.
const branch = process.env.AWS_BRANCH;
const isStaging = Boolean(branch) && branch !== 'main';
// Beyond (and Studio, AI Slop) stays "Coming soon" on amiyaislam.com until it
// launches; staging and local dev show it. See src/lib/features.js.
const showBeyond = branch !== 'main';

const noindexStaging = () => ({
  name: 'noindex-staging',
  apply: 'build',
  transformIndexHtml(html) {
    if (!isStaging) return html;
    return html.replace('<head>', '<head>\n    <meta name="robots" content="noindex, nofollow">');
  },
  generateBundle() {
    if (isStaging) {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: 'User-agent: *\nDisallow: /\n' });
      return;
    }
    // The live site: crawlable, with a sitemap of the public pages. Beyond is
    // listed only once it launches.
    const pages = ['/', ...(showBeyond ? ['/beyond', '/studio'] : [])];
    const urls = pages.map((p) => `  <url><loc>https://www.amiyaislam.com${p}</loc></url>`).join('\n');
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: 'User-agent: *\nAllow: /\n\nSitemap: https://www.amiyaislam.com/sitemap.xml\n' });
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    });
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), noindexStaging(), seoFallback()],
  define: {
    __SHOW_BEYOND__: JSON.stringify(showBeyond),
  },
  server: {
    host: true,
  },
});
