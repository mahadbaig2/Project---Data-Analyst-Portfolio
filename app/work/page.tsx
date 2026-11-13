import type { Metadata } from 'next';
import { CASE_STUDIES } from '@/lib/fixtures/portfolio';
import { ProjectTile } from '@/components/portfolio/ProjectTile';
export const metadata: Metadata = { title: 'Work', description: 'Selected data, BI and AI projects by Mirza Hammad Baig.' };
export default function WorkPage() { return <div className="inner-page section-pad"><div className="page-hero" data-reveal><h1>Work that makes<br /><span>data matter.</span></h1><p>A selection of systems and experiences built around clearer decisions.</p></div><div className="project-grid work-grid">{CASE_STUDIES.map((project, index) => <ProjectTile key={project.slug} project={project} index={index} />)}</div></div>; }
