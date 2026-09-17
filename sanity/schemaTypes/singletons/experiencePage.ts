import { defineType, defineField } from 'sanity';

export const experiencePage = defineType({
  name: 'experiencePage',
  title: 'Experience Page',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Career History',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Experience & Career Chronology',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      initialValue:
        'A verified record of enterprise data roles, cross-functional department enablement, dimensional data architecture, and commercial BI delivery.',
    }),
    defineField({
      name: 'supportedDepartments',
      title: 'Cross-Functional Stakeholder Partnerships',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'dept', title: 'Department Name', type: 'string' }),
            defineField({ name: 'focus', title: 'Analytical Focus', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'workingStyles',
      title: 'Working Style & Competencies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Competency Name', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon Key', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'finalCta',
      title: 'Page CTA',
      type: 'cta',
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
        title: title || 'Experience Page',
        subtitle: 'Singleton Document',
      };
    },
  },
});
