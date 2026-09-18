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

export class GeminiModelProvider implements CaseStudyModelProvider {
  public readonly name = 'gemini';
  public readonly model: string;
  private readonly apiKey: string;
  private readonly timeoutMs: number;

  constructor(apiKey: string, model = 'gemini-2.5-flash', timeoutMs = 50000) {
    this.apiKey = apiKey;
    this.model = model;
    this.timeoutMs = timeoutMs;
  }

  async generateStructured<T>(
    request: StructuredGenerationRequest<T>
  ): Promise<StructuredGenerationResult<T>> {
    const startTime = Date.now();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: request.prompt }],
          },
        ],
        ...(request.systemPrompt
          ? {
              systemInstruction: {
                parts: [{ text: request.systemPrompt }],
              },
            }
          : {}),
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: request.temperature ?? 0.2,
          ...(request.maxTokens ? { maxOutputTokens: request.maxTokens } : {}),
        },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new ProviderAuthError('gemini');
        }
        if (response.status === 429) {
          throw new ProviderQuotaError('gemini');
        }
        const errorText = await response.text().catch(() => '');
        throw new AiCaseStudyError(
          'INTERNAL_ERROR',
          `Gemini API error (status ${response.status}): ${errorText}`,
          'AI provider returned an error while processing the request.',
          response.status >= 500
        );
      }

      const resultJson = await response.json();
      const rawText =
        resultJson?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (!rawText) {
        throw new StructuredOutputError('Gemini returned an empty text candidate in response.');
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
        throw new StructuredOutputError(`Schema validation failed for Gemini response: ${errorMessages}`);
      }

      const durationMs = Date.now() - startTime;
      const usageMetadata = resultJson?.usageMetadata;

      return {
        data: validation.data,
        provider: this.name,
        model: this.model,
        usage: {
          promptTokens: usageMetadata?.promptTokenCount,
          completionTokens: usageMetadata?.candidatesTokenCount,
          totalTokens: usageMetadata?.totalTokenCount,
        },
        durationMs,
      };
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        throw new ProviderTimeoutError('gemini', this.timeoutMs);
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
