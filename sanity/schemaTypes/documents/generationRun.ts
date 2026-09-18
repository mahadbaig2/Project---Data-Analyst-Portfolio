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
      name: 'stage',
      title: 'Active Pipeline Stage',
      type: 'string',
    }),
    defineField({
      name: 'progressMessage',
      title: 'Safe Progress Message',
      type: 'string',
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
      name: 'promptVersion',
      title: 'Prompt Version',
      type: 'string',
    }),
    defineField({
      name: 'schemaVersion',
      title: 'Schema Version',
      type: 'string',
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'datetime',
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'datetime',
    }),
    defineField({
      name: 'durationMs',
      title: 'Duration (ms)',
      type: 'number',
    }),
    defineField({
      name: 'retryCount',
      title: 'Retry Attempt Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'previousRun',
      title: 'Previous Run Reference (if retry)',
      type: 'reference',
      to: [{ type: 'generationRun' }],
    }),
    defineField({
      name: 'warnings',
      title: 'Validation & Evidence Warnings',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'extractionSnapshot',
      title: 'Extraction Summary Snapshot',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'selectedContextSummary',
      title: 'Selected Professional Context Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'evidenceMapSnapshot',
      title: 'Evidence Map Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'validationSummary',
      title: 'Validation Report Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'errorCategory',
      title: 'Error Safe Category',
      type: 'string',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Safe Error Message',
      type: 'string',
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
