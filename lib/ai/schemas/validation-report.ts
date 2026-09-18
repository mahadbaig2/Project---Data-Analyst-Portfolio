import { z } from 'zod';

export const ValidationIssueSeverityEnum = z.enum(['block', 'warning', 'info']);

export const ValidationIssueSchema = z.object({
  code: z.string(),
  severity: ValidationIssueSeverityEnum,
  message: z.string(),
  targetField: z.string(),
  offendingValue: z.string(),
  suggestedRemediation: z.string(),
});

export const ValidationReportSchema = z.object({
  isValid: z.boolean(),
  publishBlockingIssues: z.array(ValidationIssueSchema).default([]),
  editorialWarnings: z.array(ValidationIssueSchema).default([]),
  inventedNumbersDetected: z.array(z.string()).default([]),
  claimsChecked: z.number().default(0),
  unsupportedClaimsCount: z.number().default(0),
  summary: z.string(),
});

export type ValidationIssue = z.infer<typeof ValidationIssueSchema>;
export type ValidationReport = z.infer<typeof ValidationReportSchema>;
