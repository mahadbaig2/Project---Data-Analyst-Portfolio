# Production deployment

This Next.js portfolio is deployed from the `main` branch of `mahadbaig2/Project---Data-Analyst-Portfolio` to Vercel.

## Environment

Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in Vercel for the blog. Blog articles are the only Sanity document type used by the public site and Studio. If the dataset is private, set `SANITY_API_READ_TOKEN` as well.

Set `NEXT_PUBLIC_SITE_URL` to the actual production URL for canonical metadata and the sitemap. Optional `SANITY_REVALIDATE_SECRET` secures the article revalidation webhook; otherwise article listings refresh on the normal cache interval.

## Release

Run `npm run lint`, `npm test`, and `npm run build`, then push to `main`. Vercel builds the new commit through its GitHub integration. Verify `/`, `/work`, `/blog`, and `/studio` on the production URL.

## Assets

Replace the files in `public/placeholders/` with final portrait and project imagery when available.
