import { defineType, defineField } from 'sanity';

export const education = defineType({
  name: 'education',
  title: 'Academic Education',
  type: 'document',
  fields: [
    defineField({
      name: 'degree',
      title: 'Degree / Qualification Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'University / Institute Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Period / Graduation Years',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'honors',
      title: 'Academic Distinction / Honors (e.g. Gold Medalist)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Program Overview & Focus',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
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
      title: 'degree',
      subtitle: 'institution',
      period: 'period',
    },
    prepare({ title, subtitle, period }) {
      return {
        title,
        subtitle: `${subtitle} (${period})`,
      };
    },
  },
});
