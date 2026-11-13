import { Arrow } from '@/components/portfolio/Arrow';
import Link from 'next/link';
import Image from 'next/image';
import type { CaseStudy } from '@/lib/types/portfolio';

const visuals = [
  '/placeholders/analytics.jpg',
  '/placeholders/workspace.jpg',
  '/placeholders/collaboration.jpg',
];

export function projectImage(slug: string) {
  const slugs = ['retail-store-weekly-sales-analysis', 'hospitality-booking-analytics', 'edu-assist-multi-agent-system'];
  return visuals[Math.max(0, slugs.indexOf(slug))];
}

export function ProjectTile({ project, index = 0 }: { project: CaseStudy; index?: number }) {
  return (
    <Link href={`/work/${project.slug}`} className="project-tile" data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
      <div className="project-image">
        <Image src={projectImage(project.slug)} alt="Placeholder project visual" fill sizes="(max-width: 760px) 100vw, 50vw" />
        <span className="project-image-arrow" aria-hidden="true"><Arrow /></span>
      </div>
      <div className="project-caption"><h3>{project.title}</h3><span>{project.category}</span></div>
    </Link>
  );
}
