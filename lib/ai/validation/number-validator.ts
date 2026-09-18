import { ValidationIssue } from '../schemas/validation-report';

export interface NumberValidationInput {
  draftText: string;
  sourceText: string;
  allowedMetrics?: string[];
}

export function validateNumericClaims(input: NumberValidationInput): {
  issues: ValidationIssue[];
  inventedNumbers: string[];
} {
  const issues: ValidationIssue[] = [];
  const inventedNumbers: string[] = [];
  const normSource = input.sourceText.toLowerCase();

  // Fresh regex instances per call to avoid RegExp.lastIndex state mutation
  const percentRegex = /\b(\d+(?:\.\d+)?)\s*(?:%|percent\b)/gi;
  const currencyRegex = /\$(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?(?:k|m|b)?\b|\b\d+(?:k|m|b)?\s*(?:usd|dollars)\b/gi;
  const multiplierRegex = /\b\d+(?:\.\d+)?x\s+(?:faster|slower|reduction|increase|improvement|speedup)\b/gi;
  const latencyRegex = /\b\d+%\s*(?:latency|reduction|cost\s*savings?|improvement)/gi;

  // Helper to test if a metric string is present in source
  function isMetricInSource(metricStr: string): boolean {
    const clean = metricStr.toLowerCase().trim();
    if (normSource.includes(clean)) return true;

    // Check allowed metrics list (e.g. from linked verified achievements)
    if (input.allowedMetrics && input.allowedMetrics.some((m) => m.toLowerCase().includes(clean))) {
      return true;
    }

    // Extract raw digits
    const digitsMatch = clean.match(/\d+/);
    if (digitsMatch) {
      const digits = digitsMatch[0];
      // If the bare number is not even mentioned anywhere in the source document, it's definitely ungrounded
      if (!normSource.includes(digits)) {
        return false;
      }
    }
    return false;
  }

  // 1. Scan Percentages
  let match: RegExpExecArray | null;
  while ((match = percentRegex.exec(input.draftText)) !== null) {
    const fullMatch = match[0];
    if (!isMetricInSource(fullMatch)) {
      inventedNumbers.push(fullMatch);
      issues.push({
        code: 'UNSUPPORTED_NUMERIC_CLAIM',
        severity: 'block',
        message: `Quantitative percentage "${fullMatch}" was found in the draft but is not supported by source evidence.`,
        targetField: 'outcomes',
        offendingValue: fullMatch,
        suggestedRemediation: 'Remove this percentage or replace with qualitative description unless verified.',
      });
    }
  }

  // 2. Scan Currency claims
  while ((match = currencyRegex.exec(input.draftText)) !== null) {
    const fullMatch = match[0];
    if (!isMetricInSource(fullMatch)) {
      inventedNumbers.push(fullMatch);
      issues.push({
        code: 'UNSUPPORTED_CURRENCY_CLAIM',
        severity: 'block',
        message: `Financial figure "${fullMatch}" was generated without source document evidence.`,
        targetField: 'outcomes',
        offendingValue: fullMatch,
        suggestedRemediation: 'Omit specific financial savings figures unless documented in source.',
      });
    }
  }

  // 3. Scan Multipliers
  while ((match = multiplierRegex.exec(input.draftText)) !== null) {
    const fullMatch = match[0];
    if (!isMetricInSource(fullMatch)) {
      inventedNumbers.push(fullMatch);
      issues.push({
        code: 'UNSUPPORTED_MULTIPLIER_CLAIM',
        severity: 'block',
        message: `Performance multiplier "${fullMatch}" does not exist in source text.`,
        targetField: 'outcomes',
        offendingValue: fullMatch,
        suggestedRemediation: 'Describe the performance gain qualitatively or cite exact benchmarks.',
      });
    }
  }

  // 4. Scan Latency / Cost Savings phrases
  while ((match = latencyRegex.exec(input.draftText)) !== null) {
    const fullMatch = match[0];
    if (!isMetricInSource(fullMatch)) {
      if (!inventedNumbers.includes(fullMatch)) {
        inventedNumbers.push(fullMatch);
        issues.push({
          code: 'UNSUPPORTED_METRIC_CLAIM',
          severity: 'block',
          message: `Metric claim "${fullMatch}" is ungrounded in project documentation.`,
          targetField: 'outcomes',
          offendingValue: fullMatch,
          suggestedRemediation: 'Verify whether this metric came from a placeholder and remove if ungrounded.',
        });
      }
    }
  }

  return { issues, inventedNumbers };
}
