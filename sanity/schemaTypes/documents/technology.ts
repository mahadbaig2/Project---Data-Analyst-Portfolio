import { defineType, defineField } from 'sanity';

export const technology = defineType({
  name: 'technology',
  title: 'Technology Group',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Ecosystem Group Category (e.g. Analytics & BI, Data & Engineering)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Group Scope Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'technologies',
      title: 'Member Technologies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Tool / Language Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'context', title: 'Operational Context', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'category',
      subtitle: 'description',
    },
  },
});
