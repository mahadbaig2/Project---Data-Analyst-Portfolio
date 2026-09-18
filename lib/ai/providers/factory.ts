import { CaseStudyModelProvider, StructuredGenerationRequest, StructuredGenerationResult } from './types';
import { MockModelProvider } from './mock-provider';
import { GeminiModelProvider } from './gemini-provider';
import { GroqModelProvider } from './groq-provider';
import { getAiConfig, AiConfig } from '../config';

class FallbackResilientProvider implements CaseStudyModelProvider {
  public readonly name: CaseStudyModelProvider['name'];
  public readonly model: string;
  private readonly primary: CaseStudyModelProvider;
  private readonly fallback?: CaseStudyModelProvider;

  constructor(primary: CaseStudyModelProvider, fallback?: CaseStudyModelProvider) {
    this.primary = primary;
    this.fallback = fallback;
    this.name = primary.name;
    this.model = primary.model;
  }

  async generateStructured<T>(
    request: StructuredGenerationRequest<T>
  ): Promise<StructuredGenerationResult<T>> {
    try {
      return await this.primary.generateStructured(request);
    } catch (err) {
      if (this.fallback && (err as { isRetryable?: boolean })?.isRetryable) {
        console.warn(
          `[AI Provider] Primary provider "${this.primary.name}" failed with retryable error. Failing over to "${this.fallback.name}" (${this.fallback.model})...`
        );
        return await this.fallback.generateStructured(request);
      }
      throw err;
    }
  }
}

export function createModelProvider(configOverride?: AiConfig): CaseStudyModelProvider {
  const config = configOverride || getAiConfig();

  let primary: CaseStudyModelProvider;

  switch (config.provider) {
    case 'gemini':
      primary = new GeminiModelProvider(config.apiKey, config.model, config.timeoutMs);
      break;
    case 'groq':
      primary = new GroqModelProvider(config.apiKey, config.model, config.timeoutMs);
      break;
    case 'mock':
    default:
      primary = new MockModelProvider();
      break;
  }

  let fallback: CaseStudyModelProvider | undefined;
  if (config.fallbackProvider && config.fallbackApiKey) {
    if (config.fallbackProvider === 'groq') {
      fallback = new GroqModelProvider(
        config.fallbackApiKey,
        config.fallbackModel || 'qwen-2.5-32b',
        config.timeoutMs
      );
    } else if (config.fallbackProvider === 'gemini') {
      fallback = new GeminiModelProvider(
        config.fallbackApiKey,
        config.fallbackModel || 'gemini-2.5-flash',
        config.timeoutMs
      );
    }
  }

  return new FallbackResilientProvider(primary, fallback);
}
