import { Arrow } from '@/components/portfolio/Arrow';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { EDUCATION_ITEMS } from '@/lib/fixtures/portfolio';

export const metadata: Metadata = {
  title: 'About | Data analyst and BI architect',
  description: 'Mirza Hammad Baig builds data models, Power BI reporting and validated pipelines for retail and logistics teams in Pakistan.',
};

export default function AboutPage() {
  return <div className="inner-page section-pad">
    <div className="page-hero" data-reveal><h1>About Mirza Hammad Baig<span className="yellow-dot">.</span></h1><p>I&apos;m a data analyst and BI architect working across retail, logistics and data education in Pakistan.</p></div>
    <div className="about-grid">
      <div className="about-image" data-reveal><Image src="/images/hammad-portrait.jpg" alt="Portrait of Mirza Hammad Baig" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
      <div className="about-copy" data-reveal>
        <h2>I care about the layer under the dashboard.</h2>
        <p>At Ideas by Gul Ahmed, I own sales, inventory and retail-performance reporting and the models behind it. The work starts with a business question and ends with a number a commercial team can use.</p>
        <p>Before that, I spent two years at Muller & Phipps Logistics building Power BI systems for operations, finance, sales, customer service and HR. My portfolio there includes 15 completed BI initiatives, from delivery SLA tracking and COD reconciliation to zone-secured reporting.</p>
        <p>I define what each row means, agree on the metric before designing its chart, and validate the source before publishing a result. When a recommendation could affect stock or a customer, I keep a person in the decision.</p>
        <p>I also teach Power BI, SQL and Python at Atomcamp. Teaching forces me to explain why a model works, not just demonstrate that it does.</p>
        <Link className="button button-dark" href="/experience">My experience <span><Arrow /></span></Link>
      </div>
    </div>

    <section className="about-projects" data-reveal>
      <div className="section-heading"><h2>See the decisions behind the work<span className="yellow-dot">.</span></h2></div>
      <div className="about-project-links">
        <Link href="/work/logistics-bi-ecosystem">How I separated four logistics SLA stages <Arrow /></Link>
        <Link href="/work/fragrance-stock-alert-pipeline">How I validated 6,688 store-product positions <Arrow /></Link>
        <Link href="/work/retail-store-weekly-sales-analysis">How a star schema supports weekly sales reporting <Arrow /></Link>
      </div>
    </section>

    <section className="about-education" data-reveal><h2>Education</h2><div>{EDUCATION_ITEMS.map((item) => <div key={item.id}><h3>{item.degree}</h3><p>{item.institution}</p><span>{item.period}{item.honors ? ` · ${item.honors}` : ''}</span></div>)}</div></section>
    <section className="about-links" data-reveal><h2>Find me elsewhere</h2><div><a href="https://github.com/mirzahammad1" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://medium.com/@mirzahammadbaig147" target="_blank" rel="noreferrer">Medium <Arrow /></a><a href="https://www.linkedin.com/in/mirzahammadbaig1/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div></section>
    <div className="contact-band" id="contact" data-reveal><h2>Have a reporting problem in mind?</h2><Link href="/contact">Let&apos;s talk <Arrow /></Link></div>
  </div>;
}
