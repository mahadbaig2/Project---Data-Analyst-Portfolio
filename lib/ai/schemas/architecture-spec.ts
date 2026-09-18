import { z } from 'zod';

export const ArchitectureNodeSpecSchema = z.object({
  id: z.string().describe('Unique slug identifier for node, e.g. "sales-pos-extract"'),
  title: z.string().describe('Concise node title'),
  category: z.string().describe('Architectural stage or table type: Ingestion, Staging, Fact Table, Dimension, Semantic Model, Visualization'),
  items: z.array(z.string()).optional().describe('Key columns, attributes, or tables'),
  detail: z.string().optional().describe('Technical note or pipeline frequency'),
  implementationStatus: z.enum(['implemented', 'proposed', 'contextual']).optional().default('implemented'),
  evidenceClaimIds: z.array(z.string()).optional().default([]),
});

export const ArchitectureEdgeSpecSchema = z.object({
  from: z.string().describe('Source node ID'),
  to: z.string().describe('Target node ID'),
  label: z.string().optional().describe('Transformation or data flow description'),
  flowType: z.enum(['batch_etl', 'relational_cardinality', 'api_stream', 'semantic_link']).optional(),
  implementationStatus: z.enum(['implemented', 'proposed']).optional().default('implemented'),
  evidenceClaimIds: z.array(z.string()).optional().default([]),
});

export const ArchitectureGraphSpecSchema = z.object({
  title: z.string().default('Data Lineage & Dimensional Flow'),
  nodes: z.array(ArchitectureNodeSpecSchema).min(1),
  edges: z.array(ArchitectureEdgeSpecSchema).default([]),
  textSummary: z.string().min(10).describe('Human-readable description for screen readers detailing the pipeline flow'),
});

export type ArchitectureNodeSpec = z.infer<typeof ArchitectureNodeSpecSchema>;
export type ArchitectureEdgeSpec = z.infer<typeof ArchitectureEdgeSpecSchema>;
export type ArchitectureGraphSpec = z.infer<typeof ArchitectureGraphSpecSchema>;
