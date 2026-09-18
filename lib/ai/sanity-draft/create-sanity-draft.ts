import { createClient } from 'next-sanity';
import { isSanityConfigured, projectId, dataset, apiVersion, writeToken } from '@/sanity/env';
import { CaseStudyDraft } from '../schemas/case-study-draft';
import { ValidationReport } from '../schemas/validation-report';
import { SanityMutationError } from '../errors';

export interface CreateSanityDraftInput {
  draft: CaseStudyDraft;
  sourceDocumentId?: string;
  generationRunId?: string;
  validationReport?: ValidationReport;
  targetCaseStudyId?: string;
}

export interface CreateSanityDraftResult {
  draftId: string;
  slug: string;
  remoteMutated: boolean;
  documentPayload: Record<string, unknown>;
}

export async function createOrUpdateSanityDraft(
  input: CreateSanityDraftInput
): Promise<CreateSanityDraftResult> {
  const baseSlug = input.draft.slug;
  const draftDocId = input.targetCaseStudyId
    ? (input.targetCaseStudyId.startsWith('drafts.') ? input.targetCaseStudyId : `drafts.${input.targetCaseStudyId}`)
    : `drafts.caseStudy-${baseSlug}`;

  // Build the complete Sanity caseStudy document
  const documentPayload: { _id: string; _type: string; [key: string]: unknown } = {
    _id: draftDocId,
    _type: 'caseStudy',
    title: input.draft.title,
    slug: {
      _type: 'slug',
      current: input.draft.slug,
    },
    summary: input.draft.summary,
    domain: input.draft.domain,
    category: input.draft.category,
    organization: input.draft.organization,
    role: input.draft.role,
    period: input.draft.period,
    status: 'Draft',
    publicVisibility: false,
    confidentiality: input.draft.confidentiality,
    isFeatured: false,
    problem: input.draft.problem,
    background: input.draft.background,
    primaryUser: input.draft.primaryUser,
    objectives: input.draft.objectives.map((o) => ({
      _key: o.id,
      id: o.id,
      title: o.title,
      description: o.description,
    })),
    dataSources: input.draft.dataSources,
    responsibilities: input.draft.responsibilities,
    technologies: input.draft.technologies,
    calculations: input.draft.calculations.map((c, idx) => ({
      _key: `calc-${idx}`,
      measure: c.measure,
      formula: c.formula,
      purpose: c.purpose,
    })),
    outcomes: input.draft.outcomes,
    decisions: input.draft.decisions,
    challenges: input.draft.challenges,
    learnings: input.draft.learnings,
    futureRoadmap: input.draft.futureRoadmap,
    reviewWarnings: [
      ...input.draft.missingInformationWarnings,
      ...(input.validationReport?.editorialWarnings.map((w) => `[${w.code}] ${w.message}`) || []),
      ...(input.validationReport?.publishBlockingIssues.map((b) => `[BLOCKING: ${b.code}] ${b.message}`) || []),
    ],
    seo: {
      _type: 'seo',
      metaTitle: input.draft.seoTitle,
      metaDescription: input.draft.seoDescription,
    },
  };

  // Map Architecture if present
  if (input.draft.architecture) {
    documentPayload.architecture = {
      _type: 'architectureGraph',
      textSummary: input.draft.architecture.textSummary,
      nodes: input.draft.architecture.nodes.map((n) => ({
        _key: n.id,
        nodeId: n.id,
        title: n.title,
        category: n.category,
        items: n.items,
        detail: n.detail,
        implementationStatus: n.implementationStatus || 'implemented',
      })),
      edges: input.draft.architecture.edges.map((e, idx) => ({
        _key: `edge-${idx}`,
        from: e.from,
        to: e.to,
        label: e.label,
        flowType: e.flowType,
        implementationStatus: e.implementationStatus || 'implemented',
      })),
    };
  }

  // Map Supporting Visuals if present
  if (input.draft.supportingVisuals && input.draft.supportingVisuals.length > 0) {
    documentPayload.supportingVisuals = input.draft.supportingVisuals.map((v) => ({
      _key: v.id,
      visualType: v.visualType,
      title: v.title,
      purpose: v.purpose,
      isImplemented: v.isImplemented,
      elements: v.elements.map((el, elIdx) => ({
        _key: `el-${elIdx}`,
        label: el.label,
        description: el.description,
        tag: el.tag,
        status: el.status,
      })),
      accessibleSummary: v.accessibleSummary,
    }));
  }

  // Attach Source Document & Generation Run references
  if (input.sourceDocumentId) {
    documentPayload.sourceDocument = {
      _type: 'reference',
      _ref: input.sourceDocumentId,
    };
  }
  if (input.generationRunId) {
    documentPayload.generationRun = {
      _type: 'reference',
      _ref: input.generationRunId,
    };
  }

  // Perform remote mutation if live Sanity write credentials are fully configured
  let remoteMutated = false;
  if (isSanityConfigured && writeToken && writeToken.trim() !== '') {
    try {
      const writeClient = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: writeToken,
      });

      await writeClient.createOrReplace(documentPayload);
      remoteMutated = true;
    } catch (err) {
      throw new SanityMutationError(
        `Failed to create draft document in Sanity: ${(err as Error).message}`
      );
    }
  }

  return {
    draftId: draftDocId,
    slug: input.draft.slug,
    remoteMutated,
    documentPayload,
  };
}
