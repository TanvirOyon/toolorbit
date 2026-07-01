export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { createAuth } from '../../lib/auth';
import { drizzle } from 'drizzle-orm/d1';
import { favorites } from '@toolorbit/db';
import { eq, and } from 'drizzle-orm';
import { checkRateLimit, tooManyRequests } from '../../lib/rate-limit';

function unauthorized(): Response {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}

function badRequest(message: string): Response {
  return Response.json({ error: message }, { status: 400 });
}

export const GET: APIRoute = async ({ request }) => {
  const auth = createAuth(env);
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return unauthorized();

  const db = drizzle(env.DB);
  const rows = await db.select().from(favorites).where(eq(favorites.userId, session.user.id));
  return Response.json(rows.map((r) => r.toolSlug));
};

export const POST: APIRoute = async ({ request }) => {
  const auth = createAuth(env);
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return unauthorized();

  // Cheap abuse guard on writes (favoriting is a low-value target but D1
  // writes are the free-tier's most limited resource - 100k/day).
  const allowed = await checkRateLimit(env.API_RATE_LIMITER, session.user.id);
  if (!allowed) return tooManyRequests();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest('Invalid JSON body');
  }
  const slug = (body as { slug?: unknown })?.slug;
  if (!slug || typeof slug !== 'string') return badRequest('`slug` is required');

  const db = drizzle(env.DB);
  await db
    .insert(favorites)
    .values({ userId: session.user.id, toolSlug: slug })
    .onConflictDoNothing();
  return Response.json({ ok: true });
};

export const DELETE: APIRoute = async ({ request }) => {
  const auth = createAuth(env);
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return unauthorized();

  const allowed = await checkRateLimit(env.API_RATE_LIMITER, session.user.id);
  if (!allowed) return tooManyRequests();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest('Invalid JSON body');
  }
  const slug = (body as { slug?: unknown })?.slug;
  if (!slug || typeof slug !== 'string') return badRequest('`slug` is required');

  const db = drizzle(env.DB);
  await db
    .delete(favorites)
    .where(and(eq(favorites.userId, session.user.id), eq(favorites.toolSlug, slug)));
  return Response.json({ ok: true });
};
