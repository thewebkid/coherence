# Build & Deployment

## Framework

**Vite + vite-ssg** — the frontend is a Vue 3 SPA that is pre-rendered at build time into static HTML via `vite-ssg`. This gives us fast first-paint and SEO-friendly markup without needing a Node.js server at runtime.

```
npm run build   →   vite-ssg build   →   /dist (static HTML + assets)
npm run dev     →   vite dev server (port 5777) with API middleware
```

## Static Site Generation (SSG)

`vite.config.js` includes an `ssgOptions` block that controls which routes are pre-rendered:

```js
ssgOptions: {
  script: 'async',
  formatting: 'minify',
  includedRoutes: async (paths, routes) => {
    // Dynamically include interpretive work slug pages
    const { works } = await import('./src/content/interpretive-works/index.js');
    const workPaths = works.map((w) => `/interpretive-works/${w.slug}`);
    return [
      ...paths.filter((p) => !p.startsWith('/admin') && !p.includes(':slug')),
      ...workPaths,
    ];
  },
}
```

Admin pages are intentionally excluded from SSG — they are client-rendered only.

## Vercel Deployment

Configured in `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

**Rewrites:** All non-API paths are rewritten to `/index.html` so Vue Router handles client-side navigation after the initial HTML loads:

```json
{ "source": "/((?!api/).*)", "destination": "/index.html" }
```

**Redirects:** Legacy and renamed routes are permanently redirected:

| From | To |
|---|---|
| `/signal` | `/observatory` |
| `/signal/map` | `/observatory` |
| `/orientation` | `/about` |
| `/practice/projects/behavioral-ecology` | `/practice/projects/relational-field` |
| `/practice/projects/conversational-recursion` | `/practice/projects/dialogue` |
| `/practice/embodied-transcendence` | `/practice/projects/presence` |

## API Functions

Vercel automatically treats any file in `/api/*.js` as a serverless function. The dev server (vite.config.js `configureServer` middleware) mirrors this behaviour locally, handling the same routes inline without requiring a separate process.

## Environment

Local development uses `.env.local`. Variables are pulled from Vercel with:

```
vercel env pull .env.local --yes
```

> **Note:** After a pull, manually verify that `CLERK_SECRET_KEY` and `RESEND_API_KEY` are present — these are not set as Development env vars in Vercel and will be stripped by the pull. See [auth.md](./auth.md) for why.
