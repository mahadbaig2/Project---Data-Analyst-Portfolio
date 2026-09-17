import { defineType, defineField } from 'sanity';

export const writingPage = defineType({
  name: 'writingPage',
  title: 'Writing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Publications & Field Maps',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Writing & Thought Leadership',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Structured technical essays deconstructing the fragmented data landscape into first principles for students, analysts, and engineering leaders.',
    }),
    defineField({
      name: 'seriesTitle',
      title: 'Featured Series Title',
      type: 'string',
      initialValue: 'Understanding the Data Field: A Comprehensive Series',
    }),
    defineField({
      name: 'seriesDescription',
      title: 'Series Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mediumUrl',
      title: 'Medium Publication URL',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'featuredArticle',
      title: 'Featured Article Reference',
      type: 'reference',
      to: [{ type: 'article' }],
    }),
    defineField({
      name: 'knowledgeMapLayers',
      title: 'Field Knowledge Map Layers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'layer', title: 'Layer Name', type: 'string' }),
            defineField({ name: 'description', title: 'Layer Scope', type: 'text', rows: 2 }),
            defineField({
              name: 'examples',
              title: 'Associated Technologies & Concepts',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'whyIWriteReason',
      title: 'Why I Write Rationale',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'teachingConnection',
      title: 'Connection to Teaching & Delivery',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'seo',
      title: 'Page SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Writing Page',
        subtitle: 'Singleton Document',
      };
    },
  },
});
