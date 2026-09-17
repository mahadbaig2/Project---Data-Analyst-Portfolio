import { defineType, defineField } from 'sanity';

export const expertisePage = defineType({
  name: 'expertisePage',
  title: 'Expertise Page',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Technical Capabilities',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Expertise & Data System Architecture',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Comprehensive technical capabilities spanning the complete data lifecycle: dimensional modeling, business intelligence, relational pipelines, and applied AI.',
    }),
    defineField({
      name: 'valueChainSteps',
      title: 'Value Chain Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Step Label', type: 'string' }),
            defineField({ name: 'sub', title: 'Subtitle / Description', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'problemsIWorkOn',
      title: 'Problems I Work On',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Problem Title', type: 'string' }),
            defineField({ name: 'description', title: 'Operational Impact / Resolution', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'professionalApproach',
      title: '7-Step Delivery Methodology',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Step Number', type: 'string' }),
            defineField({ name: 'title', title: 'Phase Title', type: 'string' }),
            defineField({ name: 'detail', title: 'Methodology Detail', type: 'text', rows: 2 }),
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
        title: title || 'Expertise Page',
        subtitle: 'Singleton Document',
      };
    },
  },
});
