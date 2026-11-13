import type { MetadataRoute } from 'next';
import { CASE_STUDIES, SITE_METADATA } from '@/lib/fixtures/portfolio';
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL || SITE_METADATA.siteUrl; return ['', '/work', '/expertise', '/experience', '/teaching', '/blog', '/about', ...CASE_STUDIES.map((item) => `/work/${item.slug}`)].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: 'monthly', priority: path === '' ? 1 : 0.7 })); }
