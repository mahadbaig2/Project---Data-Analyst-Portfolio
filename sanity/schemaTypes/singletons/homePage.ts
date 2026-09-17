import { defineType, defineField } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
      initialValue: 'Executive Analytics Workspace',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'Mirza Hammad Baig',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Data Analyst & BI Solutions Architect specializing in conformed Kimball dimensional models, high-performance Power BI reporting suites, and automated analytical pipelines.',
    }),
    defineField({
      name: 'indicators',
      title: 'Executive Evidence Indicators',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'overline', title: 'Overline Label', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredCaseStudy',
      title: 'Primary Featured Case Study',
      type: 'reference',
      to: [{ type: 'caseStudy' }],
      description: 'The hero case study highlighted with an expanded preview bento.',
    }),
    defineField({
      name: 'secondaryCaseStudies',
      title: 'Secondary Case Studies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
      description: 'Additional case studies displayed in the overview grid.',
    }),
    defineField({
      name: 'careerNarrativeTitle',
      title: 'Career Narrative Title',
      type: 'string',
      initialValue: 'From Operational Logistics to Enterprise BI Architecture',
    }),
    defineField({
      name: 'careerNarrativeBody',
      title: 'Career Narrative Body',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'finalCta',
      title: 'Final Page CTA',
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
      title: 'heroTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Home Page',
        subtitle: 'Singleton Document',
      };
    },
  },
});
