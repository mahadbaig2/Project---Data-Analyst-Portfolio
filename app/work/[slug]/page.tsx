import { Arrow } from '@/components/portfolio/Arrow';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CASE_STUDIES } from '@/lib/fixtures/portfolio';
import { projectImage } from '@/components/portfolio/ProjectTile';
import { PROJECT_STORIES } from '@/lib/content/project-stories';
import { FLAGSHIP_PROJECTS, LAB_PROJECTS } from '@/lib/content/project-selection';

export function generateStaticParams() { return CASE_STUDIES.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = CASE_STUDIES.find((item) => item.slug === slug);
  return { title: project ? `${project.title} | ${project.category}` : 'Project', description: project?.summary, alternates: { canonical: `/work/${slug}` } };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = CASE_STUDIES.find((item) => item.slug === slug);
  if (!project) notFound();
  const isFlagship = FLAGSHIP_PROJECTS.some((item) => item.slug === project.slug);
  const projectGroup = isFlagship ? FLAGSHIP_PROJECTS : LAB_PROJECTS;
  const next = projectGroup[(projectGroup.indexOf(project) + 1) % projectGroup.length];
  const story = PROJECT_STORIES[project.slug];
  return <article className="inner-page section-pad case-page">
    <Link className="back-link" href={isFlagship ? '/work' : '/lab'}>← {isFlagship ? 'Case studies' : 'Learning lab'}</Link>
    <div className="page-hero" data-reveal><h1>{project.title}</h1><p>{project.summary}</p></div>
    <figure className="case-visual" data-reveal><div className={`case-cover${project.imageKind === 'evidence' ? ' is-evidence' : ''}`}><Image src={projectImage(project)} alt={project.imageAlt || ''} fill priority sizes="100vw" unoptimized={project.image?.endsWith('.svg')} /></div>{project.imageKind === 'evidence' && <figcaption>{project.slug === 'retail-store-weekly-sales-analysis' ? 'Executive summary from the public Power BI project on GitHub.' : 'Architecture visualization based on the project documentation.'}<a href={project.image} target="_blank" rel="noreferrer">View full size</a></figcaption>}</figure>
    {project.slug === 'retail-store-weekly-sales-analysis' && <figure className="case-secondary-visual" data-reveal><Image src="/visuals/weekly-sales-model.svg" width={1200} height={650} alt="Star schema connecting date, store and department dimensions to weekly sales facts" unoptimized /><figcaption>Reporting model described in the public project README.</figcaption></figure>}
    <div className="case-layout">
      <aside><span>{project.domain}</span><span>{project.role}</span>{project.primaryUser && <span>For {project.primaryUser}</span>}<span>{project.period}</span>{story && <p className="case-scope"><strong>Scope</strong>{story.scope}</p>}{project.githubUrl && <a className="case-source-link" href={project.githubUrl} target="_blank" rel="noreferrer">View repository <Arrow /></a>}</aside>
      <div>
        <section data-reveal><h2>The problem</h2><p>{project.problem}</p></section>
        <section data-reveal><h2>Approach & key decisions</h2>{project.background && <p>{project.background}</p>}{story && <><p>{story.decision}</p><p>{story.hardPart}</p></>}<ul>{project.responsibilities?.map((item) => <li key={item}>{item}</li>)}</ul></section>
        {story && <section data-reveal><h2>What it made possible</h2><p>{story.impact}</p></section>}
        <section data-reveal><h2>Tools & methods</h2><p>{project.technologies.join(' · ')}</p></section>
        {story?.relatedExpertise.length ? <section data-reveal><h2>Related expertise</h2><div className="case-expertise-links">{story.relatedExpertise.map((item) => <Link key={item} href={`/expertise/${item}`}>{item.replaceAll('-', ' ')} <Arrow /></Link>)}</div></section> : null}
      </div>
    </div>
    <Link href={`/work/${next.slug}`} className="next-project" data-reveal><span>Next project</span><strong>{next.title}</strong><b><Arrow /></b></Link>
  </article>;
}
