import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Global Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Mirza Hammad Baig',
    }),
    defineField({
      name: 'role',
      title: 'Primary Professional Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Data Analyst & BI Solutions Architect',
    }),
    defineField({
      name: 'descriptor',
      title: 'Short Subtitle / Descriptor',
      type: 'string',
      initialValue: 'BI Solutions Architect · Power BI & SQL · Applied AI',
    }),
    defineField({
      name: 'valueChain',
      title: 'Value Chain Slogan',
      type: 'string',
      initialValue: 'DATA → SYSTEM → INSIGHT → DECISION → IMPACT',
    }),
    defineField({
      name: 'summary',
      title: 'Executive Summary',
      type: 'text',
      rows: 3,
      initialValue:
        'Transforming complex transactional data into high-performance dimensional star schemas, performant DAX calculation engines, and executive Power BI dashboards.',
    }),
    defineField({
      name: 'status',
      title: 'Availability Status',
      type: 'string',
      initialValue: 'Available for BI Solutions & Enterprise Analytics',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
      initialValue: 'hammadbaig.work@gmail.com',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Karachi, Pakistan',
    }),
    defineField({
      name: 'coreStack',
      title: 'Core Technical Stack',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Power BI', 'SQL Server', 'Python', 'Microsoft Fabric', 'DAX', 'Star Schema'],
    }),
    defineField({
      name: 'portrait',
      title: 'Professional Portrait',
      type: 'customImage',
      description: 'Portrait photo. If omitted, the website automatically renders the monogram avatar fallback.',
    }),
    defineField({
      name: 'cvFile',
      title: 'Curriculum Vitae (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Official downloadable CV file. If omitted, the site displays a "Verification on request" badge.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social & Professional Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'seo',
      title: 'Global SEO Defaults',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
    },
  },
});
