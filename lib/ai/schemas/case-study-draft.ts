import { z } from 'zod';
import { ArchitectureGraphSpecSchema } from './architecture-spec';
import { SupportingVisualSpecSchema } from './visual-spec';

export const CaseStudyDraftSchema = z.object({
  title: z.string().min(5),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be kebab-case lowercase'),
  summary: z.string().min(20).describe('Concise executive summary for cards and headers'),
  domain: z.string(),
  category: z.enum([
    'Business Intelligence',
    'Data Analytics',
    'Data Engineering',
    'AI / Automation',
  ]),
  organization: z.string().optional(),
  role: z.string().default('Lead BI Architect & Analyst'),
  period: z.string().default('Production Deployment'),
  status: z.enum([
    'Production Deployed',
    'Operational',
    'Architecture Blueprint',
  ]).default('Production Deployed'),
  confidentiality: z.string().default('Client-Anonymized Enterprise Solution'),
  problem: z.string().min(20).describe('The core operational dilemma and business stakes'),
  background: z.string().optional().describe('Commercial context and executive sponsorship'),
  primaryUser: z.string().default('Executive Leadership & Commercial Operations'),
  objectives: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
    })
  ).min(1),
  dataSources: z.array(z.string()).default([]),
  responsibilities: z.array(z.string()).default([]),
  technologies: z.array(z.string()).min(1),
  calculations: z.array(
    z.object({
      measure: z.string(),
      formula: z.string(),
      purpose: z.string(),
    })
  ).default([]),
  architecture: ArchitectureGraphSpecSchema.optional(),
  supportingVisuals: z.array(SupportingVisualSpecSchema).default([]),
  outcomes: z.array(z.string()).default([]),
  decisions: z.array(z.string()).default([]),
  challenges: z.array(z.string()).default([]),
  learnings: z.array(z.string()).default([]),
  futureRoadmap: z.array(z.string()).default([]),
  seoTitle: z.string().max(70),
  seoDescription: z.string().max(160),
  missingInformationWarnings: z.array(z.string()).default([]),
  sectionClaimMap: z.record(z.string(), z.array(z.string())).default({}),
});

export type CaseStudyDraft = z.infer<typeof CaseStudyDraftSchema>;
