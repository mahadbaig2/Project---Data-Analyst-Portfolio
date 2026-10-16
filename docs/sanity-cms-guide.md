# Mirza Hammad Baig — Studio Editorial & Publishing Handover Guide

Welcome to your portfolio management system. This guide explains how to edit your website, upload assets, and use your AI case-study drafting engine.

The system is built on **Sanity Studio** embedded directly at `/studio`. You have complete editorial control over all site content without needing to edit code or trigger manual code deployments.

---

## Part 1: Editorial Guide for Hammad

### 1. How to Sign into the Studio
1. Navigate to:
   - **Local Development**: `http://localhost:3000/studio`
   - **Production Site**: `https://your-domain.com/studio`
2. Click **Sign in with Google** or **Sign in with GitHub** using the account linked to your Sanity project.
3. Once authenticated, the Studio desk will load with your editorial workspaces on the left navigation sidebar.

---

### 2. How to Edit Website Pages

The Studio desk is divided into four main sections:

#### A. Website Pages & Settings (Singletons)
- **Site Settings & Global Identity**:
  - Update your **Name**, **Professional Role** (e.g. *Assistant Manager – Data Analyst*), **Descriptor**, and **Location**.
  - **Contact Email**: Configure your preferred public contact email (`mirzahammadbaig147@gmail.com` or `hammadbaig.work@gmail.com`).
  - **Social Links**: Manage URLs for LinkedIn, GitHub, Medium, and email.
  - **Portrait & CV**: (See Asset Uploads below).
- **Home Page**:
  - Edit the headline, eyebrow badge, featured case study selector, value chain narrative, and final call to action.
- **Experience Page**:
  - Set working principles, operational scopes, and cross-functional leadership narratives.
- **Expertise Page**:
  - Update the 7-stage value chain, operational bottlenecks solved, and 7-step engineering methodology.
- **Teaching Page**:
  - Update your Atomcamp lecturer overview, Muller & Phipps corporate upskilling narrative, 6-phase learning loop, and mentorship themes.
- **Writing Page**:
  - Edit the *Understanding the Data Field* series introduction and 6-layer field knowledge map.
- **About & Direct Inquiries Page**:
  - Manage your 4 identity pillars (*Analyst*, *Architect*, *Educator*, *Builder*) and core career principles.

---

### 3. Case Studies: Adding, Editing, and Reordering

#### Adding a New Case Study Manually
1. In the Studio desk, go to **Portfolio & Architecture** → **Case Studies**.
2. Click **Create** (`+`).
3. Fill in the core fields:
   - **Title**: e.g., *Omnichannel Retail Inventory Optimization*
   - **Slug**: Click **Generate** from title (e.g., `omnichannel-retail-inventory`).
   - **Domain & Category**: Select domain (Retail, Logistics, FinTech, etc.) and category.
   - **Status**: Set to *Production Deployed*, *Operational*, or *Architecture Blueprint*.
   - **Business Dilemma & Operational Context**: Describe the real operational friction.
   - **Kimball Star Schema / Architecture**: Add nodes (ingestion, staging, fact, dimension) and transformation edges.
   - **Key Analytical DAX Measures**: Document formulas, business purpose, and optimization notes.
   - **Documented Outcomes**: Add verified metric bullet points.
4. Click **Publish** at the bottom right.

#### Reordering Case Studies
- Each Case Study document has a **Display Order** number field (`displayOrder`).
- Lower numbers appear first on the `/work` index and Home page (e.g., `1` is top priority, followed by `2`, `3`, etc.).

---

### 4. Uploading Assets: Portrait, CV, and Screenshots

#### Professional Portrait
1. Go to **Website Pages & Settings** → **Site Settings & Identity**.
2. Under **Professional Portrait**, click **Upload** and select your photo.
3. The site automatically processes and serves optimized formats via the Sanity image CDN.
4. *If left empty, the site automatically renders your designed `MHB` monogram avatar fallback.*

#### Curriculum Vitae (PDF)
1. In **Site Settings & Identity**, find **Curriculum Vitae (PDF)**.
2. Click **Upload** and attach your official resume PDF.
3. Once attached, the top navigation and mobile drawer show a **Download CV** button.
4. *If left empty, the site displays a professional "CV on Request" button linking to `/about#contact`, preventing broken downloads.*

#### Dashboard Screenshots & Architecture Diagrams
- **Dashboard Screenshots**: Only upload genuine, verified dashboard screenshots taken from your production work. Never upload generic templates or synthetic mockups.
- **Architecture Diagrams**: These are rendered from structured graph data (nodes & edges) using responsive React/SVG components, ensuring crisp readability on both 4K monitors and mobile phones.

---

### 5. AI Case-Study Draft Generator Workflow

The AI engine helps you turn unstructured project notes or Markdown files into fully formed case study drafts with Kimball dimensional diagrams.

#### Step 1: Create a Source Document
1. Go to **AI Case-Study Generator** → **Source Documents (AI Input)**.
2. Click **Create** (`+`).
3. Paste your raw notes or upload a `.md` / `.txt` file into **Raw Text Content**.
4. (Optional) Provide hints: Project Title Hint, Related Organization, and Known Technologies.

#### Step 2: Acknowledge Confidentiality
1. Choose the **Confidentiality Classification**:
   - *Public*: Content contains no private client information.
   - *Permission Granted*: Client granted permission to share technical details.
   - *Anonymized*: Client names and private revenues are masked.
   - *Confidential — Do NOT Process*: **Blocks** AI execution to protect sensitive data.
2. Check the **Confidentiality Acknowledgement** checkbox.

#### Step 3: Run the Generator Action
1. In the document action bar at the bottom, click **Generate Case-Study Draft**.
2. If prompted for an **Editorial Secret**, enter the secret key configured in your deployment (e.g., `SANITY_PREVIEW_SECRET`). The Studio remembers it in your browser session.
3. The generator will:
   - Extract core project facts.
   - Deterministically pull your verified background from Sanity/fixtures.
   - Generate a Kimball star schema DAG and supporting visuals.
   - Run deterministic claim safeguards (metrics, dates, tech, superlatives).
   - Create an unpublished working draft in Sanity.

#### Step 4: Review and Edit the Draft
1. Go to **AI Case-Study Generator** → **Generated Case Study Drafts**.
2. Open the created draft document (`drafts.caseStudy-<slug>`).
3. Check the **Internal Review & Validation Warnings** field:
   - **Yellow warnings**: Informational reminders or recommended clarifications.
   - **Red blocking warnings**: Unevidenced metrics or proposed tools described with implementation verbs.
4. Make your manual edits directly in the fields.
5. **Strict Rule**: The AI NEVER publishes automatically. Only when you are completely satisfied, click **Publish** at the bottom right.

---

### 6. Previewing Drafts Before Publishing

To inspect how an unpublished draft looks on your real website layout:
1. Visit the protected preview URL in your browser:
   ```
   https://your-domain.com/api/draft-mode/enable?secret=YOUR_PREVIEW_SECRET&slug=/work/your-case-study-slug
   ```
2. The website enters **Next.js Draft Mode** and displays draft content.
3. To exit Draft Mode, visit:
   ```
   https://your-domain.com/api/draft-mode/disable
   ```

---

### 7. Correcting a Published Page

1. Open the document in Sanity Studio.
2. Edit any field (the draft saves automatically as you type).
3. Click **Publish**.
4. The Sanity Webhook immediately purges the Next.js cache tag, and your changes appear live within seconds.

---

## Part 2: Technical Configuration & Administration

### 1. Configured AI Providers & Models

The generation engine uses a provider-neutral architecture configured via environment variables:

| Provider Role | Provider | Configured Model | Purpose |
| :--- | :--- | :--- | :--- |
| **Primary** | Google Gemini | `gemini-2.5-flash` | Production-grade reasoning, high throughput, native JSON Schema output. |
| **Fallback** | Groq (OpenAI-compatible) | `qwen-2.5-32b` | Activates automatically on Gemini outages, rate limits, or quota exhaustion. |
| **Development** | Mock Provider | Deterministic | Local developer testing requiring zero API keys. |

#### Changing Models
To switch models without code changes, update these environment variables in your hosting provider (e.g., Vercel):
- `CASE_STUDY_AI_MODEL`: Set to any active Gemini model (e.g. `gemini-2.5-flash` or `gemini-2.5-pro`).
- `CASE_STUDY_AI_FALLBACK_MODEL`: Set to any active Groq model (e.g. `qwen-2.5-32b`).

#### Usage Costs and Limits
- **Google AI Studio (Gemini 2.5 Flash)**: Free tier provides up to 15 Requests Per Minute (RPM) and 1M Tokens Per Minute (TPM).
- **Groq Cloud (Qwen 2.5 32B)**: Free tier provides high-speed token generation with standard developer rate limits.
- **Expected Monthly Cost**: **$0.00 / month** under standard personal portfolio authoring usage.

---

### 2. Environment Variables Inventory

```ini
# --- Sanity Public Configuration ---
NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-03-01"

# --- Sanity Server-Only Secrets ---
SANITY_API_READ_TOKEN=""                        # Viewer token (optional if dataset is public)
SANITY_API_WRITE_TOKEN="your_write_token"      # Editor write token (for AI draft mutation)
SANITY_REVALIDATE_SECRET="your_webhook_secret" # Secret for /api/revalidate webhook
SANITY_PREVIEW_SECRET="your_preview_secret"    # Secret for /api/draft-mode/enable

# --- Canonical URL ---
NEXT_PUBLIC_SITE_URL="https://mirzahammad.com"

# --- AI Provider Configuration ---
CASE_STUDY_AI_PROVIDER="gemini"
CASE_STUDY_AI_MODEL="gemini-2.5-flash"
CASE_STUDY_AI_API_KEY="your_gemini_api_key"

# --- Fallback Provider (Groq Qwen) ---
CASE_STUDY_AI_FALLBACK_PROVIDER="groq"
CASE_STUDY_AI_FALLBACK_MODEL="qwen-2.5-32b"
CASE_STUDY_AI_FALLBACK_API_KEY="your_groq_api_key"

# --- Execution & Safety Parameters ---
CASE_STUDY_AI_TIMEOUT_MS="50000"
CASE_STUDY_AI_MAX_SOURCE_BYTES="262144"        # 256 KB max source file size
CASE_STUDY_AI_MAX_CONTEXT_ITEMS="12"
CASE_STUDY_EDITORIAL_SECRET="your_preview_secret"
ALLOW_MOCK_IN_PRODUCTION="false"               # Prevents mock mode in production
```

---

### 3. Deployment, CORS, and Webhooks

#### CORS Origins
In **Sanity Management Console** (`https://sanity.io/manage`):
1. Navigate to **API Settings** → **CORS Origins**.
2. Add your production domain: `https://your-domain.com` (Check **Allow credentials**).
3. Add `http://localhost:3000` for local development.

#### On-Demand Revalidation Webhook
To ensure instant updates when you click **Publish**:
1. Go to **Sanity Management Console** → **API** → **Webhooks**.
2. Click **Create Webhook**:
   - **Name**: `Next.js Content Revalidation`
   - **URL**: `https://your-domain.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET`
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type in ["siteSettings", "caseStudy", "homePage", "experience", "capability", "technology", "teachingExperience", "article", "education", "certification"]`
   - **HTTP method**: `POST`

---

### 4. Troubleshooting & Recovery

| Issue | Cause | Resolution |
| :--- | :--- | :--- |
| **Studio Action: 401 Unauthorized** | Missing or incorrect editorial secret. | When prompted in Studio, re-enter your configured `SANITY_PREVIEW_SECRET`. |
| **403 Confidentiality Blocked** | Source document classified as *Confidential — Do NOT Process*. | Change classification to *Anonymized* or *Public* with explicit acknowledgement. |
| **409 Concurrent Run in Progress** | Two generation clicks triggered simultaneously. | Wait 30 seconds for the existing run to complete before retrying. |
| **Primary AI Provider Timeout / Quota** | Gemini rate limit reached. | The engine automatically falls back to Groq Qwen. If both fail, verify API keys in hosting dashboard. |
| **Published Content Not Updating** | Revalidation webhook misconfigured or secret mismatch. | Check Sanity webhook delivery logs at `sanity.io/manage` and verify `SANITY_REVALIDATE_SECRET`. |
| **Download CV Button Shows "CV on Request"** | No PDF uploaded to Site Settings. | Upload your official resume PDF under **Site Settings** → **Curriculum Vitae (PDF)** and publish. |
