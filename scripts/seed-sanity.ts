/**
 * Sanity Dataset Seeding & Migration Tooling
 *
 * This script maps the verified local fixture data into structured Sanity mutations.
 * It is idempotent, assigns stable IDs to singletons, and maps documents cleanly.
 *
 * Usage:
 * npx tsx scripts/seed-sanity.ts
 *
 * Prerequisites:
 * - NEXT_PUBLIC_SANITY_PROJECT_ID
 * - NEXT_PUBLIC_SANITY_DATASET
 * - SANITY_API_WRITE_TOKEN
 */

import { createClient } from 'next-sanity';
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
} from '../lib/fixtures/portfolio';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.');
  console.info('Set these variables in your environment to execute this migration script.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-01',
  useCdn: false,
  token,
});

async function runSeed() {
  console.log('--- Starting Sanity Dataset Migration ---');

  // 1. Site Settings Singleton
  console.log('Seeding siteSettings...');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    name: PROFILE_IDENTITY.name,
    role: PROFILE_IDENTITY.role,
    descriptor: PROFILE_IDENTITY.descriptor,
    valueChain: PROFILE_IDENTITY.valueChain,
    summary: PROFILE_IDENTITY.summary,
    status: PROFILE_IDENTITY.status,
    email: PROFILE_IDENTITY.email,
    location: PROFILE_IDENTITY.location,
    coreStack: PROFILE_IDENTITY.coreStack,
    socialLinks: PROFILE_IDENTITY.socialLinks.map((s) => ({
      _key: s.platform,
      platform: s.platform,
      label: s.label,
      url: s.href,
    })),
  });

  // 2. Case Studies
  console.log(`Seeding ${CASE_STUDIES.length} case studies...`);
  for (const cs of CASE_STUDIES) {
    const docId = `caseStudy-${cs.slug}`;
    await client.createOrReplace({
      _id: docId,
      _type: 'caseStudy',
      title: cs.title,
      slug: { _type: 'slug', current: cs.slug },
      summary: cs.summary,
      domain: cs.domain,
      category: cs.category,
      organization: cs.organization,
      role: cs.role,
      period: cs.period,
      status: cs.status,
      confidentiality: cs.confidentiality,
      isFeatured: cs.isFeatured || false,
      problem: cs.problem,
      background: cs.background,
      primaryUser: cs.primaryUser,
      objectives: cs.objectives?.map((o) => ({ _key: o.id, ...o })),
      technologies: cs.technologies,
      architecture: cs.architecture
        ? {
            _type: 'architectureGraph',
            nodes: cs.architecture.nodes.map((n) => ({ _key: n.id, nodeId: n.id, ...n })),
            edges: cs.architecture.edges.map((e, idx) => ({ _key: `edge-${idx}`, ...e })),
            textSummary: cs.architecture.textSummary,
          }
        : undefined,
      calculations: cs.calculations?.map((c, idx) => ({ _key: `calc-${idx}`, ...c })),
      outcomes: cs.outcomes,
      decisions: cs.decisions,
      challenges: cs.challenges,
      learnings: cs.learnings,
      githubUrl: cs.githubUrl,
    });
  }

  // 3. Experiences
  console.log(`Seeding ${EXPERIENCE_ITEMS.length} experience entries...`);
  for (const [idx, exp] of EXPERIENCE_ITEMS.entries()) {
    await client.createOrReplace({
      _id: `experience-${exp.id}`,
      _type: 'experience',
      role: exp.role,
      company: exp.company,
      period: exp.period,
      isCurrent: exp.isCurrent || false,
      appointmentType: exp.appointmentType,
      displayOrder: idx,
      scopeOverview: exp.scopeOverview,
      responsibilities: exp.responsibilities,
      technologies: exp.technologies,
      supportedDepartments: exp.supportedDepartments,
      verifiedOutcomes: exp.verifiedOutcomes?.map((o, oIdx) => ({ _key: `out-${oIdx}`, ...o })),
    });
  }

  // 4. Capabilities
  console.log(`Seeding ${CAPABILITIES.length} capability disciplines...`);
  for (const [idx, cap] of CAPABILITIES.entries()) {
    await client.createOrReplace({
      _id: `capability-${cap.id}`,
      _type: 'capability',
      title: cap.title,
      category: cap.category,
      description: cap.description,
      skills: cap.skills,
      icon: cap.icon,
      displayOrder: idx,
    });
  }

  // 5. Technology Groups
  console.log(`Seeding ${TECHNOLOGY_GROUPS.length} technology groups...`);
  for (const [idx, grp] of TECHNOLOGY_GROUPS.entries()) {
    const slugKey = grp.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
    await client.createOrReplace({
      _id: `technology-${slugKey}`,
      _type: 'technology',
      category: grp.category,
      description: grp.description,
      displayOrder: idx,
      technologies: grp.technologies.map((t, tIdx) => ({ _key: `tech-${tIdx}`, ...t })),
    });
  }

  // 6. Teaching Topics
  console.log(`Seeding ${TEACHING_TOPICS.length} teaching modules...`);
  for (const [idx, topic] of TEACHING_TOPICS.entries()) {
    await client.createOrReplace({
      _id: `teachingExperience-${topic.id}`,
      _type: 'teachingExperience',
      title: topic.title,
      track: topic.track,
      description: topic.description,
      coreConcepts: topic.coreConcepts,
      targetAudience: topic.targetAudience,
      displayOrder: idx,
    });
  }

  // 7. Articles
  console.log(`Seeding ${WRITING_SERIES.length} articles...`);
  for (const [idx, art] of WRITING_SERIES.entries()) {
    await client.createOrReplace({
      _id: `article-${art.id}`,
      _type: 'article',
      title: art.title,
      series: art.series,
      category: art.category,
      summary: art.summary,
      mediumUrl: art.mediumUrl,
      isFeatured: art.isFeatured || false,
      displayOrder: idx,
    });
  }

  // 8. Education & Certifications
  console.log(`Seeding academic education and certifications...`);
  for (const [idx, edu] of EDUCATION_ITEMS.entries()) {
    await client.createOrReplace({
      _id: `education-${edu.id}`,
      _type: 'education',
      degree: edu.degree,
      institution: edu.institution,
      period: edu.period,
      honors: edu.honors,
      description: edu.description,
      displayOrder: idx,
    });
  }

  for (const [idx, cert] of CERTIFICATIONS.entries()) {
    await client.createOrReplace({
      _id: `certification-${cert.id}`,
      _type: 'certification',
      title: cert.title,
      issuer: cert.issuer,
      credentialType: cert.credentialType,
      skills: cert.skills,
      displayOrder: idx,
    });
  }

  // 9. Page Singletons
  console.log('Seeding page singletons...');
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroBadge: 'Executive Analytics Workspace',
    heroTitle: 'Mirza Hammad Baig',
    heroDescription: PROFILE_IDENTITY.summary,
    careerNarrativeTitle: 'From Operational Logistics to Enterprise BI Architecture',
    careerNarrativeBody:
      "Having advanced from logistics data specialist at Muller & Phipps to BI Architect at Ideas by Gul Ahmed, my perspective is rooted in real commercial workflows. I don't design dashboards in isolation—I build analytical systems that operational teams rely on daily.",
  });

  await client.createOrReplace({
    _id: 'expertisePage',
    _type: 'expertisePage',
    badgeText: 'Technical Capabilities',
    title: 'Expertise & Data System Architecture',
    description: 'Comprehensive technical capabilities spanning the complete data lifecycle: dimensional modeling, business intelligence, relational pipelines, and applied AI.',
    problemsIWorkOn: PROBLEMS_I_WORK_ON.map((p, idx) => ({ _key: `prob-${idx}`, ...p })),
    professionalApproach: PROFESSIONAL_APPROACH.map((a) => ({ _key: `app-${a.step}`, ...a })),
  });

  await client.createOrReplace({
    _id: 'teachingPage',
    _type: 'teachingPage',
    badgeText: 'Faculty & Mentorship',
    title: 'Teaching & Knowledge Transfer',
    description: 'Treating education as an essential engineering discipline. Guiding aspiring analysts and corporate teams from theoretical syntax to production business intelligence.',
    learningFlow: LEARNING_FLOW.map((f) => ({ _key: `flow-${f.step}`, ...f })),
    mentorshipThemes: MENTORSHIP_THEMES.map((m, idx) => ({ _key: `theme-${idx}`, ...m })),
  });

  await client.createOrReplace({
    _id: 'writingPage',
    _type: 'writingPage',
    badgeText: 'Publications & Field Maps',
    title: 'Writing & Thought Leadership',
    description: 'Structured technical essays deconstructing the fragmented data landscape into first principles for students, analysts, and engineering leaders.',
    knowledgeMapLayers: KNOWLEDGE_MAP_LAYERS.map((k, idx) => ({ _key: `layer-${idx}`, ...k })),
  });

  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    badgeText: 'Professional Profile',
    title: 'About Mirza Hammad Baig',
    description: 'Analyst · Solutions Architect · Educator · Builder. Operating at the convergence of enterprise data modeling, business intelligence, and practical knowledge transfer.',
    identityPillars: IDENTITY_PILLARS.map((p) => ({ _key: `pillar-${p.number}`, ...p })),
    careerPrinciples: CAREER_PRINCIPLES.map((c) => ({ _key: `principle-${c.number}`, ...c })),
  });

  console.log('--- Migration Completed Successfully ---');
}

runSeed().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
