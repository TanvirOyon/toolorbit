/**
 * Thin wrapper around Cloudflare's native Rate Limiting binding.
 *
 * Why this approach instead of a KV/D1-based counter:
 *  - Zero extra reads/writes against your D1 free-tier quota (100k
 *    writes/day) - rate limiting happens entirely inside Cloudflare's edge,
 *    not your database.
 *  - Works on the Workers Free plan - it's a core primitive, not a paid
 *    add-on. The `namespace_id` values below are arbitrary small integers
 *    you choose yourself (they just need to be unique per binding in this
 *    Worker); they are NOT provisioned resources like D1/KV IDs.
 *  - No cold-start cost, no async setup - `env.X_RATE_LIMITER.limit()` is a
 *    single call.
 *
 * If a binding is somehow missing at runtime (e.g. local `astro dev`
 * without `wrangler dev`, where Cloudflare bindings aren't emulated), this
 * fails OPEN (allows the request) rather than crashing the whole route -
 * rate limiting degrading is much better than the site being unusable
 * locally. It will correctly fail CLOSED-on-limit once deployed, where the
 * binding is always present.
 */

export async function checkRateLimit(
  limiter: RateLimit | undefined,
  key: string,
): Promise<boolean> {
  if (!limiter) return true; // binding not available (e.g. plain `astro dev`) - don't block locally

  try {
    const { success } = await limiter.limit({ key });
    return success;
  } catch {
    // Never let a rate-limiter failure take down an otherwise-working route.
    return true;
  }
}

export function tooManyRequests(): Response {
  return Response.json(
    { error: 'Too many requests. Please slow down and try again shortly.' },
    { status: 429, headers: { 'Retry-After': '60' } },
  );
}

/** Best-effort client identifier for rate-limit keys. Cloudflare always sets this header at the edge. */
export function clientKey(request: Request): string {
  return request.headers.get('CF-Connecting-IP') ?? 'unknown';
}
