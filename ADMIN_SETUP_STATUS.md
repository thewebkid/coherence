# Admin Panel Setup — Current State

## What Was Built

An admin panel at `/admin` (AdminPage.vue) for reviewing interpretive work submissions stored in Neon Postgres. Features: list view with status filters, detail pane, approve/decline/archive actions, admin notes.

## What's Working ✅

- **Local dev (`localhost:5777`)** — fully functional. Clerk auth, submission list, status updates all work.
- **Staging (`coherence-drab.vercel.app`)** — uses Clerk dev instance directly (no proxy). Admin at `coherence-drab.vercel.app/admin`.
- **Neon Postgres** — `interpretive_work_submissions` table exists, test submissions are visible.
- **Vercel API routes** (`api/admin/submissions.js`) — production serverless handlers are correct.
- **Vite dev middleware** (`vite.config.js`) — `/api/admin/submissions` GET and PATCH are handled inline.

## Architecture

Both local dev and the staging site use the same Clerk **development** instance (`causal-caribou-97`). No proxy needed — the Clerk FAPI at `causal-caribou-97.clerk.accounts.dev` has working TLS.

| Environment | URL | Clerk Instance | Clerk Keys | Proxy |
|---|---|---|---|---|
| Local dev | `localhost:5777` | Development (`causal-caribou-97`) | `pk_test_*` / `sk_test_*` from `.env.local` | Not needed |
| Staging (admin) | `coherence-drab.vercel.app` | Development (`causal-caribou-97`) | `pk_test_*` / `sk_test_*` in Vercel | Not needed |

Admin access: `https://coherence-drab.vercel.app/admin` — always use this URL.

### Vercel Environment Variables

| Name | Value | Scope |
|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_test_Y2F1c2FsLWNhcmlib3UtOTcuY2xlcmsuYWNjb3VudHMuZGV2JA` | Production, Preview, Development |
| `CLERK_SECRET_KEY` | `sk_test_*` | Production |

No `VITE_CLERK_PROXY_URL` — not needed with the dev instance.

## Key Files

| File | Purpose |
|---|---|
| `src/main.js` | Clerk Vue plugin init — conditionally passes `proxyUrl` if env var is set |
| `vercel.json` | Redirects + SPA catch-all |
| `api/_clerk-auth.js` | Backend auth helper — `verifyToken` + email allowlist |
| `api/admin/submissions.js` | Admin API — GET/PATCH submissions |
| `vite.config.js` | Dev server middleware for `/api/admin/submissions` |
| `src/pages/AdminPage.vue` | Admin panel UI |

## When Custom Domain Is Set Up

When `coherenceacrossscales.org` is pointed to Vercel nameservers, the public site will be served from that domain. The admin panel stays at `coherence-drab.vercel.app/admin` — no changes needed.

If admin on the custom domain is ever needed later, the production Clerk instance cert issue would need to be resolved first (see history below).

## Historical: Clerk Production Instance SSL Issue

The production Clerk instance for `coherenceacrossscales.org` had a Cloudflare SSL-for-SaaS cert that never propagated. TLS handshake failures (alert 40) were confirmed globally from Vercel serverless (iad1, lhr1) for both `clerk.coherenceacrossscales.org` and `frontend-api.clerk.services`. Multiple proxy approaches were attempted (Edge Middleware, Node.js serverless, raw TLS, region switching) — all blocked by the same infrastructure issue. The fix was to bypass it entirely by using the dev Clerk instance.
