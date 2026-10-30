## Context

The production app implements CAS322 with Postgres-backed observations using **`signal`** (single token or short phrase) and **`reflection`** (140 characters), plus optional fields. The stakeholder PDF describes a **`word`**-centric model with optional context and weekly grouping. The UI today uses `SignalWordCloud.vue`: flex-wrap tags sized by frequency from `/api/observations?project=…`, with no click behavior. **ObservatoryPage.vue** renders six units, each with `SignalWordCloud` + `SignalFeed`.

Stakeholder sources: PDF *Development Brief and Notes for Ron (draft 2)* (Observatory section); wireframe showing an Observational Unit with **Word Cloud | Rolling Feed** side-by-side under project title and a one-line descriptor (e.g. tone line).

## Goals / Non-Goals

**Goals:**

- Implement a **Word Field** that meets organic layout and interaction requirements in `specs/observatory-word-field/spec.md`.
- Provide **API support** for word frequency (existing), **drill-down fragments**, and **co-occurrence** derived from stored observations without exposing PII.
- Match **wireframe pairing** (two-column unit interior on wide screens).
- Keep **behavioral constraints**: no dashboards, no relationship labels, no graph edges.

**Non-Goals:**

- Full **weekly archive UI** and time-travel navigation (PDF mentions week as primary; defer explicit archive UX unless scoped later).
- Replacing **Weekly Signal** editorial process (remains static/module-driven).
- **Phase 2** Observer Network changes beyond what already exists.
- Schema rename from `signal` to `word` **unless** a small migration is justified for clarity—prefer mapping in API layer first.

## Decisions

### 1. Map PDF “word” to existing `signal` field

**Decision:** Treat **`signal`** as the Word Field token for frequency and drill-down; use **`reflection`** as the primary source of “fragments” when returning 3–7 snippets for a selected word (substring or match on submissions containing that signal).

**Alternatives:** New `word` column mirroring signal—rejected for duplicate data; full migration renaming column—deferred to reduce scope.

### 2. Co-occurrence definition (computable from current rows)

**Decision:** Define co-occurrence for a selected `(project, signal)` as other **`signal`** values appearing in the **same project** within a **rolling window** (e.g. last N submissions or last 7 days). Return 3–5 distinct co-occurring signals by simple count, unlabeled.

**Alternatives:** Pairwise graph in DB—overkill for Phase 1; same-observation-row only—too sparse if one signal per row.

### 3. Word Field layout implementation

**Decision:** Prefer a **small, maintained layout library** (e.g. wordcloud2 / d3-cloud, or similar) producing positions in a bounded box, rendered with **SVG or absolutely positioned HTML** for accessibility and SEO. Avoid canvas-only if it hurts accessibility unless a fallback list exists.

**Alternatives:** Pure CSS random—hard to meet “organic” repeatably; manual positions—fragile.

### 4. Interaction surface for drill-down

**Decision:** **Modal, slide-over, or inline expansion** below the Word Field within the unit card—must not navigate away from Observatory. Dismiss clears selection. No new route required for v1.

### 5. Practice pages

**Decision:** Reuse the same **Word Field** component on Practice project pages **if** it keeps parity with Observatory; otherwise ship Observatory first and align Practice in a follow-up task to avoid scope creep.

### 6. API shape (illustrative)

**Decision:** Extend read API with something like:

- `GET /api/observations?project=…` — unchanged aggregate frequencies for cloud bootstrap.
- `GET /api/observations/word-detail?project=…&word=…` — returns `{ fragments: string[], coOccurring: { word: string }[] }` with caps and safe limits.

Exact paths and query names to match existing `api/` conventions.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Sparse data → empty co-occurrence | Return fewer items; graceful empty state; do not fabricate |
| Performance on large tables | Index by `project` + time; cap queries; cache aggregates if needed |
| “Organic” layout jitter on reload | Seed random layout or stable sort for positions |
| Reflection text may exceed “fragment” feel | Truncate server-side with ellipsis for drill-down list |
| PDF’s weekly grouping vs shipped schema | Document deferral; optional `created_at` week filter in API later |

## Migration Plan

1. Ship API extensions backward-compatible with existing clients.
2. Deploy frontend Word Field + layout; verify old browsers for SVG/CSS.
3. Rollback: feature-flag Word Field component or revert to previous cloud component if critical issues.

## Open Questions

- Should **Weekly Signal** body adopt the PDF’s “drift · clarity · tension” **word-chip** style explicitly (editorial/CSS only)?
- Minimum **observation count** before Word Field shows vs placeholder?
- Legal/privacy review on showing **reflection** fragments in drill-down (confirm anonymization rules with stakeholder).
