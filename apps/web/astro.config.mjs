import { defineConfig, sessionDrivers } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Cloudflare Pages default domain for now. Swap this to the custom domain
// once it is attached in Cloudflare.
const SITE_URL = 'https://toolorbit.pages.dev';

export default defineConfig({
  output: 'static', // Phase 0: everything prerendered. Flip per-route to SSR
  // with `export const prerender = false` once /dashboard and /api/* exist.
  // Phase 0 has zero SSR routes, so sessions are unused - set an inert
  // in-memory driver explicitly, otherwise the Cloudflare adapter
  // auto-enables a "SESSION" KV binding that would need a real KV
  // namespace provisioned just to deploy a static site. Swap to
  // sessionDrivers.cloudflareKVBinding(...) when Phase 1 (auth) needs it.
  session: {
    driver: sessionDrivers.memory(),
  },
  adapter: cloudflare({
    platformProxy: { enabled: true },
    imageService: 'passthrough',
  }),
  integrations: [
    react(),
    sitemap({
      // AI-training crawlers are blocked separately in robots.txt; the
      // sitemap itself just lists every real, prerendered route.
      filter: (page) => !page.includes('/dashboard'),
    }),
  ],
  site: SITE_URL,
  vite: {
    plugins: [tailwindcss()],
  },
});