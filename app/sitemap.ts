import type { MetadataRoute } from 'next';
import { getCaseStudySlugs } from '@/lib/adapters/sanity-adapter';
import { SITE_METADATA } from '@/lib/fixtures/portfolio';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_METADATA.siteUrl;

  const staticRoutes = [
    '',
    '/work',
    '/experience',
    '/expertise',
    '/teaching',
    '/writing',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const slugs = await getCaseStudySlugs();
  const caseStudyRoutes = slugs.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
