# Production Deployment Guide

This guide walks through configuring and launching the Mirza Hammad Portfolio and Sanity Studio in production.

---

## 1. Hosting Platform (Vercel)

### Option A: Deploy via GitHub (Recommended)
1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/hammad_portfolio.git
   git push -u origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com/new):
   - Import the `hammad_portfolio` repository.
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `next build` (default)
   - **Output Directory**: `.next` (default)

### Option B: Deploy via Vercel CLI
```bash
vercel login
vercel --prod
```

---

## 2. Environment Variables Checklist

Add these environment variables in **Vercel Project Settings → Environment Variables**:

| Variable Name | Environment | Description / Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Production, Preview | Your Sanity Project ID (from sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | Production, Preview | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Production, Preview | `2024-03-01` |
| `SANITY_API_READ_TOKEN` | Production, Preview | Read token (Viewer permissions; needed if dataset is private) |
| `SANITY_API_WRITE_TOKEN` | Production, Preview | Write token (Editor permissions; required for AI Case Study draft creation) |
| `SANITY_REVALIDATE_SECRET` | Production, Preview | High-entropy random string (e.g. `openssl rand -hex 32`) |
| `SANITY_PREVIEW_SECRET` | Production, Preview | High-entropy random string for draft preview mode |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical site URL (e.g. `https://mirzahammad.com`) |
| `CASE_STUDY_AI_PROVIDER` | Production | `gemini` (or `groq`) |
| `CASE_STUDY_AI_MODEL` | Production | `gemini-2.5-flash` |
| `CASE_STUDY_AI_API_KEY` | Production | Your Google AI Studio API key |
| `CASE_STUDY_EDITORIAL_SECRET` | Production | Secret protecting `/api/ai/generate` from unauthorized use |
| `ALLOW_MOCK_IN_PRODUCTION` | Production | `false` |

---

## 3. Sanity Cloud Configuration

Log into [sanity.io/manage](https://sanity.io/manage) and select the portfolio project:

### 3.1 CORS Origins
Navigate to **API → CORS Origins** and add:
1. `https://mirzahammad.com` (allow credentials: **Yes**)
2. `https://<your-project>.vercel.app` (allow credentials: **Yes**)
3. `http://localhost:3000` (allow credentials: **Yes**, for local development)

### 3.2 Automated Revalidation Webhook
Navigate to **API → Webhooks** and click **Create webhook**:
- **Name**: `Next.js Production ISR Revalidation`
- **URL**: `https://mirzahammad.com/api/revalidate`
- **Dataset**: `production`
- **Trigger on**: Create, Update, Delete
- **Filter**: `_type in ["caseStudy", "profile", "experience", "article", "settings"]`
- **HTTP Method**: `POST`
- **Headers**:
  - `x-sanity-revalidate-secret`: `<Your SANITY_REVALIDATE_SECRET value>`
- **Payload**: Include projection:
  ```json
  {
    "_type": _type,
    "slug": slug
  }
  ```

---

## 4. Custom Domain & DNS Setup

1. In Vercel, go to **Settings → Domains** and add:
   - `mirzahammad.com`
   - `www.mirzahammad.com` (configured to redirect to apex)
2. At your DNS registrar:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
3. Wait for SSL certificate issuance (automatic via Let's Encrypt in Vercel).

---

## 5. Post-Deployment Smoke Test

Once live, verify the following endpoints:
1. **Public Routes:**
   - Home: `https://mirzahammad.com`
   - Work / Case Studies: `https://mirzahammad.com/work`
   - Dynamic Case Study: `https://mirzahammad.com/work/retail-store-weekly-sales-analysis`
   - About: `https://mirzahammad.com/about`
   - Sitemap: `https://mirzahammad.com/sitemap.xml`
   - Robots: `https://mirzahammad.com/robots.txt`
2. **CMS Studio:**
   - Access `https://mirzahammad.com/studio`
   - Log in with Sanity credentials
   - Edit a title or bio field, publish, and verify that the public page updates within 3–5 seconds via the revalidation webhook.
3. **AI Case Study Generator:**
   - Navigate to **Source Documents** in Studio.
   - Open a test source and click **Generate Case Study Draft**.
   - Verify that draft is created with claims validation and architecture graph.
