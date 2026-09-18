import { ValidationIssue } from '../schemas/validation-report';
import { CaseStudyDraft } from '../schemas/case-study-draft';
import { ContextPack } from '../schemas/context-pack';

export interface EvidenceValidationInput {
  draft: CaseStudyDraft;
  sourceText: string;
  contextPack?: ContextPack;
}

const SUPERLATIVES = [
  'industry-leading',
  'best-in-class',
  'revolutionary',
  'state-of-the-art',
  'groundbreaking',
  'world-class',
  'flawless',
  'unrivaled',
];

const IMPLEMENTATION_VERBS = [
  'implemented',
  'deployed',
  'built',
  'engineered',
  'automated',
  'delivered',
  'architected',
  'optimized',
];

export function validateEvidenceRules(input: EvidenceValidationInput): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const normSource = input.sourceText.toLowerCase();

  // 1. Organization Mismatch Check
  if (input.draft.organization) {
    const org = input.draft.organization.toLowerCase().trim();
    const inSource = normSource.includes(org);
    const inContext = input.contextPack?.matchedOrganization
      ? input.contextPack.matchedOrganization.toLowerCase().includes(org)
      : false;

    if (!inSource && !inContext) {
      issues.push({
        code: 'ORGANIZATION_MISMATCH',
        severity: 'block',
        message: `Organization "${input.draft.organization}" was not found in the source document or approved context.`,
        targetField: 'organization',
        offendingValue: input.draft.organization,
        suggestedRemediation: 'Remove this organization or anonymize as "Client Enterprise" unless verified.',
      });
    }
  }

  // 2. Technology Mismatch Check
  for (const tech of input.draft.technologies) {
    const cleanTech = tech.toLowerCase().trim();
    const inSource = normSource.includes(cleanTech);
    const inAllowed = input.contextPack?.relevantTechnologies.some((t) =>
      t.toLowerCase().includes(cleanTech)
    );

    // If a technology is mentioned as used on THIS project, but doesn't exist anywhere in the source document
    if (!inSource && !inAllowed) {
      issues.push({
        code: 'TECHNOLOGY_MISMATCH',
        severity: 'warning',
        message: `Technology "${tech}" is listed as employed in this project, but does not appear in the source notes.`,
        targetField: 'technologies',
        offendingValue: tech,
        suggestedRemediation: 'Verify whether this technology was genuinely used on this project or is a general skill.',
      });
    }
  }

  // 3. Implemented vs Proposed Mismatch Check
  // Inspect source for "future", "could use", "recommended", "suggested"
  const futureIndicators = [
    'future version could use',
    'future version could',
    'in the future could',
    'could use',
    'could be implemented',
    'recommend using',
    'planned for future',
    'future roadmap',
  ];

  for (const indicator of futureIndicators) {
    const idx = normSource.indexOf(indicator);
    if (idx !== -1) {
      // Find what tech or concept followed this indicator
      const snippet = normSource.slice(idx, idx + 100);
      for (const verb of IMPLEMENTATION_VERBS) {
        // If the draft uses this verb alongside the proposed technology in outcomes or responsibilities
        for (const tech of input.draft.technologies) {
          if (snippet.includes(tech.toLowerCase())) {
            const hasVerbWithTech =
              input.draft.responsibilities.some((r) =>
                r.toLowerCase().includes(verb) && r.toLowerCase().includes(tech.toLowerCase())
              ) ||
              input.draft.outcomes.some((o) =>
                o.toLowerCase().includes(verb) && o.toLowerCase().includes(tech.toLowerCase())
              );

            if (hasVerbWithTech) {
              issues.push({
                code: 'PROPOSED_AS_IMPLEMENTED',
                severity: 'block',
                message: `Technology "${tech}" was noted as future/proposed in the source ("${indicator}"), but is described as implemented work in the draft.`,
                targetField: 'responsibilities',
                offendingValue: tech,
                suggestedRemediation: `Move "${tech}" to the future roadmap or recommendations section.`,
              });
            }
          }
        }
      }
    }
  }

  // 4. Superlatives Check
  const fullDraftText = [
    input.draft.title,
    input.draft.summary,
    input.draft.problem,
    ...input.draft.outcomes,
    ...input.draft.decisions,
  ].join(' ').toLowerCase();

  for (const superlative of SUPERLATIVES) {
    if (fullDraftText.includes(superlative)) {
      issues.push({
        code: 'UNSUPPORTED_SUPERLATIVE',
        severity: 'warning',
        message: `Found marketing superlative "${superlative}". Professional analytics portfolios should use factual, restrained language.`,
        targetField: 'narrative',
        offendingValue: superlative,
        suggestedRemediation: `Replace "${superlative}" with precise technical phrasing.`,
      });
    }
  }

  return issues;
}
