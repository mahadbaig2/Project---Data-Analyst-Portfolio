import { isSanityConfigured } from '@/sanity/env';
import { client } from '@/sanity/lib/client';
import {
  EXPERIENCE_ITEMS,
  CAPABILITIES,
  TEACHING_TOPICS,
  EDUCATION_ITEMS,
} from '@/lib/fixtures/portfolio';
import { ContextItem, ContextPack } from '../schemas/context-pack';
import { rankAndFilterContext } from './rank-context';

export interface BuildContextInput {
  domain: string;
  organization?: string;
  technologies: string[];
  projectTitleHint?: string;
  maxItems?: number;
}

export async function buildDeterministicContextPack(
  input: BuildContextInput
): Promise<ContextPack> {
  const rawItems: ContextItem[] = [];

  if (isSanityConfigured) {
    try {
      const sanityQuery = `*[_type in ["experience", "capability", "achievement", "teachingExperience", "education"] && verificationStatus != "unsupported"]{
        _id,
        _type,
        role,
        company,
        period,
        title,
        degree,
        institution,
        honors,
        scopeOverview,
        description,
        skills,
        technologies,
        claim,
        metricValue,
        metricUnit,
        organization,
        verificationStatus,
        canUseAsProjectOutcome,
        allowedUsage
      }`;
      const records = await client.fetch<Array<Record<string, unknown>>>(sanityQuery);

      for (const rec of records) {
        if (rec._type === 'experience') {
          rawItems.push({
            id: String(rec._id),
            type: 'experience',
            title: `${rec.role} @ ${rec.company}`,
            organization: String(rec.company || ''),
            period: String(rec.period || ''),
            summary: String(rec.scopeOverview || ''),
            relevanceScore: 20,
            relevanceReason: 'Verified career role',
            allowedUsage: 'general_context',
            canUseAsProjectOutcome: false,
            verificationStatus: 'verified',
            sourceSanityId: String(rec._id),
            tags: Array.isArray(rec.technologies) ? rec.technologies.map(String) : [],
          });
        } else if (rec._type === 'achievement') {
          const isExplicitProjectOutcome = Boolean(rec.canUseAsProjectOutcome);
          rawItems.push({
            id: String(rec._id),
            type: 'achievement',
            title: String(rec.claim || ''),
            organization: rec.organization ? String(rec.organization) : undefined,
            summary: `${rec.claim} (${rec.metricValue || ''} ${rec.metricUnit || ''})`.trim(),
            relevanceScore: 30,
            relevanceReason: 'Verified individual achievement claim',
            allowedUsage: isExplicitProjectOutcome ? 'project_outcome' : 'general_context',
            canUseAsProjectOutcome: isExplicitProjectOutcome,
            verificationStatus: 'verified',
            sourceSanityId: String(rec._id),
            tags: [],
          });
        } else if (rec._type === 'capability') {
          rawItems.push({
            id: String(rec._id),
            type: 'capability',
            title: String(rec.title || ''),
            summary: String(rec.description || ''),
            relevanceScore: 15,
            relevanceReason: 'Verified technical capability discipline',
            allowedUsage: 'general_context',
            canUseAsProjectOutcome: false,
            verificationStatus: 'verified',
            sourceSanityId: String(rec._id),
            tags: Array.isArray(rec.skills) ? rec.skills.map(String) : [],
          });
        }
      }
    } catch {
      // Graceful fallback to verified fixtures if Sanity query fails
      loadVerifiedFixtures(rawItems);
    }
  } else {
    loadVerifiedFixtures(rawItems);
  }

  // Rank and filter items deterministically
  const rankedItems = rankAndFilterContext(
    rawItems,
    {
      organization: input.organization,
      domain: input.domain,
      technologies: input.technologies,
    },
    input.maxItems || 10
  );

  // Extract matched organization if any
  const matchedOrg = input.organization
    ? rankedItems.find((i) => i.organization?.toLowerCase().includes(input.organization!.toLowerCase()))?.organization
    : undefined;

  // Collect relevant verified technologies from selected items
  const techSet = new Set<string>(input.technologies);
  rankedItems.forEach((item) => {
    item.tags.forEach((t) => techSet.add(t));
  });

  return {
    domain: input.domain,
    matchedOrganization: matchedOrg,
    items: rankedItems,
    relevantTechnologies: Array.from(techSet),
    writingToneGuidance:
      'Executive analytics workspace tone: calm, analytical, authoritative, grounded in dimensional modeling and real commercial decisions. Never invent metrics, never use unsupported marketing superlatives.',
    summaryRationale: `Selected ${rankedItems.length} verified context items based on domain "${input.domain}" and organizational/technical relevance.`,
  };
}

function loadVerifiedFixtures(target: ContextItem[]) {
  // 1. Experiences
  for (const exp of EXPERIENCE_ITEMS) {
    target.push({
      id: `exp-${exp.id}`,
      type: 'experience',
      title: `${exp.role} @ ${exp.company}`,
      organization: exp.company,
      period: exp.period,
      summary: exp.scopeOverview,
      relevanceScore: 25,
      relevanceReason: 'Verified organizational experience',
      allowedUsage: 'general_context',
      canUseAsProjectOutcome: false,
      verificationStatus: 'verified',
      tags: exp.technologies,
    });

    // Outcomes inside experience are verified for that specific company, NOT generic project outcomes
    if (exp.verifiedOutcomes) {
      for (const [idx, out] of exp.verifiedOutcomes.entries()) {
        target.push({
          id: `out-${exp.id}-${idx}`,
          type: 'achievement',
          title: `${out.label}: ${out.metric}`,
          organization: exp.company,
          summary: `${out.metric} - ${out.detail}`,
          relevanceScore: 30,
          relevanceReason: `Organizational achievement at ${exp.company} (cannot be transferred to unrelated projects)`,
          allowedUsage: 'general_context',
          canUseAsProjectOutcome: false,
          verificationStatus: 'verified',
          tags: exp.technologies,
        });
      }
    }
  }

  // 2. Capabilities
  for (const cap of CAPABILITIES) {
    target.push({
      id: `cap-${cap.id}`,
      type: 'capability',
      title: cap.title,
      summary: cap.description,
      relevanceScore: 15,
      relevanceReason: 'Technical capability discipline',
      allowedUsage: 'general_context',
      canUseAsProjectOutcome: false,
      verificationStatus: 'verified',
      tags: cap.skills,
    });
  }

  // 3. Teaching
  for (const teach of TEACHING_TOPICS) {
    target.push({
      id: `teach-${teach.id}`,
      type: 'teaching',
      title: teach.title,
      organization: 'Atomcamp',
      summary: teach.description,
      relevanceScore: 10,
      relevanceReason: 'Verified teaching track',
      allowedUsage: 'tone_guidance',
      canUseAsProjectOutcome: false,
      verificationStatus: 'verified',
      tags: teach.coreConcepts,
    });
  }

  // 4. Education
  for (const edu of EDUCATION_ITEMS) {
    target.push({
      id: `edu-${edu.id}`,
      type: 'education',
      title: `${edu.degree} - ${edu.institution}`,
      organization: edu.institution,
      summary: `${edu.degree}${edu.honors ? ` (${edu.honors})` : ''} at ${edu.institution}`,
      relevanceScore: 10,
      relevanceReason: 'Academic background',
      allowedUsage: 'general_context',
      canUseAsProjectOutcome: false,
      verificationStatus: 'verified',
      tags: [],
    });
  }
}
