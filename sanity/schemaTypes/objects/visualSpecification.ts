import { defineType, defineField } from 'sanity';

export const visualSpecification = defineType({
  name: 'visualSpecification',
  title: 'Supporting Visual Specification',
  type: 'object',
  fields: [
    defineField({
      name: 'visualType',
      title: 'Visual Specification Type',
      type: 'string',
      options: {
        list: [
          { title: 'Process Flow', value: 'process_flow' },
          { title: 'Before / After Comparison', value: 'before_after' },
          { title: 'Stakeholder Map', value: 'stakeholder_map' },
          { title: 'Capability Map', value: 'capability_map' },
          { title: 'Qualitative Pipeline', value: 'qualitative_pipeline' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Visual Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'purpose',
      title: 'Analytical Purpose',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'isImplemented',
      title: 'Represents Implemented Work',
      type: 'boolean',
      initialValue: true,
      description: 'False if this visual represents a proposed/future recommendation.',
    }),
    defineField({
      name: 'elements',
      title: 'Content Elements / Stages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Element Label', type: 'string' }),
            defineField({ name: 'description', title: 'Description / Metric Note', type: 'string' }),
            defineField({ name: 'tag', title: 'Status or Category Tag', type: 'string' }),
            defineField({
              name: 'status',
              title: 'Status Indicator',
              type: 'string',
              options: {
                list: [
                  { title: 'Current / Baseline', value: 'current' },
                  { title: 'Improved / Delivered', value: 'improved' },
                  { title: 'Planned / Future', value: 'planned' },
                  { title: 'Neutral', value: 'neutral' },
                ],
              },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'accessibleSummary',
      title: 'Accessible Summary (Screen Readers)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'visualType',
    },
  },
});
