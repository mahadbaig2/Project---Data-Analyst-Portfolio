import type { Metadata } from 'next';
import { Arrow } from '@/components/portfolio/Arrow';
import { PROFILE_IDENTITY } from '@/lib/fixtures/portfolio';

export const metadata: Metadata = {
  title: 'Contact | Data analyst & BI architect',
  description: 'Contact Mirza Hammad Baig about retail and logistics BI, data architecture, analytics roles, or teaching.',
};

export default function ContactPage() {
  const socialLinks = PROFILE_IDENTITY.socialLinks.filter((link) => link.platform !== 'email');

  return <div className="inner-page section-pad contact-page">
    <div className="page-hero" data-reveal>
      <h1>Start a conversation<span className="yellow-dot">.</span></h1>
      <p>For analytics roles, BI or reporting projects, and teaching or mentoring, email me directly.</p>
    </div>
    <div className="contact-grid">
      <section className="contact-primary" data-reveal>
        <h2>Email</h2>
        <a href={`mailto:${PROFILE_IDENTITY.email}`}>{PROFILE_IDENTITY.email} <Arrow /></a>
      </section>
      <div className="contact-details" data-reveal>
        <section><h2>Based in</h2><p>{PROFILE_IDENTITY.location}</p></section>
        <section><h2>Elsewhere</h2><div>{socialLinks.map((link) => <a key={link.platform} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<Arrow /></a>)}</div></section>
      </div>
    </div>
  </div>;
}
