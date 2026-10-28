import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Staging must never be indexed. Amplify sets AWS_BRANCH during its build:
// every branch except main (amiyaislam.com) gets a noindex meta tag and a
// robots.txt that blocks all crawlers. Local builds and main are unchanged.
const branch = process.env.AWS_BRANCH;
const isStaging = Boolean(branch) && branch !== 'main';

const noindexStaging = () => ({
  name: 'noindex-staging',
  apply: 'build',
  transformIndexHtml(html) {
    if (!isStaging) return html;
    return html.replace('<head>', '<head>\n    <meta name="robots" content="noindex, nofollow">');
  },
  generateBundle() {
    if (!isStaging) return;
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: 'User-agent: *\nDisallow: /\n' });
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), noindexStaging()],
  server: {
    host: true,
  },
});
