import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId } from '../env';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || 'demo-project-id',
  dataset: dataset || 'production',
});

export function urlForImage(source: Image | { asset?: unknown } | null | undefined) {
  if (!source || !source.asset) {
    return null;
  }
  return imageBuilder.image(source as Image).auto('format').fit('max');
}
