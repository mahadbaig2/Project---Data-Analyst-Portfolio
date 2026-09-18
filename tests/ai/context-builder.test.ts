import { describe, it } from 'node:test';
import assert from 'node:assert';
import { buildDeterministicContextPack } from '../../lib/ai/context/build-context';
import { rankAndFilterContext } from '../../lib/ai/context/rank-context';
import { ContextItem } from '../../lib/ai/schemas/context-pack';

describe('Deterministic Context Builder & Ranker', () => {
  it('ranks and prioritizes matching organization', () => {
    const mockItems: ContextItem[] = [
      {
        id: '1',
        type: 'experience',
        title: 'BI Analyst @ Muller & Phipps Logistics',
        organization: 'Muller & Phipps Logistics',
        summary: 'Logistics analytics and warehouse telemetry',
        relevanceScore: 20,
        relevanceReason: 'Experience',
        allowedUsage: 'general_context',
        canUseAsProjectOutcome: false,
        verificationStatus: 'verified',
        tags: ['Power BI', 'SQL Server'],
      },
      {
        id: '2',
        type: 'experience',
        title: 'Assistant Manager @ Ideas by Gul Ahmed',
        organization: 'Ideas by Gul Ahmed',
        summary: 'Retail omni-channel modeling',
        relevanceScore: 20,
        relevanceReason: 'Experience',
        allowedUsage: 'general_context',
        canUseAsProjectOutcome: false,
        verificationStatus: 'verified',
        tags: ['Power BI', 'Fabric'],
      },
    ];

    const ranked = rankAndFilterContext(mockItems, {
      organization: 'Muller & Phipps',
      technologies: ['Power BI'],
    });

    assert.strictEqual(ranked[0].organization, 'Muller & Phipps Logistics');
    assert.ok(ranked[0].relevanceScore > ranked[1].relevanceScore);
  });

  it('builds context pack with verified fixtures when Sanity is offline', async () => {
    const contextPack = await buildDeterministicContextPack({
      domain: 'Retail & Multi-Branch Commerce',
      organization: 'Ideas by Gul Ahmed',
      technologies: ['Power BI', 'DAX'],
      maxItems: 8,
    });

    assert.strictEqual(contextPack.domain, 'Retail & Multi-Branch Commerce');
    assert.ok(contextPack.items.length <= 8);
    assert.ok(contextPack.items.every((item) => item.verificationStatus === 'verified'));
  });

  it('enforces that general career achievements have canUseAsProjectOutcome: false', async () => {
    const contextPack = await buildDeterministicContextPack({
      domain: 'Logistics',
      organization: 'Muller & Phipps Logistics',
      technologies: ['Power BI'],
    });

    // Outcomes like 20+ dashboards at M&P must be general_context, not project_outcome for an arbitrary project
    const outcomes = contextPack.items.filter((i) => i.type === 'achievement');
    for (const out of outcomes) {
      assert.strictEqual(
        out.canUseAsProjectOutcome,
        false,
        `Achievement "${out.title}" must not be marked canUseAsProjectOutcome without explicit project linkage`
      );
      assert.strictEqual(out.allowedUsage, 'general_context');
    }
  });

  it('excludes unverified milestone 3 claims (Contour Software, FAST-NUCES) from context', async () => {
    const contextPack = await buildDeterministicContextPack({
      domain: 'Business Intelligence',
      technologies: ['Power BI', 'Python'],
    });

    const contextText = JSON.stringify(contextPack).toLowerCase();
    assert.strictEqual(contextText.includes('contour software'), false);
    assert.strictEqual(contextText.includes('constellation software'), false);
    assert.strictEqual(contextText.includes('fast-nuces'), false);
    assert.strictEqual(contextText.includes('$120k'), false);
    assert.strictEqual(contextText.includes('68% latency reduction'), false);
  });
});
