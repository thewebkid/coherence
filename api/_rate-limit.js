import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_KV_REST_API_URL,
  token: process.env.UPSTASH_KV_REST_API_TOKEN,
});

export const limiters = {
  observation: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '5 m'),
    prefix: 'rl:observation',
  }),
  signals: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(15, '5 m'),
    prefix: 'rl:signals',
  }),
  submitWork: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    prefix: 'rl:submit-work',
  }),
  fieldSubmission: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    prefix: 'rl:field-submission',
  }),
  instrument: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, '15 m'),
    prefix: 'rl:instrument',
  }),
};

/**
 * Check rate limit for an incoming request. Returns true if the request should
 * be blocked (already sent a 429 response), false if the request may proceed.
 */
export async function checkRateLimit(limiter, req, res) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0])?.trim() || '127.0.0.1';

  const { success, reset } = await limiter.limit(ip);

  if (!success) {
    const retryAfterSecs = Math.ceil((reset - Date.now()) / 1000);
    res.setHeader('Retry-After', String(retryAfterSecs));
    if (typeof res.status === 'function' && typeof res.json === 'function') {
      res.status(429).json({ error: 'Too many requests. Please try again later.' });
    } else {
      res.statusCode = 429;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Too many requests. Please try again later.' }));
    }
    return true;
  }

  return false;
}
