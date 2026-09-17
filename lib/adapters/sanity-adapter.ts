import { sanityFetch } from '@/sanity/lib/fetch';
import {
  SITE_SETTINGS_QUERY,
  HOME_PAGE_QUERY,
  ALL_CASE_STUDIES_QUERY,
  CASE_STUDY_BY_SLUG_QUERY,
  CASE_STUDY_SLUGS_QUERY,
  EXPERIENCE_PAGE_QUERY,
  EXPERTISE_PAGE_QUERY,
  TEACHING_PAGE_QUERY,
  WRITING_PAGE_QUERY,
  ABOUT_PAGE_QUERY,
} from '@/sanity/lib/queries';
import {
  PROFILE_IDENTITY,
  CASE_STUDIES,
  EXPERIENCE_ITEMS,
  CAPABILITIES,
  TECHNOLOGY_GROUPS,
  PROBLEMS_I_WORK_ON,
  PROFESSIONAL_APPROACH,
  TEACHING_TOPICS,
  LEARNING_FLOW,
  MENTORSHIP_THEMES,
  WRITING_SERIES,
  KNOWLEDGE_MAP_LAYERS,
  IDENTITY_PILLARS,
  CAREER_PRINCIPLES,
  EDUCATION_ITEMS,
  CERTIFICATIONS,
} from '@/lib/fixtures/portfolio';
import type {
  ProfileIdentity,
  CaseStudy,
  ExperienceItem,
  CapabilityItem,
  TechnologyGroup,
  TeachingTopic,
  ArticleItem,
  EducationItem,
  CertificationItem,
  IdentityPillar,
  CareerPrinciple,
} from '@/lib/types/portfolio';

interface SanitySocialLink {
  platform: 'linkedin' | 'github' | 'medium' | 'email';
  label: string;
  url: string;
}

interface SanitySiteSettingsResult {
  name?: string;
  role?: string;
  descriptor?: string;
  valueChain?: string;
  summary?: string;
  status?: string;
  email?: string;
  location?: string;
  coreStack?: string[];
  socialLinks?: SanitySocialLink[];
  cvUrl?: string;
}

interface SanityHomePageResult {
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;
  featuredCaseStudy?: CaseStudy;
  secondaryCaseStudies?: CaseStudy[];
  careerNarrativeTitle?: string;
  careerNarrativeBody?: string;
}

interface SanityExperiencePageResult {
  page?: {
    badgeText?: string;
    title?: string;
    description?: string;
    supportedDepartments?: { dept: string; focus: string }[];
    workingStyles?: { title: string; icon: string; description: string }[];
  };
  items?: ExperienceItem[];
}

interface SanityExpertisePageResult {
  page?: {
    badgeText?: string;
    title?: string;
    description?: string;
    problemsIWorkOn?: { title: string; description: string }[];
    professionalApproach?: { step: string; title: string; detail: string }[];
  };
  capabilities?: CapabilityItem[];
  technologyGroups?: TechnologyGroup[];
}

interface SanityTeachingPageResult {
  page?: {
    badgeText?: string;
    title?: string;
    description?: string;
    learningFlow?: { step: string; title: string; description: string }[];
    mentorshipThemes?: { title: string; description: string }[];
  };
  topics?: TeachingTopic[];
}

interface SanityWritingPageResult {
  page?: {
    badgeText?: string;
    title?: string;
    description?: string;
    knowledgeMapLayers?: { layer: string; description: string; examples: string[] }[];
  };
  articles?: ArticleItem[];
}

interface SanityAboutPageResult {
  page?: {
    badgeText?: string;
    title?: string;
    description?: string;
    identityPillars?: IdentityPillar[];
    careerPrinciples?: CareerPrinciple[];
  };
  education?: EducationItem[];
  certifications?: CertificationItem[];
}

/**
 * Global Site Settings & Profile Adapter
 */
export async function getSiteSettings(): Promise<ProfileIdentity> {
  const data = await sanityFetch<SanitySiteSettingsResult>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
    fallbackData: null,
  });

  if (!data || !data.name) {
    return PROFILE_IDENTITY;
  }

  return {
    name: data.name || PROFILE_IDENTITY.name,
    role: data.role || PROFILE_IDENTITY.role,
    descriptor: data.descriptor || PROFILE_IDENTITY.descriptor,
    valueChain: data.valueChain || PROFILE_IDENTITY.valueChain,
    summary: data.summary || PROFILE_IDENTITY.summary,
    status: data.status || PROFILE_IDENTITY.status,
    email: data.email || PROFILE_IDENTITY.email,
    location: data.location || PROFILE_IDENTITY.location,
    coreStack: data.coreStack || PROFILE_IDENTITY.coreStack,
    socialLinks: (data.socialLinks && data.socialLinks.length > 0)
      ? data.socialLinks.map((s) => ({
          platform: s.platform,
          label: s.label,
          href: s.url,
        }))
      : PROFILE_IDENTITY.socialLinks,
    cvUrl: data.cvUrl || PROFILE_IDENTITY.cvUrl,
  };
}

/**
 * Home Page Data Adapter
 */
export async function getHomePageData() {
  const featuredDefault = CASE_STUDIES.find((p) => p.isFeatured) || CASE_STUDIES[0];
  const secondaryDefault = CASE_STUDIES.filter((p) => p.slug !== featuredDefault.slug);

  const data = await sanityFetch<SanityHomePageResult>({
    query: HOME_PAGE_QUERY,
    tags: ['homePage', 'caseStudy'],
    fallbackData: null,
  });

  if (!data) {
    return {
      heroBadge: 'Executive Analytics Workspace',
      heroTitle: 'Mirza Hammad Baig',
      heroDescription:
        'Data Analyst & BI Solutions Architect specializing in conformed Kimball dimensional models, high-performance Power BI reporting suites, and automated analytical pipelines.',
      featuredCaseStudy: featuredDefault,
      secondaryCaseStudies: secondaryDefault,
      careerNarrativeTitle: 'From Operational Logistics to Enterprise BI Architecture',
      careerNarrativeBody:
        "Having advanced from logistics data specialist at Muller & Phipps to BI Architect at Ideas by Gul Ahmed, my perspective is rooted in real commercial workflows. I don't design dashboards in isolation—I build analytical systems that operational teams rely on daily.",
    };
  }

  return {
    heroBadge: data.heroBadge || 'Executive Analytics Workspace',
    heroTitle: data.heroTitle || 'Mirza Hammad Baig',
    heroDescription: data.heroDescription || PROFILE_IDENTITY.summary,
    featuredCaseStudy: data.featuredCaseStudy || featuredDefault,
    secondaryCaseStudies: (data.secondaryCaseStudies && data.secondaryCaseStudies.length > 0)
      ? data.secondaryCaseStudies
      : secondaryDefault,
    careerNarrativeTitle: data.careerNarrativeTitle || 'From Operational Logistics to Enterprise BI Architecture',
    careerNarrativeBody: data.careerNarrativeBody || '',
  };
}

/**
 * All Case Studies Adapter (for /work)
 */
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const data = await sanityFetch<CaseStudy[]>({
    query: ALL_CASE_STUDIES_QUERY,
    tags: ['caseStudy'],
    fallbackData: null,
  });

  if (!data || data.length === 0) {
    return CASE_STUDIES;
  }

  return data;
}

/**
 * Case Study By Slug Adapter (for /work/[slug])
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const data = await sanityFetch<CaseStudy>({
    query: CASE_STUDY_BY_SLUG_QUERY,
    params: { slug },
    tags: [`caseStudy:${slug}`],
    fallbackData: null,
  });

  if (!data) {
    const fixtureMatch = CASE_STUDIES.find((p) => p.slug === slug);
    return fixtureMatch || null;
  }

  return data;
}

/**
 * Case Study Slugs for Static Generation
 */
export async function getCaseStudySlugs(): Promise<string[]> {
  const data = await sanityFetch<{ slug: string }[]>({
    query: CASE_STUDY_SLUGS_QUERY,
    tags: ['caseStudy'],
    fallbackData: null,
  });

  if (!data || data.length === 0) {
    return CASE_STUDIES.map((p) => p.slug);
  }

  return data.map((item) => item.slug).filter(Boolean);
}

/**
 * Experience Page Data Adapter
 */
export async function getExperiencePageData() {
  const data = await sanityFetch<SanityExperiencePageResult>({
    query: EXPERIENCE_PAGE_QUERY,
    tags: ['experiencePage', 'experience'],
    fallbackData: null,
  });

  const page = data?.page || {};
  const items = (data?.items && data.items.length > 0) ? data.items : EXPERIENCE_ITEMS;

  return {
    badgeText: page.badgeText || 'Career History',
    title: page.title || 'Experience & Career Chronology',
    description: page.description || 'A verified record of enterprise data roles, cross-functional department enablement, dimensional data architecture, and commercial BI delivery.',
    items,
  };
}

/**
 * Expertise Page Data Adapter
 */
export async function getExpertisePageData() {
  const data = await sanityFetch<SanityExpertisePageResult>({
    query: EXPERTISE_PAGE_QUERY,
    tags: ['expertisePage', 'capability', 'technology'],
    fallbackData: null,
  });

  const page = data?.page || {};
  const capabilities = (data?.capabilities && data.capabilities.length > 0)
    ? data.capabilities
    : CAPABILITIES;
  const technologyGroups = (data?.technologyGroups && data.technologyGroups.length > 0)
    ? data.technologyGroups
    : TECHNOLOGY_GROUPS;

  const problems = (page.problemsIWorkOn && page.problemsIWorkOn.length > 0)
    ? page.problemsIWorkOn
    : PROBLEMS_I_WORK_ON;

  const approach = (page.professionalApproach && page.professionalApproach.length > 0)
    ? page.professionalApproach
    : PROFESSIONAL_APPROACH;

  return {
    badgeText: page.badgeText || 'Technical Capabilities',
    title: page.title || 'Expertise & Data System Architecture',
    description: page.description || 'Comprehensive technical capabilities spanning the complete data lifecycle: dimensional modeling, business intelligence, relational pipelines, and applied AI.',
    capabilities,
    technologyGroups,
    problems,
    approach,
  };
}

/**
 * Teaching Page Data Adapter
 */
export async function getTeachingPageData() {
  const data = await sanityFetch<SanityTeachingPageResult>({
    query: TEACHING_PAGE_QUERY,
    tags: ['teachingPage', 'teachingExperience'],
    fallbackData: null,
  });

  const page = data?.page || {};
  const topics = (data?.topics && data.topics.length > 0) ? data.topics : TEACHING_TOPICS;
  const flow = (page.learningFlow && page.learningFlow.length > 0) ? page.learningFlow : LEARNING_FLOW;
  const mentorship = (page.mentorshipThemes && page.mentorshipThemes.length > 0)
    ? page.mentorshipThemes
    : MENTORSHIP_THEMES;

  return {
    badgeText: page.badgeText || 'Faculty & Mentorship',
    title: page.title || 'Teaching & Knowledge Transfer',
    description: page.description || 'Treating education as an essential engineering discipline. Guiding aspiring analysts and corporate teams from theoretical syntax to production business intelligence.',
    topics,
    flow,
    mentorship,
  };
}

/**
 * Writing Page Data Adapter
 */
export async function getWritingPageData() {
  const data = await sanityFetch<SanityWritingPageResult>({
    query: WRITING_PAGE_QUERY,
    tags: ['writingPage', 'article'],
    fallbackData: null,
  });

  const page = data?.page || {};
  const articles = (data?.articles && data.articles.length > 0) ? data.articles : WRITING_SERIES;
  const knowledgeMap = (page.knowledgeMapLayers && page.knowledgeMapLayers.length > 0)
    ? page.knowledgeMapLayers
    : KNOWLEDGE_MAP_LAYERS;

  return {
    badgeText: page.badgeText || 'Publications & Field Maps',
    title: page.title || 'Writing & Thought Leadership',
    description: page.description || 'Structured technical essays deconstructing the fragmented data landscape into first principles for students, analysts, and engineering leaders.',
    articles,
    knowledgeMap,
  };
}

/**
 * About Page Data Adapter
 */
export async function getAboutPageData() {
  const data = await sanityFetch<SanityAboutPageResult>({
    query: ABOUT_PAGE_QUERY,
    tags: ['aboutPage', 'education', 'certification'],
    fallbackData: null,
  });

  const page = data?.page || {};
  const education = (data?.education && data.education.length > 0) ? data.education : EDUCATION_ITEMS;
  const certifications = (data?.certifications && data.certifications.length > 0)
    ? data.certifications
    : CERTIFICATIONS;

  const pillars = (page.identityPillars && page.identityPillars.length > 0)
    ? page.identityPillars
    : IDENTITY_PILLARS;

  const principles = (page.careerPrinciples && page.careerPrinciples.length > 0)
    ? page.careerPrinciples
    : CAREER_PRINCIPLES;

  return {
    badgeText: page.badgeText || 'Professional Profile',
    title: page.title || 'About Mirza Hammad Baig',
    description: page.description || 'Analyst · Solutions Architect · Educator · Builder. Operating at the convergence of enterprise data modeling, business intelligence, and practical knowledge transfer.',
    education,
    certifications,
    pillars,
    principles,
  };
}
