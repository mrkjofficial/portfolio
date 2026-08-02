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
| Rate Limiting | Upstash Redis |
| Analytics | Vercel Analytics, Speed Insights |
| Testing | Playwright (E2E) |
| Package Manager | npm |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run preview      # Build then start production server
npm run lint          # Run ESLint
npm run lint:fix      # Auto-fix lint issues
npm run format:check  # Check Prettier formatting
npm run format:fix    # Apply Prettier formatting
npm run type:check    # TypeScript type check
npm run test           # Run Playwright E2E tests (headless)
npm run test:ui        # Run Playwright tests with interactive UI
npm run test:headed    # Run Playwright tests in headed mode
npm run test:report    # Show last Playwright HTML report
```

## Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── send/         # Contact form API (rate limited, sends via Resend)
│   ├── components/       # Page sections (introduction, about, projects, …)
│   ├── globals.css       # Tailwind config, theme variables, custom breakpoints
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Home page
├── assets/icons/         # SVG icons (imported as React components via @svgr/webpack)
├── components/common/    # Shared UI (header, footer, theme toggle)
├── config/               # Axios client, Upstash Redis client, rate limiter
├── data/index.ts         # Single source of truth for all portfolio content
├── emails/               # React Email templates (contact notification + auto-reply)
├── hooks/                # Custom React hooks
├── providers/            # NextThemesProvider, QueryProvider
├── public/               # Static assets (images, logos, resume PDF)
├── schemas/contact.ts    # Zod schema for contact form
└── tests/                # Playwright E2E test suites
```

## Environment Variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_URL=             # Site URL (used for metadata and Playwright base URL)
NEXT_PUBLIC_API_URL=         # Base URL for Axios client
RESEND_API_KEY=              # Resend API key for sending emails
CONTACT_EMAIL_ADDRESS=       # Recipient address for contact form submissions
PERSONAL_EMAIL_ADDRESS=      # Auto-reply sender/recipient address
UPSTASH_REDIS_REST_URL=      # Upstash Redis REST URL for contact form rate limiting
UPSTASH_REDIS_REST_TOKEN=    # Upstash Redis REST token for contact form rate limiting
```

## Content

All portfolio content — about info, projects, work experience, education, technologies, and navigation links — lives in a single file: `data/index.ts`. Edit only that file to update what appears on the site.

## Testing

E2E tests use Playwright and run against `http://localhost:3000`, served by a production build (`npm run preview`) that starts automatically when the test suite runs — this is required because contact form rate limiting only activates when `NODE_ENV === "production"`. Tests cover all major sections and run across four desktop browsers (Chromium, Firefox, WebKit, Edge) and two mobile viewports (Pixel 5, iPhone 14).

```bash
npm run test           # headless, all browsers
npm run test:headed    # watch the browser
npm run test:ui        # interactive Playwright UI
```

## Deployment

The site is deployed on [Vercel](https://vercel.com). Set the environment variables above in your Vercel project settings and push to the main branch.
