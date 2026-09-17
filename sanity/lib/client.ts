import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn, readToken } from '../env';

export const client = createClient({
  projectId: projectId || 'demo-project-id',
  dataset: dataset || 'production',
  apiVersion,
  useCdn,
  perspective: 'published',
});

/**
 * Returns a client configured with token and preview perspective
 * for authorized draft/preview requests.
 */
export function getPreviewClient(previewToken?: string) {
  return createClient({
    projectId: projectId || 'demo-project-id',
    dataset: dataset || 'production',
    apiVersion,
    useCdn: false,
    perspective: 'previewDrafts',
    token: previewToken || readToken,
  });
}
