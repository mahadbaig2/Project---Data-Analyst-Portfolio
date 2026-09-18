import { defineType, defineField } from 'sanity';

export const achievement = defineType({
  name: 'achievement',
  title: 'Verified Achievement & Evidence',
  type: 'document',
  fields: [
    defineField({
      name: 'claim',
      title: 'Claim Statement',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metricValue',
      title: 'Metric Value (if quantitative)',
      type: 'string',
      description: 'e.g. "< 1 Year", "Weekly". Leave empty if purely structural.',
    }),
    defineField({
      name: 'metricUnit',
      title: 'Metric Unit',
      type: 'string',
    }),
    defineField({
      name: 'organization',
      title: 'Organization / Context',
      type: 'string',
    }),
    defineField({
      name: 'verificationStatus',
      title: 'Verification Confidence',
      type: 'string',
      options: {
        list: [
          { title: 'Verified / Audited', value: 'verified' },
          { title: 'Pending Confirmation', value: 'pending' },
          { title: 'Development Note', value: 'dev-note' },
        ],
      },
      initialValue: 'verified',
    }),
    defineField({
      name: 'relatedExperience',
      title: 'Related Experience Document',
      type: 'reference',
      to: [{ type: 'experience' }],
    }),
    defineField({
      name: 'relatedCaseStudy',
      title: 'Related Case Study',
      type: 'reference',
      to: [{ type: 'caseStudy' }],
    }),
    defineField({
      name: 'isPublic',
      title: 'Publicly Visible',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'canUseAsProjectOutcome',
      title: 'Can Use as Project Outcome',
      type: 'boolean',
      initialValue: false,
      description:
        'Must remain false unless this achievement is explicitly linked to a specific project and authorized to be cited as an outcome.',
    }),
    defineField({
      name: 'allowedUsage',
      title: 'AI Generator Usage Permission',
      type: 'string',
      options: {
        list: [
          { title: 'General Professional Context Only', value: 'general_context' },
          { title: 'Specific Project Outcome (Linked Only)', value: 'project_outcome' },
          { title: 'Tone & Style Guidance Only', value: 'tone_guidance' },
        ],
      },
      initialValue: 'general_context',
    }),
    defineField({
      name: 'internalReviewNotes',
      title: 'Internal Review Notes',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'claim',
      subtitle: 'organization',
      status: 'verificationStatus',
    },
    prepare({ title, subtitle, status }) {
      return {
        title,
        subtitle: `${subtitle || 'Global'} [${status}]`,
      };
    },
  },
});
