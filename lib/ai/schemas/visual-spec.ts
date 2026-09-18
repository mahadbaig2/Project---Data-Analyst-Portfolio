import { z } from 'zod';

export const VisualTypeEnum = z.enum([
  'process_flow',
  'before_after',
  'stakeholder_map',
  'capability_map',
  'qualitative_pipeline',
]);

export const VisualElementSchema = z.object({
  label: z.string(),
  description: z.string().optional(),
  tag: z.string().optional(),
  status: z.enum(['current', 'improved', 'planned', 'neutral']).default('neutral'),
});

export const SupportingVisualSpecSchema = z.object({
  id: z.string(),
  visualType: VisualTypeEnum,
  title: z.string(),
  purpose: z.string(),
  isImplemented: z.boolean().default(true),
  elements: z.array(VisualElementSchema).default([]),
  beforeState: z.array(z.string()).optional(),
  afterState: z.array(z.string()).optional(),
  accessibleSummary: z.string(),
  evidenceClaimIds: z.array(z.string()).default([]),
});

export type VisualType = z.infer<typeof VisualTypeEnum>;
export type SupportingVisualSpec = z.infer<typeof SupportingVisualSpecSchema>;
