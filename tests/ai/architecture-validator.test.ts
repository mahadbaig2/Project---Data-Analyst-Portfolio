import { describe, it } from 'node:test';
import assert from 'node:assert';
import { validateArchitectureGraph } from '../../lib/ai/validation/architecture-validator';
import { ArchitectureGraphSpec } from '../../lib/ai/schemas/architecture-spec';

describe('Architecture Graph Validation', () => {
  it('passes a valid dimensional lineage graph', () => {
    const validGraph: ArchitectureGraphSpec = {
      title: 'Retail Sales Lineage Flow',
      nodes: [
        {
          id: 'pos-raw',
          title: 'POS Extracts',
          category: 'Ingestion Layer',
          implementationStatus: 'implemented',
          evidenceClaimIds: [],
        },
        {
          id: 'star-schema',
          title: 'Dimensional Model',
          category: 'Fact & Dimension',
          implementationStatus: 'implemented',
          evidenceClaimIds: [],
        },
      ],
      edges: [{ from: 'pos-raw', to: 'star-schema', label: 'ETL', implementationStatus: 'implemented', evidenceClaimIds: [] }],
      textSummary: 'POS extracts flow through Power Query ETL into a Kimball star schema.',
    };

    const result = validateArchitectureGraph(validGraph);
    assert.strictEqual(result.isValid, true);
    assert.strictEqual(result.issues.length, 0);
  });

  it('blocks duplicate node IDs', () => {
    const invalidGraph: ArchitectureGraphSpec = {
      title: 'Duplicate Test',
      nodes: [
        { id: 'node-1', title: 'Node A', category: 'Ingestion', implementationStatus: 'implemented', evidenceClaimIds: [] },
        { id: 'node-1', title: 'Node B', category: 'Staging', implementationStatus: 'implemented', evidenceClaimIds: [] },
      ],
      edges: [],
      textSummary: 'Pipeline summary text for testing duplicate nodes.',
    };

    const result = validateArchitectureGraph(invalidGraph);
    assert.strictEqual(result.isValid, false);
    assert.ok(result.issues.some((i) => i.code === 'DUPLICATE_NODE_ID' && i.severity === 'block'));
  });

  it('blocks edges referencing non-existent nodes', () => {
    const invalidGraph: ArchitectureGraphSpec = {
      title: 'Dangling Edge Test',
      nodes: [
        { id: 'node-1', title: 'Source', category: 'Ingestion', implementationStatus: 'implemented', evidenceClaimIds: [] },
      ],
      edges: [{ from: 'node-1', to: 'ghost-node', label: 'Broken Flow', implementationStatus: 'implemented', evidenceClaimIds: [] }],
      textSummary: 'Pipeline summary text for testing dangling edge.',
    };

    const result = validateArchitectureGraph(invalidGraph);
    assert.strictEqual(result.isValid, false);
    assert.ok(result.issues.some((i) => i.code === 'DANGLING_EDGE_REFERENCE' && i.severity === 'block'));
  });

  it('blocks self-referencing loops', () => {
    const loopGraph: ArchitectureGraphSpec = {
      title: 'Loop Test',
      nodes: [
        { id: 'node-1', title: 'Node A', category: 'Ingestion', implementationStatus: 'implemented', evidenceClaimIds: [] },
      ],
      edges: [{ from: 'node-1', to: 'node-1', label: 'Self Edge', implementationStatus: 'implemented', evidenceClaimIds: [] }],
      textSummary: 'Pipeline summary text for testing self loop.',
    };

    const result = validateArchitectureGraph(loopGraph);
    assert.strictEqual(result.isValid, false);
    assert.ok(result.issues.some((i) => i.code === 'SELF_REFERENCING_EDGE' && i.severity === 'block'));
  });

  it('warns when accessible textSummary is missing or too brief', () => {
    const briefGraph: ArchitectureGraphSpec = {
      title: 'Brief Test',
      nodes: [
        { id: 'node-1', title: 'Node A', category: 'Ingestion', implementationStatus: 'implemented', evidenceClaimIds: [] },
      ],
      edges: [],
      textSummary: 'Short',
    };

    const result = validateArchitectureGraph(briefGraph);
    assert.ok(result.issues.some((i) => i.code === 'MISSING_ACCESSIBLE_SUMMARY' && i.severity === 'warning'));
  });
});
