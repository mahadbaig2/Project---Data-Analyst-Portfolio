import { z } from 'zod';

export const ExtractedCalculationSchema = z.object({
  measure: z.string().describe('Name of the measure, KPI, or metric'),
  formula: z.string().optional().describe('DAX, SQL, or pseudocode expression if mentioned'),
  purpose: z.string().describe('Commercial or operational purpose of this calculation'),
});

export const ExtractedOutcomeSchema = z.object({
  statement: z.string().describe('The outcome or impact statement'),
  metric: z.string().optional().describe('Specific number or percentage if explicitly stated in text'),
  evidenceExcerpt: z.string().optional().describe('Exact quote from the source supporting this outcome'),
});

export const ExtractedFactSchema = z.object({
  claim: z.string().describe('Extracted factual statement'),
  excerpt: z.string().describe('Exact or near-exact quote from source supporting this statement'),
  confidence: z.number().min(0).max(1).describe('Confidence score between 0 and 1'),
  explicitOrInferred: z.enum(['explicit', 'inferred']).describe('Whether directly quoted or logically deduced'),
  ambiguityNote: z.string().optional().describe('Notes on any ambiguity or contradiction in the source text'),
});

export const ProjectExtractionSchema = z.object({
  proposedProjectTitle: z.string().describe('Title representing the project work'),
  sourceSummary: z.string().describe('Concise 2-3 sentence overview of the project evidence'),
  domain: z.string().describe('Domain or industry (e.g. Retail & Multi-Branch Commerce, Logistics, Healthcare)'),
  industry: z.string().optional().describe('Broader commercial industry sector'),
  organizationCandidates: z.array(z.string()).default([]).describe('Any company or client names mentioned in text'),
  dateCandidates: z.array(z.string()).default([]).describe('Any dates, timeframes, or years mentioned'),
  roleCandidates: z.array(z.string()).default([]).describe('Roles or titles mentioned (e.g. Lead BI Analyst)'),
  stakeholders: z.array(z.string()).default([]).describe('Primary users, executives, or teams who consume outputs'),
  businessProblem: z.string().describe('The core operational or commercial challenge'),
  objectives: z.array(z.string()).default([]).describe('Concrete objectives stated for this initiative'),
  constraints: z.array(z.string()).default([]).describe('Data limitations, legacy system constraints, or timelines'),
  responsibilities: z.array(z.string()).default([]).describe('Direct responsibilities and engineering tasks performed'),
  dataSources: z.array(z.string()).default([]).describe('Source databases, flat files, APIs, or systems mentioned'),
  technologiesExplicitlyMentioned: z.array(z.string()).default([]).describe('Technologies verified in source text'),
  calculationsExplicitlyMentioned: z.array(ExtractedCalculationSchema).default([]),
  implementedWorkflow: z.array(z.string()).default([]).describe('Steps in the implemented data or reporting pipeline'),
  outputs: z.array(z.string()).default([]).describe('Deliverables shipped (e.g. weekly dashboard, semantic model)'),
  outcomes: z.array(ExtractedOutcomeSchema).default([]).describe('Results with quantitative or qualitative impact'),
  challenges: z.array(z.string()).default([]).describe('Technical, performance, or organizational roadblocks'),
  decisions: z.array(z.string()).default([]).describe('Architectural trade-offs or technical decisions made'),
  futureIdeas: z.array(z.string()).default([]).describe('Planned or proposed future enhancements not yet built'),
  unresolvedQuestions: z.array(z.string()).default([]).describe('Ambiguities or missing evidence requiring confirmation'),
  facts: z.array(ExtractedFactSchema).default([]),
});

export type ProjectExtraction = z.infer<typeof ProjectExtractionSchema>;
export type ExtractedCalculation = z.infer<typeof ExtractedCalculationSchema>;
export type ExtractedOutcome = z.infer<typeof ExtractedOutcomeSchema>;
export type ExtractedFact = z.infer<typeof ExtractedFactSchema>;
