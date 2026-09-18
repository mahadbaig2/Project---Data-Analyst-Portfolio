import { parseAndNormalizeSource } from '../source/parse-source';
import { buildDeterministicContextPack } from '../context/build-context';
import { runComprehensiveClaimValidation } from '../validation/claim-rules';
import { createOrUpdateSanityDraft } from '../sanity-draft/create-sanity-draft';
import { createModelProvider } from '../providers/factory';
import { ProjectExtractionSchema } from '../schemas/project-extraction';
import { EvidenceMapSchema } from '../schemas/evidence-map';
import { CaseStudyDraftSchema, CaseStudyDraft } from '../schemas/case-study-draft';
import { buildProjectExtractionPrompt } from '../prompts/extract-project';
import { buildEvidenceMappingPrompt } from '../prompts/map-evidence';
import { buildCaseStudyDraftPrompt } from '../prompts/write-case-study';
import { PROMPT_VERSION } from '../prompts/system';
import { ConfidentialityError } from '../errors';
import { RunStage, ReviewerStatus, ConfidentialityStatus } from '../types';
import { ProjectExtraction } from '../schemas/project-extraction';
import { ContextPack } from '../schemas/context-pack';
import { EvidenceMap } from '../schemas/evidence-map';
import { ValidationReport } from '../schemas/validation-report';

export interface GenerateCaseStudyOptions {
  sourceContent: string | Buffer;
  fileName?: string;
  sourceDocumentId?: string;
  projectTitleHint?: string;
  relatedOrganization?: string;
  relatedExperienceId?: string;
  relatedTechnologies?: string[];
  confidentialityStatus: ConfidentialityStatus;
  confidentialityAcknowledged: boolean;
  targetCaseStudyId?: string;
  onProgress?: (stage: RunStage, message: string) => Promise<void> | void;
}

export interface GenerationRunSnapshot {
  id: string;
  sourceDocumentId?: string;
  targetCaseStudyDraftId?: string;
  targetSlug?: string;
  status: 'completed' | 'completed_with_warnings' | 'failed';
  stage: RunStage;
  progressMessage: string;
  provider: string;
  model: string;
  promptVersion: string;
  schemaVersion: string;
  startTime: string;
  endTime: string;
  durationMs: number;
  extraction?: ProjectExtraction;
  contextPack?: ContextPack;
  evidenceMap?: EvidenceMap;
  draft?: CaseStudyDraft;
  validationReport?: ValidationReport;
  warnings: string[];
  reviewerStatus: ReviewerStatus;
  remoteDraftCreated: boolean;
  errorCategory?: string;
  errorMessage?: string;
}

export async function executeCaseStudyGeneration(
  options: GenerateCaseStudyOptions
): Promise<GenerationRunSnapshot> {
  const startTime = new Date();
  const runId = `gen-run-${Date.now()}`;
  const warnings: string[] = [];

  const updateStage = async (stage: RunStage, message: string) => {
    if (options.onProgress) {
      await options.onProgress(stage, message);
    }
  };

  // 1. Stage: Queued & Confidentiality Gate
  await updateStage('queued', 'Validating confidentiality and source inputs...');
  if (!options.confidentialityAcknowledged) {
    throw new ConfidentialityError(
      'Confidentiality acknowledgement is required before processing project documentation.'
    );
  }
  if (options.confidentialityStatus === 'confidential_do_not_process') {
    throw new ConfidentialityError(
      'Document is classified as confidential and processing is blocked by policy.'
    );
  }

  const provider = createModelProvider();

  // 2. Stage: Source Normalization & Hash
  const parsedSource = parseAndNormalizeSource(options.sourceContent, {
    fileName: options.fileName,
  });

  // 3. Stage: Project Fact Extraction
  await updateStage('extracting', 'Extracting project facts, business dilemma, and constraints...');
  const extractionPrompt = buildProjectExtractionPrompt(parsedSource.normalizedContent, {
    projectTitleHint: options.projectTitleHint,
    organization: options.relatedOrganization,
    technologies: options.relatedTechnologies,
  });

  const extractionResult = await provider.generateStructured({
    prompt: extractionPrompt.prompt,
    systemPrompt: extractionPrompt.system,
    schema: ProjectExtractionSchema,
    schemaName: 'ProjectExtraction',
    temperature: 0.1,
  });
  const extraction = extractionResult.data;

  // 4. Stage: Deterministic Context Selection
  await updateStage('building_context', 'Querying approved professional context...');
  const contextPack = await buildDeterministicContextPack({
    domain: extraction.domain,
    organization: options.relatedOrganization || extraction.organizationCandidates[0],
    technologies: [
      ...extraction.technologiesExplicitlyMentioned,
      ...(options.relatedTechnologies || []),
    ],
    projectTitleHint: options.projectTitleHint || extraction.proposedProjectTitle,
  });

  // 5. Stage: Evidence Mapping
  await updateStage('mapping_evidence', 'Constructing claim-level evidence map and citations...');
  const evidencePrompt = buildEvidenceMappingPrompt(extraction, contextPack);
  const evidenceResult = await provider.generateStructured({
    prompt: evidencePrompt.prompt,
    systemPrompt: evidencePrompt.system,
    schema: EvidenceMapSchema,
    schemaName: 'EvidenceMap',
    temperature: 0.1,
  });
  const evidenceMap = evidenceResult.data;

  // 6. Stage: Drafting Narrative, Architecture & Supporting Visuals
  await updateStage('drafting', 'Drafting case study sections, Kimball architecture graph, and visuals...');
  const draftPrompt = buildCaseStudyDraftPrompt(extraction, contextPack, evidenceMap);
  const draftResult = await provider.generateStructured({
    prompt: draftPrompt.prompt,
    systemPrompt: draftPrompt.system,
    schema: CaseStudyDraftSchema,
    schemaName: 'CaseStudyDraft',
    temperature: 0.2,
  });
  let draft = draftResult.data;

  // 7. Stage: Deterministic Claim Validation
  await updateStage('validating', 'Executing deterministic claim, metric, and architecture safeguards...');
  const validationReport = runComprehensiveClaimValidation({
    draft,
    sourceText: parsedSource.normalizedContent,
    contextPack,
  });

  // Collect warnings
  for (const w of validationReport.editorialWarnings) {
    warnings.push(`[${w.code}] ${w.message}`);
  }
  for (const b of validationReport.publishBlockingIssues) {
    warnings.push(`[BLOCKING] [${b.code}] ${b.message}`);
  }

  // If there are blocking issues, attach them to missingInformationWarnings on draft
  if (validationReport.publishBlockingIssues.length > 0) {
    draft = {
      ...draft,
      missingInformationWarnings: [
        ...draft.missingInformationWarnings,
        ...validationReport.publishBlockingIssues.map((b) => `Action Required: ${b.message}`),
      ],
    };
  }

  // 8. Stage: Create Sanity Draft
  await updateStage('creating_draft', 'Mapping document to unpublished Sanity draft...');
  const sanityResult = await createOrUpdateSanityDraft({
    draft,
    sourceDocumentId: options.sourceDocumentId,
    generationRunId: runId,
    validationReport,
    targetCaseStudyId: options.targetCaseStudyId,
  });

  const endTime = new Date();
  const durationMs = endTime.getTime() - startTime.getTime();
  const hasWarnings = warnings.length > 0 || !validationReport.isValid;
  const finalStatus = hasWarnings ? 'completed_with_warnings' : 'completed';

  await updateStage(finalStatus, `Generation finished in ${Math.round(durationMs / 1000)}s.`);

  return {
    id: runId,
    sourceDocumentId: options.sourceDocumentId,
    targetCaseStudyDraftId: sanityResult.draftId,
    targetSlug: sanityResult.slug,
    status: finalStatus,
    stage: finalStatus,
    progressMessage: `Generation complete. ${warnings.length} review notes generated.`,
    provider: provider.name,
    model: provider.model,
    promptVersion: PROMPT_VERSION,
    schemaVersion: '1.0.0',
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    durationMs,
    extraction,
    contextPack,
    evidenceMap,
    draft,
    validationReport,
    warnings,
    reviewerStatus: 'pending',
    remoteDraftCreated: sanityResult.remoteMutated,
  };
}
