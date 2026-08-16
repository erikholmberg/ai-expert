import type { NextRequest } from "next/server";

/**
 * In-memory sliding-window rate limiter. Scoped to a single serverless
 * instance — good enough to blunt casual abuse of the AI-generation routes,
 * not a hard global cap (counts reset on cold start / differ across
 * concurrently warm instances).
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const MAX_TRACKED_KEYS = 5000;

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();

  if (buckets.size > MAX_TRACKED_KEYS) {
    for (const [k, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/** Rate-limit key: signed-in users get their own bucket, guests share by IP. */
export function rateLimitKeyFor(
  req: NextRequest,
  userId: string | undefined
): { key: string; limit: number } {
  if (userId) {
    return { key: `user:${userId}`, limit: 60 };
  }
  return { key: `ip:${getClientIp(req)}`, limit: 15 };
}
