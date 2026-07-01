export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { createAuth } from '../../lib/auth';
import { drizzle } from 'drizzle-orm/d1';
import { favorites } from '@toolorbit/db';
import { eq, and } from 'drizzle-orm';

export const GET: APIRoute = async ({ request }) => {
  const auth = createAuth(env);
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return new Response('Unauthorized', { status: 401 });

  const db = drizzle(env.DB);
  const rows = await db.select().from(favorites).where(eq(favorites.userId, session.user.id));
  return Response.json(rows.map((r) => r.toolSlug));
};

export const POST: APIRoute = async ({ request }) => {
  const auth = createAuth(env);
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return new Response('Unauthorized', { status: 401 });

  const { slug } = (await request.json()) as { slug: string };
  if (!slug) return new Response('Bad Request', { status: 400 });

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
  if (!session) return new Response('Unauthorized', { status: 401 });

  const { slug } = (await request.json()) as { slug: string };
  if (!slug) return new Response('Bad Request', { status: 400 });

  const db = drizzle(env.DB);
  await db
    .delete(favorites)
    .where(and(eq(favorites.userId, session.user.id), eq(favorites.toolSlug, slug)));
  return Response.json({ ok: true });
};
