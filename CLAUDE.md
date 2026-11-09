# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run preview      # Build then start production server
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix lint issues
npm run format:check # Check Prettier formatting
npm run format:fix   # Apply Prettier formatting
npm run type:check   # TypeScript type check (no emit)
npm run test         # Run Playwright E2E tests (headless)
npm run test:ui      # Run Playwright tests with interactive UI
npm run test:headed  # Run Playwright tests in headed mode
npm run test:report  # Show last Playwright HTML report
```

To run a single Playwright spec or test, pass a path/grep straight to the CLI (there's no dedicated npm script for it):

```bash
npx playwright test tests/contact.spec.ts --project=chromium
npx playwright test --grep "rate limit"
```

## Architecture

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · HeroUI 3 · Framer Motion

### Content & Data

All portfolio content lives in a single file: [data/index.ts](data/index.ts). This is the source of truth for everything rendered on the page — about info, projects, work experience, education, technologies, and links (including the resume, which is a static file served from [public/karan-jaiswal.pdf](public/karan-jaiswal.pdf), not an API route). When updating portfolio content, edit only this file.

### Page Structure

The home page ([app/page.tsx](app/page.tsx)) renders `About` as a persistent sidebar, with the remaining sections scrolling inside a `ScrollShadow` container. Section components live in [app/components/](app/components/):
- `introduction.tsx`, `information.tsx`, `about.tsx`
- `technologies.tsx`, `projects.tsx`, `work.tsx`, `education.tsx`, `contact.tsx`

Reusable UI components (header, footer, theme toggle) are in [components/common/](components/common/). Custom hooks live in [hooks/](hooks/) (e.g. `useThemeToggle`, used by the theme toggle button).

Providers (`QueryProvider`, `NextThemesProvider`) wrap the layout in [providers/](providers/) and are registered in [app/layout.tsx](app/layout.tsx), along with Vercel Analytics/Speed Insights and the HeroUI `Toast.Provider`. SEO/metadata special files ([app/sitemap.ts](app/sitemap.ts), [app/robots.ts](app/robots.ts), [app/manifest.ts](app/manifest.ts), [app/not-found.tsx](app/not-found.tsx)) sit alongside `layout.tsx`.

### API Routes

- `POST /api/send` — Contact form handler. Checks run in this order: IP rate limit (5 requests / 10 min → 429), Zod validation (→ 400), Cloudflare Turnstile token ([lib/verifyTurnstile.ts](lib/verifyTurnstile.ts), missing/invalid → 403), global daily cap (50 sends / day → 429), then sends a notification email via Resend. The auto-reply is only sent if that recipient address hasn't had one in the last 24 hours (keyed by a SHA-256 hash of the address, never the raw email); otherwise the message is still delivered without it. All limiters live in [config/ratelimit.ts](config/ratelimit.ts) and are checked through [lib/checkRateLimit.ts](lib/checkRateLimit.ts), which never throws. If Redis or Turnstile verification is unavailable, the route fails closed with 503 and sends nothing. Service functions in [app/api/send/services/](app/api/send/services/).

### Contact Form Flow

`contact.tsx` → Zod schema ([schemas/contact.ts](schemas/contact.ts)) → React Hook Form + `zodResolver` → TanStack Query mutation → `POST /api/send` → Resend API (two emails: [emails/contact.tsx](emails/contact.tsx) + [emails/reply.tsx](emails/reply.tsx)).

The 429 rate-limit response is deliberately returned as JSON (`{ message }`), same as every other response from this route — `contact.tsx`'s `onError` reads `error.response.data.message` directly to populate the error toast, so any new response body from this route must keep that shape or the frontend needs a matching update.

### Assets

SVG icons live in [assets/icons/](assets/icons/) and are imported as React components (via `@svgr/webpack` configured in [next.config.ts](next.config.ts)). All icons are re-exported from [assets/index.ts](assets/index.ts).

### Testing

E2E tests use Playwright and live in [tests/](tests/). They run against `http://localhost:3000`, auto-started via `npm run preview` (production build) rather than `npm run dev` — this is required because rate limiting in [app/api/send/route.ts](app/api/send/route.ts) only activates when `NODE_ENV === "production"`. Tests that hit `/api/send` directly (in [tests/api.spec.ts](tests/api.spec.ts)) must pass a unique `x-forwarded-for` header per test so they don't share a rate-limit bucket with each other. There are no unit or integration tests — all coverage is end-to-end, across chromium, firefox, webkit, edge, mobile-chrome, and mobile-safari projects ([playwright.config.ts](playwright.config.ts)).

### Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_URL` | Site URL for metadata and Playwright base URL |
| `NEXT_PUBLIC_API_URL` | Base URL for Axios client ([config/axios.ts](config/axios.ts)) |
| `RESEND_API_KEY` | Resend email service |
| `CONTACT_EMAIL_ADDRESS` | Recipient for contact form messages |
| `PERSONAL_EMAIL_ADDRESS` | Auto-reply sender/recipient |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL for rate limiting ([config/redis.ts](config/redis.ts)) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token for rate limiting ([config/redis.ts](config/redis.ts)) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key for the contact form widget; if unset, the widget isn't rendered |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key ([lib/verifyTurnstile.ts](lib/verifyTurnstile.ts)); if unset, valid submissions get 503. Use Cloudflare's test keys locally |

### Styling Conventions

- Tailwind CSS 4 via PostCSS — no `tailwind.config.js`, configuration is in [app/globals.css](app/globals.css) or `postcss.config.mjs`
- Custom breakpoint `xs` = 512px defined via `@theme inline` in globals.css
- Prettier uses tabs (not spaces) and 250-char print width with the Tailwind plugin
- HeroUI component library for pre-built UI primitives; theme CSS variables are in [app/globals.css](app/globals.css)
- Path alias `@*` maps to the project root (e.g. `@data`, `@components/common/header`)

### React Compiler

`reactCompiler: true` is set in [next.config.ts](next.config.ts). The compiler handles memoization automatically — do not add manual `useMemo`, `useCallback`, or `React.memo` calls.
