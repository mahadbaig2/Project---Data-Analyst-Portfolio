# Mirza Hammad Baig portfolio

A Next.js portfolio with static content and a Sanity-powered blog.

## Content

- Portfolio pages and case studies are hard coded in `app/` and `lib/fixtures/portfolio.ts`.
- Project decision stories live in `lib/content/project-stories.ts`. The six expertise pages and their project links live in `lib/content/expertise.ts`.
- `/contact` shows the public contact channels without a form.
- Temporary local imagery lives in `public/placeholders/`. Replace those files with final photos and project visuals when available.
- Blog articles are the only editable Sanity document type. Use `/studio` to edit them. The eight verified Medium posts in `lib/content/articles.ts` provide a static baseline until they can be imported into Sanity. Articles with a slug and body have a page at `/blog/[slug]`; external articles link to Medium.
- `/writing` redirects to `/blog` for existing links.

## Run

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` for blog content. `NODE_USE_ENV_PROXY=1` in the npm scripts allows Node to use a configured network proxy when one is present.

## Verify

```bash
npm run build
npm run lint
```
