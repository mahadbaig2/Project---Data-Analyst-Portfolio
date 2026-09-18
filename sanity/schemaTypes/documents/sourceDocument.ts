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
      name: 'projectTitleHint',
      title: 'Project Title Hint (Optional)',
      type: 'string',
      description: 'Suggested title for the generated case study.',
    }),
    defineField({
      name: 'relatedOrganization',
      title: 'Target Organization / Client (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'relatedExperience',
      title: 'Related Career Experience',
      type: 'reference',
      to: [{ type: 'experience' }],
    }),
    defineField({
      name: 'relatedTechnologies',
      title: 'Known Technologies (Optional Hints)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'relatedCaseStudy',
      title: 'Target Case Study (if updating existing)',
      type: 'reference',
      to: [{ type: 'caseStudy' }],
    }),
    defineField({
      name: 'confidentialityStatus',
      title: 'Confidentiality Classification',
      type: 'string',
      options: {
        list: [
          { title: 'Public / Open Information', value: 'public' },
          { title: 'Employer / Client Permission Granted', value: 'permission_granted' },
          { title: 'Anonymized & Redacted', value: 'anonymized' },
          { title: 'Confidential — Do NOT Process', value: 'confidential_do_not_process' },
        ],
      },
      initialValue: 'anonymized',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'confidentialityAcknowledged',
      title: 'Confidentiality Acknowledgement',
      type: 'boolean',
      initialValue: false,
      description:
        'I acknowledge that this document contains no unauthorized confidential or proprietary information.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'processingStatus',
      title: 'Processing Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Upload / Review', value: 'pending' },
          { title: 'Extracting Facts', value: 'extracting' },
          { title: 'Draft Generated', value: 'generated' },
          { title: 'Generation Failed', value: 'failed' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'sourceHash',
      title: 'Source SHA-256 Hash',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'fileSizeBytes',
      title: 'File Size (Bytes)',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'latestRun',
      title: 'Latest Generation Audit Run',
      type: 'reference',
      to: [{ type: 'generationRun' }],
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Editorial Notes',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'processingStatus',
    },
  },
});
