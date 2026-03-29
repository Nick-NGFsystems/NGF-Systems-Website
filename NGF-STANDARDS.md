# NGFsystems — Universal Project Standards

## HOW TO USE THIS FILE
Paste this entire file at the start of any new Claude chat on claude.ai.
Then say: "I'm starting a new NGFsystems project. Here's what we're building: [describe the project]"

---

## THE TWO-AI WORKFLOW — READ THIS FIRST

NGFsystems projects are built using two AIs working together:

**Claude on claude.ai (you, reading this)** — the strategic AI.
- Plans features and architecture
- Makes all technical decisions
- Writes detailed instructions for the Codespace AI to execute
- Debugs issues by interpreting output from the Codespace AI
- Never directly edits code files
- Frames all instructions as messages Nick can copy-paste to the Codespace AI

**The Codespace AI (GitHub Copilot or Claude inside GitHub Codespaces)** — the execution AI.
- Has full access to the codebase
- Reads, writes, and edits files directly
- Runs terminal commands, builds, migrations
- Reports back exactly what it did and any errors
- Follows `CLAUDE.md` in the repo root automatically — never needs it pasted

### How a typical exchange works:
1. Nick describes what he wants to Claude on claude.ai
2. Claude plans it and says: "Send this to the other AI: [detailed instructions]"
3. Nick copies that message into the Codespace AI
4. The Codespace AI executes and reports back
5. Nick pastes the response back to Claude on claude.ai
6. Claude interprets and decides the next step

### Rules for writing instructions to the Codespace AI:
- Be specific — include exact file paths, exact code, exact terminal commands
- Always ask it to verify with `cat filename` after writing any file
- Always ask it to run `npm run build` after significant changes
- Ask for exact error output before suggesting fixes
- Tell it to commit and push when a feature is complete

### What files to paste where:
- **Claude on claude.ai** → paste `NGF-STANDARDS.md` at the start of new chats
- **Codespace AI** → reads `CLAUDE.md` from the repo root automatically, no pasting needed
- Both files contain the same standards — they are always kept in sync

---

## WHO WE ARE

NGFsystems is a Michigan-based web development company. We build and manage websites and web applications for small business clients. Every project follows these standards exactly — whether it's the NGFsystems SaaS platform, a client website, or any internal tool.

---

## THE NGFSYSTEMS ECOSYSTEM

### The App (app.ngfsystems.com)
The central SaaS platform. One Next.js app with two sides:
- **Admin side** (`/admin`) — Nick manages clients, projects, finances, contracts, and more
- **Client portal** (`/portal`) — each client manages their website, views invoices, submits requests

### Client Websites
Each client gets their own separate website in its own GitHub repo, deployed to Vercel, on its own custom domain. Client websites are also built with Next.js and follow the same stack and standards.

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
- The client's website also connects to that same database to display content
- The portal writes content → the website reads it → visitors see it live

### Why Separate Databases Per Client
- One client's issues never affect another
- Clean data isolation — zero risk of cross-client data leaks
- Easy to hand off a client's full data if they ever leave
- Each client's website is fully self-contained

---

## TECH STACK — ALWAYS USE THESE, NOTHING ELSE

| Layer | Tool | Version |
|-------|------|---------|
| Framework | Next.js App Router | 15.3.8 exactly |
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
- Next.js: always **15.3.8** — never 16+
- React: always **18.x** — never 19+
- Prisma: always **5.x** — never 6+
- Clerk: always **@clerk/nextjs@6** — never @latest (v7 breaks JWT format)
- Never use Turbopack under any circumstances
- Never use `npx prisma` — always `./node_modules/.bin/prisma`

---

## DESIGN SYSTEM — Apple-Inspired Refined Minimalism

Every NGFsystems project — the app, client websites, everything — follows this design language.

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

### Layout
- Cards with subtle shadow and border for content sections
- Stat cards in responsive grids
- Clean empty states with a title and subtext
- Navigation: logo left, links center/right, user controls far right

### Responsive Design — Non-Negotiable
- **Mobile-first always** — write mobile layout first, scale up with `md:` and `lg:`
- Must work perfectly at: 375px (mobile), 768px (tablet), 1280px (desktop)
- Navbars: hamburger menu on mobile, full horizontal nav on desktop
- Grids: `grid-cols-1` by default, expand on larger screens
- Touch targets minimum 44px tall on mobile
- Never use fixed pixel widths on containers — use `max-w-` with `w-full`

### Code Rules
- Tailwind CSS classes only — never inline styles
- Never write custom CSS files for component styling
- TypeScript interfaces for all component props — no `any` types
- Use `"use client"` only when strictly necessary (event handlers, hooks, browser APIs)
- Default to server components

---

## THE APP — ARCHITECTURE

### Folder Structure
```
app/
  (admin)/        — admin-only routes, role:"admin" required
  (auth)/         — sign-in, sign-up pages
  (portal)/       — client-only routes, role:"client" required
  layout.tsx      — root layout with ClerkProvider
  page.tsx        — landing page
  redirect/       — role-based redirect after sign-in
  unauthorized/   — shown when wrong role accesses a route
  api/
    admin/        — admin API routes
    portal/       — client portal API routes
    webhooks/     — Stripe and Clerk webhooks

components/
  ui/             — generic reusable elements
  layout/         — navbars, layouts, shared structure
  admin/          — admin-specific components
  portal/         — portal-specific components

lib/
  db.ts           — NGFsystems app Prisma instance
  auth.ts         — Clerk auth helpers
  stripe.ts       — Stripe instance
  utils.ts        — shared utilities
  portal.ts       — portal helpers (getClientConfig, getClientDb)

prisma/
  schema.prisma   — NGFsystems app database schema

types/
  index.ts        — all TypeScript interfaces
```

### Route Naming Rules
- Admin routes: `/admin/dashboard`, `/admin/clients`, `/admin/projects`, etc.
- Portal routes: always prefix with `portal-` → `/portal/portal-dashboard`, `/portal/portal-invoices`
- Never name a portal route the same as an admin route — causes Next.js conflicts
- Every route group folder must have a `layout.tsx` file

### Admin Side Features
- Dashboard — business overview with live stat cards
- Clients — create, manage, delete clients; toggle portal features per client
- Projects — project tracking per client
- Finances — invoices and expenses with monthly/yearly tracking
- Contracts — contract records per client
- Time — billable hours tracking
- Leads — self-signup requests from ngfsystems.com

### Client Portal Features (toggled per client in client_configs)
- Portal Dashboard — always visible
- My Website — website overview, analytics
- Content — edit website content fields
- Invoices — view invoices
- Request — website change request form

### Client Config Toggles
Each client has a `client_configs` record controlling what they see:
- `page_website`, `page_content`, `page_invoices`, `page_request` — page visibility
- `feature_blog`, `feature_products`, `feature_booking`, `feature_gallery` — feature visibility
- `site_url` — their live website URL
- `site_repo` — their GitHub repo URL
- `database_url` — their dedicated Neon database connection string

The portal reads these on every load and only shows enabled pages/features.

---

## CLIENT WEBSITES — ARCHITECTURE

Each client website is a separate Next.js project with its own repo and its own Neon database.

### Standard Client Website Structure
```
app/
  layout.tsx       — root layout
  page.tsx         — homepage
  about/page.tsx
  services/page.tsx
  contact/page.tsx
  (any other pages the client needs)

lib/
  db.ts            — Prisma instance connected to THIS client's Neon database
  content.ts       — helpers to fetch site_content fields

prisma/
  schema.prisma    — client website database schema
```

### Client Website Database Schema (minimum)
```prisma
model SiteContent {
  id           String   @id @default(cuid())
  field_key    String   @unique
  field_type   String   // "text", "richtext", "image", "url"
  field_label  String
  field_value  String?
  page_section String
  updated      DateTime @updatedAt

  @@map("site_content")
}

model ChangeRequest {
  id            String   @id @default(cuid())
  title         String
  description   String?
  page_section  String?
  priority      String   @default("MEDIUM")
  status        String   @default("PENDING")
  image_urls    String?
  admin_comment String?
  created       DateTime @default(now())
  updated       DateTime @updatedAt

  @@map("change_requests")
}
```

### How Content Flows
```
Admin defines content fields in portal
        ↓
Client edits fields in portal → writes to site_content table
        ↓
Client's website reads site_content → displays to visitors
```

### Starting a New Client Website Project
When starting a new client website tell Claude:
1. Client name and business type
2. Pages needed
3. Any special features (booking, gallery, blog, products, etc.)
4. Brand colors/style preferences if known

Claude will plan the full project and provide instructions for the Codespace AI.

---

## AUTH — CLERK

### Setup Rules
- Always pin to `@clerk/nextjs@6` — never use `@latest`
- Customize session token on every Clerk instance: Configure → Sessions → Customize session token → add:
```json
{ "metadata": "{{user.public_metadata}}" }
```
- User roles in Clerk `publicMetadata`: `{ "role": "admin" }` or `{ "role": "client" }`
- After setting a role, user must sign out and back in for the new JWT to include it
- Layout components must NEVER do auth checks — middleware handles everything
- The Clerk webhook auto-assigns `role: "client"` to all new signups and links them to their client record by email

### Standard Middleware
```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/', '/sign-in(.*)', '/sign-up(.*)', '/unauthorized(.*)', '/redirect'
])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return NextResponse.next()
  const { sessionClaims } = await auth()
  if (!sessionClaims) return NextResponse.redirect(new URL('/sign-in', req.url))
  const role = (sessionClaims?.metadata as { role?: string })?.role
  const path = req.nextUrl.pathname
  if (path.startsWith('/admin') && role !== 'admin')
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  if (path.startsWith('/portal') && role !== 'client')
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next|static|favicon\\.ico|api/webhooks|_clerk).*)']
}
```

---

## DATABASE — PRISMA + NEON

### The App Database
The NGFsystems app has its own Neon database. It stores clients, configs, projects, finances, contracts, etc.

### Client Databases
Each client has their own separate Neon database. The app connects to it dynamically using the `database_url` stored in that client's `client_configs` record.

### Rules
- Single Prisma instance for the app — always `import { db } from '@/lib/db'`
- Never instantiate PrismaClient directly anywhere else
- Always use local binary: `./node_modules/.bin/prisma migrate dev`
- Never use `npx prisma` — it downloads Prisma 7 globally and breaks everything
- Schema changes go in `prisma/schema.prisma` only — never edit the database directly
- Portal queries must always be scoped to the authenticated client — never expose one client's data to another

### Standard db.ts
```typescript
import { PrismaClient } from '@prisma/client'
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const db = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

### Standard datasource block
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

---

## API ROUTES

- Admin API → `/app/api/admin/` — always check `role === "admin"` first, return 401 if not
- Portal API → `/app/api/portal/` — always check `role === "client"` first, return 401 if not
- Always wrap in try/catch
- Always return consistent JSON:
```typescript
return NextResponse.json({ success: true, data: result })
return NextResponse.json({ success: false, error: "message" }, { status: 400 })
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

**For Vercel production:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig
```

---

## TSCONFIG — REQUIRED

Without this, route group pages silently return 404:
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

## TAILWIND — REQUIRED SETUP

**tailwind.config.ts:**
```typescript
import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: { extend: {} },
  plugins: [],
}
export default config
```

**app/globals.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`app/layout.tsx` must import `globals.css` at the very top.

---

## ABSOLUTE RULES — NEVER BREAK

1. TypeScript only — never `.js` files
2. One Prisma instance — always `import { db } from '@/lib/db'`
3. Tailwind only — never inline styles, never custom CSS for components
4. No auth checks in layout components — middleware handles all auth
5. Never install new libraries without asking first
6. Never use Turbopack
7. Never install `@clerk/nextjs@latest` — always pin to v6
8. Never install Next.js 16+ — always use 15.3.8
9. Never use `npx prisma` — always `./node_modules/.bin/prisma`
10. Portal routes must have `portal-` prefix
11. Every route group folder must have a `layout.tsx`
12. `tsconfig.json` must have `baseUrl` and `paths` or route groups silently 404
13. Mobile-first responsive — every page must work at all screen sizes
14. Never report a file as updated without actually writing it — always verify with `cat`
15. Never use `any` in TypeScript
16. Never duplicate components, functions, or layouts — always check if it exists first
17. Never make database calls from client components
18. Never hardcode keys, secrets, or connection strings — always use environment variables
19. Never build desktop-only UI — mobile is equally important
20. Each client gets their own dedicated Neon database — never share databases between clients
21. The NGFsystems app database and client website databases are always separate

---

## KNOWN ISSUES & FIXES

| Issue | Fix |
|-------|-----|
| Route group pages silently 404 | Check `tsconfig.json` for `baseUrl` and `paths` |
| Clerk v7 JWT format broken | Pin to `@clerk/nextjs@6` |
| Role not in `sessionClaims` | Customize Clerk session token with `{{user.public_metadata}}` |
| Role change not working | User must sign out and back in after role is set |
| Hydration error on navbar active links | Extract active link logic into a `"use client"` NavLink component |
| Server Actions invalid in Codespaces | Add `allowedOrigins` to `next.config.js` experimental block |
| Prisma downloading v7 | Use `./node_modules/.bin/prisma`, never `npx prisma` |
| `needs_client_trust` Clerk error | Codespaces-only issue — works fine on Vercel production |
| API calls failing silently on production | Check `next.config.js` — remove `allowedOrigins` for production, it blocks real domains |
| Sign-in redirecting to wrong place | Check `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` in Vercel — must be `/redirect` |

---

## BUILD & DEPLOY WORKFLOW

### Every feature follows this order:
1. Check if it already exists before writing anything
2. Check if any existing component can be reused
3. Update `prisma/schema.prisma` first if new data is needed
4. Run migration: `./node_modules/.bin/prisma migrate dev --name description`
5. Build the API route
6. Build the UI component
7. Verify every file with `cat` after writing
8. Run `npm run build` — fix all errors before committing
9. Commit: `git add -A && git commit -m "feat: description"`
10. Push: `git push origin main`

### Vercel Deployment Checklist
- Framework Preset: **Next.js**
- Remove `allowedOrigins` from `next.config.js` before deploying
- Environment variables required:
  - `DATABASE_URL`, `DIRECT_URL`
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`
  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
  - `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/redirect`
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/redirect`
  - `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- Clerk production instance: session token must be customized
- Clerk production instance: domain must be verified with DNS records
- Custom domain DNS: configured in domain registrar (Porkbun for NGFsystems)