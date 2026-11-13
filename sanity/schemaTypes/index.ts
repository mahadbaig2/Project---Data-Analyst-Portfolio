import type { SchemaTypeDefinition } from 'sanity';
import { article } from './documents/article';
import { blockContent } from './objects/blockContent';
export const schema: { types: SchemaTypeDefinition[] } = { types: [article, blockContent] };
