import { defineType, defineField } from 'sanity';

export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      description: 'Eyebrow text above the main CTA title.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Label',
      type: 'string',
    }),
    defineField({
      name: 'primaryButtonUrl',
      title: 'Primary Button URL / Anchor',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonUrl',
      title: 'Secondary Button URL / Anchor',
      type: 'string',
    }),
  ],
});
