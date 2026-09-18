import { CaseStudyDraft } from '../schemas/case-study-draft';
import { ContextPack } from '../schemas/context-pack';
import { ValidationReport, ValidationIssue } from '../schemas/validation-report';
import { validateNumericClaims } from './number-validator';
import { validateArchitectureGraph } from './architecture-validator';
import { validateEvidenceRules } from './evidence-validator';

export interface RunValidationInput {
  draft: CaseStudyDraft;
  sourceText: string;
  contextPack?: ContextPack;
}

export function runComprehensiveClaimValidation(input: RunValidationInput): ValidationReport {
  const allIssues: ValidationIssue[] = [];

  // 1. Numeric claims check
  const draftCombinedText = [
    input.draft.title,
    input.draft.summary,
    input.draft.problem,
    input.draft.background || '',
    ...input.draft.objectives.map((o) => `${o.title} ${o.description}`),
    ...input.draft.responsibilities,
    ...input.draft.outcomes,
    ...input.draft.decisions,
    ...input.draft.challenges,
    ...input.draft.learnings,
  ].join('\n');

  const numericResult = validateNumericClaims({
    draftText: draftCombinedText,
    sourceText: input.sourceText,
    allowedMetrics: input.contextPack?.items
      .filter((i) => i.canUseAsProjectOutcome)
      .map((i) => i.summary),
  });

  allIssues.push(...numericResult.issues);

  // 2. Architecture graph check
  if (input.draft.architecture) {
    const archResult = validateArchitectureGraph(input.draft.architecture);
    allIssues.push(...archResult.issues);
  }

  // 3. Evidence and consistency rules check
  const evidenceIssues = validateEvidenceRules({
    draft: input.draft,
    sourceText: input.sourceText,
    contextPack: input.contextPack,
  });

  allIssues.push(...evidenceIssues);

  // Separate blocking vs warnings
  const publishBlockingIssues = allIssues.filter((i) => i.severity === 'block');
  const editorialWarnings = allIssues.filter((i) => i.severity === 'warning' || i.severity === 'info');

  const isValid = publishBlockingIssues.length === 0;

  const summary = isValid
    ? `Validation passed successfully with ${editorialWarnings.length} non-blocking editorial suggestions.`
    : `Validation failed with ${publishBlockingIssues.length} publish-blocking issues and ${editorialWarnings.length} warnings.`;

  return {
    isValid,
    publishBlockingIssues,
    editorialWarnings,
    inventedNumbersDetected: numericResult.inventedNumbers,
    claimsChecked: input.draft.outcomes.length + input.draft.responsibilities.length + input.draft.objectives.length,
    unsupportedClaimsCount: publishBlockingIssues.length,
    summary,
  };
}
