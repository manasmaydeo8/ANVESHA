# ANVESHA — Improvement Plan

This document tracks the improvements identified for the project, what each one
buys you, and roughly how big a lift it is. Items are grouped by priority. The
two items in **Priority 0** are the ones most likely to change how the project
feels to a visitor; everything else compounds on top of them.

Status key: ✅ done · 🔜 proposed (not yet built)

---

## Priority 0 — Highest impact, do these first

### 1. Syntax highlighting + Markdown rendering 🔜

**Problem today:** `DarkCodeBlock` renders `hello_world` snippets as plain,
unstyled `<pre><code>` text — no colors, no language-aware tokenization. The
`overview` and guideline `body` fields are plain strings rendered as-is, so
authors can't bold a term, link a reference, or format a code span inline.

**Why it matters:** this is a *code-focused* field guide. Unstyled code is the
single biggest gap between how the content reads today and how a polished
documentation site reads.

**Proposed approach:**
- Add a lightweight highlighter to `DarkCodeBlock` (Shiki or `react-syntax-highlighter`/Prism — Shiki gives VS Code-quality themes and ships language grammars for every seeded language).
- Render `overview`, `tagline`, and guideline `body`/`when_to_use`/`avoid` through a constrained Markdown renderer (`react-markdown` with a minimal allow-list: bold/italic, inline code, links, lists — no raw HTML) so community authors can format their entries without opening an XSS hole.
- Sanitize on render regardless of renderer choice, since this content comes from other users.

**Size:** small–medium. Self-contained to `DarkCodeBlock` plus the few places `overview`/`body` are rendered (`LanguageDetailPage`, `NumberedEntry`).

---

### 2. Language comparison tool 🔜

**Problem today:** there's no way to view two or more specimens side by side.
Every "wiki" does single-page browsing; a *field guide* comparing specimens is
the more distinctive, on-theme feature.

**Why it matters:** it's the kind of feature that makes the project memorable
instead of reading as another CRUD catalog, and the data model already has
everything needed (`typing`, `execution`, `paradigms`, `year`, `hello_world`)
— no new fields required.

**Proposed approach:**
- New route, e.g. `/compare?slugs=python,rust`.
- A picker (reuse `SpecimenRow`/`SyntaxChip` styling) to select 2–3 languages from `/api/languages`.
- A comparison table: year, designer, typing, execution model, paradigms, facts/guidelines count, and the `hello_world` snippets stacked or side-by-side (benefits directly from item #1's syntax highlighting).
- Entry points: a "Compare" button on `LanguageDetailPage`'s right rail, and a persistent-selection checkbox on `SpecimenRow` in the catalog.

**Size:** medium. New page + new small picker component; no API shape changes needed since `/api/languages/:slug` already returns everything required — comparison is a client-side composition of existing data.

---

## Priority 1 — Foundational, unlocks everything else

### 3. Real backend + database 🔜

**Problem today:** `frontend/src/lib/api.js` simulates a REST API against a
JSON blob in `localStorage`. Nothing a contributor files is ever seen by
anyone else — "community" content, upvotes, and the Notebook all only exist in
the contributor's own browser, and all of it disappears if the user clears
site data.

**Why it matters:** this is the ceiling on the whole "community field guide"
premise. Every other community feature below depends on this existing.

**Proposed approach:**
- Stand up a real backend (Node/Express or a BaaS like Supabase) with a database for `users`, `languages`, `facts`, `guidelines`, `sessions`.
- Because `api.js` already exposes a single `api(path, options)` call used everywhere, swap its internals to issue real `fetch()` calls to that backend instead of reading/writing `localStorage` — the call sites in every page stay the same.
- Move auth to the server: real password hashing (bcrypt/argon2, not client-side SHA-256) and server-issued, httpOnly session cookies or JWTs instead of a token kept in `localStorage`.

**Size:** large, but contained by the existing `api.js` abstraction — this is the highest-leverage single change in the whole plan.

### 4. Fix the client-side auth shortcuts 🔜

Two things in the current `api.js` are worth closing out regardless of when #3 lands, since they're actual security gaps, not style preferences:
- A hardcoded login bypass: `u.id === CURATOR_USER.id && password === "curator123"` — a literal backdoor baked into the bundle.
- Passwords are hashed with one static, hardcoded salt (`HASH_SALT`). It looks like real hashing but provides no real protection since the entire "database," hashes included, lives in a `localStorage` key anyone can open in DevTools.

**Size:** small on their own; superseded once #3 moves auth server-side.

---

## Priority 2 — Content, discovery & community depth

- **Pagination / virtualized list** for `/languages` — `api.js` currently returns the *entire* filtered list in one response; fine at 10 seed languages, won't hold up once contributions grow.
- **Better search** — current search is a plain `.includes()` substring match across name/tagline/overview/paradigms. A ranked/fuzzy search would surface relevant results even with typos or partial terms.
- **Threaded replies on facts & guidelines** — currently flat, vote-only entries with no discussion.
- **Moderation / reporting** for community-submitted content — there's currently no way to flag a bad entry.
- **Public contributor profiles** — today "Notebook" only shows a user their *own* contributions; there's no way to see what anyone else has filed.
- **"Related languages"** on the detail page, driven by shared paradigms/era.
- **RSS feed or public changelog** for new specimens — the activity feed (`/api/activity`) already computes this data; it just isn't exposed anywhere outside the Discover page's sidebar.

---

## Priority 3 — Technical hardening

- **Tests** — there are currently zero unit or integration tests in the repo, despite non-trivial logic in `api.js` (validation, voting, auth, session handling) that's easy to silently regress.
- **TypeScript** — the codebase is 100% `.jsx`. Given how structured the data model already is (languages/facts/guidelines/users), typing it would catch a lot of mistakes for free, especially once a real backend (#3) introduces a network boundary.
- **Routing** — the app hand-rolls `pushState`/`popstate` handling in `App.jsx` instead of using `react-router`. Works today, but means no nested routes, no per-route code-splitting, and the static host needs a manual SPA-fallback rewrite rule for deep links (e.g. Netlify `_redirects` / Vercel rewrites) to work correctly.
- **CI** — no GitHub Actions workflow runs lint/build/tests on pull requests yet.

---

## Priority 4 — Visual / UX polish

### 5. Per-language icon badges ✅

**Status: implemented in this pass.**

Added `frontend/src/components/guide/LanguageIcon.jsx` — a small monogram
badge (e.g. `PY`, `RS`, `HS`) rendered in a color tied to the language, shown
wherever a specimen name appears in a list or header:
- The catalog / index listing (`SpecimenRow`, used on the Discover page).
- The specimen detail page header (`LanguageDetailPage`).
- The Notebook page's "Specimens Filed" cards (`NotebookPage`).

The 10 seeded languages (Python, JavaScript, TypeScript, Rust, Go, C,
Haskell, Ruby, Elixir, Zig) get a recognizable color + 2-letter label. Any
future **community-contributed** language that isn't in that list still gets
a badge automatically: the label falls back to the language's initials and
the color is derived deterministically from its name/slug (a simple string
hash → hue), so the same language always renders with the same badge, and no
specimen is ever shown without one. No new dependency was added — this
reuses the existing design tokens and Tailwind utility classes already in the
project, consistent with the "specimen field guide" aesthetic (monospace
labels, hairline borders, warm paper / dark ink themes).

If real brand logos (actual language mascots/wordmarks, e.g. via
`simple-icons`/`react-icons`) are wanted instead of monogram badges later,
that's a drop-in swap inside `LanguageIcon.jsx` — the call sites in
`SpecimenRow`, `LanguageDetailPage`, and `NotebookPage` wouldn't need to
change.
