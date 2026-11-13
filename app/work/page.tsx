import type { Metadata } from 'next';
import { CASE_STUDIES } from '@/lib/fixtures/portfolio';
import { ProjectTile } from '@/components/portfolio/ProjectTile';
export const metadata: Metadata = { title: 'Work', description: 'Selected data, BI and AI projects by Mirza Hammad Baig.' };
export default function WorkPage() { return <div className="inner-page section-pad"><div className="page-hero" data-reveal><h1>My work<span className="yellow-dot">.</span></h1><p>A selection of projects I&apos;ve built across analytics, business intelligence, and AI.</p></div><div className="project-grid work-grid">{CASE_STUDIES.map((project, index) => <ProjectTile key={project.slug} project={project} index={index} />)}</div></div>; }
