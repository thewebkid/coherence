# Redis — Upstash (Geo Signal Map)

## Purpose

Upstash Redis stores the geographic coordinates of visitor "signals" — the points displayed on the 3D globe on the Observatory page. It is the only part of the stack that uses Redis; everything else uses Postgres.

Redis was chosen over Postgres here because:
- Upstash's `GEOADD`/`GEOPOS` commands make geo storage and retrieval trivial
- Reads are very fast and the data is ephemeral by nature (signal positions don't need durability guarantees)
- It separates the transient map state from the structured relational data

## Provider

**Upstash** — HTTP-based Redis (works in serverless/edge without a persistent connection)

**Environment variables:**
```
UPSTASH_KV_REST_API_URL
UPSTASH_KV_REST_API_TOKEN
UPSTASH_KV_REST_API_READ_ONLY_TOKEN   (not currently used in code)
UPSTASH_KV_URL                        (not currently used in code)
UPSTASH_REDIS_URL                     (not currently used in code)
```

Only `UPSTASH_KV_REST_API_URL` and `UPSTASH_KV_REST_API_TOKEN` are used in `api/signals.js`. The others are present in `.env.local` from the Vercel integration but unused.

## Data model

All signals live under a single Redis key: `signals` (a geospatial sorted set).

| Operation | Redis command | Description |
|---|---|---|
| Read all points | `ZRANGE signals 0 -1` then `GEOPOS signals ...members` | Get all member IDs, then batch fetch coordinates |
| Write a point | `GEOADD signals lng lat uuid` | Add or update a coordinate by UUID |

Each signal is identified by a UUID. If a visitor submits again with their stored UUID, their position is updated in place rather than creating a duplicate.

## Coordinate fuzzing

Submitted coordinates are **fuzzing before storage** in the dev middleware (vite.config.js). In production (`api/signals.js`), raw coordinates are stored without fuzzing — the fuzzing logic was present in the dev middleware only. If privacy fuzzing is needed in production this should be added to `api/signals.js`.

## API

See [api-endpoints.md](./api-endpoints.md) for `GET /api/signals` and `POST /api/signals`.

The endpoints allow public read and public write — there is no auth on the signal map. UUID persistence is managed client-side (stored in `localStorage`).
