import type { MetadataRoute } from 'next';
import { CAPABILITIES, CASE_STUDIES, SITE_METADATA } from '@/lib/fixtures/portfolio';
import { FLAGSHIP_PROJECTS } from '@/lib/content/project-selection';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || SITE_METADATA.siteUrl;
  const paths = [
    '', '/work', '/lab', '/expertise', '/experience', '/teaching', '/blog', '/about', '/contact',
    ...CAPABILITIES.map((item) => `/expertise/${item.id}`),
    ...CASE_STUDIES.map((item) => `/work/${item.slug}`),
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : FLAGSHIP_PROJECTS.some((item) => path === `/work/${item.slug}`) ? 0.8 : path === '/lab' || path.startsWith('/work/') ? 0.5 : 0.7,
  }));
}
