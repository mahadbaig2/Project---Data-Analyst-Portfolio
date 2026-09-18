# Build Plan

This plan deliberately contains only five milestones. Finish and verify each milestone before expanding scope. Tasks within a milestone may be implemented together where that shortens delivery.

## Milestone 1 — Foundation and Shared UI

**Outcome:** The default Next.js shell becomes a coherent, responsive portfolio foundation matching `DESIGN.md`.

- [x] Read the relevant bundled Next.js 16 documentation before using version-sensitive APIs.
- [x] Establish tokens, typography, global styles, icon strategy, reusable UI primitives, content widths, and 12-column grid behavior.
- [x] Build one canonical responsive application shell: desktop sidebar, mobile header/drawer, navigation, footer, active states, skip link, and focus behavior.
- [x] Define core TypeScript content interfaces and temporary fixture data so page development is not blocked by Sanity.
- [x] Create the public route skeletons with metadata, loading, error, not-found, and empty states.
- [x] Verify lint, production build, desktop/mobile navigation, and baseline accessibility.

**Done when:** Every route loads inside the same polished shell, the navigation model is consistent, and no default Next.js UI remains.

## Milestone 2 — Public Portfolio and Real Content

**Outcome:** All public pages are complete using reusable components and verified content.

- [x] Implement Home, Work, reusable Case Study, Experience, Expertise, Teaching, Writing, and About/Contact using the Stitch screenshots as references and `DESIGN.md` as the system authority.
- [x] Resolve Stitch inconsistencies in spacing, alignment, naming, density, and navigation rather than reproducing them.
- [x] Build reusable modules for KPI/evidence cards, timelines, project cards, process flows, technology groups, article cards, CTAs, and responsive diagrams.
- [x] Add real portrait, CV, project screenshots, social links, and verified Hammad content as it becomes available; clearly mark unresolved content instead of inventing it.
- [x] Implement responsive and accessible behavior for all modules, including reduced motion and diagram text alternatives.
- [x] Add SEO essentials: per-route metadata, canonical handling, sitemap, robots, Open Graph defaults, and truthful structured data.

**Done when:** The complete portfolio is visually polished on representative desktop and mobile sizes and contains no fabricated metrics, placeholder claims, broken actions, or layout gaps.

## Milestone 3 — Sanity CMS and Editorial Workflow

**Outcome:** Hammad can maintain all significant public content without editing code.

- [x] Configure Sanity project, Studio, environment variables, datasets, CORS/preview requirements, and typed client/query helpers.
- [x] Create schemas for settings/pages, case studies, professional profile, experience, achievements/evidence, skills/capabilities, education/certifications, teaching/training, articles, source documents, and generation runs.
- [x] Design a simple Studio structure with field groups, helpful descriptions, previews, validations, references, and singleton handling.
- [x] Replace fixture data with centralized, typed GROQ queries and mapping helpers; support draft preview and graceful empty states.
- [x] Add image handling, Portable Text components, CV/file management, SEO fields, and revalidation after publishing.
- [x] Seed/import the verified content used in Milestone 2 and document the essential editing workflow.

**Done when:** Hammad can change the identity, page copy, experience, expertise, teaching, writing, case studies, links, media, CV, and SEO in Sanity, preview the result, and publish it without a code change.

## Milestone 4 — AI Case-Study Draft Generator

**Outcome:** An authorized user can turn unstructured Markdown into an evidence-aware Sanity case-study draft.

- [x] Define Zod/JSON contracts for extraction, selected professional context, evidence claims, case-study fields, architecture graphs, visual specifications, validation warnings, and generation status.
- [x] Implement a provider-neutral server-only model adapter; verify the selected free/low-cost model, limits, schema-output support, and current terms against official documentation.
- [x] Build the deterministic Context Builder using Sanity relationships, organizations, dates, domains, capabilities, and linked achievements; do not add vector search in v1.
- [x] Implement the generation pipeline: source upload → extraction → context selection → evidence map → structured writing → claim validation → Sanity draft.
- [x] Enforce evidence rules: no invented metrics, professional context cannot silently become project outcome, recommendations are labeled, contradictions are surfaced, and publication remains manual.
- [x] Build structured architecture/flow rendering with branded React/SVG components plus responsive text alternatives and a safe fallback visual.
- [x] Add Studio-facing generation controls/status, confidentiality warning, retryable failures, review warnings, and links to the created draft.
- [x] Test the complete flow on at least one real project and one deliberately weak/ambiguous Markdown source.

**Done when:** A real Markdown upload produces a useful, schema-valid, editable Sanity draft with traceable claims and a legible architecture visual, while unsupported claims are omitted or flagged.

## Milestone 5 — QA, Content Approval, and Launch

**Outcome:** The portfolio is trustworthy, stable, documented, and production-ready.

- [ ] Perform a content audit with Hammad for names, titles, dates, metrics, links, project relationships, confidential details, and final CTA copy.
- [ ] Test public routes, CMS editing, preview, publishing, generation retries, validation, empty states, 404/error behavior, forms/links, CV download, and responsive layouts.
- [ ] Run lint and production build; fix accessibility, performance, metadata, image optimization, and layout-shift issues.
- [ ] Confirm secrets remain server-only; add file validation, authorization, rate limits, safe logs, and privacy warnings to generation endpoints.
- [ ] Configure production deployment, Sanity production settings, environment variables, domain, sitemap/robots, and revalidation.
- [ ] Complete concise handover documentation covering content edits, case-study generation/review, model/provider configuration, deployments, and common failures.

**Done when:** Production is live, all critical paths pass, Hammad can independently edit and publish content, and the real case-study workflow has been approved end to end.

## Fast-Delivery Rules

- Do not add features outside `PRD.md` while a milestone remains incomplete.
- Reuse components and schemas; do not build a unique layout for every page.
- Build with real content early. Placeholder-heavy pages are not considered complete.
- Ship the manual CMS workflow even if an external AI provider is temporarily unavailable.
- Treat optional generative artwork, extra provider fallbacks, embeddings, dark mode, analytics, and animations as post-launch work.
- Keep one short running list of blockers in pull-request or commit notes; do not create a second competing task system.

