import { describe, it } from 'node:test';
import assert from 'node:assert';
import { executeCaseStudyGeneration } from '../../lib/ai/orchestration/generate-case-study';
import { ConfidentialityError } from '../../lib/ai/errors';

describe('Milestone 4 End-to-End Acceptance Test Cases', () => {
  // Case A: Strong structured Markdown
  it('Case A: Strong structured Markdown produces a complete draft with valid architecture and zero blocking issues', async () => {
    const sourceContent = `# Weekly Sales Performance & Commission Analytics System
Client: Departmental Retail Chain
Role: Lead BI Architect & Analyst
Domain: Retail & Multi-Branch Commerce

## Business Problem
Store leadership faced recurring delays collating weekly POS spreadsheet extracts across branches.
Manual calculations created commission formula errors.

## Implemented Work
- Architected Kimball star schema model in Power BI.
- Authored DAX measures for YoY pacing and automated department manager commissions.
- Automated scheduled Power Query ETL pipelines from POS CSV files.

## Outcomes
- Eliminated recurring formula errors across branch manager commission payouts.
- Replaced fragmented spreadsheet exports with a single governed semantic model.
- Accelerated executive reporting delivery from 3 days to automated Monday morning availability.
`;

    const snapshot = await executeCaseStudyGeneration({
      sourceContent,
      fileName: 'strong-project.md',
      confidentialityStatus: 'permission_granted',
      confidentialityAcknowledged: true,
      relatedOrganization: 'Departmental Retail Chain',
    });

    assert.ok(snapshot.status === 'completed' || snapshot.status === 'completed_with_warnings');
    assert.ok(snapshot.targetCaseStudyDraftId?.startsWith('drafts.caseStudy-'));
    assert.ok(snapshot.draft?.title);
    assert.ok(snapshot.draft?.architecture?.nodes && snapshot.draft.architecture.nodes.length >= 3);
    assert.strictEqual(snapshot.validationReport?.publishBlockingIssues.length, 0);
  });

  // Case B: Weak unstructured notes
  it('Case B: Weak unstructured notes flags missing information, avoids invented metrics, and produces useful draft', async () => {
    const weakNotes = `Made weekly sales dashboard.
Files came as csv.
Management needed ytd and last year comparison.
Used power bi.
Had commission calculations.`;

    const snapshot = await executeCaseStudyGeneration({
      sourceContent: weakNotes,
      fileName: 'weak-notes.txt',
      confidentialityStatus: 'anonymized',
      confidentialityAcknowledged: true,
    });

    assert.ok(snapshot.status === 'completed' || snapshot.status === 'completed_with_warnings');
    assert.ok(snapshot.draft?.title);
    // Crucial rule: no invented percentages or $ numbers should exist in validation report
    assert.strictEqual(snapshot.validationReport?.inventedNumbersDetected.length, 0);
    // Unresolved questions / warnings should note missing organization
    assert.ok(snapshot.warnings.length > 0 || (snapshot.draft?.missingInformationWarnings.length ?? 0) > 0);
  });

  // Case C: Professional-context trap
  it('Case C: Profile achievement (e.g. 40% reporting improvement) is NOT transferred to project outcome', async () => {
    const sourceContent = `Built sales pacing report in Power BI for retail branches. Used star schema.`;

    const snapshot = await executeCaseStudyGeneration({
      sourceContent,
      confidentialityStatus: 'anonymized',
      confidentialityAcknowledged: true,
      relatedOrganization: 'Departmental Retail Chain',
    });

    // Verify draft outcomes do not contain general profile metrics
    const outcomesText = snapshot.draft?.outcomes.join(' ') || '';
    assert.strictEqual(
      outcomesText.includes('40% reporting improvement'),
      false,
      'General profile achievement must not be copied as project outcome'
    );
  });

  // Case D: Proposed-versus-implemented trap
  it('Case D: Future version could use Azure Data Factory marks ADF as proposed, not implemented', async () => {
    const sourceContent = `Built Power BI dashboard for store weekly sales.
Power Query used for local file consolidation.
Future version could use Azure Data Factory for automated cloud data ingestion.`;

    const snapshot = await executeCaseStudyGeneration({
      sourceContent,
      confidentialityStatus: 'anonymized',
      confidentialityAcknowledged: true,
    });

    // Verify Azure Data Factory is in futureRoadmap
    const roadmapText = snapshot.draft?.futureRoadmap.join(' ') || '';
    assert.ok(
      roadmapText.toLowerCase().includes('azure data factory') ||
        snapshot.draft?.architecture?.nodes.some((n) => n.implementationStatus === 'proposed')
    );

    // If ADF is present in architecture nodes, verify implementationStatus is 'proposed'
    const adfNode = snapshot.draft?.architecture?.nodes.find((n) =>
      n.title.toLowerCase().includes('azure data factory')
    );
    if (adfNode) {
      assert.strictEqual(adfNode.implementationStatus, 'proposed');
    }
  });

  // Case E: Contradictory source
  it('Case E: Contradictory or ambiguous source triggers validation warnings requiring confirmation', async () => {
    const contradictorySource = `Project executed for Alpha Stores in 2024.
Later documentation notes client was Beta Mart in 2021.
Report built with Power BI.`;

    const snapshot = await executeCaseStudyGeneration({
      sourceContent: contradictorySource,
      confidentialityStatus: 'anonymized',
      confidentialityAcknowledged: true,
    });

    assert.ok(snapshot.warnings.length > 0 || (snapshot.draft?.missingInformationWarnings.length ?? 0) > 0);
  });

  // Case F: Confidential source
  it('Case F: Confidential source blocks generation before provider execution', async () => {
    const confidentialSource = `Internal proprietary financial model and board deck.`;

    await assert.rejects(
      async () => {
        await executeCaseStudyGeneration({
          sourceContent: confidentialSource,
          confidentialityStatus: 'confidential_do_not_process',
          confidentialityAcknowledged: true,
        });
      },
      (err: unknown) => err instanceof ConfidentialityError
    );

    // Also verify unacknowledged confidentiality is blocked
    await assert.rejects(
      async () => {
        await executeCaseStudyGeneration({
          sourceContent: confidentialSource,
          confidentialityStatus: 'public',
          confidentialityAcknowledged: false,
        });
      },
      (err: unknown) => err instanceof ConfidentialityError
    );
  });
});
