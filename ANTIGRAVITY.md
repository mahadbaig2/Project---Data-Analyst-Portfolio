# Antigravity Implementation Instructions

## Mission

Build a production-ready Next.js portfolio and AI-assisted Sanity publishing system for **Mirza Hammad Baig**.

Read these files before making changes:

1. `AGENTS.md` — mandatory Next.js version guidance.
2. `PRD.md` — product scope, requirements, integrity rules, and acceptance criteria.
3. `DESIGN.md` — authoritative visual system.
4. `TASKS.md` — the only delivery plan; work milestone by milestone.
5. `designs/*/screen.png` and `designs/*/code.html` — page references, not production code.

If the documents conflict, use this priority:

`PRD.md` product truth → `DESIGN.md` visual truth → `TASKS.md` delivery order → Stitch references for composition details.

`AGENTS.md` always governs framework-version behavior.

## Non-Negotiable Product Rules

- This is a maintainable product, not a static handoff.
- Sanity is the long-term source of truth for all meaningful public content.
- Use one canonical navigation and one shared responsive application shell.
- Do not invent claims, metrics, dates, job scope, clients, learner counts, certifications, or technologies.
- Do not copy unsupported content from Stitch HTML or screenshots.
- AI output is always a Sanity draft requiring human review. Never auto-publish.
- General professional context may explain Hammad's expertise but cannot become a project-specific claim unless evidence links it to that project.
- Real dashboard screenshots are supplied assets. Do not generate, mutate, or misrepresent them.
- Architecture diagrams and data flows must come from structured graph/specification data and deterministic rendering, not an image model.
- Keep v1 within the five milestones in `TASKS.md`. Do not introduce embeddings, vector databases, authentication for public visitors, dark mode, localization, or elaborate animation.

## How to Work

1. Inspect the current repository and the relevant source/reference files before editing.
2. Check the current milestone in `TASKS.md`; implement only that milestone and prerequisites needed for it.
3. Before using a version-sensitive Next.js API, read the relevant guide in `node_modules/next/dist/docs/` as required by `AGENTS.md`.
4. Make small, coherent changes using reusable components and clear ownership boundaries.
5. Run relevant verification after each coherent slice. At minimum, run lint and a production build before declaring a milestone complete.
6. Update checkboxes in `TASKS.md` only after the behavior exists and has been verified.
7. Report what changed, what was tested, unresolved content/data dependencies, and the next smallest action.

Do not claim completion based only on generated files or visual similarity. Verify the running result.

## Repository and Change Safety

- Preserve user changes and unrelated files.
- Do not rewrite or delete `DESIGN.md`, `PRD.md`, or the `designs/` references unless explicitly requested.
- Do not use destructive Git commands.
- Do not commit secrets, `.env*` values, Sanity write tokens, or AI keys.
- Do not push, deploy, create external resources, or alter remote services unless explicitly instructed and credentials/authority are available.
- Keep dependency additions minimal. Explain why a substantial library is needed before adding it.
- Prefer existing framework capabilities and small focused packages over a broad UI framework.

## Implementation Architecture

Maintain clear separation between:

- routes/layout/metadata;
- shared UI primitives and page modules;
- Sanity configuration, schemas, queries, generated types, and preview;
- content mapping/presentation helpers;
- server-only AI providers, prompts, schemas, context selection, validation, and orchestration;
- structured visual renderers.

Use Server Components by default. Add `"use client"` only when a component requires browser state, effects, or interaction. Never expose Sanity write credentials or model keys to client components.

Centralize:

- navigation and route labels;
- design tokens and reusable primitives;
- GROQ queries and typed results;
- external URL handling;
- AI provider configuration;
- Zod/JSON contracts and prompt/schema versions;
- evidence classifications and generation status.

Avoid duplicate page-specific versions of the sidebar, cards, buttons, typography, or content-fetching logic.

## Design Execution

Treat `designs/*/screen.png` as composition references and `code.html` as an inspection aid. Do not paste Stitch's CDN setup, inline Tailwind configuration, repeated markup, or per-page global CSS into the app.

Implement the system described in `DESIGN.md`:

- light enterprise analytics aesthetic;
- Inter typography;
- restrained evergreen/sage palette;
- consistent card borders, radii, elevation, and spacing;
- fixed desktop sidebar and responsive mobile header/drawer;
- 12-column desktop layout that collapses cleanly;
- real data or no visualization, never arbitrary decorative values.

Resolve reference inconsistencies with product judgment:

- canonical nav is Home, Work, Experience, Expertise, Teaching, Writing, About, Contact;
- prefer clear hierarchy over maximum density;
- remove fake system states, unsupported analytics, and repetitive labels;
- allow optional CMS sections to disappear cleanly;
- keep the human professional visible inside the analytical metaphor.

Implement semantic HTML, logical headings, keyboard interaction, visible focus states, descriptive links, image alt text, reduced-motion support, and a text equivalent for meaningful diagrams.

## Sanity Rules

- Model reusable facts once and reference them instead of duplicating unverifiable copy.
- Use understandable document names, field groups, descriptions, previews, and validation messages.
- Support non-AI manual case-study creation.
- Preserve source documents and generation runs for traceability.
- Keep professional context separate from public page composition.
- Keep evidence and reviewer metadata private unless the product explicitly chooses to expose it.
- Build typed query/mapping boundaries so components do not contain GROQ or depend directly on raw document shape.
- Provide safe fallbacks when optional content is missing.

Before defining schemas, verify current official Sanity patterns compatible with the installed packages. Do not assume an older API from memory.

## AI Generation Rules

The uploaded Markdown/text may be a structured document, brief notes, a brain dump, or content ordered differently from the schema. Treat it as evidence to interpret, not fields to copy mechanically.

The generator must logically perform:

1. project extraction;
2. relevant professional-context selection;
3. evidence mapping;
4. structured case-study planning/writing;
5. architecture/supporting-visual planning;
6. claim validation;
7. Sanity draft creation.

Use schema-constrained structured output validated on the server. Never parse a free-form response with brittle regex when a structured contract is available.

Every material claim should be classifiable as:

- `project_fact` — explicitly supported by uploaded project evidence;
- `professional_context` — verified about Hammad but not necessarily this project;
- `inference` — a reasoned interpretation or recommendation that must be labeled;
- `unverified` — missing, contradictory, or requiring confirmation.

Required safeguards:

- never invent numerical outcomes;
- never move an achievement into a project outcome without a verified project relationship;
- never describe a proposed architecture as implemented;
- surface contradictions and confidence warnings;
- leave unsupported optional fields empty;
- preserve citations/excerpts or locators internally;
- create drafts only;
- display a confidentiality warning before upload;
- require authorized server-side execution;
- validate file type/size and rate-limit generation.

Implement AI behind a provider-neutral interface. Provider/model names, free tiers, quotas, structured-output support, data-use terms, and deprecations change; verify current official documentation at implementation time and keep configuration in environment variables. The portfolio must still support manual authoring if every provider is unavailable.

## Structured Visual Rules

Architecture and flow visuals must be stored as validated data such as:

- direction/layout;
- nodes with stable IDs, labels, category, group, and optional description;
- edges with source, target, and optional label;
- ordered stages and annotations;
- accessible text summary.

Render them using reusable branded React/SVG components or a narrowly scoped graph library. Validate missing nodes, invalid edges, duplicates, cycles where inappropriate, label length, and empty graphs. Provide responsive/mobile behavior and a readable textual fallback.

Supporting analytical visuals must receive real values or qualitative structure from evidence. Do not create arbitrary radar scores, fake trends, or decorative charts that imply measurement.

## Content and Data Handling

- Use verified content supplied by the user or approved in Sanity.
- Mark unresolved facts with a clear internal TODO or CMS validation warning; do not publish TODO text publicly.
- Keep names, dates, organizations, skills, and claims consistent across routes.
- Support confidential/anonymized case studies.
- Sanitize Portable Text output, URLs, filenames, and uploaded content.
- Avoid logging complete confidential source documents.
- Store model/provider, prompt version, schema version, timestamps, status, and safe error details for each generation run.

## Verification Checklist

Before marking work complete, verify what applies:

- `npm run lint`
- `npm run build`
- route navigation and active states
- responsive layouts at mobile, tablet, desktop, and wide desktop sizes
- keyboard navigation and visible focus
- missing/optional Sanity fields
- image sizing, alt text, and external links
- metadata, sitemap, robots, canonical URLs, and 404 behavior
- preview and publish workflow
- no server secret appears in browser output
- generation success, quota failure, invalid upload, retry, and provider timeout
- weak Markdown does not produce fabricated metrics
- professional context remains distinct from project facts
- diagrams handle long labels, invalid edges, and mobile layout

For visual work, inspect rendered pages rather than relying only on source code.

## Definition of Done

A task is done only when:

- the requested behavior is implemented;
- the visual result is consistent with `DESIGN.md` and the relevant Stitch reference;
- real and missing-content cases are handled;
- relevant tests/checks pass;
- no unsupported claims were introduced;
- `TASKS.md` accurately reflects the verified state;
- any required configuration or content dependency is documented clearly.

Optimize for a fast, trustworthy launch. A smaller complete system with one excellent real case-study workflow is better than a broad unfinished platform.
