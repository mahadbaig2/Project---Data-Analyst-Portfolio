import { defineType, defineField } from 'sanity';

export const architectureEdge = defineType({
  name: 'architectureEdge',
  title: 'Architecture Edge / Lineage',
  type: 'object',
  fields: [
    defineField({
      name: 'from',
      title: 'From (Source Node Identifier)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'to',
      title: 'To (Target Node Identifier)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Relationship / Cardinality Label',
      type: 'string',
      description: 'e.g. "1:N conformed", "Ingests into", "Filters by".',
    }),
  ],
  preview: {
    select: {
      from: 'from',
      to: 'to',
      label: 'label',
    },
    prepare({ from, to, label }) {
      return {
        title: `${from} → ${to}`,
        subtitle: label || 'Relationship',
      };
    },
  },
});
