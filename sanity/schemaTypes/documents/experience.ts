import { defineType, defineField } from 'sanity';

export const experience = defineType({
  name: 'experience',
  title: 'Career Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Timeline (e.g. Jun 2026 – Present)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isCurrent',
      title: 'Is Current Appointment',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'appointmentType',
      title: 'Appointment Category (e.g. Enterprise Role, Fast-Track Promotion)',
      type: 'string',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order (lowest first)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'scopeOverview',
      title: 'Role Scope Overview',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'responsibilities',
      title: 'Key Responsibilities & System Ownership',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'technologies',
      title: 'Core Technologies Utilized',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'supportedDepartments',
      title: 'Supported Stakeholder Departments',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'verifiedOutcomes',
      title: 'Documented Operational Outcomes',
      type: 'array',
      of: [{ type: 'verifiedOutcome' }],
    }),
  ],
  preview: {
    select: {
      title: 'role',
      subtitle: 'company',
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
