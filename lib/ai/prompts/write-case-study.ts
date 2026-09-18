import { BASE_SYSTEM_PROMPT } from './system';
import { ProjectExtraction } from '../schemas/project-extraction';
import { ContextPack } from '../schemas/context-pack';
import { EvidenceMap } from '../schemas/evidence-map';

export function buildCaseStudyDraftPrompt(
  extraction: ProjectExtraction,
  contextPack: ContextPack,
  evidenceMap: EvidenceMap
): { system: string; prompt: string } {
  let prompt = `Synthesize a comprehensive, executive-level case study draft and architecture lineage graph.\n\n`;

  prompt += `=== PROJECT EXTRACTION ===\n${JSON.stringify(extraction, null, 2)}\n=== END EXTRACTION ===\n\n`;
  prompt += `=== SELECTED VERIFIED CONTEXT ===\n${JSON.stringify(contextPack, null, 2)}\n=== END CONTEXT ===\n\n`;
  prompt += `=== EVIDENCE MAP ===\n${JSON.stringify(evidenceMap, null, 2)}\n=== END EVIDENCE MAP ===\n\n`;

  prompt += `DRAFTING INSTRUCTIONS:
1. TITLE & SUMMARY:
   - Propose an executive title and concise summary (2-3 sentences) summarizing problem, solution, and commercial impact.
   - Propose a clean kebab-case slug.
2. NARRATIVE SECTIONS:
   - Problem: Detail the business dilemma, spreadsheet fragmentation, or manual latency.
   - Background: Context of the commercial environment.
   - Primary User: The specific leadership or operational roles relying on this solution.
   - Objectives: 3-5 concrete strategic objectives.
   - Technologies: Only technologies explicitly verified in extraction or directly related to the implementation.
   - Calculations: Author key DAX measures or calculations explicitly described.
   - Outcomes: Ground all outcomes in evidence. NEVER invent percentages or cost savings.
   - Decisions & Trade-offs: Architectural decisions (e.g. Kimball star schema vs flat table, Python validation, scheduled incremental refresh).
   - Challenges & Learnings: Real-world hurdles overcome.
   - Future Roadmap: Place all recommended, future, or planned technologies here.
3. ARCHITECTURE LINEAGE GRAPH:
   - Generate nodes and edges representing the data pipeline from Ingestion to Star Schema to DAX Presentation.
   - Mark any proposed/recommended nodes with implementationStatus: "proposed".
   - Provide an accessible textSummary for screen readers.
4. SUPPORTING VISUALS:
   - Generate at least one structured visual specification (e.g. process_flow, before_after, stakeholder_map).
5. Output JSON matching the CaseStudyDraft schema.`;

  return {
    system: BASE_SYSTEM_PROMPT,
    prompt,
  };
}
