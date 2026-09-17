export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

export const readToken =
  process.env.SANITY_API_READ_TOKEN || '';

export const writeToken =
  process.env.SANITY_API_WRITE_TOKEN || '';

export const revalidateSecret =
  process.env.SANITY_REVALIDATE_SECRET || '';

export const previewSecret =
  process.env.SANITY_PREVIEW_SECRET || '';

/**
 * Returns true if Sanity is genuinely configured with a valid project ID
 * and dataset, rather than being empty or unconfigured placeholders.
 */
export const isSanityConfigured = Boolean(
  projectId &&
  projectId.trim() !== '' &&
  projectId !== 'your_project_id_here' &&
  dataset &&
  dataset.trim() !== ''
);

export const useCdn = false;
