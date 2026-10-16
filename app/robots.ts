import type { MetadataRoute } from 'next';
import { SITE_METADATA } from '@/lib/fixtures/portfolio';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_METADATA.siteUrl;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/studio',
        '/studio/',
        '/api/',
        '/api/ai/',
        '/api/draft-mode/',
        '/api/revalidate',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
