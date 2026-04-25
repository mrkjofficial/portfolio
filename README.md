# Karan Jaiswal — Portfolio

Personal portfolio website built with Next.js, showcasing projects, work experience, education, and a contact form.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, HeroUI 3, Tailwind CSS 4 |
| Language | TypeScript |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack Query, Axios |
| Email | Resend, React Email |
| File Storage | Vercel Blob |
| Analytics | Vercel Analytics, Speed Insights |
| Testing | Playwright (E2E) |
| Package Manager | pnpm |

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

```bash
pnpm dev            # Start dev server (Turbopack)
pnpm build          # Production build
pnpm start          # Start production server
pnpm preview        # Build then start production server
pnpm lint           # Run ESLint
pnpm lint:fix       # Auto-fix lint issues
pnpm format:check   # Check Prettier formatting
pnpm format:fix     # Apply Prettier formatting
pnpm type:check     # TypeScript type check
pnpm test           # Run Playwright E2E tests (headless)
pnpm test:ui        # Run Playwright tests with interactive UI
pnpm test:headed    # Run Playwright tests in headed mode
pnpm test:report    # Show last Playwright HTML report
```

## Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── send/          # Contact form API (Resend)
│   │   └── download/      # Resume download API (Vercel Blob)
│   ├── components/        # Page sections (introduction, about, projects, …)
│   ├── globals.css        # Tailwind config, theme variables, custom breakpoints
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── assets/icons/          # SVG icons (imported as React components via @svgr/webpack)
├── components/common/     # Shared UI (header, footer, theme toggle)
├── config/                # Axios client
├── data/index.ts          # Single source of truth for all portfolio content
├── emails/                # React Email templates (contact notification + auto-reply)
├── hooks/                 # Custom React hooks
├── providers/             # NextThemesProvider, QueryProvider
├── public/                # Static assets (images, logos, resume PDF)
├── schemas/contact.ts     # Zod schema for contact form
└── tests/                 # Playwright E2E test suites
```

## Environment Variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_URL=             # Site URL (used for metadata and Playwright base URL)
NEXT_PUBLIC_API_URL=         # Base URL for Axios client
RESEND_API_KEY=              # Resend API key for sending emails
CONTACT_EMAIL_ADDRESS=       # Recipient address for contact form submissions
PERSONAL_EMAIL_ADDRESS=      # Auto-reply sender/recipient address
BLOB_PATH=                   # Vercel Blob path for the resume file
BLOB_READ_WRITE_TOKEN=       # Vercel Blob access token
```

## Content

All portfolio content — about info, projects, work experience, education, technologies, and navigation links — lives in a single file: `data/index.ts`. Edit only that file to update what appears on the site.

## Testing

E2E tests use Playwright and run against `http://localhost:3000`. The dev server starts automatically when running the test suite. Tests cover all major sections and run across four desktop browsers (Chromium, Firefox, WebKit, Edge) and two mobile viewports (Pixel 5, iPhone 14).

```bash
pnpm test           # headless, all browsers
pnpm test:headed    # watch the browser
pnpm test:ui        # interactive Playwright UI
```

## Deployment

The site is deployed on [Vercel](https://vercel.com). Set the environment variables above in your Vercel project settings and push to the main branch.
