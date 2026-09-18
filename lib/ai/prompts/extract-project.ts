import { BASE_SYSTEM_PROMPT } from './system';

export function buildProjectExtractionPrompt(
  sourceText: string,
  hints?: {
    projectTitleHint?: string;
    organization?: string;
    technologies?: string[];
  }
): { system: string; prompt: string } {
  let prompt = `Analyze the following unstructured project documentation and extract verified project entities, constraints, and facts.\n\n`;

  if (hints?.projectTitleHint || hints?.organization || hints?.technologies?.length) {
    prompt += `USER-PROVIDED CONTEXT HINTS:\n`;
    if (hints.projectTitleHint) prompt += `- Proposed Title Hint: ${hints.projectTitleHint}\n`;
    if (hints.organization) prompt += `- Target Organization: ${hints.organization}\n`;
    if (hints.technologies?.length) prompt += `- Known Technologies: ${hints.technologies.join(', ')}\n`;
    prompt += `\n`;
  }

  prompt += `=== SOURCE PROJECT DOCUMENTATION ===\n${sourceText}\n=== END SOURCE ===\n\n`;
  prompt += `INSTRUCTIONS:
1. Extract the operational business dilemma, objectives, constraints, and data sources.
2. Only list technologies and calculations that are EXPLICITLY mentioned in the source.
3. Identify any proposed or future ideas and separate them from implemented workflows.
4. Extract exact supporting excerpts for material facts.
5. Record any contradictory or missing statements in unresolvedQuestions.
6. Output JSON conforming to the ProjectExtraction schema.`;

  return {
    system: BASE_SYSTEM_PROMPT,
    prompt,
  };
}
