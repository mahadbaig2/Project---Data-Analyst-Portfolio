import { Arrow } from '@/components/portfolio/Arrow';
import Link from 'next/link';
import Image from 'next/image';
import type { CaseStudy } from '@/lib/types/portfolio';

export function projectImage(project: CaseStudy) {
  return project.image || '/placeholders/analytics.jpg';
}

export function ProjectTile({ project, index = 0 }: { project: CaseStudy; index?: number }) {
  return (
    <Link href={`/work/${project.slug}`} className="project-tile" data-reveal style={{ transitionDelay: `${Math.min(index, 3) * 80}ms` }}>
      <div className="project-image">
        <Image src={projectImage(project)} alt={`Placeholder visual for ${project.title}`} fill sizes="(max-width: 760px) 100vw, 50vw" />
        <span className="project-image-arrow" aria-hidden="true"><Arrow /></span>
      </div>
      <div className="project-caption"><h3>{project.title}</h3><span>{project.status}</span></div>
    </Link>
  );
}
