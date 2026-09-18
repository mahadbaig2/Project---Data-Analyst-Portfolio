import { BASE_SYSTEM_PROMPT } from './system';
import { ProjectExtraction } from '../schemas/project-extraction';
import { ContextPack } from '../schemas/context-pack';

export function buildEvidenceMappingPrompt(
  extraction: ProjectExtraction,
  contextPack: ContextPack
): { system: string; prompt: string } {
  let prompt = `Map all material statements and claims to supporting evidence from either the project extraction or verified professional context.\n\n`;

  prompt += `=== EXTRACTED PROJECT FACTS ===\n${JSON.stringify(extraction, null, 2)}\n=== END EXTRACTION ===\n\n`;
  prompt += `=== VERIFIED PROFESSIONAL CONTEXT ===\n${JSON.stringify(contextPack, null, 2)}\n=== END CONTEXT ===\n\n`;

  prompt += `RULES FOR EVIDENCE MAPPING:
1. Classify each claim as:
   - 'project_fact': Direct statement supported by uploaded source text.
   - 'professional_context': General profile fact explaining background (not specific project proof).
   - 'inference': Architectural deduction directly stemming from facts.
   - 'recommendation': Future improvement or planned architecture.
   - 'unverified': Any claim lacking proof.
2. If a professional context item has canUseAsProjectOutcome: false, it CANNOT be classified as a project outcome claim.
3. Assign a stable claim ID (e.g. CLM-01, CLM-02) to each claim.
4. Output JSON matching the EvidenceMap schema.`;

  return {
    system: BASE_SYSTEM_PROMPT,
    prompt,
  };
}
