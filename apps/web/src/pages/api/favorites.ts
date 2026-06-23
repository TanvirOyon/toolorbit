export const prerender = false;

import type { APIRoute } from 'astro';
import { createAuth } from '../../lib/auth';
import { drizzle } from 'drizzle-orm/d1';
import { favorites } from '@toolorbit/db';
import { eq, and } from 'drizzle-orm';

function getDb(env: Record<string, unknown>) {
  return drizzle(env.DB as D1Database);
}

function getEnv(locals: App.Locals) {
  return (locals.runtime as { env: Record<string, unknown> }).env;
}

export const GET: APIRoute = async ({ request, locals }) => {
  const env = getEnv(locals);
  const auth = createAuth(env.DB as D1Database);
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return new Response('Unauthorized', { status: 401 });

  const db = getDb(env);
  const rows = await db.select().from(favorites).where(eq(favorites.userId, session.user.id));
  return Response.json(rows.map((r) => r.toolSlug));
};

export const POST: APIRoute = async ({ request, locals }) => {
  const env = getEnv(locals);
  const auth = createAuth(env.DB as D1Database);
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return new Response('Unauthorized', { status: 401 });

  const { slug } = await request.json() as { slug: string };
  if (!slug) return new Response('Bad Request', { status: 400 });

  const db = getDb(env);
  await db.insert(favorites).values({ userId: session.user.id, toolSlug: slug }).onConflictDoNothing();
  return Response.json({ ok: true });
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  const env = getEnv(locals);
  const auth = createAuth(env.DB as D1Database);
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return new Response('Unauthorized', { status: 401 });

  const { slug } = await request.json() as { slug: string };
  if (!slug) return new Response('Bad Request', { status: 400 });

  const db = getDb(env);
  await db.delete(favorites).where(and(eq(favorites.userId, session.user.id), eq(favorites.toolSlug, slug)));
  return Response.json({ ok: true });
};
