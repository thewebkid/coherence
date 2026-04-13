# Admin Panel Setup — Progress Summary

## What Was Built

An admin panel at `/admin` (AdminPage.vue) for reviewing interpretive work submissions stored in Neon Postgres. Features: list view with status filters, detail pane, approve/decline/archive actions, admin notes.

## What's Working ✅

- **Local dev (`localhost:5777`)** — fully functional. Clerk auth, submission list, status updates all work.
- **Neon Postgres** — `interpretive_work_submissions` table exists, test submissions are visible.
- **Vercel API routes** (`api/admin/submissions.js`) — production serverless handlers are correct.
- **Vite dev middleware** (`vite.config.js`) — `/api/admin/submissions` GET and PATCH are handled inline.

## Staging (`coherence-drab.vercel.app`) — Blocked 🔴

### The Problem

Clerk JS needs to reach the Clerk Frontend API. In production, the SDK derives the URL `clerk.coherenceacrossscales.org` from the publishable key. That hostname has a valid DNS CNAME and Clerk says "SSL certificates issued," but **the Cloudflare SSL-for-SaaS cert has not propagated to all edge PoPs** — Vercel's `sfo1` edge still gets TLS handshake failures.

### What's Been Tried (and what we learned)

| Approach | Result | Why |
|---|---|---|
| Direct CNAME (`clerk.coherenceacrossscales.org`) | `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` | Cloudflare SSL-for-SaaS cert not propagated to browser's / Vercel's PoP |
| Vercel rewrite to `clerk.coherenceacrossscales.org` | `502 ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR` | Same TLS issue from Vercel's edge |
| Edge Middleware → `frontend-api.clerk.dev` | `host_invalid` — "unable to attribute to instance" | TLS works, but `Host` is a **forbidden header** in Fetch API — can't be overridden. Clerk Worker sees `Host: frontend-api.clerk.dev` which doesn't map to any instance |
| Edge Middleware → `clerk.coherenceacrossscales.org` | `500 MIDDLEWARE_INVOCATION_FAILED` | Same TLS propagation issue, now from Edge Runtime |

### Root Cause

Clerk uses **Cloudflare SSL for SaaS** (custom hostnames on Workers). The cert for `clerk.coherenceacrossscales.org` was issued (dashboard confirms) but hasn't propagated to all Cloudflare edge PoPs. This can take up to 24 hours per Cloudflare docs. From some external servers the cert works (WebFetch got 500 responses = TLS succeeded), but from Vercel `sfo1` and local WSL it still fails TLS.

### The Fundamental Constraint

Clerk's FAPI Worker routes by `Host` header. To proxy correctly, we need EITHER:
1. **TLS to work on `clerk.coherenceacrossscales.org`** — so `fetch()` sends the correct Host automatically
2. **A way to set the `Host` header** — which the Fetch API forbids

### Diagnostic Results (Apr 2026 — Serverless Function approach)

Replaced Edge Middleware with Node.js serverless function (`api/clerk-proxy.js`) + Vercel rewrite. Ran TLS diagnostics from multiple Vercel regions:

| Backend hostname | TLS | HTTP (with Host: clerk.coherenceacrossscales.org) | Region |
|---|---|---|---|
| `clerk.coherenceacrossscales.org` | FAIL (alert 40 handshake_failure) | N/A | iad1, lhr1 |
| `frontend-api.clerk.services` | FAIL (alert 40 handshake_failure) | N/A | iad1, lhr1 |
| `frontend-api.clerk.dev` | OK (cert: Google Trust Services) | 403 Cloudflare (wrong zone) | iad1, lhr1 |
| `frontend-api.clerk.dev` | OK | 400 `host_invalid` (with Host: frontend-api.clerk.dev) | iad1 |

**Key finding**: The TLS failure is **global**, not region-specific. Even `frontend-api.clerk.services` (Clerk's own CNAME target) fails TLS. This is a Clerk/Cloudflare infrastructure issue, not just cert propagation delay.

**Approaches exhausted**:
- Edge Middleware → can't set `Host` header (Fetch API forbids it)
- Node.js serverless → TLS handshake fails to all Clerk FAPI domains
- Raw `tls.connect` → confirms `frontend-api.clerk.dev` TLS works, but Cloudflare 403s when Host mismatches zone
- Region switching (iad1 → lhr1) → same TLS failures everywhere
- Setting `Clerk-Proxy-Url`/`Clerk-Secret-Key` headers → Clerk `host_invalid` (can't route by proxy header alone)

### Immediate Fix — Use Development Clerk Instance on Staging

Change Vercel env vars for Production to temporarily use the dev Clerk instance:

| Variable | Current (broken) | Temporary fix |
|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_live_Y2xlcmsu...` | `pk_test_Y2F1c2FsLWNhcmlib3UtOTcuY2xlcmsuYWNjb3VudHMuZGV2JA` |
| `CLERK_SECRET_KEY` | `sk_live_tK...` | `sk_test_u57KKvDRTXmfBcZgZur4vx1fMDYzSajb63KcCn0VRX` |
| `VITE_CLERK_PROXY_URL` | `https://coherence-drab.vercel.app/__clerk` | **Remove entirely** |

This bypasses the broken SSL by using the dev instance FAPI (`causal-caribou-97.clerk.accounts.dev`) which has working TLS. Trade-off: staging uses a different user pool than eventual production.

### Permanent Fix — Contact Clerk Support

- Instance ID: `ins_3CEyFOp8hdF65IQqgC9EhTaVGpZ`
- App ID: `app_3CCURqtnqgPjwplV84EqGzlU6mY`
- Issue: SSL cert shows "issued" in dashboard but `clerk.coherenceacrossscales.org` AND `frontend-api.clerk.services` fail TLS globally (alert 40) from Vercel serverless (Node v24, multiple regions). Failure persists for days, not hours.
- Alternative: Remove and re-add the custom domain in Clerk Dashboard to force a fresh cert issuance

### Current State of Code

**`api/clerk-proxy.js`** — Vercel Serverless Function (Node.js)
- Proxies `/__clerk/*` to `clerk.coherenceacrossscales.org` using `https.request`
- Can set `Host` header (unlike Edge Middleware's Fetch API)
- Currently fails due to SSL cert not propagating on Clerk's Cloudflare infrastructure
- Ready to work once cert issue is resolved

**`vercel.json`** — Rewrites `/__clerk/:path*` to `api/clerk-proxy` serverless function

**`src/main.js`** — Passes `proxyUrl` from `VITE_CLERK_PROXY_URL` env var to Clerk plugin

### Vercel Environment Variables

| Name | Value | Scope |
|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_live_Y2xlcmsuY29oZXJlbmNlYWNyb3Nzc2NhbGVzLm9yZyQ` | Production |
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_test_*` | All Pre-Production |
| `CLERK_SECRET_KEY` | `sk_live_tK...` | Production + Preview |
| `VITE_CLERK_PROXY_URL` | `https://coherence-drab.vercel.app/__clerk` | Production + Preview |

### Clerk Dashboard State

- **Domain**: `coherenceacrossscales.org`
- **Frontend API CNAME**: `clerk.coherenceacrossscales.org` → `frontend-api.clerk.services` — **Verified** ✅
- **Proxy configuration**: `https://coherence-drab.vercel.app/__clerk` — **Verified** ✅
- **SSL certificates**: **Issued** ✅ (but not propagated to all Cloudflare PoPs)
- **Account portal / Email DNS**: Not set (not blocking)

## Environment Architecture

| Environment | URL | Clerk Instance | Clerk Keys | Proxy |
|---|---|---|---|---|
| Local dev | `localhost:5777` | Development (`causal-caribou-97`) | `pk_test_*` / `sk_test_*` from `.env.local` | Not needed |
| Staging | `coherence-drab.vercel.app` | Production (`coherenceacrossscales.org`) | `pk_live_*` / `sk_live_*` in Vercel | `/__clerk` Edge Middleware |
| Production | `coherenceacrossscales.org` | Same production instance | Same keys | Same proxy (or direct once cert propagates) |

## Key Files

| File | Purpose |
|---|---|
| `api/clerk-proxy.js` | Vercel Serverless Function — proxies `/__clerk/*` to Clerk FAPI |
| `src/main.js` | Clerk Vue plugin init — conditionally passes `proxyUrl` |
| `vercel.json` | Redirects + SPA catch-all (no `/__clerk` rewrite) |
| `api/_clerk-auth.js` | Backend auth helper — `verifyToken` + email allowlist |
| `api/admin/submissions.js` | Admin API — GET/PATCH submissions |
| `vite.config.js` | Dev server middleware for `/api/admin/submissions` |
| `src/pages/AdminPage.vue` | Admin panel UI |

## Bugs Fixed Along the Way

| Bug | Fix |
|---|---|
| `SyntaxError: Unexpected token 'i'` | Added `/api/admin/submissions` to Vite dev middleware |
| 403 Forbidden | Added `kid@thewebkid.com` to backend allowlists |
| 401 Unauthorized | Use standalone `verifyToken` from `@clerk/backend` v3 |
| Dev server Clerk init | Added `authorizedParties: ['http://localhost:5777']` |
| Clerk SSL not propagating | Switched from Vercel rewrite to Edge Middleware (ongoing) |
| `host_invalid` on proxy | `Host` is forbidden in Fetch API — can't override it in Edge Runtime |
