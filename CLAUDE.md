# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **pnpm** (see `pnpm-lock.yaml`, `Dockerfile` uses `corepack`). `.npmrc` hoists `@heroui/*`.

```bash
pnpm dev              # Next.js dev server (http://localhost:3000)
pnpm build            # production build (output: standalone)
pnpm start            # run built app
pnpm lint             # ESLint (eslint-config-next + TS rules)
pnpm format           # Prettier write
pnpm format:check     # Prettier check
```

No test runner configured — there are no tests.

## Stack

- **Next.js 16** App Router, React 19, TypeScript 6, Tailwind v4 (`@tailwindcss/postcss`).
- **next-intl 4** for i18n. **HeroUI v3** + `@heroui/styles`. Animations: `framer-motion`, smooth scroll: `lenis`. Forms: `react-hook-form`. Carousels: `swiper`. GA: `@next/third-parties`.
- Path alias `@/*` → repo root (see `tsconfig.json`).
- Output mode `standalone` for Docker. `next.config.ts` allowlists remote images on `*.ufs.sh/f/**` (UploadThing).

## Architecture

### Locale routing

- Locales: `["en", "ar"]`, default `en`, `localePrefix: "always"` → every URL is `/{en|ar}/...`. Defined in `i18n/routing.ts`.
- Middleware lives in `proxy.ts` (NOT `middleware.ts`) — Next 16 picks it up via the route matcher `/((?!api|trpc|_next|_vercel|.*\\..*).*)`.
- All pages live under `app/[locale]/`. Always `await params` then `setRequestLocale(locale)` at the top of server components/pages.
- Client navigation: import `Link`, `useRouter`, `usePathname`, `redirect` from `@/i18n/navigation` (NOT from `next/link` / `next/navigation`) so locale prefixes are preserved.
- Arabic is RTL: `app/[locale]/layout.tsx` sets `dir={locale === "ar" ? "rtl" : "ltr"}` and swaps font (`ibmPlexSansArabic` for `ar`, `satoshi` for `en`, both from `assets/font`).

### Translations (`messages/{en,ar}.json`)

- `i18n/types.d.ts` types `next-intl` from `messages/en.json` — keys are statically checked. Keep `en.json` and `ar.json` in lockstep; add every key to both files.
- Use `useTranslations()` / `getTranslations()`; never hardcode user-facing strings. Nested keys by feature (`Header.nav.home`).
- See `.cursor/rules/translations.mdc` for the full rule.

### CMS integration (`lib/website-cms.ts`)

This is a **headless** site — content, SEO, theme, logos, projects come from an external CMS. The frontend has no DB.

- Single env var `WEBSITE_CMS_API_BASE` (server) — also baked at build time into `NEXT_PUBLIC_WEBSITE_CMS_API_BASE` (Dockerfile passes both as `ARG`/`ENV`). When unset, every fetcher returns `null`/`[]` so the site renders an empty/skeleton state instead of crashing.
- All fetchers wrapped in `cache()` (React) + Next `fetch` with `next: { revalidate: 60 }`.
- `lib/website-cms.ts` exports the canonical types (`HomePageContent`, `AboutPageContent`, `ContactPageContent`, `ProjectsPageContent`, `PublicProject`, `PageSeo`, `SiteSettings`, ...) and normalizers that defensively coerce CMS JSON into the strict app shape — the CMS schema is loose, the app shape is strict. Each `normalize*` handles legacy field aliases (e.g. `eyebrow` ↔ `eyebrowTitle`, `visionMissionSection` ↔ `visionSection`, `firstTitle` ↔ `qualityTitle`).
- `buildMetadataFromSeo(seo, settings)` produces a Next `Metadata` object with page → site fallback. Each page's `generateMetadata` calls `getPageSeo(slug, locale)` + `getSiteSettings(locale)` and feeds them in.
- **Endpoint paths (actual code):** `/api/public/content/{slug}`, `/api/public/projects`, `/api/public/projects/{slug}`, `/api/public/projects/{slug}/seo`, `/api/public/seo/{slug}`, `/api/public/settings`. Note: `WEBSITE_CMS_AND_SEO.md` documents an older `/api/public/website/...` prefix — code is the source of truth.
- `WEBSITE_CMS_AND_SEO.md` documents the contract, content shape per slug (`home`, `about`, `contact`, `projects`), and the `POST /api/public/contact` form endpoint.

### Theme & site settings flow

`app/[locale]/layout.tsx`:
1. Fetches `getSiteSettings(locale)` once per request (cached).
2. Injects CMS-driven theme colors as CSS vars (`--primary`, `--secondary`, `--accent`, ...) via inline `<style>` in `<head>` — these override the defaults in `app/globals.css`. Tailwind tokens map back via `@theme inline`.
3. Mounts `<GoogleAnalytics gaId={...}>` from CMS-provided ID.
4. Wraps tree in `NextIntlClientProvider` → `<Providers>` (`SiteSettingsProvider` + `<LenisScroll />`).
5. Client components reach settings via `useSiteSettings()` from `app/[locale]/_components/site-settings-context.tsx`.

`DEFAULT_THEME` in `lib/website-cms.ts` is the fallback when CMS is unreachable.

### Page composition pattern

Pages under `app/[locale]/<route>/page.tsx` are server components that:
1. `await params` → `setRequestLocale`.
2. `Promise.all` fetch the page's CMS content + any project lists + SEO.
3. `notFound()` when the required content (e.g. hero section) is missing.
4. Render section components from `_components/` and pass a typed `content` prop. Sections check `isActive` flags (e.g. `statsSection`, `partnersSection`, `boardSection`) before rendering.

Co-located `_components/` folders are private to each route (Next App Router convention — leading underscore opts the folder out of routing).

## Deployment

- `Dockerfile` is a multi-stage `node:20-alpine` build using pnpm + Next standalone output. Image runs as non-root `nextjs` (uid 1001) on port 3000.
- `docker-compose.yml` deploys behind Traefik with TLS (`letsencrypt`) for `wahdomrania.sa` + `www.wahdomrania.sa`.
- Build args required: `WEBSITE_CMS_API_BASE`, `NEXT_PUBLIC_WEBSITE_CMS_API_BASE` (both must be set at build time so the public one is inlined into client bundles).

## Conventions

- Prettier: no semicolons, double quotes, 80 cols, 2-space tabs, trailing commas `es5`. Plugins: `@trivago/prettier-plugin-sort-imports` (order: react → next → 3rd-party → `@/*` → relative) and `prettier-plugin-tailwindcss`.
- ESLint: `eslint-config-next/core-web-vitals` + `/typescript`.
- TypeScript `strict: true`. Treat CMS responses as `unknown` and normalize at the boundary (the existing `str()` / `asRecord()` helpers in `website-cms.ts` are the pattern).
