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
import { checkRateLimit, tooManyRequests } from '../../lib/rate-limit';

export const POST: APIRoute = async ({ request }) => {
  const auth = createAuth(env);
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return new Response(null, { status: 401 });

  // This fires on every tool page load for logged-in users - it's the
  // highest-frequency write endpoint in the app, so it gets its own guard
  // against a runaway client (buggy retry loop, malicious script) burning
  // through the D1 free tier's 100k writes/day.
  const allowed = await checkRateLimit(env.API_RATE_LIMITER, session.user.id);
  if (!allowed) return tooManyRequests();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const slug = (body as { slug?: unknown })?.slug;
  if (!slug || typeof slug !== 'string') {
    return Response.json({ error: '`slug` is required' }, { status: 400 });
  }

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
