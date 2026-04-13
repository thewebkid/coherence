import https from 'node:https';

const CLERK_FAPI_HOST = 'clerk.coherenceacrossscales.org';
const SKIP_HEADERS = new Set([
  'host', 'origin', 'referer', 'connection', 'transfer-encoding',
]);

export default function handler(req, res) {
  const clerkPath = '/' + (req.query.__clerk_path || '');

  const url = new URL(req.url, `https://${req.headers.host}`);
  url.searchParams.delete('__clerk_path');
  const qs = url.searchParams.toString();
  const fullPath = qs ? `${clerkPath}?${qs}` : clerkPath;

  if (clerkPath === '/_debug') {
    const sk = process.env.CLERK_SECRET_KEY || '';
    return res.json({
      hasSecretKey: sk.length > 0,
      secretKeyPrefix: sk.substring(0, 10),
      proxyUrl: `https://${req.headers.host}/__clerk`,
      target: CLERK_FAPI_HOST,
      nodeVersion: process.version,
      region: process.env.VERCEL_REGION || 'unknown',
    });
  }

  const proxyUrl = `https://${req.headers.host}/__clerk`;
  const secretKey = process.env.CLERK_SECRET_KEY || '';
  const forwardedFor =
    req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || '127.0.0.1';

  const headers = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (!SKIP_HEADERS.has(key.toLowerCase())) {
      headers[key] = value;
    }
  }
  headers['Host'] = CLERK_FAPI_HOST;
  headers['Clerk-Proxy-Url'] = proxyUrl;
  headers['Clerk-Secret-Key'] = secretKey;
  headers['X-Forwarded-For'] = forwardedFor;

  const proxyReq = https.request(
    {
      hostname: CLERK_FAPI_HOST,
      servername: CLERK_FAPI_HOST,
      port: 443,
      path: fullPath,
      method: req.method,
      headers,
    },
    (proxyRes) => {
      res.status(proxyRes.statusCode);
      for (const [key, value] of Object.entries(proxyRes.headers)) {
        if (key.toLowerCase() !== 'transfer-encoding') {
          res.setHeader(key, value);
        }
      }
      proxyRes.pipe(res);
    },
  );

  proxyReq.setTimeout(8000);
  proxyReq.on('timeout', () => {
    proxyReq.destroy();
    res.status(504).json({ error: 'Clerk proxy timeout' });
  });

  proxyReq.on('error', (err) => {
    console.error('Clerk proxy error:', err);
    res.status(502).json({
      error: 'Clerk FAPI unreachable — SSL cert for clerk.coherenceacrossscales.org has not propagated',
      details: err.message,
    });
  });

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    req.pipe(proxyReq);
  } else {
    proxyReq.end();
  }
}
