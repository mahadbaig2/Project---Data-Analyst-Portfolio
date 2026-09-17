import { defineType, defineField } from 'sanity';

export const generationRun = defineType({
  name: 'generationRun',
  title: 'AI Generation Run (Audit Trail)',
  type: 'document',
  fields: [
    defineField({
      name: 'sourceDocument',
      title: 'Source Document Reference',
      type: 'reference',
      to: [{ type: 'sourceDocument' }],
    }),
    defineField({
      name: 'targetCaseStudy',
      title: 'Target Case Study Draft',
      type: 'reference',
      to: [{ type: 'caseStudy' }],
    }),
    defineField({
      name: 'status',
      title: 'Run Status',
      type: 'string',
      options: {
        list: [
          { title: 'Queued', value: 'queued' },
          { title: 'Processing', value: 'processing' },
          { title: 'Completed Draft', value: 'completed' },
          { title: 'Failed with Warnings', value: 'failed' },
        ],
      },
      initialValue: 'queued',
    }),
    defineField({
      name: 'provider',
      title: 'Model Provider',
      type: 'string',
    }),
    defineField({
      name: 'model',
      title: 'Model Identifier',
      type: 'string',
    }),
    defineField({
      name: 'warnings',
      title: 'Validation & Evidence Warnings',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'reviewerStatus',
      title: 'Reviewer Approval',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Review', value: 'pending' },
          { title: 'Approved by Hammad', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'reviewerNotes',
      title: 'Reviewer Notes',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'provider',
      subtitle: 'status',
      status: 'reviewerStatus',
    },
    prepare({ title, subtitle, status }) {
      return {
        title: `Run: ${title || 'Unknown'} (${subtitle})`,
        subtitle: `Reviewer: ${status}`,
      };
    },
  },
});
