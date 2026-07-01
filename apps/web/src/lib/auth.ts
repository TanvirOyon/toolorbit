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
/**
 * SECURITY: this must never silently fall back to a hardcoded secret in a
 * deployed build. Better Auth signs session tokens with this value - if it
 * ships as a public string sitting in the repo, anyone can forge a valid
 * session for any user. `import.meta.env.DEV` is a compile-time flag (true
 * only for `astro dev`, always false for `astro build`), so this only
 * relaxes locally, never in the artifact that actually gets deployed.
 *
 * Set the real value with: wrangler secret put BETTER_AUTH_SECRET
 * (generate one with: openssl rand -base64 32)
 */
function resolveAuthSecret(env: WorkerEnv): string {
  if (env.BETTER_AUTH_SECRET) return env.BETTER_AUTH_SECRET;

  if (import.meta.env.DEV) {
    return 'toolorbit-dev-secret-change-in-prod';
  }

  throw new Error(
    'BETTER_AUTH_SECRET is not set. Run `wrangler secret put BETTER_AUTH_SECRET` ' +
      'before deploying - refusing to start with no secret in a production build.',
  );
}

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

    secret: resolveAuthSecret(env),

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
