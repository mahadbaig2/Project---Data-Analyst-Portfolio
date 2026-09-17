import { defineType, defineField } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Article & Publication',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article / Essay Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'series',
      title: 'Publication Series',
      type: 'string',
      initialValue: 'Understanding the Data Field',
    }),
    defineField({
      name: 'category',
      title: 'Discipline / Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Abstract / Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediumUrl',
      title: 'External Publication URL (Medium)',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured Essay',
      type: 'boolean',
      initialValue: false,
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
