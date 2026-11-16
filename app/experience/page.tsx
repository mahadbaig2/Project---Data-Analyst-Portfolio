import { Arrow } from '@/components/portfolio/Arrow';
import type { Metadata } from 'next';
import Link from 'next/link';
import { EXPERIENCE_ITEMS } from '@/lib/fixtures/portfolio';

export const metadata: Metadata = { title: 'Experience | Retail and logistics BI', description: 'Mirza Hammad Baig owns retail analytics at Ideas by Gul Ahmed, built BI reporting at Muller & Phipps Logistics, and teaches data analytics at Atomcamp.' };

export default function ExperiencePage() {
  return <div className="inner-page section-pad">
    <div className="page-hero" data-reveal><h1>Where I&apos;ve worked<span className="yellow-dot">.</span></h1><p>Retail data work, logistics BI, and practical teaching.</p></div>
    <div className="timeline">{EXPERIENCE_ITEMS.map((item) => <article className="timeline-item" key={item.id} data-reveal>
      <span>{item.period}</span><div><h2>{item.role}</h2><h3>{item.company}</h3>{item.context && <p className="experience-context">{item.context}</p>}<p>{item.scopeOverview}</p><ul className="experience-highlights">{item.responsibilities.slice(0, 3).map((point) => <li key={point}>{point}</li>)}</ul></div>
    </article>)}</div>
    <div className="contact-band" data-reveal><h2>See the work behind the roles.</h2><Link href="/work">Explore projects <Arrow /></Link></div>
  </div>;
}
