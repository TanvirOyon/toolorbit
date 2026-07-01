/**
 * POST /api/usage - records a tool use in the usage_history table.
 * Called by ToolShell on mount (fire-and-forget, fails silently if not
 * logged in - anonymous usage is simply not tracked).
 *
 * The table is capped at 50 rows per user by deleting the oldest row
 * before inserting when at the limit.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { createAuth } from '../../lib/auth';
import { drizzle } from 'drizzle-orm/d1';
import { usageHistory } from '@toolorbit/db';
import { eq, asc, count } from 'drizzle-orm';

export const POST: APIRoute = async ({ request }) => {
  const auth = createAuth(env);
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return new Response(null, { status: 401 });

  const body = (await request.json()) as { slug?: string };
  const slug = body?.slug;
  if (!slug || typeof slug !== 'string') return new Response('Bad Request', { status: 400 });

  const db = drizzle(env.DB);

  const [{ total }] = await db
    .select({ total: count() })
    .from(usageHistory)
    .where(eq(usageHistory.userId, session.user.id));

  if (total >= 50) {
    const [oldest] = await db
      .select({ id: usageHistory.id })
      .from(usageHistory)
      .where(eq(usageHistory.userId, session.user.id))
      .orderBy(asc(usageHistory.usedAt))
      .limit(1);
    if (oldest) {
      await db.delete(usageHistory).where(eq(usageHistory.id, oldest.id));
    }
  }

  await db.insert(usageHistory).values({
    userId:   session.user.id,
    toolSlug: slug,
  });

  return Response.json({ ok: true });
};
