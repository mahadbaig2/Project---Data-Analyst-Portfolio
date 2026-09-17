import type { MetadataRoute } from 'next';
import { CASE_STUDIES, SITE_METADATA } from '@/lib/fixtures/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
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

  const caseStudyRoutes = CASE_STUDIES.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: project.isFeatured ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
