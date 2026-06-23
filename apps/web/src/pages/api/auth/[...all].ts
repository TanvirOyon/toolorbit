/**
 * Better-auth catch-all handler.
 * This single file handles all /api/auth/* requests:
 *   GET  /api/auth/session
 *   POST /api/auth/sign-in/social
 *   POST /api/auth/sign-out
 *   GET  /api/auth/callback/google
 *   GET  /api/auth/callback/github
 *   ...etc
 *
 * prerender = false is REQUIRED — this must run as a Worker.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { createAuth } from '../../../lib/auth';

const handler: APIRoute = async ({ request, locals }) => {
  const env = (locals.runtime as { env: Record<string, unknown> }).env;
  const auth = createAuth(env.DB as D1Database);
  return auth.handler(request);
};

export const GET  = handler;
export const POST = handler;
