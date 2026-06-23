import { defineConfig } from 'drizzle-kit';

/**
 * Drizzle Kit config for local schema inspection / migration generation.
 * This is ONLY used by `drizzle-kit` CLI (not at runtime).
 *
 * For Cloudflare D1 remote introspection:
 *   npx drizzle-kit introspect
 *
 * For generating new migrations after schema changes:
 *   npx drizzle-kit generate
 *
 * Then apply with wrangler:
 *   npx wrangler d1 execute toolorbit --file=migrations/<file>.sql
 */
export default defineConfig({
  dialect: 'sqlite',
  schema:  './packages/db/src/schema.ts',
  out:     './migrations',
  // D1 does not expose a libsql URL locally — we generate plain SQL migrations
  // and apply them via wrangler d1 execute. No dbCredentials needed.
});
