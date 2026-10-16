# Mirza Hammad Baig — Data Analyst & BI Solutions Architect Portfolio

Production portfolio and AI-assisted case-study publishing system for **Mirza Hammad Baig**, operating across enterprise data analytics, Kimball dimensional architecture, business intelligence, teaching, and AI-powered analytics.

---

## Key Features

- **Executive Analytics Design:** Custom design system built with Next.js App Router and vanilla CSS tokens reflecting enterprise BI aesthetics.
- **Embedded Sanity Studio:** Full CMS editorial workflow embedded directly at `/studio`.
- **AI Case-Study Draft Generator:** Server-only engine that converts unstructured Markdown/notes into structured case-study drafts with Kimball dimensional architecture diagrams and supporting visuals.
- **Deterministic Safeguards:** Regex and AST validators prevent metric hallucination, context leakage, unevidenced technologies, and superlatives.
- **Resilient Fallbacks:** Deterministic mock provider for local development, automatic failover from Google Gemini (`gemini-2.5-flash`) to Groq (`qwen-2.5-32b`), and verified fixture fallback when remote Sanity is offline.

---

## Documentation Links

- [**Editorial & Handover Guide (for Hammad)**](docs/sanity-cms-guide.md): Complete instructions for signing in, editing pages, uploading assets (portrait, CV), running the AI generator, reviewing drafts, and publishing.
- [**Product Requirements Document (PRD)**](PRD.md): Core vision, target audiences, integrity rules, and acceptance criteria.
- [**Design Authority Document (DESIGN.md)**](DESIGN.md): Authoritative design system, tokens, typography, grid, and UI specifications.
- [**Milestone Build Plan (TASKS.md)**](TASKS.md): Milestone progress and verified deliverables.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your Sanity project ID and API keys as described in [docs/sanity-cms-guide.md](docs/sanity-cms-guide.md). The application runs out of the box with verified fixture data and the deterministic mock AI provider if no remote credentials are provided.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public site or [http://localhost:3000/studio](http://localhost:3000/studio) to access Sanity Studio.

---

## Verification & Testing Suite

Run the automated test suite:
```bash
npm run test
```

Run TypeScript compilation check:
```bash
npx tsc --noEmit
```

Run ESLint:
```bash
npm run lint
```

Run Next.js production build:
```bash
npm run build
```

---

## Tech Stack

- **Framework:** Next.js 16 (Turbopack, App Router, React Server Components)
- **CMS:** Sanity Studio v3 (`sanity`, `next-sanity`)
- **Validation:** Zod 4
- **AI Providers:** Google Gemini REST API, Groq Cloud (Qwen 2.5 32B), Deterministic Mock Provider
- **Styling:** Vanilla CSS design tokens & Tailwind CSS v4 utility primitives
