# Mirza Hammad Baig Portfolio — Sanity CMS & Editorial Guide

This document explains how to configure, edit, preview, and revalidate content using the integrated Sanity Studio.

---

## 1. Architecture Overview

The portfolio uses an embedded Sanity Studio (`/studio`) within the Next.js application, backed by a structured GROQ query and presentation adapter layer (`lib/adapters/sanity-adapter.ts`).

```text
Sanity Content Lake / Drafts
          │
    GROQ Queries (`sanity/lib/queries.ts`)
          │
  Adapter Layer (`lib/adapters/sanity-adapter.ts`)
          │  ├── If remote Sanity configured → Return live documents
          │  └── If remote unconfigured → Gracefully return verified fixture data
          ▼
   React Server Components (Home, Work, Case Studies, etc.)
```

---

## 2. Environment Variables

Create `.env.local` using `.env.example` as a template:

```env
# Required for Sanity Connection:
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-03-01"

# Server-only (Private):
SANITY_API_READ_TOKEN="optional_viewer_token"
SANITY_API_WRITE_TOKEN="editor_write_token_for_seeding"
SANITY_REVALIDATE_SECRET="secure_random_string_for_webhooks"
SANITY_PREVIEW_SECRET="secure_random_string_for_draft_preview"

# Canonical Site Origin:
NEXT_PUBLIC_SITE_URL="https://mirzahammad.com"
```

> **Security Note:** Never commit `.env.local` or expose write tokens to client components.

---

## 3. Accessing the Content Studio

1. Start the Next.js local development server:
   ```bash
   npm run dev
   ```
2. Navigate in your browser to:
   ```
   http://localhost:3000/studio
   ```
3. Sign in with your authorized Sanity credentials (e.g. GitHub or Google account linked to the Sanity project).

---

## 4. Content Structure & Workflows

The Studio desk is organized into 4 distinct editorial areas:

### A. Website Pages & Settings (Singletons)
- **Site Settings & Identity**: Global profile details (name, professional role, summary, location, email, social links, portrait, and downloadable CV PDF).
- **Home Page**: Eyebrow badge, headline, value chain, featured case study reference, and career narrative.
- **Experience Page**: Cross-functional department scopes and working styles.
- **Expertise Page**: 7-stage value chain, operational bottlenecks solved, and 7-step engineering methodology.
- **Teaching Page**: Atomcamp lecturer details, Muller & Phipps training note, 6-phase learning loop, and mentorship themes.
- **Writing Page**: *Understanding the Data Field* series narrative and 6-layer field knowledge map.
- **About Page**: Hero bio, 4 identity pillars (*Analyst*, *Architect*, *Educator*, *Builder*), and career principles.

### B. Portfolio & Architecture
- **Case Studies**: Create, edit, and publish enterprise case studies. Supports Kimball star schema diagrams, DAX calculations table, business dilemma, and documented deliverables.
- **Career Chronology**: Organizational roles (Ideas by Gul Ahmed, Muller & Phipps, Atomcamp, Independent Practice) with dates, scope overviews, and verified outcomes.
- **Capability Disciplines**: Core skill competencies and tools.
- **Technology Groups**: Grouped technology ecosystem (Analytics & BI, Data & Engineering, Programming, AI).

### C. Education & Publications
- **Teaching Tracks**: Power BI, Python for Data Analysis, SQL, and Exploratory Data Analysis.
- **Articles & Publications**: Essays in the *Understanding the Data Field* series with direct Medium linkouts.
- **Academic Degrees**: BS Computer Science (KIET), DAE Electrical & Electronics (Aligarh Institute of Technology, Gold Medalist).
- **Certifications**: DataCamp and Atomcamp credentials.

### D. Professional Context & AI (Internal)
- **Professional Bio & Context**: Approved positioning and tone guidelines.
- **Verified Evidence Claims**: Granular claims linked to specific projects with confidence indicators.
- **Source Documents**: Upload area for raw Markdown documents (contract for Milestone 4 AI draft generator).
- **Generation Audit Runs**: Model logs and reviewer status tracking.

---

## 5. Media & Asset Management

### Professional Portrait
- In **Site Settings**, upload Hammad's portrait under `portrait`.
- The site automatically serves optimized web-ready formats via the Sanity image CDN.
- If left empty, the site automatically renders the designed `MHB` monogram avatar fallback.

### Curriculum Vitae (PDF)
- In **Site Settings**, upload the official PDF under `cvFile`.
- The public site will provide a direct download link.
- If left empty, the site displays a "Verification on request" badge, preventing broken download links.

---

## 6. Draft Preview Mode

To inspect unpublished drafts on the live site before publishing:

1. Visit the protected preview enablement URL:
   ```
   http://localhost:3000/api/draft-mode/enable?secret=YOUR_PREVIEW_SECRET&slug=/work/retail-store-weekly-sales-analysis
   ```
2. The site enters Next.js Draft Mode and reads from the `previewDrafts` perspective.
3. To return to the standard public view, visit:
   ```
   http://localhost:3000/api/draft-mode/disable
   ```

---

## 7. Webhook-Driven Revalidation

When content is published in Sanity Studio, configure a Sanity Webhook to instantly purge the Next.js cache without redeploying:

1. Go to **Sanity Management Console** (`https://sanity.io/manage`) → **API** → **Webhooks**.
2. Click **Create Webhook**:
   - **URL**: `https://your-domain.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET`
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type in ["siteSettings", "caseStudy", "homePage", "experience", "capability", "technology", "teachingExperience", "article", "education", "certification"]`
   - **HTTP method**: `POST`

---

## 8. Seeding & Initial Migration

An idempotent migration script is provided in `scripts/seed-sanity.ts`. Once credentials are provided:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your_id" \
NEXT_PUBLIC_SANITY_DATASET="production" \
SANITY_API_WRITE_TOKEN="your_write_token" \
npx tsx scripts/seed-sanity.ts
```

This script populates all verified case studies, roles, capabilities, articles, education, and singletons with stable IDs, ensuring zero downtime or manual data entry during initial onboarding.

---

## 9. AI Case-Study Draft Generator Workflow

Milestone 4 introduces an evidence-grounded AI draft generator assisting Hammad in turning unstructured project Markdown or notes into complete, schema-valid Sanity drafts.

### Editorial Workflow
1. **Create / Open a Source Document**:
   - In Studio, navigate to **AI Case-Study Generator** → **Source Documents (AI Input)**.
   - Click **Create** or open an existing source document.
   - Enter or paste your project Markdown / plain-text notes into **Raw Text Content** or upload a `.md` / `.txt` file.
   - (Optional) Provide hints: Title hint, Target Organization, and Known Technologies.
2. **Confidentiality Check & Acknowledgement**:
   - Select the **Confidentiality Classification** (*Public*, *Permission Granted*, or *Anonymized*).
   - Check the **Confidentiality Acknowledgement** checkbox. Note: Documents marked *Confidential — Do NOT Process* will be blocked by system safety guards.
3. **Execute Draft Generation**:
   - In the Studio document action bar at the bottom, click **Generate Case-Study Draft**.
   - The engine normalizes the source, queries verified professional context, extracts facts, maps evidence, synthesizes a case study draft with a Kimball dimensional architecture graph, and executes deterministic claim validation.
4. **Review Generated Draft & Warnings**:
   - The generator saves the output as an unpublished draft (`drafts.caseStudy-<slug>`).
   - Open **AI Case-Study Generator** → **Generated Case Study Drafts**.
   - Review the generated problem statement, Kimball dimensional architecture, DAX calculations, and the **Internal Review & Validation Warnings** list.
   - **Crucial Rule**: The AI NEVER publishes automatically. Review all fields, make manual edits, and click **Publish** in Sanity Studio once satisfied.

### AI Provider Configuration & Switching
Configure your chosen provider in `.env.local`:
- **Development & Testing Mode**:
  `CASE_STUDY_AI_PROVIDER="mock"` (requires zero credentials, deterministic test fixtures).
- **Google Gemini (Primary)**:
  `CASE_STUDY_AI_PROVIDER="gemini"`
  `CASE_STUDY_AI_MODEL="gemini-2.5-flash"`
  `CASE_STUDY_AI_API_KEY="your_google_ai_studio_api_key"`
- **Groq / Qwen (Fallback or Alternative)**:
  `CASE_STUDY_AI_FALLBACK_PROVIDER="groq"`
  `CASE_STUDY_AI_FALLBACK_MODEL="qwen-2.5-32b"`
  `CASE_STUDY_AI_FALLBACK_API_KEY="your_groq_api_key"`

### Deterministic Safeguards
- **Invented Metrics Detection**: Percentages, currencies, and latency claims that do not appear in the uploaded source text are actively flagged as blocking issues.
- **Proposed vs. Implemented**: Technologies cited as recommendations or future roadmap items are strictly tagged as proposed and barred from implementation verbs.
- **No Vector Embeddings / RAG Hallucination**: Professional context is queried deterministically via GROQ filters, ensuring only approved, verified claims enter the prompt.
