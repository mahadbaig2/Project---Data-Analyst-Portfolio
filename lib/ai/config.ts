import { AiConfigurationError } from './errors';
import { AiProviderName } from './types';

export interface AiConfig {
  provider: AiProviderName;
  model: string;
  apiKey: string;
  fallbackProvider?: AiProviderName;
  fallbackModel?: string;
  fallbackApiKey?: string;
  timeoutMs: number;
  maxSourceSizeBytes: number;
  maxContextItems: number;
  allowMockInProduction: boolean;
  editorialSecret: string;
}

export function getAiConfig(): AiConfig {
  const provider = (process.env.CASE_STUDY_AI_PROVIDER || 'mock').toLowerCase() as AiProviderName;
  const isProduction = process.env.NODE_ENV === 'production';
  const allowMockInProduction = process.env.ALLOW_MOCK_IN_PRODUCTION === 'true';

  if (isProduction && provider === 'mock' && !allowMockInProduction) {
    throw new AiConfigurationError(
      'Mock AI provider cannot be used in production environment unless ALLOW_MOCK_IN_PRODUCTION=true is explicitly set.'
    );
  }

  const model =
    process.env.CASE_STUDY_AI_MODEL ||
    (provider === 'gemini' ? 'gemini-2.5-flash' : provider === 'groq' ? 'qwen-2.5-32b' : 'mock-model-v1');

  const apiKey = process.env.CASE_STUDY_AI_API_KEY || '';

  if (provider !== 'mock' && !apiKey) {
    throw new AiConfigurationError(`Missing CASE_STUDY_AI_API_KEY for provider ${provider}.`);
  }

  const fallbackProvider = process.env.CASE_STUDY_AI_FALLBACK_PROVIDER
    ? (process.env.CASE_STUDY_AI_FALLBACK_PROVIDER.toLowerCase() as AiProviderName)
    : undefined;

  const fallbackModel =
    process.env.CASE_STUDY_AI_FALLBACK_MODEL || (fallbackProvider === 'groq' ? 'qwen-2.5-32b' : undefined);

  const fallbackApiKey = process.env.CASE_STUDY_AI_FALLBACK_API_KEY || '';

  const timeoutMs = Number(process.env.CASE_STUDY_AI_TIMEOUT_MS) || 50000;
  const maxSourceSizeBytes = Number(process.env.CASE_STUDY_AI_MAX_SOURCE_BYTES) || 256 * 1024; // 256 KB
  const maxContextItems = Number(process.env.CASE_STUDY_AI_MAX_CONTEXT_ITEMS) || 12;
  const editorialSecret = process.env.CASE_STUDY_EDITORIAL_SECRET || process.env.SANITY_PREVIEW_SECRET || '';

  return {
    provider,
    model,
    apiKey,
    fallbackProvider,
    fallbackModel,
    fallbackApiKey,
    timeoutMs,
    maxSourceSizeBytes,
    maxContextItems,
    allowMockInProduction,
    editorialSecret,
  };
}
