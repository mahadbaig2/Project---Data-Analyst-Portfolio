import { Arrow } from '@/components/portfolio/Arrow';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { EDUCATION_ITEMS, PROFILE_IDENTITY } from '@/lib/fixtures/portfolio';

export const metadata: Metadata = { title: 'About', description: 'Get to know Mirza Hammad Baig, data analyst and BI architect.' };

export default function AboutPage() {
  return <div className="inner-page section-pad">
    <div className="page-hero" data-reveal><h1>A little about me<span className="yellow-dot">.</span></h1><p>I&apos;m Mirza Hammad Baig, a data analyst and BI architect based in Pakistan.</p></div>
    <div className="about-grid">
      <div className="about-image" data-reveal><Image src="/placeholders/portrait-placeholder.svg" alt="Portrait placeholder until Hammad provides a photo" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
      <div className="about-copy" data-reveal><h2>I like making complex things understandable.</h2><p>At Ideas by Gul Ahmed, I work with retail data and inventory questions. Earlier, at Muller & Phipps Logistics, I built Power BI reporting for operational and commercial teams. I also teach Power BI at Atomcamp.</p><p>My public projects move between BI, Python analysis, machine learning, and AI assistants. The common thread is making information useful to the person making a decision.</p><Link className="button button-dark" href="/experience">My experience <span><Arrow /></span></Link></div>
    </div>
    <section className="about-education" data-reveal><h2>Education</h2><div>{EDUCATION_ITEMS.map((item) => <div key={item.id}><h3>{item.degree}</h3><p>{item.institution}</p><span>{item.period}{item.honors ? ` · ${item.honors}` : ''}</span></div>)}</div></section>
    <section className="about-links" data-reveal><h2>Find me elsewhere</h2><div><a href="https://github.com/mirzahammad1" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://medium.com/@mirzahammadbaig147" target="_blank" rel="noreferrer">Medium <Arrow /></a><a href="https://www.linkedin.com/in/mirzahammadbaig1/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div></section>
    <div className="contact-band" id="contact" data-reveal><h2>Have something in mind?</h2><a href={`mailto:${PROFILE_IDENTITY.email}`}>{PROFILE_IDENTITY.email} <Arrow /></a></div>
  </div>;
}
