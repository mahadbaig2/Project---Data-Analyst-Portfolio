import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Arrow } from '@/components/portfolio/Arrow';
import { CAPABILITIES, CASE_STUDIES } from '@/lib/fixtures/portfolio';
import { EXPERTISE_STORIES } from '@/lib/content/expertise';

export const dynamicParams = false;

export function generateStaticParams() {
  return CAPABILITIES.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const capability = CAPABILITIES.find((item) => item.id === slug);
  const story = EXPERTISE_STORIES[slug];
  if (!capability || !story) return { title: 'Expertise' };
  return {
    title: `${capability.title} | Data analyst & BI architect`,
    description: `${story.introduction} See how Mirza Hammad Baig applied this skill in selected projects.`,
    alternates: { canonical: `/expertise/${slug}` },
  };
}

export default async function ExpertiseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const capability = CAPABILITIES.find((item) => item.id === slug);
  const story = EXPERTISE_STORIES[slug];
  if (!capability || !story) notFound();

  return <article className="inner-page section-pad expertise-detail">
    <Link className="back-link" href="/expertise">← All expertise</Link>
    <header className="page-hero" data-reveal><h1>{capability.title}<span className="yellow-dot">.</span></h1><p>{story.introduction}</p></header>
    <div className="expertise-detail-grid">
      <h2 data-reveal>How I work</h2>
      <div data-reveal>{story.approach.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </div>
    <section className="expertise-projects" aria-labelledby="expertise-projects-title">
      <div className="section-heading" data-reveal><h2 id="expertise-projects-title">Where I&apos;ve used it<span className="yellow-dot">.</span></h2></div>
      <div className="expertise-project-list">{story.projects.map(({ slug: projectSlug, connection }) => {
        const project = CASE_STUDIES.find((item) => item.slug === projectSlug);
        if (!project) return null;
        return <Link href={`/work/${project.slug}`} className="expertise-project" key={project.slug} data-reveal>
          <div><span>{project.status}</span><h3>{project.title}</h3><p>{connection}</p></div><b aria-hidden="true"><Arrow /></b>
        </Link>;
      })}</div>
    </section>
    {slug === 'teaching-mentoring' && <p className="expertise-teaching-link" data-reveal>See more about my classes and mentoring on the <Link href="/teaching">teaching page <Arrow /></Link>.</p>}
    <div className="contact-band" data-reveal><h2>Have a related challenge?</h2><Link href="/contact">Let&apos;s talk <Arrow /></Link></div>
  </article>;
}
