import { defineType, defineField } from 'sanity';

export const identityPillar = defineType({
  name: 'identityPillar',
  title: 'Identity Pillar',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Pillar Number (e.g. 01, 02)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Functional Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'focusArea',
      title: 'Primary Focus Area',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'role',
    },
  },
});
