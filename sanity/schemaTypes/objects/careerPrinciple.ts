import { defineType, defineField } from 'sanity';

export const careerPrinciple = defineType({
  name: 'careerPrinciple',
  title: 'Career Principle & Standard',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Index (e.g. 01, 02)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Principle Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'axiom',
      title: 'Axiom / Core Quote',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Operational Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'axiom',
    },
  },
});
