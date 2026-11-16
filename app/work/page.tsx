import type { Metadata } from 'next';
import { Arrow } from '@/components/portfolio/Arrow';
import Link from 'next/link';
import { FLAGSHIP_PROJECTS } from '@/lib/content/project-selection';
import { ProjectTile } from '@/components/portfolio/ProjectTile';

export const metadata: Metadata = { title: 'Case studies | BI architect & data analyst', description: 'Retail and logistics BI case studies by Mirza Hammad Baig: secured Power BI reporting, a validated Python replenishment pipeline and weekly sales analytics.' };

export default function WorkPage() {
  return <div className="inner-page section-pad">
    <div className="page-hero" data-reveal><h1>Case studies<span className="yellow-dot">.</span></h1><p>Reporting and data systems for retail and logistics, from shipment visibility to store-level stock decisions.</p></div>
    <div className="project-grid work-grid">{FLAGSHIP_PROJECTS.map((project, index) => <ProjectTile key={project.slug} project={project} index={index} showSummary />)}</div>
    <div className="work-github-link" data-reveal><p>AI prototypes, machine learning studies and other public projects live in my learning lab.</p><Link className="text-link" href="/lab">Explore the learning lab <Arrow /></Link></div>
  </div>;
}
