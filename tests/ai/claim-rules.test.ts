import { describe, it } from 'node:test';
import assert from 'node:assert';
import { validateNumericClaims } from '../../lib/ai/validation/number-validator';
import { validateEvidenceRules } from '../../lib/ai/validation/evidence-validator';
import { CaseStudyDraft } from '../../lib/ai/schemas/case-study-draft';

describe('Deterministic Claim Rules and Validation Safeguards', () => {
  it('detects and blocks unevidenced percentages ($120k, 68%, 40%) not present in source', () => {
    const draftText = `Achieved a 68% latency reduction and saved $120k annually with 40% efficiency gains.`;
    const sourceText = `Built Power BI dashboard for store weekly sales. Refactored DAX measures.`;

    const result = validateNumericClaims({
      draftText,
      sourceText,
    });

    assert.ok(result.issues.length >= 3);
    assert.ok(result.issues.some((i) => i.offendingValue.includes('68%')));
    assert.ok(result.issues.some((i) => i.offendingValue.includes('$120k')));
    assert.ok(result.issues.some((i) => i.offendingValue.includes('40%')));
    assert.ok(result.issues.every((i) => i.severity === 'block'));
  });

  it('allows numbers and percentages that explicitly exist in the source text', () => {
    const sourceText = `Store cancellations over 90 days were 45%. Weekly refresh is 100% automated.`;
    const draftText = `Identified that booking cancellations beyond 90 days exceeded 45%.`;

    const result = validateNumericClaims({
      draftText,
      sourceText,
    });

    assert.strictEqual(result.issues.length, 0);
    assert.strictEqual(result.inventedNumbers.length, 0);
  });

  it('detects organization mismatch when draft mentions company not in source or context', () => {
    const dummyDraft: CaseStudyDraft = {
      title: 'Weekly Sales Reporting',
      slug: 'weekly-sales-reporting',
      summary: 'Management dashboard for retail sales pacing.',
      domain: 'Retail',
      category: 'Business Intelligence',
      organization: 'Contour Software', // Not in source or context
      role: 'Lead BI Architect',
      period: '2024',
      status: 'Production Deployed',
      confidentiality: 'Anonymized',
      problem: 'Delays collating branch spreadsheets.',
      primaryUser: 'Commercial Director',
      objectives: [{ id: '01', title: 'Obj', description: 'Desc' }],
      dataSources: ['POS CSV'],
      responsibilities: ['Built model'],
      technologies: ['Power BI'],
      calculations: [],
      supportingVisuals: [],
      outcomes: ['Faster reporting'],
      decisions: [],
      challenges: [],
      learnings: [],
      futureRoadmap: [],
      seoTitle: 'Weekly Sales',
      seoDescription: 'Weekly Sales Case Study',
      missingInformationWarnings: [],
      sectionClaimMap: {},
    };

    const issues = validateEvidenceRules({
      draft: dummyDraft,
      sourceText: 'Weekly store sales reporting for retail departmental branches.',
    });

    assert.ok(issues.some((i) => i.code === 'ORGANIZATION_MISMATCH' && i.severity === 'block'));
  });

  it('detects when proposed technologies are described with implementation verbs', () => {
    const dummyDraft: CaseStudyDraft = {
      title: 'Retail Data Pipeline',
      slug: 'retail-data-pipeline',
      summary: 'Cloud reporting pipeline.',
      domain: 'Retail',
      category: 'Data Engineering',
      role: 'Data Engineer',
      period: '2024',
      status: 'Production Deployed',
      confidentiality: 'Anonymized',
      problem: 'Data latency.',
      primaryUser: 'Leadership',
      objectives: [{ id: '01', title: 'Obj', description: 'Desc' }],
      dataSources: ['CSV'],
      responsibilities: ['Implemented Azure Data Factory to automate scheduled cloud batch ingestion.'],
      technologies: ['Power BI', 'Azure Data Factory'],
      calculations: [],
      supportingVisuals: [],
      outcomes: ['Deployed Azure Data Factory pipelines.'],
      decisions: [],
      challenges: [],
      learnings: [],
      futureRoadmap: [],
      seoTitle: 'Retail Pipeline',
      seoDescription: 'Retail Pipeline Case Study',
      missingInformationWarnings: [],
      sectionClaimMap: {},
    };

    const sourceText = `Used Power Query locally. Future version could use Azure Data Factory for automated cloud pipelines.`;

    const issues = validateEvidenceRules({
      draft: dummyDraft,
      sourceText,
    });

    assert.ok(issues.some((i) => i.code === 'PROPOSED_AS_IMPLEMENTED' && i.severity === 'block'));
  });

  it('detects promotional marketing superlatives', () => {
    const dummyDraft: CaseStudyDraft = {
      title: 'Revolutionary Enterprise Sales Dashboard',
      slug: 'revolutionary-sales-dashboard',
      summary: 'An industry-leading, best-in-class analytics solution.',
      domain: 'Retail',
      category: 'Business Intelligence',
      role: 'Lead BI Architect',
      period: '2024',
      status: 'Production Deployed',
      confidentiality: 'Anonymized',
      problem: 'Data latency.',
      primaryUser: 'Leadership',
      objectives: [{ id: '01', title: 'Obj', description: 'Desc' }],
      dataSources: ['CSV'],
      responsibilities: ['Built report'],
      technologies: ['Power BI'],
      calculations: [],
      supportingVisuals: [],
      outcomes: ['Delivered state-of-the-art reporting.'],
      decisions: [],
      challenges: [],
      learnings: [],
      futureRoadmap: [],
      seoTitle: 'Sales Dashboard',
      seoDescription: 'Case study',
      missingInformationWarnings: [],
      sectionClaimMap: {},
    };

    const issues = validateEvidenceRules({
      draft: dummyDraft,
      sourceText: 'Weekly sales reporting in Power BI.',
    });

    assert.ok(issues.some((i) => i.code === 'UNSUPPORTED_SUPERLATIVE' && i.offendingValue === 'industry-leading'));
    assert.ok(issues.some((i) => i.code === 'UNSUPPORTED_SUPERLATIVE' && i.offendingValue === 'best-in-class'));
  });
});
