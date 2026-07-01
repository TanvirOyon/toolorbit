# ToolOrbit

Free, fast, privacy-respecting online tools that run entirely in your browser. Built with Astro 6,
React islands, Tailwind v4, and Cloudflare Pages.

This is **Phase 0 - Initial Deploy**, per `ToolOrbit_Master_Blueprint.md` and
`ToolOrbit_Modular_Development_Plan.md`. It is a complete, real, buildable site - not a scaffold.

## Status: builds clean, 16 pages, verified

```
pnpm install
pnpm --filter web build
```

produces 16 fully static pages (homepage, 10 tool pages, 1 category hub, 4 trust pages) with zero
build errors. Verified: valid JSON-LD on every tool page, correct per-page JS code-splitting
(each tool page only loads its own island's chunk, not all 10), sitemap, robots.txt, and OG image
all present in the output.

## What's built

- **Monorepo**: pnpm workspaces - `apps/web` (the Astro app) + `packages/{tool-registry, ui,
  tools-dev, config}`
- **10 developer tools**, each a `client-pure` React island: JSON Formatter, JSON Minifier,
  Base64 Codec, URL Codec, UUID Generator, Password Generator, Hash Generator (MD5/SHA-1/256/512),
  Regex Tester, JWT Decoder, Lorem Ipsum Generator
- **Design system**: "Cinematic Darkness" dark theme (default) + a real light-theme override,
  DM Sans display / Inter body / JetBrains Mono code, self-hosted via `@fontsource` (no third-party
  font requests), the signature iris/aperture processing animation with `prefers-reduced-motion`
  support
- **Command palette** (⌘K): `cmdk` + `fuse.js`, fuzzy search over a build-time JSON snapshot -   zero network calls
- **SEO infrastructure**: per-tool `SoftwareApplication` + `FAQPage` JSON-LD, sitemap via
  `@astrojs/sitemap`, deliberate `robots.txt` (welcomes Google/Bing, blocks GPTBot/CCBot/
  Google-Extended/ClaudeBot/Applebot-Extended), canonical URLs, semantic HTML
- **Trust pages**: About, Privacy, Contact, Terms - all real, working content (see TODOs below for
  the two launch items already set)
- **Tool registry**: Zod-validated at build time - a malformed SEO field fails the build instead of
  shipping a broken page

## Open items from the blueprint - now resolved

| Question | Resolution |
|---|---|
| Display font | **DM Sans** (your choice) |
| Domain | Configured for `https://toolorbit.pages.dev` until a custom domain is attached |
| GitHub repo | Created and pushed from this workspace |
| pdf-lib password-protect | Not relevant to Phase 0 (no PDF tools yet); still flagged for Phase 1 |

## Launch checks

1. **`apps/web/src/pages/about.astro`** - updated to use your real name, Tanvirul Gani Oyon, for AdSense and E-E-A-T.
2. **`apps/web/src/pages/contact.astro`** - updated to use `tanviroyon001@gmail.com`.

## Known issues found and fixed during the build (read this before touching the Cloudflare config)

Three real bugs surfaced only when actually running `astro build` against this Astro 6.4.8 /
`@astrojs/cloudflare` 13.7.0 combo - none of these were visible just from reading the blueprint's
example code, so they're documented here in case you hit them again after an upgrade:

1. **`imageService: 'compile'` / default `'cloudflare-binding'` mode breaks the build.** Both
   trigger an internal Cloudflare Images sub-build that auto-generates a binding named `ASSETS`,
   which collides with a name Cloudflare Pages reserves for itself - `astro build` fails outright.
   Fixed by setting `imageService: 'passthrough'` in `astro.config.mjs` (correct anyway, since
   Phase 0 has zero `<Image>` usage).

2. **A custom `wrangler.jsonc` with `pages_build_output_dir` breaks the build.** That field forces
   wrangler into strict "Pages mode" validation, which then rejects the adapter's own
   auto-generated `ASSETS` binding as reserved. Fixed by removing `pages_build_output_dir` -    `astro build` auto-generates a working `wrangler.json` inside `dist/client/` on its own. The
   `wrangler.jsonc` now in the repo is just a placeholder for Phase 1 D1/KV bindings; **don't** add
   `pages_build_output_dir` back to it. Also explicitly set `session: { driver:
   sessionDrivers.memory() }` in `astro.config.mjs`, otherwise the adapter auto-enables a `SESSION`
   KV binding (unused in Phase 0) that would need a real KV namespace just to deploy.

3. **The blueprint's literal dynamic-import pattern for tool islands doesn't actually work.**
   `const ToolComponent = (await import(...)).default` followed by `<ToolComponent client:idle />`
   is a documented core Astro limitation (withastro/astro#11701) - Astro's compiler needs the
   literal imported identifier right at the `<Component client:directive />` usage site to wire up
   hydration; an indirectly-resolved component silently fails with `NoMatchingImport`. Fixed in
   `apps/web/src/pages/tools/[slug].astro` by statically importing every tool island and selecting
   the right one with a plain string-equality conditional chain. **When you add a new tool, add it
   in two places**: a static import line, and one conditional render line. Per-page JS bundling is
   unaffected - each generated page's HTML still only references its own tool's chunk, verified in
   the build output.

## Deploying to Cloudflare Pages

For Phase 0 (pure static, no D1/KV/auth yet):

1. Push this repo to GitHub.
2. In the Cloudflare dashboard, connect Pages to the repo.
3. Build command: `npm run build`
4. Build output directory: `dist` (the root `postbuild` step mirrors `apps/web/dist/client` into
   `dist` for Pages)
5. SSL and the `*.pages.dev` subdomain are automatic. Attach your real domain when ready, then
   update `SITE_URL` in `astro.config.mjs` and `apps/web/src/lib/seo.ts`.

## Project structure

```
toolorbit/
├── apps/web/                 # the Astro app
│   ├── src/
│   │   ├── pages/             # index, tools/[slug], [category]-tools, trust pages
│   │   ├── layouts/           # BaseLayout, ToolLayout
│   │   ├── components/        # Header, Footer, cards, breadcrumbs (.astro, non-hydrated)
│   │   ├── islands/           # CommandPalette, ThemeToggle, islands/tools/* (React, hydrated)
│   │   └── lib/                # seo.ts (JSON-LD builders), registry.ts (re-export), md5.ts
│   └── public/                 # fonts dir (unused - fonts are bundled via @fontsource),
│                                # favicon.svg, og-default.png, robots.txt
├── packages/
│   ├── tool-registry/          # ToolDefinition types + Zod schema + registry merger
│   ├── tools-dev/               # the 10 dev tool definitions (metadata + SEO content)
│   ├── ui/                      # ToolShell, IrisAnimation, Button/Card/Input/Textarea, etc.
│   └── config/                  # shared tsconfig + eslint
└── pnpm-workspace.yaml
```

## Next steps (Phase 1+, per the Modular Development Plan)

PDF Tools → Image Tools → Text/Calculator Tools → Accounts & Dashboard (Better Auth + D1) →
Security hardening (WAF, Turnstile) → SEO depth pass + Blog → SEO Tools → gated AI Tools → Premium
& Payments → PWA + Bangla → API marketplace. Each ships as an independent `packages/tools-*`
module per the plan - no changes needed to the dev tools module already built here.
