import { Arrow } from '@/components/portfolio/Arrow';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { sanityFetch } from '@/sanity/lib/fetch';
type Article = { title: string; summary?: string; body?: PortableTextBlock[]; mediumUrl?: string };
async function getArticle(slug: string) { return sanityFetch<Article>({ query: `*[_type == "article" && slug.current == $slug][0] { title, summary, body, mediumUrl }`, params: { slug }, tags: ['article'], fallbackData: null }); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const article = await getArticle(slug); return { title: article?.title || 'Article', description: article?.summary }; }
export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const article = await getArticle(slug); if (!article) notFound(); return <article className="inner-page section-pad blog-article"><Link className="back-link" href="/blog">← All writing</Link><div className="page-hero"><h1>{article.title}</h1>{article.summary && <p>{article.summary}</p>}</div><div className="article-body">{article.body?.length ? <PortableText value={article.body} /> : <p>This article is being prepared. {article.mediumUrl && <a href={article.mediumUrl} target="_blank" rel="noreferrer">Read it on Medium <Arrow /></a>}</p>}</div></article>; }
