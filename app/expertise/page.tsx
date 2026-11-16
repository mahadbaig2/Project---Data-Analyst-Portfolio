import { Arrow } from '@/components/portfolio/Arrow';
import type { Metadata } from 'next';
import Link from 'next/link';

const pillars = [
  {
    title: 'Data analysis & BI systems',
    detail: 'I turn business questions into comparable measures, Power BI reporting and reliable models for retail and logistics teams.',
    links: [
      { label: 'Data analytics', href: '/expertise/data-analytics' },
      { label: 'Business intelligence', href: '/expertise/business-intelligence' },
      { label: 'Data architecture', href: '/expertise/data-architecture' },
    ],
  },
  {
    title: 'Data engineering for reporting',
    detail: 'I use SQL, Power Query and Python to validate source data and produce repeatable reporting outputs.',
    links: [{ label: 'Data engineering', href: '/expertise/data-engineering' }],
  },
  {
    title: 'Applied AI & decision automation',
    detail: 'I build retrieval assistants and reviewable recommendations that keep sources and human decisions visible.',
    links: [{ label: 'AI & automation', href: '/expertise/ai-automation' }],
  },
];

export const metadata: Metadata = {
  title: 'Expertise | Data analyst & BI architect',
  description: 'Mirza Hammad Baig builds Power BI models, SQL and Python reporting pipelines, and applied AI for retail and logistics decisions.',
};

export default function ExpertisePage() {
  return <div className="inner-page section-pad">
    <div className="page-hero" data-reveal><h1>What I build<span className="yellow-dot">.</span></h1><p>Three areas of practice, all starting with a clear question and a trustworthy data model.</p></div>
    <div className="expertise-pillars">{pillars.map((pillar, index) => <section className="expertise-pillar" key={pillar.title} data-reveal>
      <span>0{index + 1}</span><div><h2>{pillar.title}</h2><p>{pillar.detail}</p><div className="expertise-pillar-links">{pillar.links.map((link) => <Link href={link.href} key={link.href}>{link.label} <Arrow /></Link>)}</div></div>
    </section>)}</div>
    <div className="expertise-tool-groups" data-reveal>
      <h2>Tools in the work</h2>
      <div><strong>Modelling & reporting</strong><p>Power BI · DAX · star schemas · row-level security</p></div>
      <div><strong>Reporting pipelines</strong><p>SQL Server · T-SQL · Power Query · Python</p></div>
      <div><strong>Assistive systems</strong><p>FastAPI · FAISS · LangChain · Streamlit</p></div>
    </div>
    <div className="expertise-mentoring" data-reveal><p>I also <Link href="/expertise/teaching-mentoring">teach and mentor <Arrow /></Link> analysts at Atomcamp. Explaining a model to a learner is a good test of whether it makes sense.</p></div>
    <div className="contact-band" data-reveal><h2>Have a reporting problem?</h2><Link href="/contact">Let&apos;s talk <Arrow /></Link></div>
  </div>;
}
