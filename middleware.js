const CLERK_PROXY_PATH = '/__clerk';
const CLERK_FAPI_ORIGIN = 'https://frontend-api.clerk.dev';

export default function middleware(request) {
  const url = new URL(request.url);

  if (!url.pathname.startsWith(CLERK_PROXY_PATH)) {
    return;
  }

  const targetPath = url.pathname.slice(CLERK_PROXY_PATH.length) || '/';
  const targetUrl = new URL(targetPath + url.search, CLERK_FAPI_ORIGIN);

  const proxyUrl = `${url.origin}${CLERK_PROXY_PATH}`;
  const secretKey = process.env.CLERK_SECRET_KEY || '';
  const forwardedFor = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for') || '127.0.0.1';

  const headers = new Headers(request.headers);
  headers.set('Clerk-Proxy-Url', proxyUrl);
  headers.set('Clerk-Secret-Key', secretKey);
  headers.set('X-Forwarded-For', forwardedFor);
  headers.set('Origin', url.origin);
  headers.set('Host', new URL(CLERK_FAPI_ORIGIN).host);

  return fetch(targetUrl.toString(), {
    method: request.method,
    headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    redirect: 'manual',
  });
}

export const config = {
  matcher: ['/__clerk/:path*'],
};
