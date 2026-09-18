import { z } from 'zod';

export const EvidenceClaimSchema = z.object({
  claimId: z.string().describe('Stable claim identifier, e.g. CLM-01'),
  claimText: z.string().describe('Specific statement made in the draft'),
  claimType: z.enum([
    'project_fact',
    'professional_context',
    'inference',
    'recommendation',
    'unverified',
    'conflicting',
  ]),
  sourceType: z.enum([
    'uploaded_document',
    'sanity_context',
    'model_inference',
    'none',
  ]),
  sourceLocator: z.string().describe('Reference pointer or line/section in source'),
  evidenceExcerpt: z.string().describe('Quoted supporting excerpt if available'),
  confidence: z.number().min(0).max(1),
  isProjectSpecific: z.boolean().describe('True if this relates specifically to this project'),
  verificationState: z.enum([
    'supported',
    'partially_supported',
    'requires_confirmation',
    'unsupported',
    'conflicting',
  ]),
  allowedPlacement: z.array(z.string()).describe('Sections where this claim may be placed'),
  reviewerNote: z.string().optional(),
  missingReason: z.string().optional(),
});

export const EvidenceMapSchema = z.object({
  claims: z.array(EvidenceClaimSchema),
  supportedCount: z.number().default(0),
  unsupportedCount: z.number().default(0),
  requiresConfirmationCount: z.number().default(0),
  conflictingCount: z.number().default(0),
  summary: z.string(),
});

export type EvidenceClaim = z.infer<typeof EvidenceClaimSchema>;
export type EvidenceMap = z.infer<typeof EvidenceMapSchema>;
