import { Arrow } from '@/components/portfolio/Arrow';
import type { Metadata } from 'next';
import { getBlogArticles } from '@/lib/content/articles';

export const metadata: Metadata = { title: 'Blog', description: 'Published essays by Mirza Hammad Baig on data, analytics, and the wider data field.' };

export default async function BlogPage() {
  const articles = await getBlogArticles();
  return <div className="inner-page section-pad">
    <div className="page-hero" data-reveal><h1>My writing<span className="yellow-dot">.</span></h1><p>Published essays on the ideas, roles, and foundations behind modern data work.</p></div>
    <div className="blog-list">{articles.map((article, index) => {
      const external = !article.slug && Boolean(article.mediumUrl);
      return <a className="blog-item" href={article.slug ? `/blog/${article.slug}` : article.mediumUrl || '/blog'} key={article._id} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} data-reveal>
        <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : `0${index + 1}`}</span>
        <div><h2>{article.title}</h2>{article.summary && <p>{article.summary}</p>}</div><b><Arrow /></b>
      </a>;
    })}</div>
    <a className="text-link blog-medium-link" href="https://medium.com/@mirzahammadbaig147" target="_blank" rel="noreferrer">More on Medium <Arrow /></a>
  </div>;
}
