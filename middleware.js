const CLERK_PROXY_PATH = '/__clerk';
const CLERK_FAPI_ORIGIN = 'https://frontend-api.clerk.dev';

export default function middleware(request) {
  const url = new URL(request.url);

  if (!url.pathname.startsWith(CLERK_PROXY_PATH)) {
    return;
  }

  const targetPath = url.pathname.slice(CLERK_PROXY_PATH.length) || '/';
  const targetUrl = new URL(targetPath + url.search, CLERK_FAPI_ORIGIN);

  const headers = new Headers(request.headers);
  headers.set('Clerk-Proxy-Url', `${url.origin}${CLERK_PROXY_PATH}`);
  headers.set('Clerk-Secret-Key', process.env.CLERK_SECRET_KEY || '');
  headers.set('X-Forwarded-For', request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for') || '');
  headers.delete('host');

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
