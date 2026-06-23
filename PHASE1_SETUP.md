# Phase 1 Setup Guide

Phase 1 adds 26 new tools across 4 modules and a full auth/dashboard layer.
Everything below must be completed before deploying.

---

## 1. Install dependencies

```bash
pnpm install
```

---

## 2. Provision the D1 database

```bash
# Create the database (run once)
npx wrangler d1 create toolorbit
```

Copy the `database_id` from the output and paste it into `apps/web/wrangler.jsonc`:

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "toolorbit",
    "database_id": "YOUR_ID_HERE"   // <-- paste here
  }
]
```

Then run the migration:

```bash
# Remote (production)
pnpm db:migrate:remote

# Local dev
pnpm db:migrate:local
```

---

## 3. Set OAuth credentials

In your Cloudflare Pages project dashboard, go to **Settings > Environment variables** and add:

| Variable | Description |
|---|---|
| `GOOGLE_CLIENT_ID` | Google OAuth app client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth app client secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret |

For local dev, create `apps/web/.dev.vars`:

```
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
GITHUB_CLIENT_ID=your_id
GITHUB_CLIENT_SECRET=your_secret
```

**Google OAuth callback URL:** `https://YOUR_DOMAIN/api/auth/callback/google`
**GitHub OAuth callback URL:** `https://YOUR_DOMAIN/api/auth/callback/github`

---

## 4. Update the allowed origin in auth.ts

Open `apps/web/src/lib/auth.ts` and update `trustedOrigins` with your actual domain:

```ts
trustedOrigins: [
  'https://toolorbit.pages.dev',
  'https://www.toolorbit.xyz', // your custom domain
],
```

---

## 5. Build and deploy

```bash
pnpm build
```

Deploy via Cloudflare Pages git integration or:

```bash
npx wrangler pages deploy dist/client
```

---

## Free tier impact (Cloudflare)

| Resource | Phase 1 usage | Free limit |
|---|---|---|
| Workers requests | Only `/api/*` and `/dashboard` — all 30+ tool pages are static | 100,000 / day |
| D1 reads | ~2 reads per dashboard visit (favorites + history) | 5M / day |
| D1 writes | 1 write per tool use (usage_history) | 100K / day |
| D1 storage | Minimal (text only, no blobs) | 5 GB |

All PDF, image, text, and calculator processing runs in the user's browser.
No Workers invocations occur for those tools.

---

## New packages added

| Package | Contents |
|---|---|
| `packages/tools-pdf` | 8 PDF tool definitions |
| `packages/tools-image` | 6 image tool definitions |
| `packages/tools-text` | 6 text tool definitions |
| `packages/tools-calculators` | 6 calculator tool definitions |
| `packages/db` | Drizzle schema + type exports |
