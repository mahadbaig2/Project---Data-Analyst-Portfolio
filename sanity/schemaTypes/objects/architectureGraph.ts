import { defineType, defineField } from 'sanity';

export const architectureGraph = defineType({
  name: 'architectureGraph',
  title: 'Architecture Diagram / System Flow',
  type: 'object',
  fields: [
    defineField({
      name: 'nodes',
      title: 'Nodes / Entities',
      type: 'array',
      of: [{ type: 'architectureNode' }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'edges',
      title: 'Connections / Data Flow Edges',
      type: 'array',
      of: [{ type: 'architectureEdge' }],
    }),
    defineField({
      name: 'textSummary',
      title: 'Text Alternative (Accessibility)',
      type: 'text',
      rows: 3,
      description: 'Human-readable summary of the architecture flow for screen readers and high-contrast fallbacks.',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
