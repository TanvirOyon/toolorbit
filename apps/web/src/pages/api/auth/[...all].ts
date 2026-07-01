export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { createAuth } from '../../../lib/auth';

const handler: APIRoute = async ({ request }) => {
  const auth = createAuth(env);
  return auth.handler(request);
};

export const GET  = handler;
export const POST = handler;
