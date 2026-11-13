import { Arrow } from '@/components/portfolio/Arrow';
import Image from 'next/image';
import Link from 'next/link';
import { CASE_STUDIES, PROFILE_IDENTITY } from '@/lib/fixtures/portfolio';
import { ProjectTile } from '@/components/portfolio/ProjectTile';

export default function HomePage() {
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
      <h1 id="hero-title">Better data.<br /><span className="hero-line">Bolder <span className="hero-arrow" aria-hidden="true"><Arrow /></span> decisions.</span><br /><span className="muted">Built to last.</span></h1>
      <p>I turn complex data into clear systems, useful insights, and decisions that move business forward.</p>
      <div className="hero-actions"><Link className="button button-dark" href="/work">Explore my work <span><Arrow /></span></Link><Link className="text-link" href="/about">More about me <span><Arrow /></span></Link></div>
    </section>

    <section className="intro-grid section-pad" aria-label="Introduction">
      <div className="intro-card dark-card" data-reveal><div><h2>Clarity first.<br /><span>Always.</span></h2><p>I&apos;m Hammad. I build data products that make the complicated feel simple, from the model underneath to the story on screen.</p><Link className="button button-yellow" href="/about">Meet Hammad <span><Arrow /></span></Link></div><div className="mini-project"><span className="mini-symbol">✳</span><div><strong>Thoughtful systems.<br />Real-world impact.</strong><Link href="/work">See the work <Arrow /></Link></div></div></div>
      <div className="portrait-card" data-reveal><Image src="/placeholders/portrait.jpg" alt="Placeholder portrait, to be replaced with Hammad's photo" fill priority sizes="(max-width: 760px) 100vw, 50vw" /><div className="portrait-sticker"><span>Data meets<br />direction.</span><span className="sticker-arrow"><Arrow /></span></div></div>
    </section>

    <section className="ticker" aria-label="Areas of work"><div>DATA ANALYTICS <span>✳</span> BUSINESS INTELLIGENCE <span>✳</span> DATA ARCHITECTURE <span>✳</span> AI SYSTEMS <span>✳</span> DATA ANALYTICS <span>✳</span> BUSINESS INTELLIGENCE <span>✳</span></div></section>

    <section className="section-pad philosophy" data-reveal><h2>Good analysis asks<br /><span>better questions.</span></h2><p>Before a dashboard, there’s a decision to make. I start there, then build the data foundation and experience that helps people act with confidence.</p><div className="principle-row"><div><span className="principle-icon">⌕</span><h3>Find the signal</h3><p>Understand the real question behind the request.</p></div><div><span className="principle-icon">⌘</span><h3>Build the system</h3><p>Make the data reliable, scalable, and easy to use.</p></div><div><span className="principle-icon"><Arrow /></span><h3>Move forward</h3><p>Turn insight into a decision people can make.</p></div></div></section>

    <section className="work-section section-pad"><div className="section-heading" data-reveal><h2>Selected work<span className="yellow-dot">.</span></h2><Link className="text-link" href="/work">All projects <span><Arrow /></span></Link></div><div className="project-grid">{CASE_STUDIES.map((project, index) => <ProjectTile key={project.slug} project={project} index={index} />)}</div></section>

    <section className="statement section-pad" data-reveal><h2>From messy data<br />to <em>meaningful change.</em></h2><Link className="button button-yellow" href={`mailto:${PROFILE_IDENTITY.email}`}>Let&apos;s work together <span><Arrow /></span></Link></section>
  </>;
}
