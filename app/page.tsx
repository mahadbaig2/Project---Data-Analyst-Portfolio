import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from '@/components/portfolio/Arrow';
import { ProjectTile } from '@/components/portfolio/ProjectTile';
import { FLAGSHIP_PROJECTS } from '@/lib/content/project-selection';
import { getBlogArticles } from '@/lib/content/articles';

const principles = [
  { title: 'Define the grain first.', detail: 'Every reliable number starts with knowing what one row means.' },
  { title: 'Validate before you calculate.', detail: 'A bad input should stop a report before it spreads a bad answer.' },
  { title: 'Keep a person in the loop.', detail: 'Recommendations should explain themselves and wait for review.' },
];

const pillars = [
  { title: 'Data analysis & BI', href: '/expertise/data-analytics', detail: 'Business questions, clear measures and reporting people can act on.' },
  { title: 'Data engineering for reporting', href: '/expertise/data-engineering', detail: 'SQL, Power Query and validated Python pipelines.' },
  { title: 'Applied AI & decision automation', href: '/expertise/ai-automation', detail: 'Grounded answers and reviewable recommendations.' },
];

export default async function HomePage() {
  const articles = (await getBlogArticles())
    .filter((article) => article.mediumUrl?.includes('@mirzahammadbaig147/'))
    .sort((a, b) => (a.publishedAt || '').localeCompare(b.publishedAt || ''))
    .slice(0, 3);

  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <h1 id="hero-title">Data Analyst building<br />trusted reporting for<br /><span className="muted">retail & logistics<span className="yellow-dot">.</span></span></h1>
      <p>I&apos;m Mirza Hammad Baig, a data analyst. I turn sales, inventory and delivery data into clear analysis, reliable reporting and validated pipelines at Ideas by Gul Ahmed and, earlier, Muller & Phipps Logistics.</p>
      <div className="hero-actions">
        <Link className="button button-dark" href="#selected-work">View case studies <span><Arrow /></span></Link>
        <Link className="text-link" href="/contact">Let&apos;s talk <span><Arrow /></span></Link>
      </div>
      <p className="hero-proof">15 completed logistics BI initiatives · Replenishment analysis across 88 retail stores</p>
    </section>

    <section className="work-section section-pad home-work" id="selected-work">
      <div className="section-heading" data-reveal><div><h2>Selected case studies<span className="yellow-dot">.</span></h2><p>Three examples of reporting and data systems designed around a real decision.</p></div><Link className="text-link" href="/work">All case studies <span><Arrow /></span></Link></div>
      <div className="project-grid">{FLAGSHIP_PROJECTS.map((project, index) => <ProjectTile key={project.slug} project={project} index={index} showSummary />)}</div>
    </section>

    <section className="proof-section section-pad" aria-labelledby="proof-title">
      <h2 id="proof-title" data-reveal>Scope at a glance<span className="yellow-dot">.</span></h2>
      <div className="proof-grid">
        <div data-reveal><strong>15</strong><p>Completed BI initiatives across six business functions</p></div>
        <div data-reveal><strong>6,688</strong><p>Store-product positions in the fragrance replenishment model</p></div>
        <div data-reveal><strong>11</strong><p>Regional zones supported by role-aware reporting</p></div>
      </div>
    </section>

    <section className="principles-section section-pad" aria-labelledby="principles-title">
      <h2 id="principles-title" data-reveal>How I work<span className="yellow-dot">.</span></h2>
      <div className="principles-grid">{principles.map((principle) => <div key={principle.title} data-reveal><h3>{principle.title}</h3><p>{principle.detail}</p></div>)}</div>
    </section>

    <section className="intro-grid section-pad home-intro" aria-label="About Mirza Hammad Baig">
      <div className="intro-card dark-card" data-reveal>
        <div><h2>About<span className="yellow-dot">.</span></h2><p>I own sales and inventory analytics at Ideas by Gul Ahmed, a Pakistani retail brand. Before that, I built BI reporting for delivery, finance and commercial teams at Muller & Phipps Logistics.</p><Link className="button button-yellow" href="/about">More about me <span><Arrow /></span></Link></div>
        <div className="intro-note">The model underneath a dashboard matters as much as the chart on top.</div>
      </div>
      <div className="portrait-card" data-reveal><Image src="/images/hammad-portrait.jpg" alt="Portrait of Mirza Hammad Baig" fill sizes="(max-width: 760px) 100vw, 50vw" /><div className="portrait-sticker"><span>Mirza Hammad Baig<br /><small>Data analyst · Retail & logistics</small></span><span className="sticker-arrow"><Arrow /></span></div></div>
    </section>

    <section className="home-expertise section-pad" aria-labelledby="expertise-title">
      <div className="section-heading" data-reveal><div><h2 id="expertise-title">From raw export to a number leadership trusts<span className="yellow-dot">.</span></h2></div><Link className="text-link" href="/expertise">Explore expertise <span><Arrow /></span></Link></div>
      <div className="home-expertise-list">{pillars.map((item, index) => <Link href={item.href} className="home-expertise-item" key={item.title} data-reveal><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></Link>)}</div>
    </section>

    <section className="home-experience section-pad" aria-labelledby="experience-title" data-reveal>
      <div><h2 id="experience-title">Where I work<span className="yellow-dot">.</span></h2><p>Ownership in retail analytics and teaching grounded in practice.</p></div>
      <div className="home-roles">
        <div><strong>Assistant Manager – Data Analyst</strong><span>Ideas by Gul Ahmed · Pakistan retail</span><p>Own sales, inventory and performance reporting across commercial teams.</p></div>
        <div><strong>Data Analytics Instructor & Mentor</strong><span>Atomcamp · Data education</span><p>Teach Power BI, SQL and Python through applied projects and feedback.</p></div>
        <Link className="text-link" href="/experience">My experience <span><Arrow /></span></Link>
      </div>
    </section>

    <section className="home-teaching section-pad" aria-labelledby="teaching-title">
      <div className="home-teaching-lead" data-reveal><h2 id="teaching-title">I teach what<br /><span>I practice.</span></h2><p>At Atomcamp, I teach Power BI, SQL, Python and data analysis. I ask learners to clean imperfect data, defend their model and explain what the result means to someone making a decision.</p><Link className="button button-yellow" href="/teaching">Teaching & mentoring <span><Arrow /></span></Link></div>
      <div className="home-teaching-topics" data-reveal><div><strong>Power BI & DAX</strong><span>Models, measures and useful reports</span></div><div><strong>SQL & Python</strong><span>Working with real datasets</span></div><div><strong>Project mentoring</strong><span>From rough idea to clear case study</span></div></div>
    </section>

    <section className="home-writing section-pad" aria-labelledby="writing-title">
      <div className="section-heading" data-reveal><div><h2 id="writing-title">Writing<span className="yellow-dot">.</span></h2><p>Foundational notes from my series on the wider world of data.</p></div><Link className="text-link" href="/blog">All writing <span><Arrow /></span></Link></div>
      <div className="home-article-list">{articles.map((article, index) => <a href={article.mediumUrl} key={article._id} target="_blank" rel="noreferrer" className="home-article" data-reveal><span>0{index + 1}</span><h3>{article.title}</h3><Arrow /></a>)}</div>
    </section>

    <section className="statement section-pad"><h2>Working on a retail, logistics<br />or reporting problem?</h2><Link className="button button-yellow" href="/contact">Let&apos;s talk <span><Arrow /></span></Link></section>
  </>;
}
