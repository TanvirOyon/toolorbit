import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@toolorbit/db';
import { SITE_URL } from './config';

/**
 * Alias for the global Cloudflare.Env type (declared in src/env.d.ts, kept in
 * sync with the bindings in apps/web/wrangler.jsonc). Exported under this
 * name purely for readability at call sites - it is the same type as the
 * `env` import from 'cloudflare:workers'.
 */
export type WorkerEnv = Cloudflare.Env;

/**
 * Creates a fresh Better Auth instance bound to the request's D1 database.
 *
 * MUST be called per-request in SSR routes - NOT as a module-level singleton,
 * because the D1 binding is specific to each Workers request context.
 *
 * Usage in an Astro SSR route (Astro 6 / @astrojs/cloudflare - bindings and
 * secrets are read via the native 'cloudflare:workers' module, NOT via
 * Astro.locals.runtime.env, which throws as of Astro 6):
 *
 *   import { env } from 'cloudflare:workers';
 *   const auth = createAuth(env);
 *   const session = await auth.api.getSession({ headers: request.headers });
 */
export function createAuth(env: WorkerEnv) {
  const db = drizzle(env.DB, { schema });

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema: {
        user:         schema.user,
        session:      schema.session,
        account:      schema.account,
        verification: schema.verification,
      },
    }),

    secret: env.BETTER_AUTH_SECRET ?? 'toolorbit-dev-secret-change-in-prod',

    socialProviders: {
      google: {
        clientId:     env.GOOGLE_CLIENT_ID     ?? '',
        clientSecret: env.GOOGLE_CLIENT_SECRET ?? '',
      },
      github: {
        clientId:     env.GITHUB_CLIENT_ID     ?? '',
        clientSecret: env.GITHUB_CLIENT_SECRET ?? '',
      },
    },

    trustedOrigins: [
      SITE_URL,
      // While testing before a custom domain is attached, add your real
      // workers.dev URL here too (format: https://<worker-name>.<your-account-subdomain>.workers.dev)
      // - it cannot be predicted in advance, so it is not hardcoded above.
    ],

    advanced: {
      cookiePrefix: 'toolorbit',
    },
  });
}
