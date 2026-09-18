import {
  CaseStudyModelProvider,
  StructuredGenerationRequest,
  StructuredGenerationResult,
} from './types';
import {
  ProviderTimeoutError,
  ProviderQuotaError,
  StructuredOutputError,
} from '../errors';

export class MockModelProvider implements CaseStudyModelProvider {
  public readonly name = 'mock';
  public readonly model = 'mock-model-v1';

  async generateStructured<T>(
    request: StructuredGenerationRequest<T>
  ): Promise<StructuredGenerationResult<T>> {
    const startTime = Date.now();

    // 1. Check for intentional test simulation hooks
    if (request.prompt.includes('SIMULATE_TIMEOUT')) {
      throw new ProviderTimeoutError('mock', 5000);
    }
    if (request.prompt.includes('SIMULATE_QUOTA')) {
      throw new ProviderQuotaError('mock');
    }
    if (request.prompt.includes('SIMULATE_INVALID_JSON')) {
      throw new StructuredOutputError('Simulated malformed JSON payload from mock provider');
    }

    let mockData: unknown;

    // 2. Return schema-specific mock payloads
    if (request.schemaName === 'ProjectExtraction') {
      const isWeakNotes = request.prompt.includes('Weak unstructured notes') || request.prompt.includes('Made weekly sales dashboard');
      const hasFutureTech = request.prompt.includes('Future version could use Azure Data Factory');

      mockData = {
        proposedProjectTitle: isWeakNotes
          ? 'Weekly Retail Sales Pacing Dashboard'
          : 'Weekly Sales Performance & Commission Analytics System',
        sourceSummary: isWeakNotes
          ? 'Management reporting for weekly store sales and manager commissions based on fragmented branch CSV extracts.'
          : 'Production-grade Power BI reporting suite replacing manual spreadsheet collation with automated star schema modeling, YoY tracking, and dynamic DAX commissions.',
        domain: 'Retail & Multi-Branch Commerce',
        industry: 'Commercial Retail Operations',
        organizationCandidates: isWeakNotes ? [] : ['Departmental Retail Chain'],
        dateCandidates: ['Weekly Production Refresh'],
        roleCandidates: ['Lead BI Architect & Analyst'],
        stakeholders: ['Store Leadership', 'Department Managers', 'Executive Commercial Directors'],
        businessProblem:
          'Multi-day latency in collating weekly POS spreadsheet extracts across branches created formula errors and delayed leadership decisions.',
        objectives: [
          'Deliver automated weekly sales pacing by store and merchandise category.',
          'Automate store manager commission calculations through certified DAX formulas.',
          'Provide prior year (YoY) comparative benchmarking.',
        ],
        constraints: [
          'Spreadsheet CSV extracts with inconsistent naming conventions.',
          'Strict weekly Monday morning executive meeting deadlines.',
        ],
        responsibilities: [
          'Architected Kimball star schema model separating POS transaction facts from conformed dimensions.',
          'Author performant DAX calculation measures for YTD and YoY performance.',
          'Built scheduled Power Query ETL pipelines eliminating manual copy-paste routines.',
        ],
        dataSources: ['Store POS CSV Extracts', 'Commission Tier Reference Table', 'Master Product Catalog'],
        technologiesExplicitlyMentioned: hasFutureTech
          ? ['Power BI', 'DAX', 'Power Query', 'Azure Data Factory']
          : ['Power BI', 'DAX', 'Power Query'],
        calculationsExplicitlyMentioned: [
          {
            measure: 'Weekly Sales YoY %',
            formula: 'DIVIDE([Weekly Sales] - [Weekly Sales SPLY], [Weekly Sales SPLY])',
            purpose: 'Compare current week performance with exact matching week of prior year.',
          },
          {
            measure: 'Department Manager Commission',
            formula: 'SWITCH(TRUE(), [YTD Achievement %] >= 1.1, [Sales] * 0.05, 0)',
            purpose: 'Automate tier-based incentive payouts without manual calculation errors.',
          },
        ],
        implementedWorkflow: [
          'Export POS data from store branches',
          'Cleanse and merge via Power Query',
          'Load into VertiPaq tabular star schema',
          'Publish governed report to Power BI Service',
        ],
        outputs: ['Executive Weekly Dashboard', 'Department Performance Matrix', 'Automated Commission Export'],
        outcomes: [
          {
            statement: 'Eliminated recurring manual calculation errors across departmental manager commissions.',
          },
          {
            statement: 'Accelerated weekly reporting delivery from 3 days to automated Monday morning availability.',
          },
        ],
        challenges: [
          'Reconciling inconsistent product group taxonomies across newly acquired stores.',
          'Ensuring SAMEPERIODLASTYEAR evaluations correctly handle 53-week retail calendars.',
        ],
        decisions: [
          'Constructed clean 1-to-many dimensional relationships avoiding bidirectional cross-filtering.',
          'Maintained explicit measure folders for executive KPIs versus operational diagnostics.',
        ],
        futureIdeas: hasFutureTech ? ['Future version could use Azure Data Factory for automated cloud ingestion.'] : [],
        unresolvedQuestions: isWeakNotes
          ? ['Exact legal corporate name of client was not provided.', 'Commission tier threshold details require confirmation.']
          : [],
        facts: [
          {
            claim: 'Used Power BI for weekly sales reporting',
            excerpt: 'Used power bi',
            confidence: 1.0,
            explicitOrInferred: 'explicit',
          },
        ],
      };
    } else if (request.schemaName === 'EvidenceMap') {
      mockData = {
        claims: [
          {
            claimId: 'CLM-01',
            claimText: 'Weekly POS spreadsheet collation suffered from multi-day manual latency.',
            claimType: 'project_fact',
            sourceType: 'uploaded_document',
            sourceLocator: 'Paragraph 1',
            evidenceExcerpt: 'Files came as csv. Manual calculations created recurring errors.',
            confidence: 0.95,
            isProjectSpecific: true,
            verificationState: 'supported',
            allowedPlacement: ['problem', 'background'],
          },
          {
            claimId: 'CLM-02',
            claimText: 'Implemented dimensional star schema in Power BI with automated DAX commission measures.',
            claimType: 'project_fact',
            sourceType: 'uploaded_document',
            sourceLocator: 'Paragraph 2',
            evidenceExcerpt: 'Used power bi. Had commission calculations.',
            confidence: 0.9,
            isProjectSpecific: true,
            verificationState: 'supported',
            allowedPlacement: ['responsibilities', 'calculations'],
          },
        ],
        supportedCount: 2,
        unsupportedCount: 0,
        requiresConfirmationCount: 0,
        conflictingCount: 0,
        summary: 'All core statements map directly to source evidence excerpts.',
      };
    } else {
      // Default: CaseStudyDraft
      const isWeakNotes = request.prompt.includes('Weak unstructured notes') || request.prompt.includes('Made weekly sales dashboard');
      const hasFutureTech = request.prompt.includes('Future version could use Azure Data Factory');

      mockData = {
        title: isWeakNotes
          ? 'Weekly Retail Store Sales Pacing & Commission Dashboard'
          : 'Weekly Sales Performance & Commission Analytics System',
        slug: 'weekly-sales-performance-commission-analytics',
        summary:
          'A management-focused Power BI reporting solution monitoring weekly branch and category performance, YoY pacing, and automated department manager commissions.',
        domain: 'Retail & Multi-Branch Commerce',
        category: 'Business Intelligence',
        organization: isWeakNotes ? undefined : 'Departmental Retail Chain',
        role: 'Lead BI Architect & Analyst',
        period: 'Production Deployment',
        status: 'Production Deployed',
        confidentiality: 'Client-Anonymized Enterprise Solution',
        problem:
          'Store leadership faced recurring delays collating weekly POS spreadsheet extracts across branches. Manual calculations created commission formula errors and prevented commercial directors from comparing performance against historical benchmarks in time for weekly operational reviews.',
        background:
          'Designed around senior leadership requirements for a dependable Monday morning reporting workflow accessible during store walkthroughs.',
        primaryUser: 'Commercial Directors, Regional Store Managers, and Merchandise Heads',
        objectives: [
          {
            id: '01',
            title: 'Weekly Store & Department Performance',
            description: 'Track granular revenue by branch location, merchandise category, and product group.',
          },
          {
            id: '02',
            title: 'Prior Year Comparative Benchmarks',
            description: 'Dynamically evaluate current-week performance against the exact corresponding week of the prior calendar year.',
          },
          {
            id: '03',
            title: 'Automated Commission Logic',
            description: 'Eliminate manual spreadsheet calculation errors through validated DAX formula automation.',
          },
        ],
        dataSources: ['Store POS CSV Extracts', 'Commission Tier Matrix', 'Master Product & Store Dimension Tables'],
        responsibilities: [
          'Architected a Kimball star schema model in Power BI with centralized fact sales and conformable dimension tables.',
          'Engineered automated Power Query transformation routines to cleanse inconsistent branch CSV extracts.',
          'Authored validated DAX measures for YoY pacing and tiered manager incentives.',
          'Established role-based operational views for regional directors versus departmental leads.',
        ],
        technologies: ['Power BI', 'DAX', 'Power Query', 'Star Schema Modeling'],
        calculations: [
          {
            measure: 'Weekly Sales YoY %',
            formula: 'DIVIDE([Weekly Sales] - [Weekly Sales SPLY], [Weekly Sales SPLY])',
            purpose: 'Evaluates current week performance against the exact matching week of the prior calendar year.',
          },
          {
            measure: 'Commission Payout',
            formula: 'SWITCH(TRUE(), [YTD Achievement %] >= 1.0, [Total Sales] * 0.03, 0)',
            purpose: 'Automates incentive calculations based on validated performance thresholds.',
          },
        ],
        architecture: {
          title: 'Data Lineage & Dimensional Flow',
          nodes: [
            {
              id: 'pos-extracts',
              title: 'Branch POS CSV Extracts',
              category: 'Ingestion Layer',
              items: ['Transaction Logs', 'Branch IDs', 'Item Quantities'],
              detail: 'Weekly batch ingestion',
              implementationStatus: 'implemented',
            },
            {
              id: 'pq-transform',
              title: 'Power Query ETL',
              category: 'Staging & Cleansing',
              items: ['Data Cleansing', 'Type Coercion', 'Calendar Alignment'],
              detail: 'M transformation pipeline',
              implementationStatus: 'implemented',
            },
            {
              id: 'star-schema',
              title: 'VertiPaq Dimensional Model',
              category: 'Fact & Dimension Layer',
              items: ['Fact_WeeklySales', 'Dim_Store', 'Dim_Product', 'Dim_Date'],
              detail: 'Kimball star schema',
              implementationStatus: 'implemented',
            },
            {
              id: 'pbi-reports',
              title: 'Power BI Executive Dashboard',
              category: 'Presentation Layer',
              items: ['Store Pacing Visuals', 'Category Matrix', 'Commission Tables'],
              detail: 'Published to Power BI Service',
              implementationStatus: 'implemented',
            },
            ...(hasFutureTech
              ? [
                  {
                    id: 'adf-pipeline',
                    title: 'Azure Data Factory Orchestration',
                    category: 'Cloud Pipeline (Recommended)',
                    items: ['Automated Blob Trigger', 'Scheduled Data Pipeline'],
                    detail: 'Proposed architecture enhancement',
                    implementationStatus: 'proposed' as const,
                  },
                ]
              : []),
          ],
          edges: [
            { from: 'pos-extracts', to: 'pq-transform', label: 'Raw Ingestion' },
            { from: 'pq-transform', to: 'star-schema', label: 'Dimensional Load' },
            { from: 'star-schema', to: 'pbi-reports', label: 'DAX Semantic Layer' },
          ],
          textSummary:
            'Weekly branch POS CSV extracts are ingested and cleansed via Power Query, loaded into a Kimball star schema with conformed store, product, and calendar dimensions, and exposed through a validated DAX semantic layer to executive Power BI dashboards.',
        },
        supportingVisuals: [
          {
            id: 'vis-process-flow',
            visualType: 'process_flow',
            title: 'Weekly Pacing & Commission Cycle',
            purpose: 'Illustrates the operational timeline from POS cut-off to executive dashboard delivery.',
            isImplemented: true,
            elements: [
              { label: 'POS Extract Cut-Off', description: 'Sunday 23:59 store close', status: 'current' },
              { label: 'Automated Ingestion', description: 'Power Query consolidation', status: 'improved' },
              { label: 'DAX Evaluation', description: 'Commission & YoY calculation', status: 'improved' },
              { label: 'Monday Briefing', description: 'Available for leadership review', status: 'improved' },
            ],
            accessibleSummary: 'Four-stage operational sequence detailing the weekly data transition from store POS cut-off to Monday morning briefing.',
          },
        ],
        outcomes: [
          'Eliminated recurring formula errors across branch manager commission payouts.',
          'Replaced fragmented spreadsheet exports with a single governed semantic model.',
          'Accelerated executive reporting readiness from 3 days to immediate Monday morning availability.',
        ],
        decisions: [
          'Adopted star-schema modeling separating store and product dimensions to ensure fast VertiPaq compression.',
          'Encapsulated all commission business logic inside verified DAX measures rather than calculated columns.',
        ],
        challenges: [
          'Resolving discrepancy in historical store opening dates across branch extracts.',
          'Handling calendar alignment for retail 52/53 week accounting periods.',
        ],
        learnings: [
          'Stakeholder alignment on exact commission thresholds before modeling prevents rework.',
          'Conformed dimensions allow rapid expansion into secondary commercial datasets.',
        ],
        futureRoadmap: hasFutureTech
          ? ['Transition local file imports to automated cloud data pipelines using Azure Data Factory.']
          : ['Integrate inventory stockout metrics to evaluate lost sales opportunity alongside pacing.'],
        seoTitle: 'Weekly Sales Performance & Commission Analytics | Mirza Hammad Baig',
        seoDescription:
          'Enterprise case study detailing the architecture of a Power BI sales pacing and automated commission reporting solution.',
        missingInformationWarnings: isWeakNotes
          ? [
              'Client organization name was not specified in the source document; generalized to "Departmental Retail Chain".',
              'Exact commission tier percentages require confirmation with commercial finance.',
            ]
          : [],
        sectionClaimMap: {
          problem: ['CLM-01'],
          responsibilities: ['CLM-02'],
        },
      };
    }

    // 3. Validate against the provided Zod schema
    const parsed = request.schema.safeParse(mockData);
    if (!parsed.success) {
      throw new StructuredOutputError(
        `Mock data failed schema validation: ${parsed.error.issues.map((e) => e.message).join(', ')}`
      );
    }

    const durationMs = Date.now() - startTime;

    return {
      data: parsed.data,
      provider: this.name,
      model: this.model,
      usage: {
        promptTokens: 500,
        completionTokens: 800,
        totalTokens: 1300,
      },
      durationMs,
    };
  }
}
