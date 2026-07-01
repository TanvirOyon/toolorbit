/// <reference types="astro/client" />
/// <reference types="vite/client" />

// Mirrors @astrojs/cloudflare's own types.d.ts pattern: makes Astro.locals
// correctly typed for the parts of the Cloudflare Runtime that are still
// valid in Astro 6 (cfContext, getClientAddress, etc). Bindings/secrets are
// NOT accessed through locals.runtime in Astro 6 - see the Env augmentation
// below and how it is consumed in src/lib/auth.ts.
type Runtime = import('@astrojs/cloudflare').Runtime;
declare namespace App {
  interface Locals extends Runtime {}
}

// Augments the global Cloudflare.Env interface that `cloudflare:workers`'s
// `env` export is typed against, so every
//   import { env } from 'cloudflare:workers'
// across the app gets full autocomplete and type-checking with zero casts.
// This is the same shape `wrangler types` would generate automatically from
// apps/web/wrangler.jsonc - kept here explicitly so the project has correct
// types without requiring a separate generation step before first build.
declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    SESSION: KVNamespace;
    BETTER_AUTH_SECRET?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    GITHUB_CLIENT_ID?: string;
    GITHUB_CLIENT_SECRET?: string;
    NODE_ENV?: string;
    // Cloudflare's native Rate Limiting binding (free-plan compatible,
    // zero extra infra - no KV/D1 writes needed). Declared here so
    // `env.AUTH_RATE_LIMITER.limit()` type-checks. See wrangler.jsonc for
    // the binding config and src/lib/rate-limit.ts for usage.
    AUTH_RATE_LIMITER: RateLimit;
    API_RATE_LIMITER: RateLimit;
  }
}
