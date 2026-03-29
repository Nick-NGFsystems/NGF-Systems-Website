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
Each client has their own separate Next.js website in its own GitHub repo, deployed to Vercel, on its own custom domain, with its own dedicated Neon database.

### How They Connect
```
NGFsystems App (app.ngfsystems.com)
        ↕ reads/writes via Prisma using client's database_url
Client's Own Neon Database
        ↕ reads via Prisma
Client's Website (client-domain.com)
```

- Every client has their **own dedicated Neon database** — completely separate from the NGFsystems app database and from every other client
- The NGFsystems app connects to a client's database using that client's `database_url` stored in `client_configs`
- The client's website connects to that same database to display content
- The portal writes content → the website reads it → visitors see it live
- **Never share databases between clients**
- **The app database and client databases are always separate**

---

## STACK — ALWAYS USE THESE EXACT VERSIONS

| Layer | Tool | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.3.8 exactly |
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
- **Always use Next.js 15.3.8 specifically** — earlier 15.x versions have a security vulnerability (CVE-2025-66478)
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
13. Never install Next.js 16+ — always use 15.3.8
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