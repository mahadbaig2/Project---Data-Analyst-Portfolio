import { client, getPreviewClient } from './client';
import { isSanityConfigured } from '../env';

export interface SanityFetchOptions<T> {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  isDraftMode?: boolean;
  previewToken?: string;
  fallbackData?: T | null;
}

/**
 * Robust server-side Sanity fetch wrapper with graceful fallback to fixture data.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  isDraftMode = false,
  previewToken,
  fallbackData,
}: SanityFetchOptions<T>): Promise<T | null> {
  if (!isSanityConfigured) {
    if (process.env.NODE_ENV === 'development') {
      // Development-only informative notification
      // console.info('[Sanity] No remote project ID configured; using local verified fixture data.');
    }
    return fallbackData ?? null;
  }

  try {
    const selectedClient = isDraftMode
      ? getPreviewClient(previewToken)
      : client;

    const data = await selectedClient.fetch<T>(query, params, {
      next: {
        tags,
        revalidate: isDraftMode ? 0 : 3600, // 1 hour cache, or on-demand revalidation via tags
      },
    });

    if (data === null || data === undefined) {
      return fallbackData ?? null;
    }

    return data;
  } catch (error) {
    console.error('[Sanity Fetch Error]:', error instanceof Error ? error.message : error);
    // In case of network or API error, gracefully return fallback data to prevent site downtime
    return fallbackData ?? null;
  }
}
