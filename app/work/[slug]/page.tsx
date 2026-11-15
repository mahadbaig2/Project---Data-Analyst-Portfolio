import { Arrow } from '@/components/portfolio/Arrow';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CASE_STUDIES } from '@/lib/fixtures/portfolio';
import { projectImage } from '@/components/portfolio/ProjectTile';

export function generateStaticParams() { return CASE_STUDIES.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = CASE_STUDIES.find((item) => item.slug === slug);
  return { title: project?.title || 'Project', description: project?.summary };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = CASE_STUDIES.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = CASE_STUDIES[(CASE_STUDIES.indexOf(project) + 1) % CASE_STUDIES.length];
  return <article className="inner-page section-pad case-page">
    <Link className="back-link" href="/work">← All work</Link>
    <div className="page-hero" data-reveal><h1>{project.title}</h1><p>{project.summary}</p></div>
    <div className="case-cover" data-reveal><Image src={projectImage(project)} alt={`Placeholder visual for ${project.title}`} fill priority sizes="100vw" /></div>
    <div className="case-layout">
      <aside><span>{project.domain}</span><span>{project.status}</span><span>{project.role}</span><span>{project.period}</span>{project.githubUrl && <a className="case-source-link" href={project.githubUrl} target="_blank" rel="noreferrer">View repository <Arrow /></a>}</aside>
      <div>
        <section data-reveal><h2>The challenge</h2><p>{project.problem}</p></section>
        <section data-reveal><h2>What I built</h2>{project.background && <p>{project.background}</p>}<ul>{project.responsibilities?.map((item) => <li key={item}>{item}</li>)}</ul></section>
        {project.outcomes && project.outcomes.length > 0 && <section data-reveal><h2>What came out of it</h2><ul>{project.outcomes.map((item) => <li key={item}>{item}</li>)}</ul></section>}
        <section data-reveal><h2>Tools & methods</h2><p>{project.technologies.join(' · ')}</p></section>
      </div>
    </div>
    <Link href={`/work/${next.slug}`} className="next-project" data-reveal><span>Next project</span><strong>{next.title}</strong><b><Arrow /></b></Link>
  </article>;
}
