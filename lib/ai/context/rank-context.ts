import { ContextItem } from '../schemas/context-pack';

export interface RankContextCriteria {
  organization?: string;
  domain?: string;
  technologies: string[];
}

export function rankAndFilterContext(
  items: ContextItem[],
  criteria: RankContextCriteria,
  maxItems: number = 10
): ContextItem[] {
  const normOrg = criteria.organization?.toLowerCase().trim();
  const normDomain = criteria.domain?.toLowerCase().trim();
  const normTechs = criteria.technologies.map((t) => t.toLowerCase().trim());

  const scored = items.map((item) => {
    let score = item.relevanceScore || 10;
    const reasons: string[] = [item.relevanceReason || 'Profile background'];

    // 1. Organization match
    if (normOrg && item.organization && item.organization.toLowerCase().includes(normOrg)) {
      score += 50;
      reasons.push(`Direct match with project organization "${item.organization}"`);
    }

    // 2. Domain match
    if (normDomain && item.tags.some((t) => normDomain.includes(t.toLowerCase()))) {
      score += 25;
      reasons.push('Domain capability alignment');
    }

    // 3. Technology overlap
    const techMatches = item.tags.filter((t) => normTechs.includes(t.toLowerCase()));
    if (techMatches.length > 0) {
      score += techMatches.length * 15;
      reasons.push(`Technology stack overlap: ${techMatches.join(', ')}`);
    }

    // Cap score at 100
    const finalScore = Math.min(100, score);

    return {
      ...item,
      relevanceScore: finalScore,
      relevanceReason: reasons.join('; '),
    };
  });

  // Sort descending by relevance score
  scored.sort((a, b) => b.relevanceScore - a.relevanceScore);

  return scored.slice(0, maxItems);
}
