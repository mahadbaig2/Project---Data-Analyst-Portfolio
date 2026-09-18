import { z } from 'zod';

export type AiProviderName = 'mock' | 'gemini' | 'groq' | 'openai';

export type RunStage =
  | 'queued'
  | 'extracting'
  | 'building_context'
  | 'mapping_evidence'
  | 'drafting'
  | 'planning_visuals'
  | 'validating'
  | 'creating_draft'
  | 'completed'
  | 'completed_with_warnings'
  | 'failed'
  | 'cancelled';

export type ReviewerStatus = 'pending' | 'approved' | 'rejected';

export type ConfidentialityStatus =
  | 'public'
  | 'permission_granted'
  | 'anonymized'
  | 'confidential_do_not_process';

export type ClaimType =
  | 'project_fact'
  | 'professional_context'
  | 'inference'
  | 'recommendation'
  | 'unverified'
  | 'conflicting';

export type VerificationState =
  | 'supported'
  | 'partially_supported'
  | 'requires_confirmation'
  | 'unsupported'
  | 'conflicting';

export type AllowedUsage =
  | 'general_context'
  | 'project_specific_fact'
  | 'project_outcome'
  | 'tone_guidance';

export interface StructuredGenerationRequest<T> {
  prompt: string;
  systemPrompt?: string;
  schema: z.ZodType<T>;
  schemaName: string;
  schemaDescription?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface StructuredGenerationResult<T> {
  data: T;
  provider: AiProviderName;
  model: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
  durationMs: number;
}

export interface CaseStudyModelProvider {
  name: AiProviderName;
  model: string;
  generateStructured<T>(
    request: StructuredGenerationRequest<T>
  ): Promise<StructuredGenerationResult<T>>;
}
