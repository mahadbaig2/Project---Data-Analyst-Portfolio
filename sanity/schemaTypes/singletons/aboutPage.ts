import { defineType, defineField } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About & Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Professional Profile',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Mirza Hammad Baig',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Analyst · Solutions Architect · Educator · Builder. Operating at the convergence of enterprise data modeling, business intelligence, and practical knowledge transfer.',
    }),
    defineField({
      name: 'narrativeHeadline',
      title: 'Hero Narrative Headline',
      type: 'string',
      initialValue: 'Architecting Resilient Data Systems & Business Intelligence',
    }),
    defineField({
      name: 'narrativeBody',
      title: 'Hero Narrative Body',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'identityPillars',
      title: 'Four Identity Pillars',
      type: 'array',
      of: [{ type: 'identityPillar' }],
    }),
    defineField({
      name: 'careerPrinciples',
      title: 'Career Principles & Standards',
      type: 'array',
      of: [{ type: 'careerPrinciple' }],
    }),
    defineField({
      name: 'contactHeading',
      title: 'Contact Section Headline',
      type: 'string',
      initialValue: "Let's turn data into something useful.",
    }),
    defineField({
      name: 'contactDescription',
      title: 'Contact Section Description',
      type: 'text',
      rows: 2,
      initialValue:
        'For analytics consulting, enterprise BI solution architecture, corporate training, or career opportunities.',
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
        title: title || 'About Page',
        subtitle: 'Singleton Document',
      };
    },
  },
});
