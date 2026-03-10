# squad number.

Look up any professional football player's squad number — displayed in their club's actual kit colors.

Built with Next.js 16 and powered by Transfermarkt data.

## What it does

Search for a player by name → get their current jersey number rendered in their club's primary and secondary colors, plus a full season-by-season history of every number they've worn across club and international career.

## Design

Neo-brutalist "Matchday Pitch" aesthetic: real grass background, white boxy cards with hard black shadows, sharp corners, monospace typography. The jersey number is displayed large in the club's actual colors fetched directly from Transfermarkt.

## Tech stack

| | |
|---|---|
| Framework | Next.js 16.0.7 (App Router, `cacheComponents: true`) |
| Language | TypeScript |
| UI | React 19, shadcn/ui (new-york), Tailwind CSS 4 |
| Icons | Lucide React |
| Linter/Formatter | Biome |
| Package manager | Bun |
| Analytics | Vercel Analytics |
| Hosting | Vercel |
| Data | Self-hosted Transfermarkt API (`transfermarkt-api-xi.vercel.app`) |

## Project structure

```
src/
├── app/
│   ├── api/search/route.ts          # Search Route Handler (60s revalidate)
│   ├── player/[id]/
│   │   ├── page.tsx                 # Player detail page
│   │   ├── player-card.tsx          # Jersey number hero card
│   │   ├── player-history.tsx       # History list + tab UI (client)
│   │   └── player-history-server.tsx# Suspense wrapper for history
│   └── page.tsx                     # Home / search page
├── components/
│   ├── search/
│   │   ├── player-search.tsx        # Search bar with '/' shortcut
│   │   ├── searchbar.tsx
│   │   ├── search-results.tsx
│   │   └── search-result-item.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   └── hero-title.tsx
├── lib/
│   └── transfermarkt/index.ts       # All data fetching (server-only, 'use cache')
├── styles/                          # (reserved)
└── types/                           # Shared TypeScript types
```

## Getting started

**Prerequisites:** Bun (or Node.js 18+)

```bash
# Install dependencies
bun install

# Run dev server
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
bun dev          # Development server
bun build        # Production build
bun start        # Production server
bun lint         # Biome check
bun lint:fix     # Biome check --write
bun format       # Biome format --write
```

## Data fetching

Everything is server-side with Next.js 16 Cache Components (`'use cache'` directive):

- **Player profile** — `getPlayer(id)` — `cacheLife('hours')`
- **Club profile + colors** — `getClub(id)` — `cacheLife('hours')`
- **Jersey number history** — `getNumberHistory(id)` — `cacheLife('hours')`
- **Search** — Route Handler — `revalidate: 60`

National teams (e.g. Argentina, France) return HTTP 500 from the club profile endpoint. These are resolved by fetching the player's citizenships and searching for matching clubs, then falling back to neutral colors `['#4b5563', '#f9fafb', '#4b5563']`.

## Key constraints

`cacheComponents: true` in `next.config.ts` enables the Next.js 16 Cache Components feature. This has two implications for the codebase:

1. **No `export const runtime = 'edge'`** on Route Handlers — incompatible with cache components.
2. **No `await params` at the page level** — params must be passed as a `Promise<string>` down to async server components inside Suspense boundaries.

Pattern used throughout:
```ts
// page.tsx
const idPromise = params.then(p => p.id)
// pass idPromise to an async server component as a prop
```

## Player history

`getNumberHistory` returns `{ clubs: NumberHistory[], international: NumberHistory[] }`.

On the player page, `HistorySection` renders:
- Club tab by default
- International tab added only when `international.length > 0`
- Each row shows season, jersey number in the club's primary color, and club name

## Acknowledgements

- [Transfermarkt](https://www.transfermarkt.com/) for the football data
- [Transfermarkt API](https://github.com/felipeall/transfermarkt-api) for the open-source API wrapper
