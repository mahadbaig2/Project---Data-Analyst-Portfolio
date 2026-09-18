export type SafeErrorCode =
  | 'CONFIG_MISSING'
  | 'INVALID_SOURCE_FILE'
  | 'SOURCE_TOO_LARGE'
  | 'CONFIDENTIALITY_BLOCKED'
  | 'DUPLICATE_ACTIVE_RUN'
  | 'PROVIDER_AUTH_FAILED'
  | 'PROVIDER_QUOTA_EXCEEDED'
  | 'PROVIDER_TIMEOUT'
  | 'STRUCTURED_OUTPUT_INVALID'
  | 'CONTEXT_UNAVAILABLE'
  | 'SANITY_MUTATION_FAILED'
  | 'VALIDATION_BLOCKED'
  | 'INTERNAL_ERROR';

export class AiCaseStudyError extends Error {
  public readonly code: SafeErrorCode;
  public readonly isRetryable: boolean;
  public readonly userMessage: string;

  constructor(code: SafeErrorCode, message: string, userMessage: string, isRetryable = false) {
    super(message);
    this.name = 'AiCaseStudyError';
    this.code = code;
    this.isRetryable = isRetryable;
    this.userMessage = userMessage;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class AiConfigurationError extends AiCaseStudyError {
  constructor(message: string, userMessage = 'AI service configuration is incomplete.') {
    super('CONFIG_MISSING', message, userMessage, false);
  }
}

export class InvalidSourceFileError extends AiCaseStudyError {
  constructor(message: string, userMessage = 'The uploaded source file is invalid or empty.') {
    super('INVALID_SOURCE_FILE', message, userMessage, false);
  }
}

export class SourceTooLargeError extends AiCaseStudyError {
  constructor(sizeBytes: number, maxBytes: number) {
    super(
      'SOURCE_TOO_LARGE',
      `Source file size (${sizeBytes} bytes) exceeds limit (${maxBytes} bytes)`,
      `Source file exceeds maximum allowed size of ${Math.round(maxBytes / 1024)} KB.`,
      false
    );
  }
}

export class ConfidentialityError extends AiCaseStudyError {
  constructor(message: string) {
    super(
      'CONFIDENTIALITY_BLOCKED',
      message,
      'Document generation blocked: confidentiality acknowledgement is required or document is marked confidential.',
      false
    );
  }
}

export class DuplicateActiveRunError extends AiCaseStudyError {
  constructor(runId: string) {
    super(
      'DUPLICATE_ACTIVE_RUN',
      `A generation run is already active for this document (${runId})`,
      'A generation run is already active. Please wait for it to complete or inspect its progress.',
      true
    );
  }
}

export class ProviderAuthError extends AiCaseStudyError {
  constructor(provider: string) {
    super(
      'PROVIDER_AUTH_FAILED',
      `Authentication failed for AI provider ${provider}`,
      'AI provider authentication failed. Please verify provider credentials.',
      false
    );
  }
}

export class ProviderQuotaError extends AiCaseStudyError {
  constructor(provider: string) {
    super(
      'PROVIDER_QUOTA_EXCEEDED',
      `Quota exceeded for AI provider ${provider}`,
      'AI provider rate or quota limit reached. Please retry in a few moments.',
      true
    );
  }
}

export class ProviderTimeoutError extends AiCaseStudyError {
  constructor(provider: string, timeoutMs: number) {
    super(
      'PROVIDER_TIMEOUT',
      `Request to ${provider} timed out after ${timeoutMs}ms`,
      'AI generation timed out. The operation can be safely retried.',
      true
    );
  }
}

export class StructuredOutputError extends AiCaseStudyError {
  constructor(message: string) {
    super(
      'STRUCTURED_OUTPUT_INVALID',
      message,
      'The AI model returned an unparseable or schema-invalid response.',
      true
    );
  }
}

export class SanityMutationError extends AiCaseStudyError {
  constructor(message: string) {
    super(
      'SANITY_MUTATION_FAILED',
      message,
      'Unable to save the case-study draft to Sanity. Verify write permissions.',
      true
    );
  }
}

export class ValidationBlockedError extends AiCaseStudyError {
  public readonly issues: string[];

  constructor(issues: string[]) {
    super(
      'VALIDATION_BLOCKED',
      `Validation blocked draft creation: ${issues.join('; ')}`,
      `Draft creation blocked due to critical validation failures: ${issues.slice(0, 2).join(', ')}`,
      false
    );
    this.issues = issues;
  }
}
