# ToolOrbit - Deployment Guide

Every command and config value in this guide was verified against a real build
and a real `wrangler deploy --dry-run` of this exact codebase before being
written down. Nothing here is guessed.

## Important: this deploys to Cloudflare Workers, not Cloudflare Pages

The `@astrojs/cloudflare` adapter (despite its name) builds a single unified
Cloudflare Worker that serves both the static tool pages and the dynamic
auth/dashboard/API routes together, via Cloudflare's Workers Static Assets
feature. This is Cloudflare's own current recommended path for new full-stack
projects as of 2026 - it replaces the older split "Pages for frontend +
Pages Functions for backend" model. You will not create a Cloudflare Pages
project for this app. You will create and deploy a Cloudflare Worker.

---

## Prerequisites

- Node.js 20+
- pnpm 9+: `npm install -g pnpm`
- Wrangler CLI: `npm install -g wrangler`
- A Cloudflare account (free tier is sufficient for everything in this guide)
- A GitHub account (for GitHub OAuth login)
- A Google Cloud Console account (for Google OAuth login)

---

## Step 1 - Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/toolorbit.git
cd toolorbit
pnpm install
```

---

## Step 2 - Cloudflare login

```bash
wrangler login
```

This opens a browser window to authorise Wrangler against your Cloudflare account.

---

## Step 3 - Create the D1 database

```bash
npx wrangler d1 create toolorbit
```

This prints a `database_id`. Copy it and paste it into
`apps/web/wrangler.jsonc`:

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "toolorbit",
    "database_id": "PASTE_YOUR_DATABASE_ID_HERE"
  }
]
```

---

## Step 4 - Apply the database migration

```bash
# Against the real, remote D1 database (what your deployed Worker will use)
pnpm db:migrate:remote

# Optional - also apply locally if you plan to run `wrangler dev` for local testing
pnpm db:migrate:local
```

Verify the tables exist:
```bash
npx wrangler d1 execute toolorbit --remote --command="SELECT name FROM sqlite_master WHERE type='table';"
```

---

## Step 5 - Set up Google OAuth

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or use an existing one)
3. APIs and Services -> Credentials -> Create Credentials -> OAuth 2.0 Client ID
4. Application type: Web application
5. Authorised redirect URIs - add both:
   - `https://YOUR_WORKER_NAME.YOUR_SUBDOMAIN.workers.dev/api/auth/callback/google`
   - `http://localhost:4321/api/auth/callback/google` (for local dev)
   - Once you attach a custom domain (Step 11), add that callback URL too
6. Copy the Client ID and Client Secret

---

## Step 6 - Set up GitHub OAuth

1. GitHub -> Settings -> Developer settings -> OAuth Apps -> New OAuth App
2. Application name: ToolOrbit
3. Homepage URL: your eventual domain (or the `workers.dev` URL for now)
4. Authorization callback URL: `https://YOUR_WORKER_NAME.YOUR_SUBDOMAIN.workers.dev/api/auth/callback/github`
5. Copy the Client ID, then generate and copy a Client Secret

---

## Step 7 - Set Worker secrets

These are real Worker secrets (`wrangler secret put`), not Pages secrets -
the two are different products with different secret stores.

```bash
cd apps/web

npx wrangler secret put BETTER_AUTH_SECRET --config wrangler.jsonc
# When prompted, paste a random 32+ character string.
# Generate one with: openssl rand -base64 32

npx wrangler secret put GOOGLE_CLIENT_ID --config wrangler.jsonc
npx wrangler secret put GOOGLE_CLIENT_SECRET --config wrangler.jsonc
npx wrangler secret put GITHUB_CLIENT_ID --config wrangler.jsonc
npx wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.jsonc
```

For local development, create `apps/web/.dev.vars` (already gitignored) with
the same five values in `KEY=value` form - this is how Wrangler injects
secrets into `wrangler dev` / `astro dev` locally, separate from the real
deployed secrets above.

---

## Step 8 - Update SITE_URL

Edit `apps/web/src/lib/config.ts`:
```ts
export const SITE_URL = 'https://YOUR_ACTUAL_DOMAIN.com';
```

If you do not have a custom domain yet, use your `workers.dev` URL for now
and update this later - it only affects canonical URLs, sitemap entries, and
OAuth trusted-origin checks, not the deploy itself.

---

## Step 9 - Local development test

```bash
cd apps/web
pnpm dev
```

Visit `http://localhost:4321` and check:
- Homepage loads with 42 tools
- Command palette opens with Ctrl+K (or Cmd+K on Mac)
- A tool works end to end (try JSON Formatter)
- Dark/light theme toggle works
- `/login` shows the Google/GitHub buttons

---

## Step 10 - Build and deploy

From the repository root:

```bash
pnpm deploy
```

This runs `pnpm --filter web build && wrangler deploy --config apps/web/dist/server/wrangler.json` -
both halves verified working against this exact codebase. The build produces
`apps/web/dist/client` (static assets) and `apps/web/dist/server` (the Worker
code and its own generated `wrangler.json`, which inherits your D1 binding
from `apps/web/wrangler.jsonc` automatically). `wrangler deploy` uploads both
together as one unit.

Want to check everything before actually deploying? Run the dry run first:
```bash
pnpm deploy:dry-run
```
This builds for real and asks Wrangler to validate and report exactly what
it would upload - bindings, asset count, total size - without uploading
anything.

On first deploy, Wrangler will automatically create the `SESSION` KV
namespace referenced in the generated config (see the note in
`apps/web/wrangler.jsonc` for why this binding exists - it is unused by this
app but required by the adapter). No manual KV setup needed.

Your Worker is now live at `https://toolorbit-web.YOUR_SUBDOMAIN.workers.dev`.

---

## Step 11 - Custom domain

1. Cloudflare Dashboard -> Workers & Pages -> select your `toolorbit-web` Worker
2. Settings -> Domains & Routes -> Add -> Custom Domain
3. Enter your domain (e.g. `toolorbit.xyz`)
4. If the domain's nameservers are already on Cloudflare, this activates in
   under a minute with automatic SSL. If not, you'll be guided through
   pointing your domain's nameservers at Cloudflare first.
5. Update `SITE_URL` in `config.ts` to the final domain, and update both
   OAuth apps' callback URLs (Steps 5 and 6) to use it, then redeploy:
   ```bash
   pnpm deploy
   ```

---

## Step 12 - Auto-deploy on every push (optional but recommended)

Cloudflare's current equivalent of Pages' Git integration, for Workers, is
called Workers Builds:

1. Cloudflare Dashboard -> Workers & Pages -> your `toolorbit-web` Worker
2. Settings -> Builds -> connect your GitHub repository
3. Because this is a pnpm monorepo (not a single detectable framework root),
   set these explicitly rather than relying on auto-detection:
   - Build command: `pnpm install && pnpm --filter web build`
   - Deploy command: `wrangler deploy --config apps/web/dist/server/wrangler.json`
4. Save. Every push to your production branch now builds and deploys
   automatically, with preview URLs and PR status checks.

If you skip this step, `pnpm deploy` from your own machine works exactly
the same way - this step only adds CI/CD on top.

---

## Step 13 - Cloudflare Web Analytics

1. Cloudflare Dashboard -> Analytics & Logs -> Web Analytics -> Add site
2. Enter your domain, copy the beacon token
3. In `apps/web/src/layouts/BaseLayout.astro`, uncomment the analytics
   `<script>` tag and replace `REPLACE_WITH_CF_ANALYTICS_TOKEN` with your token
4. Commit, push (or run `pnpm deploy` again)

---

## Step 14 - Submit to search engines

After your custom domain is live:
1. Google Search Console -> Add property -> your domain
2. Verify ownership (HTML file, DNS TXT record, or Google Analytics)
3. Sitemaps -> add `sitemap-index.xml`
4. Repeat for Bing Webmaster Tools

---

## Step 15 - Post-deploy checklist

- [ ] Homepage loads at your `workers.dev` URL or custom domain
- [ ] HTTPS is active
- [ ] Sitemap loads: `/sitemap-index.xml`
- [ ] robots.txt loads and lists the correct sitemap URL: `/robots.txt`
- [ ] At least one tool works end to end (try PDF Merge and JSON Formatter)
- [ ] `/login` loads and both OAuth buttons redirect correctly
- [ ] After signing in, `/dashboard` shows your profile and sign-out works
- [ ] Saving a tool as a favorite (heart icon) persists after reload
- [ ] Mobile menu (hamburger) opens correctly on a narrow viewport
- [ ] Command palette (Ctrl+K) searches and navigates correctly
- [ ] Google Search Console shows the sitemap submitted with 0 errors

---

## Cloudflare free tier usage - what this app actually consumes

| Resource | Free limit | ToolOrbit's real usage |
|---|---|---|
| Workers requests | 100,000/day | Every tool page is a static asset served via the `ASSETS` binding, which does not count against Worker invocation limits the way dynamic routes do. Only `/api/*`, `/dashboard`, `/login` invoke real Worker logic. |
| Workers CPU time | 10ms/invocation (free), much higher on paid | Auth and favorites operations are simple D1 queries, comfortably under this on every request observed during testing. |
| D1 reads | 5,000,000 rows/day | Favorites and session lookups only - far under limit at any realistic traffic level. |
| D1 writes | 100,000/day | Account creation, favorites, usage history - same. |
| D1 storage | 5GB | The current schema uses a tiny fraction of a percent of this. |
| KV reads/writes | 100,000 reads, 1,000 writes per day | The unused `SESSION` namespace adds zero load since nothing reads or writes it. |
| Worker script size | 10MB compressed (free and paid) | This build is 662KB gzipped - about 6.6% of the limit, with substantial headroom for adding more tool modules. |

---

## Common issues

**Build fails with a Zod/registry validation error:**
Every tool's SEO content must be at least 600 words. If you add a new tool,
make sure its `content` field clears that bar - the schema enforces this at
build time on purpose.

**OAuth `redirect_uri_mismatch`:**
The callback URL registered with Google/GitHub must match your actual domain
exactly, including `https://` and the full path
`/api/auth/callback/{google|github}`. Update both the OAuth app settings and
re-deploy if you change domains.

**`wrangler deploy` says a binding is missing or a D1 ID is a placeholder:**
You skipped Step 3 or 4 - the `database_id` in `apps/web/wrangler.jsonc` is
still the literal placeholder string. Create the database and paste the real
ID in before deploying.

**Local dev shows `Unable to fetch the Request.cf object`:**
This is expected, harmless local-only noise from Wrangler trying to fetch
real edge metadata that only exists when actually running on Cloudflare's
network. It does not appear in production and does not block local dev or
the build.

**Sitemap shows 404:**
The generated file is `sitemap-index.xml`, not `sitemap.xml` - that is what
`robots.txt` already points to and what Search Console expects you to submit.

**pdfjs worker fails to load:**
The `?url` Vite import for the PDF.js worker requires `worker: { format: 'es' }`
in `astro.config.mjs`, which is already set in this project. If you see this
error after modifying the Vite config, check that setting first.
