import tls from 'node:tls';

const CLERK_FAPI_HOST = 'clerk.coherenceacrossscales.org';
const CLERK_FAPI_BACKEND = 'frontend-api.clerk.dev';
const SKIP_HEADERS = new Set([
  'host', 'origin', 'referer', 'connection', 'transfer-encoding',
  'accept-encoding',
]);

function rawHttpRequest(hostname, servername, method, path, headers, body) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(443, hostname, { servername }, () => {
      let raw = `${method} ${path} HTTP/1.1\r\n`;
      for (const [k, v] of Object.entries(headers)) {
        raw += `${k}: ${v}\r\n`;
      }
      if (body) raw += `Content-Length: ${Buffer.byteLength(body)}\r\n`;
      raw += `Connection: close\r\n\r\n`;
      if (body) raw += body;
      socket.write(raw);
    });

    let data = Buffer.alloc(0);
    socket.on('data', (chunk) => { data = Buffer.concat([data, chunk]); });
    socket.on('end', () => {
      const str = data.toString();
      const headerEnd = str.indexOf('\r\n\r\n');
      if (headerEnd === -1) return reject(new Error('Malformed HTTP response'));

      const headerBlock = str.slice(0, headerEnd);
      const bodyStr = str.slice(headerEnd + 4);
      const [statusLine, ...headerLines] = headerBlock.split('\r\n');
      const statusCode = parseInt(statusLine.split(' ')[1], 10);

      const respHeaders = {};
      for (const line of headerLines) {
        const idx = line.indexOf(':');
        if (idx > 0) {
          respHeaders[line.slice(0, idx).toLowerCase().trim()] = line.slice(idx + 1).trim();
        }
      }
      resolve({ statusCode, headers: respHeaders, body: bodyStr });
    });

    socket.setTimeout(8000);
    socket.on('timeout', () => { socket.destroy(); reject(new Error('timeout')); });
    socket.on('error', reject);
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
    return res.json({
      hasSecretKey: secretKey.length > 0,
      secretKeyPrefix: secretKey.substring(0, 10),
      proxyUrl,
      mode: 'raw-tls',
      target: CLERK_FAPI_BACKEND,
      hostHeader: CLERK_FAPI_HOST,
      nodeVersion: process.version,
    });
  }

  if (clerkPath === '/_test') {
    try {
      const t0 = Date.now();
      const result = await rawHttpRequest(
        CLERK_FAPI_BACKEND, CLERK_FAPI_BACKEND, 'GET', '/v1/environment',
        { 'Host': CLERK_FAPI_HOST, 'Clerk-Proxy-Url': proxyUrl, 'Clerk-Secret-Key': secretKey },
        null,
      );
      return res.json({ ok: true, ms: Date.now() - t0, status: result.statusCode, bodySnippet: result.body.slice(0, 500) });
    } catch (err) {
      return res.json({ ok: false, error: err.message });
    }
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

  let body = null;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = await new Promise((resolve) => {
      const chunks = [];
      req.on('data', (c) => chunks.push(c));
      req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    });
  }

  try {
    const upstream = await rawHttpRequest(
      CLERK_FAPI_BACKEND, CLERK_FAPI_BACKEND,
      req.method, fullPath, headers, body,
    );

    res.status(upstream.statusCode);
    for (const [key, value] of Object.entries(upstream.headers)) {
      if (key !== 'transfer-encoding' && key !== 'connection') {
        res.setHeader(key, value);
      }
    }
    res.end(upstream.body);
  } catch (err) {
    console.error('Clerk proxy error:', err);
    res.status(502).json({ error: 'Clerk proxy failed', details: err.message });
  }
}
