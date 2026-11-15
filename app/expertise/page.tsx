import { Arrow } from '@/components/portfolio/Arrow';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CAPABILITIES } from '@/lib/fixtures/portfolio';

export const metadata: Metadata = {
  title: 'Expertise',
  description: 'Explore how Mirza Hammad Baig applies data analytics, business intelligence, architecture, engineering, AI, and mentoring in real projects.',
};

export default function ExpertisePage() {
  return <div className="inner-page section-pad">
    <div className="page-hero" data-reveal><h1>What I do<span className="yellow-dot">.</span></h1><p>Six connected areas of practice, each grounded in work I&apos;ve built or taught.</p></div>
    <div className="expertise-list">{CAPABILITIES.map((item, index) => <Link href={`/expertise/${item.id}`} className="expertise-item" key={item.id} data-reveal><span className="expertise-number">0{index + 1}</span><div><h2>{item.title}</h2><p>{item.description}</p></div><span className="expertise-arrow"><Arrow /></span></Link>)}</div>
    <div className="tools-line" data-reveal><h2>Tools of the trade</h2><p>Power BI · Microsoft Fabric · SQL Server · Python · DAX · Power Query · AI workflows</p></div>
    <div className="contact-band" data-reveal><h2>Let&apos;s solve something.</h2><Link href="/contact">Get in touch <Arrow /></Link></div>
  </div>;
}
