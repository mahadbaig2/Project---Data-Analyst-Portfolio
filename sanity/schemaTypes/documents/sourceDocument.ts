import { defineType, defineField } from 'sanity';

export const sourceDocument = defineType({
  name: 'sourceDocument',
  title: 'Source Document (AI Generator Input)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceType',
      title: 'Source Format',
      type: 'string',
      options: {
        list: [
          { title: 'Markdown File (.md)', value: 'markdown' },
          { title: 'Pasted Raw Text', value: 'text' },
        ],
      },
      initialValue: 'markdown',
    }),
    defineField({
      name: 'sourceFile',
      title: 'Source Markdown File',
      type: 'file',
      options: {
        accept: '.md,.txt',
      },
    }),
    defineField({
      name: 'rawContent',
      title: 'Raw Text Content',
      type: 'text',
      rows: 10,
    }),
    defineField({
      name: 'relatedCaseStudy',
      title: 'Target Case Study (if existing)',
      type: 'reference',
      to: [{ type: 'caseStudy' }],
    }),
    defineField({
      name: 'confidentialityAcknowledged',
      title: 'Confidentiality & Anonymization Verified',
      type: 'boolean',
      initialValue: false,
      description: 'Confirms that proprietary credentials and sensitive data are redacted prior to processing.',
    }),
    defineField({
      name: 'processingStatus',
      title: 'Processing Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Upload', value: 'pending' },
          { title: 'Extracted', value: 'extracted' },
          { title: 'Draft Generated', value: 'generated' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'pending',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'processingStatus',
    },
  },
});
