import { defineType, defineField } from 'sanity';

export const teachingPage = defineType({
  name: 'teachingPage',
  title: 'Teaching Page',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Faculty & Mentorship',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Teaching & Knowledge Transfer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Treating education as an essential engineering discipline. Guiding aspiring analysts and corporate teams from theoretical syntax to production business intelligence.',
    }),
    defineField({
      name: 'lecturerHero',
      title: 'Atomcamp Academic Faculty Spotlight',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string', initialValue: 'Academic Faculty Role' }),
        defineField({ name: 'role', title: 'Role Title', type: 'string', initialValue: 'Power BI Lecturer & Technical Mentor' }),
        defineField({ name: 'institution', title: 'Institution', type: 'string', initialValue: 'Atomcamp' }),
        defineField({ name: 'summary', title: 'Summary Description', type: 'text', rows: 3 }),
        defineField({
          name: 'pedagogicalFocus',
          title: 'Pedagogical Focus Items',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({
      name: 'corporateTrainingNote',
      title: 'Corporate Training Note (Muller & Phipps)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'learningFlow',
      title: 'Applied Learning Flow (6 Phases)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Step Label', type: 'string' }),
            defineField({ name: 'title', title: 'Phase Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'editorialStatement',
      title: 'Editorial Quote',
      type: 'object',
      fields: [
        defineField({ name: 'quote', title: 'Core Axiom / Quote', type: 'string' }),
        defineField({ name: 'commentary', title: 'Detailed Rationale', type: 'text', rows: 2 }),
      ],
    }),
    defineField({
      name: 'mentorshipThemes',
      title: '1-on-1 Mentorship Themes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Theme Title', type: 'string' }),
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
        title: title || 'Teaching Page',
        subtitle: 'Singleton Document',
      };
    },
  },
});
