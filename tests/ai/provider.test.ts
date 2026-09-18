import { describe, it } from 'node:test';
import assert from 'node:assert';
import { MockModelProvider } from '../../lib/ai/providers/mock-provider';
import { ProjectExtractionSchema } from '../../lib/ai/schemas/project-extraction';
import { CaseStudyDraftSchema } from '../../lib/ai/schemas/case-study-draft';
import {
  ProviderTimeoutError,
  ProviderQuotaError,
  StructuredOutputError,
} from '../../lib/ai/errors';

describe('AI Model Providers & Adapters', () => {
  const provider = new MockModelProvider();

  it('generates schema-valid project extraction output', async () => {
    const result = await provider.generateStructured({
      prompt: 'Extract retail weekly sales project details',
      schema: ProjectExtractionSchema,
      schemaName: 'ProjectExtraction',
    });

    assert.strictEqual(result.provider, 'mock');
    assert.ok(result.data.proposedProjectTitle);
    assert.ok(result.data.objectives.length > 0);
  });

  it('generates schema-valid case study draft output', async () => {
    const result = await provider.generateStructured({
      prompt: 'Draft case study for weekly retail sales',
      schema: CaseStudyDraftSchema,
      schemaName: 'CaseStudyDraft',
    });

    assert.ok(result.data.title);
    assert.ok(result.data.slug);
    assert.ok(result.data.objectives.length > 0);
    assert.ok(result.data.architecture);
  });

  it('handles simulated timeout error cleanly', async () => {
    await assert.rejects(
      async () => {
        await provider.generateStructured({
          prompt: 'SIMULATE_TIMEOUT',
          schema: CaseStudyDraftSchema,
          schemaName: 'CaseStudyDraft',
        });
      },
      (err: unknown) => err instanceof ProviderTimeoutError
    );
  });

  it('handles simulated quota error cleanly', async () => {
    await assert.rejects(
      async () => {
        await provider.generateStructured({
          prompt: 'SIMULATE_QUOTA',
          schema: CaseStudyDraftSchema,
          schemaName: 'CaseStudyDraft',
        });
      },
      (err: unknown) => err instanceof ProviderQuotaError
    );
  });

  it('handles simulated invalid JSON cleanly', async () => {
    await assert.rejects(
      async () => {
        await provider.generateStructured({
          prompt: 'SIMULATE_INVALID_JSON',
          schema: CaseStudyDraftSchema,
          schemaName: 'CaseStudyDraft',
        });
      },
      (err: unknown) => err instanceof StructuredOutputError
    );
  });
});
