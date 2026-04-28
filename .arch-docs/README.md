# Coherence Across Scales — Architecture Docs

Internal reference for the backend, infrastructure, and technical decisions behind this project.

For design decisions, tone, and visual principles, see [`/creative-brief.md`](/creative-brief.md) at the project root.

---

## Files in this folder

| File | What it covers |
|---|---|
| [build-and-deployment.md](./build-and-deployment.md) | Vite SSG, Vercel hosting, routing, redirects |
| [database.md](./database.md) | Neon Postgres — all tables and schemas |
| [api-endpoints.md](./api-endpoints.md) | Every API route, method, auth, and payload |
| [auth.md](./auth.md) | Clerk — admin-only setup, staging-only decision |
| [storage.md](./storage.md) | Vercel Blob — file uploads for field expressions |
| [redis.md](./redis.md) | Upstash Redis — geo signals for the globe |
| [email.md](./email.md) | Resend — admin notification emails |
| [design-principles.md](./design-principles.md) | Technical expression of the creative brief |

---

## Stack at a glance

```
Frontend    Vue 3 + Vite SSG → static HTML deployed to Vercel CDN
API         Vercel serverless functions (Node.js, ES modules) in /api
Database    Neon (serverless Postgres) via @neondatabase/serverless
Auth        Clerk (admin panel only, test instance, 2-person access)
File store  Vercel Blob (@vercel/blob)
Geo store   Upstash Redis (GEOADD/GEOPOS for globe signal map)
Email       Resend (transactional notifications)
```
