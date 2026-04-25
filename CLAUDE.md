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

## Architecture

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · HeroUI 3

### Content & Data

All portfolio content lives in a single file: [data/index.ts](data/index.ts). This is the source of truth for everything rendered on the page — about info, projects, work experience, education, technologies, and links. When updating portfolio content, edit only this file.

### Page Structure

The home page ([app/page.tsx](app/page.tsx)) composes section components from [app/components/](app/components/):
- `introduction.tsx`, `information.tsx`, `about.tsx`
- `technologies.tsx`, `projects.tsx`, `work.tsx`, `education.tsx`, `contact.tsx`

Reusable UI components (header, footer, theme toggle) are in [components/common/](components/common/).

Providers (`NextThemesProvider`, `QueryProvider`) wrap the layout in [providers/](providers/) and are registered in [app/layout.tsx](app/layout.tsx).

### API Routes

- `POST /api/send` — Contact form handler. Sends a notification email + auto-reply via Resend. Service functions in [app/api/send/services/](app/api/send/services/).
- `POST /api/download` — Serves files from Vercel Blob storage. Service in [app/api/download/services/](app/api/download/services/).

### Contact Form Flow

`contact.tsx` → Zod schema ([schemas/contact.ts](schemas/contact.ts)) → React Hook Form + `zodResolver` → TanStack Query mutation → `POST /api/send` → Resend API (two emails: [emails/contact.tsx](emails/contact.tsx) + [emails/reply.tsx](emails/reply.tsx))

### Assets

SVG icons live in [assets/icons/](assets/icons/) and are imported as React components (via `@svgr/webpack` configured in [next.config.ts](next.config.ts)). All icons are re-exported from [assets/index.ts](assets/index.ts).

### Testing

E2E tests use Playwright and live in [tests/](tests/). They run against `http://localhost:3000` (auto-started by `npm run dev`). There are no unit or integration tests — all coverage is end-to-end.

### Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_URL` | Site URL for metadata and Playwright base URL |
| `NEXT_PUBLIC_API_URL` | Base URL for Axios client ([config/axios.ts](config/axios.ts)) |
| `RESEND_API_KEY` | Resend email service |
| `CONTACT_EMAIL_ADDRESS` | Recipient for contact form messages |
| `PERSONAL_EMAIL_ADDRESS` | Auto-reply sender/recipient |
| `BLOB_PATH` | Vercel Blob path for resume file |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob access token |

### Styling Conventions

- Tailwind CSS 4 via PostCSS — no `tailwind.config.js`, configuration is in [app/globals.css](app/globals.css) or `postcss.config.mjs`
- Custom breakpoint `xs` = 512px defined via `@theme inline` in globals.css
- Prettier uses tabs (not spaces) and 250-char print width with the Tailwind plugin
- HeroUI component library for pre-built UI primitives; theme CSS variables are in [app/globals.css](app/globals.css)
- Path alias `@*` maps to the project root (e.g. `@data`, `@components/common/header`)

### React Compiler

`reactCompiler: true` is set in [next.config.ts](next.config.ts). The compiler handles memoization automatically — do not add manual `useMemo`, `useCallback`, or `React.memo` calls.
