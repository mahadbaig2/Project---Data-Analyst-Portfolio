import { z } from 'zod';

export const ContextItemSchema = z.object({
  id: z.string(),
  type: z.enum([
    'experience',
    'achievement',
    'capability',
    'technology',
    'case_study',
    'profile',
    'teaching',
    'education',
  ]),
  title: z.string(),
  organization: z.string().optional(),
  period: z.string().optional(),
  summary: z.string(),
  relevanceScore: z.number().min(0).max(100),
  relevanceReason: z.string(),
  allowedUsage: z.enum([
    'general_context',
    'project_specific_fact',
    'project_outcome',
    'tone_guidance',
  ]),
  canUseAsProjectOutcome: z.boolean().default(false),
  verificationStatus: z.enum(['verified', 'pending', 'unsupported']).default('verified'),
  sourceSanityId: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export const ContextPackSchema = z.object({
  domain: z.string(),
  matchedOrganization: z.string().optional(),
  items: z.array(ContextItemSchema),
  relevantTechnologies: z.array(z.string()),
  writingToneGuidance: z.string(),
  summaryRationale: z.string(),
});

export type ContextItem = z.infer<typeof ContextItemSchema>;
export type ContextPack = z.infer<typeof ContextPackSchema>;
