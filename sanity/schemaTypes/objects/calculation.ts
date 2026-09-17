import { defineType, defineField } from 'sanity';

export const calculation = defineType({
  name: 'calculation',
  title: 'Analytical Calculation / DAX Measure',
  type: 'object',
  fields: [
    defineField({
      name: 'measure',
      title: 'Measure Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formula',
      title: 'DAX / SQL Expression',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'purpose',
      title: 'Analytical Purpose & Context',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'measure',
      subtitle: 'purpose',
    },
  },
});
