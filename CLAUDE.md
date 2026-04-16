# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix lint issues
npm run format:check # Check Prettier formatting
npm run format:fix   # Apply Prettier formatting
npm run type:check   # TypeScript type check (no emit)
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

### API Routes

- `POST /api/send` — Contact form handler. Sends a notification email + auto-reply via Resend. Service functions in [app/api/send/services/](app/api/send/services/).
- `POST /api/download` — Serves files from Vercel Blob storage. Service in [app/api/download/services/](app/api/download/services/).

### Contact Form Flow

`contact.tsx` → Zod schema ([schemas/contact.ts](schemas/contact.ts)) → React Hook Form + `zodResolver` → TanStack Query mutation → `POST /api/send` → Resend API (two emails: [emails/contact.tsx](emails/contact.tsx) + [emails/reply.tsx](emails/reply.tsx))

### Assets

SVG icons are React components in [assets/icons/](assets/icons/) and re-exported from [assets/index.ts](assets/index.ts).

### Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_URL` | Site URL for metadata |
| `RESEND_API_KEY` | Resend email service |
| `CONTACT_EMAIL_ADDRESS` | Recipient for contact form messages |
| `PERSONAL_EMAIL_ADDRESS` | Auto-reply sender/recipient |
| `BLOB_PATH` | Vercel Blob path for resume file |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob access token |

### Styling Conventions

- Tailwind CSS 4 via PostCSS — no `tailwind.config.js`, configuration is in CSS or `postcss.config.mjs`
- Prettier is configured with tabs (not spaces) and 320-char line width with the Tailwind plugin
- HeroUI component library for pre-built UI primitives
- Path alias `@/*` maps to the project root
