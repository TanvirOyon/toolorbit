import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Swap this to your custom domain once it is attached in Cloudflare.
const SITE_URL = 'https://toolorbit.pages.dev';

export default defineConfig({
  // Phase 1: Astro 6 defaults to static output, while /dashboard and /api/*
  // use `export const prerender = false` to opt into Workers execution.
  // This means zero Workers invocations for the static tool pages.

  adapter: cloudflare({
    platformProxy: { enabled: true },
    imageService: 'passthrough',
  }),

  integrations: [
    react(),
    sitemap({
      // Dashboard is SSR — no static URL to put in the sitemap.
      filter: (page) => !page.includes('/dashboard'),
    }),
  ],

  site: SITE_URL,

  vite: {
    plugins: [tailwindcss()],
    // pdf-lib and pdfjs-dist are browser-only: they import Web APIs
    // (ArrayBuffer, Uint8Array, canvas) that are not available in the Vite
    // SSR sandbox. Mark them external so Vite never tries to bundle them
    // server-side. They are loaded at runtime via dynamic import() inside
    // client-only island components.
    ssr: {
      external: ['pdf-lib', 'pdfjs-dist', 'browser-image-compression'],
    },
    optimizeDeps: {
      // Pre-bundle mathjs so its ESM entry resolves cleanly in dev.
      include: ['mathjs'],
    },
  },
});
