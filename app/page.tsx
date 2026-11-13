import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from '@/components/portfolio/Arrow';
import { ProjectTile } from '@/components/portfolio/ProjectTile';
import { CASE_STUDIES, EXPERIENCE_ITEMS, PROFILE_IDENTITY } from '@/lib/fixtures/portfolio';
import { sanityFetch } from '@/sanity/lib/fetch';

type Article = { _id: string; title: string; summary?: string; mediumUrl?: string; slug?: string };

const expertise = [
  { title: 'Business intelligence', detail: 'Power BI reports, DAX, and reporting people can use.' },
  { title: 'Data architecture', detail: 'Clear models and definitions behind reliable analysis.' },
  { title: 'Analytics', detail: 'Finding the question, the signal, and the next step.' },
  { title: 'Data engineering', detail: 'SQL, Power Query, and pipelines that hold up over time.' },
  { title: 'AI & automation', detail: 'Useful workflows for making information easier to find.' },
];

export default async function HomePage() {
  const articles = await sanityFetch<Article[]>({
    query: `*[_type == "article"] | order(displayOrder asc, _createdAt desc)[0...3] { _id, title, summary, mediumUrl, "slug": slug.current }`,
    tags: ['article'],
    fallbackData: [],
  });
  const currentRoles = EXPERIENCE_ITEMS.filter((item) => item.isCurrent).slice(0, 2);

  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <h1 id="hero-title">Hi, I&apos;m Hammad.<br />I turn data into<br /><span className="muted">clear decisions<span className="yellow-dot">.</span></span></h1>
      <p>I&apos;m a data analyst and BI architect based in Pakistan. This is my portfolio of projects, writing, and teaching.</p>
      <div className="hero-actions">
        <Link className="button button-dark" href="#selected-work">See my work <span><Arrow /></span></Link>
        <Link className="text-link" href="/about">About me <span><Arrow /></span></Link>
      </div>
    </section>

    <section className="work-section section-pad home-work" id="selected-work">
      <div className="section-heading" data-reveal><div><h2>Projects I&apos;ve built<span className="yellow-dot">.</span></h2><p>Selected work across retail, hospitality, and AI.</p></div><Link className="text-link" href="/work">View all work <span><Arrow /></span></Link></div>
      <div className="project-grid">{CASE_STUDIES.map((project, index) => <ProjectTile key={project.slug} project={project} index={index} />)}</div>
    </section>

    <section className="intro-grid section-pad home-intro" aria-label="About Hammad">
      <div className="intro-card dark-card" data-reveal>
        <div><h2>The person<br /><span>behind the work.</span></h2><p>I&apos;m Mirza Hammad Baig. I work across analytics, engineering, and communication to help teams understand their data and use it well.</p><Link className="button button-yellow" href="/about">More about me <span><Arrow /></span></Link></div>
        <div className="intro-note">Based in Pakistan. Working with teams and learners across data and BI.</div>
      </div>
      <div className="portrait-card" data-reveal><Image src="/placeholders/portrait-placeholder.svg" alt="Temporary portrait image" fill sizes="(max-width: 760px) 100vw, 50vw" /><div className="portrait-sticker"><span>Mirza Hammad Baig<br /><small>Data analyst & BI architect</small></span><span className="sticker-arrow"><Arrow /></span></div></div>
    </section>

    <section className="home-expertise section-pad" aria-labelledby="expertise-title">
      <div className="section-heading" data-reveal><div><h2 id="expertise-title">What I do<span className="yellow-dot">.</span></h2><p>My work covers the full path from raw data to a useful answer.</p></div><Link className="text-link" href="/expertise">Explore expertise <span><Arrow /></span></Link></div>
      <div className="home-expertise-list">{expertise.map((item, index) => <div className="home-expertise-item" key={item.title} data-reveal><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></div>)}</div>
    </section>

    <section className="home-experience section-pad" aria-labelledby="experience-title" data-reveal>
      <div><h2 id="experience-title">Where I&apos;m working now<span className="yellow-dot">.</span></h2><p>The work and teaching I&apos;m doing today.</p></div>
      <div className="home-roles">{currentRoles.map((role) => <div key={role.id}><strong>{role.role}</strong><span>{role.company}</span></div>)}<Link className="text-link" href="/experience">My experience <span><Arrow /></span></Link></div>
    </section>

    <section className="home-writing section-pad" aria-labelledby="writing-title">
      <div className="section-heading" data-reveal><div><h2 id="writing-title">What I&apos;m writing<span className="yellow-dot">.</span></h2><p>Ideas and explanations from my work with data.</p></div><Link className="text-link" href="/blog">All writing <span><Arrow /></span></Link></div>
      <div className="home-article-list">{articles?.length ? articles.map((article, index) => {
        const href = article.slug ? `/blog/${article.slug}` : article.mediumUrl || '/blog';
        return <a href={href} key={article._id} target={!article.slug && article.mediumUrl ? '_blank' : undefined} rel={!article.slug && article.mediumUrl ? 'noreferrer' : undefined} className="home-article" data-reveal><span>0{index + 1}</span><h3>{article.title}</h3><Arrow /></a>;
      }) : <p className="home-writing-empty">I&apos;ll share new writing here soon. <Link href="/blog">Visit the blog <Arrow /></Link></p>}</div>
    </section>

    <section className="home-teaching section-pad" aria-labelledby="teaching-title">
      <div className="home-teaching-lead" data-reveal><h2 id="teaching-title">I teach what<br /><span>I practice.</span></h2><p>At Atomcamp, I teach Power BI and data analysis. I also mentor learners as they build projects, work through technical problems, and learn to explain their decisions.</p><Link className="button button-yellow" href="/teaching">Teaching & mentoring <span><Arrow /></span></Link></div>
      <div className="home-teaching-topics" data-reveal><div><strong>Power BI & DAX</strong><span>Models, measures, and useful reports</span></div><div><strong>SQL & Python</strong><span>Working with real datasets</span></div><div><strong>Project mentoring</strong><span>From rough idea to clear case study</span></div></div>
    </section>

    <section className="statement section-pad"><h2>Thanks for exploring<br /><em>my work.</em></h2><Link className="button button-yellow" href={`mailto:${PROFILE_IDENTITY.email}`}>Get in touch <span><Arrow /></span></Link></section>
  </>;
}
