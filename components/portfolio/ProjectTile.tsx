import { Arrow } from '@/components/portfolio/Arrow';
import Link from 'next/link';
import Image from 'next/image';
import type { CaseStudy } from '@/lib/types/portfolio';

export function projectImage(project: CaseStudy) {
  return project.image || '/placeholders/analytics.jpg';
}

export function ProjectTile({ project, index = 0, showSummary = false }: { project: CaseStudy; index?: number; showSummary?: boolean }) {
  return (
    <Link href={`/work/${project.slug}`} className="project-tile" data-reveal style={{ transitionDelay: `${Math.min(index, 3) * 80}ms` }}>
      <div className={`project-image${project.imageKind === 'evidence' ? ' is-evidence' : ''}`}>
        <Image src={projectImage(project)} alt={project.imageAlt || ''} fill sizes="(max-width: 760px) 100vw, 50vw" unoptimized={project.image?.endsWith('.svg')} />
        <span className="project-image-arrow" aria-hidden="true"><Arrow /></span>
      </div>
      <div className="project-caption"><h3>{project.title}</h3>{showSummary && <p>{project.summary}</p>}</div>
    </Link>
  );
}
