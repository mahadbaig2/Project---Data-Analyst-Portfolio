import type { StructureResolver } from 'sanity/structure';
export const structure: StructureResolver = (S) => S.list().title('Blog Studio').items([S.documentTypeListItem('article').title('Articles')]);
