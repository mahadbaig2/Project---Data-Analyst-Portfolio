# Mirza Hammad Baig Portfolio — Product Requirements Document

## 1. Product Summary

This project is a production portfolio and AI-assisted publishing system for **Mirza Hammad Baig**, a data professional working across data analytics, business intelligence, data architecture, data engineering, teaching, and emerging AI-powered analytics.

The public experience should feel like an executive analytics workspace rather than a generic personal portfolio. It must help recruiters, hiring managers, data leaders, training partners, and collaborators quickly understand:

- who Hammad is;
- the business and technical problems he solves;
- the evidence behind his experience and impact;
- how his work spans raw data through decision support;
- how he teaches, writes, and transfers knowledge; and
- how to contact or evaluate him.

The private authoring experience must make the site maintainable after handover. Hammad should be able to update all significant content through Sanity, add or revise case studies, manage assets, and use an AI-assisted workflow to turn unstructured project Markdown into a complete case-study draft for review.

This is not a one-off static website and not an autonomous AI publishing bot. It is a usable, controlled portfolio system with a CMS, structured content, and human-reviewed AI assistance.

## 2. Product Vision

Build the strongest credible representation of Hammad's professional identity by combining three ideas:

1. **Executive portfolio:** a clear, senior, evidence-led public site inspired by enterprise BI products.
2. **Maintainable content system:** all meaningful portfolio content is editable through Sanity without changing code.
3. **AI-assisted case-study publishing:** Hammad supplies project evidence; the system combines it with verified professional context and prepares a structured draft, diagrams, and supporting visuals for his approval.

The central narrative is:

`DATA → SYSTEM → INSIGHT → DECISION → IMPACT`

The portfolio should position Hammad beyond a Power BI specialist. It should demonstrate an end-to-end understanding of data foundations, modeling, analytics, BI delivery, automation, AI, stakeholder enablement, and teaching.

## 3. Goals and Success Criteria

### Primary goals

- Ship a polished, responsive portfolio closely aligned with the existing Stitch screens and `DESIGN.md`.
- Establish one consistent navigation, layout, component system, and content hierarchy across the site.
- Make all page copy, case studies, experience, expertise, teaching, writing, links, profile details, and key media editable in Sanity.
- Let Hammad upload an unstructured `.md` or text file and generate a complete case-study draft without manually filling every schema field.
- Enrich project evidence with relevant, verified context about Hammad while preventing unrelated profile facts from becoming false project claims.
- Generate editable architecture diagrams and designed supporting visuals without relying on inaccurate AI-generated diagram images.
- Require human review before any generated case study is published.
- Keep recurring costs at or near zero for expected personal-portfolio usage.

### Launch success criteria

- Every required public route is implemented and responsive.
- The live site contains no known fabricated claims, placeholder metrics, broken links, or default Next.js content.
- A non-developer can change core website content in Sanity and see it reflected on the site.
- At least one real case study completes the full flow: source upload → extraction → context enrichment → evidence map → structured draft → review → publish.
- Generated diagrams remain legible and editable at desktop and mobile sizes.
- Production build, linting, key navigation, CMS queries, empty states, and case-study rendering pass verification.
- Core pages meet practical accessibility and performance standards, targeting Lighthouse scores of 90+ where external scripts and media permit.

## 4. Target Audiences

### Recruiters and hiring managers

Need a fast summary of role fit, experience, skills, outcomes, chronology, location, and contact options.

### Data and business leaders

Need evidence that Hammad can connect reporting and analytics work to business questions, architecture, reliability, adoption, and decisions.

### Technical reviewers

Need credible detail about data sources, transformations, models, DAX/SQL/Python work, system architecture, constraints, and implementation decisions.

### Training and mentorship clients

Need evidence of Hammad's ability to teach Power BI, Python, SQL, EDA, data modeling, and business-focused analytical thinking.

### Hammad as site owner

Needs a simple way to maintain the site, upload source material, review generated drafts, correct claims, and publish without developer support.

## 5. Product Principles

### Evidence before decoration

No invented metrics, clients, outcomes, user counts, certifications, dates, or technical implementations. If a quantitative claim lacks evidence, omit it or flag it for confirmation.

### Business context plus technical depth

Case studies must explain the problem, stakeholders, data reality, approach, system, and decision impact. Tool lists alone are insufficient.

### CMS-first, not hardcoded-first

Sanity is the long-term source of truth. Reusable interface labels and safe defaults may remain in code, but professional content should not require a deployment to update.

### AI prepares; Hammad approves

Generated content is always saved as a draft. The system must never auto-publish a case study or silently turn an inference into an implemented fact.

### Structured visuals over image hallucinations

Architecture diagrams, flows, and analytical visuals should be generated from validated structured specifications and rendered with reusable React/SVG components. Generative images are optional enhancement assets, never the source of technical truth.

### Calm authority

The interface should be analytical, modern, restrained, and human. Avoid fake live telemetry, excessive status labels, visual noise, neon developer aesthetics, and arbitrary chart values.

## 6. Information Architecture and Public Routes

Use one canonical navigation model:

1. Home
2. Work
3. Experience
4. Expertise
5. Teaching
6. Writing
7. About
8. Contact, either as the final About section or a stable anchor

Required routes:

- `/` — executive overview
- `/work` — filterable case-study index
- `/work/[slug]` — reusable case-study detail page
- `/experience` — career and organizational impact
- `/expertise` — capabilities, technology ecosystem, systems thinking, and professional process
- `/teaching` — Atomcamp, corporate training, topics, mentoring, and learning approach
- `/writing` — editorial hub for Medium articles and data-field writing
- `/about` — concise professional narrative, identity, education, learning, values, and contact

The existing Stitch folders under `designs/` are visual references for these routes. Their `screen.png` files define the intended visual direction; their `code.html` files may help inspect spacing and structure but must not be copied as production architecture.

## 7. Page-Level Scope

### Home

- concise positioning and value proposition;
- verified headline indicators only;
- featured case studies;
- end-to-end data value-chain story;
- selected experience and enterprise impact;
- teaching/writing signals;
- direct work, CV, and contact actions.

The page should let a reviewer understand Hammad's identity and strongest evidence within roughly 20 seconds.

### Work

- featured and standard case-study cards;
- filters based on managed categories, capabilities, or technologies;
- search if it remains useful with the final number of projects;
- clear problem, contribution, technology, and evidence snippets;
- honest empty state when no item matches.

### Case study

The reusable template should support:

- title, summary, status, domain, organization, role, dates, and confidentiality notes;
- problem, context, users/stakeholders, constraints, objectives, and responsibilities;
- data sources, transformations, model, analytical approach, calculations, implementation, and validation;
- architecture diagram and system-flow visual;
- real screenshots supplied by Hammad;
- generated supporting visuals clearly separated from real project evidence;
- outcomes, insights, challenges, decisions, lessons, and future improvements;
- technologies, related experience, related writing, and next-project navigation;
- claim confidence/review information in Sanity, not necessarily exposed publicly.

The template must gracefully handle missing metrics, screenshots, architecture, or optional sections without leaving visual gaps.

### Experience

- verified chronological roles;
- concise organizational context, scope, contributions, and outcomes;
- supported departments and cross-functional work;
- working-style modules for discovery, modeling, BI delivery, and enablement;
- no unsupported performance charts or arbitrary radar scores.

### Expertise

- data analytics;
- business intelligence;
- data architecture;
- data engineering;
- AI and automation as an extension of Hammad's data background;
- training and mentoring;
- grouped technology ecosystem rather than a logo wall;
- data-system flow, problem types, and professional process.

### Teaching

- Power BI, Python for data analysis, SQL, and EDA;
- Atomcamp teaching role and applied learning approach;
- verified corporate training experience;
- mentorship and case-study learning;
- training/workshop contact action;
- no invented student counts, class sizes, satisfaction figures, or dates.

### Writing

- featured data-field series;
- featured article and categorized article grid;
- knowledge-map visual;
- Medium destination;
- relationship between writing and teaching;
- no fabricated titles, dates, reading times, or engagement numbers.

### About and contact

- concise professional story;
- Analyst / Architect / Educator / Builder identity;
- education, certifications, and learning;
- practical career principles;
- verified email, location, social links, and CV;
- contact actions without unnecessarily emphasizing a phone number.

## 8. Sanity CMS Requirements

Sanity must control content from top to bottom while remaining understandable to a non-developer.

### Core document types

- `siteSettings`: identity, global SEO, social links, email, location, navigation, footer, default share image, and CV.
- `homePage`, `experiencePage`, `expertisePage`, `teachingPage`, `writingPage`, `aboutPage`: page-specific headings, modules, copy, featured references, and CTA content.
- `caseStudy`: the complete reusable case-study model.
- `experience`: organization, role, dates, scope, achievements, skills, departments, related projects, and evidence.
- `achievement`: verified claim, metric if any, organization, evidence, related projects, confidence, and project-use permissions.
- `skill` and `capability`: taxonomy, category, level/context, technologies, and evidence relationships.
- `education`, `certification`, `teachingExperience`, and `trainingExperience`.
- `article`: title/topic, category, summary, link, publication state/date when known, and featured status.
- `professionalProfile`: positioning, biography, domains, working style, writing preferences, and reusable verified context.
- `sourceDocument`: uploaded project source, normalized extraction, generation status, and source metadata.
- `generationRun`: model/provider, prompt/schema version, timestamps, status, errors, evidence map, review warnings, and generated draft reference.

Small reusable structures such as SEO, CTA, technology tags, evidence references, architecture nodes/edges, image metadata, and content sections should be object types.

### Editorial behavior

- Use clear field groups and descriptions instead of exposing one overwhelming form.
- Validate required identifiers, slugs, external URLs, dates, image alt text, and relationship integrity.
- Support draft preview and production preview.
- Use references for reusable facts rather than duplicating claims across pages.
- Preserve source files and generation records for traceability.
- Allow manual case-study creation even if AI generation is unavailable.
- Keep secrets and provider keys outside Sanity documents.

## 9. AI-Assisted Case-Study System

### User experience

Inside the authoring workflow, Hammad should be able to:

1. create a new generation request;
2. upload Markdown or plain text and optionally add screenshots or reference files;
3. start generation;
4. see understandable progress and warnings;
5. review ambiguous or unsupported claims;
6. open a fully populated Sanity draft;
7. edit, approve, and publish manually.

The uploaded document may be structured, incomplete, informal, or unrelated to the Sanity field order. It is project evidence, not a form submission.

### Context strategy

Generation combines:

- **project evidence:** facts stated in the uploaded source and supplied project assets;
- **professional context:** verified experience, achievements, skills, teaching, published case studies, and positioning stored in Sanity;
- **inferences/recommendations:** useful analytical conclusions that must be labeled as recommendations or future improvements, not past implementation.

For the initial data volume, use a deterministic context builder based on organization, dates, project references, capabilities, and tags. Do not add a vector database in v1. The provider adapter and context contract should allow retrieval to evolve later without changing the case-study schema.

### Generation pipeline

The logical stages are:

1. **Project extraction:** normalize the uploaded material into project entities and facts.
2. **Context selection:** retrieve only relevant verified Hammad context.
3. **Evidence mapping:** assign claims to sources and classify them as project fact, professional context, inference, or missing information.
4. **Case-study strategy and writing:** create schema-valid content aimed at recruiters, technical reviewers, and data leaders.
5. **Visual planning:** create architecture graph JSON and supporting-visual specifications.
6. **Claim validation:** re-check project statements, metrics, dates, organizations, and implemented-versus-proposed language.
7. **Draft creation:** create or update a Sanity draft and attach warnings for human review.

These are logical responsibilities, not a requirement for seven separate LLM calls. Combine stages where it reduces latency without weakening validation.

### Evidence rules

Each material generated claim should retain internal provenance:

- value or proposed text;
- source type and source reference;
- short supporting excerpt or locator;
- confidence;
- classification: project fact, professional context, inference, or unverified;
- reviewer status and optional reviewer note.

Rules:

- A professional achievement cannot become a project outcome unless explicitly linked to that project.
- Missing quantitative outcomes remain empty or are flagged for confirmation.
- Recommendations must use future/proposed language.
- Contradictions and ambiguity must be surfaced, not silently resolved.
- No generated content is automatically published.
- Uploaded employer/client material must display a confidentiality warning.

### Model and provider direction

Use a provider-neutral interface and environment-based configuration. The preferred model must support strong long-context reasoning and schema-constrained structured output at a free or very low-cost tier. Model availability, naming, limits, and terms must be verified against current official documentation during implementation rather than hardcoded from planning assumptions.

Required provider behavior:

- schema-constrained structured output;
- retries for transient failures;
- timeout and quota handling;
- logged provider/model/schema version without storing secret keys;
- safe failure that preserves uploads and allows retry;
- an optional fallback provider only after the primary workflow is reliable.

### Visual generation

- Architecture diagrams are graph data (`nodes`, `edges`, groups, direction, annotations) rendered by a reusable React/SVG or graph component.
- Analytical visuals use structured specifications and branded components; they must not contain arbitrary values.
- Real dashboards and interfaces are uploaded assets and must never be synthesized or altered by the agent.
- Optional decorative/abstract artwork may use an image provider later, but the system must work without it. A branded SVG fallback is required.

## 10. Technical Direction

### Current foundation

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Sanity CMS and Sanity Studio
- Vercel-compatible deployment

### Application architecture

- Keep public rendering, Sanity queries, presentation components, and AI/server services clearly separated.
- Use server components by default and client components only for genuine interaction.
- Keep AI keys and Sanity write tokens server-only.
- Centralize GROQ queries and typed query results.
- Prefer statically generated public pages with revalidation/visual editing support where appropriate.
- Use webhook- or tag-based revalidation after content changes if practical.
- Create reusable layout primitives rather than rebuilding the Stitch sidebar per page.
- Render Portable Text safely with a controlled component map.
- Follow the version-specific Next.js documentation bundled in `node_modules/next/dist/docs/` before relying on framework APIs.

### Suggested project boundaries

- `app/` — routes, layouts, loading/error states, metadata, and server endpoints/actions
- `components/` — shared layout, UI primitives, page modules, case-study modules, and visual renderers
- `sanity/` — configuration, schemas, structure, queries, generated types, and preview helpers
- `lib/ai/` — provider adapters, prompts, schemas, context builder, evidence mapper, validators, and orchestration
- `lib/content/` — mapping and presentation helpers
- `public/` — stable local assets only; editorial media should live in Sanity

The exact folder structure may adapt to official Next.js and Sanity guidance, but responsibilities must remain clear.

## 11. Design and Interaction Requirements

`DESIGN.md` is authoritative for visual language. The implementation must:

- use the evergreen/sage palette and Inter typography;
- maintain the executive analytics workspace metaphor;
- implement one shared desktop sidebar and responsive mobile navigation;
- use a consistent content width, 12-column desktop grid, spacing rhythm, card radii, borders, and elevation;
- preserve clear hierarchy while reducing unnecessary density from Stitch;
- provide visible hover, focus, active, loading, empty, and error states;
- use semantic HTML, keyboard-operable controls, visible focus, useful alt text, and sufficient contrast;
- respect reduced-motion preferences;
- avoid decorative charts, fake uptime/status indicators, or charts without real data.

Stitch is a reference, not production code. Resolve inconsistencies during implementation; do not preserve misalignment or contradictory navigation merely for pixel similarity.

## 12. Content Integrity and Editorial Rules

- Use Hammad's verified source material and current Sanity content as truth.
- Never copy fabricated placeholder claims from Stitch screens.
- Keep dates, job titles, organization names, technologies, and metrics consistent across pages.
- Distinguish direct work, team work, teaching, experiments, and future recommendations.
- Do not imply senior platform-engineering depth where evidence supports only working knowledge.
- Keep writing concise, factual, and appropriate for enterprise recruiters and data leaders.
- Every image requires useful alt text or must be marked decorative.
- Confidential projects must support anonymized organization names and redacted evidence.

## 13. Non-Functional Requirements

### Performance

- Optimize Sanity images and avoid shipping full-resolution source media unnecessarily.
- Minimize client-side JavaScript and prevent large visualization libraries from loading site-wide.
- Avoid layout shift by sizing media and reserving component space.

### Accessibility

- Target WCAG 2.2 AA for public pages.
- Ensure keyboard navigation, landmarks, heading order, form labels, focus states, and diagram alternatives.
- Provide a text description for meaningful architecture diagrams.

### SEO and sharing

- CMS-managed global and page-level metadata.
- Canonical URLs, sitemap, robots configuration, Open Graph/Twitter metadata, and structured data where truthful.
- Dynamic metadata for case studies and writing.

### Security and privacy

- Keep write tokens and model credentials server-only.
- Validate file type and size; sanitize filenames and rich text.
- Rate-limit generation endpoints and require authorized Studio access.
- Do not log raw confidential project content unnecessarily.
- Warn users not to upload confidential client/employer information without permission.
- Treat generated output as untrusted until validated.

### Reliability and observability

- Preserve generation state so failed jobs can be retried.
- Record useful errors without exposing secrets.
- Provide graceful public fallbacks if Sanity is temporarily unavailable.

## 14. Testing and Acceptance

Minimum verification before launch:

- lint and production build pass;
- all routes and navigation work on desktop and mobile;
- representative content renders with missing optional fields;
- filters, links, CV download, contact actions, metadata, and 404 behavior work;
- Sanity preview/editor workflow works for a non-developer;
- schema validation blocks invalid slugs, malformed URLs, and incomplete required records;
- one real case study passes through the complete generation and review flow;
- unsupported metrics are rejected or flagged in a controlled test;
- architecture renderer handles long labels, small screens, and an empty specification;
- basic keyboard and screen-reader inspection passes;
- no secrets or write tokens reach the browser bundle.

## 15. Scope Boundaries

### Included in v1

- all eight portfolio experiences represented by the required routes;
- responsive shared design system and layout;
- Sanity Studio and editable site content;
- structured professional context and reusable evidence;
- Markdown/text-to-case-study draft generation;
- deterministic context selection and evidence mapping;
- schema validation, claim warnings, and manual review;
- structured architecture and supporting SVG visuals;
- deployment-ready configuration and documentation.

### Explicitly out of scope for v1

- user accounts for public visitors;
- a general-purpose multi-author publishing platform;
- fine-tuning a model;
- a vector database or RAG infrastructure for a small personal knowledge base;
- auto-publishing generated content;
- automatic fabrication or editing of real dashboard screenshots;
- expensive always-on image generation;
- complex queues or distributed workers unless hosting limits prove they are required;
- analytics features that do not change a product decision;
- multiple visual themes or dark mode;
- localization.

## 16. Key Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| AI turns general profile facts into project facts | Evidence classification, project linking, claim validator, and mandatory review |
| Free model names, quotas, or terms change | Provider adapter, environment configuration, official-doc verification, graceful manual fallback |
| Sanity schema becomes too complex for Hammad | Clear field groups, references, validation, preview, and a guided generation workflow |
| Stitch inconsistency leaks into production | One canonical layout/navigation and reusable components governed by `DESIGN.md` |
| Portfolio looks impressive but contains weak evidence | Remove fabricated telemetry and require provenance for material claims |
| Large scope delays launch | Five milestone plan, real-content-first implementation, and strict v1 exclusions |
| Diagram generation is inaccurate | Structured graph validation and deterministic branded rendering |
| Confidential employer information is exposed | Upload warning, authorized Studio workflow, optional anonymization, and no auto-publish |

## 17. Product Decisions

- Sanity is the content source of truth.
- Existing Stitch designs guide the UI but do not dictate code architecture.
- One reusable case-study template serves all projects.
- The AI pipeline creates drafts only.
- Professional context enriches a narrative but cannot independently prove a project claim.
- Diagram generation is structured and deterministic.
- v1 starts without embeddings/vector search.
- Public quality and one complete generation workflow take priority over adding extra integrations.

