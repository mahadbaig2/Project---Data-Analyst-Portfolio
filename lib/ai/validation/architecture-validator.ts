import { ArchitectureGraphSpec } from '../schemas/architecture-spec';
import { ValidationIssue } from '../schemas/validation-report';

export interface ArchitectureValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
  repairedGraph?: ArchitectureGraphSpec;
}

export function validateArchitectureGraph(
  graph?: ArchitectureGraphSpec
): ArchitectureValidationResult {
  if (!graph) {
    return {
      isValid: true,
      issues: [
        {
          code: 'NO_ARCHITECTURE_GRAPH',
          severity: 'info',
          message: 'No architecture graph was provided for this case study.',
          targetField: 'architecture',
          offendingValue: 'undefined',
          suggestedRemediation: 'Consider adding a Kimball dimensional lineage flow if applicable.',
        },
      ],
    };
  }

  const issues: ValidationIssue[] = [];
  const nodeIds = new Set<string>();
  const duplicateNodeIds = new Set<string>();

  // 1. Validate Node Count
  if (graph.nodes.length === 0) {
    issues.push({
      code: 'EMPTY_ARCHITECTURE_NODES',
      severity: 'block',
      message: 'Architecture graph must contain at least one node.',
      targetField: 'architecture.nodes',
      offendingValue: '0 nodes',
      suggestedRemediation: 'Add ingestion, staging, fact table, or dimension nodes.',
    });
  } else if (graph.nodes.length > 12) {
    issues.push({
      code: 'EXCESSIVE_ARCHITECTURE_NODES',
      severity: 'warning',
      message: `Architecture graph contains ${graph.nodes.length} nodes, which may degrade mobile readability.`,
      targetField: 'architecture.nodes',
      offendingValue: `${graph.nodes.length} nodes`,
      suggestedRemediation: 'Consolidate granular tables into cohesive pipeline stages.',
    });
  }

  // 2. Validate Node IDs
  for (const node of graph.nodes) {
    if (!node.id || node.id.trim() === '') {
      issues.push({
        code: 'MISSING_NODE_ID',
        severity: 'block',
        message: `Node titled "${node.title}" is missing a unique nodeId.`,
        targetField: 'architecture.nodes',
        offendingValue: node.title,
        suggestedRemediation: 'Assign a stable slug identifier to each node.',
      });
    } else if (nodeIds.has(node.id)) {
      duplicateNodeIds.add(node.id);
      issues.push({
        code: 'DUPLICATE_NODE_ID',
        severity: 'block',
        message: `Duplicate nodeId detected: "${node.id}". Node IDs must be unique within the graph.`,
        targetField: 'architecture.nodes',
        offendingValue: node.id,
        suggestedRemediation: `Rename one of the duplicate nodes with ID "${node.id}".`,
      });
    } else {
      nodeIds.add(node.id);
    }
  }

  // 3. Validate Edges
  const validEdges = [];
  for (const edge of graph.edges) {
    if (edge.from === edge.to) {
      issues.push({
        code: 'SELF_REFERENCING_EDGE',
        severity: 'block',
        message: `Edge cannot connect node "${edge.from}" to itself.`,
        targetField: 'architecture.edges',
        offendingValue: `${edge.from} -> ${edge.to}`,
        suggestedRemediation: 'Remove self-referential edges from the lineage diagram.',
      });
      continue;
    }

    const hasFrom = nodeIds.has(edge.from);
    const hasTo = nodeIds.has(edge.to);

    if (!hasFrom || !hasTo) {
      issues.push({
        code: 'DANGLING_EDGE_REFERENCE',
        severity: 'block',
        message: `Edge connects from "${edge.from}" to "${edge.to}", but one of these nodes does not exist in the graph.`,
        targetField: 'architecture.edges',
        offendingValue: `${edge.from} -> ${edge.to}`,
        suggestedRemediation: 'Ensure both source and target node IDs exist in the nodes array.',
      });
      continue;
    }

    validEdges.push(edge);
  }

  // 4. Validate Accessibility Text Alternative
  if (!graph.textSummary || graph.textSummary.trim().length < 15) {
    issues.push({
      code: 'MISSING_ACCESSIBLE_SUMMARY',
      severity: 'warning',
      message: 'Architecture graph requires an accessible textSummary for screen readers and search indexes.',
      targetField: 'architecture.textSummary',
      offendingValue: graph.textSummary || '',
      suggestedRemediation: 'Provide a concise paragraph describing the pipeline from source to presentation layer.',
    });
  }

  const hasBlockingIssues = issues.some((i) => i.severity === 'block');

  // Attempt auto-repair if only edge issues exist and node structure is sound
  let repairedGraph: ArchitectureGraphSpec | undefined;
  if (hasBlockingIssues && duplicateNodeIds.size === 0 && graph.nodes.length > 0) {
    repairedGraph = {
      ...graph,
      edges: validEdges,
    };
  }

  return {
    isValid: !hasBlockingIssues,
    issues,
    repairedGraph,
  };
}
