import { defineType, defineField } from 'sanity';

export const capability = defineType({
  name: 'capability',
  title: 'Capability & Discipline',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Capability Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Overline Category (e.g. CORE ANALYTICS, SYSTEM ARCHITECTURE)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'skills',
      title: 'Associated Competencies & Skills',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'icon',
      title: 'Icon Identifier (e.g. analytics, account_tree, timeline)',
      type: 'string',
      initialValue: 'analytics',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
});
