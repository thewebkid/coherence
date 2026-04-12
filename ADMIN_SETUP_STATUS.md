# Admin Panel Setup — Progress Summary

## What Was Built

An admin panel at `/admin` (AdminPage.vue) for reviewing interpretive work submissions stored in Neon Postgres. Features: list view with status filters, detail pane, approve/decline/archive actions, admin notes.

## What's Working ✅

- **Local dev (`localhost:5777`)** — fully functional. Clerk auth, submission list, status updates all work.
- **Neon Postgres** — `interpretive_work_submissions` table exists, test submissions are visible.
- **Vercel API routes** (`api/admin/submissions.js`) — production serverless handlers are correct.
- **Vite dev middleware** (`vite.config.js`) — `/api/admin/submissions` GET and PATCH are handled inline, bypassing the raw JS file serving bug that caused the original `SyntaxError: Unexpected token 'i', "import { n"`.

## Bugs Fixed Along the Way

| Bug | Fix |
|---|---|
| `SyntaxError: Unexpected token 'i', "import { n"` | Added `/api/admin/submissions` to Vite dev middleware — it was falling through to `next()` and Vite was serving the raw JS file |
| 403 Forbidden | `kid@thewebkid.com` was in the frontend allowlist but missing from `api/_clerk-auth.js` and `vite.config.js` backend allowlists |
| 401 Unauthorized | `verifyToken` is a **standalone export** from `@clerk/backend` v3, NOT a method on the `ClerkClient` object. `clerk.verifyToken()` was calling `undefined`. Fixed in both `vite.config.js` and `api/_clerk-auth.js` |
| Dev server Clerk init | Added `authorizedParties: ['http://localhost:5777']` to `verifyToken` call in dev middleware |
| Clerk SSL cert not propagating | `clerk.coherenceacrossscales.org` SSL for SaaS cert stuck on Cloudflare. Switched from Vercel rewrite → Vercel Edge Middleware proxying to `frontend-api.clerk.dev` with Clerk proxy headers |

## Staging (`coherence-drab.vercel.app`) — In Progress 🟡

### Architecture
The Clerk proxy uses a **Vercel Edge Middleware** (`middleware.js`) that intercepts `/__clerk/*` requests and forwards them to `https://frontend-api.clerk.dev/*` with the required Clerk proxy headers (`Clerk-Proxy-Url`, `Clerk-Secret-Key`, `X-Forwarded-For`). This completely bypasses the `clerk.coherenceacrossscales.org` SSL cert propagation issue.

### What's Been Set Up
- **Clerk production instance** created for `coherenceacrossscales.org` (instance ID: `ins_3CEyFOp8hdF65IQqgC9EhTaVGpZ`)
- **DNS**: `clerk.coherenceacrossscales.org` CNAME → `frontend-api.clerk.services` (verified in Clerk dashboard, SSL cert issued but slow to propagate)
- **Vercel env vars** set:
  - `VITE_CLERK_PUBLISHABLE_KEY` = `pk_live_*` (Production)
  - `VITE_CLERK_PUBLISHABLE_KEY` = `pk_test_*` (All Pre-Production Environments)
  - `CLERK_SECRET_KEY` = `sk_live_...` (Production + Preview)
  - `VITE_CLERK_PROXY_URL` = `https://coherence-drab.vercel.app/__clerk` (Production + Preview)
- **Vercel Edge Middleware** (`middleware.js`): proxies `/__clerk/*` → `https://frontend-api.clerk.dev/*` with required Clerk headers
- **Clerk dashboard** proxy URL: `https://coherence-drab.vercel.app/__clerk`
- **`src/main.js`** passes `proxyUrl` from `VITE_CLERK_PROXY_URL` env var when set

### Steps to Complete
1. ✅ Add `middleware.js` Edge Middleware to proxy `/__clerk/*` to `frontend-api.clerk.dev`
2. ✅ Remove old Vercel rewrite from `vercel.json`
3. Add `VITE_CLERK_PROXY_URL=https://coherence-drab.vercel.app/__clerk` to Vercel (Production + Preview)
4. Re-add proxy URL `https://coherence-drab.vercel.app/__clerk` in Clerk dashboard → Domains → Frontend API → Set proxy configuration
5. Push changes and redeploy

## Environment Architecture

| Environment | URL | Clerk Instance | Clerk Keys | Proxy |
|---|---|---|---|---|
| Local dev | `localhost:5777` | Development (`causal-caribou-97`) | `pk_test_*` from `.env.local` | Not needed |
| Staging | `coherence-drab.vercel.app` | Production (`coherenceacrossscales.org`) | `pk_live_*` in Vercel | `/__clerk` → Edge Middleware → `frontend-api.clerk.dev` |
| Production | `coherenceacrossscales.org` | Same production instance | Same `pk_live_*` | Same proxy (or direct once cert propagates) |

## Key File Changes Made

### `middleware.js` (NEW)
- Vercel Edge Middleware that proxies `/__clerk/*` to `https://frontend-api.clerk.dev/*`
- Adds required headers: `Clerk-Proxy-Url`, `Clerk-Secret-Key`, `X-Forwarded-For`
- Replaces the old Vercel rewrite which suffered from TLS handshake failures to `clerk.coherenceacrossscales.org`

### `vite.config.js`
- Added `import { createClerkClient, verifyToken as clerkVerifyToken } from '@clerk/backend'`
- Added `verifyAdminAuthDev()` helper using standalone `verifyToken` (not `clerk.verifyToken`)
- Added `/api/admin/submissions` GET + PATCH handlers in the middleware
- Allowed emails list includes `kid@thewebkid.com`

### `api/_clerk-auth.js`
- Fixed to use standalone `verifyToken` from `@clerk/backend`
- Added `kid@thewebkid.com` to `ALLOWED_EMAILS`

### `src/main.js`
- Clerk plugin now conditionally passes `proxyUrl` when `VITE_CLERK_PROXY_URL` is set

### `vercel.json`
- Removed `/__clerk/:path*` proxy rewrite (replaced by Edge Middleware)
- SPA catch-all negative lookahead excludes `api/` and `__clerk/`

## Clerk Dashboard DNS Status (Verified)

| Name | Value | Required For | Status |
|---|---|---|---|
| `clerk` | `frontend-api.clerk.services` | Clerk JS / SSL cert | DNS ✅, SSL issued ✅ (slow to propagate to all Cloudflare PoPs) |
| `accounts` | `accounts.clerk.services` | Account Portal | Not set |
| `clkmail` | `mail.gxzv7zsnl1fu.clerk.services` | Email sending | Not set |
| `clk._domainkey` | `dkim1.gxzv7zsnl1fu.clerk.services` | Email DKIM | Not set |
| `clk2._domainkey` | `dkim2.gxzv7zsnl1fu.clerk.services` | Email DKIM | Not set |

The proxy approach means the SSL cert propagation delay for `clerk.coherenceacrossscales.org` is no longer a blocker.
