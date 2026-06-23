import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@toolorbit/db';

/**
 * Creates a fresh better-auth instance bound to the request's D1 database.
 * Call this per-request in SSR routes — do NOT create a module-level singleton,
 * because the D1 binding is specific to each Workers request context.
 *
 * Usage in an Astro SSR route:
 *   const auth = createAuth(locals.runtime.env.DB);
 *   const session = await auth.api.getSession({ headers: request.headers });
 */
export function createAuth(d1: D1Database) {
  const db = drizzle(d1, { schema });

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

    // Social OAuth providers — set credentials in Cloudflare Pages env vars:
    //   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
    socialProviders: {
      google: {
        clientId:     process.env.GOOGLE_CLIENT_ID     ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      },
      github: {
        clientId:     process.env.GITHUB_CLIENT_ID     ?? '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      },
    },

    // Allow requests from your Pages domain
    trustedOrigins: [
      'https://toolorbit.pages.dev',
      // Add your custom domain here when ready:
      // 'https://www.toolorbit.xyz',
    ],

    // Cookie security — secure: true in production (HTTPS only)
    advanced: {
      cookiePrefix: 'toolorbit',
    },

    // Optional: turn on email + password if you add it later
    // emailAndPassword: { enabled: true },
  });
}
