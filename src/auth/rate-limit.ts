type Bucket = { count: number; resetAt: number };

// In-memory sliding-window limiter. Resets on server restart and is
// per-instance only — adequate as a brute-force speed bump, not a
// substitute for an edge/WAF rate limit in multi-instance deployments.
const buckets = new Map<string, Bucket>();

/**
 * Returns true if the action is allowed, false if the caller has exceeded
 * `limit` attempts within `windowMs`.
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) return false;

  bucket.count += 1;
  return true;
}
