# NGFsystems — AI Rules & Project Standards

This file is read automatically by the Codespace AI at the start of every session.
All AI tools (Claude, GitHub Copilot) working inside this codebase must follow these rules exactly.
Do not deviate from this stack. Do not install unlisted libraries without explicit approval.
When in doubt, refer back to this file before writing any code.

---

## THE TWO-AI WORKFLOW

NGFsystems projects use two AIs working together:

**Claude on claude.ai** — the strategic AI. Plans features, makes architecture decisions, writes instructions for you to execute. Nick pastes those instructions here.

**You (Codespace AI)** — the execution AI. You have full access to the codebase. Read files, write files, run terminal commands, execute builds, run migrations. Report back exactly what you did, what files changed, and any errors. Never guess — always verify with `cat` after writing files.

When Nick gives you instructions, execute them precisely and report results clearly so Claude on claude.ai can interpret them and decide the next step.

---

## THE NGFSYSTEMS ECOSYSTEM

### The App (app.ngfsystems.com)
Central SaaS platform with two sides:
- **Admin** (`/admin`) — Nick manages clients, projects, finances, contracts, and more
- **Client Portal** (`/portal`) — each client manages their website, views invoices, submits requests

### Client Websites
Each client has their own Next.js website deployed to Vercel on a custom domain. Client websites do **NOT** have their own Neon database — they fetch content from the central NGF app API.

### How They Connect
```
Client edits in portal → "Save Draft" → saves to draft_content (NOT live)
Client clicks "Publish" → draft_content promoted to content → website updates
Client website → fetches published content via NGF public API on every page load
```

- **No separate database per client** — all content lives in the NGF app's central database
- **Auto-detection by domain** — no NGF_CLIENT_ID env var needed. Uses VERCEL_PROJECT_PRODUCTION_URL to auto-detect, matched against site_url in client_configs
- Client edits saved as drafts only go live when they click Publish
- The public API always returns `content` (published) — never `draft_content`

---

## NGF CONTENT EDITOR — REQUIRED IN EVERY CLIENT WEBSITE

Every client website needs these 4 things for the portal editor to work:

**1. `lib/ngf.ts`** — Fetches content from NGF app API. Uses VERCEL_PROJECT_PRODUCTION_URL to auto-detect domain. Copy from NGF-Systems-Website.

**2. `components/NgfEditBridge.tsx`** — postMessage bridge for the portal iframe editor. Copy from NGF-Systems-Website. Add `<NgfEditBridge />` to root layout.

**3. `data-ngf-field` attributes** on editable elements:
```tsx
<p data-ngf-field="hero.subheadline">{subheadline}</p>
<h2 data-ngf-field="features.title">{featuresTitle}</h2>
<span data-ngf-field="hero.ctaText">{ctaText}</span>
```
Format: `"section.fieldName"` matching the keys in NgfSiteContent. Always include a `|| 'default'` fallback.

**4. CSP in `next.config.js`** to allow portal iframing:
```javascript
async headers() {
  return [{ source: '/(.*)', headers: [{ key: 'Content-Security-Policy',
      value: "frame-ancestors 'self' https://app.ngfsystems.com https://*.vercel.app" }] }]
      }
      ```

      **Setup checklist for new client website:**
      1. Copy `lib/ngf.ts` from NGF-Systems-Website
      2. Copy `components/NgfEditBridge.tsx` from NGF-Systems-Website
      3. Add `<NgfEditBridge />` to root layout (client component)
      4. Add `data-ngf-field="section.field"` to every editable element
      5. Add CSP headers in `next.config.js`
      6. Add `WEBSITE_REVALIDATION_SECRET` env var in Vercel, on production AND
         preview. That exact name — the portal cannot satisfy any other.
      7. DO NOT set NGF_CLIENT_ID — auto-detects by domain
      8. In NGF admin portal: set `site_url` to the production domain, toggle on Website Page
---

## STACK — ALWAYS USE THESE EXACT VERSIONS

| Layer | Tool | Version |
|---|---|---|
| Framework | Next.js (App Router) | latest patched 15.5.x |
| Runtime | React | 18.x |
| Language | TypeScript | always, never plain JS |
| Styling | Tailwind CSS | 3.x |
| Database | Neon (PostgreSQL) | latest |
| ORM | Prisma | 5.x |
| Auth | Clerk | @clerk/nextjs@6 |
| Payments | Stripe | latest |
| Deployment | Vercel | — |
| Version Control | GitHub | — |

### Critical Version Rules
- **Never install Next.js 16+** — breaks route groups and has incompatibilities with React 18
- **Stay on the latest patched 15.5.x.** This rule previously said "15.3.8 exactly". That is wrong and
  was actively unsafe: upstream only patches the NEWEST minor of a supported major, so 15.3.x is
  unpatched — it is the version that sat in range for the middleware-bypass advisory, which is why
  `NGF-Systems-app/CLAUDE.md` names it directly. `scripts/ngf-doctor.mjs` enforces the correct rule
  and FAILS on 15.3.8. This repo is on 15.5.25.
- **Never install React 19+** — incompatible with Next.js 15
- **Never install Prisma 6+** — breaking changes in schema syntax
- **Turbopack must always be disabled** — never use `--turbopack` flag or enable it in config
- **Always run Prisma via local binary** — use `./node_modules/.bin/prisma` never `npx prisma` — npx downloads Prisma 7 globally which breaks migrations
- **Portal routes must never share a path name with admin routes** — Next.js 15 treats same-named pages across route groups as conflicts. Portal dashboard is `/portal/portal-dashboard` not `/portal/dashboard`
- **Pin Clerk to v6** — `@clerk/nextjs@6`. Clerk v7 has breaking changes and a different JWT format. Never use `@clerk/nextjs@latest`

---

## FOLDER STRUCTURE — EVERY PROJECT FOLLOWS THIS

```
app/
  layout.tsx                → Root layout with ClerkProvider
  page.tsx                  → Landing page
  redirect/page.tsx         → Role-based redirect after sign-in
  unauthorized/page.tsx     → Shown when wrong role accesses a route
  not-found.tsx             → Required by Next.js 15 when notFound() is used
  (auth)/                   → Login, signup pages
    layout.tsx              → Required for route group to work
    sign-in/[[...rest]]/
    sign-up/[[...rest]]/
  (admin)/                  → Admin-only routes. Blocked if Clerk role !== "admin"
    layout.tsx              → Required for route group to work
    dashboard/page.tsx
    clients/page.tsx
    clients/[id]/page.tsx
    leads/page.tsx
    projects/page.tsx
    finances/page.tsx
    contracts/page.tsx
    time/page.tsx
  (portal)/                 → Client-only routes. Blocked if Clerk role !== "client"
    layout.tsx              → Required for route group to work
    portal-dashboard/page.tsx
    portal-website/page.tsx
    portal-content/page.tsx
    portal-invoices/page.tsx
    portal-request/page.tsx
  api/
    admin/                  → Admin API routes
    portal/                 → Client portal API routes
    webhooks/               → Stripe and Clerk webhook handlers

components/
  ui/                       → Generic reusable elements (buttons, inputs, cards, modals)
  layout/                   → AdminLayout, PortalLayout, PublicLayout, all navbars, NavLink
  admin/                    → Admin-specific components
  portal/                   → Client portal-specific components

lib/
  db.ts                     → Prisma client — single instance, import from here everywhere
  auth.ts                   → Clerk auth helpers
  stripe.ts                 → Stripe client — single instance
  utils.ts                  → General utility functions
  portal.ts                 → getClientConfig(), getClientDb()

prisma/
  schema.prisma             → Database schema — single source of truth

types/
  index.ts                  → All TypeScript type definitions and interfaces

public/                     → Static assets
```

---

## NAMING CONVENTIONS

| Thing | Convention | Example |
|---|---|---|
| Components | PascalCase | `ClientCard.tsx` |
| Functions | camelCase | `getClientById()` |
| Files (non-component) | kebab-case | `client-helpers.ts` |
| Database tables | snake_case | `client_configs` |
| Environment variables | SCREAMING_SNAKE_CASE | `DATABASE_URL` |
| API routes | kebab-case folders | `/api/portal/change-requests/route.ts` |
| Clerk roles | lowercase string | `"admin"`, `"client"` |

---

## DESIGN SYSTEM — Apple-Inspired Refined Minimalism

Every NGFsystems project follows this design language.

### Visual Style
- Light theme — white and off-white backgrounds (`bg-white`, `bg-gray-50`)
- Dark primary text — `text-gray-900`, `text-slate-900`
- Single accent color — `blue-600`
- Subtle depth — `shadow-sm`, `rounded-xl`, `border border-gray-100`
- Generous whitespace
- No heavy gradients, no purple, nothing generic or AI-looking

### Typography
- `font-sans` with tight tracking on headings
- Clean hierarchy — bold headings, normal weight body
- Never use Inter, Roboto, or Arial as a deliberate font choice

### Responsive Design — Non-Negotiable
- **Mobile-first always** — write mobile layout first, scale up with `md:` and `lg:`
- Must work at: 375px (mobile), 768px (tablet), 1280px (desktop)
- Navbars: hamburger menu on mobile, full horizontal nav on desktop
- Grids: `grid-cols-1` by default, expand on larger screens
- Touch targets minimum 44px tall on mobile
- Never use fixed pixel widths on containers — use `max-w-` with `w-full`
- Font sizes, padding, and spacing must be readable on mobile

---

## TAILWIND CSS — REQUIRED SETUP

Every project must have all four of these or Tailwind will not work:

**`tailwind.config.ts`:**
```typescript
import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: { extend: {} },
  plugins: [],
}
export default config
```

**`postcss.config.js`:**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**`app/globals.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**`app/layout.tsx` must import globals.css at the top:**
```typescript
import './globals.css'
```

---

## TSCONFIG — REQUIRED PATH ALIAS CONFIGURATION

Without this, route group pages silently 404:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## NEXT.JS CONFIG

**For Codespaces development only** (remove experimental block for Vercel production):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.app.github.dev'],
    },
  },
}
module.exports = nextConfig
```

**For Vercel production — use this exactly:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig
```

Never add turbo configuration. Never add experimental flags unless explicitly instructed.

---

## AUTH — CLERK v6

### Setup Steps (New Projects)

**1. Install Clerk v6:**
```bash
npm install @clerk/nextjs@6
```
Never use `@clerk/nextjs@latest` — it installs v7 which has breaking changes.

**2. Customize the Session Token:**
Go to **dashboard.clerk.com** → **Configure** → **Sessions** → **Customize session token** → add:
```json
{
  "metadata": "{{user.public_metadata}}"
}
```
This must be done on every Clerk instance (dev and production separately). Without it, `sessionClaims.metadata` will be `{}` and role checks will always fail.

**3. Set Clerk env vars in `.env.local`:**
```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/redirect
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/redirect
```

**4. Set User Roles in Clerk Dashboard:**
Go to **dashboard.clerk.com** → **Users** → click user → **Metadata** → **Public** → **Edit**:
```json
{ "role": "admin" }
```
or
```json
{ "role": "client" }
```
After setting a role, the user must sign out and back in for the new JWT to include it.

**5. Layout Components Must NOT Do Auth Checks:**
```typescript
// ✅ CORRECT — layout just wraps content
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <PortalNavbar />
      <main>{children}</main>
    </div>
  )
}

// ❌ WRONG — never do auth checks in layouts
export default async function PortalLayout({ children }) {
  const user = await currentUser()  // ← never do this
  if (!user) redirect('/sign-in')   // ← never do this
}
```

### Standard Middleware (middleware.ts in project root)
```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/unauthorized(.*)',
  '/redirect',
])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return NextResponse.next()

  const { sessionClaims } = await auth()

  if (!sessionClaims) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  const role = (sessionClaims?.metadata as { role?: string })?.role
  const path = req.nextUrl.pathname

  if (path.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  if (path.startsWith('/portal') && role !== 'client') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next|static|favicon\\.ico|api/webhooks|_clerk).*)']
}
```

### Critical Middleware Notes
- **`/` must be in public routes** — Clerk's internal catchall check makes requests to `/` during sign-in
- **`/redirect` must be in public routes** — the redirect page runs before session is fully established
- **Always `return NextResponse.next()`** — never bare `return` in Clerk v6 middleware
- **Exclude `_clerk` and `api/webhooks` from matcher** — lets Clerk internal requests and webhooks pass through
- **Role is in `sessionClaims.metadata.role`** — requires Clerk session token customization

### Clerk Webhook
The webhook at `/api/webhooks/clerk` auto-assigns `role: "client"` to new signups and links them to their client record by email via `clerk_user_id`. Uses Svix for signature verification. `CLERK_WEBHOOK_SECRET` must be set in env vars — use the production secret for production, dev secret for dev.

---

## DATABASE — PRISMA + NEON

### The App Database
The NGFsystems app has its own Neon database. It stores clients, configs, projects, finances, contracts, etc.

### Client Databases
Each client has their own separate Neon database. The app connects to it dynamically using the `database_url` stored in that client's `client_configs` record. Never use the app database to store a client's website content.

### Rules
- Single Prisma instance — always `import { db } from '@/lib/db'`
- Never instantiate PrismaClient directly anywhere else
- Always use local binary: `./node_modules/.bin/prisma migrate dev --name description`
- Never use `npx prisma` — it downloads Prisma 7 globally and breaks migrations
- Schema changes go in `prisma/schema.prisma` only — never edit the database directly
- Always define relationships explicitly in the schema
- Always filter portal queries by `client_id` at the Prisma level — never in JavaScript
- A client must never be able to read or write another client's data

### Standard db.ts
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

Always import as `import { db } from '@/lib/db'` — never use a default export.

### Standard datasource block
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

---

## DATABASE — TABLE REFERENCE (App Database)

| Table | Purpose |
|---|---|
| `clients` | All client accounts — both admin-created and self-signup |
| `client_configs` | Portal page/feature toggles, site_url, site_repo, database_url per client |
| `project_requests` | Website request form submissions from self-signup clients |
| `projects` | Project tracking per client |
| `tasks` | Tasks within a project |
| `time_entries` | Billable hours logged per client/project |
| `invoices` | Invoice tracking — fixed, hourly, or retainer |
| `expenses` | Business expense tracking (admin only) |
| `contracts` | Contract records per client |
| `site_analytics` | Manual analytics entries per client per reporting period |

### client_configs fields
- `page_request`, `page_website`, `page_content`, `page_invoices` — page visibility toggles
- `feature_blog`, `feature_products`, `feature_booking`, `feature_gallery` — feature toggles
- `site_url` — the client's live website URL
- `site_repo` — their GitHub repo URL
- `database_url` — their dedicated Neon database connection string
- `clerk_user_id` — links client record to their Clerk account

### Client Website Database Tables (per-client database)
```
site_content    — editable content fields (field_key, field_type, field_label, field_value, page_section)
change_requests — change requests submitted by client (title, description, priority, status, admin_comment)
```

---

## API ROUTES

- Admin API → `/app/api/admin/` — check `role === "admin"` first, return 401 if not
- Portal API → `/app/api/portal/` — check `role === "client"` first, return 401 if not
- Always validate all incoming request data before processing
- Always wrap handlers in try/catch
- Always return consistent JSON:
```typescript
// Success
return NextResponse.json({ success: true, data: result })

// Error
return NextResponse.json({ success: false, error: "Descriptive message" }, { status: 400 })
```

---

## COMPONENT RULES

- Every component must have typed props using a TypeScript interface defined at the top of the file
- No `any` types — ever
- Keep components focused — if a component does more than one thing, split it
- Use `"use client"` only when strictly necessary (event handlers, hooks, browser APIs)
- Default to server components
- Navbars: active link logic must be in a `"use client"` NavLink component to avoid hydration errors

---

## LAYOUT & NAVIGATION RULES

- Admin pages use `AdminLayout` — includes admin navbar
- Portal pages use `PortalLayout` — includes portal navbar
- Never manually add a navbar to an individual page — the layout handles it
- Never create a new layout component — always use the existing one for that side
- To change a navbar, edit its file — the change applies everywhere automatically

---

## SECURITY RULES

- Never expose secret keys or environment variables to the client side
- All protected routes must check Clerk auth before doing anything else
- Never trust client-sent data — always validate server-side
- Use Prisma parameterized queries only — never raw SQL string concatenation
- Portal queries must always filter by the authenticated client's `client_id`
- Never return data belonging to a different client than the one authenticated

---

## ABSOLUTE RULES — NEVER BREAK

1. TypeScript only — never `.js` files
2. One Prisma instance — always `import { db } from '@/lib/db'`
3. One Stripe instance — always `import from '@/lib/stripe'`
4. Auth through Clerk only — never write custom auth logic
5. Tailwind only — never inline styles, never custom CSS for components
6. No auth checks in layout components — middleware handles all auth
7. Never install new libraries without being explicitly asked
8. Never delete or overwrite existing functions when adding features — extend, don't replace
9. Always check existing components before creating new ones — reuse from `/components/ui` first
10. Never duplicate functions — check if it exists first
11. Never use Turbopack
12. Never install `@clerk/nextjs@latest` — always pin to v6
13. Never install Next.js 16+ — always use the latest patched 15.5.x (NOT 15.3.8; see Critical Version Rules)
14. Never use `npx prisma` — always `./node_modules/.bin/prisma`
15. Portal routes must have `portal-` prefix
16. Every route group folder must have a `layout.tsx`
17. `tsconfig.json` must have `baseUrl` and `paths` or route groups silently 404
18. Mobile-first responsive — every page must work at all screen sizes
19. Always verify files with `cat` after writing — never trust that it was written correctly
20. Never use `any` in TypeScript
21. Never make database calls from client components
22. Never hardcode keys, secrets, or connection strings — always use environment variables
23. Never build desktop-only UI — mobile is equally important
24. Each client gets their own dedicated Neon database — never share between clients
25. The NGFsystems app database and client website databases are always separate
26. Do not deploy to Vercel without setting Framework Preset to Next.js and adding all env vars
27. Do not forget to customize the Clerk session token — without it roles never appear in JWT
28. Do not expect a role change to take effect while a user is signed in — sign out and back in required

---

## KNOWN ISSUES & FIXES

| Issue | Fix |
|---|---|
| Route group pages silently 404 | Check `tsconfig.json` for `baseUrl` and `paths` |
| Clerk JWT broken | Pin to `@clerk/nextjs@6` |
| Role not in `sessionClaims` | Customize Clerk session token with `{{user.public_metadata}}` |
| Role change not working | User must sign out and back in |
| Hydration error on navbar active links | Extract active link logic into a `"use client"` NavLink component |
| Server Actions invalid in Codespaces | Add `allowedOrigins` to `next.config.js` experimental block |
| Prisma downloading v7 | Use `./node_modules/.bin/prisma`, never `npx prisma` |
| `needs_client_trust` Clerk error | Codespaces-only issue — works fine on Vercel production |
| API calls failing silently on production | Remove `allowedOrigins` from `next.config.js` — it blocks production domains |
| Sign-in redirecting to wrong place | Check `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` in Vercel — must be `/redirect` |
| Route group folders renamed by AI | Always use parentheses: `(admin)`, `(portal)`, `(auth)` — rename back with `mv` if needed |

---

## WORKFLOW — HOW WE BUILD

1. Check if any part of the feature already exists in the codebase
2. Check if any existing component or utility can be reused
3. Update `/prisma/schema.prisma` first if new data is needed
4. Run migration: `./node_modules/.bin/prisma migrate dev --name description`
5. Build the API route second
6. Build the UI component last
7. Verify every file with `cat` after writing — never trust that it was written correctly
8. Run `npm run build` — fix all TypeScript/lint errors before committing
9. `git add -A && git commit -m "feat: description"`
10. `git push origin main`

Always work on a feature branch for significant changes. Never commit directly to main for major features.

---

## VERCEL DEPLOYMENT — REQUIRED SETTINGS

**Framework Preset:** Must be set to **Next.js**

**Remove `allowedOrigins` from `next.config.js`** before deploying to production.

**Environment Variables** — all must be added to Vercel → Settings → Environment Variables:
```
DATABASE_URL
DIRECT_URL
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
CLERK_WEBHOOK_SECRET
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/redirect
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/redirect
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
```

**Clerk production instance:**
- Session token must be customized with `{{user.public_metadata}}`
- Domain must be verified with DNS records in registrar
- Webhook endpoint must be registered with production signing secret

---

## COMMON COMMANDS

```bash
# Development
npm run dev                                           # Start dev server
npm run build                                         # Build for production
npm run lint                                          # Check for errors

# Database — always use local binary, never npx
./node_modules/.bin/prisma migrate dev --name [desc]  # Apply schema changes
./node_modules/.bin/prisma generate                   # Regenerate Prisma client
./node_modules/.bin/prisma studio                     # Visual database browser

# Git
git add -A                          # Stage all changes
git commit -m 'feat: description'   # Commit
git push origin main                # Push to GitHub
```

---

## VERIFYING FILES WERE ACTUALLY UPDATED

After writing any file, always verify:
```bash
cat app/\(auth\)/sign-in/page.tsx
```

If a file still shows old content after an update, write it directly via terminal:
```bash
cat > app/\(auth\)/sign-in/page.tsx << 'EOF'
[file contents]
EOF
```

---

*This file is the single source of truth for all NGFsystems development.*

## KNOWN GAP — `lib/ngf.ts` is a legacy fork; do NOT run `sync-ngf` here yet

This site predates the flat-content contract. Its `lib/ngf.ts` returns a NESTED object
(`ngf.footer.location`, `ngf.hero.headline`) and every page and layout component reads it that
way. The canonical `lib/ngf.ts` in `ngf-client-starter` returns a flat map (`content['footer.location']`)
and exports `getItems`, `getGallery` and `siteBaseUrl`. Swapping the file in breaks the build in
`components/layout/Footer.tsx` and six more files (checked 2026-09-17).

What IS synced from the starter (2026-09-17): `components/NgfEditBridge.tsx` (1.2.1),
`app/api/revalidate/route.ts`, `scripts/ngf-doctor.mjs`. The doctor warns "Site host in
app/sitemap.ts" because `siteBaseUrl()` does not exist here yet; the sitemap emits the right host
from `NEXT_PUBLIC_SITE_URL` regardless.

To close this gap: migrate the seven `@/lib/ngf` consumers to the flat map, replace `lib/ngf.ts`
with the canonical file, add `scripts/sync-ngf.mjs` and the `sync-ngf` scripts to `package.json`,
then run `npm run sync-ngf:check` until it is clean. Until then, running the starter's sync script
against this repo overwrites `lib/ngf.ts` and takes the site down.

---

## SITE REBUILD — 2026-09-23

The marketing site was rebuilt from a single scrolling page into six routes. What changed, and what
a later session still needs to check.

### Structure

`/` (home), `/services`, `/work`, `/pricing`, `/about`, `/contact`. `lib/nav.ts` is the ONE table of
destinations — the navbar, the mobile menu, the footer and `app/sitemap.ts` all read it, so adding a
page in one place adds it everywhere. The old site hard-coded the same three anchors in three
components and shipped a sitemap listing only the home page.

Navbar and Footer moved into `app/layout.tsx`, so a page renders only its own content.

### Pricing is now capability-based, not page-count-based

`lib/pricing.ts` is the single price list. The buyer makes two independent decisions: a payment
track (monthly plan / one-time build) and a set of modules. Each module names the `client_configs`
column that delivers it, so nothing can be sold that `NGF-Systems-app/lib/portal-capabilities.ts`
cannot switch on.

**Numbers still needing Nick's sign-off are listed in `UNCONFIRMED_PRICING` in that file.** The base
figures ($100/mo, $600 build, $20/mo hosting, $80/hr) are CANONICAL and match
`NGF-Systems-app/lib/pricing.ts`. The module prices and the $150 setup fee are PROPOSALS.

The old published prices contradicted the contract generator — the site quoted one-time builds at
$799/$1,500/$2,500+ with $30/mo hosting, while `lib/pricing.ts` in the app (sourced from HANDOFF.md,
which Nick signs contracts from) said $600 and $20/mo. That contradiction is resolved in favour of
HANDOFF. If the app's figures ever change, change both.

### Editor field keys changed

The old `feature0.title` … `feature8.title` keys are gone. Nine sibling keys made the portal editor
render nine separate sections all labelled "Features" (editor audit P1.3). They are replaced by one
`data-ngf-group="services.pillars"` with `services.pillars.<i>.title` / `.body`.

**Any content already published against the old keys is orphaned** and will show as unknown keys in
the editor. Current annotated fields: `hero.headline`, `hero.subheadline`, `services.title`,
`services.subtitle`, `services.pillars.<i>.{title,body}`, `work.title`, `work.subtitle`,
`pricing.title`, `pricing.subtitle`, `footer.location`, `footer.blurb`.

Only the home page and the footer are annotated. The portal scraper reads the home page only
(editor audit P1.1), so annotating the five new pages would not surface them in the editor anyway.

### Three bugs fixed in `app/api/contact/route.ts`

1. `new Resend(...)` ran at module scope and threw during `next build` whenever `RESEND_API_KEY` was
   absent — the build failed outright rather than the contact form degrading.
2. The lead was relayed to `/api/leads/ingest` only AFTER the email succeeded, so a Resend outage
   lost the enquiry with no record anywhere. It is now persisted first. This is exactly the failure
   `ngf-doctor`'s "Lead capture reaches the portal" rule exists to catch — the rule passed only
   because it pattern-matches the string, not the ordering.
3. Form fields were interpolated into the notification email unescaped.

The endpoint now also validates the email shape, caps field lengths, and whitelists `?intent=`
against `CONTACT_INTENTS` server-side as well as in the browser.

### Known gaps from this rebuild

| Area | Status | Notes |
|---|---|---|
| Module prices | ⚠️ Unset, render as "Quoted" | See `UNCONFIRMED_PRICING` in `lib/pricing.ts`. Nothing is published until Nick sets them. |
| Portfolio screenshots | ⚠️ Not captured | `ClientWork.image` is wired and the grid renders without it. Drop JPEGs at `public/work/<slug>.jpg` and set `image` in `lib/clients.ts`. Capture was blocked in the build sandbox, not in code. |
| Browser verification | ⚠️ Local only | Verified with `next build`, `npm run doctor` (0 failures) and headless screenshots at 1440px and 390px, light and dark. Not opened in a real browser, and the portal editor was never pointed at it. |
| Full CSP | ⚠️ Partial | `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy` added. `default-src`/`object-src`/`base-uri`/`form-action` deliberately left out — this page loads Google Fonts and gtag, and a wrong `default-src` breaks them silently. Needs a browser to verify. |
| `feature0`–`feature8` content | ⚠️ Orphaned | Published content under the old keys is no longer read by anything. |
| Body font | ℹ️ Changed | Inter → Source Sans 3, because the design system above rules out Inter by name. One-line revert in `app/layout.tsx` if unwanted. |



---

## CLAIMS AUDIT — 2026-09-23

Nick asked that the site list "only our actual services and actual things we feature." Every
capability claim was checked against `NGF-Systems-app` before being kept, rewritten or removed.
**The rule this establishes: a claim goes on the site only if you can point at the code that
delivers it.**

### Removed — the platform does not do these

| Claim | Was | Reality |
|---|---|---|
| "Daily backups" | `lib/pricing.ts` ALWAYS_INCLUDED, `app/services/page.tsx` CORE | **Nothing runs on a schedule.** No `crons` in `vercel.json`, no `app/api/cron/*`, no `schedule` in `.github/workflows/ci.yml`, no `pg_dump`. What exists is `WebsiteContentVersion` — snapshotted **on publish** (plus admin reset and site-URL change), capped at 20 per client (`VERSION_HISTORY_CAP`, `lib/website-content-reset.ts:19`), covering **one table**. Neon's own PITR is the only real database backup and its window depends on the Neon plan. Replaced with "Every version saved", which is true. |
| "If something breaks at 2am it is our problem" / "uptime ... our responsibility" | same two files | **No uptime monitoring and no alerting.** `lib/connection-health.ts` is an on-demand check clicked in the admin hub. Nobody is paged. Replaced with "tell us and we fix it". |
| "Security updates" as an automated promise | `app/services/page.tsx` | Manual. No Dependabot or Renovate config in either repo. Softened to "keeping it patched is our job". |
| "Customers book **and pay** for their own appointments" | `MODULES.booking.summary` | Booking takes **no payment**. `Service.price_cents` is display only; there is no Stripe path in `app/api/public/bookings/`. Now "book their own appointments". |
| "Products, photos and prices you control" as a store feature | `MODULES.store.includes` | **There is no product catalog.** No `Product` model. `StoreSettings` is shipping/tax/policy/notification-email only, and `Order` is explicitly a mirror ("NGF is a MIRROR, not the system of record"). Products are edited as site content through the website editor. Reworded to say exactly that. |
| Module: **Customer accounts** — "a secure login for each of your customers" | `MODULES.accounts` | Not a capability. It named `database_url`, which is the admin-side external-DB **service requests** read (`config.secrets`, the WrenchTime pattern). No customer auth exists, and clients do not even see service requests in their own portal. |
| Module: **Custom integrations** — CRM / accounting connectors, extra payment processing, data imports | `MODULES.integrations` | `configColumn` was literally `'—'`. Nothing exists. |
| "Structured data" as something every client site gets | both files | NGF's own site emits JSON-LD (`app/layout.tsx:82`). **DemarcusCuts does not.** Not universal, so the claim was dropped rather than qualified. |

`accounts` and `integrations` were replaced by one honest module, **`custom` — Custom development**:
bespoke work, quoted per job, explicitly commented as not being a `client_configs` switch.
`CONTACT_INTENTS` and `MODULE_ICONS` were updated to match; a `history` icon was added to
`components/ui/Icon.tsx`.

### Kept — verified true, and some were under-sold

- **Booking** does more than the site claimed: SMS via Twilio (`BookingConfig.sms_sender`,
  `sms_country_code`, `sms_only`), an optional approval hold (`require_approval`), self-service
  cancel/reschedule links (`Appointment.manage_token`), buffers, lead time and max-advance. Those
  are now listed.
- **Store** emails: `lib/order-emails.ts` sends the buyer a confirmation and the owner a
  notification on the transition into PAID. Payment and fulfilment are genuinely separate columns.
- **GA4 is in the client portal**, not just admin — `PortalSiteAnalyticsWidget` is mounted at
  `app/portal/portal-dashboard/page.tsx:88`.
- Website editor (draft → preview → publish + history), Leads with per-enquiry status, Change
  requests, Invoices with a pay link — all six match `PORTAL_CAPABILITIES`.
- Sitemap and robots **are** on client sites (`app/sitemap.ts`, `app/robots.ts` in DemarcusCuts).

### Also fixed: hosting was not in the price list

`$20/month` was a hardcoded string in `PricingTables.tsx` twice and in a `TRACKS.oneTime.terms`
bullet, while the file header claimed a canonical `oneTime.hostingCents` that **did not exist**.
That is the same figure that caused the original site-vs-app contradiction ($30 vs $20). It is now
`TERMS.hostingCents` and rendered through `usd()`.

### Still not verified

The claims audit was done against source code, not against a running system. Not exercised: a live
booking, a live order, an actual rollback from version history, or Neon's real PITR window — that
last one needs the Neon dashboard and decides whether "every version saved" should also mention a
database-level restore.


---

## REDESIGN — 2026-11-11 (product-led, liquid glass)

Direction A (dark-first) was replaced. It read as unfinished, and the reason was not the palette:
**the site had no photograph or screenshot anywhere in it.** Every visual was a tinted gradient or a
hand-drawn fake of the portal. A portfolio site with no pictures of the work reads as a template
nobody finished, whatever colour it is.

### The palette inverted, in one file

`tailwind.config.ts` is where the inversion lives. The pages reference semantic tokens, so
re-pointing them changed the whole site at once. One exception: `text-white` was used 61 times for
headings and is a literal class, not a token — headings now use a **`head`** token. White text is
still correct in exactly three places and keeps `text-white` on purpose: the primary button, inside
the graphite hero panel, and the footer.

New tokens: `head` (headings), `onwell` / `onwell-dim` / `onwell-line` (text on the graphite panel).
`ink` is now white, `well` is the graphite `#16181C`, `accent` is `#0B5CAD` (6.1:1 on white, so it
is legible as text, not only as a button fill).

### Liquid Glass — where it is allowed

Glass appears in **two places only**: the floating desktop nav, and the phone dock. It is never on a
content surface and never stacked on itself. Those are Apple's own rules ("avoid using Liquid Glass
in scrollable content areas", "avoid glass-on-glass stacking"), and an earlier pass that put glass
on the pricing cards, the feature frames and the proof strip looked like 2018 glassmorphism.

The material is defined by **lensing** — light bending at the edges — not blur.
`components/ui/GlassFilters.tsx` holds the SVG filters; `/public/glass/*.png` are the displacement
and specular maps, generated by `scripts/make-glass-maps.py`. **Regenerate, never hand-edit.** The
displacement maps are neutral 128/128 through the middle and ramp only inside a band at the border,
so the distortion lands at the rim and not across the face; a turbulence map instead gives the
wobbly-frosted look, which is a different and much worse effect.

Chromium only. Firefox and WebKit parse `backdrop-filter: url(...)` but render the blur alone, which
is a clean fallback — `@supports` cannot tell them apart, so `app/globals.css` writes it as a
baseline declaration with the lensing as an override, not as a query.

**The nav must never overlap the graphite panel.** Light glass at 80% over `#16181C` composites to an
opaque grey and the links stop being readable. The hero starts below the nav for that reason.

### The morphing nav (`components/layout/Navbar.tsx`)

Three pills — wordmark / links / actions — that fuse into one bar as the page scrolls and pull apart
at the top. Each gap is its own **damped spring** integrated per frame, deliberately tuned apart
(stiffness 240 and 196) so the pills do not move in lockstep. Velocity feeds the liquid: the neck
sloshes off the centre line in the direction of travel and its control points reach further the
faster it moves.

Things that will bite whoever edits this:

- **Pill widths are MEASURED, never hard-coded.** `lib/nav.ts` is the one table of destinations, and
  a fixed 322px links pill overflowed into the next pill the moment it held five items. The
  measuring pass runs in `useLayoutEffect`, i.e. before paint, and re-runs on resize and once the
  display font loads.
- **The middle pill is the anchor** and never moves. Centring the whole group makes it drift by half
  the difference between the two gaps whenever the springs are out of step.
- **The union is one outline**, not three stroked pills — stroking them separately leaves cap arcs
  showing through the middle of a merged bar.
- Neck half-height falls to **zero** at the threshold and the waist closes faster than the attach
  does. An earlier version left it at 0.17r, so the thread vanished while still 4.8px thick: a pop,
  not a break.
- `prefers-reduced-motion` snaps to the target instead of springing.
- **`START` is a dead zone and it is load-bearing.** The morph is
  `(scrollY - START) / RANGE`, smoothstepped. With `START = 0` and
  `RANGE = 180` — the original — a neck formed by about 48px of scroll and the
  bar was fused by 140px, so the split state nobody had seen yet was gone on
  the first notch of the wheel. `START = 180, RANGE = 420` puts the first
  thread near 290px and full fusion near 600px. Measured in headless Chromium:
  the clip path holds 3 subpaths through 290px, where it used to break at 48px.

### Mobile: bring the elements to the thumb

No top nav on a phone — only a branding strip. Navigation is **one glass button in the bottom-right
corner**, where a right thumb rests, and the menu grows **up** out of it. The links render
`flex-col-reverse` so the one most people want is nearest the thumb; reading order would put Contact
furthest away, which defeats the point. `app/layout.tsx` adds bottom clearance below the footer or
the button covers its last rows.

**It was a three-part dock until 2026-11-11** — menu, a full-width "Get a free mockup", and a call
button, spanning the whole width. That lost on every count: the CTA duplicated the one already in
the hero a few hundred pixels above it, the call button was a third competing action, and the one
thing the bar is actually for was the smallest target on it. Do not add a second action back.

**The sheet is a list of ROWS, not a list of words** (2026-11-11, second pass). Each row is a
36px rounded icon tile plus a label; six bare words read as an unstyled fallback rather than a
designed menu. Only the current page takes colour — an accent-filled tile, an accent label and an
`accent/[0.08]` row — so the marking is visible without shouting. `Client login` sits below a
hairline, quieter, with the `external` icon.

`MENU` in `Navbar.tsx` is `NAV` plus two rows that only exist on a phone:

- **Home.** On a desktop the wordmark is the way back; the phone menu has no wordmark, so before
  this there was no way home from the menu at all.
- **Client login**, which `lib/nav.ts` deliberately keeps out of `NAV` because it is a different
  audience.

`lib/nav.ts` is still the one table of destinations — a page added there appears here automatically,
falling back to the `layout` icon until `MENU_ICONS` names one. The icons are phone-only; a desktop
nav of six icons would be noise.

Three things in `Navbar.tsx` will bite whoever edits the sheet:

- **It stays mounted when closed.** `hidden` cannot be transitioned, so the closed state is made
  inert by hand — `pointer-events-none`, `aria-hidden`, `tabIndex={-1}` on every link. Drop any one
  of those and the menu is still tabbable or clickable while invisible.
- **Height animates with `grid-rows-[0fr]` → `[1fr]`**, which is the only way to transition to an
  auto height without measuring it in JS. The inner wrapper must keep `min-h-0 overflow-hidden` or
  the row refuses to collapse.
- `STAGGER` is a written-out array of `delay-[Nms]` classes. Tailwind scans source text, so a
  computed `` `delay-[${i * 40}ms]` `` produces no class at all. `delayFor()` counts BACK from the
  end of `MENU` so the bottom row moves first and the sheet unrolls up out of the button. The rows
  render in plain reading order now; an earlier version reversed the array AND used
  `flex-col-reverse`, a double negative that only existed to make the stagger run bottom-up.
- **The active-page marking is applied after mount, and must stay that way.** The first version
  compared `usePathname()` to each row's href during render. Every page's build-time prerender
  marked the right row, it was verified on production right after the promote, and then it rotted:
  an hour later the home page — which had revalidated under traffic — served HTML with no row
  marked, while pages that had not regenerated yet still looked correct. `usePathname()` is
  reliable in the browser but not in whatever context an ISR regeneration renders in, and React 18
  does not repair attribute mismatches on hydration, so the wrong HTML stuck even after the client
  knew better. `const here = mounted ? pathname : null` makes the server output consistently
  unmarked and lets the client decide. Nothing flashes, because the sheet is closed and invisible
  until it is tapped. **Do not "optimise" this back into the render pass** — it will pass every
  local check and then decay in production an hour after you ship it.

### No sticky column in `PortalShowcase` (2026-11-11)

The heading column was `lg:sticky lg:top-28 lg:self-start`. It is barely shorter than the capability
list beside it, so the pin had only a few dozen pixels of travel — which did not read as "the
heading holds while the list scrolls", it read as the box drifting up and down as you scrolled past.
A sticky column needs a neighbour much taller than it is. **Do not put it back** unless that column
grows a lot.

### The phone hero is full-bleed (2026-11-11)

`components/sections/Hero.tsx` drops its side gutter below 640px and rounds only its bottom corners.
With a gutter, the dark panel read as a frame inside the frame of the branding strip, and a rounded
card jammed flush under that strip looked like a mistake rather than a choice. Edge to edge, the
dark band simply **is** the top of the page. From `sm:` up it is a card again.

### Screenshots (`lib/shots.ts`)

`lib/shots.ts` is the one table of the product screenshots the design rests on, and
`components/ui/ScreenshotSlot.tsx` renders either the image or a **visibly-marked slot** naming what
is missing and at what size. `src: null` means it is still a gap.

Two of the four are filled (Nick supplied them 2026-11-11, converted to webp with sharp):

| Key | State | Where |
|---|---|---|
| `editor` | ✅ `/shots/editor.webp` (1915×907, 24 KB) | the hero panel |
| `bookings` | ✅ `/shots/bookings.webp` (1290×740, 26 KB) | `components/sections/Bookings.tsx` |
| `leads` | ❌ still a marked slot | `components/sections/WhatYouGet.tsx` |
| `editorPhone` | ❌ not placed anywhere yet | — |

**`leads` is deliberately still empty.** The capture supplied read "No submissions yet · All 0", and
it sits under the heading "Every enquiry, in one place you own" — a picture of an empty inbox argues
against the claim it is there to prove. It needs three or four submissions at different statuses
first.

**Two things to decide before this is public.** The `editor` shot shows an unbranded client site
reading "YOUR BUSINESS" with the modal mid-edit on `Business Name = "Your Business"`, and it carries
a real third party's contact details (Aurum Drones, an email and a phone number) legibly in the site
nav. The `bookings` shot shows the Standard Haircut service, which is DemarcusCuts' live booking
setup rather than Test Client's. Neither leaks a customer's data, but both are another business's
details on NGF's marketing page.

To fill one: put the file in `/public/shots` and set `src` **and `size`** in `lib/shots.ts`. The
size is load-bearing — `ScreenshotSlot` is `object-cover`, so a frame whose aspect ratio does not
match the file crops content off an edge. `Bookings.tsx` builds its frame from an `aspect-[w/h]`
matching the entry, plus `self-start` so the grid does not stretch the column and leave a white band
under the picture. Take new captures from the **Test Client** account, never a real client's portal,
and crop out the dead whitespace before converting — a browser window of a mostly-empty admin page
reads as an unfinished product.

`components/sections/PortalPanels.tsx` is **deleted**. It hand-drew a fake leads inbox with invented
customer names (Dana Whitfield, Marcus Webb…). A real screenshot is both more convincing and not a
small lie about the product.

### `/portal-preview` — the one place a drawn mock is allowed (2026-11-11)

The hero's "Look inside the portal" used to go to `/services`, which did not show the portal at all.
It now opens `/portal-preview`, built on `components/sections/PortalMock.tsx`: a tabbed drawing of
the portal (Dashboard / Website editor / Leads / Bookings).

**This is a deliberate exception to the rule that killed `PortalPanels.tsx`, and it survives only
because of how it is labelled.** The difference is that nothing in it pretends to be real: every
value is a visible placeholder (`Your Business`, `Your customer`, `Your first service`), the browser
chrome carries a **PREVIEW** badge, and the caption under the frame opens with "Sample content."
`PortalPanels` failed all three — it invented people and presented them as a working inbox.

The **structure** is real and must stay that way: the tabs, the editor's field list, the New /
Contacted / Won lead statuses and the weekly-hours rows all mirror what the platform ships
(`NGF-Systems-app/lib/portal-capabilities.ts`). Do not add a panel for something the portal cannot
do — that would be the claims audit all over again, just drawn instead of written.

The page is indexable and in the sitemap via `EXTRA_ROUTES` in `lib/nav.ts`, which exists because
`ROUTES` was `'/'` plus `NAV` and this page is deliberately not a nav destination.

### No client counts on the site (2026-11-11)

At Nick's instruction the site does not state how many clients or industries NGF has. The home page,
`/work` and `/about` each derived a number from `CLIENTS` in `lib/clients.ts`; those are gone and the
`industries` derivation with them. **Do not re-add a count** — name the clients, do not tally them.

### Verified / not verified

Verified: `next build` (16 static pages), `tsc --noEmit`, `npm run doctor` (30 passed, 0 failures),
and headless Chromium at 1440px and 390px — the nav clip path really does go from 3 subpaths at the
top to 1 when scrolled, with no console errors on any page.

Not verified: a real browser on a real device, the lensing on non-Chromium, the portal editor
pointed at the new markup, and any live form submission.
