import { defineType, defineField } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Social Sharing',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Page title used in browser tabs and search engine results (recommended: 50-60 chars).',
      validation: (Rule) => Rule.max(70).warning('Titles longer than 70 characters may be truncated.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Summary used by search engines (recommended: 120-160 chars).',
      validation: (Rule) => Rule.max(180).warning('Descriptions longer than 180 characters may be truncated.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (Open Graph)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Descriptive alt text for accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines (noindex)',
      type: 'boolean',
      initialValue: false,
      description: 'Check to instruct search engines not to index this page.',
    }),
  ],
});
