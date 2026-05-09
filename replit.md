# Nashah Advisory Store

A full-featured custom apparel ecommerce website for Nashah Advisory, a Malaysian custom printing shop. Customers can browse products, add to cart, request quotes, and generate AI product concepts.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, proxied at /api)
- `pnpm --filter @workspace/tmaker-store run dev` — run the storefront (port 19546, proxied at /)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Frontend: React + Vite, Wouter routing, TanStack Query, shadcn/ui, Tailwind CSS v4

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI source of truth (products, categories, AI generate)
- `lib/db/src/schema/` — Drizzle schema: `categories.ts`, `products.ts`
- `artifacts/api-server/src/routes/` — Express routes: products, categories, ai
- `artifacts/tmaker-store/src/` — React storefront
  - `pages/` — Home, Shop, Product, Category, Cart, AIGenerator, and 10+ content pages
  - `components/Header.tsx`, `Footer.tsx`, `ProductCard.tsx`
  - `hooks/use-cart.ts` — localStorage cart hook

## Architecture decisions

- Contract-first API: OpenAPI spec → Orval codegen → typed React hooks
- Categories stored flat in DB, assembled into tree at query time in the categories route
- Cart state persisted in localStorage via `useCart` hook (no server-side cart)
- Product variants (colour/sizes) computed on-the-fly from text arrays in Postgres
- AI product generator is a deterministic template engine (no external LLM required)

## Product

- **Shop**: 15+ seeded products from Gildan, Oren Sport, Crossrunner, North Harbour, Enzo brands
- **Category hierarchy**: Hot Items → Apparel → Unisex/Men → T-Shirt, Polo, Hoodies, Uniforms, Oversized, Vest, Pants, Singlet
- **Product detail**: colour swatches, size buttons, quantity stepper, add-to-cart with localStorage
- **Cart**: line items, qty +/-, remove, order summary with totals
- **AI Generator**: form with niche/audience/style/price inputs → instant product concept (title, description, specs, SEO, variants, estimated price)
- **Content pages**: Custom Made, Ready Made, Sublimation, DTF, Corporate Solutions, Bulk Printing, Custom T-Shirt Printing, Create Your Design, User Guide, Catalogues, Brand Catalogues

## User preferences

- Brand: #D31F26 red, Jost font, white background, black CTAs
- No emojis in UI
- Sharp corners (no border-radius on buttons/cards)

## Gotchas

- API routes are mounted at `/api/*` — always use the proxy at localhost:80 for curl, never port directly
- The `lib/api-zod/src/index.ts` must NOT re-export `./generated/types/*` via wildcard — causes name collision with Zod schemas. Only export specific type files.
- Orval-generated hooks return `T` directly (not wrapped in `{ data: T }`)
- Minimum order qty is 50 pieces per colour — this is enforced in the cart UI but not the backend

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
