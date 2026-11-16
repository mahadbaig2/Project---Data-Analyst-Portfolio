import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/portfolio/Arrow';
import { ProjectTile } from '@/components/portfolio/ProjectTile';
import { LAB_PROJECTS } from '@/lib/content/project-selection';

export const metadata: Metadata = {
  title: 'Learning lab | Data analyst projects',
  description: 'Public AI assistants, data-analysis studies, machine-learning experiments and datasets by Mirza Hammad Baig.',
};

export default function LabPage() {
  return <div className="inner-page section-pad">
    <Link className="back-link" href="/work">← Case studies</Link>
    <div className="page-hero" data-reveal><h1>Learning lab<span className="yellow-dot">.</span></h1><p>Prototypes, public datasets and course work that let me test ideas beyond my day-to-day BI work.</p></div>
    <div className="project-grid">{LAB_PROJECTS.map((project, index) => <ProjectTile key={project.slug} project={project} index={index} />)}</div>
    <div className="work-github-link" data-reveal><p>The complete code and smaller experiments are on GitHub.</p><a className="text-link" href="https://github.com/mirzahammad1" target="_blank" rel="noreferrer">Explore GitHub <Arrow /></a></div>
  </div>;
}
