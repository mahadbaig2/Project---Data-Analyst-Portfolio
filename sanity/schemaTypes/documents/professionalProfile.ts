import { defineType, defineField } from 'sanity';

export const professionalProfile = defineType({
  name: 'professionalProfile',
  title: 'Professional Profile & Context',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      initialValue: 'Mirza Hammad Baig',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'positioningStatement',
      title: 'Approved Positioning Statement',
      type: 'text',
      rows: 3,
      description: 'The core positioning text used for executive summaries and bios.',
    }),
    defineField({
      name: 'primaryDomains',
      title: 'Primary Operational Domains',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Commercial Retail', 'Distribution Logistics', 'Hospitality & Revenue', 'Data Education'],
    }),
    defineField({
      name: 'toneGuidance',
      title: 'Tone & Communication Standards',
      type: 'text',
      rows: 3,
      initialValue: 'Executive, analytical, restrained, evidence-grounded. Avoid hyperbole or fabricated percentages.',
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Review Notes',
      type: 'text',
      rows: 3,
      description: 'Private editorial notes (never rendered publicly).',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'positioningStatement',
    },
  },
});
