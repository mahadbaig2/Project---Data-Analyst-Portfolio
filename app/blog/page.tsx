import { Arrow } from '@/components/portfolio/Arrow';
import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/lib/fetch';

type Article = { _id: string; title: string; category?: string; summary?: string; mediumUrl?: string; slug?: string };
export const metadata: Metadata = { title: 'Blog', description: 'Writing about data, analytics and building useful systems.' };
export default async function BlogPage() {
  const articles = await sanityFetch<Article[]>({ query: `*[_type == "article"] | order(displayOrder asc, _createdAt desc) { _id, title, category, summary, mediumUrl, "slug": slug.current }`, tags: ['article'], fallbackData: [] });
  return <div className="inner-page section-pad"><div className="page-hero" data-reveal><h1>Ideas worth<br /><span>sharing.</span></h1><p>Notes on data, decisions, and making the complicated easier to understand.</p></div><div className="blog-list">{articles && articles.length ? articles.map((article, index) => <a className="blog-item" href={article.slug ? `/blog/${article.slug}` : article.mediumUrl || '#'} key={article._id} target={!article.slug && article.mediumUrl ? '_blank' : undefined} rel={!article.slug && article.mediumUrl ? 'noreferrer' : undefined} data-reveal><span>0{index + 1}</span><div><h2>{article.title}</h2>{article.summary && <p>{article.summary}</p>}</div><b><Arrow /></b></a>) : <div className="blog-empty" data-reveal><h2>New writing is on its way.</h2><p>Check back soon for essays and field notes.</p></div>}</div></div>;
}
