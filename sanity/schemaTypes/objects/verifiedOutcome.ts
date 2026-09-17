import { defineType, defineField } from 'sanity';

export const verifiedOutcome = defineType({
  name: 'verifiedOutcome',
  title: 'Documented Impact / Outcome',
  type: 'object',
  fields: [
    defineField({
      name: 'metric',
      title: 'Metric / Highlight (e.g. "Weekly Cycle", "< 1 Year")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label / Dimension',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detail',
      title: 'Context / Factual Detail',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'metric',
      subtitle: 'label',
    },
  },
});
