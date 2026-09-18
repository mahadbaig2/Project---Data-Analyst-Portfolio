import {
  CaseStudyModelProvider,
  StructuredGenerationRequest,
  StructuredGenerationResult,
} from './types';
import {
  ProviderAuthError,
  ProviderQuotaError,
  ProviderTimeoutError,
  StructuredOutputError,
  AiCaseStudyError,
} from '../errors';

export class GroqModelProvider implements CaseStudyModelProvider {
  public readonly name = 'groq';
  public readonly model: string;
  private readonly apiKey: string;
  private readonly timeoutMs: number;

  constructor(apiKey: string, model = 'qwen-2.5-32b', timeoutMs = 50000) {
    this.apiKey = apiKey;
    this.model = model;
    this.timeoutMs = timeoutMs;
  }

  async generateStructured<T>(
    request: StructuredGenerationRequest<T>
  ): Promise<StructuredGenerationResult<T>> {
    const startTime = Date.now();
    const url = 'https://api.groq.com/openai/v1/chat/completions';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const messages = [];
      if (request.systemPrompt) {
        messages.push({ role: 'system', content: request.systemPrompt });
      }
      messages.push({ role: 'user', content: request.prompt });

      const payload = {
        model: this.model,
        messages,
        response_format: { type: 'json_object' },
        temperature: request.temperature ?? 0.2,
        ...(request.maxTokens ? { max_tokens: request.maxTokens } : {}),
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new ProviderAuthError('groq');
        }
        if (response.status === 429) {
          throw new ProviderQuotaError('groq');
        }
        const errorText = await response.text().catch(() => '');
        throw new AiCaseStudyError(
          'INTERNAL_ERROR',
          `Groq API error (status ${response.status}): ${errorText}`,
          'AI provider returned an error while processing the request.',
          response.status >= 500
        );
      }

      const resultJson = await response.json();
      const rawText = resultJson?.choices?.[0]?.message?.content || '';

      if (!rawText) {
        throw new StructuredOutputError('Groq returned an empty response content.');
      }

      let parsedRaw: unknown;
      try {
        parsedRaw = JSON.parse(rawText);
      } catch (jsonErr) {
        throw new StructuredOutputError(
          `Failed to parse model JSON response: ${(jsonErr as Error).message}`
        );
      }

      const validation = request.schema.safeParse(parsedRaw);
      if (!validation.success) {
        const errorMessages = validation.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
        throw new StructuredOutputError(`Schema validation failed for Groq response: ${errorMessages}`);
      }

      const durationMs = Date.now() - startTime;
      const usage = resultJson?.usage;

      return {
        data: validation.data,
        provider: this.name,
        model: this.model,
        usage: {
          promptTokens: usage?.prompt_tokens,
          completionTokens: usage?.completion_tokens,
          totalTokens: usage?.total_tokens,
        },
        durationMs,
      };
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        throw new ProviderTimeoutError('groq', this.timeoutMs);
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
