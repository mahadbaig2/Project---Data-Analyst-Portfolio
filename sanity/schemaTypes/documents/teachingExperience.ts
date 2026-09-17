import { defineType, defineField } from 'sanity';

export const teachingExperience = defineType({
  name: 'teachingExperience',
  title: 'Teaching Topic & Curriculum',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Curriculum Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'track',
      title: 'Track Identifier (e.g. BI Track, Python Track)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Course Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coreConcepts',
      title: 'Core Concepts Covered',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience Profile',
      type: 'string',
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
      title: 'title',
      subtitle: 'track',
    },
  },
});
