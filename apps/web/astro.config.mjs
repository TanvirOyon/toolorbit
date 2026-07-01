import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL } from './src/lib/config.ts';

export default defineConfig({
  adapter: cloudflare({
    platformProxy: { enabled: true },
    imageService: 'passthrough',
  }),

  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/dashboard') &&
        !page.includes('/login') &&
        !page.includes('/api/'),
    }),
  ],

  site: SITE_URL,

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['pdf-lib', 'pdfjs-dist', 'browser-image-compression'],
    },
    optimizeDeps: {
      include: ['mathjs', 'fuse.js'],
    },
    worker: { format: 'es' },
    assetsInclude: ['**/*.worker.min.mjs'],
  },
});
