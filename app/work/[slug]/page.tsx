import { Arrow } from '@/components/portfolio/Arrow';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CASE_STUDIES } from '@/lib/fixtures/portfolio';
import { projectImage } from '@/components/portfolio/ProjectTile';
import { PROJECT_STORIES } from '@/lib/content/project-stories';

export function generateStaticParams() { return CASE_STUDIES.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = CASE_STUDIES.find((item) => item.slug === slug);
  return { title: project?.title || 'Project', description: project?.summary, alternates: { canonical: `/work/${slug}` } };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = CASE_STUDIES.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = CASE_STUDIES[(CASE_STUDIES.indexOf(project) + 1) % CASE_STUDIES.length];
  const story = PROJECT_STORIES[project.slug];
  return <article className="inner-page section-pad case-page">
    <Link className="back-link" href="/work">← All work</Link>
    <div className="page-hero" data-reveal><h1>{project.title}</h1><p>{project.summary}</p></div>
    <div className="case-cover" data-reveal><Image src={projectImage(project)} alt={`Placeholder visual for ${project.title}`} fill priority sizes="100vw" /></div>
    <div className="case-layout">
      <aside><span>{project.domain}</span><span>{project.status}</span><span>{project.role}</span><span>{project.period}</span>{project.githubUrl && <a className="case-source-link" href={project.githubUrl} target="_blank" rel="noreferrer">View repository <Arrow /></a>}</aside>
      <div>
        <section data-reveal><h2>The problem</h2><p>{project.problem}</p></section>
        <section data-reveal><h2>My approach</h2>{project.background && <p>{project.background}</p>}<ul>{project.responsibilities?.map((item) => <li key={item}>{item}</li>)}</ul></section>
        {story && <section data-reveal><h2>Decisions that shaped it</h2><p>{story.decision}</p><p>{story.hardPart}</p></section>}
        {story && <section data-reveal><h2>What it made possible</h2><p>{story.impact}</p></section>}
        <section data-reveal><h2>Tools & methods</h2><p>{project.technologies.join(' · ')}</p></section>
        {story?.relatedExpertise.length ? <section data-reveal><h2>Related expertise</h2><div className="case-expertise-links">{story.relatedExpertise.map((item) => <Link key={item} href={`/expertise/${item}`}>{item.replaceAll('-', ' ')} <Arrow /></Link>)}</div></section> : null}
      </div>
    </div>
    <Link href={`/work/${next.slug}`} className="next-project" data-reveal><span>Next project</span><strong>{next.title}</strong><b><Arrow /></b></Link>
  </article>;
}
