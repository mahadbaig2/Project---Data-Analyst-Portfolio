import { defineType, defineField } from 'sanity';

export const architectureNode = defineType({
  name: 'architectureNode',
  title: 'Architecture Node',
  type: 'object',
  fields: [
    defineField({
      name: 'nodeId',
      title: 'Node Identifier (slug / key)',
      type: 'string',
      description: 'Unique slug used to connect edges (e.g. "sales-fact", "dim-store").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category / Architectural Stage',
      type: 'string',
      description: 'e.g. "Fact Table", "Dimension", "Ingestion Layer", "Visualization".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Key Attributes / Columns',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'detail',
      title: 'Technical Note',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
});
