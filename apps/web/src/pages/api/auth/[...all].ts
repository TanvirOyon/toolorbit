export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { createAuth } from '../../../lib/auth';
import { checkRateLimit, tooManyRequests, clientKey } from '../../../lib/rate-limit';

// Auth endpoints (login, signup, password/email flows) are the classic
// credential-stuffing and account-enumeration target - rate limit by IP
// before Better Auth even sees the request. See wrangler.jsonc for the
// AUTH_RATE_LIMITER binding config.
const handler: APIRoute = async ({ request }) => {
  const allowed = await checkRateLimit(env.AUTH_RATE_LIMITER, clientKey(request));
  if (!allowed) return tooManyRequests();

  const auth = createAuth(env);
  return auth.handler(request);
};

export const GET  = handler;
export const POST = handler;
