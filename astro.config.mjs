import { defineConfig } from 'astro/config';

// Cloudflare Pages deploy target. Fully static output - no SSR runtime needed.
// The Cloudflare adapter would be required only if we later add dynamic routes.
export default defineConfig({
  site: 'https://stampede.quest',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  devToolbar: {
    enabled: false,
  },
});
