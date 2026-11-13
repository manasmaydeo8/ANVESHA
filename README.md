# ANVESHA — The Language Field Guide

An editorial-grade, client-side web app that presents programming languages as a naturalist's field handbook — browse languages as "specimens," read community-filed notes and guidelines, and contribute your own entries. Built as a pure frontend React app with no backend: data, auth, and persistence all live in the browser via `localStorage`.

## Features

- **Discover catalog** — browse languages with live counts, search, and filters by paradigm and era.
- **Specimen detail pages** — each language has notes, usage guidelines, and code examples, with community upvoting.
- **Contribute** — file new languages, field notes, and guidelines through dedicated forms.
- **Notebook** — a personal workspace listing everything you've authored, with edit/delete.
- **Accounts** — sign up / sign in with salted SHA-256 password hashing and session tokens (Web Crypto API), all stored client-side.
- **Light & dark themes** — warm cream-paper and dark-ink visual modes.
- **Resilient by design** — an `ErrorBoundary` fallback screen and storage-quota overflow protection.

## Tech Stack

- **React 19** + **Vite** for the app and dev/build tooling
- **Tailwind CSS** (with custom design tokens) for styling
- **lucide-react** for icons, **sonner** for toasts
- **Client-side mock REST API** (`frontend/src/lib/api.js`) backed by `localStorage` — no server or database required
- **ESLint** (flat config) for linting

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── guide/     # Domain components (chips, rows, code blocks, etc.)
│   │   ├── site/      # Site shell: navbar, footer, layout
│   │   └── ui/         # Primitive UI widgets & ErrorBoundary
│   ├── context/        # AuthContext — global authentication state
│   ├── data/           # Seed data for languages/notes/guidelines
│   ├── lib/            # Mock API, local "database," and crypto helpers
│   ├── pages/          # Route-level views (Discover, Detail, Contribute, Notebook, Auth, About)
│   ├── App.jsx         # Root routing and error boundary wiring
│   ├── index.css       # Design tokens (light & dark mode)
│   └── main.jsx        # React DOM entry point
└── package.json
```

See [`PROJECT_OVERVIEW.txt`](./PROJECT_OVERVIEW.txt) for a full function-by-function directory of the codebase.

## Getting Started

### Prerequisites

- Node.js (18+ recommended) and npm

### Installation

```bash
git clone https://github.com/manasmaydeo8/ANVESHA.git
cd ANVESHA/frontend
npm install
```

### Run the dev server

From the `frontend` directory:

```bash
npm run dev
```

Or from the repo root, using the convenience scripts in the root `package.json`:

```bash
npm run dev       # start Vite dev server
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # run ESLint
```

## How Data Works

There's no backend. `frontend/src/lib/api.js` simulates a REST API against a database object persisted in `localStorage`, seeded on first load from `frontend/src/data/seedData.js`. All data (languages, notes, guidelines, users, sessions) lives in your browser — clearing site data resets the app to the seed state.

## License

No license has been specified for this project yet.
