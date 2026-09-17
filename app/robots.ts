import type { MetadataRoute } from 'next';
import { SITE_METADATA } from '@/lib/fixtures/portfolio';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_METADATA.siteUrl;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
