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

## Staging (`coherence-drab.vercel.app`) — Blocked 🔴

### Root Cause (current)
Clerk's SSL certificate for `clerk.coherenceacrossscales.org` has not been provisioned yet.

- DNS CNAME added and propagated ✅ (`clerk.coherenceacrossscales.org` → `frontend-api.clerk.services` → Cloudflare — confirmed via nslookup)
- Clerk proxy URL configured and **Verified** in Clerk dashboard ✅
- `VITE_CLERK_PROXY_URL` scoped to Production + Preview in Vercel ✅
- Vercel rewrite `/__clerk/:path*` → `https://clerk.coherenceacrossscales.org/:path*` is correct ✅
- Vercel returns `502 ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR` (TLS handshake fails) ❌

Clerk must issue a Cloudflare SSL for SaaS certificate for `clerk.coherenceacrossscales.org`. This is automatic but takes 15–60 minutes after DNS detection. "Verify configuration" was clicked in the Clerk dashboard to trigger this.

**No code changes needed.** Monitor by hitting this URL directly — once it returns JSON instead of timing out, it's working:
```
https://clerk.coherenceacrossscales.org/v1/environment
```

If not resolved in ~2 hours, re-click "Verify configuration" in the Clerk dashboard or contact Clerk support.

### What's Been Set Up
- **Clerk production instance** created for `coherenceacrossscales.org` (instance ID: `ins_3CEyFOp8hdF65IQqgC9EhTaVGpZ`)
- **Vercel env vars** set:
  - `VITE_CLERK_PUBLISHABLE_KEY` = `pk_live_Y2xlcmsuY29oZXJlbmNlYWNyb3Nzc2NhbGVzLm9yZyQ` (Production)
  - `VITE_CLERK_PUBLISHABLE_KEY` = `pk_test_*` (All Pre-Production Environments)
  - `CLERK_SECRET_KEY` = `sk_live_...` (Production + Preview)
  - `VITE_CLERK_PROXY_URL` = `https://coherence-drab.vercel.app/__clerk` (Production + Preview) ✅
- **Vercel rewrite** in `vercel.json`: `/__clerk/:path*` → `https://clerk.coherenceacrossscales.org/:path*`
- **Clerk dashboard** proxy URL set to `https://coherence-drab.vercel.app/__clerk` — **Verified** ✅
- **`src/main.js`** passes `proxyUrl` from `VITE_CLERK_PROXY_URL` env var when set

## Environment Architecture

| Environment | URL | Clerk Instance | Clerk Keys | Proxy |
|---|---|---|---|---|
| Local dev | `localhost:5777` | Development (`causal-caribou-97`) | `pk_test_*` from `.env.local` | Not needed |
| Staging | `coherence-drab.vercel.app` | Production (`coherenceacrossscales.org`) | `pk_live_*` in Vercel | `/__clerk` proxy (needs CNAME) |
| Production | `coherenceacrossscales.org` | Same production instance | Same `pk_live_*` | Direct (once DNS is fully live) |

## Key File Changes Made

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
- Added `/__clerk/:path*` proxy rewrite (before SPA catch-all)
- Updated SPA catch-all negative lookahead to also exclude `__clerk`

## Clerk Dashboard DNS Status (0/3 verified by Clerk — DNS propagated externally)

Required DNS records for `coherenceacrossscales.org` (all are CNAMEs):

| Name | Value | Required For | Status |
|---|---|---|---|
| `clerk` | `frontend-api.clerk.services` | Clerk JS / SSL cert | DNS ✅, SSL pending ⏳ |
| `accounts` | `accounts.clerk.services` | Account Portal | Not set |
| `clkmail` | `mail.gxzv7zsnl1fu.clerk.services` | Email sending | Not set |
| `clk._domainkey` | `dkim1.gxzv7zsnl1fu.clerk.services` | Email DKIM | Not set |
| `clk2._domainkey` | `dkim2.gxzv7zsnl1fu.clerk.services` | Email DKIM | Not set |

Only `clerk` (first row) is needed to unblock staging. DNS propagated; waiting on Clerk's SSL cert provisioning.
