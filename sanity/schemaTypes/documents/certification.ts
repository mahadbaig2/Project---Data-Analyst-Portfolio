import { defineType, defineField } from 'sanity';

export const certification = defineType({
  name: 'certification',
  title: 'Professional Certification',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Certification Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing Organization (e.g. DataCamp, Atomcamp)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'credentialType',
      title: 'Credential Level / Type (e.g. Career Track, Verified Bootcamp)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Credential Verification URL',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'skills',
      title: 'Covered Competencies',
      type: 'array',
      of: [{ type: 'string' }],
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
      subtitle: 'issuer',
    },
  },
});
