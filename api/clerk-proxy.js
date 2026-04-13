import https from 'node:https';
import tls from 'node:tls';

const CLERK_FAPI_HOST = 'clerk.coherenceacrossscales.org';
const SKIP_HEADERS = new Set([
  'host', 'origin', 'referer', 'connection', 'transfer-encoding',
]);

const BACKENDS = [
  { hostname: 'clerk.coherenceacrossscales.org', label: 'custom-hostname' },
  { hostname: 'frontend-api.clerk.dev', label: 'clerk-dev' },
  { hostname: 'frontend-api.clerk.services', label: 'clerk-services' },
];

async function testTls(hostname) {
  return new Promise((resolve) => {
    const sock = tls.connect(443, hostname, { servername: hostname }, () => {
      const cert = sock.getPeerCertificate();
      sock.destroy();
      resolve({
        hostname,
        ok: true,
        subject: cert.subject?.CN,
        issuer: cert.issuer?.O,
        validTo: cert.valid_to,
      });
    });
    sock.setTimeout(5000);
    sock.on('timeout', () => { sock.destroy(); resolve({ hostname, ok: false, error: 'timeout' }); });
    sock.on('error', (e) => resolve({ hostname, ok: false, error: e.message }));
  });
}

async function testFetch(hostname, secretKey, proxyUrl) {
  return new Promise((resolve) => {
    const r = https.request({
      hostname,
      port: 443,
      path: '/v1/environment',
      method: 'GET',
      headers: {
        'Host': CLERK_FAPI_HOST,
        'Clerk-Proxy-Url': proxyUrl,
        'Clerk-Secret-Key': secretKey,
      },
    }, (resp) => {
      let body = '';
      resp.on('data', (c) => { body += c; });
      resp.on('end', () => resolve({ hostname, status: resp.statusCode, bodySnippet: body.slice(0, 200) }));
    });
    r.setTimeout(5000);
    r.on('timeout', () => { r.destroy(); resolve({ hostname, error: 'timeout' }); });
    r.on('error', (e) => resolve({ hostname, error: e.message }));
    r.end();
  });
}

export default async function handler(req, res) {
  const clerkPath = '/' + (req.query.__clerk_path || '');
  const url = new URL(req.url, `https://${req.headers.host}`);
  url.searchParams.delete('__clerk_path');
  const qs = url.searchParams.toString();
  const fullPath = qs ? `${clerkPath}?${qs}` : clerkPath;

  const proxyUrl = `https://${req.headers.host}/__clerk`;
  const secretKey = process.env.CLERK_SECRET_KEY || '';

  if (clerkPath === '/_debug') {
    const [tlsResults, fetchResults] = await Promise.all([
      Promise.all(BACKENDS.map((b) => testTls(b.hostname))),
      Promise.all(BACKENDS.map((b) => testFetch(b.hostname, secretKey, proxyUrl))),
    ]);
    return res.json({ tls: tlsResults, fetch: fetchResults, proxyUrl, nodeVersion: process.version });
  }

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

  // Try each backend in order until one succeeds
  for (const backend of BACKENDS) {
    try {
      await new Promise((resolve, reject) => {
        const proxyReq = https.request(
          {
            hostname: backend.hostname,
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
            resolve();
          },
        );
        proxyReq.setTimeout(5000);
        proxyReq.on('timeout', () => { proxyReq.destroy(); reject(new Error('timeout')); });
        proxyReq.on('error', reject);

        if (req.method !== 'GET' && req.method !== 'HEAD') {
          req.pipe(proxyReq);
        } else {
          proxyReq.end();
        }
      });
      return; // success, done
    } catch {
      continue; // try next backend
    }
  }

  res.status(502).json({ error: 'All Clerk FAPI backends failed' });
}
