import { CASE_STUDIES } from '@/lib/fixtures/portfolio';

const flagshipSlugs = [
  'logistics-bi-ecosystem',
  'fragrance-stock-alert-pipeline',
  'retail-store-weekly-sales-analysis',
];

export const FLAGSHIP_PROJECTS = flagshipSlugs.map((slug) => {
  const project = CASE_STUDIES.find((item) => item.slug === slug);
  if (!project) throw new Error(`Missing flagship project: ${slug}`);
  return project;
});

export const LAB_PROJECTS = CASE_STUDIES.filter((project) => !flagshipSlugs.includes(project.slug));
