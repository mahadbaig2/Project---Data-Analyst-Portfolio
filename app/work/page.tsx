import type { Metadata } from 'next';
import { Arrow } from '@/components/portfolio/Arrow';
import { CASE_STUDIES } from '@/lib/fixtures/portfolio';
import { ProjectTile } from '@/components/portfolio/ProjectTile';

export const metadata: Metadata = { title: 'Work', description: 'Selected professional, public, and learning projects by Mirza Hammad Baig.' };

export default function WorkPage() {
  return <div className="inner-page section-pad">
    <div className="page-hero" data-reveal><h1>My work<span className="yellow-dot">.</span></h1><p>Professional systems, public projects, prototypes, and course work. Each page names its status and links to code when it is public.</p></div>
    <div className="section-heading work-subheading" data-reveal><h2>Featured projects<span className="yellow-dot">.</span></h2></div>
    <div className="project-grid work-grid">{CASE_STUDIES.slice(0, 5).map((project, index) => <ProjectTile key={project.slug} project={project} index={index} />)}</div>
    <div className="section-heading work-subheading more-work" data-reveal><h2>More to explore<span className="yellow-dot">.</span></h2></div>
    <div className="project-grid">{CASE_STUDIES.slice(5).map((project, index) => <ProjectTile key={project.slug} project={project} index={index} />)}</div>
    <div className="work-github-link" data-reveal><p>There are more learning projects and experiments in my public repositories.</p><a className="text-link" href="https://github.com/mirzahammad1" target="_blank" rel="noreferrer">Explore GitHub <Arrow /></a></div>
  </div>;
}
